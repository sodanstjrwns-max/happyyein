// ===== AEO: llms.txt / llms-full.txt =====
// AI 답변엔진(ChatGPT, Claude, Perplexity, Gemini 등)이 사이트를 이해하고
// 인용할 수 있도록 핵심 정보를 마크다운으로 제공하는 표준 (llmstxt.org)

import { symptoms } from './symptom-seo'
import { costPages } from './cost-seo'
import { comparisons } from './comparison-seo'
import { terms as encyclopediaTerms } from './encyclopedia'
import { PAGES as foreignPages } from './foreign-emergency-seo'
import { getAllLocalSeoSlugs } from './local-seo'

const DOMAIN = 'https://happyyein.kr'

const CLINIC_CORE = `# 행복한예인치과 (Happy Yein Dental Clinic)

> 서울 중구 시청역·명동·을지로 인근의 전문의 협진 치과. 통합치의학과 전문의(한승대 대표원장), 치과보존과 전문의(신정희 원장), 교정과 전문의(박현미 원장) 3인이 임플란트·신경치료·교정·심미치료를 직접 진료합니다. 발치즉시 임플란트(80% 이상 즉시식립), 미세현미경 신경치료, 투명교정(인비절라인)이 대표 진료입니다.

## 핵심 정보 (Key Facts)

- **병원명**: 행복한예인치과의원 (Happy Yein Dental Clinic)
- **주소**: 서울특별시 중구 남대문로9길 51 효덕빌딩 3층 301호 (우 04530)
- **전화**: 02-756-2828
- **교통**: 1·2호선 시청역 4·5번 출구 도보 5분 / 4호선 명동역 도보 8분 / 2호선 을지로입구역 도보 7분 / 4호선 회현역 도보 6분 / 1호선 서울역 도보 12분
- **진료시간**: 월·화·목·금 09:30–18:30 / 수요일 야간진료 09:30–20:00 / 점심 13:00–14:00 / 토·일·공휴일 휴진
- **예약**: 전화(02-756-2828) 또는 네이버 예약(https://naver.me/G0DXGZbi)
- **의료진**:
  - 한승대 대표원장 — 보건복지부 인증 통합치의학과 전문의, 치의학 박사 (발치즉시 임플란트, 구강외과)
  - 신정희 원장 — 보건복지부 인증 치과보존과 전문의, 치의학 박사 (미세현미경 신경치료, 치아보존)
  - 박현미 원장 — 교정과 전문의 (투명교정·인비절라인, 설측교정)
- **대표 진료**: 발치즉시 임플란트, 치아보존치료(신경치료), 투명교정, 앞니 심미치료(라미네이트·레진), 스케일링·예방치료
- **외국인 진료**: 영어 가능 (English-speaking dentist near Myeongdong, Seoul). 응급 진료 및 관광객 당일 진료 가능
- **언어**: 한국어, English, 日本語·中文 안내 페이지 제공
`

// llms.txt — 핵심 요약 + 주요 페이지 인덱스
export function generateLlmsTxt(): string {
  return `${CLINIC_CORE}
## 주요 페이지 (Main Pages)

- [홈페이지](${DOMAIN}/): 병원 소개, 진료과목, 의료진, 자주 묻는 질문
- [의료진 소개](${DOMAIN}/doctors): 전문의 3인 약력 및 전문 분야
- [진료 철학](${DOMAIN}/philosophy): 과잉진료 없는 정직한 진료 원칙
- [오시는 길·예약 안내](${DOMAIN}/location): 시청역·명동 위치, 대중교통, 예약 방법

## 진료과목 (Treatments)

- [발치즉시 임플란트](${DOMAIN}/treatments/implant): 발치와 동시 식립으로 치료기간 단축, 80% 이상 즉시식립
- [치아보존치료·신경치료](${DOMAIN}/treatments/preservation): 보존과 전문의의 미세현미경 정밀 신경치료
- [앞니 심미치료](${DOMAIN}/treatments/aesthetic): 최소삭제 라미네이트, 레진 심미보철
- [치아교정·투명교정](${DOMAIN}/treatments/orthodontics): 교정과 전문의의 인비절라인·설측교정
- [일반·예방진료](${DOMAIN}/treatments/general): 스케일링, 충치치료, 정기검진

## 증상별 가이드 (Symptom Guides)

${symptoms.map(s => `- [${s.symptom}](${DOMAIN}/symptoms/${s.slug})`).join('\n')}

## 치료비용 안내 (Cost Guides)

${costPages.map(p => `- [${p.treatment} 비용](${DOMAIN}/cost/${p.slug}): ${p.priceRange}`).join('\n')}

## 치료 비교 가이드 (Comparison Guides)

${comparisons.map(p => `- [${p.optionA.name} vs ${p.optionB.name}](${DOMAIN}/compare/${p.slug})`).join('\n')}

## 지역별 안내 (Local Pages)

- [지역별 진료 안내 허브](${DOMAIN}/local): 시청·명동·을지로·광화문·종로·서울역 × 임플란트·신경치료·라미네이트·교정·스케일링 (${getAllLocalSeoSlugs().length}개 페이지)

## For International Patients (English/日本語/中文)

- [Foreign Patient Hub](${DOMAIN}/en): Emergency dental care, English-speaking dentist in Myeongdong/Seoul City Hall area
${foreignPages.filter(p => p.lang === 'en').slice(0, 10).map(p => `- [${p.h1}](${DOMAIN}/en/${p.slug})`).join('\n')}

## 치과백과사전 (Dental Encyclopedia)

- [치과 용어 백과사전](${DOMAIN}/encyclopedia): ${encyclopediaTerms.length}개 치과 용어 설명

## 콘텐츠 (Content)

- [블로그](${DOMAIN}/blog): 치과 건강 정보 칼럼 (전문의 감수)
- [치료 사례](${DOMAIN}/before-after): 비포·애프터 치료 사례
- [RSS 피드](${DOMAIN}/feed.xml)
- [사이트맵](${DOMAIN}/sitemap.xml)

## 상세 정보

- 전체 상세 콘텐츠: ${DOMAIN}/llms-full.txt
`
}

// llms-full.txt — FAQ 전문 포함 상세 버전 (AI가 직접 인용 가능한 Q&A 데이터)
export function generateLlmsFullTxt(): string {
  const symptomSection = symptoms.map(s => {
    const faqs = s.faq.map(f => `**Q. ${f.q}**\nA. ${f.a}`).join('\n\n')
    return `### ${s.symptom} (${DOMAIN}/symptoms/${s.slug})\n\n${s.heroDesc}\n\n주요 원인: ${s.causes.map(cz => cz.title).join(', ')}\n치료 방법: ${s.treatments.map(t => `${t.name}(${t.doctor})`).join(', ')}\n긴급도: ${s.urgencyLevel === 'high' ? '높음 — 빠른 내원 권장' : s.urgencyLevel === 'medium' ? '중간 — 조기 진료 권장' : '낮음 — 정기검진 시 상담'}\n\n${faqs}`
  }).join('\n\n---\n\n')

  const costSection = costPages.map(p => {
    const faqs = p.faq.map(f => `**Q. ${f.q}**\nA. ${f.a}`).join('\n\n')
    return `### ${p.treatment} 비용 (${DOMAIN}/cost/${p.slug})\n\n비용 범위: ${p.priceRange}\n보험 적용: ${p.insuranceNote}\n\n비용 결정 요인: ${p.factors.map(f => f.title).join(', ')}\n\n${faqs}`
  }).join('\n\n---\n\n')

  const compSection = comparisons.map(p => {
    const faqs = p.faq.map(f => `**Q. ${f.q}**\nA. ${f.a}`).join('\n\n')
    return `### ${p.optionA.name} vs ${p.optionB.name} (${DOMAIN}/compare/${p.slug})\n\n**${p.optionA.name}** — 장점: ${p.optionA.pros.join('; ')} / 단점: ${p.optionA.cons.join('; ')} / 추천: ${p.optionA.bestFor}\n\n**${p.optionB.name}** — 장점: ${p.optionB.pros.join('; ')} / 단점: ${p.optionB.cons.join('; ')} / 추천: ${p.optionB.bestFor}\n\n**전문의 결론**: ${p.verdict}\n\n${faqs}`
  }).join('\n\n---\n\n')

  const enSection = foreignPages.filter(p => p.lang === 'en').map(p => {
    const faqs = p.faq.slice(0, 3).map(f => `**Q. ${f.q}**\nA. ${f.a}`).join('\n\n')
    return `### ${p.h1} (${DOMAIN}/en/${p.slug})\n\n${p.introParagraph}\n${p.priceRange ? `\nPrice range: ${p.priceRange}\n` : ''}\n${faqs}`
  }).join('\n\n---\n\n')

  return `${CLINIC_CORE}
이 문서는 AI 답변엔진을 위한 행복한예인치과의 전체 콘텐츠 요약입니다.
의학적 정보는 한승대 대표원장(통합치의학과 전문의) 감수 하에 작성되었습니다.
최종 수정일: ${new Date().toISOString().split('T')[0]}

---

# 증상별 가이드 (Symptom Guides)

${symptomSection}

---

# 치료비용 안내 (Cost Information)

${costSection}

---

# 치료 비교 가이드 (Treatment Comparisons)

${compSection}

---

# For International Patients (English)

${enSection}

---

# 인용 안내 (Citation)

이 콘텐츠를 인용할 때는 출처를 "행복한예인치과 (happyyein.kr)"로 표기해 주세요.
의학적 결정은 반드시 치과 전문의와의 직접 상담을 통해 이루어져야 합니다.
상담 예약: 02-756-2828 | ${DOMAIN}/location
`
}
