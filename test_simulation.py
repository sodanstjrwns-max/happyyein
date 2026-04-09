#!/usr/bin/env python3
"""전체 시뮬레이션: 회원가입 5회, 로그인 5회, 게시판 포스팅(사진) 각 5회"""
import requests
import json
import time
import os
import io

BASE = "http://localhost:3000"
RESULTS = {"pass": 0, "fail": 0, "errors": []}

def log(status, msg):
    icon = "✅" if status else "❌"
    if not status:
        RESULTS["fail"] += 1
        RESULTS["errors"].append(msg)
    else:
        RESULTS["pass"] += 1
    print(f"  {icon} {msg}")

def section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

# ============================================================
# 테스트용 이미지 생성 (1x1 PNG)
# ============================================================
def create_test_png(color_byte=0):
    """최소 PNG 파일 바이트 생성"""
    import struct, zlib
    def chunk(chunk_type, data):
        raw = chunk_type + data
        return struct.pack('>I', len(data)) + raw + struct.pack('>I', zlib.crc32(raw) & 0xffffffff)
    
    sig = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', 100, 100, 8, 2, 0, 0, 0))
    # 100x100 RGB
    raw = b''
    for y in range(100):
        raw += b'\x00'  # filter none
        for x in range(100):
            raw += bytes([color_byte, (color_byte+50)%256, (color_byte+100)%256])
    idat = chunk(b'IDAT', zlib.compress(raw))
    iend = chunk(b'IEND', b'')
    return sig + ihdr + idat + iend

# ============================================================
# 1. 회원가입 5회 시뮬레이션
# ============================================================
section("1. 회원가입 5회 시뮬레이션")

users = [
    {
        "email": "kim.minjae@gmail.com", "password": "Secure1234!!", "name": "김민재",
        "phone": "010-1234-5678", "birth_date": "1990-03-15", "gender": "male",
        "consents": {"privacy_collection": True, "privacy_provision": True,
        "marketing_sms": True, "marketing_email": True, "marketing_push": True}
    },
    {
        "email": "park.sooyeon@naver.com", "password": "MyPass999@@", "name": "박수연",
        "phone": "010-9876-5432", "birth_date": "1985-11-22", "gender": "female",
        "consents": {"privacy_collection": True, "privacy_provision": True,
        "marketing_sms": False, "marketing_email": True, "marketing_push": False}
    },
    {
        "email": "lee.junho@daum.net", "password": "StrongPwd55!!", "name": "이준호",
        "consents": {"privacy_collection": True, "privacy_provision": True,
        "marketing_sms": False, "marketing_email": False, "marketing_push": False}
    },
    {
        "email": "choi.yuna@gmail.com", "password": "Dental2026!@", "name": "최유나",
        "phone": "010-5555-3333", "birth_date": "1998-07-04", "gender": "female",
        "consents": {"privacy_collection": True, "privacy_provision": True,
        "marketing_sms": True, "marketing_email": True, "marketing_push": True}
    },
    {
        "email": "hong.gildong@kakao.com", "password": "YeinDental1!", "name": "홍길동",
        "phone": "010-1111-2222", "birth_date": "1975-01-01", "gender": "male",
        "consents": {"privacy_collection": True, "privacy_provision": True,
        "marketing_sms": True, "marketing_email": False, "marketing_push": True}
    }
]

tokens = []
for i, user in enumerate(users):
    r = requests.post(f"{BASE}/api/user/register", json=user)
    ok = r.status_code == 200 and r.json().get("token")
    log(ok, f"회원가입 #{i+1} ({user['name']}) → HTTP {r.status_code}")
    if ok:
        tokens.append(r.json()["token"])

# 중복 이메일 테스트
r = requests.post(f"{BASE}/api/user/register", json=users[0])
log(r.status_code == 409, f"중복 이메일 차단 → HTTP {r.status_code}")

# 필수 동의 미체크 테스트
bad_user = {"email": "test@test.com", "password": "Test1234!", "name": "테스트",
            "consents": {"privacy_collection": False, "privacy_provision": True}}
r = requests.post(f"{BASE}/api/user/register", json=bad_user)
log(r.status_code == 400, f"필수동의 미체크 차단 → HTTP {r.status_code}")

# ============================================================
# 2. 로그인 5회 시뮬레이션
# ============================================================
section("2. 로그인 5회 시뮬레이션")

for i, user in enumerate(users):
    r = requests.post(f"{BASE}/api/user/login", json={"email": user["email"], "password": user["password"]})
    ok = r.status_code == 200 and r.json().get("token")
    log(ok, f"로그인 #{i+1} ({user['name']}) → HTTP {r.status_code}")

# 잘못된 비밀번호
r = requests.post(f"{BASE}/api/user/login", json={"email": users[0]["email"], "password": "WrongPass!!"})
log(r.status_code != 200, f"잘못된 비밀번호 차단 → HTTP {r.status_code}")

# 프로필 조회 (토큰 검증)
if tokens:
    r = requests.get(f"{BASE}/api/user/profile", headers={"Authorization": f"Bearer {tokens[0]}"})
    ok = r.status_code == 200 and r.json().get("user", {}).get("name") == users[0]["name"]
    log(ok, f"프로필 조회 (토큰 검증) → {r.json().get('user', {}).get('name', 'N/A')}, 동의 {len(r.json().get('consents', []))}건")

# ============================================================
# 관리자 로그인 (게시판 포스팅용)
# ============================================================
section("3. 관리자 로그인")
admin_r = requests.post(f"{BASE}/api/auth/login", json={"password": "yein2828!admin"})
admin_token = admin_r.json().get("token", "") if admin_r.status_code == 200 else ""
log(bool(admin_token), f"관리자 로그인 → HTTP {admin_r.status_code}")

admin_headers = {"Authorization": f"Bearer {admin_token}"}

# ============================================================
# 이미지 업로드 (공용)
# ============================================================
section("4. 이미지 업로드")

uploaded_images = []
for i in range(12):
    png_data = create_test_png(color_byte=(i * 20) % 256)
    files = {"file": (f"test_img_{i+1}.png", io.BytesIO(png_data), "image/png")}
    r = requests.post(f"{BASE}/api/upload", files=files, headers=admin_headers)
    if r.status_code == 200:
        url = r.json().get("url", "")
        uploaded_images.append(url)
    log(r.status_code == 200, f"이미지 업로드 #{i+1} → HTTP {r.status_code}")

print(f"  📸 총 {len(uploaded_images)}장 업로드 완료")

# ============================================================
# 5. 비포애프터 포스팅 5회 (사진 포함)
# ============================================================
section("5. 비포애프터 포스팅 5회 (사진 포함)")

ba_posts = [
    {"title": "[임플란트] 상악 우측 #16번 발치즉시 임플란트 식립", "content": "<p>상악 우측 제1대구치 치근 파절로 보존 불가 판정 후, 발치와 동시에 임플란트를 식립했습니다. 골이식 병행 후 4개월 만에 보철 완료.</p>"},
    {"title": "[보존] 하악 좌측 #36번 신경치료 + 크라운", "content": "<p>깊은 충치로 인한 급성 치수염 진단. 보존과 전문의 신정희 원장이 미세현미경 하 정밀 신경치료 3회 시행 후 지르코니아 크라운 보철.</p>"},
    {"title": "[교정] 상악 전치부 돌출 교정 - 인비절라인 14개월", "content": "<p>상악 전치부 돌출(overjet 8mm)에 대해 인비절라인 투명교정 14개월 진행. 교정과 전문의 박현미 원장 직접 진료.</p>"},
    {"title": "[심미] 상악 전치 4본 라미네이트", "content": "<p>변색된 상악 전치 4본에 대해 최소삭제 라미네이트 시술. 기존 레진 치료 제거 후 e.max 라미네이트 접착.</p>"},
    {"title": "[임플란트] 하악 좌측 #35-36 연속 임플란트", "content": "<p>하악 좌측 소구치-대구치 결손 부위에 2본 연속 임플란트 식립. 골밀도 양호하여 즉시식립 진행. 3개월 후 최종 보철 장착.</p>"}
]

ba_image_types = ["before_intra", "after_intra", "before_pano", "after_pano"]
ba_ids = []
for i, post in enumerate(ba_posts):
    images = []
    for j, img_type in enumerate(ba_image_types):
        idx = (i * 2 + j) % len(uploaded_images) if uploaded_images else 0
        if uploaded_images:
            images.append({"image_url": uploaded_images[idx], "image_type": img_type})
    
    payload = {**post, "thumbnail_url": uploaded_images[i % len(uploaded_images)] if uploaded_images else "", "images": images}
    r = requests.post(f"{BASE}/api/boards/before-after", json=payload, headers=admin_headers)
    ok = r.status_code == 200
    post_id = r.json().get("id", "?") if ok else "FAIL"
    ba_ids.append(post_id)
    log(ok, f"비포애프터 #{i+1} '{post['title'][:30]}...' → ID={post_id}, 이미지 {len(images)}장")

# ============================================================
# 6. 블로그 포스팅 5회 (사진 포함 - 인라인)
# ============================================================
section("6. 블로그 포스팅 5회 (사진+인라인 이미지)")

blog_posts = [
    {
        "title": "발치즉시 임플란트, 일반 임플란트와 뭐가 다를까요?",
        "content": "<h2>발치즉시 임플란트란?</h2><p>치아를 발치하는 순간, 같은 자리에 바로 임플란트를 심는 시술입니다.</p><img src='{img1}' alt='발치즉시 임플란트 과정'><h3>일반 임플란트와의 차이</h3><p>일반 임플란트는 발치 후 3~6개월 뼈가 아물기를 기다려야 합니다. 발치즉시 임플란트는 이 대기 기간을 없애 총 치료 기간을 절반 이하로 줄입니다.</p><h3>누구에게 적합한가요?</h3><p>치근 파절, 심한 충치 등으로 발치가 필요하고 주변 골상태가 양호한 경우 적합합니다. 행복한예인치과에서는 80% 이상 즉시식립을 시행합니다.</p>"
    },
    {
        "title": "신경치료 후 크라운, 꼭 씌워야 하나요?",
        "content": "<h2>왜 신경치료 후 크라운이 필요할까요?</h2><p>신경치료를 받은 치아는 내부 혈관 공급이 끊겨 점점 건조해지고 약해집니다.</p><img src='{img1}' alt='신경치료 후 크라운 필요성'><h3>크라운 없이 방치하면?</h3><p>씹는 힘에 의해 치아가 세로로 쪼개질 수 있습니다(치근 파절). 이 경우 발치가 불가피합니다.</p><h3>어떤 크라운이 좋을까요?</h3><p>어금니는 강도가 중요하므로 지르코니아, 앞니는 심미성이 중요하므로 e.max를 추천합니다.</p><img src='{img2}' alt='지르코니아 vs e.max 크라운'>"
    },
    {
        "title": "스케일링 후 이가 시린 이유, 치과의사가 알려드립니다",
        "content": "<h2>스케일링 후 이가 시린 건 정상입니다</h2><p>치석이 치아 표면과 잇몸 사이를 덮고 있다가 제거되면, 그동안 가려져 있던 치아 뿌리 부분이 노출됩니다.</p><h3>시린 증상은 얼마나 지속되나요?</h3><p>보통 1~2주 이내에 자연스럽게 사라집니다. 시린 이 전용 치약을 사용하면 더 빨리 완화됩니다.</p><img src='{img1}' alt='스케일링 전후 비교'><h3>스케일링 주기</h3><p>건강보험 기준 연 1회 보험 적용, 잇몸 상태에 따라 6개월~1년 간격을 권장합니다.</p>"
    },
    {
        "title": "투명교정 vs 메탈교정, 나에게 맞는 교정은?",
        "content": "<h2>두 가지 교정 방식 비교</h2><p>메탈교정(브라켓)은 가장 전통적이고 강력한 교정 방식이며, 투명교정(인비절라인)은 심미적으로 우수한 최신 방식입니다.</p><img src='{img1}' alt='투명교정 인비절라인'><h3>투명교정의 장점</h3><p>거의 보이지 않고, 탈착 가능하여 식사와 양치가 자유롭습니다. 직장인에게 특히 인기가 높습니다.</p><h3>메탈교정이 유리한 경우</h3><p>심한 부정교합, 발치 교정이 필요한 복잡한 케이스에서는 메탈교정이 더 효과적일 수 있습니다.</p><img src='{img2}' alt='교정 전후 비교'>"
    },
    {
        "title": "직장인 치과 방문 꿀팁 5가지",
        "content": "<h2>바쁜 직장인을 위한 치과 꿀팁</h2><p>시간이 부족한 직장인도 치아 건강을 지킬 수 있는 5가지 실용적인 팁을 소개합니다.</p><h3>1. 수요일 야간진료 활용</h3><p>행복한예인치과는 매주 수요일 저녁 8시까지 야간진료를 운영합니다.</p><h3>2. 한 번 방문에 여러 치료 병행</h3><p>스케일링 + 충치치료를 같은 날 진행하면 내원 횟수를 줄일 수 있습니다.</p><img src='{img1}' alt='직장인 치과 방문 팁'><h3>3. 점심시간 활용</h3><p>시청역·명동에서 도보 5분 거리라 점심시간 방문이 가능합니다.</p><h3>4. 예약 시스템 활용</h3><p>전화(02-756-2828) 또는 네이버 예약으로 대기 시간을 최소화하세요.</p><h3>5. 연말정산 챙기기</h3><p>치과 치료비는 의료비 세액공제 대상입니다. 비급여 항목도 포함됩니다.</p>"
    }
]

blog_ids = []
for i, post in enumerate(blog_posts):
    img1 = uploaded_images[(i*2) % len(uploaded_images)] if uploaded_images else ""
    img2 = uploaded_images[(i*2+1) % len(uploaded_images)] if uploaded_images else ""
    content = post["content"].replace("{img1}", img1).replace("{img2}", img2)
    
    payload = {"title": post["title"], "content": content, "thumbnail_url": uploaded_images[i % len(uploaded_images)] if uploaded_images else ""}
    r = requests.post(f"{BASE}/api/boards/blog", json=payload, headers=admin_headers)
    ok = r.status_code == 200
    post_id = r.json().get("id", "?") if ok else "FAIL"
    blog_ids.append(post_id)
    log(ok, f"블로그 #{i+1} '{post['title'][:35]}...' → ID={post_id}")

# ============================================================
# 7. 공지사항 포스팅 5회 (사진 포함)
# ============================================================
section("7. 공지사항 포스팅 5회 (사진 포함)")

notice_posts = [
    {
        "title": "[안내] 2026년 5월 휴진 일정 안내",
        "content": "<h2>5월 휴진 안내</h2><p>안녕하세요, 행복한예인치과입니다.</p><p>2026년 5월 휴진 일정을 안내드립니다.</p><ul><li>5월 1일(금) - 근로자의 날 정상진료</li><li>5월 5일(월) - 어린이날 휴진</li><li>5월 6일(화) - 대체공휴일 휴진</li><li>5월 15일(목) - 석가탄신일 휴진</li></ul><p>예약 변경은 전화(02-756-2828)로 문의해 주세요.</p><img src='{img1}' alt='5월 휴진 일정'>"
    },
    {
        "title": "[중요] 온라인 예약 시스템 업그레이드 안내",
        "content": "<h2>더 편리해진 온라인 예약</h2><p>네이버 예약 시스템이 업그레이드되었습니다.</p><h3>변경 사항</h3><p>진료과목별 예약이 가능해졌으며, 실시간 잔여 시간 확인이 됩니다.</p><img src='{img1}' alt='온라인 예약 시스템'><p>기존 예약 방식도 동일하게 이용 가능합니다.</p>"
    },
    {
        "title": "[이벤트] 신규 환자 첫 방문 혜택 안내",
        "content": "<h2>신규 환자 혜택</h2><p>행복한예인치과를 처음 방문하시는 분들께 특별한 혜택을 드립니다.</p><h3>혜택 내용</h3><ul><li>정밀 구강검진 + 파노라마 촬영</li><li>맞춤 구강위생 교육</li><li>치아 상태 리포트 제공</li></ul><img src='{img1}' alt='신규 환자 혜택'><p>예약 시 '첫 방문'이라고 말씀해 주시면 됩니다.</p>"
    },
    {
        "title": "[시설] 3층 진료실 리모델링 완료 안내",
        "content": "<h2>더 쾌적해진 진료 환경</h2><p>3층 진료실 리모델링이 완료되었습니다.</p><h3>주요 변경 사항</h3><p>독립형 진료실 확대, 최신 진료 의자 도입, LED 무영등 교체가 이루어졌습니다.</p><img src='{img1}' alt='리모델링된 진료실'><img src='{img2}' alt='새 진료 의자'><p>더욱 편안한 환경에서 진료받으실 수 있습니다.</p>"
    },
    {
        "title": "[안내] 감염관리 강화 및 멸균 시스템 공개",
        "content": "<h2>철저한 감염관리</h2><p>행복한예인치과는 환자 안전을 최우선으로 생각합니다.</p><h3>멸균 프로세스</h3><p>1인 1팩 포장된 멸균 기구 사용, 매 환자마다 표면 소독, B등급 오토클레이브 사용으로 안전한 진료 환경을 유지합니다.</p><img src='{img1}' alt='멸균 시스템'><h3>공기 관리</h3><p>HEPA 필터 공기정화기를 가동하여 진료실 공기질을 관리합니다.</p>"
    }
]

notice_ids = []
for i, post in enumerate(notice_posts):
    img1 = uploaded_images[(i*2+6) % len(uploaded_images)] if uploaded_images else ""
    img2 = uploaded_images[(i*2+7) % len(uploaded_images)] if uploaded_images else ""
    content = post["content"].replace("{img1}", img1).replace("{img2}", img2)
    
    payload = {"title": post["title"], "content": content, "thumbnail_url": uploaded_images[(i+5) % len(uploaded_images)] if uploaded_images else ""}
    r = requests.post(f"{BASE}/api/boards/notice", json=payload, headers=admin_headers)
    ok = r.status_code == 200
    post_id = r.json().get("id", "?") if ok else "FAIL"
    notice_ids.append(post_id)
    log(ok, f"공지사항 #{i+1} '{post['title'][:35]}...' → ID={post_id}")

# ============================================================
# 8. 데이터 검증
# ============================================================
section("8. 데이터 검증")

# 게시판 목록 API 테스트
for board_name in ["before-after", "blog", "notice"]:
    r = requests.get(f"{BASE}/api/boards/{board_name}?page=1&limit=10")
    data = r.json()
    total = data.get("pagination", {}).get("total", 0)
    posts = data.get("posts", [])
    log(total == 5 and len(posts) == 5, f"{board_name} 목록 → 총 {total}건, 반환 {len(posts)}건")

# 비포애프터 상세 조회 → 이미지 배열 확인
if ba_ids and ba_ids[0] != "FAIL":
    r = requests.get(f"{BASE}/api/boards/before-after/{ba_ids[0]}")
    data = r.json()
    images = data.get("images", [])
    log(len(images) == 4, f"비포애프터 상세 #{ba_ids[0]} → 이미지 {len(images)}장 (기대: 4장)")
    image_types = [img["image_type"] for img in images]
    log(set(image_types) == {"before_intra", "after_intra", "before_pano", "after_pano"}, 
        f"이미지 타입 → {image_types}")

# 블로그 상세 → 인라인 이미지 포함 확인
if blog_ids and blog_ids[0] != "FAIL":
    r = requests.get(f"{BASE}/api/boards/blog/{blog_ids[0]}")
    data = r.json()
    content = data.get("post", {}).get("content", "")
    log("<img" in content, f"블로그 상세 #{blog_ids[0]} → 인라인 이미지 포함: {'<img' in content}")
    log("<h2" in content or "<h3" in content, f"블로그 상세 → H태그 포함: {'<h2' in content or '<h3' in content}")

# 대시보드 통계
r = requests.get(f"{BASE}/api/boards/stats/overview")
data = r.json()
log(data.get("totalPosts") == 15, f"대시보드 통계 → 총 포스트 {data.get('totalPosts')}건 (기대: 15)")
log(data.get("totalImages", 0) >= 20, f"대시보드 → 총 이미지 {data.get('totalImages')}건 (기대: ≥20)")

# ============================================================
# 9. SSR 메타태그 검증 (핵심!)
# ============================================================
section("9. SSR 메타태그 검증")

# 블로그 상세 SSR
if blog_ids and blog_ids[0] != "FAIL":
    r = requests.get(f"{BASE}/blog/{blog_ids[0]}")
    html = r.text
    log("발치즉시 임플란트" in html.split("</head>")[0], f"블로그 SSR title에 글 제목 포함")
    log(f"/blog/{blog_ids[0]}" in html.split("</head>")[0], f"블로그 SSR canonical → /blog/{blog_ids[0]}")
    log('content="index, follow"' in html.split("</head>")[0], f"블로그 SSR robots → index, follow")
    log('content="article"' in html.split("</head>")[0], f"블로그 SSR og:type → article")

# 비포애프터 상세 SSR
if ba_ids and ba_ids[0] != "FAIL":
    r = requests.get(f"{BASE}/before-after/{ba_ids[0]}")
    html = r.text
    head_section = html.split("</head>")[0]
    log("임플란트" in head_section, f"비포애프터 SSR title에 글 제목 포함")
    log(f"/before-after/{ba_ids[0]}" in head_section, f"비포애프터 SSR canonical → /before-after/{ba_ids[0]}")
    log('content="index, follow"' in head_section, f"비포애프터 SSR robots → index, follow")

# 공지 상세 SSR (noindex 유지 확인)
if notice_ids and notice_ids[0] != "FAIL":
    r = requests.get(f"{BASE}/notice/{notice_ids[0]}")
    html = r.text
    head_section = html.split("</head>")[0]
    log("휴진" in head_section, f"공지사항 SSR title에 글 제목 포함")
    log('content="noindex, nofollow"' in head_section, f"공지사항 SSR robots → noindex, nofollow (정상)")

# ============================================================
# 10. 페이지 렌더링 확인
# ============================================================
section("10. 페이지 렌더링 확인")

pages = ["/", "/philosophy", "/doctors", "/experience", "/location",
         "/treatments/implant", "/encyclopedia", "/before-after", "/blog", "/notice",
         "/register", "/login"]

for page in pages:
    r = requests.get(f"{BASE}{page}")
    log(r.status_code == 200 and len(r.text) > 10000, f"{page} → HTTP {r.status_code}, {len(r.text):,}B")

# 상세 페이지 렌더링
for bid in ba_ids[:2]:
    if bid != "FAIL":
        r = requests.get(f"{BASE}/before-after/{bid}")
        log(r.status_code == 200, f"/before-after/{bid} → HTTP {r.status_code}, {len(r.text):,}B")

for bid in blog_ids[:2]:
    if bid != "FAIL":
        r = requests.get(f"{BASE}/blog/{bid}")
        log(r.status_code == 200, f"/blog/{bid} → HTTP {r.status_code}, {len(r.text):,}B")

# 이미지 서빙 확인
if uploaded_images:
    r = requests.get(f"{BASE}{uploaded_images[0]}")
    log(r.status_code == 200 and "image" in r.headers.get("content-type", ""), 
        f"이미지 서빙 → HTTP {r.status_code}, {r.headers.get('content-type', 'N/A')}")

# ============================================================
# 최종 결과
# ============================================================
section("최종 결과")
total = RESULTS["pass"] + RESULTS["fail"]
print(f"  ✅ 통과: {RESULTS['pass']}/{total}")
print(f"  ❌ 실패: {RESULTS['fail']}/{total}")
if RESULTS["errors"]:
    print(f"\n  ⚠️  실패 목록:")
    for err in RESULTS["errors"]:
        print(f"    - {err}")
print()
