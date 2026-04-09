#!/bin/bash
# ============================================================
# Round 2 종합 시뮬레이션 — 엣지 케이스 강화
# ============================================================
BASE="http://localhost:3000"
PASS=0; FAIL=0; TOTAL=0; FAILURES=""
ISSUES=""

check() {
  TOTAL=$((TOTAL+1)); local label="$1" expected="$2" actual="$3"
  if [ "$actual" = "$expected" ]; then PASS=$((PASS+1)); echo "  ✅ $label"
  else FAIL=$((FAIL+1)); FAILURES="$FAILURES\n  ❌ $label (expected=$expected, got=$actual)"; echo "  ❌ $label (expected=$expected, got=$actual)"; fi
}
check_contains() {
  TOTAL=$((TOTAL+1)); local label="$1" needle="$2" haystack="$3"
  if echo "$haystack" | grep -q "$needle"; then PASS=$((PASS+1)); echo "  ✅ $label"
  else FAIL=$((FAIL+1)); FAILURES="$FAILURES\n  ❌ $label (not found: $needle)"; echo "  ❌ $label (not found: $needle)"; fi
}
check_not_contains() {
  TOTAL=$((TOTAL+1)); local label="$1" needle="$2" haystack="$3"
  if echo "$haystack" | grep -q "$needle"; then
    FAIL=$((FAIL+1)); FAILURES="$FAILURES\n  ❌ $label (should NOT contain: $needle)"; echo "  ❌ $label (should NOT contain: $needle)"
  else PASS=$((PASS+1)); echo "  ✅ $label"; fi
}
issue() { ISSUES="$ISSUES\n🔸 $1"; }

echo "═══════════════════════════════════════════"
echo "🏥 Round 2 시뮬레이션 — 엣지 케이스 강화"
echo "═══════════════════════════════════════════"
echo ""

# ============================================================
# 1. 회원가입 5회 + 엣지 케이스
# ============================================================
echo "📝 [1] 회원가입 5회 + 엣지 케이스"
echo "────────────────────────────────"
USERS=(
  '{"email":"hong.gildong@naver.com","password":"Naver1234!","name":"홍길동","phone":"010-1111-2222","birth_date":"1992-07-20","gender":"M","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":true,"marketing_push":true}}'
  '{"email":"shin.saimdang@gmail.com","password":"ArtLove5678","name":"신사임당","phone":"010-3333-4444","birth_date":"1970-01-15","gender":"F","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":false,"marketing_email":false,"marketing_push":false}}'
  '{"email":"sejong@korea.kr","password":"HangulKing99","name":"세종대왕","phone":"010-5555-6666","birth_date":"1965-05-05","gender":"M","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":true,"marketing_push":false}}'
  '{"email":"yuna.kim@figure.com","password":"IceQueen2010","name":"김연아","phone":"010-7777-8888","birth_date":"1990-09-05","gender":"F","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":false,"marketing_email":true,"marketing_push":true}}'
  '{"email":"bts.army@music.com","password":"Dynamite777","name":"방탄소년단","phone":"010-9999-0000","birth_date":"1993-12-30","gender":"M","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":false,"marketing_push":true}}'
)
NAMES=("홍길동" "신사임당" "세종대왕" "김연아" "방탄소년단")

for i in "${!USERS[@]}"; do
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d "${USERS[$i]}")
  CODE=$(echo "$RES" | tail -1)
  check "회원가입 #$((i+1)) (${NAMES[$i]})" "200" "$CODE"
  if [ "$CODE" != "200" ]; then
    BODY=$(echo "$RES" | sed '$d')
    issue "회원가입 ${NAMES[$i]} 실패: $BODY"
  fi
done

# 엣지 케이스: 중복 이메일
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d "${USERS[0]}")
CODE=$(echo "$RES" | tail -1); check "중복 이메일 차단 (409)" "409" "$CODE"

# 엣지 케이스: 비밀번호 너무 짧음
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" \
  -d '{"email":"short@pw.com","password":"Ab1","name":"짧은비번","consents":{"privacy_collection":true,"privacy_provision":true}}')
CODE=$(echo "$RES" | tail -1); check "짧은 비밀번호 차단 (400)" "400" "$CODE"

# 엣지 케이스: 이메일 형식 오류
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","password":"ValidPass123","name":"이메일오류","consents":{"privacy_collection":true,"privacy_provision":true}}')
CODE=$(echo "$RES" | tail -1); check "이메일 형식 오류 차단 (400)" "400" "$CODE"

# 엣지 케이스: 숫자 없는 비밀번호
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" \
  -d '{"email":"nonum@pw.com","password":"NoNumberPassword","name":"숫자없음","consents":{"privacy_collection":true,"privacy_provision":true}}')
CODE=$(echo "$RES" | tail -1); check "숫자 없는 비밀번호 차단 (400)" "400" "$CODE"

# 엣지 케이스: 빈 본문
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" -H "Content-Type: application/json" -d '{}')
CODE=$(echo "$RES" | tail -1); check "빈 본문 차단 (400)" "400" "$CODE"

echo ""

# ============================================================
# 2. 로그인 5회 + 엣지 케이스
# ============================================================
echo "🔑 [2] 로그인 5회 + 엣지 케이스"
echo "────────────────────────────────"
EMAILS=("hong.gildong@naver.com" "shin.saimdang@gmail.com" "sejong@korea.kr" "yuna.kim@figure.com" "bts.army@music.com")
PWDS=("Naver1234!" "ArtLove5678" "HangulKing99" "IceQueen2010" "Dynamite777")
USER_TOKENS=()

for i in "${!EMAILS[@]}"; do
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/login" -H "Content-Type: application/json" \
    -d "{\"email\":\"${EMAILS[$i]}\",\"password\":\"${PWDS[$i]}\"}")
  CODE=$(echo "$RES" | tail -1); BODY=$(echo "$RES" | sed '$d')
  TOKEN=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
  USER_TOKENS+=("$TOKEN")
  check "로그인 #$((i+1)) (${NAMES[$i]})" "200" "$CODE"
done

# 비밀번호 오류
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/login" -H "Content-Type: application/json" \
  -d '{"email":"hong.gildong@naver.com","password":"WrongPass999"}')
CODE=$(echo "$RES" | tail -1); check "잘못된 비밀번호 차단 (401)" "401" "$CODE"

# 미등록 이메일
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/login" -H "Content-Type: application/json" \
  -d '{"email":"nobody@nowhere.com","password":"Whatever123"}')
CODE=$(echo "$RES" | tail -1); check "미등록 이메일 차단 (401)" "401" "$CODE"

# 프로필 조회 — 동의 항목 5개 확인
RES=$(curl -s "$BASE/api/user/profile" -H "Authorization: Bearer ${USER_TOKENS[0]}")
CONSENT_CNT=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print(len(d.get('consents',[])))" 2>/dev/null)
check "프로필 동의 항목 5개" "5" "$CONSENT_CNT"

# 만료/잘못된 토큰으로 프로필 조회 차단
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/user/profile" -H "Authorization: Bearer expired.token.here")
check "만료 토큰 프로필 차단 (401)" "401" "$CODE"

# 토큰 검증 API
RES=$(curl -s -X POST "$BASE/api/user/verify" -H "Authorization: Bearer ${USER_TOKENS[2]}")
VALID=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('valid',False))" 2>/dev/null)
check "토큰 검증 API (valid=True)" "True" "$VALID"

echo ""

# ============================================================
# 3. 관리자 로그인
# ============================================================
echo "🔐 [3] 관리자 로그인"
echo "────────────────────────────────"
RES=$(curl -s -X POST "$BASE/api/auth/login" -H "Content-Type: application/json" -d '{"password":"yein2828!admin"}')
ADMIN_TOKEN=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
[ -n "$ADMIN_TOKEN" ] && check "관리자 로그인 성공" "true" "true" || check "관리자 로그인 성공" "true" "false"

# 관리자 토큰 검증
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/auth/verify" -H "Authorization: Bearer $ADMIN_TOKEN")
check "관리자 토큰 검증 (200)" "200" "$CODE"

echo ""

# ============================================================
# 4. 이미지 업로드 25장
# ============================================================
echo "📸 [4] 이미지 업로드 25장"
echo "────────────────────────────────"
UPLOADED_IMGS=()

upload_img() {
  local label="$1" r="$2" g="$3" b="$4"
  python3 -c "
import struct, zlib, sys
def png(w,h,r,g,b):
    raw=b''
    for y in range(h):
        raw += b'\x00'+bytes([r,g,b])*w
    c=zlib.compress(raw)
    def ch(t,d):
        x=t+d; return struct.pack('>I',len(d))+x+struct.pack('>I',zlib.crc32(x)&0xFFFFFFFF)
    return b'\x89PNG\r\n\x1a\n'+ch(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0))+ch(b'IDAT',c)+ch(b'IEND',b'')
sys.stdout.buffer.write(png(200,150,$r,$g,$b))
" > /tmp/_sim_img.png 2>/dev/null

  RES=$(curl -s -X POST "$BASE/api/upload" -H "Authorization: Bearer $ADMIN_TOKEN" -F "file=@/tmp/_sim_img.png;type=image/png")
  URL=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('url',''))" 2>/dev/null)
  rm -f /tmp/_sim_img.png
  if [ -n "$URL" ] && [ "$URL" != "" ]; then
    UPLOADED_IMGS+=("$URL"); check "업로드: $label" "true" "true"
  else
    UPLOADED_IMGS+=(""); check "업로드: $label" "true" "false"; issue "이미지 업로드 실패: $label — $RES"
  fi
}

# BA용 20장 (5케이스 x 4타입)
C=("70 130 180" "255 127 80" "46 139 87" "218 165 32" "106 90 205" "255 99 71" "0 128 128" "218 112 214" "128 128 0" "160 82 45" "139 0 0" "0 0 128" "34 139 34" "220 20 60" "255 140 0" "147 111 219" "95 158 160" "165 42 42" "47 79 79" "205 92 92")
for i in $(seq 0 19); do
  read r g b <<< "${C[$i]}"
  upload_img "BA-$((i/4+1))-$(echo 'BI AI BP AP' | cut -d' ' -f$((i%4+1)))" $r $g $b
done
# 블로그/공지용 5장
for i in $(seq 0 4); do
  read r g b <<< "${C[$i]}"
  upload_img "Content-$((i+1))" $r $g $b
done

echo "  총 업로드: ${#UPLOADED_IMGS[@]}장"
echo ""

# ============================================================
# 5a. 비포애프터 5회
# ============================================================
echo "🦷 [5a] 비포애프터 5회 게시"
echo "────────────────────────────────"
BA_T=("[임플란트] 하악 우측 #46번 발치즉시 임플란트 — 당일 식립" "[보존] 하악 좌측 #37번 세라믹 인레이" "[교정] 과개교합 교정 - 클리피씨 18개월" "[심미] 상악 전치 2개 다이렉트 레진 수복" "[임플란트] 상악 #14,15번 연속 임플란트 — 뼈이식 동반")
BA_C=(
  "<h2>환자 정보</h2><p>45세 남성. 하악 우측 제1대구치 치근 파절 진단.</p><h3>시술 과정</h3><p>발치 후 잔존골 평가 → 즉시식립 결정 → 4mm×10mm 임플란트 식립 → 임시 크라운 장착.</p><h3>치료 결과</h3><p>식립 3개월 후 최종 지르코니아 크라운 완성. 교합력 100% 회복.</p>"
  "<h2>환자 정보</h2><p>32세 여성. 좌측 하악 대구치 광범위 충치.</p><h3>시술 과정</h3><p>충치 제거 → 세라믹 인레이 인상 → 2주 후 접착.</p><h3>결과</h3><p>자연치아 색상 완벽 재현. 환자 매우 만족.</p>"
  "<h2>환자 정보</h2><p>28세 여성. 심한 과개교합(deep bite) + 전치부 crowding.</p><h3>교정 계획</h3><p>클리피씨 자가결찰 브라켓 + 미니스크류 고정원.</p><h3>결과</h3><p>18개월 교정 후 정상 교합 회복. 스마일라인 개선.</p>"
  "<h2>환자 정보</h2><p>25세 남성. 상악 중절치 2개 절단면 파절.</p><h3>시술</h3><p>직접 복합레진 수복(다이렉트 레진). 1회 방문 완료.</p><h3>결과</h3><p>레진 색상 매칭 우수. 2년 경과 후에도 변색 없음.</p>"
  "<h2>환자 정보</h2><p>55세 여성. 상악 좌측 소구치 2개 결손 + 골질 부족.</p><h3>시술</h3><p>1차: 골이식(자가골+합성골) → 4개월 대기 → 2차: 임플란트 2개 식립.</p><h3>결과</h3><p>골이식 후 충분한 골량 확보. 연속 2개 임플란트 성공적 식립.</p>"
)
BA_IDS=()

for i in $(seq 0 4); do
  BI=${UPLOADED_IMGS[$((i*4+0))]}; AI=${UPLOADED_IMGS[$((i*4+1))]}; BP=${UPLOADED_IMGS[$((i*4+2))]}; AP=${UPLOADED_IMGS[$((i*4+3))]}
  PAYLOAD=$(python3 -c "
import json
print(json.dumps({
  'title': $(python3 -c "import json;print(json.dumps('''${BA_T[$i]}'''))"),
  'content': $(python3 -c "import json;print(json.dumps('''${BA_C[$i]}'''))"),
  'thumbnail_url': '$AI',
  'images': [
    {'url': '$BI', 'type': 'before_intra', 'sort_order': 0},
    {'url': '$AI', 'type': 'after_intra', 'sort_order': 1},
    {'url': '$BP', 'type': 'before_pano', 'sort_order': 2},
    {'url': '$AP', 'type': 'after_pano', 'sort_order': 3}
  ]
}))
")
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/before-after" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$PAYLOAD")
  CODE=$(echo "$RES" | tail -1); BODY=$(echo "$RES" | sed '$d')
  PID=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id','FAIL'))" 2>/dev/null || echo "FAIL")
  BA_IDS+=("$PID")
  check "비포애프터 #$((i+1)) (ID=$PID)" "200" "$CODE"
  [ "$CODE" != "200" ] && issue "BA #$((i+1)) 실패: $BODY"
done
echo ""

# ============================================================
# 5b. 블로그 5회
# ============================================================
echo "📝 [5b] 블로그 5회 게시"
echo "────────────────────────────────"
BLOG_T=("치과 공포증 극복하는 5가지 방법" "충치가 생기는 진짜 이유 — 세균 vs 습관" "임플란트 수명은 진짜 영구적일까?" "치실 vs 워터픽, 치과의사의 솔직한 비교" "명동 직장인을 위한 점심시간 치과 진료 가이드")
BLOG_C=(
  "<h2>치과 공포증이란?</h2><p>전체 인구의 약 15-20%가 치과 공포증을 겪습니다.</p><img src=\"${UPLOADED_IMGS[20]}\" alt=\"치과 공포증\"><h3>극복 방법</h3><ol><li>신뢰할 수 있는 치과 선택</li><li>첫 방문은 상담만</li><li>무통 마취 요청</li><li>음악이나 영상 활용</li><li>정기적 방문으로 익숙해지기</li></ol><p>행복한예인치과는 '무서워하는 만큼 더 설명드리는' 진료를 합니다.</p>"
  "<h2>충치의 원인</h2><p>충치는 Streptococcus mutans 세균이 당분을 먹고 산을 만들어 치아를 녹이는 과정입니다.</p><img src=\"${UPLOADED_IMGS[21]}\" alt=\"충치 원인\"><h3>세균보다 중요한 것은 습관</h3><ul><li>식후 3분 이내 양치</li><li>불소 치약 사용</li><li>간식 횟수 줄이기</li></ul><h3>결론</h3><p>충치 예방은 세균 제거가 아니라 환경 관리입니다.</p>"
  "<h2>임플란트의 실제 수명</h2><p>논문 기준 10년 생존율 95-98%. '영구적'이라고 볼 수 있지만 관리가 전제입니다.</p><img src=\"${UPLOADED_IMGS[22]}\" alt=\"임플란트 수명\"><h3>수명을 줄이는 요인</h3><ul><li>임플란트 주위염</li><li>과도한 교합력</li><li>흡연</li><li>정기검진 미이행</li></ul><h3>관리 팁</h3><p>6개월마다 정기검진 + 임플란트 전용 양치도구 사용을 권장합니다.</p>"
  "<h2>치실 vs 워터픽</h2><p>둘 다 치간 세정 도구지만 용도가 다릅니다.</p><img src=\"${UPLOADED_IMGS[23]}\" alt=\"치실 워터픽 비교\"><h3>치실의 장점</h3><ul><li>치간 플라크 물리적 제거</li><li>휴대성 우수</li><li>비용 저렴</li></ul><h3>워터픽의 장점</h3><ul><li>교정장치·브릿지 관리 용이</li><li>잇몸 마사지 효과</li></ul><h3>결론</h3><p>치과의사 추천: <strong>치실이 기본, 워터픽은 보조</strong>입니다.</p>"
  "<h2>점심시간 치과 진료</h2><p>명동·시청 지역 직장인을 위한 시간 절약 진료 가이드입니다.</p><img src=\"${UPLOADED_IMGS[24]}\" alt=\"점심시간 치과\"><h3>30분 안에 가능한 진료</h3><ul><li>스케일링</li><li>간단한 레진 수복</li><li>교정 체크</li><li>임플란트 상담</li></ul><h3>예약 팁</h3><p>전날 예약하시면 대기 없이 바로 진료 가능합니다. 02-756-2828</p>"
)
BLOG_IDS=()

for i in $(seq 0 4); do
  PAYLOAD=$(python3 -c "
import json
print(json.dumps({
  'title': $(python3 -c "import json;print(json.dumps('''${BLOG_T[$i]}'''))"),
  'content': $(python3 -c "import json;print(json.dumps('''${BLOG_C[$i]}'''))"),
  'thumbnail_url': '${UPLOADED_IMGS[$((20+i))]}'
}))
")
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/blog" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$PAYLOAD")
  CODE=$(echo "$RES" | tail -1); BODY=$(echo "$RES" | sed '$d')
  PID=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id','FAIL'))" 2>/dev/null || echo "FAIL")
  BLOG_IDS+=("$PID")
  check "블로그 #$((i+1)) (ID=$PID)" "200" "$CODE"
done
echo ""

# ============================================================
# 5c. 공지사항 5회
# ============================================================
echo "📢 [5c] 공지사항 5회 게시"
echo "────────────────────────────────"
NOTICE_T=("[진료안내] 2026년 봄 진료시간 변경" "[시설안내] 3층 내부 리모델링 완료" "[안내] 개인정보 처리방침 변경 안내" "[이벤트] 가정의 달 무료 구강검진" "[안내] 비급여 진료비용 고지")
NOTICE_C=(
  "<h2>진료시간 변경</h2><p>2026년 4월부터 진료시간이 아래와 같이 변경됩니다.</p><h3>변경 전</h3><p>월-금 09:00-18:00 / 토 09:00-14:00</p><h3>변경 후</h3><p>월-금 09:00-18:30 / 수 09:00-20:00(야간) / 토 09:00-15:00</p><p>수요일 야간진료가 신설되었습니다.</p><img src=\"${UPLOADED_IMGS[20]}\" alt=\"진료시간\">"
  "<h2>리모델링 완료</h2><p>더 쾌적한 환경을 위해 3층 진료실을 리모델링했습니다.</p><h3>주요 변경사항</h3><ul><li>대기실 확장 (20석 → 30석)</li><li>에어샤워 시스템 설치</li><li>개인 진료실 파티션 교체</li></ul><img src=\"${UPLOADED_IMGS[21]}\" alt=\"리모델링\">"
  "<h2>개인정보 처리방침 변경</h2><p>「개인정보보호법」 개정에 따라 아래 사항이 변경됩니다.</p><h3>변경 일시</h3><p>2026년 5월 1일</p><h3>주요 변경</h3><ul><li>개인정보 보유기간 명확화</li><li>마케팅 동의 철회 절차 간소화</li><li>쿠키 정책 추가</li></ul><p>문의: 02-756-2828</p>"
  "<h2>가정의 달 이벤트</h2><p>5월 가정의 달을 맞아 무료 구강검진을 실시합니다.</p><h3>대상</h3><ul><li>만 65세 이상 어르신</li><li>초등학생 이하 어린이</li></ul><h3>기간</h3><p>2026년 5월 1일 ~ 5월 31일</p><h3>예약</h3><p>전화 02-756-2828 또는 온라인 예약</p><img src=\"${UPLOADED_IMGS[23]}\" alt=\"이벤트\">"
  "<h2>비급여 진료비용</h2><p>「의료법」 제45조에 따라 비급여 진료비를 고지합니다.</p><h3>주요 비급여 항목</h3><table><tr><th>항목</th><th>가격</th></tr><tr><td>임플란트 (1개)</td><td>100~150만원</td></tr><tr><td>세라믹 크라운</td><td>50~70만원</td></tr><tr><td>투명교정</td><td>350~500만원</td></tr><tr><td>라미네이트 (1개)</td><td>50~80만원</td></tr></table><p>정확한 비용은 상담 후 결정됩니다.</p>"
)
NOTICE_IDS=()

for i in $(seq 0 4); do
  PAYLOAD=$(python3 -c "
import json
print(json.dumps({
  'title': $(python3 -c "import json;print(json.dumps('''${NOTICE_T[$i]}'''))"),
  'content': $(python3 -c "import json;print(json.dumps('''${NOTICE_C[$i]}'''))"),
  'thumbnail_url': '${UPLOADED_IMGS[$((20+i))]}'
}))
")
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/notice" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" -d "$PAYLOAD")
  CODE=$(echo "$RES" | tail -1); BODY=$(echo "$RES" | sed '$d')
  PID=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id','FAIL'))" 2>/dev/null || echo "FAIL")
  NOTICE_IDS+=("$PID")
  check "공지사항 #$((i+1)) (ID=$PID)" "200" "$CODE"
done
echo ""

# ============================================================
# 6. 게시물 수정(PUT) & 삭제(DELETE) 테스트
# ============================================================
echo "✏️ [6] 게시물 수정 & 삭제 테스트"
echo "────────────────────────────────"

# 블로그 수정
if [ "${BLOG_IDS[0]}" != "FAIL" ]; then
  RES=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/boards/blog/${BLOG_IDS[0]}" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d '{"title":"[수정됨] 치과 공포증 극복하는 5가지 방법","content":"<h2>수정된 내용</h2><p>업데이트된 본문입니다.</p>"}')
  CODE=$(echo "$RES" | tail -1); check "블로그 수정 (PUT)" "200" "$CODE"
  
  # 수정 확인
  RES=$(curl -s "$BASE/api/boards/blog/${BLOG_IDS[0]}")
  TITLE=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('post',{}).get('title',''))" 2>/dev/null)
  check_contains "수정된 제목 확인" "[수정됨]" "$TITLE"
fi

# 비포애프터 이미지 교체 수정
if [ "${BA_IDS[0]}" != "FAIL" ]; then
  RES=$(curl -s -w "\n%{http_code}" -X PUT "$BASE/api/boards/before-after/${BA_IDS[0]}" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "{\"title\":\"[수정] 하악 우측 #46번 즉시식립\",\"content\":\"<h2>수정됨</h2>\",\"images\":[{\"url\":\"${UPLOADED_IMGS[0]}\",\"type\":\"before_intra\",\"sort_order\":0},{\"url\":\"${UPLOADED_IMGS[1]}\",\"type\":\"after_intra\",\"sort_order\":1}]}")
  CODE=$(echo "$RES" | tail -1); check "비포애프터 수정+이미지교체 (PUT)" "200" "$CODE"
  
  # 이미지 수 변경 확인 (4→2)
  RES=$(curl -s "$BASE/api/boards/before-after/${BA_IDS[0]}")
  IMG_CNT=$(echo "$RES" | python3 -c "import sys,json;print(len(json.load(sys.stdin).get('images',[])))" 2>/dev/null)
  check "수정 후 이미지 수=2" "2" "$IMG_CNT"
fi

# 공지 삭제
if [ "${NOTICE_IDS[4]}" != "FAIL" ]; then
  RES=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE/api/boards/notice/${NOTICE_IDS[4]}" \
    -H "Authorization: Bearer $ADMIN_TOKEN")
  CODE=$(echo "$RES" | tail -1); check "공지 삭제 (DELETE)" "200" "$CODE"
  
  # 삭제 확인
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/boards/notice/${NOTICE_IDS[4]}")
  check "삭제된 공지 404" "404" "$CODE"
fi

# 인증 없이 수정/삭제 차단
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$BASE/api/boards/blog/${BLOG_IDS[0]}" \
  -H "Content-Type: application/json" -d '{"title":"해킹"}')
check "인증 없이 수정 차단 (401)" "401" "$CODE"

CODE=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE/api/boards/blog/${BLOG_IDS[0]}")
check "인증 없이 삭제 차단 (401)" "401" "$CODE"

echo ""

# ============================================================
# 7. 데이터 무결성 & SEO 검증
# ============================================================
echo "🔍 [7] 데이터 무결성 & SEO 검증"
echo "────────────────────────────────"

# 목록 API
for BOARD in "before-after" "blog" "notice"; do
  RES=$(curl -s "$BASE/api/boards/$BOARD")
  TOTAL=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('pagination',{}).get('total',0))" 2>/dev/null)
  if [ "$BOARD" = "notice" ]; then
    check "$BOARD 목록 total=4 (1개 삭제)" "4" "$TOTAL"
  else
    check "$BOARD 목록 total=5" "5" "$TOTAL"
  fi
done

# 대시보드
RES=$(curl -s "$BASE/api/boards/stats/overview")
DASH_POSTS=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('totalPosts',0))" 2>/dev/null)
DASH_IMGS=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('totalImages',0))" 2>/dev/null)
check "대시보드 totalPosts=14 (15-1삭제)" "14" "$DASH_POSTS"
# 원래 20개 BA이미지 → BA#1이 4→2로 변경 = 18개
check "대시보드 totalImages=18 (20-2수정)" "18" "$DASH_IMGS"

# 비포애프터 상세 — 수정 안 한 것 이미지 4장
if [ "${BA_IDS[1]}" != "FAIL" ]; then
  RES=$(curl -s "$BASE/api/boards/before-after/${BA_IDS[1]}")
  IMG_CNT=$(echo "$RES" | python3 -c "import sys,json;print(len(json.load(sys.stdin).get('images',[])))" 2>/dev/null)
  check "비포애프터 #2 이미지=4" "4" "$IMG_CNT"
  HAS_TYPES=$(echo "$RES" | python3 -c "
import sys,json
d=json.load(sys.stdin)
types=set(i['image_type'] for i in d.get('images',[]))
print('true' if {'before_intra','after_intra','before_pano','after_pano'}.issubset(types) else 'false')
" 2>/dev/null)
  check "비포애프터 #2 이미지 타입 4종" "true" "$HAS_TYPES"
fi

# 블로그 인라인 이미지 & H태그
if [ "${BLOG_IDS[1]}" != "FAIL" ]; then
  RES=$(curl -s "$BASE/api/boards/blog/${BLOG_IDS[1]}")
  HAS_IMG=$(echo "$RES" | python3 -c "import sys,json;print('true' if '<img' in json.load(sys.stdin).get('post',{}).get('content','') else 'false')" 2>/dev/null)
  HAS_H2=$(echo "$RES" | python3 -c "import sys,json;print('true' if '<h2>' in json.load(sys.stdin).get('post',{}).get('content','') else 'false')" 2>/dev/null)
  check "블로그 #2 인라인 이미지" "true" "$HAS_IMG"
  check "블로그 #2 H2 태그" "true" "$HAS_H2"
fi

# SSR 메타 태그 — 블로그
if [ "${BLOG_IDS[1]}" != "FAIL" ]; then
  HTML=$(curl -s "$BASE/blog/${BLOG_IDS[1]}")
  TITLE=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'<title>(.*?)</title>',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "블로그 SSR 제목" "충치" "$TITLE"
  CANON=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'rel=\"canonical\" href=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "블로그 SSR canonical" "/blog/${BLOG_IDS[1]}" "$CANON"
  ROBOTS=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'name=\"robots\" content=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "블로그 SSR robots=index" "index" "$ROBOTS"
  OG=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'property=\"og:type\" content=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  check "블로그 og:type=article" "article" "$OG"
  # og:description이 빈 값이 아닌지 확인
  OG_DESC=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'property=\"og:description\" content=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  [ -n "$OG_DESC" ] && check "블로그 og:description 존재" "true" "true" || check "블로그 og:description 존재" "true" "false"
fi

# SSR — 비포애프터
if [ "${BA_IDS[1]}" != "FAIL" ]; then
  HTML=$(curl -s "$BASE/before-after/${BA_IDS[1]}")
  TITLE=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'<title>(.*?)</title>',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "비포애프터 SSR 제목" "보존" "$TITLE"
  ROBOTS=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'name=\"robots\" content=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "비포애프터 SSR robots=index" "index" "$ROBOTS"
  # H1 태그 1개 확인
  H1_CNT=$(echo "$HTML" | grep -c '<h1')
  check "비포애프터 SSR H1 1개" "1" "$H1_CNT"
fi

# SSR — 공지사항 (noindex)
if [ "${NOTICE_IDS[0]}" != "FAIL" ]; then
  HTML=$(curl -s "$BASE/notice/${NOTICE_IDS[0]}")
  ROBOTS=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'name=\"robots\" content=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "공지사항 SSR robots=noindex" "noindex" "$ROBOTS"
  CANON=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'rel=\"canonical\" href=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
  check_contains "공지사항 SSR canonical 자기 ID 포함" "/notice/${NOTICE_IDS[0]}" "$CANON"
fi

# 존재하지 않는 글
HTML=$(curl -s "$BASE/blog/9999")
ROBOTS=$(echo "$HTML" | python3 -c "import sys,re;m=re.search(r'name=\"robots\" content=\"(.*?)\"',sys.stdin.read());print(m.group(1) if m else '')")
check_contains "404 글 noindex" "noindex" "$ROBOTS"
H404=$(echo "$HTML" | grep -c '찾을 수 없습니다')
[ "$H404" -gt 0 ] && check "404 메시지 표시" "true" "true" || check "404 메시지 표시" "true" "false"

echo ""

# ============================================================
# 8. 페이지 렌더링 + 응답 시간
# ============================================================
echo "📄 [8] 페이지 렌더링 & 응답 시간"
echo "────────────────────────────────"
PAGES=("/" "/philosophy" "/doctors" "/experience" "/location" "/treatments/implant" "/treatments/preservation" "/treatments/aesthetic" "/treatments/orthodontics" "/treatments/general" "/before-after" "/blog" "/notice" "/encyclopedia" "/register" "/login" "/admin/login")
for P in "${PAGES[@]}"; do
  START=$(python3 -c "import time;print(int(time.time()*1000))")
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$P")
  END=$(python3 -c "import time;print(int(time.time()*1000))")
  MS=$((END - START))
  check "GET $P → 200 (${MS}ms)" "200" "$CODE"
  [ "$MS" -gt 500 ] && issue "SLOW: $P ${MS}ms"
done

# sitemap.xml & robots.txt
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/robots.txt")
check "GET /robots.txt → 200" "200" "$CODE"

RES=$(curl -s "$BASE/sitemap.xml")
check_contains "sitemap에 /blog 포함" "/blog" "$RES"
check_contains "sitemap에 /before-after 포함" "/before-after" "$RES"
check_contains "sitemap에 /notice 포함" "/notice" "$RES"

echo ""

# ============================================================
# 결과 요약
# ============================================================
echo "═══════════════════════════════════════════"
echo "📊 Round 2 최종 결과: $PASS/$TOTAL 통과, $FAIL 실패"
echo "═══════════════════════════════════════════"
if [ $FAIL -gt 0 ]; then
  echo ""; echo "❌ 실패 항목:"; echo -e "$FAILURES"
fi
if [ -n "$ISSUES" ]; then
  echo ""; echo "⚠️  발견된 이슈:"; echo -e "$ISSUES"
fi
