// =============================================
// 외국인 SEO 대확장 — JAPANESE Pages (Phase F)
// 일본어 페이지 10개 추가
// 일본인 관광객 · 주재원 · 유학생 타겟
// =============================================

import type { ForeignPage } from './foreign-emergency-seo'

const CLINIC_TEL = '+82-2-756-2828'

export const EXPANSION_JA_PAGES: ForeignPage[] = [

  // ===== 1. 親知らず =====
  {
    slug: 'ja/wisdom-tooth-extraction-seoul',
    lang: 'ja', heroEmoji: '🦷',
    title: '親知らず抜歯 ソウル明洞｜当日対応・日本語OK｜ハッピーイェイン歯科',
    metaDesc: 'ソウル旅行中に親知らずが痛む？ハッピーイェイン歯科は明洞・会賢駅徒歩2分。当日抜歯対応、CT完備、日本より安い費用。ソウル大学出身の専門医。',
    h1: '親知らず抜歯 — ソウル明洞で当日対応',
    keywords: '親知らず 抜歯 ソウル, 親知らず 韓国, 明洞 歯医者 親知らず, ソウル 歯科 抜歯, 韓国 歯科 外国人',
    introParagraph: `韓国旅行中に<strong>親知らずの痛み</strong>が出てしまった方へ。<strong>ハッピーイェイン歯科</strong>では、CT撮影による正確な診断と<strong>当日の抜歯</strong>に対応しています。ソウル大学出身の口腔外科専門医が、安全かつ迅速に治療いたします。明洞エリア、会賢駅1番出口から徒歩2分。`,
    sections: [
      { heading: '🔍 こんな症状はありませんか？', content: `<ul>
<li><strong>奥歯の奥が痛い</strong> — 親知らずの炎症の可能性</li>
<li><strong>歯茎が腫れている</strong> — 智歯周囲炎（ちししゅういえん）</li>
<li><strong>口が開きにくい</strong> — 感染が進行しているサイン</li>
<li><strong>隣の歯が押されて痛い</strong> — 埋伏智歯の圧迫</li>
</ul>
<p>当院では<strong>パノラマX線 + CT検査</strong>で正確に診断し、最適な治療プランをご提案します。</p>` },
      { heading: '💰 韓国での親知らず抜歯費用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">施術内容</th><th style="padding:10px 12px;text-align:left;">費用（ウォン）</th><th style="padding:10px 12px;text-align:left;">日本円（目安）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">単純抜歯</td><td style="padding:8px 12px;">₩100,000〜200,000</td><td style="padding:8px 12px;">約11,000〜22,000円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">埋伏歯の外科的抜歯</td><td style="padding:8px 12px;">₩200,000〜400,000</td><td style="padding:8px 12px;">約22,000〜44,000円</td></tr>
<tr><td style="padding:8px 12px;">CT検査 + 診察</td><td style="padding:8px 12px;">₩50,000〜80,000</td><td style="padding:8px 12px;">約5,500〜8,800円</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">※ 日本での親知らず抜歯は保険適用外の場合5,000〜15,000円ですが、CT検査や難抜歯は別途。韓国は総額でも非常にリーズナブルです。</p>` },
      { heading: '✈️ 抜歯後のフライトについて', content: `<ul>
<li><strong>単純抜歯</strong> — 翌日以降のフライトは通常問題ありません</li>
<li><strong>外科的抜歯</strong> — 可能であれば48〜72時間後のフライトを推奨</li>
<li>抜歯当日のフライトでも対応可能 — 特別なアフターケア指示をお渡しします</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 | 🚇 明洞駅 徒歩5分</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '当日に抜歯できますか？', a: 'はい、CT検査後に多くの場合当日抜歯が可能です。非常に複雑な症例（神経に近い場合等）は予約をお勧めすることがあります。' },
      { q: '痛いですか？', a: '局所麻酔で術中の痛みはありません。術後2〜3日は軽い痛みがありますが、処方薬で管理できます。' },
      { q: '4本同時に抜けますか？', a: '同じ側の2本は同時に抜歯可能です。4本同時は旅行者にはお勧めしません（回復期間が長いため）。' }
    ],
    ctaText: '親知らずの診察を予約',
    ctaSubtext: 'CT完備 · 当日抜歯対応 · 予約不要',
    priceRange: '₩100,000 – ₩400,000'
  },

  // ===== 2. ホワイトニング =====
  {
    slug: 'ja/teeth-whitening-myeongdong',
    lang: 'ja', heroEmoji: '✨',
    title: 'ホワイトニング 明洞 ソウル｜1時間で完了・観光のついでに｜ハッピーイェイン歯科',
    metaDesc: '明洞でプロのホワイトニング！1時間で4〜8シェード白く。K-Beauty体験の仕上げに。₩150,000〜、予約不要、会賢駅徒歩2分。ハッピーイェイン歯科。',
    h1: 'ホワイトニング in 明洞 — K-Beauty体験の仕上げ',
    keywords: 'ホワイトニング 明洞, ホワイトニング ソウル, 韓国 ホワイトニング 安い, 歯 ホワイトニング 韓国, 明洞 歯科 ホワイトニング, K-Beauty ホワイトニング',
    introParagraph: `韓国といえば<strong>K-Beauty</strong> — スキンケア、コスメ、そして<strong>白い歯</strong>！明洞でショッピングのついでに、<strong>プロフェッショナルホワイトニング</strong>を受けてみませんか？わずか<strong>1時間</strong>で4〜8シェード白くなります。日本のホワイトニングよりも<strong>圧倒的にお手頃</strong>です。`,
    sections: [
      { heading: '💎 ホワイトニングメニュー', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">⚡ エクスプレス</strong> — 30分、2〜4シェード改善<br>
時間がない方に最適。即日効果あり。<br>
<span style="color:#F7BA18;font-weight:700;">₩150,000（約16,500円）</span>
</div>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">✨ プレミアム</strong> — 60分、4〜8シェード改善<br>
LED照射付きフルホワイトニング。最大効果。<br>
<span style="color:#F7BA18;font-weight:700;">₩300,000（約33,000円）</span>
</div>
</div>
<p style="margin-top:12px;font-size:0.85rem;color:#aaa;">※ 日本のオフィスホワイトニング相場: 30,000〜70,000円。韓国なら半額以下！</p>` },
      { heading: '⏱️ 施術の流れ', content: `<ol>
<li><strong>カウンセリング</strong> — 現在のシェード確認（10分）</li>
<li><strong>クリーニング</strong> — 表面の着色除去（15分）</li>
<li><strong>ホワイトニングジェル塗布</strong></li>
<li><strong>LED照射</strong> — 15〜20分×2〜3セット</li>
<li><strong>完成！</strong> — 新しいシェードを確認 📸 写真タイム！</li>
</ol>` },
      { heading: '⚠️ 注意事項', content: `<ul>
<li>施術後24〜48時間は軽い知覚過敏が出ることがあります</li>
<li>48時間は色の濃い食べ物（コーヒー、キムチ、赤ワイン）を避けてください</li>
<li>効果は6〜12ヶ月持続します</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 | 明洞K-Beautyストリートのすぐ近く</p>` }
    ],
    faq: [
      { q: 'ホワイトニングはどのくらいで終わりますか？', a: 'エクスプレスは30分、プレミアムは約1時間です。ショッピングの合間にどうぞ！' },
      { q: '韓国のホワイトニングは安全ですか？', a: 'はい。日本や米国と同じ承認済みホワイトニング剤を使用し、歯科医師が施術します。DIYキットより格段に安全です。' },
      { q: '施術後に焼肉は食べられますか？', a: '48時間は色の濃い食べ物を避けることをお勧めします。白いご飯、豆腐、淡白な料理は問題ありません。' }
    ],
    ctaText: 'K-Beautyスマイルを手に入れる',
    ctaSubtext: '予約不要 · 1時間で完了 · ₩150,000〜',
    priceRange: '₩150,000 – ₩300,000'
  },

  // ===== 3. 歯科検診・クリーニング =====
  {
    slug: 'ja/dental-checkup-cleaning-seoul',
    lang: 'ja', heroEmoji: '🔍',
    title: '歯科検診・クリーニング ソウル明洞｜安い・早い・英文レポート付き',
    metaDesc: 'ソウルで歯科検診＆クリーニング。パノラマX線込みで₩80,000〜（約8,800円〜）。日本の半額以下。英文レポート発行。明洞エリア、予約不要。ハッピーイェイン歯科。',
    h1: '歯科検診＆クリーニング — ソウルで賢くヘルスチェック',
    keywords: '歯科検診 ソウル, クリーニング 韓国, 歯石除去 明洞, 韓国 歯科 安い, 歯科 定期検診 ソウル 外国人',
    introParagraph: `韓国旅行の合間に<strong>歯の健康チェック</strong>はいかがですか？<strong>ハッピーイェイン歯科</strong>の歯科検診は、パノラマX線 + プロフェッショナルクリーニングが<strong>日本の半額以下</strong>。30〜45分で完了し、帰国後にかかりつけ医に見せられる<strong>英文レポート</strong>もお渡しします。`,
    sections: [
      { heading: '📋 検診内容', content: `<ul>
<li><strong>口腔内総合検査</strong> — 歯・歯茎・噛み合わせ・顎関節</li>
<li><strong>パノラマX線撮影</strong> — 全体のレントゲン</li>
<li><strong>虫歯チェック</strong> — 早期発見で大きな治療を予防</li>
<li><strong>歯周病チェック</strong> — 歯茎の健康状態を確認</li>
<li><strong>プロフェッショナルクリーニング（スケーリング）</strong></li>
<li><strong>ポリッシング</strong> — 歯の表面を滑らかに</li>
<li><strong>英文レポート</strong> — 検査結果を書面でお渡し</li>
</ul>` },
      { heading: '💰 料金', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">内容</th><th style="padding:10px 12px;text-align:left;">費用</th><th style="padding:10px 12px;text-align:left;">日本円目安</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">診察 + パノラマX線</td><td style="padding:8px 12px;">₩30,000〜50,000</td><td style="padding:8px 12px;">約3,300〜5,500円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">スケーリング（クリーニング）</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">約5,500〜11,000円</td></tr>
<tr><td style="padding:8px 12px;"><strong>検診＋クリーニングセット</strong></td><td style="padding:8px 12px;"><strong>₩80,000〜150,000</strong></td><td style="padding:8px 12px;"><strong>約8,800〜16,500円</strong></td></tr>
</table>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>月〜金: 09:30〜18:30 | 水: 09:30〜20:00 | 土: 09:30〜14:00</p>
<p>🚇 会賢駅1番出口 徒歩2分</p>` }
    ],
    faq: [
      { q: '検診はどのくらい時間がかかりますか？', a: '検診＋クリーニングで約30〜45分です。' },
      { q: '英文レポートはもらえますか？', a: 'はい、検査結果とX線画像を英文でお渡しします。帰国後のかかりつけ医への引き継ぎに便利です。' },
      { q: '虫歯が見つかったらどうなりますか？', a: 'X線で説明し、治療オプションと費用をお伝えします。韓国で治療する（日本より安い）か、帰国後にかかりつけ医で治療するか選べます。' }
    ],
    ctaText: '歯科検診を受ける',
    ctaSubtext: '30〜45分で完了 · ₩80,000〜 · 予約不要',
    priceRange: '₩50,000 – ₩150,000'
  },

  // ===== 4. 被せ物が取れた =====
  {
    slug: 'ja/lost-crown-filling-seoul',
    lang: 'ja', heroEmoji: '👑',
    title: '被せ物・詰め物が取れた ソウル明洞｜即日修復・予約不要',
    metaDesc: '旅行中に被せ物や詰め物が取れた？ハッピーイェイン歯科は明洞で即日再接着。20分で修復可能、₩50,000〜。予約不要、会賢駅徒歩2分。',
    h1: '被せ物・詰め物が取れた — 明洞で即日修復',
    keywords: '被せ物 取れた ソウル, クラウン 脱離 韓国, 詰め物 外れた 明洞, 歯科 即日修復 ソウル',
    introParagraph: `旅行中に<strong>被せ物（クラウン）が取れた</strong>、<strong>詰め物が外れた</strong>。食事も不便だし、見た目も気になりますよね。<strong>ハッピーイェイン歯科</strong>なら、<strong>20分で再接着</strong>可能。予約不要で明洞エリアからすぐアクセスできます。`,
    sections: [
      { heading: '🔧 対応可能な処置', content: `<ul>
<li><strong>クラウン再接着</strong> — お持ちの被せ物を20分で再装着（₩50,000〜）</li>
<li><strong>仮歯の作成</strong> — 被せ物をなくした場合の保護措置</li>
<li><strong>詰め物のやり直し</strong> — コンポジットレジンで30〜40分</li>
<li><strong>インレー・アンレー修復</strong></li>
</ul>` },
      { heading: '💡 被せ物は持ってきてください！', content: `<p>取れた被せ物は<strong>捨てないでください</strong>。多くの場合、再接着が可能です。</p>
<ul>
<li>小さな袋やティッシュに包んで保管</li>
<li>接着剤で自分で付けるのは<strong>NG</strong>（歯と被せ物が傷みます）</li>
<li>飲み込んでしまった場合も問題ありません — 新しい仮歯を作ります</li>
</ul>` },
      { heading: '💰 費用', content: `<ul>
<li>クラウン再接着: ₩50,000〜100,000（約5,500〜11,000円）</li>
<li>仮歯作成: ₩100,000〜200,000（約11,000〜22,000円）</li>
<li>詰め物やり直し: ₩80,000〜200,000（約8,800〜22,000円）</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 | 予約不要・すぐ対応</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '再接着にかかる時間は？', a: '被せ物をお持ちであれば約20分です。新しい仮歯が必要な場合は30〜60分です。' },
      { q: '飛行機に乗っても大丈夫ですか？', a: '再接着後は通常通りフライト可能です。ただし、露出した歯のまま飛ぶと気圧変化で痛みが出ることがあるため、早めの治療をお勧めします。' }
    ],
    ctaText: '今すぐ修復する',
    ctaSubtext: '20分で再接着 · 予約不要',
    priceRange: '₩50,000 – ₩200,000'
  },

  // ===== 5. 歯痛 =====
  {
    slug: 'ja/toothache-seoul',
    lang: 'ja', heroEmoji: '😫',
    title: '歯の痛み ソウル｜当日痛み止め・緊急治療｜明洞の歯科',
    metaDesc: 'ソウル旅行中に歯が痛い？ハッピーイェイン歯科で1時間以内に痛み解消。当日診断・治療、予約不要。明洞・会賢駅徒歩2分。',
    h1: '歯が痛い — ソウルで1時間以内に痛み解消',
    keywords: '歯痛 ソウル, 歯が痛い 韓国 旅行, 明洞 歯科 緊急, ソウル 歯 痛い どうする, 韓国 歯医者 当日',
    introParagraph: `せっかくの韓国旅行なのに<strong>歯が痛い</strong>…。ホテルで痛みに耐えるのはもうやめましょう。<strong>ハッピーイェイン歯科</strong>なら、<strong>1時間以内</strong>に原因を特定して痛みを止めます。予約不要、痛みのある方を優先的にお通しします。`,
    sections: [
      { heading: '⚡ 痛み解消の流れ', content: `<ol>
<li><strong>来院</strong> — 痛みの方を優先的にご案内</li>
<li><strong>デジタルX線</strong> — 5分で原因特定</li>
<li><strong>即時痛み止め</strong> — 局所麻酔＋薬</li>
<li><strong>治療</strong> — 充填、根管治療、抜歯など</li>
<li><strong>アフターケア</strong> — 処方箋＋ケア指示書</li>
</ol>` },
      { heading: '🔍 歯痛の主な原因', content: `<ul>
<li><strong>虫歯</strong> — 最も多い原因。充填やクラウンで治療</li>
<li><strong>歯のひび</strong> — 硬い食べ物で割れることも。クラウンやボンディングで対応</li>
<li><strong>歯の膿瘍</strong> — 感染症。抗生物質＋排膿が必要</li>
<li><strong>親知らず</strong> — 部分的に生えて炎症を起こすことも</li>
<li><strong>歯周病</strong> — 歯茎の炎症による痛み</li>
</ul>` },
      { heading: '💊 応急処置（来院前に）', content: `<ul>
<li><strong>イブプロフェン</strong>（이부프로펜） — 韓国の薬局（약국）で購入可能。400mg服用</li>
<li><strong>冷湿布</strong> — 頬の外側に10分間当てる</li>
<li><strong>ぬるま湯で塩水うがい</strong> — 小さじ1杯の塩をぬるま湯に</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>
<p>🚇 会賢駅1番出口 徒歩2分 · 明洞駅 徒歩5分</p>` }
    ],
    faq: [
      { q: '夜中に歯が痛くなったらどうすれば？', a: 'イブプロフェンを服用し、冷湿布で対応してください。翌朝一番でご来院ください。極めて重度の場合はソウルの夜間救急歯科がありますが、費用は高めです。' },
      { q: '明日帰国なのですが今日中に治療できますか？', a: 'はい！緊急治療は当日完了できます。複雑なケースでも応急処置をして、帰国後の治療用の書類をお渡しします。' }
    ],
    ctaText: '今すぐ痛みを止める',
    ctaSubtext: '痛みの方優先 · 予約不要 · 1時間以内',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== 6. インプラント =====
  {
    slug: 'ja/dental-implant-seoul',
    lang: 'ja', heroEmoji: '🔩',
    title: 'インプラント ソウル韓国｜日本の半額・ソウル大専門医｜ハッピーイェイン歯科',
    metaDesc: 'ソウルでインプラント治療。Osstem ₩1,200,000〜（約132,000円〜）。日本の半額以下。ソウル大学出身の専門医、CT完備。明洞・会賢駅徒歩2分。',
    h1: 'インプラント治療 — 韓国で日本の半額以下',
    keywords: 'インプラント ソウル, インプラント 韓国 費用, 韓国 歯科 インプラント, ソウル インプラント 安い, デンタルツーリズム 韓国',
    introParagraph: `韓国は<strong>世界一のインプラント大国</strong>。人口あたりのインプラント施術数は世界最多で、技術と経験が桁違いです。<strong>ハッピーイェイン歯科</strong>では、ソウル大学出身のインプラント専門医が、<strong>オステム、ストローマン、ノーベルバイオケア</strong>の各種システムを<strong>日本の半額以下</strong>でご提供します。`,
    sections: [
      { heading: '💎 インプラント料金', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">システム</th><th style="padding:10px 12px;text-align:left;">1本あたり</th><th style="padding:10px 12px;text-align:left;">日本円目安</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">オステム（韓国製プレミアム）</td><td style="padding:8px 12px;">₩1,200,000〜1,500,000</td><td style="padding:8px 12px;">約132,000〜165,000円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">ストローマン（スイス製）</td><td style="padding:8px 12px;">₩1,800,000〜2,200,000</td><td style="padding:8px 12px;">約198,000〜242,000円</td></tr>
<tr><td style="padding:8px 12px;">ノーベルバイオケア（スウェーデン製）</td><td style="padding:8px 12px;">₩2,000,000〜2,500,000</td><td style="padding:8px 12px;">約220,000〜275,000円</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">※ 日本でのインプラント相場: 1本30〜50万円。韓国なら半額以下！</p>
<p><strong>料金に含まれるもの：</strong>フィクスチャー + アバットメント + クラウン + CT検査 + 全フォローアップ</p>` },
      { heading: '📅 治療スケジュール（旅行者向け）', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第1回渡韓（1〜2日間）:</strong> カウンセリング + CT → インプラント埋入手術 → 術後チェック
</div>
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第2回渡韓（3〜6ヶ月後）:</strong> 治癒確認 → アバットメント＋クラウン装着
</div>
</div>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '短期旅行でもインプラントできますか？', a: '埋入手術は当日可能です（1〜2時間）。ただし最終的なクラウン装着は3〜6ヶ月後になるため、2回の渡韓が必要です。即時荷重（その日にクラウン装着）が可能な場合もあります。' },
      { q: 'どのメーカーがおすすめですか？', a: 'コストパフォーマンスならオステム（韓国製）がおすすめです。プレミアムな場合はストローマンやノーベルバイオケアをご提案します。' },
      { q: '痛いですか？', a: '局所麻酔で術中の痛みはありません。術後は2〜3日程度の軽い痛みがありますが、処方薬で十分管理できます。' }
    ],
    ctaText: 'インプラント無料相談',
    ctaSubtext: 'CT検査 · 治療プラン · 費用見積もり — 1回の来院で',
    priceRange: '₩1,200,000 – ₩2,500,000'
  },

  // ===== 7. 韓国 歯科 費用比較 =====
  {
    slug: 'ja/dental-cost-korea-guide',
    lang: 'ja', heroEmoji: '💰',
    title: '韓国 歯科 費用ガイド｜日本・米国・豪州と徹底比較 2026年版',
    metaDesc: '韓国の歯科治療費を日本・米国・豪州と徹底比較。インプラント、ホワイトニング、根管治療etc。2026年最新価格。50〜80%お得！ハッピーイェイン歯科。',
    h1: '韓国の歯科費用 — 日本・米国・豪州と徹底比較',
    keywords: '韓国 歯科 費用, 韓国 歯医者 安い, デンタルツーリズム 韓国 費用, ソウル 歯科 料金, 韓国 歯科 日本 比較',
    introParagraph: `「韓国の歯医者は安い」とよく聞きますが、<strong>具体的にどのくらい安い</strong>のでしょうか？この2026年版ガイドでは、韓国・日本・米国・豪州の歯科治療費を<strong>項目別に徹底比較</strong>します。結論：<strong>50〜80%お得</strong>です。`,
    sections: [
      { heading: '📊 料金比較表', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:0.82rem;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 6px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">治療内容</th><th style="padding:10px 6px;text-align:center;">🇰🇷 韓国</th><th style="padding:10px 6px;text-align:center;">🇯🇵 日本</th><th style="padding:10px 6px;text-align:center;">🇺🇸 米国</th></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">検診+X線</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">3,300〜5,500円</td><td style="padding:8px 6px;text-align:center;">3,000〜5,000円</td><td style="padding:8px 6px;text-align:center;">22,500〜45,000円</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">クリーニング</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">5,500〜11,000円</td><td style="padding:8px 6px;text-align:center;">5,000〜10,000円</td><td style="padding:8px 6px;text-align:center;">15,000〜30,000円</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">充填（レジン）</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">8,800〜22,000円</td><td style="padding:8px 6px;text-align:center;">5,000〜15,000円</td><td style="padding:8px 6px;text-align:center;">30,000〜75,000円</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">根管治療</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">22,000〜44,000円</td><td style="padding:8px 6px;text-align:center;">10,000〜30,000円</td><td style="padding:8px 6px;text-align:center;">105,000〜225,000円</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">クラウン</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">33,000〜66,000円</td><td style="padding:8px 6px;text-align:center;">50,000〜130,000円</td><td style="padding:8px 6px;text-align:center;">150,000〜300,000円</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">インプラント</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">132,000〜275,000円</td><td style="padding:8px 6px;text-align:center;">300,000〜500,000円</td><td style="padding:8px 6px;text-align:center;">450,000〜900,000円</td></tr>
<tr><td style="padding:8px 6px;border-bottom:1px solid rgba(255,255,255,0.05);">ホワイトニング</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">16,500〜33,000円</td><td style="padding:8px 6px;text-align:center;">30,000〜70,000円</td><td style="padding:8px 6px;text-align:center;">75,000〜150,000円</td></tr>
<tr><td style="padding:8px 6px;">ラミネートベニア</td><td style="padding:8px 6px;text-align:center;color:#F7BA18;font-weight:700;">55,000〜110,000円</td><td style="padding:8px 6px;text-align:center;">80,000〜150,000円</td><td style="padding:8px 6px;text-align:center;">225,000〜450,000円</td></tr>
</table>
<p style="font-size:0.8rem;color:#aaa;">※ 日本は自費診療の場合の目安です。保険適用の場合は異なります。2026年6月更新。</p>` },
      { heading: '✈️ デンタルツーリズムのメリット', content: `<p><strong>例：インプラント2本の場合</strong></p>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:20px;border-radius:12px;margin:12px 0;">
<p>🇯🇵 <strong>日本:</strong> 2本 × 40万円 = <span style="color:#ff6b6b;">80万円</span></p>
<p>🇰🇷 <strong>韓国:</strong> 2本 × 15万円 + 航空券5万円 + ホテル3万円 = <span style="color:#F7BA18;">38万円</span></p>
<p style="font-size:1.1rem;font-weight:700;color:#F7BA18;margin-top:12px;">💰 旅費込みでも42万円お得！しかも韓国旅行も楽しめる！</p>
</div>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F（明洞エリア）</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'なぜ韓国の歯科は安いのですか？', a: '人件費や運営コストが低い上、歯科材料メーカー（オステム等）が国内にあり、政府規制による基本治療の価格管理も効いています。品質は世界トップレベルです。' },
      { q: '品質は日本と同じですか？', a: '韓国は医療品質で世界トップ5に入ります。当院のドクターはソウル大学出身で、使用する材料・機器は日本やアメリカの一流クリニックと同等です。' },
      { q: '日本語は通じますか？', a: '基本的な案内は可能ですが、詳細な説明は英語でのコミュニケーションとなります。翻訳アプリの使用も歓迎しています。' }
    ],
    ctaText: '無料見積もりを取得',
    ctaSubtext: '明瞭会計 · 予約不要 · 英語OK',
  },

  // ===== 8. 土曜日の歯医者 =====
  {
    slug: 'ja/saturday-dentist-myeongdong',
    lang: 'ja', heroEmoji: '📅',
    title: '土曜日の歯医者 明洞ソウル｜09:30〜14:00営業・予約不要',
    metaDesc: '土曜日にソウルで歯医者をお探しですか？ハッピーイェイン歯科は毎週土曜09:30〜14:00営業。明洞ショッピングのついでに。予約不要、会賢駅徒歩2分。',
    h1: '土曜日の歯医者 — 明洞で09:30〜14:00',
    keywords: '土曜日 歯医者 ソウル, 週末 歯科 明洞, 土曜 歯科 韓国, ソウル 歯医者 土曜営業',
    introParagraph: `土曜日は明洞でショッピング！…そんな時に限って<strong>歯が痛む</strong>ことも。<strong>ハッピーイェイン歯科</strong>は毎週土曜日<strong>09:30〜14:00</strong>まで営業しています。明洞の中心でお買い物の合間にお気軽にどうぞ。`,
    sections: [
      { heading: '⏰ 診療スケジュール', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;">曜日</th><th style="padding:10px 12px;text-align:left;">診療時間</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">月・火・木・金</td><td style="padding:8px 12px;">09:30〜18:30</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>水曜日</strong></td><td style="padding:8px 12px;"><strong>09:30〜20:00</strong> 🌙</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>土曜日</strong></td><td style="padding:8px 12px;"><strong>09:30〜14:00</strong> ✅</td></tr>
<tr><td style="padding:8px 12px;">日曜・祝日</td><td style="padding:8px 12px;">休診</td></tr>
</table>` },
      { heading: '🦷 土曜日に受けられる治療', content: `<ul>
<li>🚨 応急処置（歯痛、歯の破損、クラウン脱離）</li>
<li>🔍 検診＆クリーニング</li>
<li>✨ ホワイトニング（1時間で完了）</li>
<li>🦷 充填（詰め物）</li>
<li>💊 痛み止め＆処方</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 | 南大門市場＆明洞のすぐ近く</p>` }
    ],
    faq: [
      { q: '土曜日は予約が必要ですか？', a: '予約不要ですが、土曜は午後2時まで短縮営業のため、お電話いただけるとスムーズです。' },
      { q: '日曜日に緊急の場合は？', a: '日曜は休診です。ソウルの夜間・休日救急歯科をご利用いただくか、月曜朝にご来院ください。' }
    ],
    ctaText: '土曜日にお越しください',
    ctaSubtext: '09:30〜14:00 · 予約不要 · 明洞',
  },

  // ===== 9. 旅行保険と歯科 =====
  {
    slug: 'ja/travel-insurance-dental-korea',
    lang: 'ja', heroEmoji: '🛡️',
    title: '海外旅行保険で韓国の歯科治療｜英文書類発行・保険請求サポート',
    metaDesc: '韓国で歯科治療を受けた場合の旅行保険の使い方。英文診断書・領収書を即日発行。保険請求の流れを解説。ハッピーイェイン歯科（明洞）。',
    h1: '海外旅行保険で歯科治療 — 書類発行＆請求ガイド',
    keywords: '海外旅行保険 歯科 韓国, 旅行保険 歯 韓国, 韓国 歯科 英文書類, 歯科 保険請求 海外',
    introParagraph: `韓国旅行中に<strong>歯の緊急事態</strong>が発生。海外旅行保険は使えるの？<strong>ハッピーイェイン歯科</strong>では、保険請求に必要な<strong>英文の診断書・領収書・X線画像</strong>をすべて<strong>当日お渡し</strong>します。`,
    sections: [
      { heading: '✅ 旅行保険で通常カバーされるもの', content: `<ul>
<li><strong>緊急歯科治療</strong> — 突然の歯痛、歯の破損、詰め物の脱落</li>
<li><strong>事故による歯のケガ</strong> — 転倒、スポーツ、交通事故</li>
<li><strong>応急処置</strong> — 痛み止めの処方</li>
</ul>
<p style="margin-top:12px;"><strong style="color:#ff6b6b;">通常カバーされないもの：</strong></p>
<ul>
<li>既往症（旅行前から存在する問題）</li>
<li>美容目的（ホワイトニング、ベニア）</li>
<li>計画的な治療（デンタルツーリズム）</li>
</ul>` },
      { heading: '📋 当院が発行する書類', content: `<ul>
<li>📄 <strong>英文明細付き領収書</strong> — 治療コード・内容の詳細記載</li>
<li>📄 <strong>英文診断書</strong> — 緊急性と医学的必要性を記載</li>
<li>🦷 <strong>X線画像</strong> — デジタルデータ（USBまたはメール送信）</li>
<li>📄 <strong>治療記録</strong></li>
</ul>
<p><strong>すべて治療費に含まれています（追加料金なし）。</strong></p>` },
      { heading: '📝 保険請求の手順', content: `<ol>
<li>保険会社に<strong>事故報告</strong>（多くの場合24時間以内）</li>
<li>当院で<strong>治療を受ける</strong></li>
<li><strong>書類一式を受け取る</strong>（当日お渡し）</li>
<li>窓口で<strong>お支払い</strong>（後日保険金請求）</li>
<li>書類を保険会社に<strong>提出</strong>（期限は通常30〜90日以内）</li>
</ol>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '窓口で一旦自費で支払う必要がありますか？', a: 'はい、ほとんどの海外旅行保険は「立て替え→請求」方式です。当院での支払い後、書類を保険会社に送って払い戻しを受けます。' },
      { q: '書類はいつもらえますか？', a: '治療当日にすべてお渡しします。待ち時間はありません。' }
    ],
    ctaText: '緊急治療 + 保険書類発行',
    ctaSubtext: '英文書類当日発行 · 追加料金なし',
  },

  // ===== 10. 英語OK歯科 =====
  {
    slug: 'ja/english-speaking-dentist-seoul',
    lang: 'ja', heroEmoji: '🌍',
    title: '外国人OK 歯医者 ソウル明洞｜ソウル大出身・英語対応｜ハッピーイェイン歯科',
    metaDesc: 'ソウルで外国人対応の歯医者をお探しですか？ハッピーイェイン歯科は明洞・会賢駅徒歩2分。ソウル大学出身の専門医チーム。英語対応、全診療科目OK。',
    h1: '外国人OK — ソウル明洞の歯医者',
    keywords: '外国人 歯医者 ソウル, 英語 歯科 明洞, ソウル 歯科 外国人対応, 韓国 歯医者 英語, 明洞 デンタルクリニック',
    introParagraph: `ソウルで<strong>信頼できる歯医者</strong>を探すのは外国人にとって大変。言葉の壁、品質への不安…。<strong>ハッピーイェイン歯科</strong>は、ソウルで最も外国人フレンドリーなエリアである<strong>明洞・会賢</strong>に位置し、<strong>英語でのコミュニケーション</strong>が可能です。`,
    sections: [
      { heading: '👨‍⚕️ ドクター紹介', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>ハン・スンデ院長</strong><br>
ソウル大学歯学部（学士・修士）· 統合歯科専門医<br>
専門: インプラント、全顎修復、複雑な補綴
</div>
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>シン・ジョンヒ先生</strong><br>
ソウル大学 · 歯内治療専門医<br>
専門: 根管治療、コンポジット修復、マイクロスコープ治療
</div>
<div style="background:rgba(255,255,255,0.03);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">
<strong>パク・ヒョンミ先生</strong><br>
ソウル大学 · 矯正歯科専門医<br>
専門: マウスピース矯正、ブラケット矯正、噛み合わせ修正
</div>
</div>` },
      { heading: '🦷 診療科目', content: `<ul>
<li>🚨 <strong>緊急歯科</strong> — 当日対応</li>
<li>🔍 <strong>検診＆クリーニング</strong></li>
<li>🔩 <strong>インプラント</strong> — ₩1,200,000〜</li>
<li>✨ <strong>ホワイトニング</strong></li>
<li>📐 <strong>矯正歯科</strong> — マウスピース＆ブラケット</li>
<li>🎨 <strong>審美歯科</strong> — ベニア、ボンディング</li>
<li>🔬 <strong>根管治療</strong> — 25倍マイクロスコープ使用</li>
</ul>` },
      { heading: '💳 お支払い・保険', content: `<ul>
<li>✅ 現金（KRW）、クレジットカード（VISA, Mastercard, JCB, AMEX, UnionPay）</li>
<li>✅ 英文領収書・診断書（旅行保険用）</li>
<li>✅ 明瞭な料金説明 — 治療前に見積もりを提示</li>
<li>✅ 韓国国民健康保険対応（加入者の方）</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 | 🚇 明洞駅 徒歩5分</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '日本語は通じますか？', a: '基本的な案内は可能ですが、詳細な説明は英語でのコミュニケーションとなります。翻訳アプリのご使用も歓迎しています。' },
      { q: '外国人でも韓国で歯科治療を受けられますか？', a: 'もちろんです！韓国はデンタルツーリズムの世界的な人気国。当院は日常的に観光客、駐在員、留学生を診療しています。' },
      { q: '予約は必要ですか？', a: '予約不要です。特に緊急の場合はそのままお越しください。非緊急の場合はお電話いただけるとスムーズです。' }
    ],
    ctaText: '今すぐ予約・来院',
    ctaSubtext: '英語対応 · 予約不要 · 全診療科目',
  },
]
