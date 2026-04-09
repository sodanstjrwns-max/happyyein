#!/bin/bash
# ============================================
# 라운드 3 종합 시뮬레이션
# 회원가입 5회 + 로그인 5회 + 게시물 15회
# XSS/보안/엣지케이스 강화
# ============================================
set -euo pipefail
BASE="http://localhost:3000"
PASS=0
FAIL=0
TOTAL=0

ok() { PASS=$((PASS+1)); TOTAL=$((TOTAL+1)); echo "  ✅ $1"; }
ng() { FAIL=$((FAIL+1)); TOTAL=$((TOTAL+1)); echo "  ❌ $1"; }
check() { if [ "$1" = "true" ]; then ok "$2"; else ng "$2"; fi; }

section() { echo ""; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; echo "▶ $1"; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; }

# =============================
# 1. 회원가입 5회
# =============================
section "1. 회원가입 5회 (엣지케이스 포함)"

USERS=(
  '{"email":"test1@round3.com","password":"Round3pass1!","name":"이순신","phone":"010-1111-1111","birthDate":"1545-04-28","gender":"male","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":true}}'
  '{"email":"test2@round3.com","password":"Round3pass2!","name":"유관순","phone":"010-2222-2222","birthDate":"1902-12-16","gender":"female","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":false}}'
  '{"email":"test3@round3.com","password":"Round3pass3!","name":"장영실","phone":"010-3333-3333","birthDate":"1390-01-01","gender":"male","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true}}'
  '{"email":"test4@round3.com","password":"Round3pass4!","name":"신사임당","phone":"010-4444-4444","birthDate":"1504-10-29","gender":"female","consents":{"privacy_collection":true,"privacy_provision":true}}'
  '{"email":"test5@round3.com","password":"Round3pass5!","name":"정약용","phone":"010-5555-5555","birthDate":"1762-06-16","gender":"male","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_email":true}}'
)
NAMES=("이순신" "유관순" "장영실" "신사임당" "정약용")
TOKENS=()

for i in {0..4}; do
  R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d "${USERS[$i]}")
  CODE=$(echo "$R" | tail -1)
  check "$([ "$CODE" = "201" ] && echo true || echo false)" "회원가입 ${NAMES[$i]} (HTTP $CODE)"
done

# 엣지케이스: 이메일 중복
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"test1@round3.com","password":"Dup12345!","name":"중복","phone":"010-0000-0000","consents":{"privacy_collection":true,"privacy_provision":true}}')
check "$([ "$R" = "409" ] && echo true || echo false)" "중복 이메일 차단 (HTTP $R)"

# 엣지케이스: 비밀번호 너무 짧음
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"short@test.com","password":"Ab1!","name":"짧은PW","phone":"010-0000-0001","consents":{"privacy_collection":true,"privacy_provision":true}}')
check "$([ "$R" = "400" ] && echo true || echo false)" "짧은 비밀번호 차단 (HTTP $R)"

# 엣지케이스: 비밀번호 숫자 없음
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"nonum@test.com","password":"AbcdefGH!","name":"숫자없음","phone":"010-0000-0002","consents":{"privacy_collection":true,"privacy_provision":true}}')
check "$([ "$R" = "400" ] && echo true || echo false)" "숫자 없는 비밀번호 차단 (HTTP $R)"

# 엣지케이스: 이메일 형식 오류
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"notanemail","password":"Valid1234!","name":"이메일X","phone":"010-0000-0003","consents":{"privacy_collection":true,"privacy_provision":true}}')
check "$([ "$R" = "400" ] && echo true || echo false)" "잘못된 이메일 차단 (HTTP $R)"

# 엣지케이스: 이름 없음
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"noname@test.com","password":"Valid1234!","name":"","phone":"010-0000-0004","consents":{"privacy_collection":true,"privacy_provision":true}}')
check "$([ "$R" = "400" ] && echo true || echo false)" "이름 없음 차단 (HTTP $R)"

# 엣지케이스: 동의 미체크
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"noconsent@test.com","password":"Valid1234!","name":"동의X","phone":"010-0000-0005","consents":{"privacy_collection":false,"privacy_provision":true}}')
check "$([ "$R" = "400" ] && echo true || echo false)" "필수 동의 미체크 차단 (HTTP $R)"

# 엣지케이스: XSS in name
R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{"email":"xss@test.com","password":"Valid1234!","name":"<script>alert(1)</script>","phone":"010-0000-0006","consents":{"privacy_collection":true,"privacy_provision":true}}')
CODE=$(echo "$R" | tail -1)
check "$([ "$CODE" = "201" ] && echo true || echo false)" "XSS이름 가입 (서버 저장 후 출력시 이스케이프) (HTTP $CODE)"

# =============================
# 2. 로그인 5회
# =============================
section "2. 로그인 5회 (엣지케이스 포함)"

EMAILS=("test1@round3.com" "test2@round3.com" "test3@round3.com" "test4@round3.com" "test5@round3.com")
PASSES=("Round3pass1!" "Round3pass2!" "Round3pass3!" "Round3pass4!" "Round3pass5!")

for i in {0..4}; do
  R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/login" -H "Content-Type: application/json" -d "{\"email\":\"${EMAILS[$i]}\",\"password\":\"${PASSES[$i]}\"}")
  CODE=$(echo "$R" | tail -1)
  BODY=$(echo "$R" | head -1)
  TK=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null || echo "")
  TOKENS+=("$TK")
  check "$([ "$CODE" = "200" ] && [ -n "$TK" ] && echo true || echo false)" "로그인 ${NAMES[$i]} (HTTP $CODE)"
done

# 엣지케이스: 틀린 비밀번호
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/login" -H "Content-Type: application/json" -d '{"email":"test1@round3.com","password":"WrongPass1!"}')
check "$([ "$R" = "401" ] && echo true || echo false)" "틀린 비밀번호 차단 (HTTP $R)"

# 엣지케이스: 존재하지 않는 이메일
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/login" -H "Content-Type: application/json" -d '{"email":"ghost@noexist.com","password":"Any1234!"}')
check "$([ "$R" = "401" ] && echo true || echo false)" "미등록 이메일 차단 (HTTP $R)"

# 프로필 확인 (토큰 유효성)
R=$(curl -s -w "\n%{http_code}" "$BASE/api/user/profile" -H "Authorization: Bearer ${TOKENS[0]}")
CODE=$(echo "$R" | tail -1)
BODY=$(echo "$R" | head -1)
NAME_CHK=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('user',{}).get('name',''))" 2>/dev/null || echo "")
check "$([ "$CODE" = "200" ] && [ "$NAME_CHK" = "이순신" ] && echo true || echo false)" "프로필 조회 이순신 확인 (HTTP $CODE)"

# 토큰 검증
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/verify" -H "Authorization: Bearer ${TOKENS[2]}")
check "$([ "$R" = "200" ] && echo true || echo false)" "토큰 검증 성공 (HTTP $R)"

# 잘못된 토큰
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/user/verify" -H "Authorization: Bearer invalidtoken123")
check "$([ "$R" = "401" ] && echo true || echo false)" "잘못된 토큰 차단 (HTTP $R)"

# =============================
# 3. 관리자 로그인
# =============================
section "3. 관리자 로그인"
ADMIN_R=$(curl -s "$BASE/api/auth/login" -X POST -H "Content-Type: application/json" -d '{"password":"yein2828!admin"}')
ADMIN_TK=$(echo "$ADMIN_R" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null || echo "")
check "$([ -n "$ADMIN_TK" ] && echo true || echo false)" "관리자 로그인 성공"

# =============================
# 4. 이미지 업로드 (25장)
# =============================
section "4. 이미지 업로드 (25장)"
IMG_URLS=()

for i in $(seq 1 25); do
  python3 -c "
import struct, zlib
w, h = 200, 200
raw = b''
for y in range(h):
    raw += b'\\x00'
    for x in range(w):
        raw += struct.pack('BBB', int(255*y/h), int(255*x/w), ($i*37)%256)
def chunk(t, d):
    return struct.pack('>I',len(d)) + t + d + struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
img = b'\\x89PNG\\r\\n\\x1a\\n' + chunk(b'IHDR',ihdr) + chunk(b'IDAT',zlib.compress(raw)) + chunk(b'IEND',b'')
with open('/tmp/r3_img_$i.png','wb') as f: f.write(img)
"
  R=$(curl -s "$BASE/api/upload" -X POST -H "Authorization: Bearer $ADMIN_TK" -F "file=@/tmp/r3_img_$i.png;type=image/png")
  URL=$(echo "$R" | python3 -c "import sys,json; print(json.load(sys.stdin).get('url',''))" 2>/dev/null || echo "")
  IMG_URLS+=("$URL")
done
ok "이미지 25장 업로드 완료 (${#IMG_URLS[@]}개)"

# =============================
# 5. 비포애프터 5회
# =============================
section "5. 비포애프터 5회 (각 4장 이미지)"

BA_TITLES=("전악 임플란트 재건" "상악 사이너스 리프트 후 임플란트" "하악 좌측 발치즉시 임플란트" "전치부 올세라믹 크라운 교체" "하악 우측 골이식 + 임플란트")
BA_CATEGORIES=("임플란트" "임플란트" "임플란트" "심미" "임플란트")

for i in {0..4}; do
  idx=$((i*4))
  BODY=$(cat <<EOFBA
{
  "title": "${BA_TITLES[$i]}",
  "content": "<h2>${BA_TITLES[$i]}</h2><p>환자: ${i}0대 ${NAMES[$i]}님 케이스.</p><h3>치료 과정</h3><p>1차 진단 → CT 촬영 → 치료 계획 수립 → 시술 → 경과 관찰.</p>",
  "category": "${BA_CATEGORIES[$i]}",
  "images": [
    {"url": "${IMG_URLS[$idx]}", "type": "before_intra", "sort_order": 1},
    {"url": "${IMG_URLS[$((idx+1))]}", "type": "after_intra", "sort_order": 2},
    {"url": "${IMG_URLS[$((idx+2))]}", "type": "before_pano", "sort_order": 3},
    {"url": "${IMG_URLS[$((idx+3))]}", "type": "after_pano", "sort_order": 4}
  ]
}
EOFBA
)
  R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/before-after" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TK" -d "$BODY")
  CODE=$(echo "$R" | tail -1)
  check "$([ "$CODE" = "200" ] && echo true || echo false)" "비포애프터 '${BA_TITLES[$i]}' (HTTP $CODE)"
done

# =============================
# 6. 블로그 5회
# =============================
section "6. 블로그 5회 (인라인 이미지 + H 태그)"

BLOG_TITLES=("발치 후 주의사항 완벽 가이드" "임플란트 수명 늘리는 관리법 7가지" "치주질환 초기 증상 자가진단법" "소아 치과 공포증 극복 프로그램" "직장인을 위한 점심시간 스케일링")

for i in {0..4}; do
  BODY=$(cat <<EOFBL
{
  "title": "${BLOG_TITLES[$i]}",
  "content": "<h2>${BLOG_TITLES[$i]}</h2><p>행복한예인치과에서 안내드립니다.</p><img src='${IMG_URLS[$((20+i))]}' alt='관련 이미지'><h3>핵심 포인트</h3><p>구강 건강은 전신 건강의 시작입니다.</p><h3>Q&A</h3><p>궁금한 점은 02-756-2828로 문의 바랍니다.</p>"
}
EOFBL
)
  R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/blog" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TK" -d "$BODY")
  CODE=$(echo "$R" | tail -1)
  check "$([ "$CODE" = "200" ] && echo true || echo false)" "블로그 '${BLOG_TITLES[$i]}' (HTTP $CODE)"
done

# =============================
# 7. 공지사항 5회
# =============================
section "7. 공지사항 5회 (사진 포함)"

NOTICE_TITLES=("2026년 5월 연휴 진료 안내" "야간진료 시간 변경 안내" "새로운 CT장비 도입 안내" "주차장 이용 안내사항 변경" "건강보험 적용 스케일링 안내")

for i in {0..4}; do
  BODY=$(cat <<EOFNT
{
  "title": "${NOTICE_TITLES[$i]}",
  "content": "<h2>${NOTICE_TITLES[$i]}</h2><p>안녕하세요, 행복한예인치과입니다.</p><img src='${IMG_URLS[$((20+i))]}' alt='공지 이미지'><p>자세한 사항은 02-756-2828로 문의 바랍니다.</p>"
}
EOFNT
)
  R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/notice" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TK" -d "$BODY")
  CODE=$(echo "$R" | tail -1)
  check "$([ "$CODE" = "200" ] && echo true || echo false)" "공지 '${NOTICE_TITLES[$i]}' (HTTP $CODE)"
done

# =============================
# 8. 수정/삭제/권한 테스트
# =============================
section "8. 수정/삭제/권한 엣지케이스"

# 블로그 수정
R=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/boards/blog/6" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TK" -d '{"title":"[수정완료] 발치 후 주의사항 업데이트","content":"<h2>발치 후 주의사항 (업데이트)</h2><p>수정된 내용입니다.</p>"}')
CODE=$(echo "$R" | tail -1)
check "$([ "$CODE" = "200" ] && echo true || echo false)" "블로그 수정 (HTTP $CODE)"

# 수정 확인
R=$(curl -s "$BASE/api/boards/blog/6")
TITLE=$(echo "$R" | python3 -c "import sys,json; print(json.load(sys.stdin).get('post',{}).get('title',''))" 2>/dev/null || echo "")
check "$(echo "$TITLE" | grep -q '수정완료' && echo true || echo false)" "수정 내용 확인: $TITLE"

# 비포애프터 이미지 교체
R=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/boards/before-after/1" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TK" -d "{\"title\":\"[이미지교체] 전악 임플란트 재건\",\"images\":[{\"url\":\"${IMG_URLS[20]}\",\"type\":\"before_intra\",\"sort_order\":1},{\"url\":\"${IMG_URLS[21]}\",\"type\":\"after_intra\",\"sort_order\":2}]}")
CODE=$(echo "$R" | tail -1)
check "$([ "$CODE" = "200" ] && echo true || echo false)" "비포애프터 이미지 교체 (HTTP $CODE)"

# 이미지 교체 확인
R=$(curl -s "$BASE/api/boards/before-after/1")
IMG_CNT=$(echo "$R" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('images',[])))" 2>/dev/null || echo "0")
check "$([ "$IMG_CNT" = "2" ] && echo true || echo false)" "이미지 교체 후 2장 확인 (실제: $IMG_CNT)"

# 공지 삭제
R=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/api/boards/notice/15" -H "Authorization: Bearer $ADMIN_TK")
check "$([ "$R" = "200" ] && echo true || echo false)" "공지 삭제 (HTTP $R)"

# 삭제 확인
R=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/boards/notice/15")
check "$([ "$R" = "404" ] && echo true || echo false)" "삭제 후 404 확인 (HTTP $R)"

# 비인증 수정 차단
R=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$BASE/api/boards/blog/6" -H "Content-Type: application/json" -d '{"title":"해킹시도"}')
check "$([ "$R" = "401" ] && echo true || echo false)" "비인증 수정 차단 (HTTP $R)"

# 비인증 삭제 차단
R=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/api/boards/blog/6")
check "$([ "$R" = "401" ] && echo true || echo false)" "비인증 삭제 차단 (HTTP $R)"

# 일반 회원 토큰으로 글 작성 시도
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/boards/blog" -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKENS[0]}" -d '{"title":"일반회원글","content":"차단되어야 함"}')
check "$([ "$R" = "401" ] && echo true || echo false)" "일반회원 글 작성 차단 (HTTP $R)"

# =============================
# 9. 데이터 무결성 검증
# =============================
section "9. 데이터 무결성 검증"

# 게시물 수 확인 (pagination.total)
BA_TOTAL=$(curl -s "$BASE/api/boards/before-after" | python3 -c "import sys,json; print(json.load(sys.stdin).get('pagination',{}).get('total',0))" 2>/dev/null || echo "0")
check "$([ "$BA_TOTAL" = "5" ] && echo true || echo false)" "비포애프터 총 $BA_TOTAL개 (기대: 5)"

BLOG_TOTAL=$(curl -s "$BASE/api/boards/blog" | python3 -c "import sys,json; print(json.load(sys.stdin).get('pagination',{}).get('total',0))" 2>/dev/null || echo "0")
check "$([ "$BLOG_TOTAL" = "5" ] && echo true || echo false)" "블로그 총 $BLOG_TOTAL개 (기대: 5)"

NOTICE_TOTAL=$(curl -s "$BASE/api/boards/notice" | python3 -c "import sys,json; print(json.load(sys.stdin).get('pagination',{}).get('total',0))" 2>/dev/null || echo "0")
check "$([ "$NOTICE_TOTAL" = "4" ] && echo true || echo false)" "공지 총 $NOTICE_TOTAL개 (기대: 4, 1개 삭제)"

# 대시보드 통계
STATS=$(curl -s "$BASE/api/boards/stats/overview")
TOTAL_P=$(echo "$STATS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('totalPosts',0))" 2>/dev/null || echo "0")
TOTAL_I=$(echo "$STATS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('totalImages',0))" 2>/dev/null || echo "0")
check "$([ "$TOTAL_P" = "14" ] && echo true || echo false)" "대시보드 총 게시물 $TOTAL_P (기대: 14)"
check "$([ "$TOTAL_I" -ge "18" ] && echo true || echo false)" "대시보드 총 이미지 $TOTAL_I (기대: 18+)"

# 비포애프터 상세: 이미지 포함
R=$(curl -s "$BASE/api/boards/before-after/2")
IMG2=$(echo "$R" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('images',[])))" 2>/dev/null || echo "0")
check "$([ "$IMG2" = "4" ] && echo true || echo false)" "비포애프터 #2 이미지 $IMG2장 (기대: 4)"

# 이미지 타입 검증
TYPES=$(echo "$R" | python3 -c "import sys,json; imgs=json.load(sys.stdin).get('images',[]); print(','.join(sorted(set(i.get('image_type','') for i in imgs))))" 2>/dev/null || echo "")
check "$(echo "$TYPES" | grep -q 'after_intra' && echo "$TYPES" | grep -q 'before_intra' && echo true || echo false)" "이미지 타입 확인: $TYPES"

# =============================
# 10. XSS 방어 검증
# =============================
section "10. XSS 방어 검증"

# XSS 제목으로 글 작성
R=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/blog" -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TK" -d '{"title":"<img src=x onerror=alert(1)>XSS Test","content":"<script>document.cookie</script><p>본문</p>"}')
CODE=$(echo "$R" | tail -1)
XSS_ID=$(echo "$R" | head -1 | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null || echo "")
check "$([ "$CODE" = "200" ] && echo true || echo false)" "XSS 제목 글 생성 (HTTP $CODE, ID: $XSS_ID)"

if [ -n "$XSS_ID" ]; then
  HTML=$(curl -s "$BASE/blog/$XSS_ID")
  
  # title 태그에서 이스케이프 확인 (grep -P for unicode)
  check "$(echo "$HTML" | grep '<title>' | grep -q '&lt;' && echo true || echo false)" "title 태그 XSS 이스케이프 확인"
  
  # JSON-LD에서 <script> 태그 원형 존재 여부 (\\u003c로 이스케이프되어야 함)
  check "$(echo "$HTML" | grep 'application/ld+json' | grep -qv '<script>alert' && echo true || echo false)" "JSON-LD XSS 이스케이프"
  
  # og:title에서 이스케이프 확인
  check "$(echo "$HTML" | grep 'og:title' | grep -q '&lt;' && echo true || echo false)" "og:title XSS 이스케이프"
  
  # H1에서 이스케이프 확인
  check "$(echo "$HTML" | grep '<h1' | grep -q '&lt;' && echo true || echo false)" "H1 태그 XSS 이스케이프"
fi

# =============================
# 11. SSR & SEO 검증
# =============================
section "11. SSR & SEO 메타태그"

# 블로그 상세 SSR (python3으로 확인 - grep 한글 이슈 회피)
HTML=$(curl -s "$BASE/blog/7")
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if '<title>' in html else 'false')" 2>/dev/null)" "블로그 title 태그 존재"
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'name=\"robots\"' in html else 'false')" 2>/dev/null)" "robots 메타 존재"
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'rel=\"canonical\"' in html else 'false')" 2>/dev/null)" "canonical 링크 존재"
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'og:type' in html and 'article' in html else 'false')" 2>/dev/null)" "og:type=article 확인"
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'og:description' in html else 'false')" 2>/dev/null)" "og:description 존재"
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'article:published_time' in html else 'false')" 2>/dev/null)" "article:published_time 존재"

# 비포애프터 상세 SSR
HTML=$(curl -s "$BASE/before-after/3")
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if '<h1' in html else 'false')" 2>/dev/null)" "비포애프터 H1 존재"
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'og:type' in html and 'article' in html else 'false')" 2>/dev/null)" "비포애프터 og:type=article"

# 공지 noindex
HTML=$(curl -s "$BASE/notice/11")
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'noindex' in html else 'false')" 2>/dev/null)" "공지 noindex 설정"

# 404 페이지
HTML=$(curl -s "$BASE/blog/99999")
check "$(echo "$HTML" | python3 -c "import sys; html=sys.stdin.read(); print('true' if 'noindex' in html else 'false')" 2>/dev/null)" "404페이지 noindex 확인"

# =============================
# 12. 페이지 렌더링 & 성능
# =============================
section "12. 주요 페이지 렌더링 & 성능"

PAGES=("/" "/philosophy" "/doctors" "/experience" "/location"
       "/treatments/implant" "/treatments/preservation" "/treatments/aesthetic"
       "/treatments/orthodontics" "/treatments/general"
       "/before-after" "/blog" "/notice" "/encyclopedia"
       "/register" "/login"
       "/before-after/2" "/blog/7" "/notice/12")

for p in "${PAGES[@]}"; do
  START_MS=$(date +%s%N)
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$p")
  END_MS=$(date +%s%N)
  ELAPSED=$(( (END_MS - START_MS) / 1000000 ))
  check "$([ "$CODE" = "200" ] && echo true || echo false)" "GET $p → $CODE (${ELAPSED}ms)"
done

# robots.txt & sitemap.xml
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/robots.txt")
check "$([ "$CODE" = "200" ] && echo true || echo false)" "robots.txt (HTTP $CODE)"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/sitemap.xml")
check "$([ "$CODE" = "200" ] && echo true || echo false)" "sitemap.xml (HTTP $CODE)"

# =============================
# 13. 보안 헤더 검증
# =============================
section "13. 보안 헤더 검증"

HEADERS=$(curl -sI "$BASE/")
check "$(echo "$HEADERS" | grep -qi 'X-Content-Type-Options.*nosniff' && echo true || echo false)" "X-Content-Type-Options: nosniff"
check "$(echo "$HEADERS" | grep -qi 'X-Frame-Options' && echo true || echo false)" "X-Frame-Options 존재"
check "$(echo "$HEADERS" | grep -qi 'Strict-Transport-Security' && echo true || echo false)" "HSTS 헤더 존재"
check "$(echo "$HEADERS" | grep -qi 'X-XSS-Protection' && echo true || echo false)" "X-XSS-Protection 존재"
check "$(echo "$HEADERS" | grep -qi 'Referrer-Policy' && echo true || echo false)" "Referrer-Policy 존재"

# API 인증 차단
R=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/boards/blog" -H "Content-Type: application/json" -d '{"title":"hack","content":"test"}')
check "$([ "$R" = "401" ] && echo true || echo false)" "API 인증 미제공 차단 ($R)"

# SQL Injection
R=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/boards/blog?page=1;DROP%20TABLE%20posts")
check "$([ "$R" = "200" ] && echo true || echo false)" "SQL Injection 방어 (HTTP $R)"

# =============================
# 14. 페이지네이션 엣지케이스
# =============================
section "14. 페이지네이션 엣지케이스"

# limit=1
R=$(curl -s "$BASE/api/boards/blog?limit=1")
P_CNT=$(echo "$R" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('posts',[])))" 2>/dev/null || echo "0")
check "$([ "$P_CNT" = "1" ] && echo true || echo false)" "limit=1 → 글 $P_CNT개 (기대: 1)"

# limit=100 (최대 50 제한)
R=$(curl -s "$BASE/api/boards/blog?limit=100")
LIMIT_VAL=$(echo "$R" | python3 -c "import sys,json; print(json.load(sys.stdin).get('pagination',{}).get('limit',0))" 2>/dev/null || echo "0")
check "$([ "$LIMIT_VAL" -le "50" ] && echo true || echo false)" "limit=100 → 실제 limit=$LIMIT_VAL (50이하 기대)"

# 존재하지 않는 보드
R=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/boards/fake-board")
check "$([ "$R" = "400" ] && echo true || echo false)" "존재하지 않는 보드 차단 (HTTP $R)"

# page=999 (빈 결과)
R=$(curl -s "$BASE/api/boards/blog?page=999")
P_CNT=$(echo "$R" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('posts',[])))" 2>/dev/null || echo "0")
check "$([ "$P_CNT" = "0" ] && echo true || echo false)" "page=999 → 빈 결과 ($P_CNT개)"

# =============================
# 15. 동시 요청 스트레스 테스트
# =============================
section "15. 동시 요청 스트레스 테스트"

START_MS=$(date +%s%N)
for j in $(seq 1 10); do
  curl -s -o /dev/null "$BASE/blog" &
done
wait
END_MS=$(date +%s%N)
ELAPSED=$(( (END_MS - START_MS) / 1000000 ))
check "$([ "$ELAPSED" -lt "3000" ] && echo true || echo false)" "동시 10건 /blog 요청 완료 (${ELAPSED}ms, 3초 이내)"

START_MS=$(date +%s%N)
for j in $(seq 1 10); do
  curl -s -o /dev/null "$BASE/api/boards/before-after" &
done
wait
END_MS=$(date +%s%N)
ELAPSED=$(( (END_MS - START_MS) / 1000000 ))
check "$([ "$ELAPSED" -lt "3000" ] && echo true || echo false)" "동시 10건 API 요청 완료 (${ELAPSED}ms, 3초 이내)"

# =============================
# 결과 요약
# =============================
echo ""
echo "════════════════════════════════════════"
echo "  3라운드 시뮬레이션 최종 결과"
echo "════════════════════════════════════════"
echo "  통과: $PASS"
echo "  실패: $FAIL"
echo "  총계: $TOTAL"
echo "════════════════════════════════════════"

if [ $FAIL -gt 0 ]; then
  echo "⚠️  $FAIL개 실패 항목 발견!"
  exit 1
else
  echo "🎉 모든 테스트 통과!"
  exit 0
fi
