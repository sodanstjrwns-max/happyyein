// =====================================================================
// Local SEO 전용 랜딩페이지 — 지역명 + 핵심진료 조합 30개 페이지
// 구글 "시청역 임플란트", "명동 교정" 등 검색 시 상위 노출 목적
// =====================================================================
import { head, nav, footer, scripts } from './layout'

// ===== 타입 정의 =====
interface Region {
  id: string;             // URL slug: 'sicheong', 'myeongdong', etc.
  name: string;           // 시청역, 명동, 을지로, etc.
  nameShort: string;      // 시청, 명동, 을지로 (접미사 없는 짧은 이름)
  station: string;        // 1·2호선 시청역
  walkMin: number;        // 도보 분
  exitInfo: string;       // 4·5번 출구
  nearbyLandmarks: string[];
  areaDesc: string;       // 지역 특성 설명 (유니크 콘텐츠)
  busRoutes: string[];
  subwayLines: string;    // 1·2호선
}

interface Treatment {
  id: string;             // implant, preservation, aesthetic, orthodontics, general
  name: string;           // 임플란트, 신경치료, 라미네이트, 교정, 스케일링
  nameDetail: string;     // 발치즉시 임플란트, 치아 보존 치료, etc.
  treatmentSlug: string;  // /treatments/implant 등 링크용
  heroImg: string;
  specialist: string;     // 담당 전문의
  specialistTitle: string;
  keywords: string[];     // 추가 관련 키워드
}

// ===== 6개 지역 데이터 =====
const regions: Region[] = [
  {
    id: 'sicheong',
    name: '시청역',
    nameShort: '시청',
    station: '1·2호선 시청역',
    walkMin: 5,
    exitInfo: '4·5번 출구',
    nearbyLandmarks: ['서울시청', '덕수궁', '세종대로', '서울광장', '프레스센터', '정동길'],
    areaDesc: '서울의 행정 중심지인 시청역 일대는 서울시청, 덕수궁, 세종대로가 위치한 도심 핵심 지역입니다. 직장인 밀집 지역으로 점심시간이나 퇴근 후 치과 방문이 편리하며, 1호선과 2호선 환승역으로 서울 어디서든 접근이 용이합니다.',
    busRoutes: ['402', '405', '501', '507', '7017', '7021'],
    subwayLines: '1·2호선',
  },
  {
    id: 'myeongdong',
    name: '명동',
    nameShort: '명동',
    station: '4호선 명동역',
    walkMin: 8,
    exitInfo: '3번 출구',
    nearbyLandmarks: ['명동성당', '명동거리', '남산타워', '롯데백화점', '신세계백화점', '눈스퀘어'],
    areaDesc: '서울 최대 상업·관광 중심지인 명동은 명동성당, 남산타워, 대형 백화점이 밀집한 지역입니다. 쇼핑이나 외출 중 편리하게 치과를 방문할 수 있으며, 4호선 직결로 강남·사당·노원 방면에서도 빠르게 접근 가능합니다.',
    busRoutes: ['402', '405', '507', '7017'],
    subwayLines: '4호선',
  },
  {
    id: 'euljiro',
    name: '을지로',
    nameShort: '을지로',
    station: '2호선 을지로입구역',
    walkMin: 7,
    exitInfo: '1번 출구',
    nearbyLandmarks: ['을지로입구역', '롯데영플라자', '명동예술극장', 'IBK기업은행 본점', '을지로 노가리 골목', '청계천'],
    areaDesc: '서울 중구의 비즈니스 중심지인 을지로는 금융기관과 기업 본사가 밀집한 직장인 핵심 거점입니다. 을지로입구역에서 도보 7분, 2호선 순환선 접근성으로 강남·건대·신촌 등 서울 전역에서 편리하게 방문할 수 있습니다.',
    busRoutes: ['402', '405', '501', '507'],
    subwayLines: '2호선',
  },
  {
    id: 'hoehyeon',
    name: '회현역',
    nameShort: '회현',
    station: '4호선 회현역',
    walkMin: 6,
    exitInfo: '7번 출구',
    nearbyLandmarks: ['남대문시장', '숭례문', '서울중앙우체국', '한국은행 화폐박물관', '소공동', 'N서울타워 남산 입구'],
    areaDesc: '서울 최대 전통시장인 남대문시장과 숭례문이 자리한 회현역 일대는 역사와 상업이 공존하는 지역입니다. 남대문시장 상인, 소공동 직장인분들이 점심시간에 편리하게 방문하시며, 4호선 직결로 강남·사당에서도 빠르게 오실 수 있습니다.',
    busRoutes: ['402', '501', '507', '7021'],
    subwayLines: '4호선',
  },
  {
    id: 'gwanghwamun',
    name: '광화문·종로',
    nameShort: '광화문',
    station: '5호선 광화문역',
    walkMin: 10,
    exitInfo: '6번 출구',
    nearbyLandmarks: ['광화문광장', '경복궁', '세종문화회관', '교보문고', '종로타워', '인사동'],
    areaDesc: '대한민국의 상징적 중심지인 광화문·종로 일대는 경복궁, 광화문광장, 정부청사가 위치한 행정·문화의 핵심입니다. 종로 직장인과 공무원분들이 많이 방문하시며, 5호선 광화문역에서 도보 10분, 1호선 종로3가에서도 접근 가능합니다.',
    busRoutes: ['402', '405', '7017', '7021'],
    subwayLines: '5호선·1호선',
  },
  {
    id: 'seoul-station',
    name: '서울역',
    nameShort: '서울역',
    station: '1·4호선 서울역',
    walkMin: 12,
    exitInfo: '2번 출구',
    nearbyLandmarks: ['서울역', '서울스퀘어', '남산공원', '숭례문', '만리동광장', '서울로7017'],
    areaDesc: 'KTX·SRT 환승의 관문인 서울역은 전국 어디서든 접근 가능한 최고의 교통 허브입니다. 지방에서 서울 방문 시 치과 진료를 함께 계획하시는 분들에게 최적의 위치이며, 1호선·4호선·공항철도·경의중앙선이 교차하는 초광역 교통 요지입니다.',
    busRoutes: ['501', '507', '7017', '7021'],
    subwayLines: '1·4호선·공항철도·경의중앙선',
  },
];

// ===== 5개 핵심 진료 데이터 =====
const treatments: Treatment[] = [
  {
    id: 'implant',
    name: '임플란트',
    nameDetail: '발치즉시 임플란트',
    treatmentSlug: '/treatments/implant',
    heroImg: '/static/img/treat-1.jpg',
    specialist: '한승대 대표원장',
    specialistTitle: '서울대 통합치의학 전문의',
    keywords: ['임플란트', '즉시식립', '발치즉시', '임플란트 비용', '임플란트 가격', '임플란트 후기', '원데이 임플란트'],
  },
  {
    id: 'preservation',
    name: '신경치료',
    nameDetail: '치아 보존 치료 (신경치료)',
    treatmentSlug: '/treatments/preservation',
    heroImg: '/static/img/treat-2.jpg',
    specialist: '신정희 원장',
    specialistTitle: '서울대 보존과 전문의',
    keywords: ['신경치료', '보존치료', '치아보존', '충치치료', '레진', '크라운', '인레이'],
  },
  {
    id: 'aesthetic',
    name: '라미네이트',
    nameDetail: '앞니 심미 치료 (라미네이트)',
    treatmentSlug: '/treatments/aesthetic',
    heroImg: '/static/img/treat-5.jpg',
    specialist: '한승대 대표원장',
    specialistTitle: '서울대 통합치의학 전문의',
    keywords: ['라미네이트', '심미치료', '앞니치료', '치아미백', '지르코니아', '앞니성형', '치아성형'],
  },
  {
    id: 'orthodontics',
    name: '교정',
    nameDetail: '치아 교정 (투명교정)',
    treatmentSlug: '/treatments/orthodontics',
    heroImg: '/static/img/treat-4.jpg',
    specialist: '박현미 원장',
    specialistTitle: '서울대 교정과 전문의',
    keywords: ['치아교정', '투명교정', '인비절라인', '교정 비용', '성인교정', '부분교정', '교정 가격'],
  },
  {
    id: 'general',
    name: '스케일링',
    nameDetail: '일반·예방 치료 (스케일링)',
    treatmentSlug: '/treatments/general',
    heroImg: '/static/img/consult-1.jpg',
    specialist: '한승대 대표원장',
    specialistTitle: '서울대 통합치의학 전문의',
    keywords: ['스케일링', '치과검진', '충치치료', '잇몸치료', '예방치료', '정기검진', '치석제거'],
  },
];

// ===== 지역 × 진료 조합 FAQ 생성 =====
function generateFaq(region: Region, treatment: Treatment): { q: string; a: string }[] {
  const base: { q: string; a: string }[] = [];

  // 공통 FAQ (접근성)
  base.push({
    q: `${region.name}에서 행복한예인치과까지 얼마나 걸리나요?`,
    a: `${region.station} ${region.exitInfo}에서 도보 약 ${region.walkMin}분이면 도착합니다. 서울 중구 남대문로9길 51 효덕빌딩 3층에 위치해 있으며, 버스 ${region.busRoutes.slice(0, 3).join('·')}번 등도 이용 가능합니다.`
  });

  // 진료별 특화 FAQ
  if (treatment.id === 'implant') {
    base.push(
      { q: `${region.name} 근처 임플란트 잘하는 치과 추천해주세요`,
        a: `행복한예인치과는 ${region.station}에서 도보 ${region.walkMin}분 거리에 있으며, 한승대 대표원장(서울대 통합치의학 전문의)이 직접 진료합니다. 80% 이상의 케이스에서 발치즉시 임플란트를 시행하여 치료 기간을 획기적으로 단축합니다.` },
      { q: `${region.nameShort} 임플란트 비용은 얼마인가요?`,
        a: `임플란트 비용은 환자분의 잔존 골량, 식립 부위, 보철 재료에 따라 달라집니다. 행복한예인치과에서는 CT 촬영 후 정확한 진단과 함께 투명한 비용 안내를 드리며, 발치즉시 임플란트로 추가 수술 비용을 절감할 수 있습니다. 02-756-2828로 상담 예약해주세요.` },
      { q: `${region.nameShort}에서 원데이 임플란트 가능한가요?`,
        a: `네, 조건이 충족되면 당일 발치와 동시에 임플란트 식립이 가능합니다. 한승대 원장은 즉시식립 전문으로 80% 이상의 케이스에서 당일 식립을 진행합니다. 정확한 가능 여부는 CT 촬영 후 판단됩니다.` },
      { q: `${region.nameShort} 직장인인데 점심시간에 임플란트 상담 가능한가요?`,
        a: `물론입니다. 행복한예인치과는 ${region.station}에서 도보 ${region.walkMin}분으로 ${region.nameShort} 직장인분들의 점심시간 방문에 최적화되어 있습니다. 수요일 야간진료(~20:30)도 운영하여 퇴근 후 방문도 가능합니다.` },
      { q: `임플란트 수술 후 회복 기간은 어느 정도인가요?`,
        a: `발치즉시 임플란트의 경우 일반 임플란트 대비 회복이 빠르며, 대부분 수술 다음 날부터 일상생활이 가능합니다. 최종 보철까지 약 2~4개월 소요되며, 그 기간 동안 임시 치아를 장착하여 일상에 불편이 없습니다.` },
    );
  } else if (treatment.id === 'preservation') {
    base.push(
      { q: `${region.name} 근처 신경치료 잘하는 치과 어디인가요?`,
        a: `행복한예인치과는 ${region.station}에서 도보 ${region.walkMin}분 거리에 위치하며, 신정희 원장(서울대 보존과 전문의)이 직접 신경치료를 진행합니다. 치아 보존을 최우선으로 하며, 자연 치아를 살리는 정밀 치료를 시행합니다.` },
      { q: `${region.nameShort} 치과에서 신경치료 비용은?`,
        a: `신경치료 비용은 치아 위치(앞니/어금니)와 신경관 수에 따라 다릅니다. 행복한예인치과에서는 건강보험 적용 항목을 최대한 활용하여 합리적인 비용으로 치료를 진행합니다. 정확한 비용은 진단 후 투명하게 안내드립니다.` },
      { q: `신경치료가 아프나요? 통증이 걱정됩니다`,
        a: `최신 마취 기법과 장비를 사용하여 치료 중 통증을 최소화합니다. 신정희 원장은 서울대 보존과 전문의로서 정밀한 시술로 치료 시간을 단축하고 불편감을 줄여드립니다. 통증에 민감하신 분들을 위한 세심한 케어를 제공합니다.` },
      { q: `충치가 심한데 이를 뽑아야 하나요?`,
        a: `행복한예인치과의 철학은 '자연 치아 보존 우선'입니다. 신정희 보존과 전문의가 정밀 진단 후 가능한 한 발치 없이 신경치료와 보존치료로 치아를 살리는 방향을 제시합니다. 꼭 필요한 경우에만 발치를 권합니다.` },
      { q: `${region.nameShort}에서 점심시간에 신경치료 받을 수 있나요?`,
        a: `네, ${region.station}에서 도보 ${region.walkMin}분이므로 점심시간 방문이 충분히 가능합니다. 신경치료 1회 소요시간은 약 30~40분이며, 수요일 야간진료도 운영합니다. 전화(02-756-2828)로 시간대를 예약해주세요.` },
    );
  } else if (treatment.id === 'aesthetic') {
    base.push(
      { q: `${region.name} 근처 라미네이트 잘하는 치과 추천`,
        a: `행복한예인치과는 ${region.station}에서 도보 ${region.walkMin}분 거리에 위치하며, 한승대 대표원장(서울대 통합치의학 전문의)이 직접 앞니 심미 치료를 진행합니다. 자연치아 삭제를 최소화하는 보존적 라미네이트를 지향합니다.` },
      { q: `${region.nameShort} 라미네이트 비용이 궁금합니다`,
        a: `라미네이트 비용은 치아 상태, 시술 개수, 재료(포세린/지르코니아)에 따라 달라집니다. 행복한예인치과에서는 상담 시 정확한 비용과 예상 결과를 디지털 시뮬레이션으로 미리 보여드립니다. 무료 상담 예약: 02-756-2828.` },
      { q: `라미네이트와 치아미백 중 어떤 것이 좋을까요?`,
        a: `단순 변색이라면 치아미백이, 치아 형태나 배열 개선이 필요하다면 라미네이트가 적합합니다. 한승대 원장이 정밀 진단 후 최적의 방법을 제안드리며, 두 가지를 병행하는 경우도 있습니다.` },
      { q: `앞니가 벌어져 있는데 라미네이트로 교정 가능한가요?`,
        a: `네, 앞니 사이 벌어짐(치간 이개)은 라미네이트로 효과적으로 개선할 수 있습니다. 교정 없이 빠르게 결과를 얻을 수 있으며, 보통 2~3회 내원으로 치료가 완료됩니다. 정밀 진단 후 최적의 방법을 제안드립니다.` },
      { q: `${region.nameShort} 직장인인데 라미네이트 치료 기간은?`,
        a: `라미네이트는 보통 2~3회 내원(약 1~2주)으로 완료됩니다. ${region.station}에서 도보 ${region.walkMin}분이므로 점심시간 방문이 편리하며, 시술 후 바로 일상생활이 가능합니다. 수요일 야간진료도 가능합니다.` },
    );
  } else if (treatment.id === 'orthodontics') {
    base.push(
      { q: `${region.name} 근처 교정 잘하는 치과 추천해주세요`,
        a: `행복한예인치과는 ${region.station}에서 도보 ${region.walkMin}분 거리에 위치하며, 박현미 원장(서울대 교정과 전문의)이 직접 교정 치료를 진행합니다. 투명교정(인비절라인)과 일반 교정 모두 전문의가 직접 담당합니다.` },
      { q: `${region.nameShort} 투명교정 비용은 얼마인가요?`,
        a: `투명교정(인비절라인) 비용은 치아 상태와 교정 범위에 따라 다릅니다. 행복한예인치과에서는 3D 디지털 스캔으로 정확한 교정 계획과 비용을 상담 시 안내드립니다. 부분교정부터 전체교정까지 맞춤 플랜을 제공합니다.` },
      { q: `성인 교정도 가능한가요? 나이가 걱정됩니다`,
        a: `물론입니다. 박현미 교정과 전문의는 성인 교정 경험이 풍부하며, 20대부터 50대 이상까지 다양한 연령대의 교정을 성공적으로 진행하고 있습니다. 투명교정은 외관상 거의 보이지 않아 직장인 성인교정에 특히 인기입니다.` },
      { q: `투명교정 치료 기간은 어느 정도인가요?`,
        a: `일반적으로 6개월~2년이며, 부분교정은 3~6개월로 더 빠릅니다. 박현미 원장이 3D 디지털 시뮬레이션으로 예상 기간과 결과를 미리 보여드립니다. ${region.nameShort} 직장인분들을 위해 내원 주기를 최적화합니다.` },
      { q: `${region.nameShort}에서 교정 상담은 무료인가요?`,
        a: `행복한예인치과에서는 교정 초진 상담을 통해 치아 상태를 정밀 진단하고 최적의 교정 방법을 안내드립니다. ${region.station}에서 도보 ${region.walkMin}분이니 편하게 방문해주세요. 전화 예약: 02-756-2828.` },
    );
  } else { // general
    base.push(
      { q: `${region.name} 근처 스케일링 잘하는 치과 추천`,
        a: `행복한예인치과는 ${region.station}에서 도보 ${region.walkMin}분 거리에 위치한 서울대 출신 전문의 3인 치과입니다. 스케일링은 건강보험 적용(연 1회)으로 합리적인 비용에 받으실 수 있으며, 치아 상태 정밀 검진도 함께 진행합니다.` },
      { q: `${region.nameShort} 치과 정기검진 비용은?`,
        a: `기본 검진과 스케일링은 건강보험이 적용되어 부담 없는 비용으로 받으실 수 있습니다. 파노라마 X-ray, 구강 내 사진 촬영을 통한 종합 진단을 제공하며, 치료 필요 시 투명한 비용 안내를 드립니다.` },
      { q: `스케일링은 얼마나 자주 받아야 하나요?`,
        a: `일반적으로 6개월~1년에 한 번 권장되며, 잇몸 상태에 따라 3~4개월 간격이 필요할 수 있습니다. 건강보험으로 연 1회 스케일링이 적용되니 정기적으로 방문해주시면 구강 건강 유지에 큰 도움이 됩니다.` },
      { q: `${region.nameShort} 직장인인데 점심시간에 스케일링 가능한가요?`,
        a: `물론입니다! ${region.station}에서 도보 ${region.walkMin}분이며, 스케일링은 약 20~30분 소요되므로 점심시간에 충분히 가능합니다. 수요일 야간진료(~20:30)도 운영하니 퇴근 후 방문도 가능합니다.` },
      { q: `아이 충치치료도 가능한가요?`,
        a: `네, 행복한예인치과는 소아 환자분의 충치치료와 예방치료(실란트, 불소도포)도 진행합니다. 아이가 무서워하지 않도록 세심한 케어를 제공하며, 치료 과정을 보호자분께 상세히 설명드립니다.` },
    );
  }

  // 공통 마무리 FAQ
  base.push(
    { q: `행복한예인치과 진료시간이 어떻게 되나요?`,
      a: `평일 10:00~18:30, 수요일 야간진료 10:00~20:30, 토요일 10:00~15:00 운영합니다. 일요일·공휴일은 휴진입니다. ${region.station}에서 도보 ${region.walkMin}분 거리이니 편하게 방문해주세요.` },
    { q: `주차가 가능한가요?`,
      a: `건물 내 주차장 이용이 가능하며, 인근 공영주차장도 이용하실 수 있습니다. 다만 ${region.station}에서 도보 ${region.walkMin}분으로 대중교통 이용이 더 편리합니다.` },
  );

  return base;
}

// ===== JSON-LD 생성 (Service + Location + FAQPage) =====
function generateJsonLd(region: Region, treatment: Treatment, faq: { q: string; a: string }[]) {
  const domain = 'https://happyyein.kr';
  const slug = `${region.id}-${treatment.id}`;
  const pageUrl = `${domain}/local/${slug}`;

  // 1. MedicalBusiness + Service
  const medicalService = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${domain}/#medical-business`,
    name: '행복한예인치과',
    alternateName: 'Happy Yein Dental Clinic',
    url: domain,
    telephone: '02-756-2828',
    image: `${domain}/static/img/dr-han-logo.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '남대문로9길 51 효덕빌딩 3층 301호',
      addressLocality: '중구',
      addressRegion: '서울특별시',
      postalCode: '04530',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.566,
      longitude: 126.978,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 37.566, longitude: 126.978 },
      geoRadius: '3000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${region.name} ${treatment.name} 진료`,
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: treatment.nameDetail,
          procedureType: 'http://schema.org/TherapeuticProcedure',
          bodyLocation: 'Oral cavity',
          description: `${region.name} ${treatment.name} 전문 치과 - 행복한예인치과. ${region.station}에서 도보 ${region.walkMin}분.`,
        }
      }],
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Thursday','Friday'], opens: '10:00', closes: '18:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '10:00', closes: '20:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '15:00' },
    ],
    priceRange: '$$',
    currenciesAccepted: 'KRW',
    paymentAccepted: '현금, 카드, 계좌이체',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '287',
      bestRating: '5',
    },
  };

  // 2. FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // 3. BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: domain },
      { '@type': 'ListItem', position: 2, name: '지역별 진료 안내', item: `${domain}/local` },
      { '@type': 'ListItem', position: 3, name: `${region.name} ${treatment.name}`, item: pageUrl },
    ],
  };

  // 4. WebPage
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${region.name} ${treatment.name} | 행복한예인치과`,
    url: pageUrl,
    description: `${region.name} ${treatment.name} 전문 치과 행복한예인치과. ${region.station}에서 도보 ${region.walkMin}분. 서울대 전문의 직접 진료.`,
    inLanguage: 'ko',
    isPartOf: { '@type': 'WebSite', url: domain },
    about: {
      '@type': 'MedicalCondition',
      name: treatment.nameDetail,
    },
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: '.local-seo-content',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-title', '.intro-section', '.faq-section'],
    },
  };

  return [medicalService, faqSchema, breadcrumb, webPage];
}

// ===== 모든 slug 목록 (사이트맵용) =====
export function getAllLocalSeoSlugs(): string[] {
  const slugs: string[] = [];
  for (const r of regions) {
    for (const t of treatments) {
      slugs.push(`${r.id}-${t.id}`);
    }
  }
  return slugs;
}

// ===== 지역별 진료 안내 목록 페이지 =====
export function localSeoIndexPage(): string {
  const domain = 'https://happyyein.kr';
  const title = '지역별 진료 안내 | 행복한예인치과 - 시청역·명동·을지로·회현역·광화문·서울역';
  const desc = '행복한예인치과 지역별 진료 안내. 시청역·명동·을지로·회현역·광화문·서울역에서 가까운 치과. 임플란트, 신경치료, 라미네이트, 교정, 스케일링 전문. 서울대 전문의 3인 직접 진료.';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      url: `${domain}/local`,
      description: desc,
      isPartOf: { '@type': 'WebSite', url: domain },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: regions.length * treatments.length,
        itemListElement: regions.flatMap((r, ri) =>
          treatments.map((t, ti) => ({
            '@type': 'ListItem',
            position: ri * treatments.length + ti + 1,
            url: `${domain}/local/${r.id}-${t.id}`,
            name: `${r.name} ${t.name}`,
          }))
        ),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: domain },
        { '@type': 'ListItem', position: 2, name: '지역별 진료 안내', item: `${domain}/local` },
      ],
    },
  ];

  const headHtml = head({
    title,
    description: desc,
    path: '/local',
    ogType: 'website',
    keywords: '시청역 치과, 명동 치과, 을지로 치과, 회현역 치과, 광화문 치과, 서울역 치과, 시청역 임플란트, 명동 교정, 을지로 신경치료, 서울 중구 치과, 행복한예인치과',
    jsonLd,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '지역별 진료 안내', url: '/local' },
    ],
  });

  return `<!DOCTYPE html><html lang="ko">
${headHtml}
<body>
${nav()}
<main class="local-seo-index">

<!-- Hero -->
<section style="background:linear-gradient(135deg,#1a5276 0%,#2e86c1 100%);padding:80px 20px 60px;text-align:center;color:#fff;">
  <div style="max-width:900px;margin:0 auto;">
    <p style="font-size:.95rem;letter-spacing:2px;margin-bottom:12px;opacity:.85;">AREA GUIDE</p>
    <h1 style="font-size:2.4rem;font-weight:800;margin-bottom:16px;line-height:1.3;">
      지역별 진료 안내
    </h1>
    <p style="font-size:1.15rem;opacity:.9;line-height:1.7;">
      시청역·명동·을지로·회현역·광화문·서울역에서 가까운<br>
      <strong>서울대 전문의 3인</strong> 치과, 행복한예인치과
    </p>
  </div>
</section>

<!-- Region × Treatment Grid -->
<section style="max-width:1100px;margin:0 auto;padding:60px 20px;">
  <h2 style="text-align:center;font-size:1.6rem;font-weight:700;margin-bottom:40px;color:#1a5276;">
    🏥 가까운 역에서 원하는 진료를 찾아보세요
  </h2>

  ${regions.map(r => `
  <div style="margin-bottom:50px;">
    <h3 style="font-size:1.35rem;font-weight:700;color:#2e86c1;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:#2e86c1;color:#fff;border-radius:50%;font-size:.85rem;">🚇</span>
      ${r.station} · 도보 ${r.walkMin}분
    </h3>
    <p style="color:#555;font-size:.95rem;margin-bottom:16px;padding-left:44px;">${r.exitInfo} 방면 | 주변: ${r.nearbyLandmarks.slice(0, 4).join(', ')}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;padding-left:44px;">
      ${treatments.map(t => `
      <a href="/local/${r.id}-${t.id}" style="display:block;padding:20px;background:#f8fbff;border:1px solid #d6e9f8;border-radius:12px;text-decoration:none;transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,.04);"
         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 6px 20px rgba(46,134,193,.15)';this.style.borderColor='#2e86c1'"
         onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 8px rgba(0,0,0,.04)';this.style.borderColor='#d6e9f8'">
        <p style="font-size:1.05rem;font-weight:700;color:#1a5276;margin-bottom:4px;">${r.nameShort} ${t.name}</p>
        <p style="font-size:.82rem;color:#888;">${t.specialist}</p>
      </a>`).join('')}
    </div>
  </div>`).join('')}

</section>

<!-- CTA -->
<section style="background:#f0f7ff;padding:50px 20px;text-align:center;">
  <h2 style="font-size:1.5rem;font-weight:700;color:#1a5276;margin-bottom:12px;">지금 바로 상담 예약하세요</h2>
  <p style="color:#555;margin-bottom:24px;">서울대 전문의 3인이 직접 진단하고 치료합니다</p>
  <a href="tel:02-756-2828" style="display:inline-block;padding:16px 40px;background:#2e86c1;color:#fff;border-radius:50px;font-size:1.15rem;font-weight:700;text-decoration:none;box-shadow:0 4px 15px rgba(46,134,193,.4);">📞 02-756-2828</a>
</section>

</main>
${footer()}
${scripts()}
</body></html>`;
}

// ===== 개별 지역+진료 랜딩페이지 렌더러 =====
export function renderLocalSeoPage(slug: string): string | null {
  const parts = slug.split('-');
  if (parts.length < 2) return null;

  // slug format: regionId-treatmentId (e.g. sicheong-implant, seoul-station-general)
  // Handle "seoul-station" which has a hyphen in regionId
  let regionId: string;
  let treatmentId: string;

  if (slug.startsWith('seoul-station-')) {
    regionId = 'seoul-station';
    treatmentId = slug.replace('seoul-station-', '');
  } else {
    const lastDash = slug.lastIndexOf('-');
    regionId = slug.substring(0, lastDash);
    treatmentId = slug.substring(lastDash + 1);
  }

  const region = regions.find(r => r.id === regionId);
  const treatment = treatments.find(t => t.id === treatmentId);
  if (!region || !treatment) return null;

  const domain = 'https://happyyein.kr';
  const faq = generateFaq(region, treatment);
  const jsonLd = generateJsonLd(region, treatment, faq);

  const pageTitle = `${region.name} ${treatment.name} | 행복한예인치과 - ${region.station} 도보 ${region.walkMin}분`;
  const pageDesc = `${region.name} ${treatment.name} 전문 치과 행복한예인치과. ${region.station} ${region.exitInfo}에서 도보 ${region.walkMin}분. ${treatment.specialist}(${treatment.specialistTitle}) 직접 진료. ${treatment.keywords.slice(0, 3).join(', ')}. 수요일 야간진료. 02-756-2828`;
  const keywords = [
    `${region.name} ${treatment.name}`, `${region.nameShort} ${treatment.name}`,
    `${region.name} 치과`, `${region.nameShort} 치과`,
    `${region.name} ${treatment.name} 잘하는 치과`, `${region.nameShort} ${treatment.name} 추천`,
    `${region.name} ${treatment.name} 비용`, `${region.name} ${treatment.name} 가격`,
    ...treatment.keywords.map(k => `${region.nameShort} ${k}`),
    '행복한예인치과', '서울 중구 치과', ...treatment.keywords,
  ].join(', ');

  const headHtml = head({
    title: pageTitle,
    description: pageDesc,
    path: `/local/${slug}`,
    ogType: 'article',
    ogImage: treatment.heroImg,
    keywords,
    jsonLd,
    breadcrumbs: [
      { name: '홈', url: '/' },
      { name: '지역별 진료 안내', url: '/local' },
      { name: `${region.name} ${treatment.name}`, url: `/local/${slug}` },
    ],
  });

  // 다른 지역 같은 진료 링크
  const otherRegions = regions.filter(r => r.id !== region.id);
  // 같은 지역 다른 진료 링크
  const otherTreatments = treatments.filter(t => t.id !== treatment.id);

  return `<!DOCTYPE html><html lang="ko">
${headHtml}
<body>
${nav()}
<main class="local-seo-content">

<!-- Hero Section -->
<section class="hero-title" style="background:linear-gradient(135deg,#1a5276 0%,#2e86c1 50%,#3498db 100%);padding:80px 20px 60px;color:#fff;position:relative;overflow:hidden;">
  <div style="position:absolute;top:0;right:0;width:40%;height:100%;background:url('${treatment.heroImg}') center/cover;opacity:.15;"></div>
  <div style="max-width:900px;margin:0 auto;position:relative;z-index:1;">
    <nav style="font-size:.85rem;margin-bottom:20px;opacity:.8;">
      <a href="/" style="color:#fff;text-decoration:none;">홈</a>
      <span style="margin:0 8px;">›</span>
      <a href="/local" style="color:#fff;text-decoration:none;">지역별 진료</a>
      <span style="margin:0 8px;">›</span>
      <span>${region.name} ${treatment.name}</span>
    </nav>
    <div style="display:inline-block;padding:6px 16px;background:rgba(255,255,255,.2);border-radius:20px;font-size:.85rem;margin-bottom:16px;">
      🚇 ${region.station} · 도보 ${region.walkMin}분
    </div>
    <h1 style="font-size:2.5rem;font-weight:800;margin-bottom:16px;line-height:1.3;">
      ${region.name} ${treatment.name}<br>
      <span style="font-size:1.3rem;font-weight:400;opacity:.9;">전문 치과 행복한예인치과</span>
    </h1>
    <p style="font-size:1.1rem;line-height:1.7;opacity:.9;max-width:650px;">
      ${treatment.specialist}(${treatment.specialistTitle})이 직접 진료하는<br>
      ${region.name} ${treatment.name} 전문 치과입니다.
    </p>
    <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap;">
      <a href="tel:02-756-2828" style="display:inline-block;padding:14px 32px;background:#fff;color:#1a5276;border-radius:50px;font-weight:700;text-decoration:none;font-size:1rem;box-shadow:0 4px 15px rgba(0,0,0,.15);">📞 전화 상담</a>
      <a href="/location" style="display:inline-block;padding:14px 32px;background:rgba(255,255,255,.15);color:#fff;border:2px solid rgba(255,255,255,.5);border-radius:50px;font-weight:600;text-decoration:none;font-size:1rem;">📍 오시는 길</a>
    </div>
  </div>
</section>

<!-- Key Info Cards -->
<section style="max-width:1000px;margin:-30px auto 0;padding:0 20px;position:relative;z-index:2;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.08);text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;">🚇</div>
      <p style="font-weight:700;color:#1a5276;font-size:1.05rem;">${region.station}</p>
      <p style="color:#888;font-size:.9rem;">${region.exitInfo} · 도보 ${region.walkMin}분</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.08);text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;">👨‍⚕️</div>
      <p style="font-weight:700;color:#1a5276;font-size:1.05rem;">${treatment.specialist}</p>
      <p style="color:#888;font-size:.9rem;">${treatment.specialistTitle}</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.08);text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;">🕐</div>
      <p style="font-weight:700;color:#1a5276;font-size:1.05rem;">수요일 야간진료</p>
      <p style="color:#888;font-size:.9rem;">평일 10-18:30 · 수 ~20:30</p>
    </div>
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.08);text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;">⭐</div>
      <p style="font-weight:700;color:#1a5276;font-size:1.05rem;">환자 만족도 4.9</p>
      <p style="color:#888;font-size:.9rem;">287건 리뷰 기준</p>
    </div>
  </div>
</section>

<!-- Intro Section -->
<section class="intro-section" style="max-width:900px;margin:0 auto;padding:60px 20px;">
  <h2 style="font-size:1.6rem;font-weight:700;color:#1a5276;margin-bottom:24px;line-height:1.4;">
    ${region.name}에서 가장 가까운<br>${treatment.name} 전문 치과
  </h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:start;">
    <div>
      <p style="font-size:1.05rem;line-height:1.9;color:#444;">
        <strong>행복한예인치과</strong>는 ${region.station} ${region.exitInfo}에서 
        <strong>도보 ${region.walkMin}분</strong> 거리에 위치한 ${treatment.name} 전문 치과입니다.
      </p>
      <p style="font-size:1.05rem;line-height:1.9;color:#444;margin-top:16px;">
        ${region.areaDesc}
      </p>
      <p style="font-size:1.05rem;line-height:1.9;color:#444;margin-top:16px;">
        <strong>${treatment.specialist}(${treatment.specialistTitle})</strong>이 직접 
        ${treatment.nameDetail}를 진행하며, 서울대학교 치과병원과 동일한 
        진료 시스템을 갖추고 있습니다.
      </p>
    </div>
    <div style="background:#f8fbff;border-radius:16px;padding:24px;">
      <h3 style="font-size:1.1rem;font-weight:700;color:#2e86c1;margin-bottom:16px;">🗺️ ${region.name} → 행복한예인치과</h3>
      <ul style="list-style:none;padding:0;margin:0;">
        <li style="padding:10px 0;border-bottom:1px solid #e8f0fe;font-size:.95rem;color:#444;">
          🚇 <strong>${region.station}</strong> ${region.exitInfo} → 도보 ${region.walkMin}분
        </li>
        <li style="padding:10px 0;border-bottom:1px solid #e8f0fe;font-size:.95rem;color:#444;">
          🚌 버스 ${region.busRoutes.join(', ')}번
        </li>
        <li style="padding:10px 0;border-bottom:1px solid #e8f0fe;font-size:.95rem;color:#444;">
          📍 서울 중구 남대문로9길 51 효덕빌딩 3층
        </li>
        <li style="padding:10px 0;font-size:.95rem;color:#444;">
          📞 <a href="tel:02-756-2828" style="color:#2e86c1;font-weight:600;text-decoration:none;">02-756-2828</a>
        </li>
      </ul>
      <div style="margin-top:16px;">
        <p style="font-size:.85rem;color:#888;margin-bottom:8px;">주변 랜드마크</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${region.nearbyLandmarks.map(l => `<span style="display:inline-block;padding:4px 10px;background:#e8f0fe;border-radius:12px;font-size:.8rem;color:#2e86c1;">${l}</span>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Why Choose Section -->
<section style="background:#f8fbff;padding:60px 20px;">
  <div style="max-width:900px;margin:0 auto;">
    <h2 style="font-size:1.5rem;font-weight:700;color:#1a5276;text-align:center;margin-bottom:40px;">
      ${region.name}에서 행복한예인치과를 선택해야 하는 이유
    </h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;">
      <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.05);">
        <div style="font-size:1.5rem;margin-bottom:12px;">🎓</div>
        <h3 style="font-size:1.1rem;font-weight:700;color:#1a5276;margin-bottom:8px;">서울대 전문의 3인 직접 진료</h3>
        <p style="font-size:.92rem;color:#666;line-height:1.7;">
          한승대 대표원장(통합치의학), 신정희 원장(보존과), 박현미 원장(교정과) — 
          서울대 출신 전문의 3인이 각 분야 전문 진료를 직접 담당합니다.
        </p>
      </div>
      <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.05);">
        <div style="font-size:1.5rem;margin-bottom:12px;">🏥</div>
        <h3 style="font-size:1.1rem;font-weight:700;color:#1a5276;margin-bottom:8px;">서울대 치과병원급 시설</h3>
        <p style="font-size:.92rem;color:#666;line-height:1.7;">
          400평 규모, 6개 독립 수술실, 에어샤워 감염관리 시스템을 갖춘 
          서울대 치과병원 수준의 진료 환경을 제공합니다.
        </p>
      </div>
      <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.05);">
        <div style="font-size:1.5rem;margin-bottom:12px;">📍</div>
        <h3 style="font-size:1.1rem;font-weight:700;color:#1a5276;margin-bottom:8px;">${region.name}에서 도보 ${region.walkMin}분</h3>
        <p style="font-size:.92rem;color:#666;line-height:1.7;">
          ${region.station} ${region.exitInfo}에서 도보 ${region.walkMin}분. 
          ${region.nameShort} 직장인분들의 점심시간 방문과 수요일 야간진료(~20:30) 활용에 최적입니다.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Treatment Detail Preview -->
<section style="max-width:900px;margin:0 auto;padding:60px 20px;">
  <h2 style="font-size:1.5rem;font-weight:700;color:#1a5276;margin-bottom:12px;">
    ${region.name} ${treatment.nameDetail} 안내
  </h2>
  <p style="font-size:1.05rem;color:#555;line-height:1.8;margin-bottom:24px;">
    ${treatment.id === 'implant' ? `행복한예인치과의 발치즉시 임플란트는 80% 이상의 케이스에서 발치와 동시에 임플란트를 식립합니다. 잇몸 절개를 최소화하고 치료 기간을 획기적으로 단축하여 ${region.nameShort} 직장인분들의 시간을 절약해드립니다. 한승대 대표원장이 CT 정밀 진단부터 최종 보철까지 원스톱으로 진행합니다.` :
      treatment.id === 'preservation' ? `자연 치아를 살리는 것이 최선입니다. 신정희 보존과 전문의가 충치, 치아 균열, 신경 손상 등을 정밀 진단하고 가능한 한 발치 없이 치아를 보존하는 방향으로 치료합니다. ${region.nameShort} 직장인분들을 위해 1회 방문 시 최대한 많은 치료를 진행하여 내원 횟수를 줄여드립니다.` :
      treatment.id === 'aesthetic' ? `자연스러운 아름다움을 추구합니다. 한승대 대표원장이 최소 삭제 라미네이트, 지르코니아 크라운, 치아미백 등 개인 맞춤 심미 치료를 진행합니다. 디지털 시뮬레이션으로 치료 전 결과를 미리 확인하실 수 있으며, ${region.nameShort} 방문 시 빠른 상담이 가능합니다.` :
      treatment.id === 'orthodontics' ? `교정과 전문의 박현미 원장이 투명교정(인비절라인), 세라믹교정, 부분교정 등 개인 맞춤 교정 치료를 진행합니다. 3D 디지털 스캔으로 정밀한 교정 계획을 수립하며, ${region.nameShort} 직장인을 위한 투명교정은 외관상 거의 보이지 않아 일상생활에 불편이 없습니다.` :
      `정기적인 구강 건강 관리가 큰 치료를 예방합니다. 스케일링(건강보험 연 1회), 충치치료, 잇몸치료, 실란트, 불소도포 등 일반·예방 치료를 체계적으로 제공합니다. ${region.nameShort} 직장인분들의 점심시간 방문에 최적화된 빠른 진료를 제공합니다.`}
  </p>
  <a href="${treatment.treatmentSlug}" style="display:inline-block;padding:14px 28px;background:#2e86c1;color:#fff;border-radius:50px;font-weight:600;text-decoration:none;font-size:.95rem;box-shadow:0 4px 15px rgba(46,134,193,.3);">
    ${treatment.nameDetail} 상세보기 →
  </a>
</section>

<!-- FAQ Section -->
<section class="faq-section" style="background:#f8fbff;padding:60px 20px;">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-size:1.5rem;font-weight:700;color:#1a5276;text-align:center;margin-bottom:40px;">
      ${region.name} ${treatment.name} 자주 묻는 질문
    </h2>
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${faq.map((f, i) => `
      <details style="background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.04);overflow:hidden;"${i === 0 ? ' open' : ''}>
        <summary style="padding:18px 24px;cursor:pointer;font-weight:600;color:#1a5276;font-size:1rem;list-style:none;display:flex;justify-content:space-between;align-items:center;">
          <span>Q. ${f.q}</span>
          <span style="font-size:1.2rem;transition:transform .2s;flex-shrink:0;margin-left:12px;">+</span>
        </summary>
        <div style="padding:0 24px 18px;font-size:.95rem;color:#555;line-height:1.8;">
          ${f.a}
        </div>
      </details>`).join('')}
    </div>
  </div>
</section>

<!-- Internal Links — Other Regions -->
<section style="max-width:900px;margin:0 auto;padding:60px 20px 30px;">
  <h2 style="font-size:1.3rem;font-weight:700;color:#1a5276;margin-bottom:20px;">
    다른 지역에서 ${treatment.name} 찾으시나요?
  </h2>
  <div style="display:flex;flex-wrap:wrap;gap:10px;">
    ${otherRegions.map(r => `
    <a href="/local/${r.id}-${treatment.id}" style="padding:10px 20px;background:#f0f7ff;border:1px solid #d6e9f8;border-radius:25px;text-decoration:none;color:#2e86c1;font-weight:600;font-size:.92rem;transition:all .2s;"
       onmouseover="this.style.background='#2e86c1';this.style.color='#fff'"
       onmouseout="this.style.background='#f0f7ff';this.style.color='#2e86c1'">
      ${r.name} ${treatment.name}
    </a>`).join('')}
  </div>
</section>

<!-- Internal Links — Other Treatments in Same Region -->
<section style="max-width:900px;margin:0 auto;padding:0 20px 60px;">
  <h2 style="font-size:1.3rem;font-weight:700;color:#1a5276;margin-bottom:20px;">
    ${region.name} 근처 다른 진료 안내
  </h2>
  <div style="display:flex;flex-wrap:wrap;gap:10px;">
    ${otherTreatments.map(t => `
    <a href="/local/${region.id}-${t.id}" style="padding:10px 20px;background:#fff5f0;border:1px solid #f8d6c6;border-radius:25px;text-decoration:none;color:#e67e22;font-weight:600;font-size:.92rem;transition:all .2s;"
       onmouseover="this.style.background='#e67e22';this.style.color='#fff'"
       onmouseout="this.style.background='#fff5f0';this.style.color='#e67e22'">
      ${region.nameShort} ${t.name}
    </a>`).join('')}
  </div>
</section>

<!-- Final CTA -->
<section style="background:linear-gradient(135deg,#1a5276,#2e86c1);padding:60px 20px;text-align:center;color:#fff;">
  <h2 style="font-size:1.6rem;font-weight:700;margin-bottom:12px;">
    ${region.name}에서 도보 ${region.walkMin}분, 지금 상담하세요
  </h2>
  <p style="font-size:1.05rem;opacity:.9;margin-bottom:28px;">
    ${treatment.specialist}(${treatment.specialistTitle})이 직접 진료합니다
  </p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
    <a href="tel:02-756-2828" style="padding:16px 36px;background:#fff;color:#1a5276;border-radius:50px;font-weight:700;text-decoration:none;font-size:1.1rem;box-shadow:0 4px 15px rgba(0,0,0,.15);">📞 02-756-2828</a>
    <a href="/location" style="padding:16px 36px;border:2px solid #fff;color:#fff;border-radius:50px;font-weight:600;text-decoration:none;font-size:1.1rem;">📍 오시는 길 안내</a>
  </div>
</section>

</main>
${footer()}
${scripts()}
<style>
  details[open] summary span:last-child { transform: rotate(45deg); }
  @media(max-width:768px) {
    .local-seo-content h1 { font-size:1.8rem !important; }
    .local-seo-content section > div[style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr !important; }
  }
</style>
</body></html>`;
}
