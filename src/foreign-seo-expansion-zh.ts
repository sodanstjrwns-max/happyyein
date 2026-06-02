// =============================================
// 외국인 SEO 대확장 — CHINESE Pages (Phase F)
// 中文 10页: 急诊 · 旅游牙科 · 美白 · 检查 · 种植牙 · 费用 · 保险 · 周六 · 夜间 · 拔牙
// =============================================

import type { ForeignPage } from './foreign-emergency-seo'

const CLINIC_TEL = '+82-2-756-2828'

export const EXPANSION_ZH_PAGES: ForeignPage[] = [

  // ===== 1. 智齿拔除 (Wisdom Tooth) =====
  {
    slug: 'zh/wisdom-tooth-extraction-seoul',
    lang: 'zh', heroEmoji: '🦷',
    title: '首尔智齿拔除｜当天处理·中文服务｜幸福艺人牙科 明洞',
    metaDesc: '在首尔旅行时智齿疼痛？幸福艺人牙科位于明洞会贤站步行2分钟。当天CT拍摄·诊断·拔牙。首尔大学专业医生。比中国便宜50%。',
    h1: '首尔智齿拔除 — 当天可处理',
    keywords: '智齿拔除 首尔, 智齿疼 韩国旅行, 韩国 牙科 智齿, 明洞 牙医 拔牙, 首尔 牙科 外国人 智齿',
    introParagraph: `旅行途中<strong>智齿突然疼痛</strong>？幸福艺人牙科位于明洞中心、会贤站1号出口步行2分钟。<strong>当天CT拍摄、诊断、拔牙</strong>均可处理。首尔大学口腔外科专业医生安全操作。费用仅为<strong>中国的一半左右</strong>。`,
    sections: [
      { heading: '🔍 这些症状需要就诊', content: `<ul>
<li><strong>后牙疼痛·肿胀</strong> — 可能是智齿发炎</li>
<li><strong>张口困难</strong> — 智齿冠周炎症状</li>
<li><strong>食物嵌塞</strong> — 半萌出的智齿</li>
<li><strong>邻牙疼痛</strong> — 智齿可能在挤压邻牙</li>
<li><strong>反复感染</strong> — 抗生素只能暂时缓解</li>
</ul>` },
      { heading: '⚡ 当天拔牙流程', content: `<ol>
<li><strong>到院·挂号</strong> — 无需预约，疼痛患者优先</li>
<li><strong>全景X光 + CT拍摄</strong> — 精确判断智齿位置（10分钟）</li>
<li><strong>说明</strong> — 治疗方案和费用说明</li>
<li><strong>局部麻醉</strong> — 手术过程无痛</li>
<li><strong>拔牙</strong> — 简单拔除: 15-30分钟 | 阻生齿手术: 30-60分钟</li>
<li><strong>术后护理</strong> — 注意事项说明、止痛药·抗生素处方</li>
</ol>` },
      { heading: '💰 智齿拔除费用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 12px;text-align:left;">费用（韩元）</th><th style="padding:10px 12px;text-align:left;">人民币（约）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">简单拔除</td><td style="padding:8px 12px;">₩100,000〜200,000</td><td style="padding:8px 12px;">约500〜1,000元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">阻生齿手术拔除</td><td style="padding:8px 12px;">₩200,000〜400,000</td><td style="padding:8px 12px;">约1,000〜2,000元</td></tr>
<tr><td style="padding:8px 12px;">CT拍摄 + 问诊</td><td style="padding:8px 12px;">₩50,000〜80,000</td><td style="padding:8px 12px;">约250〜400元</td></tr>
</table>` },
      { heading: '✈️ 拔牙后可以坐飞机吗？', content: `<ul>
<li><strong>简单拔除</strong> — 24-48小时后通常可以乘机</li>
<li><strong>手术拔除</strong> — 建议等待48-72小时</li>
<li><strong>我们提供</strong> — 备用纱布、止痛药、英文术后护理说明</li>
</ul>` },
      { heading: '📍 交通', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口 步行2分钟 | 明洞站 步行5分钟</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '阻生智齿也能当天拔吗？', a: 'CT拍摄确认后，大多数情况可以当天处理。非常靠近神经的复杂病例可能需要另约手术日。' },
      { q: '拔智齿痛吗？', a: '使用局部麻醉，手术中不会感到疼痛。术后2-3天有轻微疼痛，处方止痛药可控制。' },
      { q: '可以一次拔4颗吗？', a: '同侧2颗可以同时拔除。对游客来说，我们建议分侧进行，以便恢复。' }
    ],
    ctaText: '预约智齿检查',
    ctaSubtext: 'CT拍摄·当天可拔 · 无需预约',
    priceRange: '₩100,000 – ₩400,000'
  },

  // ===== 2. 牙齿美白 (Whitening) =====
  {
    slug: 'zh/teeth-whitening-myeongdong',
    lang: 'zh', heroEmoji: '✨',
    title: '明洞牙齿美白｜1小时完成·韩国价格超值｜幸福艺人牙科',
    metaDesc: '在明洞做专业牙齿美白。1小时提亮4-8个色阶。比国内便宜一半。K-beauty体验的完美收官！无需预约。幸福艺人牙科。',
    h1: '明洞牙齿美白 — K-beauty微笑升级',
    keywords: '牙齿美白 明洞, 韩国 牙齿美白 便宜, 首尔 美白牙齿, 明洞 牙科 美白, K-beauty 美白 韩国',
    introParagraph: `来韩国体验K-beauty，别忘了<strong>升级你的微笑</strong>！幸福艺人牙科的专业美白只需<strong>1小时</strong>，即可提亮4-8个色阶。费用仅为国内价格的<strong>一半左右</strong>。在明洞购物的间隙，就能拥有闪亮笑容！`,
    sections: [
      { heading: '💎 美白项目', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">⚡ 快速美白</strong> — 30分钟，提亮2-4个色阶<br>
时间紧张的游客首选。<br>
<span style="color:#F7BA18;font-weight:700;">₩150,000（约750元人民币）</span>
</div>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">✨ 尊享美白</strong> — 60分钟，提亮4-8个色阶<br>
LED照射专业美白，效果最佳。<br>
<span style="color:#F7BA18;font-weight:700;">₩300,000（约1,500元人民币）</span>
</div>
<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);padding:16px;border-radius:12px;">
<strong>🏠 居家美白套装</strong> — 定制牙托 + 美白凝胶<br>
2周逐步美白。配合院内美白效果更佳。<br>
<span style="color:#F7BA18;font-weight:700;">₩200,000（约1,000元人民币）</span>
</div>
</div>` },
      { heading: '🌟 为什么在首尔做美白？', content: `<ul>
<li><strong>比国内便宜40-60%</strong> — 同样的专业产品，更优惠的价格</li>
<li><strong>1小时搞定</strong> — 在明洞购物的间隙完成</li>
<li><strong>K-beauty体验</strong> — 护肤+美白，完美的韩国美容之旅</li>
<li><strong>即刻见效</strong> — 做完就能在明洞街拍！📸</li>
</ul>` },
      { heading: '⏱️ 美白流程', content: `<ol>
<li><strong>咨询</strong> — 色阶评估和口腔检查（10分钟）</li>
<li><strong>洁牙</strong> — 去除表面污渍（15分钟）</li>
<li><strong>涂抹美白凝胶</strong> — 专业级过氧化物凝胶</li>
<li><strong>LED照射</strong> — 每次15-20分钟，2-3个循环</li>
<li><strong>完成!</strong> — 查看新色阶，去明洞拍照吧！📸</li>
</ol>` },
      { heading: '⚠️ 注意事项', content: `<ul>
<li>术后24-48小时可能有轻微敏感（会提供抗敏牙膏）</li>
<li>48小时内避免深色食物饮料（咖啡、红酒、泡菜汤等）</li>
<li>效果维持6-12个月</li>
</ul>` },
      { heading: '📍 交通', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口 步行2分钟 | 明洞K-beauty购物区核心地带</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '美白需要多长时间？', a: '快速美白30分钟，尊享美白约1小时。购物间隙就能完成！' },
      { q: '美白安全吗？', a: '绝对安全。我们使用全球通用的FDA认证美白产品，由执业牙医操作，比自助美白安全得多。' },
      { q: '美白后能吃韩国烤肉吗？', a: '建议48小时内避免深色食物。白米饭、豆腐等浅色食物没问题。' },
      { q: '有蛀牙也能美白吗？', a: '我们会先进行口腔检查。如有未治疗的蛀牙，可能建议先治疗再美白。' }
    ],
    ctaText: '今天就来美白',
    ctaSubtext: '无需预约 · 1小时完成 · ₩150,000起',
    priceRange: '₩150,000 – ₩300,000'
  },

  // ===== 3. 口腔检查·洁牙 (Checkup) =====
  {
    slug: 'zh/dental-checkup-cleaning-seoul',
    lang: 'zh', heroEmoji: '🔍',
    title: '首尔口腔检查·洁牙｜数字X光含 ₩80,000起｜明洞',
    metaDesc: '在首尔做口腔检查和专业洁牙。全景X光·洁牙套餐₩80,000起。国内一半的价格。英文报告。无需预约。幸福艺人牙科 明洞。',
    h1: '首尔口腔检查·专业洁牙',
    keywords: '口腔检查 首尔, 洁牙 韩国, 洗牙 明洞, 牙科检查 韩国 便宜, 旅行 口腔检查 首尔',
    introParagraph: `聪明的旅行者都在利用韩国<strong>超高性价比的牙科服务</strong>。在幸福艺人牙科做全面口腔检查+洁牙，费用仅为国内的<strong>一半左右</strong>。包含数字X光精密诊断和英文报告。在明洞观光的间隙，30-45分钟即可完成。`,
    sections: [
      { heading: '📋 检查内容', content: `<ul>
<li><strong>全面口腔检查</strong> — 牙齿、牙龈、咬合、颞颌关节</li>
<li><strong>数字全景X光</strong> — 所有牙齿和颌骨全貌</li>
<li><strong>龋齿检测</strong> — 早期发现问题</li>
<li><strong>牙周检查</strong> — 牙龈健康评估</li>
<li><strong>专业洁牙</strong> — 牙结石和菌斑清除</li>
<li><strong>抛光</strong> — 牙面光滑处理</li>
<li><strong>英文报告</strong> — 可带回国给牙医参考</li>
</ul>` },
      { heading: '💰 检查费用 — 超值！', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 12px;text-align:left;">费用（韩元）</th><th style="padding:10px 12px;text-align:left;">人民币（约）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">问诊 + 全景X光</td><td style="padding:8px 12px;">₩30,000〜50,000</td><td style="padding:8px 12px;">约150〜250元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">专业洁牙</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">约250〜500元</td></tr>
<tr><td style="padding:8px 12px;"><strong>检查+洁牙套餐</strong></td><td style="padding:8px 12px;"><strong>₩80,000〜150,000</strong></td><td style="padding:8px 12px;"><strong>约400〜750元</strong></td></tr>
</table>` },
      { heading: '💡 为什么在首尔做检查？', content: `<ul>
<li>🦷 出发前发现蛀牙，避免回国后昂贵的治疗</li>
<li>💰 同等质量，价格更优惠</li>
<li>🏥 CT、数字X光等先进设备</li>
<li>📄 英文报告方便带回国</li>
<li>⏱️ 30-45分钟完成，不耽误旅行</li>
</ul>` },
      { heading: '📍 无需预约', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>周一至周五: 09:30–18:30 | 周三: 09:30–20:00 | 周六: 09:30–14:00</p>
<p>🚇 会贤站1号出口 步行2分钟</p>` }
    ],
    faq: [
      { q: '检查需要多长时间？', a: '检查+洁牙约30-45分钟。需要CT拍摄的话多加10-15分钟。' },
      { q: '报告可以带回国吗？', a: '可以！我们提供英文检查报告和X光影像数据，方便回国后给牙医参考。' },
      { q: '检查发现蛀牙怎么办？', a: '我们会在X光上为您说明，提供治疗方案和费用。您可以选择在韩国治疗（更便宜）或带报告回国治疗。' }
    ],
    ctaText: '预约口腔检查',
    ctaSubtext: '检查+洁牙 ₩80,000起 · 无需预约',
    priceRange: '₩50,000 – ₩150,000'
  },

  // ===== 4. 种植牙 (Implant) =====
  {
    slug: 'zh/dental-implant-seoul',
    lang: 'zh', heroEmoji: '🔩',
    title: '首尔种植牙｜比国内便宜一半·首尔大学专家｜幸福艺人牙科',
    metaDesc: '在首尔做种植牙。Osstem·Straumann·Nobel Biocare可选。每颗₩1,200,000起。比国内便宜约50%。首尔大学种植牙专家。明洞 会贤站步行2分钟。',
    h1: '首尔种植牙 — 世界级品质，一半的价格',
    keywords: '种植牙 首尔, 韩国 种植牙 费用, 种植牙 韩国 便宜, 明洞 种植牙, 韩国 牙科 种植旅游',
    introParagraph: `韩国是<strong>全球种植牙手术量第一的国家</strong>——人均种植牙数量世界之最，专业医生经验极其丰富。幸福艺人牙科的种植牙专家毕业于<strong>首尔大学</strong>，已完成数千例种植手术。使用Osstem、Straumann、Nobel Biocare等全球顶级系统，价格仅为<strong>国内的50%左右</strong>。`,
    sections: [
      { heading: '💎 种植牙费用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">系统</th><th style="padding:10px 12px;text-align:left;">每颗费用（韩元）</th><th style="padding:10px 12px;text-align:left;">人民币（约）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Osstem（韩国高端）</td><td style="padding:8px 12px;">₩1,200,000〜1,500,000</td><td style="padding:8px 12px;">约6,000〜7,500元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Straumann（瑞士）</td><td style="padding:8px 12px;">₩1,800,000〜2,200,000</td><td style="padding:8px 12px;">约9,000〜11,000元</td></tr>
<tr><td style="padding:8px 12px;">Nobel Biocare（瑞典）</td><td style="padding:8px 12px;">₩2,000,000〜2,500,000</td><td style="padding:8px 12px;">约10,000〜12,500元</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">国内种植牙均价：约8,000-15,000元/颗。韩国同等品质约便宜50%。</p>
<p><strong>费用包含：</strong>种植体 + 基台 + 牙冠 + CT拍摄 + 所有复诊</p>` },
      { heading: '🏆 为什么选择韩国？', content: `<ul>
<li><strong>全球第一</strong> — 韩国人均种植牙数量世界之最</li>
<li><strong>Osstem是韩国品牌</strong> — 全球第三大种植牙制造商</li>
<li><strong>最新技术</strong> — CT导航手术、数字化方案设计</li>
<li><strong>首尔大学专家</strong> — 韩国最高学府的医学精英</li>
<li><strong>节省约50%</strong> — 加上机票酒店也比国内便宜</li>
</ul>` },
      { heading: '📅 游客治疗时间表', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第一次来韩（1-2天）：</strong>问诊 + CT拍摄 → 种植手术 → 术后检查<br>
<span style="font-size:0.85rem;color:#aaa;">建议停留：2-3天</span>
</div>
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第二次来韩（3-6个月后）：</strong>愈合检查 → 安装基台+牙冠<br>
<span style="font-size:0.85rem;color:#aaa;">建议停留：2-3天</span>
</div>
</div>` },
      { heading: '📍 交通', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口 步行2分钟 | 明洞站 步行5分钟</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '短期旅行能做种植牙吗？', a: '种植手术可以在第一天完成（1-2小时），但最终牙冠需等待3-6个月愈合后安装，因此需要来韩两次。即刻种植（当天装冠）在部分病例中可行，请咨询。' },
      { q: '推荐哪个品牌？', a: '大多数患者选择Osstem——品质和性价比兼优。高端需求可选Straumann或Nobel Biocare。医生会根据骨质条件推荐最适合的。' },
      { q: '种植手术痛吗？', a: '局部麻醉下进行，术中无痛。术后2-3天轻微疼痛，处方药即可控制。' },
      { q: '可以做全口种植吗？', a: '可以。院长韩医生是全口修复专家，All-on-4和All-on-6方案均可提供。' }
    ],
    ctaText: '免费种植牙咨询',
    ctaSubtext: 'CT拍摄 · 治疗方案 · 费用估算 — 一次到位',
    priceRange: '₩1,200,000 – ₩2,500,000'
  },

  // ===== 5. 韩国牙科费用指南 (Cost Guide) =====
  {
    slug: 'zh/dental-cost-korea-guide',
    lang: 'zh', heroEmoji: '💰',
    title: '韩国牙科费用指南｜中国 vs 韩国 完全比较 2026年版',
    metaDesc: '中韩牙科费用完全对比。种植牙·牙冠·美白·根管治疗，韩国便宜30-60%。2026最新价格。幸福艺人牙科 明洞。',
    h1: '韩国vs中国 牙科费用 完全比较 2026',
    keywords: '韩国 牙科 费用, 韩国 看牙 便宜, 韩国 种植牙 费用 比较, 韩国 牙科旅游, 首尔 牙科 价格表',
    introParagraph: `都说韩国看牙便宜，<strong>到底便宜多少？</strong>这篇指南用真实的2026年数据，完整比较中韩两国的牙科费用。结论：在幸福艺人牙科（明洞），多数治疗比国内<strong>便宜30-60%</strong>。`,
    sections: [
      { heading: '📊 费用完全对比表', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:0.85rem;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 8px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 8px;text-align:center;">🇰🇷 韩国</th><th style="padding:10px 8px;text-align:center;">🇨🇳 中国</th><th style="padding:10px 8px;text-align:center;">节省</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">检查 + X光</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">150-250元</td><td style="padding:8px;text-align:center;">200-500元</td><td style="padding:8px;text-align:center;">约30-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">洁牙</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">250-500元</td><td style="padding:8px;text-align:center;">300-800元</td><td style="padding:8px;text-align:center;">约20-40%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">树脂补牙</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">400-1,000元</td><td style="padding:8px;text-align:center;">500-1,500元</td><td style="padding:8px;text-align:center;">约30-40%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">根管治疗</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">1,000-2,000元</td><td style="padding:8px;text-align:center;">1,500-4,000元</td><td style="padding:8px;text-align:center;">约30-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">全瓷牙冠</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">2,000-3,000元</td><td style="padding:8px;text-align:center;">3,000-6,000元</td><td style="padding:8px;text-align:center;">约40-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">种植牙</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">6,000-12,500元</td><td style="padding:8px;text-align:center;">8,000-15,000元</td><td style="padding:8px;text-align:center;">约25-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">牙齿美白</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">750-1,500元</td><td style="padding:8px;text-align:center;">1,500-3,000元</td><td style="padding:8px;text-align:center;">约50%</td></tr>
<tr><td style="padding:8px;">瓷贴面（每颗）</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">2,500-4,000元</td><td style="padding:8px;text-align:center;">3,000-8,000元</td><td style="padding:8px;text-align:center;">约30-50%</td></tr>
</table>
<p style="font-size:0.8rem;color:#aaa;">※ 韩国价格为幸福艺人牙科自费价格。中国为民营牙科诊所一般价格。2026年6月。</p>` },
      { heading: '✈️ 牙科旅游值得吗？', content: `<p><strong>以2颗种植牙为例：</strong></p>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:20px;border-radius:12px;margin:12px 0;">
<p><strong>在国内：</strong> 2颗 × 12,000元 = <span style="color:#ff6b6b;">24,000元</span></p>
<p><strong>在韩国：</strong> 2颗 × 7,000元 + 机票(2,000元) + 酒店3晚(1,500元) = <span style="color:#F7BA18;">17,500元</span></p>
<p style="font-size:1.1rem;font-weight:700;color:#F7BA18;margin-top:12px;">💰 节省约6,500元 — 包含旅费还更便宜！</p>
</div>` },
      { heading: '🏥 为什么选幸福艺人牙科？', content: `<ul>
<li>✅ <strong>首尔大学毕业的专业医生团队</strong></li>
<li>✅ <strong>CT·数字X光·手术显微镜</strong>等先进设备</li>
<li>✅ <strong>明洞黄金位置</strong> — 游玩购物两不误</li>
<li>✅ <strong>外语服务</strong> — 清晰的治疗和费用说明</li>
<li>✅ <strong>透明定价</strong> — 治疗前告知费用，无隐藏收费</li>
</ul>` },
      { heading: '📍 来院咨询', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '韩国牙科为什么这么便宜？', a: '运营成本较低、政府对基本治疗的价格管控、牙科诊所竞争激烈，以及韩国是Osstem等全球牙科材料大厂的所在地。品质并未因价格低而打折。' },
      { q: '质量和国内一样好吗？', a: '韩国医疗质量常年位居全球前5。我们的医生来自首尔大学，使用与全球顶级诊所相同的材料和设备。' },
      { q: '有中文服务吗？', a: '治疗说明和费用沟通有外语支持。详细文件以英文出具。' },
      { q: '可以用旅行保险吗？', a: '我们提供英文收据和诊断证明，回国后可向保险公司申请理赔。具体保障范围取决于您的保单。' }
    ],
    ctaText: '免费获取费用估算',
    ctaSubtext: '到院咨询 · 透明定价 · 外语服务',
  },

  // ===== 6. 牙脓肿·面部肿胀 (Abscess) =====
  {
    slug: 'zh/dental-abscess-swollen-face',
    lang: 'zh', heroEmoji: '🔴',
    title: '牙脓肿·面部肿胀 首尔紧急治疗｜明洞 当天处理',
    metaDesc: '在首尔牙齿肿了·有脓？幸福艺人牙科紧急对应。当天切开排脓·抗生素·止痛。明洞会贤站步行2分钟。无需预约·优先处理。',
    h1: '牙脓肿·面部肿胀 — 首尔紧急治疗',
    keywords: '牙脓肿 首尔, 面部肿胀 牙科 韩国, 牙齿感染 明洞, 牙龈肿 韩国旅行, 牙科感染 急诊 首尔',
    introParagraph: `<strong>牙脓肿</strong>是最严重的牙科急症之一——面部肿胀、剧烈疼痛，感染还可能扩散。<strong>请立即就诊。</strong>幸福艺人牙科提供<strong>当天切开排脓、抗生素处方、止痛治疗</strong>。脓肿患者优先处理。`,
    sections: [
      { heading: '🚨 出现这些症状请立即就诊', content: `<ul>
<li>😰 <strong>面颊·下巴·面部肿胀</strong> — 尤其在加重时</li>
<li>🤒 <strong>发烧</strong> — 感染扩散的信号</li>
<li>😫 <strong>持续跳痛</strong> — 止痛药无效</li>
<li>🦷 <strong>口中有脓或异味</strong></li>
<li>😮 <strong>张口困难或吞咽困难</strong> — 紧急性很高</li>
</ul>
<p style="color:#ff6b6b;font-weight:700;margin-top:12px;">⚠️ 如有呼吸困难或严重吞咽困难，请拨打119（韩国急救电话）。</p>` },
      { heading: '⚡ 治疗流程', content: `<ol>
<li><strong>即刻检查</strong> — X光定位脓肿位置</li>
<li><strong>止痛</strong> — 局部麻醉和药物</li>
<li><strong>切开排脓</strong> — 如脓肿已形成</li>
<li><strong>抗生素处方</strong> — 控制感染</li>
<li><strong>病因治疗</strong> — 感染控制后进行根管治疗或拔牙</li>
</ol>` },
      { heading: '💰 治疗费用', content: `<ul>
<li>急诊问诊 + X光: ₩30,000〜50,000（约150-250元）</li>
<li>切开排脓: ₩50,000〜100,000（约250-500元）</li>
<li>抗生素处方: ₩10,000〜30,000（约50-150元）</li>
<li>根管治疗（如需）: ₩200,000〜400,000（约1,000-2,000元）</li>
</ul>` },
      { heading: '📍 优先处理', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a> — 请说"脓肿"，我们会优先安排。</p>` }
    ],
    faq: [
      { q: '牙脓肿危险吗？', a: '是的。不治疗的话感染可能扩散到颌骨、颈部甚至血液。请务必当天就诊。' },
      { q: '有脓肿能坐飞机吗？', a: '不建议在未治疗的情况下乘机。先接受治疗，待抗生素起效（通常24-48小时后）再乘机。' },
      { q: '治疗需要多长时间？', a: '初期急诊处理（排脓+开药）约30-60分钟。根本治疗（根管或拔牙）可能需要再约。' }
    ],
    ctaText: '紧急治疗脓肿',
    ctaSubtext: '优先处理 · 当天排脓 · 抗生素处方',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== 7. 周六牙医 (Saturday) =====
  {
    slug: 'zh/saturday-dentist-myeongdong',
    lang: 'zh', heroEmoji: '📅',
    title: '明洞周六牙医｜09:30-14:00营业｜无需预约',
    metaDesc: '周六需要看牙？幸福艺人牙科每周六09:30-14:00营业。明洞·会贤站步行2分钟。急诊·检查·美白均可。无需预约。',
    h1: '明洞周六牙科 — 09:30〜14:00',
    keywords: '周六 牙医 明洞, 周末 牙科 首尔, 周六 看牙 韩国, 明洞 牙科 周六',
    introParagraph: `<strong>周六的明洞</strong>人山人海，正是购物黄金时间。如果这时候牙出了问题怎么办？幸福艺人牙科每周六 <strong>09:30〜14:00</strong> 正常营业。无需预约，当天处理。`,
    sections: [
      { heading: '⏰ 营业时间', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">日期</th><th style="padding:10px 12px;text-align:left;">时间</th><th style="padding:10px 12px;text-align:left;">备注</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">周一·二·四·五</td><td style="padding:8px 12px;">09:30 – 18:30</td><td style="padding:8px 12px;">正常营业</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>周三</strong></td><td style="padding:8px 12px;"><strong>09:30 – 20:00</strong></td><td style="padding:8px 12px;color:#F7BA18;font-weight:700;">🌙 夜间营业！</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>周六</strong></td><td style="padding:8px 12px;"><strong>09:30 – 14:00</strong></td><td style="padding:8px 12px;color:#F7BA18;font-weight:700;">✅ 营业中！</td></tr>
<tr><td style="padding:8px 12px;">周日·节假日</td><td style="padding:8px 12px;">休息</td><td style="padding:8px 12px;">—</td></tr>
</table>` },
      { heading: '🦷 周六可处理项目', content: `<ul>
<li>🚨 <strong>急诊</strong> — 牙痛·牙裂·脱冠</li>
<li>🔍 <strong>检查·洁牙</strong></li>
<li>🦷 <strong>补牙</strong></li>
<li>✨ <strong>牙齿美白</strong> — 1小时完成</li>
<li>💊 <strong>止痛处方</strong></li>
</ul>` },
      { heading: '📍 交通', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口 步行2分钟 | 紧邻南大门市场·明洞</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '周六需要预约吗？', a: '无需预约。但周六14:00就关门了，建议提前来或电话确认。' },
      { q: '周日牙痛怎么办？', a: '我们周日休息。如果可以的话请周六上午来。紧急情况可去首尔24小时急诊牙科。' }
    ],
    ctaText: '周六来看牙',
    ctaSubtext: '09:30〜14:00 · 无需预约 · 明洞',
  },

  // ===== 8. 周三夜间 (Wednesday Night) =====
  {
    slug: 'zh/night-dentist-wednesday',
    lang: 'zh', heroEmoji: '🌙',
    title: '明洞夜间牙科｜周三晚8点营业｜幸福艺人牙科',
    metaDesc: '白天没时间看牙？幸福艺人牙科每周三营业到晚8点。明洞·会贤站步行2分钟。急诊·检查·美白均可。无需预约。',
    h1: '明洞夜间牙科 — 周三到晚8点',
    keywords: '夜间 牙医 明洞, 夜间营业 牙科 首尔, 周三 晚上 牙科 韩国, 晚上 看牙 首尔',
    introParagraph: `在首尔玩了一天，晚上牙突然疼了？白天购物太忙没时间去牙医？幸福艺人牙科<strong>每周三营业到晚上8点</strong>。下班后、晚饭后都来得及！`,
    sections: [
      { heading: '🌙 周三夜间营业', content: `<div style="background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);padding:24px;border-radius:16px;text-align:center;">
<p style="font-size:1.3rem;font-weight:800;font-family:'Syne',sans-serif;">每周三</p>
<p style="font-size:2rem;font-weight:800;color:#F7BA18;font-family:'Syne',sans-serif;">09:30 – 20:00</p>
<p style="color:#B5B0A8;font-size:0.85rem;">初诊最晚接待: 19:00</p>
</div>` },
      { heading: '🦷 周三晚间可处理', content: `<ul>
<li>🚨 <strong>急诊</strong> — 止痛·牙裂·脱冠</li>
<li>🔍 <strong>检查·X光</strong></li>
<li>✨ <strong>牙齿美白</strong> — 1小时快速美白</li>
<li>🦷 <strong>补牙·小手术</strong></li>
<li>📋 <strong>种植牙·正畸咨询</strong></li>
</ul>` },
      { heading: '📍 交通', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口 步行2分钟 | 明洞站 步行5分钟</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '周三最晚几点挂号？', a: '初诊最晚19:00。提前电话的话，可能可以更晚安排。' },
      { q: '晚间所有治疗都可以做吗？', a: '急诊、检查、美白、咨询均可。复杂手术建议白天预约。' }
    ],
    ctaText: '周三晚上来看牙',
    ctaSubtext: '营业到晚8点 · 无需预约',
  },

  // ===== 9. 脱冠·脱落修复 (Lost Crown) =====
  {
    slug: 'zh/lost-crown-filling-seoul',
    lang: 'zh', heroEmoji: '👑',
    title: '首尔牙冠脱落·补牙脱落｜20分钟重新粘合｜明洞牙医',
    metaDesc: '韩国旅行中牙冠脱落了？补牙掉了？幸福艺人牙科明洞20分钟重新粘合。无需预约·当天处理。会贤站步行2分钟。',
    h1: '牙冠·补牙脱落？20分钟重新粘合',
    keywords: '牙冠脱落 首尔, 冠掉了 韩国, 补牙脱落 明洞, 牙冠重新粘合 韩国旅行, 牙科修复 明洞',
    introParagraph: `旅行中<strong>牙冠（烤瓷冠）掉了</strong>、<strong>补牙材料脱落</strong>——确实让人着急。别担心，幸福艺人牙科<strong>20分钟即可重新粘合</strong>，无需预约。`,
    sections: [
      { heading: '🔧 当天处理项目', content: `<ul>
<li><strong>牙冠重新粘合</strong> — 带来原牙冠，20分钟搞定（₩50,000起）</li>
<li><strong>临时冠制作</strong> — 原冠丢失时，制作保护性临时冠</li>
<li><strong>补牙更换</strong> — 树脂（牙色）补牙（30-40分钟）</li>
<li><strong>嵌体修复</strong></li>
</ul>` },
      { heading: '💡 牙冠掉了怎么办', content: `<p><strong>请保存好牙冠！</strong>很多情况下可以重新粘上。用小袋子或纸巾包好带来。</p>
<ul>
<li>❌ 不要用502胶水粘 — 会损伤牙冠和牙齿</li>
<li>⚠️ 不要用那一侧咀嚼</li>
<li>🥤 避免过冷过热的食物</li>
<li>💊 疼痛的话可吃布洛芬（药店有售）</li>
</ul>` },
      { heading: '💰 费用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">项目</th><th style="padding:10px 12px;text-align:left;">费用</th><th style="padding:10px 12px;text-align:left;">人民币（约）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">牙冠重新粘合</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">约250〜500元</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">临时冠制作</td><td style="padding:8px 12px;">₩100,000〜200,000</td><td style="padding:8px 12px;">约500〜1,000元</td></tr>
<tr><td style="padding:8px 12px;">树脂补牙</td><td style="padding:8px 12px;">₩80,000〜200,000</td><td style="padding:8px 12px;">约400〜1,000元</td></tr>
</table>` },
      { heading: '📍 无需预约', content: `<p><strong>首尔市中区南大门路9街51号 孝德大厦3楼</strong></p>
<p>🚇 会贤站1号出口 步行2分钟</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '重新粘合牙冠多少钱？', a: '₩50,000-100,000（约250-500元）。新做临时冠₩100,000-200,000。' },
      { q: '不小心把牙冠吞了', a: '不用担心，会安全排出。来院后我们会为您制作新的临时冠。' },
      { q: '没有牙冠能坐飞机吗？', a: '可以，但暴露的牙齿对气压变化很敏感。建议登机前装上临时冠。' }
    ],
    ctaText: '牙冠修复找我们',
    ctaSubtext: '20分钟粘合 · 无需预约',
    priceRange: '₩50,000 – ₩200,000'
  },

  // ===== 10. 旅行保险与牙科 (Insurance) =====
  {
    slug: 'zh/travel-insurance-dental-korea',
    lang: 'zh', heroEmoji: '🛡️',
    title: '韩国牙科治疗与旅行保险｜保险材料当天出具｜幸福艺人牙科',
    metaDesc: '在首尔看牙能用旅行保险吗？幸福艺人牙科当天出具英文收据·诊断证明·X光影像。保险理赔全程支持。明洞。',
    h1: '旅行保险与韩国牙科治疗',
    keywords: '旅行保险 牙科 韩国, 旅行险 牙齿 首尔, 韩国 牙科 保险 理赔, 牙科 收据 英文 韩国, 出国 牙齿治疗 保险',
    introParagraph: `在首尔突发<strong>牙齿问题</strong>，旅行保险能报销吗？怎么理赔？这篇指南告诉你<strong>哪些能报</strong>、<strong>需要什么材料</strong>，以及幸福艺人牙科如何<strong>协助你完成理赔</strong>。`,
    sections: [
      { heading: '✅ 通常可以报销的项目', content: `<ul>
<li><strong>牙科急诊</strong> — 突发牙痛、牙裂、脱冠</li>
<li><strong>意外导致的牙外伤</strong> — 摔倒、运动受伤、交通事故</li>
<li><strong>急诊止痛</strong> — 药物和应急治疗</li>
<li><strong>急诊拔牙</strong> — 医学必要的情况</li>
</ul>
<p style="margin-top:12px;"><strong style="color:#ff6b6b;">通常不能报销的：</strong></p>
<ul>
<li>出行前已有的牙齿问题</li>
<li>美容项目（美白、贴面等）</li>
<li>计划性治疗（牙科旅游项目）</li>
<li>常规检查和洁牙</li>
</ul>` },
      { heading: '📋 我们提供的保险材料', content: `<ul>
<li>📄 <strong>英文详细收据</strong> — 注明治疗代码和项目说明</li>
<li>📄 <strong>英文诊断证明</strong> — 说明急诊性质和医学必要性</li>
<li>🦷 <strong>X光影像数据</strong> — U盘或邮件发送</li>
<li>📄 <strong>治疗记录</strong> — 完整的治疗文档</li>
<li>📋 <strong>理赔表格填写协助</strong></li>
</ul>
<p style="margin-top:8px;"><strong>以上全部免费</strong>，包含在治疗服务中。</p>` },
      { heading: '📝 理赔流程', content: `<ol>
<li><strong>联系保险公司</strong> — 尽快报告急诊（有些要求24小时内）</li>
<li><strong>接受治疗</strong> — 在幸福艺人牙科接受急诊治疗</li>
<li><strong>领取材料</strong> — 当天给您收据、诊断证明、X光</li>
<li><strong>在诊所付款</strong> — 多数旅行险采用先付后赔模式</li>
<li><strong>回国后提交理赔</strong> — 在保险公司要求的期限内（通常30-90天）</li>
</ol>` },
      { heading: '💰 没有保险也不贵', content: `<p>即使保险不报，韩国的牙科费用也非常实惠：</p>
<ul>
<li>急诊问诊 + X光: ₩30,000-50,000（约150-250元）</li>
<li>补牙: ₩80,000-200,000（约400-1,000元）</li>
<li>牙冠粘合: ₩50,000-100,000（约250-500元）</li>
</ul>` },
      { heading: '📍 来院就诊', content: `<p><strong>幸福艺人牙科 — 明洞</strong></p>
<p>首尔市中区南大门路9街51号 孝德大厦3楼</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '需要先垫付还是直接结算？', a: '大多数旅行保险采用先付后赔模式。在诊所付款后，回国提交材料理赔。' },
      { q: '材料多久能拿到？', a: '治疗当天即可拿到所有材料，无需等待。' },
      { q: '保险公司有指定表格怎么办？', a: '请带来，我们会协助填写医疗信息部分。' }
    ],
    ctaText: '急诊治疗 + 保险材料',
    ctaSubtext: '英文收据 · 诊断证明 · X光 当天出具',
  },
]
