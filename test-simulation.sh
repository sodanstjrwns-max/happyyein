#!/bin/bash
# ============================================================
# 전체 시뮬레이션: 회원가입 5회, 로그인 5회, 게시물 15회 (사진 포함)
# ============================================================
BASE="http://localhost:3000"
PASS=0
FAIL=0
TOTAL=0
FAILURES=""

check() {
  TOTAL=$((TOTAL+1))
  local label="$1"
  local expected="$2"
  local actual="$3"
  if [ "$actual" = "$expected" ]; then
    PASS=$((PASS+1))
    echo "  ✅ $label"
  else
    FAIL=$((FAIL+1))
    FAILURES="$FAILURES\n  ❌ $label (expected=$expected, got=$actual)"
    echo "  ❌ $label (expected=$expected, got=$actual)"
  fi
}

check_contains() {
  TOTAL=$((TOTAL+1))
  local label="$1"
  local needle="$2"
  local haystack="$3"
  if echo "$haystack" | grep -q "$needle"; then
    PASS=$((PASS+1))
    echo "  ✅ $label"
  else
    FAIL=$((FAIL+1))
    FAILURES="$FAILURES\n  ❌ $label (not found: $needle)"
    echo "  ❌ $label (not found: $needle)"
  fi
}

echo "========================================"
echo "🏥 행복한예인치과 전체 시뮬레이션 시작"
echo "========================================"
echo ""

# ============================================================
# 1. 회원가입 5회
# ============================================================
echo "📝 [1/6] 회원가입 5회 시뮬레이션"
echo "────────────────────────────────"
USERS=(
  '{"email":"kim.minjae@test.com","password":"TestPass1234","name":"김민재","phone":"010-1234-5678","birth_date":"1990-05-15","gender":"M","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":true,"marketing_push":false}}'
  '{"email":"lee.soyeon@test.com","password":"SecurePass5678","name":"이소연","phone":"010-2345-6789","birth_date":"1985-11-22","gender":"F","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":false,"marketing_email":true,"marketing_push":true}}'
  '{"email":"park.jihun@test.com","password":"StrongPw9012","name":"박지훈","phone":"010-3456-7890","birth_date":"1978-03-08","gender":"M","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":false,"marketing_push":false}}'
  '{"email":"choi.yuna@test.com","password":"MyPass3456","name":"최유나","phone":"010-4567-8901","birth_date":"1995-08-30","gender":"F","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":false,"marketing_email":false,"marketing_push":false}}'
  '{"email":"jung.taewoo@test.com","password":"JungTw7890","name":"정태우","phone":"010-5678-9012","birth_date":"1982-12-01","gender":"M","consents":{"privacy_collection":true,"privacy_provision":true,"marketing_sms":true,"marketing_email":true,"marketing_push":true}}'
)

for i in "${!USERS[@]}"; do
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" \
    -H "Content-Type: application/json" -d "${USERS[$i]}")
  CODE=$(echo "$RES" | tail -1)
  BODY=$(echo "$RES" | sed '$d')
  NAME=$(echo "${USERS[$i]}" | python3 -c "import sys,json;print(json.load(sys.stdin)['name'])")
  check "회원가입 #$((i+1)) ($NAME)" "200" "$CODE"
done

# 중복 가입 테스트
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" \
  -H "Content-Type: application/json" -d "${USERS[0]}")
CODE=$(echo "$RES" | tail -1)
check "중복 이메일 차단" "409" "$CODE"

# 필수 동의 미체크 테스트
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"fail@test.com","password":"FailPass1234","name":"실패자","consents":{"privacy_collection":true,"privacy_provision":false}}')
CODE=$(echo "$RES" | tail -1)
check "필수 동의 미체크 차단" "400" "$CODE"

echo ""

# ============================================================
# 2. 로그인 5회
# ============================================================
echo "🔑 [2/6] 로그인 5회 시뮬레이션"
echo "────────────────────────────────"
EMAILS=("kim.minjae@test.com" "lee.soyeon@test.com" "park.jihun@test.com" "choi.yuna@test.com" "jung.taewoo@test.com")
PWDS=("TestPass1234" "SecurePass5678" "StrongPw9012" "MyPass3456" "JungTw7890")
NAMES=("김민재" "이소연" "박지훈" "최유나" "정태우")
USER_TOKENS=()

for i in "${!EMAILS[@]}"; do
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"${EMAILS[$i]}\",\"password\":\"${PWDS[$i]}\"}")
  CODE=$(echo "$RES" | tail -1)
  BODY=$(echo "$RES" | sed '$d')
  TOKEN=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
  USER_TOKENS+=("$TOKEN")
  check "로그인 #$((i+1)) (${NAMES[$i]})" "200" "$CODE"
done

# 잘못된 비밀번호
RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/user/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"kim.minjae@test.com","password":"WrongPass1234"}')
CODE=$(echo "$RES" | tail -1)
check "잘못된 비밀번호 차단" "401" "$CODE"

# 프로필 조회 (첫 번째 유저)
RES=$(curl -s -w "\n%{http_code}" "$BASE/api/user/profile" \
  -H "Authorization: Bearer ${USER_TOKENS[0]}")
CODE=$(echo "$RES" | tail -1)
BODY=$(echo "$RES" | sed '$d')
check "프로필 조회" "200" "$CODE"
check_contains "프로필 이름 확인" "김민재" "$BODY"
check_contains "프로필 동의 확인" "consents" "$BODY"

echo ""

# ============================================================
# 3. 관리자 로그인
# ============================================================
echo "🔐 [3/6] 관리자 로그인"
echo "────────────────────────────────"
RES=$(curl -s -X POST "$BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"yein2828!admin"}')
ADMIN_TOKEN=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
if [ -n "$ADMIN_TOKEN" ] && [ "$ADMIN_TOKEN" != "" ]; then
  check "관리자 로그인 성공" "true" "true"
else
  check "관리자 로그인 성공" "true" "false"
fi
echo ""

# ============================================================
# 4. 이미지 업로드 (시뮬레이션용 생성)
# ============================================================
echo "📸 [4/6] 이미지 업로드"
echo "────────────────────────────────"
UPLOADED_IMGS=()

upload_image() {
  local label="$1"
  local color="$2"
  local text="$3"

  # 작은 PNG 생성 (100x100)
  python3 -c "
from PIL import Image, ImageDraw, ImageFont
import io, sys
img = Image.new('RGB', (400, 300), color='$color')
draw = ImageDraw.Draw(img)
draw.text((20, 130), '$text', fill='white')
img.save(sys.stdout.buffer, format='JPEG')
" > /tmp/test_img_$$.jpg 2>/dev/null

  if [ ! -s /tmp/test_img_$$.jpg ]; then
    # PIL 실패 시 순수 파일 생성
    python3 -c "
import struct, zlib, sys
def create_png(w, h, r, g, b):
    raw = b''
    for y in range(h):
        raw += b'\x00' + bytes([r, g, b]) * w
    compressed = zlib.compress(raw)
    def chunk(ctype, data):
        c = ctype + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xFFFFFFFF)
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')
colors = {'steelblue':(70,130,180),'coral':(255,127,80),'seagreen':(46,139,87),'goldenrod':(218,165,32),'slateblue':(106,90,205),'tomato':(255,99,71),'teal':(0,128,128),'orchid':(218,112,214),'olive':(128,128,0),'sienna':(160,82,45),'darkred':(139,0,0),'navy':(0,0,128),'forestgreen':(34,139,34),'crimson':(220,20,60),'darkorange':(255,140,0),'mediumpurple':(147,111,219),'cadetblue':(95,158,160),'brown':(165,42,42),'darkslategray':(47,79,79),'indianred':(205,92,92)}
c = colors.get('$color', (100,100,100))
sys.stdout.buffer.write(create_png(200, 150, *c))
" > /tmp/test_img_$$.png 2>/dev/null
    RES=$(curl -s -X POST "$BASE/api/upload" \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -F "file=@/tmp/test_img_$$.png;type=image/png")
  else
    RES=$(curl -s -X POST "$BASE/api/upload" \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -F "file=@/tmp/test_img_$$.jpg;type=image/jpeg")
  fi

  URL=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('url',''))" 2>/dev/null)
  rm -f /tmp/test_img_$$.jpg /tmp/test_img_$$.png

  if [ -n "$URL" ] && [ "$URL" != "" ]; then
    UPLOADED_IMGS+=("$URL")
    check "이미지 업로드: $label" "true" "true"
  else
    UPLOADED_IMGS+=("")
    check "이미지 업로드: $label" "true" "false"
    echo "    Response: $RES"
  fi
}

# Before-After용 이미지 20장 (5케이스 x 4타입)
BA_COLORS=("steelblue" "coral" "seagreen" "goldenrod" "slateblue" "tomato" "teal" "orchid" "olive" "sienna" "darkred" "navy" "forestgreen" "crimson" "darkorange" "mediumpurple" "cadetblue" "brown" "darkslategray" "indianred")
BA_LABELS=("BA1-BI" "BA1-AI" "BA1-BP" "BA1-AP" "BA2-BI" "BA2-AI" "BA2-BP" "BA2-AP" "BA3-BI" "BA3-AI" "BA3-BP" "BA3-AP" "BA4-BI" "BA4-AI" "BA4-BP" "BA4-AP" "BA5-BI" "BA5-AI" "BA5-BP" "BA5-AP")

for i in $(seq 0 19); do
  upload_image "${BA_LABELS[$i]}" "${BA_COLORS[$i]}" "${BA_LABELS[$i]}"
done

# 블로그/공지용 이미지 5장
BLOG_COLORS=("steelblue" "coral" "seagreen" "goldenrod" "slateblue")
for i in $(seq 0 4); do
  upload_image "Blog/Notice-$((i+1))" "${BLOG_COLORS[$i]}" "Content-$((i+1))"
done

echo "  총 업로드된 이미지: ${#UPLOADED_IMGS[@]}"
echo ""

# ============================================================
# 5. 비포애프터 5회 게시
# ============================================================
echo "🦷 [5a/6] 비포애프터 5회 게시"
echo "────────────────────────────────"
BA_TITLES=(
  "[임플란트] 상악 좌측 #26번 발치즉시 임플란트"
  "[교정] 앞니 돌출 교정 - 투명교정 12개월"
  "[보존] 충치 신경치료 후 세라믹 크라운"
  "[심미] 앞니 4개 라미네이트 - 자연스러운 미소"
  "[임플란트] 하악 좌우 #36,46번 동시 임플란트"
)
BA_CONTENTS=(
  "<h2>환자 정보</h2><p>50대 남성, 좌측 상악 대구치 파절</p><h3>치료 과정</h3><p>발치 후 즉시 임플란트 식립. 4개월 후 최종 보철물 장착.</p><h3>치료 결과</h3><p>자연치아와 구분이 어려울 정도로 심미적, 기능적 회복 완료.</p>"
  "<h2>환자 정보</h2><p>20대 여성, 상악 전치부 돌출</p><h3>교정 방법</h3><p>투명교정(인비절라인) 12개월 치료.</p><h3>치료 결과</h3><p>정상 교합 및 자연스러운 스마일라인 회복.</p>"
  "<h2>환자 정보</h2><p>40대 남성, 하악 우측 제1대구치 심한 충치</p><h3>치료 과정</h3><p>현미경 신경치료 3회 → 세라믹 크라운 수복.</p><h3>치료 결과</h3><p>자연치아 보존 성공, 정상 저작 기능 회복.</p>"
  "<h2>환자 정보</h2><p>30대 여성, 상악 전치 4개 변색 및 형태 불만</p><h3>치료 과정</h3><p>최소 삭제 라미네이트 4개 제작 및 접착.</p><h3>치료 결과</h3><p>자연스럽고 밝은 미소 회복. 환자 만족도 매우 높음.</p>"
  "<h2>환자 정보</h2><p>60대 여성, 하악 좌우 대구치 상실</p><h3>치료 과정</h3><p>CT 분석 후 동시 2개 임플란트 식립. 3개월 후 보철.</p><h3>치료 결과</h3><p>양측 저작 기능 완전 회복, 식사 불편 해소.</p>"
)
BA_IDS=()

for i in $(seq 0 4); do
  BI=${UPLOADED_IMGS[$((i*4+0))]}     # before_intra
  AI=${UPLOADED_IMGS[$((i*4+1))]}     # after_intra
  BP=${UPLOADED_IMGS[$((i*4+2))]}     # before_pano
  AP=${UPLOADED_IMGS[$((i*4+3))]}     # after_pano
  THUMB="$AI"

  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/before-after" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "$(python3 -c "
import json
print(json.dumps({
  'title': '''${BA_TITLES[$i]}''',
  'content': '''${BA_CONTENTS[$i]}''',
  'thumbnail_url': '$THUMB',
  'images': [
    {'url': '$BI', 'type': 'before_intra', 'sort_order': 0},
    {'url': '$AI', 'type': 'after_intra', 'sort_order': 1},
    {'url': '$BP', 'type': 'before_pano', 'sort_order': 2},
    {'url': '$AP', 'type': 'after_pano', 'sort_order': 3}
  ]
}))
")")
  CODE=$(echo "$RES" | tail -1)
  BODY=$(echo "$RES" | sed '$d')
  PID=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id','FAIL'))" 2>/dev/null || echo "FAIL")
  BA_IDS+=("$PID")
  check "비포애프터 #$((i+1)) '${BA_TITLES[$i]:0:25}...' (ID=$PID)" "200" "$CODE"
done

echo ""

# ============================================================
# 5b. 블로그 5회 게시
# ============================================================
echo "📝 [5b/6] 블로그 5회 게시"
echo "────────────────────────────────"
BLOG_TITLES=(
  "발치즉시 임플란트, 정말 하루만에 가능할까요?"
  "신경치료 후 크라운, 꼭 해야 하나요?"
  "스케일링 후 이가 시린 이유, 치과의사가 알려드립니다"
  "투명교정 vs 메탈교정, 어떤 게 나에게 맞을까?"
  "잇몸이 붓고 피가 나는 이유와 치료법"
)
BLOG_CONTENTS=(
  "<h2>발치즉시 임플란트란?</h2><p>발치와 동시에 임플란트를 식립하는 시술입니다.</p><img src=\"${UPLOADED_IMGS[20]}\" alt=\"임플란트 설명\"><h3>치료 과정</h3><p>1단계: CT 촬영 → 2단계: 발치 → 3단계: 즉시식립</p><h3>장점</h3><ul><li>치료 기간 단축</li><li>수술 횟수 감소</li><li>잇몸뼈 보존</li></ul><p>행복한예인치과는 80% 이상의 임플란트를 즉시식립으로 진행합니다.</p>"
  "<h2>신경치료 후 크라운의 필요성</h2><p>신경치료를 받은 치아는 혈액 공급이 중단되어 시간이 지나면 약해집니다.</p><img src=\"${UPLOADED_IMGS[21]}\" alt=\"크라운 설명\"><h3>크라운을 하지 않으면?</h3><p>치아 파절 위험이 5배 이상 증가합니다.</p><h3>크라운 종류</h3><ul><li>지르코니아 크라운</li><li>세라믹 크라운</li><li>PFM 크라운</li></ul>"
  "<h2>스케일링 후 시린 이유</h2><p>치석이 치아 표면을 덮고 있다가 제거되면 외부 자극에 노출됩니다.</p><img src=\"${UPLOADED_IMGS[22]}\" alt=\"스케일링 설명\"><h3>얼마나 지속되나요?</h3><p>보통 1-2주 내에 자연스럽게 사라집니다.</p><h3>관리 방법</h3><ol><li>시린이 전용 치약 사용</li><li>지나치게 찬/뜨거운 음식 피하기</li><li>부드러운 칫솔 사용</li></ol>"
  "<h2>교정 방법 비교</h2><p>두 가지 교정 방법의 장단점을 비교해드립니다.</p><img src=\"${UPLOADED_IMGS[23]}\" alt=\"교정 비교\"><h3>투명교정</h3><ul><li>심미적 우수</li><li>탈착 가능</li><li>경도~중등도 부정교합에 적합</li></ul><h3>메탈교정</h3><ul><li>모든 부정교합 치료 가능</li><li>비용 합리적</li><li>치료 기간이 짧을 수 있음</li></ul>"
  "<h2>잇몸 출혈의 원인</h2><p>잇몸병(치주질환)은 성인의 약 80%가 경험하는 흔한 질환입니다.</p><img src=\"${UPLOADED_IMGS[24]}\" alt=\"잇몸 치료\"><h3>주요 원인</h3><ul><li>치태·치석 축적</li><li>잘못된 양치 습관</li><li>흡연</li><li>당뇨 등 전신질환</li></ul><h3>치료 방법</h3><p>초기 잇몸병은 스케일링과 올바른 양치로 호전됩니다. 진행된 경우 잇몸 소파술이 필요할 수 있습니다.</p>"
)
BLOG_IDS=()

for i in $(seq 0 4); do
  PAYLOAD=$(python3 -c "
import json, sys
title = '''${BLOG_TITLES[$i]}'''
content = '''${BLOG_CONTENTS[$i]}'''
print(json.dumps({'title': title, 'content': content, 'thumbnail_url': '${UPLOADED_IMGS[$((20+i))]}'}))
")
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/blog" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "$PAYLOAD")
  CODE=$(echo "$RES" | tail -1)
  BODY=$(echo "$RES" | sed '$d')
  PID=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id','FAIL'))" 2>/dev/null || echo "FAIL")
  BLOG_IDS+=("$PID")
  check "블로그 #$((i+1)) '${BLOG_TITLES[$i]:0:25}...' (ID=$PID)" "200" "$CODE"
done

echo ""

# ============================================================
# 5c. 공지사항 5회 게시
# ============================================================
echo "📢 [5c/6] 공지사항 5회 게시"
echo "────────────────────────────────"
NOTICE_TITLES=(
  "[안내] 2026년 5월 휴진 일정 안내"
  "[중요] 온라인 예약 시스템 점검 안내 (4/15)"
  "[이벤트] 봄맞이 스케일링 할인 이벤트"
  "[채용] 치위생사 및 간호조무사 채용 공고"
  "[안내] 주차장 이용 안내 변경"
)
NOTICE_CONTENTS=(
  "<h2>2026년 5월 휴진 안내</h2><p>아래 일정에 휴진합니다. 참고 부탁드립니다.</p><ul><li>5월 1일(목) - 근로자의 날</li><li>5월 5일(월) - 어린이날</li><li>5월 6일(화) - 대체공휴일</li></ul><p>응급 상황 시 02-756-2828로 연락 주세요.</p><img src=\"${UPLOADED_IMGS[20]}\" alt=\"휴진 안내\">"
  "<h2>온라인 예약 시스템 점검</h2><p>보다 나은 서비스를 위해 예약 시스템을 점검합니다.</p><h3>점검 일시</h3><p>2026년 4월 15일(화) 오전 2시 ~ 오전 6시</p><h3>영향 범위</h3><ul><li>온라인 예약 불가</li><li>전화 예약은 정상 가능</li></ul><img src=\"${UPLOADED_IMGS[21]}\" alt=\"시스템 점검\">"
  "<h2>봄맞이 스케일링 이벤트</h2><p>건강한 봄을 맞이하여 스케일링 할인 이벤트를 진행합니다.</p><h3>이벤트 기간</h3><p>2026년 4월 1일 ~ 4월 30일</p><h3>이벤트 내용</h3><ul><li>스케일링 + 검진: 30% 할인</li><li>가족 동반 시 추가 10% 할인</li></ul><img src=\"${UPLOADED_IMGS[22]}\" alt=\"이벤트 안내\">"
  "<h2>채용 공고</h2><p>행복한예인치과에서 함께 일할 동료를 찾습니다.</p><h3>모집 분야</h3><ul><li>치위생사 2명</li><li>간호조무사 1명</li></ul><h3>자격 요건</h3><p>관련 면허 소지자, 경력 무관</p><h3>지원 방법</h3><p>이메일: hr@happyyein.kr</p><img src=\"${UPLOADED_IMGS[23]}\" alt=\"채용 공고\">"
  "<h2>주차장 안내 변경</h2><p>2026년 5월부터 주차 안내가 변경됩니다.</p><h3>변경 내용</h3><ul><li>진료 시 1시간 무료 주차</li><li>추가 30분당 1,000원</li><li>효덕빌딩 지하 주차장 이용</li></ul><p>대중교통 이용을 권장합니다. 시청역 5분, 명동역 8분.</p><img src=\"${UPLOADED_IMGS[24]}\" alt=\"주차 안내\">"
)
NOTICE_IDS=()

for i in $(seq 0 4); do
  PAYLOAD=$(python3 -c "
import json
title = '''${NOTICE_TITLES[$i]}'''
content = '''${NOTICE_CONTENTS[$i]}'''
print(json.dumps({'title': title, 'content': content, 'thumbnail_url': '${UPLOADED_IMGS[$((20+i))]}'}))
")
  RES=$(curl -s -w "\n%{http_code}" -X POST "$BASE/api/boards/notice" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -d "$PAYLOAD")
  CODE=$(echo "$RES" | tail -1)
  BODY=$(echo "$RES" | sed '$d')
  PID=$(echo "$BODY" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id','FAIL'))" 2>/dev/null || echo "FAIL")
  NOTICE_IDS+=("$PID")
  check "공지사항 #$((i+1)) '${NOTICE_TITLES[$i]:0:25}...' (ID=$PID)" "200" "$CODE"
done

echo ""

# ============================================================
# 6. 데이터 무결성 검증
# ============================================================
echo "🔍 [6/6] 데이터 무결성 검증"
echo "────────────────────────────────"

# 게시판 목록 확인
for BOARD in "before-after" "blog" "notice"; do
  RES=$(curl -s "$BASE/api/boards/$BOARD")
  TOTAL=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('pagination',{}).get('total',0))" 2>/dev/null)
  COUNT=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print(len(d.get('posts',[])))" 2>/dev/null)
  check "$BOARD 목록 total=5" "5" "$TOTAL"
  check "$BOARD 목록 count=5" "5" "$COUNT"
done

# 비포애프터 상세 - 이미지 4장 확인
if [ "${BA_IDS[0]}" != "FAIL" ] && [ -n "${BA_IDS[0]}" ]; then
  RES=$(curl -s "$BASE/api/boards/before-after/${BA_IDS[0]}")
  IMG_CNT=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print(len(d.get('images',[])))" 2>/dev/null)
  check "비포애프터 #1 이미지 수=4" "4" "$IMG_CNT"
  
  # 이미지 타입 확인
  HAS_TYPES=$(echo "$RES" | python3 -c "
import sys,json
d=json.load(sys.stdin)
types=set(i['image_type'] for i in d.get('images',[]))
needed={'before_intra','after_intra','before_pano','after_pano'}
print('true' if needed.issubset(types) else 'false')
" 2>/dev/null)
  check "비포애프터 #1 이미지 타입 4종 포함" "true" "$HAS_TYPES"
fi

# 블로그 상세 - 인라인 이미지 + H태그 확인
if [ "${BLOG_IDS[0]}" != "FAIL" ] && [ -n "${BLOG_IDS[0]}" ]; then
  RES=$(curl -s "$BASE/api/boards/blog/${BLOG_IDS[0]}")
  HAS_IMG=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print('true' if '<img' in d.get('post',{}).get('content','') else 'false')" 2>/dev/null)
  HAS_H2=$(echo "$RES" | python3 -c "import sys,json;d=json.load(sys.stdin);print('true' if '<h2>' in d.get('post',{}).get('content','') else 'false')" 2>/dev/null)
  check "블로그 #1 인라인 이미지 포함" "true" "$HAS_IMG"
  check "블로그 #1 H2 태그 포함" "true" "$HAS_H2"
fi

# 대시보드 통계
RES=$(curl -s "$BASE/api/boards/stats/overview")
DASH_POSTS=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('totalPosts',0))" 2>/dev/null)
DASH_IMGS=$(echo "$RES" | python3 -c "import sys,json;print(json.load(sys.stdin).get('totalImages',0))" 2>/dev/null)
check "대시보드 totalPosts=15" "15" "$DASH_POSTS"
# 5 before-after x 4 images = 20
check "대시보드 totalImages=20" "20" "$DASH_IMGS"

# SSR 메타태그 확인 (블로그)
if [ "${BLOG_IDS[0]}" != "FAIL" ] && [ -n "${BLOG_IDS[0]}" ]; then
  HTML=$(curl -s "$BASE/blog/${BLOG_IDS[0]}")
  TITLE=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'<title>(.*?)</title>', html)
print(m.group(1) if m else '')
")
  check_contains "블로그 SSR 제목에 글 제목 포함" "발치즉시" "$TITLE"
  
  CANON=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'rel=\"canonical\" href=\"(.*?)\"', html)
print(m.group(1) if m else '')
")
  check_contains "블로그 SSR canonical에 글 ID 포함" "/blog/${BLOG_IDS[0]}" "$CANON"
  
  ROBOTS=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'name=\"robots\" content=\"(.*?)\"', html)
print(m.group(1) if m else '')
")
  check_contains "블로그 SSR robots=index" "index" "$ROBOTS"
  
  OG_TYPE=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'property=\"og:type\" content=\"(.*?)\"', html)
print(m.group(1) if m else '')
")
  check "블로그 SSR og:type=article" "article" "$OG_TYPE"
fi

# 비포애프터 SSR 확인
if [ "${BA_IDS[0]}" != "FAIL" ] && [ -n "${BA_IDS[0]}" ]; then
  HTML=$(curl -s "$BASE/before-after/${BA_IDS[0]}")
  TITLE=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'<title>(.*?)</title>', html)
print(m.group(1) if m else '')
")
  check_contains "비포애프터 SSR 제목에 글 제목 포함" "임플란트" "$TITLE"
  
  ROBOTS=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'name=\"robots\" content=\"(.*?)\"', html)
print(m.group(1) if m else '')
")
  check_contains "비포애프터 SSR robots=index" "index" "$ROBOTS"
fi

# 공지사항 SSR 확인 (noindex)
if [ "${NOTICE_IDS[0]}" != "FAIL" ] && [ -n "${NOTICE_IDS[0]}" ]; then
  HTML=$(curl -s "$BASE/notice/${NOTICE_IDS[0]}")
  ROBOTS=$(echo "$HTML" | python3 -c "
import sys, re
html = sys.stdin.read()
m = re.search(r'name=\"robots\" content=\"(.*?)\"', html)
print(m.group(1) if m else '')
")
  check_contains "공지사항 SSR robots=noindex" "noindex" "$ROBOTS"
fi

# 페이지 렌더링 확인
echo ""
echo "  📄 주요 페이지 렌더링 확인:"
for PAGE in "/" "/philosophy" "/doctors" "/experience" "/location" "/treatments/implant" "/before-after" "/blog" "/notice" "/encyclopedia" "/register" "/login"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$PAGE")
  check "GET $PAGE → 200" "200" "$CODE"
done

echo ""
echo "========================================"
echo "📊 최종 결과: $PASS/$TOTAL 통과, $FAIL 실패"
echo "========================================"
if [ $FAIL -gt 0 ]; then
  echo ""
  echo "❌ 실패 항목:"
  echo -e "$FAILURES"
fi
