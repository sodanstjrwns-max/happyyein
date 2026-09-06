// 비급여 진료비(수가) API — 공개 조회 + 관리자 편집(항목별 공개/비공개)
import { Hono } from 'hono'
import { requireAdmin } from './api-auth'

type Bindings = {
  DB: D1Database;
}

const feesApi = new Hono<{ Bindings: Bindings }>()

export interface FeeItem {
  id?: number;
  category: string;
  name: string;
  price: string;
  note: string;
  is_published: number;
  sort_order: number;
}

// 시드 폴백 — DB가 비어있거나 조회 실패 시에도 공개 페이지가 절대 비지 않도록
export const FEE_FALLBACK: FeeItem[] = [
  { category: '임플란트 · 보철 · 틀니', name: '임플란트', price: '65세 이상 건강보험 적용 시 본인부담 약 30~50만원 / 비보험 개별 상담', note: 'CT 정밀진단 후 맞춤 비용 안내', is_published: 1, sort_order: 10 },
  { category: '임플란트 · 보철 · 틀니', name: '크라운(보철)', price: '재질별(지르코니아/PFM/금) 개별 안내', note: '', is_published: 1, sort_order: 20 },
  { category: '임플란트 · 보철 · 틀니', name: '틀니', price: '65세 이상 건강보험 적용 시 본인부담 약 12~49만원 (종류별)', note: '', is_published: 1, sort_order: 30 },
  { category: '교정 · 심미', name: '치아교정', price: '교합 상태별 맞춤 안내 / 부분교정~전체교정 / 분할 납부 가능', note: '', is_published: 1, sort_order: 40 },
  { category: '교정 · 심미', name: '심미치료(레진·라미네이트)', price: '레진 1개당 / 라미네이트 1개당 — 개별 상담', note: '', is_published: 1, sort_order: 50 },
  { category: '교정 · 심미', name: '치아미백', price: '오피스 블리칭 / 홈 블리칭 / 듀얼 미백 — 개별 상담', note: '', is_published: 1, sort_order: 60 },
  { category: '일반 · 기타 진료', name: '신경치료', price: '건강보험 적용 시 본인부담 약 3~8만원 (치아 위치·근관 수에 따라)', note: '건강보험 적용 항목', is_published: 1, sort_order: 70 },
  { category: '일반 · 기타 진료', name: '스케일링', price: '건강보험 적용 시 본인부담 약 1~2만원 (연 1회)', note: '연 1회 건강보험 적용', is_published: 1, sort_order: 80 },
  { category: '일반 · 기타 진료', name: '발치(사랑니 포함)', price: '일반 발치 보험 적용 본인부담 약 1~3만원 / 매복 사랑니 약 3~8만원', note: '', is_published: 1, sort_order: 90 },
  { category: '일반 · 기타 진료', name: '소아 치과', price: '실란트(보험) 본인부담 약 1만원/개 | 불소도포(보험) 약 1만원', note: '', is_published: 1, sort_order: 100 },
]

// 공개 항목만 조회 (공개 페이지에서 사용) — 실패/빈값 시 폴백
export async function getPublishedFees(db: D1Database): Promise<FeeItem[]> {
  try {
    const { results } = await db.prepare(
      `SELECT id, category, name, price, note, is_published, sort_order
       FROM fee_items WHERE is_published = 1
       ORDER BY sort_order ASC, id ASC`
    ).all<FeeItem>()
    if (!results || results.length === 0) return FEE_FALLBACK.filter(f => f.is_published === 1)
    return results
  } catch {
    return FEE_FALLBACK.filter(f => f.is_published === 1)
  }
}

// ============================================================
// GET /api/fees — 공개(공개 항목만)
// ============================================================
feesApi.get('/', async (c) => {
  const items = await getPublishedFees(c.env.DB)
  return c.json({ items })
})

// ============================================================
// GET /api/fees/admin — 관리자(전체 항목, 비공개 포함)
// ============================================================
feesApi.get('/admin', requireAdmin, async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT id, category, name, price, note, is_published, sort_order
       FROM fee_items ORDER BY sort_order ASC, id ASC`
    ).all<FeeItem>()
    return c.json({ items: results || [] })
  } catch (err: any) {
    return c.json({ error: err?.message || '조회 실패' }, 500)
  }
})

// ============================================================
// POST /api/fees/save — 관리자(전체 항목 일괄 저장)
// body: { items: FeeItem[] }
// 전량 교체(트랜잭션 배치) — 편집기에서 넘어온 목록으로 대체
// ============================================================
feesApi.post('/save', requireAdmin, async (c) => {
  try {
    const body = await c.req.json<{ items: FeeItem[] }>()
    const items = Array.isArray(body?.items) ? body.items : []

    // 최소 유효성: 이름 없는 행 제거
    const clean = items
      .map((it, i) => ({
        category: (it.category || '기타').toString().trim() || '기타',
        name: (it.name || '').toString().trim(),
        price: (it.price || '').toString().trim(),
        note: (it.note || '').toString().trim(),
        is_published: it.is_published ? 1 : 0,
        sort_order: Number.isFinite(it.sort_order as number) ? Number(it.sort_order) : (i + 1) * 10,
      }))
      .filter(it => it.name.length > 0)

    const stmts: D1PreparedStatement[] = []
    stmts.push(c.env.DB.prepare('DELETE FROM fee_items'))
    for (const it of clean) {
      stmts.push(
        c.env.DB.prepare(
          `INSERT INTO fee_items (category, name, price, note, is_published, sort_order, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
        ).bind(it.category, it.name, it.price, it.note, it.is_published, it.sort_order)
      )
    }
    await c.env.DB.batch(stmts)

    return c.json({ success: true, count: clean.length })
  } catch (err: any) {
    return c.json({ error: err?.message || '저장 실패' }, 500)
  }
})

export default feesApi
