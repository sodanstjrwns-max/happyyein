// 치과 백과사전 페이지 - 200개+ 용어
import { head, nav, footer, scripts } from './layout'

export interface DentalTerm {
  id: string;           // URL slug
  term: string;         // 한글 용어명
  termEn?: string;      // 영문명
  category: string;     // 카테고리
  short: string;        // 한줄 설명 (목록용)
  desc: string;         // 상세 설명 (HTML 가능)
  related?: string[];   // 관련 용어 id
  treatmentLink?: string; // 관련 진료 페이지 slug
}

export const CATEGORIES = [
  { id: 'implant', label: '임플란트', icon: 'fas fa-tooth' },
  { id: 'preservation', label: '보존치료', icon: 'fas fa-shield-alt' },
  { id: 'orthodontics', label: '교정', icon: 'fas fa-align-center' },
  { id: 'aesthetic', label: '심미치료', icon: 'fas fa-star' },
  { id: 'general', label: '일반/예방', icon: 'fas fa-heartbeat' },
  { id: 'anatomy', label: '구강해부', icon: 'fas fa-bone' },
  { id: 'surgery', label: '구강외과', icon: 'fas fa-cut' },
  { id: 'prostho', label: '보철', icon: 'fas fa-crown' },
  { id: 'perio', label: '잇몸/치주', icon: 'fas fa-leaf' },
  { id: 'pediatric', label: '소아/예방', icon: 'fas fa-child' },
  { id: 'equipment', label: '장비/기술', icon: 'fas fa-microscope' },
  { id: 'insurance', label: '보험/제도', icon: 'fas fa-file-invoice' },
];

export const terms: DentalTerm[] = [
  // ========== 임플란트 (25개) ==========
  { id: 'implant', term: '임플란트', termEn: 'Dental Implant', category: 'implant', short: '인공 치아 뿌리를 잇몸뼈에 식립하여 상실된 치아를 대체하는 시술', desc: '임플란트는 티타늄으로 만든 인공 치아 뿌리(fixture)를 턱뼈에 심고, 그 위에 인공 치아(크라운)를 연결하는 시술입니다. 자연 치아와 가장 유사한 기능과 외형을 제공하며, 인접 치아를 손상시키지 않는 것이 장점입니다. 올바른 관리 시 10~20년 이상 사용 가능합니다.', related: ['fixture', 'abutment', 'osseointegration', 'immediate-implant', 'bone-graft'], treatmentLink: 'implant' },
  { id: 'immediate-implant', term: '발치즉시 임플란트', termEn: 'Immediate Implant', category: 'implant', short: '발치와 동시에 임플란트를 식립하는 시술', desc: '발치즉시 임플란트는 치아를 뽑은 자리에 곧바로 임플란트 픽스처를 식립하는 방식입니다. 기존 방식(발치 후 3~6개월 대기)에 비해 치료 기간을 크게 단축시킵니다. 행복한예인치과에서는 80% 이상의 케이스에서 즉시식립을 시행합니다. 다만 잔존 골량과 감염 여부에 따라 적용이 제한될 수 있습니다.', related: ['implant', 'extraction', 'bone-graft', 'fixture'], treatmentLink: 'implant' },
  { id: 'fixture', term: '픽스처', termEn: 'Fixture', category: 'implant', short: '임플란트의 인공 치아 뿌리 부분(나사 형태)', desc: '픽스처는 임플란트의 가장 핵심적인 부분으로, 티타늄 합금으로 만든 나사 형태의 인공 뿌리입니다. 턱뼈에 식립한 뒤 2~4개월에 걸쳐 뼈와 결합(골유착)됩니다. 픽스처의 표면 처리 기술에 따라 골유착 성공률이 달라집니다.', related: ['implant', 'abutment', 'osseointegration', 'titanium'], treatmentLink: 'implant' },
  { id: 'abutment', term: '어버트먼트', termEn: 'Abutment', category: 'implant', short: '픽스처와 크라운을 연결하는 중간 연결체', desc: '어버트먼트는 턱뼈에 식립된 픽스처(인공 뿌리) 위에 올려 크라운(인공 치아)을 연결하는 부품입니다. 지르코니아, 티타늄, 금합금 등 다양한 재질이 있으며, 환자의 잇몸 상태와 심미성 요구에 따라 선택합니다.', related: ['fixture', 'crown', 'implant'], treatmentLink: 'implant' },
  { id: 'osseointegration', term: '골유착', termEn: 'Osseointegration', category: 'implant', short: '임플란트 픽스처가 턱뼈와 단단히 결합하는 과정', desc: '골유착은 임플란트 식립 후 픽스처 표면과 주변 뼈 조직이 직접적으로 결합하는 생물학적 과정입니다. 보통 2~4개월 소요되며, 이 기간 동안 과도한 힘이 가해지지 않도록 주의해야 합니다. 골유착이 완료되어야 최종 보철물을 장착할 수 있습니다.', related: ['fixture', 'implant', 'bone-graft'], treatmentLink: 'implant' },
  { id: 'bone-graft', term: '골이식', termEn: 'Bone Graft', category: 'implant', short: '임플란트 식립을 위해 부족한 뼈를 보충하는 시술', desc: '골이식은 임플란트를 심기에 뼈가 부족한 경우, 인공뼈나 자가골, 동종골 등을 이식하여 뼈의 양과 밀도를 보충하는 시술입니다. 발치즉시 임플란트 시에도 빈 공간을 메우기 위해 자주 동시 시행됩니다. 이식된 뼈가 기존 뼈와 융합되는 데 약 4~6개월이 걸립니다.', related: ['implant', 'sinus-lift', 'gbr', 'immediate-implant'], treatmentLink: 'implant' },
  { id: 'sinus-lift', term: '상악동 거상술', termEn: 'Sinus Lift', category: 'implant', short: '윗잇몸뼈 부족 시 상악동을 올려 뼈를 만드는 수술', desc: '상악동 거상술은 위턱 어금니 부위에 임플란트를 심을 때, 상악동(코 옆 빈 공간)의 점막을 위로 올리고 그 공간에 뼈 이식재를 채워넣는 수술입니다. 위턱 뼈가 얇은 경우 반드시 필요하며, 측방접근법과 치조정접근법 두 가지 방식이 있습니다.', related: ['bone-graft', 'implant', 'maxilla'], treatmentLink: 'implant' },
  { id: 'gbr', term: 'GBR', termEn: 'Guided Bone Regeneration', category: 'implant', short: '뼈 재생을 유도하는 골이식 기법', desc: 'GBR(골유도재생술)은 차폐막을 사용하여 뼈가 부족한 부위에 뼈 이식재를 넣고, 잇몸 조직이 침투하지 못하도록 막아 뼈만 선택적으로 재생시키는 기법입니다. 임플란트 식립과 동시에 시행하거나, 별도 단계로 진행할 수 있습니다.', related: ['bone-graft', 'membrane', 'implant'], treatmentLink: 'implant' },
  { id: 'titanium', term: '티타늄', termEn: 'Titanium', category: 'implant', short: '임플란트 재료로 사용되는 생체 친화적 금속', desc: '티타늄은 인체 조직과 높은 친화성을 가진 금속으로, 임플란트 픽스처의 주재료입니다. 알레르기 반응이 극히 드물고, 뼈와 직접 결합(골유착)하는 특성이 있습니다. 가볍고 강하며, MRI 촬영에도 큰 영향을 주지 않습니다.', related: ['fixture', 'implant', 'zirconia'], treatmentLink: 'implant' },
  { id: 'overdenture', term: '오버덴쳐', termEn: 'Overdenture', category: 'implant', short: '임플란트 위에 올리는 착탈식 틀니', desc: '오버덴쳐는 2~4개의 임플란트를 심고 그 위에 틀니를 고정하는 방식입니다. 일반 틀니에 비해 안정적이면서, 전체 임플란트보다 비용이 낮습니다. 특히 위턱이나 아래턱에 치아가 전혀 없는 무치악 환자에게 많이 적용합니다.', related: ['implant', 'denture', 'fixture'], treatmentLink: 'implant' },
  { id: 'guided-surgery', term: '가이드 수술', termEn: 'Guided Surgery', category: 'implant', short: 'CT 기반 3D 가이드를 이용한 정밀 임플란트 식립', desc: '가이드 수술은 CT 촬영 데이터를 기반으로 3D 프린팅한 수술 가이드를 사용하여 임플란트를 정확한 위치, 각도, 깊이로 식립하는 방법입니다. 수술 시간을 단축하고, 중요 신경이나 혈관 손상 위험을 최소화합니다.', related: ['implant', 'cbct', 'digital-dentistry'], treatmentLink: 'implant' },
  { id: 'peri-implantitis', term: '임플란트 주위염', termEn: 'Peri-implantitis', category: 'implant', short: '임플란트 주변 뼈와 잇몸에 발생하는 염증', desc: '임플란트 주위염은 임플란트 주변 조직에 세균이 감염되어 잇몸이 붓고, 뼈가 소실되는 질환입니다. 자연 치아의 치주염과 유사합니다. 정기적인 검진과 올바른 구강 위생 관리가 예방의 핵심이며, 조기 발견 시 비수술적 치료가 가능합니다.', related: ['implant', 'periodontal-disease', 'scaling'], treatmentLink: 'implant' },
  { id: 'membrane', term: '차폐막', termEn: 'Membrane', category: 'implant', short: 'GBR 시 뼈 재생을 돕기 위해 사용하는 생체막', desc: '차폐막은 골이식 부위에 덮어 잇몸 조직이 뼈 이식재 사이로 침투하는 것을 방지하고, 뼈만 선택적으로 재생되도록 유도하는 막입니다. 흡수성(스스로 녹는 것)과 비흡수성(제거 필요) 두 종류가 있습니다.', related: ['gbr', 'bone-graft', 'implant'], treatmentLink: 'implant' },
  { id: 'immediate-loading', term: '즉시 부하', termEn: 'Immediate Loading', category: 'implant', short: '임플란트 식립 당일 임시 치아를 장착하는 방법', desc: '즉시 부하란 임플란트를 심은 당일에 임시 보철물(임시 크라운)을 바로 장착하는 것을 말합니다. 심미적 요구가 높은 앞니 부위나 무치악 환자에게 적용됩니다. 다만 초기 안정성이 충분히 확보되어야 가능하므로 모든 경우에 적용되지는 않습니다.', related: ['implant', 'immediate-implant', 'provisional-crown'], treatmentLink: 'implant' },
  { id: 'all-on-4', term: '올온포', termEn: 'All-on-4', category: 'implant', short: '4개의 임플란트로 전체 치아를 복원하는 기법', desc: '올온포(All-on-4)는 위턱이나 아래턱에 4개의 임플란트만 식립하고, 그 위에 전체 보철물을 고정하는 기법입니다. 뒤쪽 2개의 임플란트를 기울여 식립하여 뼈이식 없이도 진행 가능한 경우가 많습니다. 무치악 환자에게 효율적인 솔루션입니다.', related: ['implant', 'overdenture', 'full-arch'], treatmentLink: 'implant' },

  // ========== 보존치료 (25개) ==========
  { id: 'root-canal', term: '신경치료', termEn: 'Root Canal Treatment', category: 'preservation', short: '감염된 치아 신경을 제거하고 충전하는 치료', desc: '신경치료(근관치료)는 충치가 깊어 치아 내부의 신경(치수)까지 감염된 경우, 감염된 신경 조직을 제거하고 근관(신경이 있던 통로)을 세척·소독한 뒤 충전재로 채우는 치료입니다. 치료 후에는 크라운으로 치아를 보호하는 것이 일반적입니다.', related: ['pulp', 'crown', 'cavity', 'microscope-treatment'], treatmentLink: 'preservation' },
  { id: 'cavity', term: '충치', termEn: 'Dental Caries / Cavity', category: 'preservation', short: '세균에 의해 치아가 부식되는 질환', desc: '충치(치아우식증)는 구강 내 세균이 음식물의 당분을 분해하면서 생성하는 산에 의해 치아의 법랑질과 상아질이 녹는 질환입니다. 초기에는 통증이 없어 발견이 어렵고, 진행되면 신경치료나 발치가 필요할 수 있습니다. 정기 검진이 중요합니다.', related: ['enamel', 'dentin', 'root-canal', 'filling'], treatmentLink: 'preservation' },
  { id: 'filling', term: '충전', termEn: 'Dental Filling', category: 'preservation', short: '충치 부위를 제거한 후 재료로 채우는 치료', desc: '충전(필링)은 충치로 손상된 치아 부분을 제거하고, 그 빈 공간을 레진(복합수지), 아말감, 금, 세라믹(인레이) 등의 재료로 채우는 치료입니다. 충치의 크기와 위치에 따라 적절한 충전 재료를 선택합니다.', related: ['cavity', 'resin', 'inlay', 'amalgam'], treatmentLink: 'preservation' },
  { id: 'resin', term: '레진', termEn: 'Composite Resin', category: 'preservation', short: '치아색 복합수지 충전 재료', desc: '레진(복합수지)은 치아 색과 유사한 충전 재료로, 소규모 충치 치료나 심미 수복에 널리 사용됩니다. 빛(광조사기)으로 경화시키며, 치아에 직접 접착되어 삭제량을 최소화할 수 있습니다. 다만 넓은 범위의 수복에는 내구성이 떨어질 수 있습니다.', related: ['filling', 'cavity', 'bonding', 'laminate'], treatmentLink: 'preservation' },
  { id: 'inlay', term: '인레이', termEn: 'Inlay', category: 'preservation', short: '기공소에서 제작한 맞춤형 충전물', desc: '인레이는 충치가 넓은 경우 치아 본을 떠서 기공소에서 맞춤 제작하는 충전물입니다. 금, 세라믹(포세린), 레진 등의 재료로 만들며, 직접 충전보다 적합도와 내구성이 뛰어납니다. 치아의 교합면(씹는 면) 안쪽만 채우는 것을 인레이, 교합면의 뾰족한 부분(교두)까지 덮는 것을 온레이라 합니다.', related: ['onlay', 'filling', 'crown', 'ceramic'], treatmentLink: 'preservation' },
  { id: 'onlay', term: '온레이', termEn: 'Onlay', category: 'preservation', short: '인레이보다 넓은 범위를 덮는 간접 수복물', desc: '온레이는 인레이와 유사하지만 치아의 교두(뾰족한 부분)까지 포함하여 더 넓은 범위를 덮는 맞춤형 수복물입니다. 크라운보다 치아 삭제량이 적으면서, 인레이보다 넓은 범위를 보호할 수 있어 보존적 치료에 유리합니다.', related: ['inlay', 'crown', 'filling'], treatmentLink: 'preservation' },
  { id: 'pulp', term: '치수', termEn: 'Dental Pulp', category: 'preservation', short: '치아 내부의 신경과 혈관이 있는 조직', desc: '치수는 치아 가장 안쪽에 위치한 살아있는 조직으로, 신경 섬유, 혈관, 결합 조직으로 구성됩니다. 치아에 영양과 감각을 공급하며, 충치가 치수까지 도달하면 극심한 통증이 발생합니다. 이때 신경치료(근관치료)가 필요합니다.', related: ['root-canal', 'cavity', 'dentin'], treatmentLink: 'preservation' },
  { id: 'pulpitis', term: '치수염', termEn: 'Pulpitis', category: 'preservation', short: '치수(치아 신경)에 발생하는 염증', desc: '치수염은 충치 세균이 치수까지 침투하여 발생하는 염증입니다. 가역적 치수염(자극 제거 시 회복 가능)과 비가역적 치수염(신경치료 필요)으로 나뉩니다. 뜨거운 것에 통증이 심하면 비가역적일 가능성이 높으며, 빠른 치료가 필요합니다.', related: ['pulp', 'root-canal', 'cavity'], treatmentLink: 'preservation' },
  { id: 'microscope-treatment', term: '미세현미경 치료', termEn: 'Microscope-assisted Treatment', category: 'preservation', short: '미세현미경을 이용한 정밀 신경치료', desc: '미세현미경 치료는 10~25배 확대된 시야에서 근관(신경관)의 미세한 구조를 직접 보면서 치료하는 방법입니다. 육안으로 보이지 않는 추가 근관이나 파절선을 발견할 수 있어 치료 성공률을 크게 높입니다. 행복한예인치과 보존과 전문의가 시행합니다.', related: ['root-canal', 'endodontics', 'specialist'], treatmentLink: 'preservation' },
  { id: 'endodontics', term: '근관학', termEn: 'Endodontics', category: 'preservation', short: '치아 내부(근관)를 전문적으로 다루는 치의학 분야', desc: '근관학(근관치료학)은 치수와 근관 질환을 진단하고 치료하는 치의학의 전문 분야입니다. 신경치료, 재신경치료, 치근단 수술 등이 포함됩니다. 보존과 전문의가 이 분야를 전담합니다.', related: ['root-canal', 'pulp', 'specialist'], treatmentLink: 'preservation' },
  { id: 'retreatment', term: '재신경치료', termEn: 'Retreatment', category: 'preservation', short: '이전 신경치료가 실패한 경우 다시 시행하는 치료', desc: '재신경치료는 이전에 신경치료를 받았으나 감염이 재발하거나 치유되지 않은 경우, 기존 충전재를 제거하고 근관을 다시 세척·소독·충전하는 치료입니다. 미세현미경을 활용하면 성공률이 크게 높아집니다.', related: ['root-canal', 'microscope-treatment', 'apicoectomy'], treatmentLink: 'preservation' },
  { id: 'apicoectomy', term: '치근단 절제술', termEn: 'Apicoectomy', category: 'preservation', short: '감염된 치아 뿌리 끝부분을 외과적으로 제거하는 수술', desc: '치근단 절제술은 신경치료만으로 해결되지 않는 치아 뿌리 끝(치근단) 감염을 외과적으로 제거하는 수술입니다. 잇몸을 절개하여 뿌리 끝 부분을 잘라내고 역충전합니다. 자연 치아를 보존하는 최후의 방법 중 하나입니다.', related: ['root-canal', 'retreatment', 'extraction'], treatmentLink: 'preservation' },
  { id: 'tooth-fracture', term: '치아 파절', termEn: 'Tooth Fracture', category: 'preservation', short: '치아가 깨지거나 금이 간 상태', desc: '치아 파절은 외상, 과도한 교합력, 딱딱한 음식 등으로 치아에 금이 가거나 깨진 상태입니다. 금의 범위에 따라 레진 수복, 크라운 치료, 신경치료, 심한 경우 발치가 필요할 수 있습니다. 초기에 발견할수록 보존 치료 가능성이 높습니다.', related: ['crown', 'root-canal', 'extraction', 'resin'], treatmentLink: 'preservation' },
  { id: 'tooth-sensitivity', term: '시린이', termEn: 'Tooth Sensitivity', category: 'preservation', short: '찬 음식이나 바람에 치아가 시린 증상', desc: '시린이(지각과민증)는 법랑질이 마모되거나 잇몸이 내려가 상아질이 노출될 때 발생합니다. 찬 것, 뜨거운 것, 신 것에 예민하게 반응합니다. 시린이 전용 치약, 불소 도포, 레진 코팅 등으로 완화할 수 있습니다.', related: ['dentin', 'enamel', 'fluoride', 'gum-recession'], treatmentLink: 'preservation' },

  // ========== 교정 (25개) ==========
  { id: 'orthodontics', term: '치아 교정', termEn: 'Orthodontics', category: 'orthodontics', short: '비뚤어진 치아 배열과 교합을 바로잡는 치료', desc: '치아 교정은 치아의 위치, 방향, 교합(물림) 관계를 개선하는 치과 전문 분야입니다. 심미적 개선뿐 아니라 저작 기능, 발음, 구강 위생 관리를 용이하게 합니다. 교정과 전문의가 환자의 상태에 맞는 최적의 교정 방식을 제안합니다.', related: ['bracket', 'clear-aligner', 'malocclusion', 'retainer'], treatmentLink: 'orthodontics' },
  { id: 'clear-aligner', term: '투명교정', termEn: 'Clear Aligner', category: 'orthodontics', short: '투명한 플라스틱 장치로 치아를 이동시키는 교정', desc: '투명교정은 투명한 플라스틱 소재의 장치(트레이)를 치아에 끼워 순차적으로 치아를 이동시키는 교정 방식입니다. 눈에 잘 띄지 않아 직장인에게 인기가 많습니다. 2주마다 새 트레이로 교체하며, 하루 20~22시간 착용해야 효과적입니다.', related: ['invisalign', 'orthodontics', 'bracket', 'attachment'], treatmentLink: 'orthodontics' },
  { id: 'invisalign', term: '인비절라인', termEn: 'Invisalign', category: 'orthodontics', short: '세계적으로 가장 널리 사용되는 투명교정 브랜드', desc: '인비절라인은 세계 최대 투명교정 브랜드로, 3D 디지털 스캔을 기반으로 맞춤 제작된 투명 트레이를 순차적으로 착용하여 치아를 교정합니다. 컴퓨터 시뮬레이션으로 치료 전에 최종 결과를 미리 확인할 수 있습니다.', related: ['clear-aligner', 'orthodontics', 'attachment', 'clincheck'], treatmentLink: 'orthodontics' },
  { id: 'bracket', term: '브라켓', termEn: 'Bracket', category: 'orthodontics', short: '치아에 부착하여 와이어를 고정하는 교정 장치', desc: '브라켓은 치아 표면에 접착제로 붙여 교정 와이어를 고정하는 작은 장치입니다. 금속, 세라믹(투명), 자가결찰식 등 다양한 종류가 있습니다. 와이어의 탄성력이 브라켓을 통해 치아에 전달되어 치아가 이동합니다.', related: ['wire', 'orthodontics', 'lingual-bracket', 'ceramic-bracket'], treatmentLink: 'orthodontics' },
  { id: 'lingual-bracket', term: '설측 교정', termEn: 'Lingual Orthodontics', category: 'orthodontics', short: '치아 안쪽(혀쪽)에 브라켓을 부착하는 보이지 않는 교정', desc: '설측 교정은 치아의 안쪽(혀 쪽) 면에 브라켓을 부착하는 교정 방식으로, 외부에서 교정 장치가 전혀 보이지 않습니다. 심미성이 가장 뛰어나지만 적응 기간이 필요하고, 비용이 상대적으로 높습니다.', related: ['bracket', 'orthodontics', 'clear-aligner'], treatmentLink: 'orthodontics' },
  { id: 'retainer', term: '유지장치', termEn: 'Retainer', category: 'orthodontics', short: '교정 후 치아가 원래 위치로 돌아가지 않도록 고정하는 장치', desc: '유지장치(리테이너)는 교정 치료 완료 후 치아가 원래 위치로 되돌아가는 것(재발)을 방지하기 위해 착용하는 장치입니다. 고정식(치아 뒤에 접착)과 가철식(탈착 가능) 두 종류가 있으며, 교정 후 최소 1~2년은 착용해야 합니다.', related: ['orthodontics', 'relapse', 'clear-aligner'], treatmentLink: 'orthodontics' },
  { id: 'malocclusion', term: '부정교합', termEn: 'Malocclusion', category: 'orthodontics', short: '윗니와 아랫니의 맞물림이 비정상인 상태', desc: '부정교합은 위아래 치아의 교합(맞물림)이 정상적이지 않은 상태를 말합니다. 1급(치아 배열 불량), 2급(위턱 돌출), 3급(아래턱 돌출/주걱턱) 등으로 분류합니다. 씹기 어려움, 발음 문제, 턱관절 장애를 유발할 수 있어 교정 치료가 권장됩니다.', related: ['orthodontics', 'tmj', 'overbite', 'underbite'], treatmentLink: 'orthodontics' },
  { id: 'overbite', term: '과개교합', termEn: 'Deep Bite / Overbite', category: 'orthodontics', short: '윗니가 아랫니를 과도하게 덮는 교합', desc: '과개교합은 위 앞니가 아래 앞니를 3분의 1 이상 과도하게 덮고 있는 상태입니다. 심한 경우 아래 앞니가 위 잇몸을 물어 잇몸 손상을 일으킵니다. 교정 치료로 개선할 수 있습니다.', related: ['malocclusion', 'orthodontics', 'underbite'], treatmentLink: 'orthodontics' },
  { id: 'underbite', term: '반대교합', termEn: 'Underbite', category: 'orthodontics', short: '아랫니가 윗니보다 앞으로 나온 교합(주걱턱)', desc: '반대교합(III급 부정교합)은 아래 앞니가 위 앞니보다 앞에 위치하는 상태로, 흔히 "주걱턱"이라고 합니다. 골격적 원인과 치아 원인이 있으며, 교정 치료 또는 악교정 수술로 개선합니다.', related: ['malocclusion', 'orthodontics', 'orthognathic-surgery'], treatmentLink: 'orthodontics' },
  { id: 'crowding', term: '총생', termEn: 'Crowding', category: 'orthodontics', short: '치아가 겹치거나 삐뚤빼뚤하게 나열된 상태', desc: '총생은 턱의 공간에 비해 치아가 커서 치아가 겹치거나 삐뚤빼뚤하게 나열된 상태입니다. 칫솔질이 어려워 충치와 잇몸병 위험이 높아집니다. 교정 치료로 가지런하게 배열할 수 있으며, 경우에 따라 발치교정이 필요합니다.', related: ['orthodontics', 'extraction-ortho', 'bracket', 'clear-aligner'], treatmentLink: 'orthodontics' },
  { id: 'attachment', term: '어태치먼트', termEn: 'Attachment', category: 'orthodontics', short: '투명교정 시 치아에 붙이는 작은 돌기', desc: '어태치먼트는 투명교정(인비절라인 등) 시 치아에 부착하는 레진 소재의 작은 돌기입니다. 투명교정 트레이가 치아를 효과적으로 잡아 이동시킬 수 있도록 돕는 역할을 합니다. 교정 완료 후 제거합니다.', related: ['clear-aligner', 'invisalign', 'resin'], treatmentLink: 'orthodontics' },
  { id: 'wire', term: '교정 와이어', termEn: 'Archwire', category: 'orthodontics', short: '브라켓에 연결하여 치아에 힘을 전달하는 금속선', desc: '교정 와이어는 브라켓에 걸어 치아에 지속적인 힘을 전달하는 금속선입니다. NiTi(니켈-티타늄), 스테인리스 스틸 등 다양한 재질이 있으며, 교정 단계에 따라 굵기와 경도를 바꿔 장착합니다.', related: ['bracket', 'orthodontics'], treatmentLink: 'orthodontics' },
  { id: 'extraction-ortho', term: '발치교정', termEn: 'Extraction Orthodontics', category: 'orthodontics', short: '공간 확보를 위해 일부 치아를 뽑고 교정하는 방법', desc: '발치교정은 치아 크기에 비해 턱이 작아 공간이 부족한 경우, 소구치 등 일부 치아를 발치하여 공간을 확보한 뒤 교정하는 방법입니다. 돌출된 입을 들여넣는 데 효과적이며, 교정 전문의가 정밀 진단 후 결정합니다.', related: ['crowding', 'orthodontics', 'extraction'], treatmentLink: 'orthodontics' },
  { id: 'ceramic-bracket', term: '세라믹 브라켓', termEn: 'Ceramic Bracket', category: 'orthodontics', short: '치아색과 유사한 반투명 소재의 교정 장치', desc: '세라믹 브라켓은 치아색과 비슷한 반투명한 세라믹 소재로 만든 브라켓입니다. 금속 브라켓에 비해 눈에 덜 띄지만, 강도가 약간 낮고 비용이 더 높습니다. 심미성을 중시하는 성인 교정에 많이 사용됩니다.', related: ['bracket', 'orthodontics', 'lingual-bracket'], treatmentLink: 'orthodontics' },
  { id: 'relapse', term: '교정 재발', termEn: 'Orthodontic Relapse', category: 'orthodontics', short: '교정 완료 후 치아가 원래 위치로 돌아가는 현상', desc: '교정 재발은 교정 치료로 가지런해진 치아가 시간이 지나며 원래 위치로 돌아가는 현상입니다. 유지장치(리테이너)를 지시대로 착용하지 않으면 발생합니다. 이를 예방하기 위해 교정 후 유지장치 착용이 필수입니다.', related: ['retainer', 'orthodontics'], treatmentLink: 'orthodontics' },

  // ========== 심미치료 (18개) ==========
  { id: 'laminate', term: '라미네이트', termEn: 'Dental Veneer / Laminate', category: 'aesthetic', short: '치아 표면에 얇은 세라믹 쉘을 접착하는 심미 치료', desc: '라미네이트(비니어)는 치아 전면을 최소한으로 삭제하고, 기공소에서 제작한 얇은 세라믹 쉘을 접착하는 심미 치료입니다. 치아의 색상, 모양, 크기를 개선할 수 있으며, 레진보다 내구성과 심미성이 뛰어납니다. 행복한예인치과에서는 최소 삭제를 원칙으로 합니다.', related: ['porcelain', 'resin', 'bonding', 'smile-design'], treatmentLink: 'aesthetic' },
  { id: 'bonding', term: '본딩', termEn: 'Dental Bonding', category: 'aesthetic', short: '레진을 치아에 직접 쌓아 형태를 수복하는 시술', desc: '본딩은 치아색 레진(복합수지)을 치아 표면에 직접 쌓아 올리고 빛으로 경화시켜 치아의 모양, 색상, 간격을 개선하는 시술입니다. 당일 완성이 가능하고, 라미네이트보다 치아 삭제량이 적은 것이 장점입니다.', related: ['resin', 'laminate', 'aesthetic'], treatmentLink: 'aesthetic' },
  { id: 'bleaching', term: '치아 미백', termEn: 'Tooth Whitening / Bleaching', category: 'aesthetic', short: '변색된 치아를 하얗게 만드는 시술', desc: '치아 미백은 과산화수소 또는 과산화요소 성분의 미백제를 사용하여 치아의 착색을 제거하고 하얗게 만드는 시술입니다. 병원 내 전문 미백(오피스 블리칭)과 가정용 미백(홈 블리칭) 두 가지 방법이 있습니다. 일시적으로 시린 증상이 나타날 수 있습니다.', related: ['laminate', 'aesthetic', 'enamel'], treatmentLink: 'aesthetic' },
  { id: 'smile-design', term: '스마일 디자인', termEn: 'Smile Design', category: 'aesthetic', short: '이상적인 미소 라인을 설계하는 심미 치과 기법', desc: '스마일 디자인은 환자의 얼굴형, 잇몸 라인, 치아 크기·비율을 종합적으로 분석하여 이상적인 미소를 설계하는 기법입니다. 디지털 시뮬레이션으로 치료 결과를 미리 확인할 수 있으며, 라미네이트, 크라운, 잇몸 성형 등 다양한 치료를 조합합니다.', related: ['laminate', 'crown', 'gum-contouring'], treatmentLink: 'aesthetic' },
  { id: 'porcelain', term: '포세린', termEn: 'Porcelain', category: 'aesthetic', short: '치과에서 사용하는 도자기 소재(세라믹)', desc: '포세린(도자기 세라믹)은 자연 치아와 유사한 투명도와 색감을 재현할 수 있는 치과 재료입니다. 라미네이트, 크라운, 인레이 등에 널리 사용되며, 생체 친화성이 높고 변색이 적습니다. 다만 충격에 약한 것이 단점입니다.', related: ['laminate', 'crown', 'ceramic', 'zirconia'], treatmentLink: 'aesthetic' },
  { id: 'gum-contouring', term: '잇몸 성형', termEn: 'Gum Contouring', category: 'aesthetic', short: '잇몸 라인을 다듬어 미소를 개선하는 시술', desc: '잇몸 성형은 잇몸이 과도하게 보이는 "거미 스마일(gummy smile)"이나 불균형한 잇몸 라인을 레이저나 전기소작기로 다듬어 균형 잡힌 미소를 만드는 시술입니다. 라미네이트 시술과 함께 진행하면 더 자연스러운 결과를 얻을 수 있습니다.', related: ['smile-design', 'laminate', 'laser'], treatmentLink: 'aesthetic' },
  { id: 'tooth-color', term: '치아 색조', termEn: 'Tooth Shade', category: 'aesthetic', short: '치아의 색상을 표준화하여 분류하는 기준', desc: '치아 색조는 VITA 색조 가이드 등 표준 체계로 분류합니다. A(적갈색), B(적황색), C(회색), D(적회색) 4개 그룹에 각각 밝기 단계가 있습니다. 보철물이나 라미네이트 제작 시 자연 치아와 최대한 일치하는 색조를 선택합니다.', related: ['laminate', 'crown', 'bleaching', 'porcelain'], treatmentLink: 'aesthetic' },

  // ========== 일반/예방 (22개) ==========
  { id: 'scaling', term: '스케일링', termEn: 'Dental Scaling', category: 'general', short: '치아 표면의 치석을 제거하는 예방 시술', desc: '스케일링은 초음파 기구를 사용하여 칫솔질만으로 제거되지 않는 치석(석회화된 플라크)을 제거하는 예방 시술입니다. 건강보험 적용으로 만 19세 이상 연 1회 저렴하게 받을 수 있습니다. 잇몸 질환 예방에 필수적입니다.', related: ['calculus', 'plaque', 'periodontal-disease', 'gingivitis'], treatmentLink: 'general' },
  { id: 'fluoride', term: '불소 도포', termEn: 'Fluoride Application', category: 'general', short: '불소를 치아에 도포하여 충치를 예방하는 시술', desc: '불소 도포는 치아 표면에 고농도 불소를 바르거나 트레이에 넣어 접촉시키는 시술입니다. 법랑질을 강화하여 충치에 대한 저항력을 높입니다. 어린이와 충치 고위험군에게 특히 효과적이며, 시린이 완화에도 도움이 됩니다.', related: ['enamel', 'cavity', 'sealant', 'tooth-sensitivity'], treatmentLink: 'general' },
  { id: 'sealant', term: '실란트', termEn: 'Dental Sealant', category: 'general', short: '어금니 홈을 메워 충치를 예방하는 코팅 시술', desc: '실란트(치면열구전색)는 어금니의 좁고 깊은 홈(열구)에 특수 수지를 흘려 넣어 음식물과 세균이 끼지 않도록 막는 예방 시술입니다. 특히 영구치가 나기 시작하는 어린이에게 효과적이며, 건강보험 적용이 가능합니다.', related: ['cavity', 'fluoride', 'molar'], treatmentLink: 'general' },
  { id: 'plaque', term: '치태', termEn: 'Dental Plaque', category: 'general', short: '치아에 형성되는 세균 막(바이오필름)', desc: '치태(플라크)는 치아 표면에 형성되는 끈끈한 세균 막입니다. 음식물의 당분을 분해하여 산을 생성, 충치를 일으키며, 제거하지 않으면 석회화되어 치석으로 변합니다. 올바른 칫솔질과 치실 사용으로 매일 제거해야 합니다.', related: ['calculus', 'cavity', 'scaling', 'brushing'], treatmentLink: 'general' },
  { id: 'calculus', term: '치석', termEn: 'Dental Calculus / Tartar', category: 'general', short: '치태가 석회화되어 단단하게 굳은 것', desc: '치석은 제거되지 않은 치태가 타액 속 칼슘, 인 등의 무기질에 의해 석회화되어 돌처럼 단단해진 것입니다. 칫솔질로 제거할 수 없으며, 스케일링을 통해서만 제거 가능합니다. 잇몸 염증과 치주염의 주요 원인입니다.', related: ['plaque', 'scaling', 'periodontal-disease'], treatmentLink: 'general' },
  { id: 'brushing', term: '올바른 칫솔질', termEn: 'Proper Brushing', category: 'general', short: '효과적인 칫솔질 방법과 습관', desc: '올바른 칫솔질은 치아와 잇몸 경계에 칫솔모를 45도 각도로 대고, 짧은 진동을 주며 한 치아당 10회 이상 닦는 것입니다. 바스법(변형)이 일반적으로 권장되며, 하루 3번 식후 3분 이내, 3분 이상 닦는 것이 좋습니다.', related: ['plaque', 'floss', 'interdental-brush'], treatmentLink: 'general' },
  { id: 'floss', term: '치실', termEn: 'Dental Floss', category: 'general', short: '치아 사이를 청소하는 가느다란 실', desc: '치실은 칫솔이 닿지 않는 치아 사이의 치태를 제거하는 데 필수적인 구강 위생 도구입니다. 치아 사이에 넣어 부드럽게 위아래로 움직여 사용합니다. 왁스 코팅, 테이프형, 플로서(막대형) 등 다양한 종류가 있습니다.', related: ['interdental-brush', 'plaque', 'brushing'], treatmentLink: 'general' },
  { id: 'interdental-brush', term: '치간칫솔', termEn: 'Interdental Brush', category: 'general', short: '치아 사이 넓은 공간을 청소하는 작은 솔', desc: '치간칫솔은 치아 사이가 벌어진 부위, 브릿지 하방, 임플란트 주위 등을 청소하는 데 사용하는 작은 솔입니다. 다양한 크기가 있으며, 자신의 치아 사이 공간에 맞는 크기를 선택해야 합니다.', related: ['floss', 'brushing', 'implant'], treatmentLink: 'general' },
  { id: 'dental-checkup', term: '정기 검진', termEn: 'Dental Checkup', category: 'general', short: '정기적으로 구강 상태를 확인하는 예방 검사', desc: '정기 검진은 6개월~1년 간격으로 치과를 방문하여 충치, 잇몸 상태, 교합 등을 점검받는 예방 활동입니다. 초기 충치나 잇몸 질환은 증상이 없어 정기 검진 없이는 발견이 어렵습니다. 조기 발견 시 간단하고 저렴하게 치료할 수 있습니다.', related: ['scaling', 'x-ray', 'cavity'], treatmentLink: 'general' },
  { id: 'halitosis', term: '구취', termEn: 'Halitosis', category: 'general', short: '입에서 불쾌한 냄새가 나는 증상', desc: '구취(입 냄새)는 구강 내 세균이 단백질을 분해하며 발생하는 황화합물이 주 원인입니다. 혀 뒤쪽 백태, 잇몸 질환, 깊은 충치, 마른 입 등이 원인이 될 수 있습니다. 올바른 구강 위생 관리와 혀 닦기, 정기 검진이 중요합니다.', related: ['periodontal-disease', 'scaling', 'brushing'], treatmentLink: 'general' },
  { id: 'mouthguard', term: '마우스가드', termEn: 'Mouthguard', category: 'general', short: '운동이나 이갈이 시 치아를 보호하는 장치', desc: '마우스가드는 스포츠 활동 시 외상으로부터 치아를 보호하거나, 수면 시 이갈이(bruxism)로 인한 치아 마모를 방지하는 장치입니다. 기성품도 있지만, 치과에서 맞춤 제작한 것이 착용감과 보호력이 훨씬 뛰어납니다.', related: ['bruxism', 'tmj'], treatmentLink: 'general' },
  { id: 'bruxism', term: '이갈이', termEn: 'Bruxism', category: 'general', short: '수면 중 또는 무의식적으로 이를 가는 습관', desc: '이갈이(브럭시즘)는 수면 중이나 스트레스 상황에서 무의식적으로 치아를 강하게 물거나 가는 습관입니다. 치아 마모, 파절, 턱관절 장애, 두통 등을 유발할 수 있습니다. 마우스가드(나이트가드) 착용으로 치아를 보호합니다.', related: ['mouthguard', 'tmj', 'tooth-fracture'], treatmentLink: 'general' },

  // ========== 구강해부 (18개) ==========
  { id: 'enamel', term: '법랑질', termEn: 'Enamel', category: 'anatomy', short: '치아 가장 바깥을 감싸는 인체에서 가장 단단한 조직', desc: '법랑질은 치아의 가장 바깥층으로, 96% 이상이 무기질(수산화인회석)로 구성된 인체에서 가장 단단한 조직입니다. 신경이 없어 통증을 느끼지 못하며, 한번 손상되면 자연 재생이 불가능합니다. 산에 의해 녹는 것이 충치의 시작입니다.', related: ['dentin', 'cavity', 'fluoride'], treatmentLink: 'preservation' },
  { id: 'dentin', term: '상아질', termEn: 'Dentin', category: 'anatomy', short: '법랑질 아래에 위치한 치아의 중간층', desc: '상아질은 법랑질과 치수 사이에 위치한 조직으로, 미세한 관(상아세관)이 가득합니다. 법랑질이 마모되어 상아질이 노출되면 차고 뜨거운 자극이 세관을 통해 신경에 전달되어 시린 증상이 나타납니다.', related: ['enamel', 'pulp', 'tooth-sensitivity'], treatmentLink: 'preservation' },
  { id: 'cementum', term: '백악질', termEn: 'Cementum', category: 'anatomy', short: '치아 뿌리 표면을 덮고 있는 조직', desc: '백악질은 치아 뿌리 표면을 얇게 덮고 있는 뼈와 유사한 조직입니다. 치주인대의 섬유가 백악질에 부착되어 치아를 턱뼈에 고정하는 역할을 합니다. 잇몸이 내려가면 백악질이 노출되어 시림과 충치에 취약해집니다.', related: ['pdl', 'gum-recession', 'root'], treatmentLink: 'preservation' },
  { id: 'pdl', term: '치주인대', termEn: 'Periodontal Ligament', category: 'anatomy', short: '치아와 치조골 사이를 연결하는 섬유 조직', desc: '치주인대는 치아 뿌리와 치조골(잇몸뼈) 사이를 연결하는 탄력 있는 섬유 조직입니다. 씹을 때 충격을 흡수하고, 치아에 가해지는 힘을 감지하는 감각 기능도 있습니다. 교정 시 치아가 이동할 수 있는 것도 치주인대 덕분입니다.', related: ['alveolar-bone', 'orthodontics', 'periodontal-disease'], treatmentLink: 'general' },
  { id: 'alveolar-bone', term: '치조골', termEn: 'Alveolar Bone', category: 'anatomy', short: '치아를 지지하는 턱뼈의 일부', desc: '치조골은 치아가 심어져 있는 턱뼈의 돌기 부분입니다. 치아를 잇몸 안에서 단단히 고정하는 역할을 하며, 치주염이 진행되면 치조골이 녹아 치아가 흔들리게 됩니다. 임플란트 식립 시에도 치조골의 양과 밀도가 중요합니다.', related: ['pdl', 'periodontal-disease', 'bone-graft', 'implant'], treatmentLink: 'implant' },
  { id: 'gingiva', term: '치은', termEn: 'Gingiva / Gums', category: 'anatomy', short: '치아 주변을 둘러싸고 있는 잇몸 조직', desc: '치은(잇몸)은 치아 주위의 뼈와 치아 뿌리를 덮고 있는 점막 조직입니다. 건강한 잇몸은 분홍색이며 단단합니다. 염증이 생기면 빨갛게 붓고, 칫솔질 시 피가 나며, 방치하면 치주염으로 진행됩니다.', related: ['gingivitis', 'periodontal-disease', 'scaling'], treatmentLink: 'general' },
  { id: 'maxilla', term: '상악', termEn: 'Maxilla', category: 'anatomy', short: '위턱 뼈', desc: '상악은 얼굴의 위쪽 턱뼈로, 윗니가 심어져 있습니다. 상악동(부비동)과 인접해 있어 위쪽 어금니 임플란트 시 상악동 거상술이 필요할 수 있습니다. 위턱은 아래턱에 비해 뼈 밀도가 낮은 편입니다.', related: ['mandible', 'sinus-lift', 'implant'], treatmentLink: 'implant' },
  { id: 'mandible', term: '하악', termEn: 'Mandible', category: 'anatomy', short: '아래턱 뼈', desc: '하악은 얼굴의 아래쪽 턱뼈로, 아랫니가 심어져 있으며 유일하게 움직이는 얼굴 뼈입니다. 턱관절(TMJ)을 통해 두개골에 연결되어 있습니다. 아래턱의 하치조신경은 임플란트 식립 시 주의해야 하는 중요한 구조물입니다.', related: ['maxilla', 'tmj', 'implant'], treatmentLink: 'implant' },
  { id: 'root', term: '치근', termEn: 'Root', category: 'anatomy', short: '치아에서 잇몸뼈 속에 묻혀 있는 뿌리 부분', desc: '치근(치아 뿌리)은 치아에서 잇몸 아래, 치조골 내에 위치하는 부분입니다. 앞니는 보통 1개, 어금니는 2~3개의 치근을 가집니다. 치근 내부에는 신경과 혈관이 지나는 근관이 있으며, 신경치료 시 이 근관을 치료합니다.', related: ['root-canal', 'pulp', 'apicoectomy'], treatmentLink: 'preservation' },
  { id: 'molar', term: '어금니', termEn: 'Molar', category: 'anatomy', short: '음식을 갈아 부수는 큰 이빨', desc: '어금니(대구치)는 구강 뒤쪽에 위치한 크고 넓은 치아로, 음식을 갈아 부수는 저작 기능을 담당합니다. 위아래 양쪽 각 3개씩(사랑니 포함) 총 12개입니다. 홈이 깊어 충치가 잘 발생하므로 실란트가 효과적입니다.', related: ['premolar', 'sealant', 'wisdom-tooth', 'cavity'], treatmentLink: 'general' },
  { id: 'premolar', term: '소구치', termEn: 'Premolar', category: 'anatomy', short: '어금니와 송곳니 사이에 위치한 작은 어금니', desc: '소구치(작은어금니)는 송곳니와 대구치 사이에 위치하며, 위아래 각 4개씩 총 8개입니다. 음식을 으깨고 찢는 역할을 합니다. 교정 시 공간 확보를 위해 발치하는 경우가 가장 많은 치아이기도 합니다.', related: ['molar', 'extraction-ortho', 'canine'], treatmentLink: 'general' },

  // ========== 구강외과 (15개) ==========
  { id: 'extraction', term: '발치', termEn: 'Tooth Extraction', category: 'surgery', short: '치아를 뽑는 시술', desc: '발치는 심한 충치, 치주염, 매복치, 교정 목적 등의 이유로 치아를 뽑는 시술입니다. 단순 발치와 외과적 발치(뼈를 삭제해야 하는 경우)로 나뉩니다. 발치 후에는 지혈과 감염 방지를 위한 관리가 중요합니다.', related: ['wisdom-tooth', 'implant', 'immediate-implant'], treatmentLink: 'general' },
  { id: 'wisdom-tooth', term: '사랑니', termEn: 'Wisdom Tooth', category: 'surgery', short: '가장 늦게 나오는 세 번째 어금니(제3대구치)', desc: '사랑니(지치)는 보통 17~25세에 나오는 가장 뒤쪽 어금니입니다. 공간이 부족하여 비스듬하게 나거나 매복되는 경우가 많습니다. 충치, 염증, 인접 치아 손상을 일으킬 수 있어 발치를 권하는 경우가 많습니다.', related: ['extraction', 'impacted-tooth', 'molar'], treatmentLink: 'general' },
  { id: 'impacted-tooth', term: '매복치', termEn: 'Impacted Tooth', category: 'surgery', short: '뼈나 잇몸 속에 묻혀 나오지 못한 치아', desc: '매복치는 뼈나 잇몸 조직에 완전히 또는 부분적으로 묻혀 정상적으로 나오지 못한 치아입니다. 사랑니가 가장 흔하며, 송곳니도 매복되는 경우가 있습니다. 감염이나 낭종(물혹)의 원인이 될 수 있어 정기적 관찰이나 발치가 필요합니다.', related: ['wisdom-tooth', 'extraction', 'cyst'], treatmentLink: 'general' },
  { id: 'orthognathic-surgery', term: '악교정 수술', termEn: 'Orthognathic Surgery', category: 'surgery', short: '턱뼈의 위치를 교정하는 외과적 수술', desc: '악교정 수술은 위턱이나 아래턱의 골격적 부조화를 외과적으로 교정하는 수술입니다. 주걱턱(하악 전돌), 무턱(하악 후퇴), 안면 비대칭 등 교정만으로 해결되지 않는 골격적 문제에 적용됩니다. 교정 치료와 병행합니다.', related: ['underbite', 'malocclusion', 'orthodontics'], treatmentLink: 'orthodontics' },
  { id: 'dry-socket', term: '건성 발치창', termEn: 'Dry Socket / Alveolar Osteitis', category: 'surgery', short: '발치 후 혈병(피떡)이 빠져 뼈가 노출되는 합병증', desc: '건성 발치창은 발치 후 형성된 혈병(혈액 응고 덩어리)이 녹거나 빠져 치조골이 직접 노출되는 합병증입니다. 극심한 통증을 유발하며, 발치 2~3일 후 증상이 나타납니다. 빨대 사용, 흡연, 격렬한 양치질이 원인이 될 수 있습니다.', related: ['extraction', 'wisdom-tooth'], treatmentLink: 'general' },
  { id: 'cyst', term: '치성낭종', termEn: 'Dental Cyst', category: 'surgery', short: '치아 주변 뼈 속에 생기는 물혹', desc: '치성낭종은 감염된 치아 뿌리 끝이나 매복치 주위의 뼈 속에 형성되는 주머니 모양의 병변입니다. 내부에 액체가 차 있으며, 천천히 커지면서 주변 뼈를 녹입니다. 외과적 적출술로 치료하며, 원인 치아도 함께 처리합니다.', related: ['impacted-tooth', 'apicoectomy', 'extraction'], treatmentLink: 'general' },
  { id: 'tmj', term: '턱관절 장애', termEn: 'TMJ Disorder / TMD', category: 'surgery', short: '턱관절 부위의 통증, 소리, 개구장애 등의 증상', desc: '턱관절 장애(TMD)는 턱관절이나 주변 근육에 통증, 소리(딸깍), 입 벌림 제한 등의 증상이 나타나는 질환입니다. 이갈이, 스트레스, 부정교합, 외상 등이 원인이 될 수 있습니다. 약물 치료, 물리치료, 스플린트 장착 등으로 치료합니다.', related: ['bruxism', 'malocclusion', 'mouthguard'], treatmentLink: 'general' },

  // ========== 보철 (18개) ==========
  { id: 'crown', term: '크라운', termEn: 'Dental Crown', category: 'prostho', short: '손상된 치아 전체를 덮어씌우는 보철물', desc: '크라운(치관)은 충치가 크거나, 신경치료 후, 파절된 치아를 보호하기 위해 치아 전체를 덮어씌우는 보철물입니다. 금, PFM(도재소부금속), 지르코니아, 올세라믹 등 다양한 재질이 있으며, 치아의 위치와 기능에 따라 선택합니다.', related: ['root-canal', 'zirconia', 'pfm', 'porcelain'], treatmentLink: 'preservation' },
  { id: 'bridge', term: '브릿지', termEn: 'Dental Bridge', category: 'prostho', short: '상실된 치아 양쪽 치아를 깎아 연결하는 고정 보철', desc: '브릿지는 빠진 치아 양쪽의 건강한 치아를 깎아 기둥으로 삼고, 그 사이에 인공 치아를 연결하는 고정형 보철물입니다. 임플란트에 비해 시술이 빠르고 비용이 낮지만, 건강한 인접 치아를 삭제해야 하는 단점이 있습니다.', related: ['crown', 'implant', 'denture', 'pontic'], treatmentLink: 'preservation' },
  { id: 'denture', term: '틀니', termEn: 'Denture', category: 'prostho', short: '여러 개의 치아를 대체하는 탈착식 보철물', desc: '틀니는 여러 개 또는 전체 치아가 상실된 경우 착탈이 가능한 보철물입니다. 부분 틀니(일부 치아 상실)와 완전 틀니(전체 치아 상실)로 나뉩니다. 잇몸에 안착하여 사용하며, 임플란트 위에 고정하는 오버덴처도 있습니다.', related: ['overdenture', 'bridge', 'implant'], treatmentLink: 'general' },
  { id: 'zirconia', term: '지르코니아', termEn: 'Zirconia', category: 'prostho', short: '강도가 높고 치아색인 세라믹 보철 재료', desc: '지르코니아는 고강도 세라믹 소재로, 크라운과 브릿지의 주재료로 널리 사용됩니다. 금속을 사용하지 않아 잇몸 변색이 없고, 자연 치아와 유사한 색상을 재현합니다. 뛰어난 강도와 생체 친화성이 장점입니다.', related: ['crown', 'bridge', 'porcelain', 'pfm'], treatmentLink: 'preservation' },
  { id: 'pfm', term: 'PFM 크라운', termEn: 'Porcelain-Fused-to-Metal Crown', category: 'prostho', short: '금속 위에 도자기를 입힌 크라운', desc: 'PFM(도재소부금속관)은 금속 프레임 위에 포세린(도자기)을 입힌 크라운입니다. 금속의 강도와 도자기의 심미성을 결합한 방식으로, 오랫동안 널리 사용되었습니다. 다만 시간이 지나면 잇몸 경계에서 금속선이 보일 수 있습니다.', related: ['crown', 'zirconia', 'porcelain'], treatmentLink: 'preservation' },
  { id: 'pontic', term: '가공치', termEn: 'Pontic', category: 'prostho', short: '브릿지에서 빠진 치아를 대체하는 인공 치아 부분', desc: '가공치(폰틱)는 브릿지의 구성 요소 중 빠진 치아 자리를 대체하는 인공 치아 부분입니다. 양쪽 지대치(깎은 치아)의 크라운에 연결되어 있으며, 잇몸 위에 얹히는 형태입니다.', related: ['bridge', 'crown'], treatmentLink: 'preservation' },
  { id: 'provisional-crown', term: '임시 치아', termEn: 'Provisional Crown / Temporary Crown', category: 'prostho', short: '최종 보철물 완성까지 착용하는 임시 보철물', desc: '임시 치아(임시 크라운)는 치아를 삭제한 후 기공소에서 최종 보철물을 제작하는 동안(보통 1~2주) 착용하는 보호용 보철물입니다. 레진이나 아크릴 소재로 만들어지며, 심미성과 기능을 임시로 유지합니다.', related: ['crown', 'bridge', 'implant'], treatmentLink: 'preservation' },
  { id: 'impression', term: '인상 채득', termEn: 'Dental Impression', category: 'prostho', short: '치아 본을 뜨는 과정', desc: '인상 채득은 보철물이나 교정 장치를 만들기 위해 환자의 치아와 잇몸의 모양을 정확히 복제하는 과정입니다. 전통적으로 실리콘 인상재를 트레이에 담아 물리지만, 최근에는 구강 스캐너로 디지털 인상을 채득하는 경우도 많습니다.', related: ['crown', 'bridge', 'digital-dentistry', 'oral-scanner'], treatmentLink: 'preservation' },
  { id: 'occlusion', term: '교합', termEn: 'Occlusion', category: 'prostho', short: '위아래 치아가 맞물리는 관계', desc: '교합은 위턱과 아래턱의 치아가 서로 맞물리는 관계를 말합니다. 정상적인 교합은 효율적인 저작, 발음, 턱관절 건강에 중요합니다. 보철물 제작이나 교정 시 정확한 교합 조정이 필수입니다.', related: ['malocclusion', 'tmj', 'bruxism', 'crown'], treatmentLink: 'general' },

  // ========== 잇몸/치주 (15개) ==========
  { id: 'gingivitis', term: '치은염', termEn: 'Gingivitis', category: 'perio', short: '잇몸에 염증이 생긴 초기 단계', desc: '치은염은 잇몸(치은)에 염증이 발생한 상태로, 치주질환의 초기 단계입니다. 잇몸이 빨갛게 붓고, 칫솔질 시 피가 납니다. 치태와 치석이 주 원인이며, 스케일링과 올바른 구강 관리로 완전히 회복할 수 있습니다.', related: ['periodontal-disease', 'scaling', 'plaque', 'calculus'], treatmentLink: 'general' },
  { id: 'periodontal-disease', term: '치주염', termEn: 'Periodontitis', category: 'perio', short: '잇몸과 치조골까지 파괴되는 잇몸병의 진행 단계', desc: '치주염은 치은염이 진행되어 잇몸뼈(치조골)까지 파괴되는 심각한 잇몸 질환입니다. 치아가 흔들리고, 결국 빠지게 되는 성인 치아 상실의 가장 큰 원인입니다. 스케일링, 치근 활택술, 잇몸 수술 등 단계적 치료가 필요합니다.', related: ['gingivitis', 'scaling', 'root-planing', 'alveolar-bone'], treatmentLink: 'general' },
  { id: 'root-planing', term: '치근 활택술', termEn: 'Root Planing', category: 'perio', short: '치아 뿌리 표면의 치석과 감염 조직을 제거하는 시술', desc: '치근 활택술은 잇몸 아래(치주낭 내) 치아 뿌리 표면에 붙은 치석과 감염된 백악질을 제거하고, 뿌리 표면을 매끄럽게 다듬는 치주 치료입니다. 잇몸이 다시 뿌리에 밀착할 수 있도록 돕습니다. 보통 스케일링 이후 단계적으로 시행합니다.', related: ['periodontal-disease', 'scaling', 'calculus'], treatmentLink: 'general' },
  { id: 'gum-recession', term: '잇몸 퇴축', termEn: 'Gum Recession', category: 'perio', short: '잇몸이 내려가 치아 뿌리가 노출되는 상태', desc: '잇몸 퇴축은 잇몸이 치아 아래쪽으로 내려가 치아 뿌리가 노출되는 상태입니다. 과도한 칫솔질, 치주질환, 이갈이 등이 원인이며, 시린이, 뿌리 충치, 심미적 문제를 유발합니다. 심한 경우 잇몸 이식술로 치료합니다.', related: ['tooth-sensitivity', 'periodontal-disease', 'brushing'], treatmentLink: 'general' },
  { id: 'periodontal-pocket', term: '치주낭', termEn: 'Periodontal Pocket', category: 'perio', short: '잇몸과 치아 사이가 깊어진 비정상적 공간', desc: '치주낭은 치주염이 진행되면서 잇몸과 치아 사이의 틈(열구)이 비정상적으로 깊어진 것입니다. 정상은 1~3mm이며, 4mm 이상이면 치주낭으로 진단합니다. 세균이 이 공간에서 번식하여 치조골을 파괴합니다.', related: ['periodontal-disease', 'root-planing', 'scaling'], treatmentLink: 'general' },
  { id: 'gum-graft', term: '잇몸 이식', termEn: 'Gum Graft', category: 'perio', short: '퇴축된 잇몸 부위에 잇몸 조직을 이식하는 수술', desc: '잇몸 이식은 심하게 내려간 잇몸 부위에 구개(입천장) 등에서 채취한 잇몸 조직을 이식하여 노출된 치아 뿌리를 다시 덮는 수술입니다. 시린이 개선, 뿌리 충치 예방, 심미성 회복 효과가 있습니다.', related: ['gum-recession', 'periodontal-disease'], treatmentLink: 'general' },

  // ========== 소아/예방 (10개) ==========
  { id: 'baby-tooth', term: '유치', termEn: 'Primary Tooth / Baby Tooth', category: 'pediatric', short: '어린이에게 처음 나는 치아(젖니)', desc: '유치(젖니)는 생후 약 6개월부터 나기 시작하여 약 3세에 20개가 완성되는 첫 번째 치아입니다. 6~12세 사이에 영구치로 교체됩니다. 유치는 영구치의 자리를 잡아주는 역할을 하므로, 충치 관리가 매우 중요합니다.', related: ['permanent-tooth', 'cavity', 'sealant'], treatmentLink: 'general' },
  { id: 'permanent-tooth', term: '영구치', termEn: 'Permanent Tooth', category: 'pediatric', short: '유치가 빠진 후 나오는 평생 사용할 치아', desc: '영구치는 유치가 빠진 자리에 나오는 두 번째이자 마지막 치아입니다. 사랑니를 포함해 총 32개(사랑니 제외 28개)이며, 한번 상실하면 자연 재생이 불가능합니다. 영구치가 처음 나올 때 실란트와 불소 도포로 예방하는 것이 효과적입니다.', related: ['baby-tooth', 'sealant', 'fluoride', 'molar'], treatmentLink: 'general' },
  { id: 'space-maintainer', term: '간격유지장치', termEn: 'Space Maintainer', category: 'pediatric', short: '유치가 조기에 빠진 자리의 공간을 유지하는 장치', desc: '간격유지장치는 유치가 충치나 외상으로 조기에 빠진 경우, 영구치가 나올 공간이 좁아지지 않도록 유지하는 장치입니다. 이 장치가 없으면 인접 치아가 빈 공간으로 기울어져 영구치가 나올 자리가 부족해질 수 있습니다.', related: ['baby-tooth', 'permanent-tooth', 'orthodontics'], treatmentLink: 'general' },
  { id: 'tongue-tie', term: '설소대 단축증', termEn: 'Tongue-Tie / Ankyloglossia', category: 'pediatric', short: '혀 밑의 소대가 짧아 혀 움직임이 제한되는 상태', desc: '설소대 단축증은 혀 밑의 소대(프레눌럼)가 비정상적으로 짧거나 두꺼워 혀의 움직임이 제한되는 상태입니다. 수유 곤란, 발음 문제 등을 일으킬 수 있으며, 간단한 소대 절제술로 치료합니다.', related: ['baby-tooth', 'speech'], treatmentLink: 'general' },

  // ========== 장비/기술 (15개) ==========
  { id: 'cbct', term: 'CBCT', termEn: 'Cone Beam CT', category: 'equipment', short: '치과용 3D CT 촬영 장비', desc: 'CBCT(콘빔 CT)는 적은 방사선량으로 턱뼈와 치아의 3차원 영상을 촬영하는 치과 전용 CT입니다. 임플란트 식립 계획, 매복치 위치 확인, 근관 형태 파악 등에 필수적입니다. 일반 의과 CT보다 방사선량이 훨씬 적습니다.', related: ['implant', 'guided-surgery', 'x-ray'], treatmentLink: 'implant' },
  { id: 'x-ray', term: '치과 엑스레이', termEn: 'Dental X-ray', category: 'equipment', short: '치아와 주변 조직을 방사선으로 촬영하는 영상 검사', desc: '치과 엑스레이는 눈으로 보이지 않는 치아 내부, 뿌리, 뼈 상태를 확인하는 영상 검사입니다. 파노라마(전체), 치근단(개별 치아), CBCT(3D) 등 종류가 있으며, 충치, 치주염, 매복치 등의 진단에 필수적입니다.', related: ['cbct', 'dental-checkup', 'panorama'], treatmentLink: 'general' },
  { id: 'panorama', term: '파노라마 촬영', termEn: 'Panoramic X-ray', category: 'equipment', short: '전체 치아와 턱뼈를 한 장에 담는 엑스레이', desc: '파노라마 촬영은 위아래 모든 치아, 턱뼈, 상악동, 턱관절을 한 장의 넓은 영상에 담는 엑스레이입니다. 전체적인 구강 상태를 한눈에 파악할 수 있어 초진 검사, 교정 진단, 임플란트 계획 등에 사용됩니다.', related: ['x-ray', 'cbct', 'dental-checkup'], treatmentLink: 'general' },
  { id: 'oral-scanner', term: '구강 스캐너', termEn: 'Intraoral Scanner', category: 'equipment', short: '구강 내부를 3D 디지털로 촬영하는 장비', desc: '구강 스캐너는 작은 카메라로 치아와 잇몸을 스캔하여 3D 디지털 모형을 만드는 장비입니다. 기존의 실리콘 인상(본 뜨기)을 대체하여, 환자의 불편감을 줄이고 정확도를 높입니다. 크라운, 교정, 임플란트 계획에 활용됩니다.', related: ['impression', 'digital-dentistry', 'crown', 'clear-aligner'], treatmentLink: 'general' },
  { id: 'digital-dentistry', term: '디지털 치의학', termEn: 'Digital Dentistry', category: 'equipment', short: '디지털 기술을 활용한 현대 치과 진료 체계', desc: '디지털 치의학은 CBCT, 구강 스캐너, CAD/CAM, 3D 프린팅, 가이드 수술 등 디지털 기술을 치과 진료에 접목한 체계입니다. 진단의 정확성과 보철물의 정밀도를 높이고, 치료 시간을 단축합니다.', related: ['cbct', 'oral-scanner', 'cad-cam', 'guided-surgery'], treatmentLink: 'general' },
  { id: 'cad-cam', term: 'CAD/CAM', termEn: 'Computer-Aided Design/Manufacturing', category: 'equipment', short: '컴퓨터로 보철물을 설계·제작하는 기술', desc: 'CAD/CAM은 구강 스캔 데이터를 기반으로 컴퓨터에서 보철물을 설계(CAD)하고, 밀링 머신으로 정밀하게 깎아 제작(CAM)하는 기술입니다. 지르코니아, 세라믹 크라운 등을 높은 정밀도로 제작할 수 있습니다.', related: ['digital-dentistry', 'zirconia', 'crown', 'oral-scanner'], treatmentLink: 'general' },
  { id: 'laser', term: '치과용 레이저', termEn: 'Dental Laser', category: 'equipment', short: '잇몸 치료, 미백 등에 사용하는 레이저 장비', desc: '치과용 레이저는 잇몸 절개, 잇몸 성형, 치아 미백, 구내염 치료, 소독 등 다양한 시술에 사용됩니다. 출혈이 적고, 회복이 빠르며, 통증이 줄어드는 장점이 있습니다. Er:YAG, 다이오드, CO2 레이저 등 종류에 따라 용도가 다릅니다.', related: ['gum-contouring', 'bleaching', 'periodontal-disease'], treatmentLink: 'aesthetic' },
  { id: 'autoclave', term: '오토클레이브', termEn: 'Autoclave', category: 'equipment', short: '고압 증기로 치과 기구를 멸균하는 장비', desc: '오토클레이브는 134°C 이상의 고압 증기로 치과 기구를 완전히 멸균하는 장비입니다. 감염 관리의 핵심 장비로, 모든 환자에게 사용하는 기구는 반드시 오토클레이브 멸균을 거쳐야 합니다.', related: ['infection-control'], treatmentLink: 'general' },

  // ========== 보험/제도 (12개) ==========
  { id: 'insurance-scaling', term: '보험 스케일링', termEn: 'Insurance-covered Scaling', category: 'insurance', short: '건강보험이 적용되는 연 1회 스케일링', desc: '만 19세 이상 건강보험 가입자는 연 1회 스케일링을 건강보험 적용 가격(약 1만 5천원~2만원)으로 받을 수 있습니다. 매년 1월 1일~12월 31일 기준으로 1회 적용되며, 잇몸 건강 유지에 매우 중요한 예방 시술입니다.', related: ['scaling', 'dental-checkup'], treatmentLink: 'general' },
  { id: 'senior-implant', term: '노인 임플란트 보험', termEn: 'Senior Implant Insurance', category: 'insurance', short: '만 65세 이상 건강보험 적용 임플란트', desc: '만 65세 이상 건강보험 가입자는 평생 위아래 각 1개씩, 최대 2개의 임플란트를 건강보험 적용 가격으로 식립할 수 있습니다. 본인부담률은 30%(일반)이며, 차상위·기초생활수급자는 더 낮습니다.', related: ['implant', 'denture'], treatmentLink: 'implant' },
  { id: 'medical-deduction', term: '의료비 세액공제', termEn: 'Medical Expense Tax Deduction', category: 'insurance', short: '치과 치료비의 연말정산 세액공제', desc: '치과 치료비는 의료비 세액공제 대상입니다. 임플란트, 교정, 라미네이트 등 비급여 항목도 포함됩니다. 연간 총 급여의 3% 초과분에 대해 15% 세액공제를 받을 수 있으며, 국세청 연말정산 간소화 서비스에서 자동 조회됩니다.', related: ['insurance-scaling', 'senior-implant'], treatmentLink: 'general' },
  { id: 'non-covered', term: '비급여', termEn: 'Non-covered / Out-of-pocket', category: 'insurance', short: '건강보험이 적용되지 않는 치과 치료 항목', desc: '비급여 항목은 건강보험이 적용되지 않아 환자가 전액 부담하는 치료입니다. 치과에서는 임플란트(65세 미만), 교정, 라미네이트, 미백 등이 대표적인 비급여 항목입니다. 병원마다 가격이 다를 수 있으므로 사전 상담이 중요합니다.', related: ['insurance-scaling', 'senior-implant', 'medical-deduction'], treatmentLink: 'general' },
  { id: 'specialist', term: '치과 전문의', termEn: 'Dental Specialist', category: 'insurance', short: '특정 분야의 전문 수련을 마친 치과의사', desc: '치과 전문의는 치의학 대학 졸업 후 해당 분야의 전문의 과정(수련)을 이수하고, 보건복지부가 시행하는 전문의 시험에 합격한 치과의사입니다. 구강악안면외과, 치과보존과, 치과교정과, 치과보철과, 통합치의학과 등 10개 전문과가 있습니다.', related: ['endodontics', 'orthodontics', 'microscope-treatment'], treatmentLink: 'general' },
  { id: 'infection-control', term: '감염 관리', termEn: 'Infection Control', category: 'insurance', short: '치과 진료 시 교차 감염을 예방하는 체계', desc: '감염 관리는 환자와 의료진 간의 교차 감염을 방지하기 위한 위생 체계입니다. 기구 멸균(오토클레이브), 1인 1팩 포장, 일회용 글러브·커버 사용, 표면 소독, 공기 정화 등이 포함됩니다. 행복한예인치과는 철저한 감염 관리 기준을 준수합니다.', related: ['autoclave'], treatmentLink: 'general' },

  // ========== 추가 용어 (빈 카테고리 보충) ==========
  { id: 'amalgam', term: '아말감', termEn: 'Amalgam', category: 'preservation', short: '수은 합금을 사용한 전통적 충전 재료', desc: '아말감은 수은과 은, 주석, 구리 등을 혼합한 전통적인 충전 재료입니다. 내구성이 뛰어나고 비용이 저렴하지만, 은색이어서 눈에 잘 띕니다. 최근에는 레진이나 세라믹 등 심미적 대안이 선호되는 추세입니다.', related: ['filling', 'resin', 'cavity'], treatmentLink: 'preservation' },
  { id: 'ceramic', term: '세라믹', termEn: 'Ceramic', category: 'prostho', short: '치아색을 재현하는 도자기 소재의 총칭', desc: '세라믹은 치과에서 사용되는 도자기 계열 소재의 총칭으로, 포세린, 지르코니아, 리튬디실리케이트(e.max) 등이 포함됩니다. 자연 치아와 유사한 투명도와 색상을 재현하며, 생체 친화성이 높고 변색이 적습니다.', related: ['porcelain', 'zirconia', 'crown', 'laminate'], treatmentLink: 'aesthetic' },
  { id: 'local-anesthesia', term: '국소마취', termEn: 'Local Anesthesia', category: 'general', short: '치료 부위만 마취시키는 주사 마취', desc: '국소마취는 리도카인 등 마취제를 치료 부위 잇몸에 주사하여 해당 부위만 감각을 차단하는 방법입니다. 치과 대부분의 시술에 사용되며, 의식은 유지됩니다. 표면 마취제를 먼저 도포하면 주사 통증도 최소화할 수 있습니다.', related: ['extraction', 'root-canal', 'implant'], treatmentLink: 'general' },
  { id: 'sedation', term: '수면치료(진정법)', termEn: 'Sedation Dentistry', category: 'general', short: '약물로 불안과 공포를 줄이며 진행하는 치과 치료', desc: '수면치료(의식하 진정법)는 약물(흡입 또는 정맥)을 사용하여 환자의 불안과 공포를 줄인 반수면 상태에서 치료하는 방법입니다. 의식은 유지되지만 시간이 빠르게 지나가는 느낌을 줍니다. 치과 공포증이 심한 환자에게 유용합니다.', related: ['local-anesthesia', 'extraction', 'implant'], treatmentLink: 'general' },
  { id: 'canine', term: '송곳니', termEn: 'Canine Tooth', category: 'anatomy', short: '앞니와 어금니 사이에 위치한 뾰족한 치아', desc: '송곳니는 앞니 옆에 위치한 뾰족한 치아로, 위아래 각 2개씩 총 4개입니다. 음식을 찢는 역할을 하며, 치아 중 가장 긴 뿌리를 가집니다. 교합의 안내 역할을 하여 교정에서 중요하게 다뤄집니다.', related: ['premolar', 'molar', 'orthodontics'], treatmentLink: 'general' },
  { id: 'full-arch', term: '전악 보철', termEn: 'Full Arch Prosthesis', category: 'prostho', short: '한 턱의 모든 치아를 인공 보철로 대체하는 치료', desc: '전악 보철은 위턱이나 아래턱의 모든 치아를 대체하는 대규모 보철 치료입니다. 임플란트 기반(All-on-4, All-on-6), 완전 틀니, 임플란트 오버덴처 등 다양한 방식이 있으며, 환자의 뼈 상태와 예산에 따라 선택합니다.', related: ['all-on-4', 'overdenture', 'denture', 'implant'], treatmentLink: 'implant' },
  { id: 'clincheck', term: '클린체크', termEn: 'ClinCheck', category: 'orthodontics', short: '인비절라인의 3D 치료 시뮬레이션 소프트웨어', desc: '클린체크는 인비절라인의 독자적인 3D 시뮬레이션 소프트웨어로, 치료 전에 치아가 어떻게 이동하고 최종 결과가 어떻게 될지 미리 확인할 수 있습니다. 교정 전문의가 이를 기반으로 치료 계획을 세밀하게 조정합니다.', related: ['invisalign', 'clear-aligner', 'digital-dentistry'], treatmentLink: 'orthodontics' },

  // ========== 추가 임플란트 (10개) ==========
  { id: 'mini-implant', term: '미니 임플란트', termEn: 'Mini Implant', category: 'implant', short: '직경이 작은 소형 임플란트', desc: '미니 임플란트는 일반 임플란트보다 직경이 작은(1.8~3.3mm) 소형 임플란트입니다. 뼈가 좁은 부위나 틀니 고정용으로 사용되며, 교정에서는 TAD(임시 고정장치)로 활용됩니다. 수술이 간단하고 회복이 빠른 것이 장점입니다.', related: ['implant', 'overdenture', 'orthodontics'], treatmentLink: 'implant' },
  { id: 'subperiosteal-implant', term: '골막하 임플란트', termEn: 'Subperiosteal Implant', category: 'implant', short: '뼈 위(골막 아래)에 놓는 특수 임플란트', desc: '골막하 임플란트는 턱뼈 위의 골막 아래에 금속 프레임을 놓고 그 위에 보철물을 연결하는 방식입니다. 뼈의 높이가 극히 부족하여 일반 임플란트가 불가능한 경우에 고려됩니다. 최근에는 3D 프린팅 기술로 정밀 제작이 가능해졌습니다.', related: ['implant', 'bone-graft'], treatmentLink: 'implant' },
  { id: 'zygomatic-implant', term: '관골 임플란트', termEn: 'Zygomatic Implant', category: 'implant', short: '광대뼈에 고정하는 특수 장거리 임플란트', desc: '관골 임플란트는 위턱 뼈가 극히 부족한 경우, 광대뼈(관골)에 긴 임플란트를 고정하는 특수 시술입니다. 대규모 골이식 없이도 무치악 상악을 복원할 수 있어, 기존 치료가 어려웠던 환자에게 새로운 선택지를 제공합니다.', related: ['implant', 'all-on-4', 'sinus-lift'], treatmentLink: 'implant' },
  { id: 'implant-surface', term: '임플란트 표면처리', termEn: 'Implant Surface Treatment', category: 'implant', short: '골유착을 높이기 위한 픽스처 표면 가공 기술', desc: '임플란트 표면처리는 픽스처 표면에 미세한 거칠기를 만들어 뼈세포의 부착과 성장을 촉진하는 기술입니다. SLA, RBM, 양극산화, 나노코팅 등 다양한 방식이 있으며, 표면처리 기술에 따라 골유착 속도와 성공률이 달라집니다.', related: ['fixture', 'osseointegration', 'titanium'], treatmentLink: 'implant' },
  { id: 'one-day-implant', term: '당일 임플란트', termEn: 'One-Day Implant', category: 'implant', short: '하루 만에 임플란트 식립과 임시치아 장착을 완료', desc: '당일 임플란트는 하루 안에 임플란트 식립부터 임시 치아 장착까지 완료하는 시술입니다. 즉시 부하(Immediate Loading) 개념으로, 초기 고정력이 충분한 경우 시행됩니다. 바쁜 직장인에게 특히 인기이며, 심미적·기능적으로 즉시 효과를 볼 수 있습니다.', related: ['immediate-loading', 'immediate-implant', 'guided-surgery'], treatmentLink: 'implant' },
  { id: 'short-implant', term: '숏 임플란트', termEn: 'Short Implant', category: 'implant', short: '길이가 짧은(8mm 이하) 임플란트', desc: '숏 임플란트는 길이가 8mm 이하인 짧은 임플란트로, 뼈의 높이가 부족한 부위에 골이식 없이 식립할 수 있습니다. 특히 하악 신경에 가까운 아래 어금니 부위나, 상악동이 넓은 위 어금니 부위에서 유용합니다.', related: ['implant', 'sinus-lift', 'bone-graft'], treatmentLink: 'implant' },
  { id: 'implant-failure', term: '임플란트 실패', termEn: 'Implant Failure', category: 'implant', short: '임플란트가 뼈와 결합하지 못하거나 탈락하는 경우', desc: '임플란트 실패는 골유착이 되지 않거나, 시간이 지나 임플란트가 흔들리는 상황을 말합니다. 감염, 과부하, 골질 불량, 흡연 등이 원인이 될 수 있습니다. 실패 시 임플란트를 제거하고 뼈가 회복된 후 재식립할 수 있습니다.', related: ['peri-implantitis', 'osseointegration', 'implant'], treatmentLink: 'implant' },
  { id: 'healing-abutment', term: '힐링 어버트먼트', termEn: 'Healing Abutment', category: 'implant', short: '임플란트 위에 잇몸 형태를 만들어주는 임시 캡', desc: '힐링 어버트먼트는 임플란트 식립 후 잇몸이 올바른 형태로 치유되도록 유도하는 임시 캡입니다. 골유착 기간 동안 잇몸의 모양을 잡아주며, 최종 보철물 장착 시 제거합니다. 자연스러운 잇몸 라인을 만드는 데 중요한 역할을 합니다.', related: ['abutment', 'implant', 'osseointegration'], treatmentLink: 'implant' },
  { id: 'implant-maintenance', term: '임플란트 유지관리', termEn: 'Implant Maintenance', category: 'implant', short: '임플란트의 수명을 연장하기 위한 정기 관리', desc: '임플란트 유지관리는 식립 후 정기적인 검진과 전문가 세정으로 임플란트의 수명을 극대화하는 활동입니다. 3~6개월 간격 방문, 잇몸 상태 확인, 교합 점검, 전문 기구로 세정 등이 포함됩니다. 올바른 관리 시 20년 이상 사용 가능합니다.', related: ['peri-implantitis', 'scaling', 'dental-checkup'], treatmentLink: 'implant' },
  { id: 'sinus-floor', term: '상악동저 접근법', termEn: 'Crestal Sinus Approach', category: 'implant', short: '치조정 방향으로 상악동저를 거상하는 최소침습 방법', desc: '상악동저 접근법(치조정 접근법)은 임플란트 식립 부위에서 직접 상악동 점막을 밀어 올리는 최소침습 방법입니다. 측방접근법보다 수술이 간단하고 회복이 빠르지만, 뼈 보충량이 적은 경우에 적합합니다.', related: ['sinus-lift', 'implant', 'bone-graft'], treatmentLink: 'implant' },

  // ========== 추가 보존치료 (8개) ==========
  { id: 'glass-ionomer', term: '글래스아이오노머', termEn: 'Glass Ionomer Cement', category: 'preservation', short: '불소를 방출하는 충전/접착 재료', desc: '글래스아이오노머는 불소를 지속적으로 방출하는 치과 충전 및 접착 재료입니다. 충치 예방 효과가 있어 어린이 치아나 치근부 충치에 유용합니다. 레진보다 강도는 낮지만 습기에 강하고 치아에 화학적으로 접착됩니다.', related: ['filling', 'resin', 'fluoride'], treatmentLink: 'preservation' },
  { id: 'post-core', term: '포스트 코어', termEn: 'Post and Core', category: 'preservation', short: '신경치료 후 치아 내부에 기둥을 세우는 시술', desc: '포스트 코어는 신경치료 후 남은 치아 구조가 적을 때, 근관 안에 기둥(포스트)을 세우고 그 위에 코어(핵)를 만들어 크라운을 지지하는 시술입니다. 파이버 포스트와 메탈 포스트 두 종류가 있습니다.', related: ['root-canal', 'crown'], treatmentLink: 'preservation' },
  { id: 'direct-capping', term: '직접복조', termEn: 'Direct Pulp Capping', category: 'preservation', short: '노출된 치수(신경)를 약제로 덮어 보존하는 시술', desc: '직접복조는 충치 제거 중 치수가 미세하게 노출되었을 때, MTA나 수산화칼슘 등의 약제로 노출 부위를 덮어 치수 생활력을 보존하는 시술입니다. 신경치료를 피하고 치수를 살릴 수 있는 보존적 방법입니다.', related: ['pulp', 'pulpitis', 'root-canal'], treatmentLink: 'preservation' },
  { id: 'abrasion', term: '치경부 마모', termEn: 'Cervical Abrasion', category: 'preservation', short: '치아와 잇몸 경계부가 파이는 증상', desc: '치경부 마모는 치아와 잇몸의 경계부(치경부)가 패이는 현상으로, 과도한 칫솔질이 주 원인입니다. 상아질이 노출되면 시린 증상이 나타나며, 레진이나 글래스아이오노머로 충전하여 치료합니다.', related: ['tooth-sensitivity', 'dentin', 'resin', 'gum-recession'], treatmentLink: 'preservation' },
  { id: 'tooth-discoloration', term: '치아 변색', termEn: 'Tooth Discoloration', category: 'preservation', short: '치아가 원래 색에서 변하는 증상', desc: '치아 변색은 외인성(커피, 와인, 담배 착색)과 내인성(테트라사이클린, 불소증, 신경 괴사)으로 나뉩니다. 원인에 따라 스케일링, 미백, 라미네이트 등 치료법이 달라집니다.', related: ['bleaching', 'laminate', 'scaling'], treatmentLink: 'aesthetic' },
  { id: 'erosion', term: '치아 침식', termEn: 'Dental Erosion', category: 'preservation', short: '산성 물질에 의해 법랑질이 녹는 현상', desc: '치아 침식은 세균이 아닌 외부 산(위산역류, 산성음료, 구토 등)에 의해 법랑질이 화학적으로 녹는 현상입니다. 충치와 달리 넓은 면적이 동시에 매끈하게 닳는 특징이 있으며, 원인 제거와 함께 수복 치료를 진행합니다.', related: ['enamel', 'cavity', 'tooth-sensitivity'], treatmentLink: 'preservation' },
  { id: 'mta', term: 'MTA', termEn: 'Mineral Trioxide Aggregate', category: 'preservation', short: '치수 보호와 수복에 사용되는 생체활성 재료', desc: 'MTA는 뛰어난 생체 친화성과 밀봉력을 가진 치과 재료로, 치수복조, 치근단 역충전, 천공 수복 등에 사용됩니다. 수분 환경에서도 경화되며 항균 효과가 있어, 신경치료의 성공률을 높입니다.', related: ['direct-capping', 'root-canal', 'apicoectomy'], treatmentLink: 'preservation' },
  { id: 'tooth-transplant', term: '치아 이식', termEn: 'Tooth Transplantation', category: 'preservation', short: '자신의 다른 치아를 빈 자리에 옮겨 심는 시술', desc: '치아 이식은 사랑니 등 기능하지 않는 자신의 치아를 발치된 자리에 옮겨 심는 시술입니다. 성공하면 자연 치아의 감각과 치주인대 기능을 유지할 수 있어 임플란트의 대안이 됩니다. 특히 젊은 환자에게 유리합니다.', related: ['extraction', 'wisdom-tooth', 'implant', 'pdl'], treatmentLink: 'preservation' },

  // ========== 추가 교정 (8개) ==========
  { id: 'self-ligating', term: '자가결찰 브라켓', termEn: 'Self-ligating Bracket', category: 'orthodontics', short: '와이어를 자체 잠금장치로 고정하는 진보된 브라켓', desc: '자가결찰 브라켓은 별도의 고무줄이나 철사 없이 브라켓 자체에 내장된 클립으로 와이어를 고정합니다. 마찰이 적어 치아 이동이 효율적이고, 내원 간격을 늘릴 수 있습니다. 데이몬 시스템이 대표적입니다.', related: ['bracket', 'wire', 'orthodontics'], treatmentLink: 'orthodontics' },
  { id: 'tad', term: 'TAD', termEn: 'Temporary Anchorage Device', category: 'orthodontics', short: '교정용 미니 스크류(임시 고정원)', desc: 'TAD(임시 고정 장치)는 교정 중 치아에 힘을 전달하기 위한 고정원(앵커)으로 잇몸뼈에 삽입하는 미니 스크류입니다. 교정 후 제거합니다. 기존에는 어려웠던 치아 이동을 가능하게 하여 치료 결과를 향상시킵니다.', related: ['mini-implant', 'orthodontics', 'bracket'], treatmentLink: 'orthodontics' },
  { id: 'expansion', term: '급속 구개 확장', termEn: 'Rapid Palatal Expansion', category: 'orthodontics', short: '좁은 윗턱을 빠르게 넓히는 교정 장치', desc: '급속 구개 확장은 성장기 아동이나 청소년의 좁은 위턱(구개)을 넓히는 교정 장치입니다. 나사를 매일 돌려 구개봉합부를 열어 턱을 넓힙니다. 교차교합 해소, 코 호흡 개선, 치열 공간 확보 등의 효과가 있습니다.', related: ['malocclusion', 'orthodontics', 'maxilla'], treatmentLink: 'orthodontics' },
  { id: 'headgear', term: '헤드기어', termEn: 'Headgear', category: 'orthodontics', short: '턱의 성장을 조절하는 구외 교정 장치', desc: '헤드기어는 머리나 목에 걸어 턱뼈의 성장 방향과 속도를 조절하는 구외(입 바깥) 교정 장치입니다. 위턱이 과도하게 성장하는 경우 억제하거나, 어금니를 뒤로 이동시키는 데 사용합니다. 주로 야간에 착용합니다.', related: ['orthodontics', 'malocclusion', 'maxilla'], treatmentLink: 'orthodontics' },
  { id: 'open-bite', term: '개방교합', termEn: 'Open Bite', category: 'orthodontics', short: '위아래 치아가 맞닿지 않는 교합', desc: '개방교합은 입을 다물어도 위아래 앞니(또는 어금니)가 맞닿지 않는 상태입니다. 손가락 빨기, 혀 내밀기 습관, 골격적 요인 등이 원인입니다. 발음 장애와 저작 불편을 유발하며 교정 치료로 개선할 수 있습니다.', related: ['malocclusion', 'orthodontics', 'overbite'], treatmentLink: 'orthodontics' },
  { id: 'crossbite', term: '교차교합', termEn: 'Crossbite', category: 'orthodontics', short: '일부 윗니가 아랫니 안쪽으로 물리는 교합', desc: '교차교합은 정상적으로 윗니가 아랫니 바깥쪽에 위치해야 하는데, 일부 치아가 반대로 아랫니 안쪽에 위치하는 비정상 교합입니다. 턱의 비대칭 성장을 유발할 수 있어 조기 치료가 권장됩니다.', related: ['malocclusion', 'orthodontics', 'expansion'], treatmentLink: 'orthodontics' },
  { id: 'ipr', term: 'IPR', termEn: 'Interproximal Reduction', category: 'orthodontics', short: '치아 사이를 미세하게 삭제하여 공간을 확보하는 방법', desc: 'IPR(인접면 삭제)은 치아 사이의 법랑질을 0.1~0.5mm 미세하게 다듬어 교정에 필요한 공간을 확보하는 방법입니다. 발치 없이 교정할 수 있게 하며, 투명교정과 함께 자주 시행됩니다. 삭제량이 미미하여 치아 건강에 영향이 없습니다.', related: ['clear-aligner', 'enamel', 'crowding'], treatmentLink: 'orthodontics' },
  { id: 'power-chain', term: '파워체인', termEn: 'Power Chain', category: 'orthodontics', short: '브라켓 사이를 연결하는 탄성 체인', desc: '파워체인은 브라켓 사이를 연결하는 탄성 고무 체인으로, 발치 후 생긴 공간을 닫거나 치아 간 간격을 줄이는 데 사용됩니다. 투명, 회색, 다양한 색상이 있습니다.', related: ['bracket', 'wire', 'extraction-ortho'], treatmentLink: 'orthodontics' },

  // ========== 추가 심미치료 (8개) ==========
  { id: 'emax', term: 'e.max', termEn: 'Lithium Disilicate', category: 'aesthetic', short: '리튬디실리케이트 소재의 고심미성 세라믹', desc: 'e.max(리튬디실리케이트)는 높은 투명도와 강도를 가진 세라믹 소재로, 앞니 크라운, 인레이, 라미네이트에 많이 사용됩니다. 자연 치아와 가장 유사한 투명도를 재현하며, 지르코니아보다 더 심미적입니다.', related: ['porcelain', 'zirconia', 'crown', 'laminate'], treatmentLink: 'aesthetic' },
  { id: 'diastema', term: '치간 이개', termEn: 'Diastema', category: 'aesthetic', short: '앞니 사이에 생긴 벌어진 틈', desc: '치간 이개는 앞니 사이에 눈에 띄는 공간이 있는 상태입니다. 유전, 치아 크기와 턱 불균형, 습관 등이 원인입니다. 레진 본딩, 라미네이트, 교정 치료 등으로 개선할 수 있습니다.', related: ['bonding', 'laminate', 'orthodontics'], treatmentLink: 'aesthetic' },
  { id: 'teeth-contouring', term: '치아 성형', termEn: 'Tooth Contouring / Reshaping', category: 'aesthetic', short: '치아의 모양을 미세하게 다듬는 심미 시술', desc: '치아 성형은 법랑질을 미세하게 삭제하여 치아의 모양, 길이, 표면을 다듬는 심미 시술입니다. 울퉁불퉁한 치아 가장자리, 뾰족한 송곳니 등을 자연스럽게 교정합니다. 단독 또는 본딩과 함께 시행됩니다.', related: ['bonding', 'laminate', 'smile-design'], treatmentLink: 'aesthetic' },
  { id: 'gummy-smile', term: '거미 스마일', termEn: 'Gummy Smile', category: 'aesthetic', short: '웃을 때 잇몸이 과도하게 보이는 상태', desc: '거미 스마일은 웃을 때 윗잇몸이 3mm 이상 노출되어 잇몸이 과도하게 보이는 상태입니다. 잇몸 성형(치관연장술), 보톡스, 교정 등으로 개선할 수 있으며 원인에 따라 치료법이 달라집니다.', related: ['gum-contouring', 'smile-design', 'laminate'], treatmentLink: 'aesthetic' },
  { id: 'composite-veneer', term: '레진 비니어', termEn: 'Composite Veneer', category: 'aesthetic', short: '레진으로 만드는 간편한 심미 비니어', desc: '레진 비니어는 라미네이트(세라믹 비니어)와 유사하지만, 레진 소재를 치아에 직접 쌓아 만드는 방식입니다. 당일 완성, 적은 삭제량, 낮은 비용이 장점이나, 세라믹보다 변색 가능성이 있어 정기적 관리가 필요합니다.', related: ['laminate', 'bonding', 'resin'], treatmentLink: 'aesthetic' },
  { id: 'dental-jewel', term: '치아 보석', termEn: 'Dental Jewel / Tooth Gem', category: 'aesthetic', short: '치아 표면에 부착하는 작은 장식', desc: '치아 보석은 치아 표면에 특수 접착제로 부착하는 작은 크리스탈이나 보석입니다. 치아 삭제 없이 접착하며, 원할 때 제거 가능합니다. 패션 목적으로 젊은 층에게 인기가 있습니다.', related: ['bonding', 'aesthetic'], treatmentLink: 'aesthetic' },
  { id: 'home-bleaching', term: '홈 블리칭', termEn: 'Home Bleaching', category: 'aesthetic', short: '맞춤 트레이로 가정에서 하는 치아 미백', desc: '홈 블리칭은 치과에서 개인 맞춤 트레이를 제작받아, 집에서 미백 젤을 넣어 착용하는 방식입니다. 보통 2~4주 동안 매일 30분~수시간 착용합니다. 오피스 블리칭보다 점진적이지만, 효과가 오래 지속되는 편입니다.', related: ['bleaching', 'tooth-color'], treatmentLink: 'aesthetic' },
  { id: 'office-bleaching', term: '오피스 블리칭', termEn: 'Office Bleaching / In-office Whitening', category: 'aesthetic', short: '병원에서 고농도 약제로 시행하는 즉시 미백', desc: '오피스 블리칭은 치과에서 고농도 과산화수소 미백제와 특수 광선(LED, 레이저)을 사용하여 1~2시간 내에 즉각적인 미백 효과를 얻는 시술입니다. 바쁜 분들에게 적합하지만, 일시적 시림 증상이 나타날 수 있습니다.', related: ['bleaching', 'laser', 'tooth-color'], treatmentLink: 'aesthetic' },

  // ========== 추가 일반/예방 (8개) ==========
  { id: 'waterpik', term: '구강세정기', termEn: 'Water Flosser / Waterpik', category: 'general', short: '물줄기로 치아 사이를 세정하는 장치', desc: '구강세정기는 고압 물줄기를 이용하여 치아 사이, 잇몸 경계, 교정 장치 주변의 음식물 잔사와 치태를 제거하는 장치입니다. 치실 대체가 아닌 보완적 사용이 권장되며, 임플란트 관리에도 유용합니다.', related: ['floss', 'interdental-brush', 'implant-maintenance'], treatmentLink: 'general' },
  { id: 'tongue-cleaner', term: '혀 클리너', termEn: 'Tongue Cleaner / Tongue Scraper', category: 'general', short: '혀 위의 백태를 제거하는 구강 위생 도구', desc: '혀 클리너는 혀 표면에 쌓인 백태(세균, 음식 잔사, 죽은 세포)를 긁어내는 도구입니다. 구취 감소에 매우 효과적이며, 칫솔질 후 마무리로 사용하면 구강 위생을 한층 더 향상시킵니다.', related: ['halitosis', 'brushing'], treatmentLink: 'general' },
  { id: 'xerostomia', term: '구강건조증', termEn: 'Xerostomia / Dry Mouth', category: 'general', short: '침이 적게 분비되어 입안이 마르는 증상', desc: '구강건조증은 타액 분비가 줄어 입안이 마르는 증상입니다. 약물 부작용, 방사선 치료, 자가면역질환, 노화 등이 원인입니다. 충치와 잇몸병 위험이 높아지므로, 충분한 수분 섭취, 타액 대체제, 불소 도포 등으로 관리합니다.', related: ['cavity', 'fluoride', 'halitosis'], treatmentLink: 'general' },
  { id: 'oral-cancer-screening', term: '구강암 검진', termEn: 'Oral Cancer Screening', category: 'general', short: '구강 내 암이나 전암 병변을 조기 발견하는 검사', desc: '구강암 검진은 입술, 혀, 잇몸, 구강 바닥, 입천장 등에 발생할 수 있는 암이나 전암 병변을 시각적·촉진적으로 검사하는 것입니다. 2주 이상 낫지 않는 구내 궤양, 흰색/붉은색 반점은 반드시 검진받아야 합니다.', related: ['dental-checkup'], treatmentLink: 'general' },
  { id: 'stomatitis', term: '구내염', termEn: 'Stomatitis / Canker Sore', category: 'general', short: '입안 점막에 발생하는 통증성 궤양', desc: '구내염(아프타성 궤양)은 입안 점막에 흰색 또는 노란색의 통증성 궤양이 생기는 질환입니다. 스트레스, 피로, 면역력 저하, 비타민 결핍 등이 원인이며, 보통 1~2주 내에 자연 치유됩니다. 레이저 치료로 통증을 줄일 수 있습니다.', related: ['laser', 'dental-checkup'], treatmentLink: 'general' },
  { id: 'night-guard', term: '나이트가드', termEn: 'Night Guard', category: 'general', short: '수면 중 이갈이로부터 치아를 보호하는 마우스피스', desc: '나이트가드는 야간에 착용하는 맞춤형 마우스피스로, 이갈이(브럭시즘)로 인한 치아 마모, 파절, 턱관절 통증을 예방합니다. 치과에서 본인 치아에 맞게 제작하면 착용감이 좋고 보호력이 높습니다.', related: ['mouthguard', 'bruxism', 'tmj'], treatmentLink: 'general' },
  { id: 'electric-toothbrush', term: '전동칫솔', termEn: 'Electric Toothbrush', category: 'general', short: '모터로 칫솔모를 진동/회전시키는 칫솔', desc: '전동칫솔은 모터에 의해 칫솔모가 진동하거나 회전하여 수동 칫솔보다 효율적으로 치태를 제거합니다. 특히 손 움직임이 자유롭지 않은 어린이, 노인, 장애인에게 유용하며, 과도한 압력 방지 기능이 있어 잇몸 보호에도 도움됩니다.', related: ['brushing', 'plaque', 'gum-recession'], treatmentLink: 'general' },
  { id: 'dental-phobia', term: '치과 공포증', termEn: 'Dental Phobia / Dental Anxiety', category: 'general', short: '치과 치료에 대한 극도의 불안과 공포', desc: '치과 공포증은 치과 방문 자체를 극도로 두려워하는 상태입니다. 어린 시절 부정적 경험, 통증에 대한 공포 등이 원인입니다. 수면치료(진정법), 단계적 둔감화, 친절한 설명과 소통으로 극복할 수 있습니다.', related: ['sedation', 'local-anesthesia'], treatmentLink: 'general' },

  // ========== 추가 구강해부 (7개) ==========
  { id: 'incisor', term: '앞니(절치)', termEn: 'Incisor', category: 'anatomy', short: '입 앞쪽에 위치한 납작한 치아', desc: '앞니(절치)는 위아래 각 4개씩 총 8개로, 음식을 자르는 역할을 합니다. 심미적으로 가장 중요한 치아이며, 라미네이트, 본딩 등 심미 치료가 가장 많이 이루어지는 부위입니다.', related: ['canine', 'laminate', 'bonding'], treatmentLink: 'aesthetic' },
  { id: 'periodontal-tissue', term: '치주조직', termEn: 'Periodontium', category: 'anatomy', short: '치아를 지지하는 주변 조직의 총칭', desc: '치주조직(치주)은 치아를 둘러싸고 지지하는 조직의 총칭으로, 치은(잇몸), 치주인대, 백악질, 치조골의 4가지로 구성됩니다. 이 조직이 손상되면 치아가 흔들리게 되므로, 치주 건강 관리가 매우 중요합니다.', related: ['gingiva', 'pdl', 'cementum', 'alveolar-bone'], treatmentLink: 'general' },
  { id: 'dental-nerve', term: '하치조신경', termEn: 'Inferior Alveolar Nerve', category: 'anatomy', short: '아래턱의 감각을 담당하는 주요 신경', desc: '하치조신경은 아래턱뼈 속을 지나가는 중요한 신경으로, 아랫입술과 아래 치아의 감각을 담당합니다. 임플란트 식립이나 사랑니 발치 시 이 신경의 위치를 정확히 파악하여 손상을 방지해야 합니다.', related: ['mandible', 'implant', 'wisdom-tooth', 'cbct'], treatmentLink: 'implant' },
  { id: 'tmj-anatomy', term: '턱관절', termEn: 'Temporomandibular Joint', category: 'anatomy', short: '아래턱과 두개골을 연결하는 관절', desc: '턱관절(측두하악관절)은 귀 앞에 위치하며 아래턱뼈와 측두골을 연결하는 관절입니다. 입을 벌리고 닫는 모든 동작에 관여하며, 관절원판(디스크)이 뼈 사이에서 충격을 흡수합니다. 매일 수천 번 사용되는 인체에서 가장 바쁜 관절 중 하나입니다.', related: ['tmj', 'mandible', 'bruxism'], treatmentLink: 'general' },
  { id: 'palate', term: '구개(입천장)', termEn: 'Palate', category: 'anatomy', short: '입안의 천장 부분', desc: '구개(입천장)는 경구개(딱딱한 부분)와 연구개(부드러운 뒷부분)로 나뉩니다. 경구개는 뼈로 이루어져 있고, 연구개는 삼킴과 발음에 관여합니다. 잇몸 이식 시 조직 채취 부위로도 사용됩니다.', related: ['expansion', 'gum-graft'], treatmentLink: 'general' },
  { id: 'dental-formula', term: '치식', termEn: 'Dental Formula', category: 'anatomy', short: '치아의 종류와 개수를 나타내는 공식', desc: '치식은 치아의 배열을 숫자로 표현하는 공식입니다. 성인 영구치는 2-1-2-3/2-1-2-3(절치 2, 송곳니 1, 소구치 2, 대구치 3)으로 총 32개입니다. 유치는 2-1-0-2/2-1-0-2로 총 20개입니다.', related: ['incisor', 'canine', 'premolar', 'molar'], treatmentLink: 'general' },
  { id: 'frenum', term: '소대', termEn: 'Frenum / Frenulum', category: 'anatomy', short: '입술이나 혀를 잇몸에 연결하는 주름', desc: '소대는 입술이나 혀를 잇몸에 연결하는 점막 주름입니다. 상순소대(윗입술), 하순소대(아랫입술), 설소대(혀 밑) 등이 있으며, 소대가 너무 짧거나 두꺼우면 잇몸 퇴축, 치간 이개, 혀 움직임 제한 등을 유발할 수 있습니다.', related: ['tongue-tie', 'diastema', 'gum-recession'], treatmentLink: 'general' },

  // ========== 추가 구강외과 (6개) ==========
  { id: 'jaw-fracture', term: '턱 골절', termEn: 'Jaw Fracture', category: 'surgery', short: '외상으로 턱뼈가 부러진 상태', desc: '턱 골절은 교통사고, 낙상, 스포츠 외상 등으로 위턱이나 아래턱 뼈가 부러진 상태입니다. 교합 이상, 통증, 부종 등이 나타나며, 경중에 따라 고정(악간고정)이나 수술적 정복이 필요합니다.', related: ['mandible', 'maxilla', 'orthognathic-surgery'], treatmentLink: 'general' },
  { id: 'biopsy', term: '조직검사', termEn: 'Biopsy', category: 'surgery', short: '구강 내 조직을 채취하여 병리적으로 검사하는 것', desc: '조직검사는 구강 내 의심스러운 병변(혹, 궤양, 변색)에서 조직 일부를 채취하여 현미경으로 관찰하는 검사입니다. 구강암이나 전암 병변을 확진하는 데 필수적이며, 국소마취 하에 시행됩니다.', related: ['oral-cancer-screening', 'cyst'], treatmentLink: 'general' },
  { id: 'alveoloplasty', term: '치조골 성형', termEn: 'Alveoloplasty', category: 'surgery', short: '발치 후 울퉁불퉁한 잇몸뼈를 다듬는 수술', desc: '치조골 성형은 다수의 치아를 발치한 후 울퉁불퉁해진 치조골을 매끄럽게 다듬는 수술입니다. 틀니나 임플란트를 위한 좋은 기반을 만들기 위해 시행합니다.', related: ['extraction', 'denture', 'implant'], treatmentLink: 'general' },
  { id: 'tooth-avulsion', term: '치아 탈구', termEn: 'Tooth Avulsion', category: 'surgery', short: '외상으로 치아가 통째로 빠진 상태', desc: '치아 탈구는 외상에 의해 치아가 치조골에서 완전히 빠져나온 응급 상황입니다. 빠진 치아를 우유나 식염수에 담아 가능한 빨리(30분 이내) 치과를 방문하면 재식립 성공률이 높아집니다. 치근 표면의 세포를 건조시키면 안 됩니다.', related: ['extraction', 'tooth-transplant'], treatmentLink: 'general' },
  { id: 'frenectomy', term: '소대 절제술', termEn: 'Frenectomy', category: 'surgery', short: '너무 짧거나 두꺼운 소대를 절제하는 수술', desc: '소대 절제술은 입술소대나 설소대가 비정상적으로 짧아 기능적 문제를 일으킬 때 시행하는 간단한 수술입니다. 레이저로 시행하면 출혈이 적고 회복이 빠릅니다.', related: ['frenum', 'tongue-tie', 'diastema'], treatmentLink: 'general' },
  { id: 'abscess', term: '치근단 농양', termEn: 'Periapical Abscess', category: 'surgery', short: '치아 뿌리 끝에 고름이 찬 감염', desc: '치근단 농양은 치아 신경이 괴사한 후 뿌리 끝에 세균 감염으로 고름이 찬 상태입니다. 심한 통증, 얼굴 부종을 유발합니다. 신경치료나 발치로 원인을 제거하고, 항생제 치료를 병행합니다.', related: ['root-canal', 'apicoectomy', 'extraction'], treatmentLink: 'preservation' },

  // ========== 추가 보철 (7개) ==========
  { id: 'maryland-bridge', term: '메릴랜드 브릿지', termEn: 'Maryland Bridge', category: 'prostho', short: '인접 치아를 최소 삭제하는 접착형 브릿지', desc: '메릴랜드 브릿지는 인접 치아의 뒤쪽만 최소한으로 삭제하고, 금속 또는 세라믹 날개를 접착하여 고정하는 보존적 브릿지입니다. 앞니 1개 상실 시 인접 치아 손상을 최소화하며 적용됩니다.', related: ['bridge', 'crown', 'pontic'], treatmentLink: 'preservation' },
  { id: 'telescopic-denture', term: '텔레스코프 의치', termEn: 'Telescopic Denture', category: 'prostho', short: '이중관 시스템으로 고정하는 정밀 틀니', desc: '텔레스코프 의치는 남은 치아에 내관(1차관)을 씌우고, 틀니에 부착된 외관(2차관)이 내관 위에 끼워져 고정되는 정밀 착탈식 틀니입니다. 일반 틀니보다 안정적이고, 심미적이며, 유지력이 뛰어납니다.', related: ['denture', 'crown', 'overdenture'], treatmentLink: 'general' },
  { id: 'implant-crown', term: '임플란트 크라운', termEn: 'Implant Crown', category: 'prostho', short: '임플란트 위에 장착하는 인공 치아 부분', desc: '임플란트 크라운은 픽스처(인공 뿌리)와 어버트먼트 위에 장착되는 최종 인공 치아입니다. 지르코니아, e.max 등의 재질로 제작되며, 자연 치아와 동일한 형태와 기능을 합니다.', related: ['implant', 'abutment', 'zirconia', 'crown'], treatmentLink: 'implant' },
  { id: 'digital-impression', term: '디지털 인상', termEn: 'Digital Impression', category: 'prostho', short: '구강 스캐너로 치아 모형을 디지털 채득', desc: '디지털 인상은 구강 스캐너로 치아를 스캔하여 3D 디지털 모형을 만드는 것으로, 기존 실리콘 본뜨기의 불편함을 해소합니다. CAD/CAM과 연동하여 즉시 보철물 설계가 가능하며, 오차가 적고 환자 만족도가 높습니다.', related: ['oral-scanner', 'impression', 'cad-cam'], treatmentLink: 'general' },
  { id: 'splint', term: '스플린트', termEn: 'Splint', category: 'prostho', short: '흔들리는 치아를 연결 고정하거나 턱관절을 안정시키는 장치', desc: '스플린트는 두 가지 용도로 사용됩니다: (1) 치주염으로 흔들리는 치아를 인접 치아와 연결하여 고정하는 치주 스플린트, (2) 턱관절 장애 시 교합을 안정시키는 교합 스플린트(교합안정장치). 용도에 따라 형태와 재질이 다릅니다.', related: ['periodontal-disease', 'tmj', 'bruxism'], treatmentLink: 'general' },
  { id: 'bite-adjustment', term: '교합 조정', termEn: 'Occlusal Adjustment', category: 'prostho', short: '교합의 균형을 맞추기 위해 치아를 미세 삭제', desc: '교합 조정은 특정 치아에 과도한 힘이 집중되는 것을 방지하기 위해 치아의 교합면을 미세하게 삭제하여 교합력을 균등하게 분산시키는 시술입니다. 보철물 장착 후, 교정 후, 턱관절 치료 시 자주 시행됩니다.', related: ['occlusion', 'crown', 'tmj'], treatmentLink: 'general' },
  { id: 'reline', term: '이장(리라인)', termEn: 'Denture Reline', category: 'prostho', short: '틀니 안쪽을 재적합시키는 시술', desc: '이장(리라인)은 뼈와 잇몸의 형태가 변하여 틀니가 잘 맞지 않을 때, 틀니 안쪽에 새 재료를 덧붙여 재적합시키는 시술입니다. 틀니를 새로 만들지 않고도 착용감과 유지력을 회복할 수 있습니다.', related: ['denture', 'overdenture'], treatmentLink: 'general' },

  // ========== 추가 잇몸/치주 (5개) ==========
  { id: 'flap-surgery', term: '치주 판막 수술', termEn: 'Flap Surgery', category: 'perio', short: '잇몸을 열어 깊은 치석과 감염 조직을 제거하는 수술', desc: '치주 판막 수술은 심한 치주염에서 스케일링과 치근 활택술만으로 치료가 충분하지 않을 때, 잇몸을 절개하여 열고(판막) 직접 시야 하에 치석과 감염 조직을 철저히 제거하는 수술입니다. 골이식을 동시에 시행하기도 합니다.', related: ['periodontal-disease', 'root-planing', 'bone-graft'], treatmentLink: 'general' },
  { id: 'crown-lengthening', term: '치관연장술', termEn: 'Crown Lengthening', category: 'perio', short: '잇몸이나 뼈를 다듬어 치아 노출 부분을 늘리는 수술', desc: '치관연장술은 치아가 잇몸 아래에 너무 깊이 파괴된 경우, 잇몸과 뼈를 적절히 다듬어 건전한 치아 구조를 노출시키는 수술입니다. 크라운을 안정적으로 장착하기 위한 목적이나, 거미 스마일 개선 목적으로도 시행됩니다.', related: ['gummy-smile', 'crown', 'gum-contouring'], treatmentLink: 'aesthetic' },
  { id: 'guided-tissue-regen', term: '조직유도재생술', termEn: 'Guided Tissue Regeneration', category: 'perio', short: '치주 조직의 재생을 유도하는 수술적 치료', desc: '조직유도재생술(GTR)은 차폐막을 사용하여 파괴된 치주 조직(뼈, 치주인대, 백악질)이 선택적으로 재생되도록 유도하는 수술입니다. GBR(골유도재생술)과 원리가 유사하지만, 치주 조직 전체의 재생을 목표로 합니다.', related: ['gbr', 'periodontal-disease', 'membrane', 'flap-surgery'], treatmentLink: 'general' },
  { id: 'mobility', term: '치아 동요도', termEn: 'Tooth Mobility', category: 'perio', short: '치아가 흔들리는 정도', desc: '치아 동요도는 치아가 흔들리는 정도를 나타내며, 0~3도로 분류합니다. 1도(미세 움직임), 2도(1mm 이상 좌우), 3도(수직·수평 모두 움직임). 치주염, 외상, 교합 과부하 등이 원인이며, 동요도가 높으면 치아 보존이 어려울 수 있습니다.', related: ['periodontal-disease', 'alveolar-bone', 'splint'], treatmentLink: 'general' },
  { id: 'probing', term: '치주낭 탐침', termEn: 'Periodontal Probing', category: 'perio', short: '치주낭 깊이를 측정하는 검사', desc: '치주낭 탐침은 눈금이 새겨진 가느다란 기구(치주탐침)로 치아와 잇몸 사이의 깊이를 측정하는 검사입니다. 정상은 1~3mm이며, 4mm 이상이면 치주질환을 의심합니다. 6곳(치아당)을 측정하여 치주 상태를 전체적으로 평가합니다.', related: ['periodontal-pocket', 'periodontal-disease', 'dental-checkup'], treatmentLink: 'general' },

  // ========== 추가 소아/예방 (5개) ==========
  { id: 'thumb-sucking', term: '손가락 빨기', termEn: 'Thumb Sucking', category: 'pediatric', short: '유아기 이후에도 지속되는 손가락 빨기 습관', desc: '손가락 빨기는 4~5세 이후에도 지속되면 앞니 돌출, 개방교합, 위턱 좁아짐 등의 교합 문제를 유발할 수 있습니다. 습관 제거 장치(habit breaker)나 행동 수정 요법으로 개선합니다.', related: ['open-bite', 'malocclusion', 'orthodontics'], treatmentLink: 'orthodontics' },
  { id: 'pit-fissure', term: '열구(소와)', termEn: 'Pit and Fissure', category: 'pediatric', short: '어금니 씹는 면의 좁고 깊은 홈', desc: '열구(소와)는 어금니의 씹는 면에 있는 좁고 깊은 홈으로, 칫솔모가 닿기 어려워 음식물과 세균이 쉽게 끼입니다. 이 부분에서 충치가 가장 많이 시작되며, 실란트로 예방하는 것이 효과적입니다.', related: ['sealant', 'molar', 'cavity'], treatmentLink: 'general' },
  { id: 'mixed-dentition', term: '혼합 치열기', termEn: 'Mixed Dentition', category: 'pediatric', short: '유치와 영구치가 함께 존재하는 시기', desc: '혼합 치열기는 약 6~12세 사이에 유치가 빠지고 영구치가 나오면서 두 종류의 치아가 공존하는 시기입니다. 이 시기에 충치 관리, 교합 관찰, 간격 유지가 특히 중요하며, 교정 검진을 처음 받기에 적합한 시기입니다.', related: ['baby-tooth', 'permanent-tooth', 'space-maintainer', 'orthodontics'], treatmentLink: 'general' },
  { id: 'nursing-caries', term: '우유병 충치', termEn: 'Nursing Caries / Baby Bottle Caries', category: 'pediatric', short: '젖병이나 수유로 인한 유아기 충치', desc: '우유병 충치는 젖병에 우유나 음료를 담아 물고 잠드는 습관으로 발생하는 유아의 심한 충치입니다. 위 앞니에 먼저 발생하며, 빠르게 진행됩니다. 수유 후 거즈로 닦아주고, 밤중 수유를 줄이는 것이 예방법입니다.', related: ['baby-tooth', 'cavity', 'fluoride'], treatmentLink: 'general' },
  { id: 'supernumerary-tooth', term: '과잉치', termEn: 'Supernumerary Tooth', category: 'pediatric', short: '정상보다 많은 여분의 치아', desc: '과잉치는 정상 치아 개수보다 추가로 형성된 여분의 치아입니다. 가장 흔한 위치는 위 앞니 사이(정중 과잉치)이며, 영구치 맹출을 방해하거나 치아 배열을 뒤틀리게 할 수 있어 발치가 필요한 경우가 많습니다.', related: ['extraction', 'impacted-tooth', 'dental-formula'], treatmentLink: 'general' },

  // ========== 추가 장비/기술 (5개) ==========
  { id: '3d-printing', term: '치과 3D 프린팅', termEn: 'Dental 3D Printing', category: 'equipment', short: '3D 프린터로 치과 보조물을 제작하는 기술', desc: '치과 3D 프린팅은 디지털 설계 데이터를 기반으로 수술 가이드, 임시 크라운, 교정 모형, 의치상 등을 빠르고 정밀하게 제작하는 기술입니다. 제작 시간을 크게 단축하고 맞춤형 제작의 정밀도를 높입니다.', related: ['digital-dentistry', 'guided-surgery', 'cad-cam'], treatmentLink: 'general' },
  { id: 'electrosurgery', term: '전기수술기', termEn: 'Electrosurgery', category: 'equipment', short: '전기를 이용한 연조직 절개 및 응고 장비', desc: '전기수술기는 고주파 전류를 사용하여 잇몸 등 연조직을 절개하거나 출혈을 멈추게 하는 장비입니다. 잇몸 성형, 크라운 마진 노출, 잇몸 절제 등에 사용되며, 정밀한 조직 조절이 가능합니다.', related: ['gum-contouring', 'laser'], treatmentLink: 'general' },
  { id: 'apex-locator', term: '근관장 측정기', termEn: 'Apex Locator', category: 'equipment', short: '치아 뿌리의 길이를 전자적으로 측정하는 장비', desc: '근관장 측정기는 신경치료 시 치아 뿌리 끝(치근단)까지의 거리를 전기 저항값으로 정확히 측정하는 장비입니다. 엑스레이보다 정확하고 실시간 측정이 가능하여, 근관치료의 성공률을 높이는 데 필수적입니다.', related: ['root-canal', 'endodontics', 'microscope-treatment'], treatmentLink: 'preservation' },
  { id: 'air-abrasion', term: '에어 어브레이전', termEn: 'Air Abrasion', category: 'equipment', short: '미세 입자를 분사하여 충치를 제거하는 기술', desc: '에어 어브레이전은 산화알루미나 등의 미세 입자를 고속으로 분사하여 충치 부분을 제거하는 최소침습 기술입니다. 드릴을 사용하지 않아 진동과 소음이 없고, 건전한 치아 조직을 최대한 보존할 수 있습니다.', related: ['cavity', 'filling', 'resin'], treatmentLink: 'preservation' },
  { id: 'curing-light', term: '광조사기', termEn: 'Curing Light', category: 'equipment', short: '레진 등 광경화성 재료를 굳히는 LED 장비', desc: '광조사기는 특정 파장(450~490nm)의 LED 빛을 발생시켜 레진, 본딩제, 실란트 등 광경화성 치과 재료를 경화(굳히는) 시키는 장비입니다. 충전 시술의 필수 장비이며, 빛의 강도에 따라 경화 시간이 달라집니다.', related: ['resin', 'filling', 'sealant', 'bonding'], treatmentLink: 'preservation' },

  // ========== 추가 보험/제도 (5개) ==========
  { id: 'dental-insurance-claim', term: '치과 보험 청구', termEn: 'Dental Insurance Claim', category: 'insurance', short: '건강보험 적용 치료비의 심사 및 청구 과정', desc: '치과 보험 청구는 건강보험 적용 치료를 받은 후, 치과에서 건강보험공단에 치료 내역과 비용을 청구하는 과정입니다. 환자는 본인부담금만 납부하고, 나머지는 공단이 부담합니다.', related: ['insurance-scaling', 'non-covered'], treatmentLink: 'general' },
  { id: 'senior-denture', term: '노인 틀니 보험', termEn: 'Senior Denture Insurance', category: 'insurance', short: '만 65세 이상 건강보험 적용 틀니', desc: '만 65세 이상 건강보험 가입자는 7년에 1회 틀니를 건강보험 적용 가격으로 제작할 수 있습니다. 완전 틀니와 부분 틀니 모두 적용되며, 본인부담률은 30%입니다.', related: ['denture', 'senior-implant'], treatmentLink: 'general' },
  { id: 'dental-cert', term: '진단서·소견서', termEn: 'Dental Certificate / Medical Opinion', category: 'insurance', short: '치과 진단 결과를 공식 문서로 발급', desc: '진단서·소견서는 치과 질환의 진단명, 치료 내용, 향후 치료 계획 등을 기재한 공식 의료 문서입니다. 보험 청구, 산재 신청, 법적 증빙, 학교·직장 제출 등에 필요합니다.', related: ['dental-insurance-claim'], treatmentLink: 'general' },
  { id: 'emergency-dental', term: '응급 치과 치료', termEn: 'Emergency Dental Treatment', category: 'insurance', short: '긴급한 치과 증상에 대한 즉시 처치', desc: '응급 치과 치료는 극심한 치통, 치아 외상(탈구, 파절), 감염으로 인한 부종 등 즉각적인 처치가 필요한 상황에서 시행됩니다. 야간·주말에는 가까운 응급실이나 야간 운영 치과를 방문해야 합니다.', related: ['tooth-avulsion', 'abscess', 'tooth-fracture'], treatmentLink: 'general' },
  { id: 'informed-consent', term: '설명 및 동의', termEn: 'Informed Consent', category: 'insurance', short: '치료 전 환자에게 충분한 설명 후 동의를 받는 절차', desc: '설명 및 동의(인폼드 컨센트)는 치료 시작 전에 시술 방법, 예상 결과, 위험성, 대안 등을 환자에게 충분히 설명하고, 서면으로 동의를 받는 법적·윤리적 절차입니다. 모든 침습적 시술에 필요합니다.', related: ['specialist'], treatmentLink: 'general' },
];

// 용어 수 확인용
export const TOTAL_TERMS = terms.length;

// ===========================
// 백과사전 목록 페이지
// ===========================
export function encyclopediaListPage(): string {
  const catCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: terms.filter(t => t.category === cat.id).length
  }));

  // JSON-LD: DefinedTermSet
  const termSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "행복한예인치과 치과 용어 백과사전",
    "description": `${TOTAL_TERMS}개 이상의 치과 용어를 쉽게 설명합니다`,
    "url": "https://happyyein.kr/encyclopedia",
    "inDefinedTermSet": terms.slice(0, 50).map(t => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.short,
      "url": `https://happyyein.kr/encyclopedia/${t.id}`
    }))
  };

  const faqData = [
    { q: '치과 백과사전은 누가 작성했나요?', a: '행복한예인치과의 보건복지부 인증 전문의 3명(통합치의학, 보존과, 교정과)이 감수한 내용입니다. 정확하고 이해하기 쉬운 용어 설명을 제공합니다.' },
    { q: '용어를 검색할 수 있나요?', a: '네, 페이지 상단의 검색창에서 한글 또는 영문으로 검색하실 수 있습니다. 카테고리별 필터도 제공합니다.' },
    { q: '진료 상담 시 이 용어들을 참고할 수 있나요?', a: '물론입니다. 진료 전에 관련 용어를 미리 확인하시면 상담이 더 원활해집니다. 각 용어에서 관련 진료 페이지로 바로 이동할 수도 있습니다.' },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqData.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };

  return `${head({
    title: '치과 백과사전',
    description: `행복한예인치과가 제공하는 ${TOTAL_TERMS}개+ 치과 용어 백과사전. 임플란트, 신경치료, 교정, 심미치료 등 모든 치과 용어를 쉽게 설명합니다. 시청역·명동·을지로 치과 02-756-2828`,
    path: '/encyclopedia',
    keywords: '치과 용어, 치과 백과사전, 임플란트 뜻, 신경치료 뜻, 크라운 뜻, 치과 용어 사전, 치과 용어 설명, 행복한예인치과',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '치과 백과사전', url: '/encyclopedia' }],
    jsonLd: [termSetSchema, faqSchema]
  })}
${nav('encyclopedia')}

<section class="sub-hero">
  <div class="sub-hero-bg">
    <div style="width:100%;height:100%;background:linear-gradient(135deg,var(--black) 0%,#1a1510 100%);"></div>
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">Encyclopedia</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag">Dental Encyclopedia</div>
    <h1>치과 <em>백과사전</em></h1>
    <p class="sub-hero-desc">${TOTAL_TERMS}개 이상의 치과 용어를 전문의가 쉽게 설명합니다.</p>
  </div>
</section>

<!-- 검색 & 필터 -->
<section class="page-section bg-black" style="padding-top:60px;padding-bottom:40px;">
  <div class="page-inner">
    <div class="enc-search-wrap rv">
      <i class="fas fa-search enc-search-icon"></i>
      <input type="text" id="encSearch" class="enc-search" placeholder="용어 검색 (한글 또는 영문)..." oninput="filterTerms()">
      <span id="encCount" class="enc-count">${TOTAL_TERMS}개</span>
    </div>
    <div class="enc-cats rv rv-d1" id="encCats">
      <button class="enc-cat-btn active" onclick="filterCat('all',this)">전체 <span>${TOTAL_TERMS}</span></button>
      ${catCounts.map(c => `<button class="enc-cat-btn" onclick="filterCat('${c.id}',this)"><i class="${c.icon}"></i> ${c.label} <span>${c.count}</span></button>`).join('')}
    </div>
  </div>
</section>

<!-- 용어 목록 -->
<section class="page-section bg-dark" style="padding-top:20px;">
  <div class="page-inner">
    <div class="enc-grid" id="encGrid">
      ${terms.map(t => `
      <a href="/encyclopedia/${t.id}" class="enc-card rv" data-cat="${t.category}" data-term="${t.term}" data-en="${(t.termEn || '').toLowerCase()}" data-short="${t.short}">
        <div class="enc-card-cat"><i class="${CATEGORIES.find(c => c.id === t.category)?.icon || 'fas fa-tooth'}"></i> ${CATEGORIES.find(c => c.id === t.category)?.label || ''}</div>
        <h3>${t.term}${t.termEn ? ` <small>${t.termEn}</small>` : ''}</h3>
        <p>${t.short}</p>
        ${t.treatmentLink ? `<span class="enc-card-link"><i class="fas fa-arrow-right"></i> 관련 진료</span>` : ''}
      </a>`).join('')}
    </div>
    <div id="encEmpty" class="enc-empty" style="display:none;">
      <i class="fas fa-search" style="font-size:3rem;color:var(--gray);margin-bottom:20px;"></i>
      <p>검색 결과가 없습니다.</p>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq sec-pad" style="background:var(--black-warm);">
  <div class="sec-inner">
    <div class="sec-label">FAQ</div>
    <h2 class="sec-title rv">백과사전 <em>FAQ</em></h2>
    <div class="faq-list">
      ${faqData.map((f, i) => `
      <div class="faq-item rv" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <div class="faq-q" role="button" tabindex="0" aria-expanded="false" aria-controls="enc-faq-${i}" onclick="var o=this.classList.toggle('open');this.nextElementSibling.classList.toggle('open');this.setAttribute('aria-expanded',o);" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <h4 itemprop="name">${f.q}</h4>
          <i class="fas fa-chevron-down" aria-hidden="true"></i>
        </div>
        <div class="faq-a" id="enc-faq-${i}" role="region" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text">${f.a}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${footer()}
<script>
let currentCat = 'all';
function filterTerms() {
  const q = document.getElementById('encSearch').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.enc-card');
  let count = 0;
  cards.forEach(c => {
    const matchCat = currentCat === 'all' || c.dataset.cat === currentCat;
    const matchQ = !q || c.dataset.term.includes(q) || c.dataset.en.includes(q) || c.dataset.short.includes(q);
    if (matchCat && matchQ) { c.style.display = ''; count++; } else { c.style.display = 'none'; }
  });
  document.getElementById('encCount').textContent = count + '개';
  document.getElementById('encEmpty').style.display = count === 0 ? '' : 'none';
}
function filterCat(cat, btn) {
  currentCat = cat;
  document.querySelectorAll('.enc-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterTerms();
}
</script>
${scripts()}`;
}

// ===========================
// 백과사전 상세 페이지
// ===========================
export function encyclopediaDetailPage(id: string): string | null {
  const t = terms.find(x => x.id === id);
  if (!t) return null;

  const cat = CATEGORIES.find(c => c.id === t.category);
  const relatedTerms = (t.related || []).map(rid => terms.find(x => x.id === rid)).filter(Boolean) as DentalTerm[];

  // JSON-LD
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": t.term,
    "alternateName": t.termEn || undefined,
    "description": t.short,
    "url": `https://happyyein.kr/encyclopedia/${t.id}`,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "행복한예인치과 치과 백과사전",
      "url": "https://happyyein.kr/encyclopedia"
    }
  };

  return `${head({
    title: `${t.term} (${t.termEn || ''})`,
    description: `${t.term} - ${t.short}. 행복한예인치과 치과 백과사전. 시청역·명동·을지로 치과 전문의가 쉽게 설명합니다.`,
    path: `/encyclopedia/${t.id}`,
    keywords: `${t.term}, ${t.termEn || ''}, ${t.term} 뜻, ${t.term} 의미, 치과 용어, 행복한예인치과`,
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '치과 백과사전', url: '/encyclopedia' }, { name: t.term, url: `/encyclopedia/${t.id}` }],
    jsonLd: [termSchema]
  })}
${nav('encyclopedia')}

<section class="sub-hero" style="min-height:40vh;">
  <div class="sub-hero-bg">
    <div style="width:100%;height:100%;background:linear-gradient(135deg,var(--black) 0%,#1a1510 100%);"></div>
    <div class="sub-hero-overlay"></div>
  </div>
  <div class="sub-hero-breadcrumb">
    <a href="/">Home</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <a href="/encyclopedia">Encyclopedia</a>
    <span class="sep"><i class="fas fa-chevron-right"></i></span>
    <span style="color:var(--gold)">${t.term}</span>
  </div>
  <div class="sub-hero-content">
    <div class="sub-hero-tag"><i class="${cat?.icon || 'fas fa-tooth'}"></i> ${cat?.label || ''}</div>
    <h1>${t.term}</h1>
    ${t.termEn ? `<p class="sub-hero-desc" style="font-family:var(--font-display);letter-spacing:2px;text-transform:uppercase;font-size:0.9rem;">${t.termEn}</p>` : ''}
  </div>
</section>

<section class="page-section bg-white" style="color:var(--black);">
  <div class="page-inner" style="max-width:800px;">
    <div class="enc-detail-short rv">
      <i class="fas fa-lightbulb" style="color:var(--gold-deep);"></i>
      <p>${t.short}</p>
    </div>
    <div class="enc-detail-desc rv rv-d1">
      <h2 style="font-family:var(--font-kr);font-size:1.5rem;font-weight:700;margin-bottom:20px;">상세 설명</h2>
      <p style="font-family:var(--font-kr);font-size:1rem;line-height:2.2;color:var(--gray-dark);font-weight:300;">${t.desc}</p>
    </div>
    ${t.treatmentLink ? `
    <div class="enc-detail-treat rv rv-d2">
      <a href="/treatments/${t.treatmentLink}" class="btn btn-outline" style="margin-top:20px;"><i class="fas fa-arrow-right"></i> 관련 진료 페이지 보기</a>
    </div>` : ''}
  </div>
</section>

${relatedTerms.length > 0 ? `
<section class="page-section bg-dark">
  <div class="page-inner">
    <div class="sec-label">Related Terms</div>
    <h2 class="sec-title rv">관련 <em>용어</em></h2>
    <div class="enc-grid" style="margin-top:40px;">
      ${relatedTerms.map(rt => `
      <a href="/encyclopedia/${rt.id}" class="enc-card rv" style="display:block;">
        <div class="enc-card-cat"><i class="${CATEGORIES.find(c => c.id === rt.category)?.icon || 'fas fa-tooth'}"></i> ${CATEGORIES.find(c => c.id === rt.category)?.label || ''}</div>
        <h3>${rt.term}${rt.termEn ? ` <small>${rt.termEn}</small>` : ''}</h3>
        <p>${rt.short}</p>
      </a>`).join('')}
    </div>
  </div>
</section>` : ''}

<section class="page-section bg-black" style="text-align:center;padding-top:60px;padding-bottom:60px;">
  <a href="/encyclopedia" class="btn btn-ghost"><i class="fas fa-arrow-left"></i> 백과사전 목록으로</a>
</section>

${footer()}
${scripts()}`;
}
