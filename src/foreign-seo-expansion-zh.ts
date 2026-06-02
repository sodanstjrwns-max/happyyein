// =============================================
// 외국인 SEO 대확장 — CHINESE Pages (Phase F)
// 중국어(간체) 페이지 10개 추가
// 중국인 관광객 · 유학생 타겟 (明洞/首尔站 周边)
// =============================================

import type { ForeignPage } from './foreign-emergency-seo'

const CLINIC_TEL = '+82-2-756-2828'

export const EXPANSION_ZH_PAGES: ForeignPage[] = [

  // ===== 1. 智齿拔除 =====
  {
    slug: 'zh/wisdom-tooth-extraction-seoul',
    lang: 'zh', heroEmoji: '🦷',
    title: '首尔拔智齿｜明洞当天拔牙·比中国便宜｜幸福艺人牙科',
    metaDesc: '在首尔旅游时智齿痛？幸福艺人牙科位于明洞会贤站步行2分钟，当天可拔智齿。CT检查完备，首尔大学专家团队，价格实惠。',
    h1: '智齿拔除 — 首尔明洞当天处理',
    keywords: '首尔拔智齿, 韩国拔智齿费用, 明洞牙科智齿, 首尔牙科外国人, 韩国拔牙',
    introParagraph: `在韩国旅游时<strong>智齿突然疼痛</strong>？<strong>幸福艺人牙科</strong>可以进行CT检查后<strong>当天拔除智齿</strong>。首尔大学口腔外科专家团队，安全高效。位于明洞中心，会贤站1号出口步行2分钟。`,
    sections: [
      { heading: '🔍 这些症状需要拔智齿', content: `<ul>
<li><strong>后牙疼痛</strong> — 智齿发炎的信号</li>
<li><strong>牙龈肿胀</strong> — 智齿冠周炎</li>
<li><strong>张嘴困难</strong> — 感染加重的信号</li>
<li><strong>邻牙被挤压疼痛</strong> — 阻生智齿压迫</li>
</ul>
<p>我们使用<strong>全景X光+CT检查</strong>准确诊断，制定最安全的拔除方案。</p>` },
      { heading: '💰 韩国拔智齿费用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 12px;text-align:left;">费用(韩元)</th><th style="padding:10px 12px;text-align:left;">人民币(约)</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">简单拔除</td><td style="padding:8px 12px;">₩100,000〜200,000</td><td style="padding:8px 12px;">约500〜1,000元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">阻生齿手术拔除</td><td style="padding:8px 12px;">₩200,000〜400,000</td><td style="padding:8px 12px;">约1,000〜2,000元</td></tr>
<tr><td style="padding:8px 12px;">CT检查+问诊</td><td style="padding:8px 12px;">₩50,000〜80,000</td><td style="padding:8px 12px;">约250〜400元</td></tr>
</table>` },
      { heading: '✈️ 拔牙后能坐飞机吗？', content: `<ul>
<li><strong>简单拔除</strong> — 24-48小时后通常可以飞行</li>
<li><strong>手术拔除</strong> — 建议48-72小时后飞行</li>
<li>我们会提供额外的纱布、止痛药和英文术后护理说明</li>
</ul>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口步行2分钟 | 🚇 明洞站步行5分钟</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '当天能拔吗？', a: '是的，CT检查后大多数情况可以当天拔除。非常复杂的病例（靠近神经等）可能需要预约。' },
      { q: '疼吗？', a: '使用局部麻醉，手术中不会感到疼痛。术后2-3天会有轻微不适，处方药可以有效控制。' },
      { q: '能一次拔4颗吗？', a: '同侧2颗可以同时拔除。对于旅游者不建议一次拔4颗（恢复期较长）。' }
    ],
    ctaText: '立即预约拔智齿',
    ctaSubtext: 'CT完备 · 当天拔除 · 无需预约',
    priceRange: '₩100,000 – ₩400,000'
  },

  // ===== 2. 牙齿美白 =====
  {
    slug: 'zh/teeth-whitening-myeongdong',
    lang: 'zh', heroEmoji: '✨',
    title: '明洞牙齿美白｜1小时搞定·K-Beauty体验｜幸福艺人牙科',
    metaDesc: '在明洞做专业牙齿美白！1小时提亮4-8个色号。K-Beauty美牙升级！₩150,000起，免预约，会贤站步行2分钟。幸福艺人牙科。',
    h1: '明洞牙齿美白 — K-Beauty美牙升级',
    keywords: '明洞牙齿美白, 首尔美白牙齿, 韩国牙齿美白便宜, K-Beauty美白, 明洞牙科美白',
    introParagraph: `来韩国体验K-Beauty — <strong>别忘了升级你的笑容</strong>！在<strong>幸福艺人牙科</strong>做专业牙齿美白，只需<strong>1小时</strong>就能提亮4-8个色号。位于明洞K-Beauty中心地带，逛街购物之余轻松变美。免预约，随时来。`,
    sections: [
      { heading: '💎 美白项目', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">⚡ 快速美白</strong> — 30分钟，提亮2-4个色号<br>
时间紧的旅客首选。立竿见影。<br>
<span style="color:#F7BA18;font-weight:700;">₩150,000（约750元人民币）</span>
</div>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">✨ 尊享美白</strong> — 60分钟，提亮4-8个色号<br>
LED激活全效美白，效果最佳。<br>
<span style="color:#F7BA18;font-weight:700;">₩300,000（约1,500元人民币）</span>
</div>
</div>
<p style="margin-top:12px;font-size:0.85rem;color:#aaa;">※ 中国一线城市专业美白价格：2,000-5,000元。韩国便宜一半以上！</p>` },
      { heading: '⏱️ 流程', content: `<ol>
<li><strong>咨询</strong> — 色号评估（10分钟）</li>
<li><strong>清洁</strong> — 去除表面色素（15分钟）</li>
<li><strong>涂抹美白凝胶</strong></li>
<li><strong>LED光照激活</strong> — 15-20分钟×2-3组</li>
<li><strong>完成！</strong> — 查看新色号，拍照发朋友圈！📸</li>
</ol>` },
      { heading: '⚠️ 注意事项', content: `<ul>
<li>术后24-48小时可能有轻微敏感，属于正常现象</li>
<li>48小时内避免深色食物（咖啡、红酒、泡菜汤）</li>
<li>效果维持6-12个月</li>
</ul>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口步行2分钟 | 明洞K-Beauty街区核心位置</p>` }
    ],
    faq: [
      { q: '美白需要多长时间？', a: '快速美白30分钟，尊享美白约1小时。逛明洞的间隙就能搞定！' },
      { q: '韩国美白安全吗？', a: '完全安全。我们使用与国际标准相同的美白剂，由执业牙医操作。比自己买美白贴安全得多。' },
      { q: '美白后能吃烤肉吗？', a: '建议48小时内避免深色食物。白米饭、豆腐、清淡食物没问题。' }
    ],
    ctaText: '获得K-Beauty笑容',
    ctaSubtext: '免预约 · 1小时完成 · ₩150,000起',
    priceRange: '₩150,000 – ₩300,000'
  },

  // ===== 3. 口腔检查 =====
  {
    slug: 'zh/dental-checkup-cleaning-seoul',
    lang: 'zh', heroEmoji: '🔍',
    title: '首尔口腔检查+洁牙｜便宜·快速·英文报告｜幸福艺人牙科',
    metaDesc: '在首尔做口腔检查和专业洁牙，全景X光片包含在内，₩80,000起（约400元）。比国内便宜，英文报告可带回。明洞免预约。幸福艺人牙科。',
    h1: '口腔检查 & 专业洁牙 — 首尔明洞',
    keywords: '首尔口腔检查, 韩国洁牙, 首尔洗牙便宜, 明洞牙科检查, 韩国牙科外国人',
    introParagraph: `聪明的旅行者会利用韩国<strong>超实惠的牙科服务</strong>。在<strong>幸福艺人牙科</strong>做全面口腔检查+专业洁牙，费用只有国内的一半，还能获得<strong>数字X光</strong>和<strong>英文检查报告</strong>。30-45分钟搞定，轻松嵌入你的首尔行程。`,
    sections: [
      { heading: '📋 检查内容', content: `<ul>
<li><strong>口腔综合检查</strong> — 牙齿、牙龈、咬合、颞颌关节</li>
<li><strong>全景X光拍摄</strong> — 全部牙齿的全景视图</li>
<li><strong>龋齿检测</strong> — 早发现早治疗</li>
<li><strong>牙周健康评估</strong></li>
<li><strong>专业洁牙（洗牙）</strong> — 去除牙石和牙菌斑</li>
<li><strong>抛光</strong> — 牙齿表面光滑处理</li>
<li><strong>英文检查报告</strong> — 带回给国内牙医参考</li>
</ul>` },
      { heading: '💰 价格', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 12px;text-align:left;">费用(韩元)</th><th style="padding:10px 12px;text-align:left;">人民币(约)</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">问诊+全景X光</td><td style="padding:8px 12px;">₩30,000〜50,000</td><td style="padding:8px 12px;">约150〜250元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">专业洁牙</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">约250〜500元</td></tr>
<tr><td style="padding:8px 12px;"><strong>检查+洁牙套餐</strong></td><td style="padding:8px 12px;"><strong>₩80,000〜150,000</strong></td><td style="padding:8px 12px;"><strong>约400〜750元</strong></td></tr>
</table>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>周一至周五: 09:30-18:30 | 周三: 09:30-20:00 | 周六: 09:30-14:00</p>
<p>🚇 会贤站1号出口步行2分钟 | 免预约</p>` }
    ],
    faq: [
      { q: '检查需要多长时间？', a: '检查+洁牙约30-45分钟。' },
      { q: '能拿到英文报告吗？', a: '可以，我们提供英文检查报告和X光片数据，方便回国后给牙医参考。' },
      { q: '如果发现蛀牙怎么办？', a: '我们会在X光片上解释，提供治疗方案和费用。您可以选择在韩国治疗（比国内便宜）或带报告回国治疗。' }
    ],
    ctaText: '预约口腔检查',
    ctaSubtext: '30-45分钟 · ₩80,000起 · 免预约',
    priceRange: '₩50,000 – ₩150,000'
  },

  // ===== 4. 牙痛 =====
  {
    slug: 'zh/toothache-seoul',
    lang: 'zh', heroEmoji: '😫',
    title: '首尔牙疼急诊｜1小时止痛·明洞当天治疗｜幸福艺人牙科',
    metaDesc: '在首尔旅游时牙疼？幸福艺人牙科1小时内止痛。当天诊断治疗，免预约，明洞会贤站步行2分钟。英语沟通。',
    h1: '牙疼急诊 — 首尔1小时止痛',
    keywords: '首尔牙疼, 韩国牙痛急诊, 明洞牙科急诊, 首尔牙疼怎么办, 韩国牙医当天治疗',
    introParagraph: `旅游时<strong>牙疼</strong>真的太糟了。别在酒店忍受了！<strong>幸福艺人牙科</strong>可以<strong>1小时内</strong>查明原因并止痛。免预约，牙痛患者优先接诊。`,
    sections: [
      { heading: '⚡ 止痛流程', content: `<ol>
<li><strong>到院</strong> — 牙痛患者优先接诊</li>
<li><strong>数字X光</strong> — 5分钟找到原因</li>
<li><strong>即时止痛</strong> — 局部麻醉+药物</li>
<li><strong>治疗</strong> — 补牙、根管、拔牙等</li>
<li><strong>术后指导</strong> — 处方+英文护理说明</li>
</ol>` },
      { heading: '🔍 牙疼常见原因', content: `<ul>
<li><strong>龋齿</strong> — 最常见原因，补牙或做牙冠</li>
<li><strong>牙裂</strong> — 吃硬食物造成，可做牙冠或粘接</li>
<li><strong>牙脓肿</strong> — 感染，需要抗生素+引流</li>
<li><strong>智齿</strong> — 部分萌出发炎，可能需要拔除</li>
<li><strong>牙周病</strong> — 牙龈炎症导致疼痛</li>
</ul>` },
      { heading: '💊 来之前的应急措施', content: `<ul>
<li><strong>布洛芬</strong>（이부프로펜）— 韩国药店（약국）有售，服用400mg</li>
<li><strong>冷敷</strong> — 脸颊外侧敷10分钟</li>
<li><strong>温盐水漱口</strong> — 一小勺盐加温水</li>
<li><strong>避免</strong>过热、过冷、过甜的食物</li>
</ul>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>
<p>🚇 会贤站1号出口步行2分钟 · 明洞站步行5分钟</p>` }
    ],
    faq: [
      { q: '半夜牙疼怎么办？', a: '先服用布洛芬止痛，冷敷。第二天一早来诊所。如果特别严重，首尔有24小时急诊牙科，但费用较高。' },
      { q: '明天就要回国了，今天能治好吗？', a: '可以！急诊治疗当天完成。复杂情况我们会做应急处理，并提供英文资料给国内牙医参考。' }
    ],
    ctaText: '立即止痛',
    ctaSubtext: '牙痛优先 · 免预约 · 1小时内',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== 5. 牙冠/补牙脱落 =====
  {
    slug: 'zh/lost-crown-filling-seoul',
    lang: 'zh', heroEmoji: '👑',
    title: '牙冠/补牙脱落 首尔明洞｜20分钟重新粘合·免预约',
    metaDesc: '旅途中牙冠或补牙脱落？幸福艺人牙科明洞20分钟重新粘合。₩50,000起，免预约，会贤站步行2分钟。',
    h1: '牙冠/补牙脱落 — 明洞20分钟修复',
    keywords: '牙冠脱落首尔, 补牙掉了韩国, 明洞牙科修复, 首尔牙冠重新粘合',
    introParagraph: `旅行途中<strong>牙冠掉了</strong>或<strong>补牙脱落</strong>？吃东西不方便，还影响美观。<strong>幸福艺人牙科</strong>可以<strong>20分钟重新粘合</strong>，免预约，从明洞步行即可到达。`,
    sections: [
      { heading: '🔧 可处理的情况', content: `<ul>
<li><strong>牙冠重新粘合</strong> — 带来脱落的牙冠，20分钟搞定（₩50,000起）</li>
<li><strong>制作临时牙冠</strong> — 牙冠丢失时的保护措施</li>
<li><strong>补牙重做</strong> — 树脂充填30-40分钟</li>
<li><strong>嵌体/高嵌体修复</strong></li>
</ul>` },
      { heading: '💡 请带上脱落的牙冠！', content: `<p>脱落的牙冠<strong>不要扔掉</strong>！很多情况下可以重新粘上。</p>
<ul>
<li>用小袋子或纸巾包好保管</li>
<li><strong>不要</strong>自己用胶水粘（会损伤牙齿和牙冠）</li>
<li>如果不小心吞了也没关系 — 我们会做新的临时牙冠</li>
</ul>` },
      { heading: '💰 费用', content: `<ul>
<li>牙冠重新粘合: ₩50,000〜100,000（约250〜500元）</li>
<li>临时牙冠: ₩100,000〜200,000（约500〜1,000元）</li>
<li>补牙重做: ₩80,000〜200,000（约400〜1,000元）</li>
</ul>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口步行2分钟 | 免预约·即刻处理</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '重新粘合需要多长时间？', a: '带来牙冠的话约20分钟。需要做新的临时牙冠则约30-60分钟。' },
      { q: '粘合后能坐飞机吗？', a: '粘合后可以正常坐飞机。但如果牙齿露着不处理，气压变化可能会引起疼痛，建议尽早处理。' }
    ],
    ctaText: '立即修复',
    ctaSubtext: '20分钟重新粘合 · 免预约',
    priceRange: '₩50,000 – ₩200,000'
  },

  // ===== 6. 种植牙 =====
  {
    slug: 'zh/dental-implant-seoul',
    lang: 'zh', heroEmoji: '🔩',
    title: '首尔种植牙｜比中国便宜50%·首尔大学专家｜幸福艺人牙科',
    metaDesc: '在首尔做种植牙。奥齿泰₩1,200,000起（约6,000元）。首尔大学专家团队，CT引导手术。明洞·会贤站步行2分钟。幸福艺人牙科。',
    h1: '首尔种植牙 — 世界级品质·实惠价格',
    keywords: '首尔种植牙, 韩国种植牙费用, 韩国种牙便宜, 首尔牙科种植, 奥齿泰种植牙韩国',
    introParagraph: `韩国是<strong>全球种植牙第一大国</strong>——人均种植牙数量世界最多，技术经验无可匹敌。<strong>幸福艺人牙科</strong>的种植牙专家毕业于<strong>首尔大学</strong>，已完成数千颗种植。奥齿泰、士卓曼、诺贝尔等系统齐全，<strong>价格比中国一线城市便宜30-50%</strong>。`,
    sections: [
      { heading: '💎 种植牙价格', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">品牌</th><th style="padding:10px 12px;text-align:left;">单颗价格(韩元)</th><th style="padding:10px 12px;text-align:left;">人民币(约)</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">奥齿泰（韩国高端）</td><td style="padding:8px 12px;">₩1,200,000〜1,500,000</td><td style="padding:8px 12px;">约6,000〜7,500元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">士卓曼（瑞士）</td><td style="padding:8px 12px;">₩1,800,000〜2,200,000</td><td style="padding:8px 12px;">约9,000〜11,000元</td></tr>
<tr><td style="padding:8px 12px;">诺贝尔（瑞典）</td><td style="padding:8px 12px;">₩2,000,000〜2,500,000</td><td style="padding:8px 12px;">约10,000〜12,500元</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">※ 中国一线城市种植牙：8,000-20,000元/颗。韩国更实惠！</p>
<p><strong>价格包含：</strong>植体+基台+牙冠+CT检查+全部复诊</p>` },
      { heading: '📅 旅客治疗时间表', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第1次来韩（1-2天）:</strong> 咨询+CT检查 → 种植手术 → 术后检查
</div>
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第2次来韩（3-6个月后）:</strong> 愈合检查 → 安装基台+牙冠
</div>
</div>
<p style="margin-top:12px;">部分病例可做<strong>即刻种植</strong>（当天装临时牙冠）——欢迎咨询。</p>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '短期旅游能做种植牙吗？', a: '种植手术当天可完成（1-2小时）。但最终牙冠需3-6个月后安装，需要来韩2次。部分病例可当天装临时牙冠。' },
      { q: '推荐哪个品牌？', a: '性价比首选奥齿泰（韩国本土高端品牌）。追求极致品质选士卓曼或诺贝尔。医生会根据您的骨质条件推荐最合适的方案。' },
      { q: '疼吗？', a: '局部麻醉下手术中不会感到疼痛。术后2-3天轻微不适，处方止痛药完全可以控制。' }
    ],
    ctaText: '免费种植牙咨询',
    ctaSubtext: 'CT检查 · 方案制定 · 费用评估 — 一次搞定',
    priceRange: '₩1,200,000 – ₩2,500,000'
  },

  // ===== 7. 费用对比指南 =====
  {
    slug: 'zh/dental-cost-korea-guide',
    lang: 'zh', heroEmoji: '💰',
    title: '韩国牙科费用指南｜与中国·美国·日本价格对比 2026版',
    metaDesc: '韩国牙科费用全面对比：种植牙、美白、根管治疗等在韩国、中国、美国、日本的价格差异。2026年最新价格。省30-80%！幸福艺人牙科。',
    h1: '韩国牙科费用 — 与中国·美国·日本全面对比',
    keywords: '韩国牙科费用, 韩国看牙便宜吗, 韩国牙科旅游费用, 首尔牙科价格, 韩国种植牙费用对比',
    introParagraph: `都说韩国看牙便宜——<strong>到底便宜多少？</strong>这份2026年版指南逐项对比韩国、中国、美国、日本的牙科费用。结论：<strong>省30-80%</strong>，而且品质世界一流。`,
    sections: [
      { heading: '📊 价格对比表', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:0.82rem;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 6px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 6px;text-align:center;">🇰🇷 韩国</th><th style="padding:10px 6px;text-align:center;">🇨🇳 中国</th><th style="padding:10px 6px;text-align:center;">🇺🇸 美国</th><th style="padding:10px 6px;text-align:center;">🇯🇵 日本</th></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">检查+X光</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">150-250元</td><td style="padding:8px 6px;text-align:center;">200-500元</td><td style="padding:8px 6px;text-align:center;">1,100-2,200元</td><td style="padding:8px 6px;text-align:center;">200-350元</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">洁牙</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">250-500元</td><td style="padding:8px 6px;text-align:center;">200-600元</td><td style="padding:8px 6px;text-align:center;">700-1,500元</td><td style="padding:8px 6px;text-align:center;">350-700元</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">树脂补牙</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">400-1,000元</td><td style="padding:8px 6px;text-align:center;">300-1,000元</td><td style="padding:8px 6px;text-align:center;">1,500-3,700元</td><td style="padding:8px 6px;text-align:center;">350-1,000元</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">根管治疗</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">1,000-2,000元</td><td style="padding:8px 6px;text-align:center;">1,500-4,000元</td><td style="padding:8px 6px;text-align:center;">5,200-11,000元</td><td style="padding:8px 6px;text-align:center;">700-2,000元</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">烤瓷牙冠</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">1,500-3,000元</td><td style="padding:8px 6px;text-align:center;">2,000-6,000元</td><td style="padding:8px 6px;text-align:center;">7,400-15,000元</td><td style="padding:8px 6px;text-align:center;">3,500-9,000元</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">种植牙</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">6,000-12,500元</td><td style="padding:8px 6px;text-align:center;">8,000-20,000元</td><td style="padding:8px 6px;text-align:center;">22,000-44,000元</td><td style="padding:8px 6px;text-align:center;">20,000-35,000元</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">牙齿美白</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">750-1,500元</td><td style="padding:8px 6px;text-align:center;">2,000-5,000元</td><td style="padding:8px 6px;text-align:center;">3,700-7,400元</td><td style="padding:8px 6px;text-align:center;">2,000-5,000元</td></tr>
<tr><td style="padding:8px 6px;">贴面(单颗)</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">2,500-5,000元</td><td style="padding:8px 6px;text-align:center;">3,000-8,000元</td><td style="padding:8px 6px;text-align:center;">11,000-22,000元</td><td style="padding:8px 6px;text-align:center;">5,600-10,000元</td></tr>
</table>
<p style="font-size:0.8rem;color:#aaa;">※ 所有价格为自费参考价。韩国价格基于幸福艺人牙科收费标准。2026年6月更新。</p>` },
      { heading: '✈️ 牙科旅游划算吗？', content: `<p><strong>算笔账 — 2颗种植牙：</strong></p>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:20px;border-radius:12px;margin:12px 0;">
<p>🇨🇳 <strong>中国:</strong> 2颗 × 12,000元 = <span style="color:#ff6b6b;">24,000元</span></p>
<p>🇰🇷 <strong>韩国:</strong> 2颗 × 7,500元 + 机票2,000元 + 酒店2,000元 = <span style="color:#F7BA18;">19,000元</span></p>
<p style="font-size:1.1rem;font-weight:700;color:#F7BA18;margin-top:12px;">💰 算上旅费也省5,000元！还能顺便玩首尔！</p>
</div>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼（明洞地区）</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '韩国牙科为什么这么便宜？', a: '运营成本较低，牙科材料制造商（如奥齿泰）就在国内，加上政府对基本治疗的价格管控。品质与日美欧同等水平。' },
      { q: '品质靠谱吗？', a: '韩国医疗质量全球前5。我们的医生毕业于首尔大学（韩国第一学府），使用的材料和设备与中日美一流诊所完全相同。' },
      { q: '能用中文沟通吗？', a: '我们主要提供英文服务，也欢迎使用翻译软件辅助沟通。基本的沟通没有问题。' }
    ],
    ctaText: '获取免费费用评估',
    ctaSubtext: '明码标价 · 免预约 · 英语OK',
  },

  // ===== 8. 周六牙医 =====
  {
    slug: 'zh/saturday-dentist-myeongdong',
    lang: 'zh', heroEmoji: '📅',
    title: '周六牙医 明洞首尔｜09:30-14:00营业·免预约',
    metaDesc: '周六在首尔需要看牙？幸福艺人牙科每周六09:30-14:00营业。明洞购物顺便看牙，免预约，会贤站步行2分钟。',
    h1: '周六牙医 — 明洞 09:30–14:00',
    keywords: '周六牙医首尔, 周末牙科明洞, 首尔周六看牙, 明洞牙科周末营业',
    introParagraph: `周六在明洞逛街时<strong>牙突然疼了</strong>？<strong>幸福艺人牙科</strong>每周六<strong>09:30-14:00</strong>营业。买完化妆品顺路看个牙，完美！`,
    sections: [
      { heading: '⏰ 营业时间', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;">日期</th><th style="padding:10px 12px;text-align:left;">时间</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">周一、二、四、五</td><td style="padding:8px 12px;">09:30–18:30</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>周三</strong></td><td style="padding:8px 12px;"><strong>09:30–20:00</strong> 🌙 夜间营业</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>周六</strong></td><td style="padding:8px 12px;"><strong>09:30–14:00</strong> ✅</td></tr>
<tr><td style="padding:8px 12px;">周日及法定假日</td><td style="padding:8px 12px;">休息</td></tr>
</table>` },
      { heading: '🦷 周六可做的项目', content: `<ul>
<li>🚨 急诊（牙痛、牙齿断裂、牙冠脱落）</li>
<li>🔍 检查+洁牙</li>
<li>✨ 美白（1小时）</li>
<li>🦷 补牙</li>
<li>💊 止痛处方</li>
</ul>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口步行2分钟 | 南大门市场&明洞旁边</p>` }
    ],
    faq: [
      { q: '周六需要预约吗？', a: '免预约即可来，但周六下午2点就关门了，建议提前来或者打电话确认。' },
      { q: '周日有急诊怎么办？', a: '周日休息。首尔有24小时急诊牙科可选，或者周一早上来我们这里。' }
    ],
    ctaText: '周六来看牙',
    ctaSubtext: '09:30–14:00 · 免预约 · 明洞',
  },

  // ===== 9. 牙脓肿/肿脸 =====
  {
    slug: 'zh/dental-abscess-swollen-face-seoul',
    lang: 'zh', heroEmoji: '🔴',
    title: '牙脓肿·脸肿 首尔急诊｜当天引流·消炎｜幸福艺人牙科',
    metaDesc: '在首尔脸肿了？牙脓肿需要紧急处理！幸福艺人牙科明洞当天引流、抗生素治疗。免预约优先接诊。会贤站步行2分钟。',
    h1: '牙脓肿 & 脸肿 — 首尔紧急处理',
    keywords: '牙脓肿首尔, 脸肿牙科韩国, 牙齿感染首尔急诊, 牙龈肿痛明洞',
    introParagraph: `<strong>牙脓肿</strong>是最严重的牙科急诊之一——脸肿、剧痛、感染可能扩散。<strong>不要等！</strong>幸福艺人牙科明洞店提供<strong>即时引流、抗生素和止痛治疗</strong>。脓肿患者优先接诊。`,
    sections: [
      { heading: '🚨 出现以下情况请立即就诊', content: `<ul>
<li>😰 <strong>面部、下巴或脸颊肿胀</strong> — 尤其是持续加重</li>
<li>🤒 <strong>发烧</strong> — 感染扩散的信号</li>
<li>😫 <strong>持续跳痛</strong> — 止痛药无效</li>
<li>🦷 <strong>口中有脓或异味</strong></li>
<li>😮 <strong>张嘴或吞咽困难</strong> — 需紧急处理</li>
</ul>
<p style="color:#ff6b6b;font-weight:700;margin-top:12px;">⚠️ 如果呼吸或吞咽困难，请立即拨打119（韩国急救电话）。</p>` },
      { heading: '⚡ 治疗流程', content: `<ol>
<li><strong>即刻评估</strong> — X光定位脓肿</li>
<li><strong>止痛</strong> — 局部麻醉+药物</li>
<li><strong>切开引流</strong></li>
<li><strong>抗生素</strong> — 处方抗感染药物</li>
<li><strong>根本治疗</strong> — 感染控制后做根管或拔牙</li>
<li><strong>英文术后指导</strong></li>
</ol>` },
      { heading: '💰 费用', content: `<ul>
<li>急诊问诊+X光: ₩30,000〜50,000（约150〜250元）</li>
<li>切开引流: ₩50,000〜100,000（约250〜500元）</li>
<li>抗生素: ₩10,000〜30,000（约50〜150元）</li>
<li>根管治疗(如需): ₩200,000〜400,000（约1,000〜2,000元）</li>
</ul>` },
      { heading: '📍 优先接诊', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a> — 来电说明脓肿情况，享受优先接诊</p>` }
    ],
    faq: [
      { q: '牙脓肿危险吗？', a: '是的——未治疗的牙齿感染可能扩散到颌骨、头部、颈部甚至血液。所以我们对脓肿患者优先接诊，建议当天就来。' },
      { q: '能带着脓肿坐飞机吗？', a: '不建议。气压变化可能加重疼痛。先接受治疗，抗生素起效后（通常24-48小时）再飞行。' }
    ],
    ctaText: '紧急脓肿治疗',
    ctaSubtext: '优先接诊 · 当天引流 · 抗生素',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== 10. 外国人友好牙科 =====
  {
    slug: 'zh/english-speaking-dentist-seoul',
    lang: 'zh', heroEmoji: '🌍',
    title: '外国人友好牙科 首尔明洞｜英语服务·首尔大学专家｜幸福艺人牙科',
    metaDesc: '在首尔找外国人能去的牙科？幸福艺人牙科位于明洞，英语沟通无障碍。首尔大学专家团队，全科诊疗。免预约，会贤站步行2分钟。',
    h1: '外国人友好牙科 — 首尔明洞',
    keywords: '首尔外国人牙科, 英语牙科明洞, 首尔牙科外国人, 韩国看牙英语, 明洞牙医外国人',
    introParagraph: `在首尔找一个<strong>靠谱的、能用英语沟通的牙科</strong>不容易。语言障碍、不知道怎么选……<strong>幸福艺人牙科</strong>位于首尔最国际化的<strong>明洞/会贤</strong>地区，<strong>英语沟通无障碍</strong>，接诊过大量外国游客、留学生和驻韩人员。`,
    sections: [
      { heading: '👨‍⚕️ 医生介绍', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>韩承大 院长</strong><br>
首尔大学齿学院（本科·硕士）· 综合牙科专家<br>
擅长: 种植牙、全口修复、复杂修复
</div>
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>辛贞熙 医生</strong><br>
首尔大学 · 牙体牙髓科专家<br>
擅长: 根管治疗、美学修复、显微镜治疗
</div>
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>朴炫美 医生</strong><br>
首尔大学 · 正畸科专家<br>
擅长: 隐形矫正、金属托槽、咬合矫正
</div>
</div>` },
      { heading: '🦷 诊疗科目', content: `<ul>
<li>🚨 <strong>急诊</strong> — 当天处理</li>
<li>🔍 <strong>检查+洁牙</strong></li>
<li>🔩 <strong>种植牙</strong> — ₩1,200,000起</li>
<li>✨ <strong>美白</strong></li>
<li>📐 <strong>正畸</strong> — 隐形矫正&托槽</li>
<li>🎨 <strong>美容牙科</strong> — 贴面、粘接</li>
<li>🔬 <strong>根管治疗</strong> — 25倍显微镜</li>
</ul>` },
      { heading: '💳 付款方式', content: `<ul>
<li>✅ 现金（韩元）、信用卡（VISA、万事达、银联、JCB、AMEX）</li>
<li>✅ 英文收据和诊断书（旅行保险用）</li>
<li>✅ 治疗前明确告知费用</li>
<li>✅ 支持支付宝、微信支付（请提前确认）</li>
</ul>` },
      { heading: '📍 位置', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口步行2分钟 | 🚇 明洞站步行5分钟</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '能用中文沟通吗？', a: '我们主要提供英文和韩文服务。也欢迎使用翻译APP（如谷歌翻译、Papago）辅助沟通，基本沟通没有问题。' },
      { q: '外国人能在韩国看牙吗？', a: '当然可以！韩国是全球牙科旅游热门目的地。我们日常接诊大量外国游客、留学生和驻韩人员。' },
      { q: '需要预约吗？', a: '免预约，急诊随到随看。非急诊提前打电话更好安排。' }
    ],
    ctaText: '立即预约/到访',
    ctaSubtext: '英语服务 · 免预约 · 全科诊疗',
  },
]
