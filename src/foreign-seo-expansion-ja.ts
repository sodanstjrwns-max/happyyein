// =============================================
// 외국인 SEO 대확장 — JAPANESE Pages (Phase F)
// 일본어 10페이지: 응급 · 관광치과 · 미백 · 검진 · 임플란트 · 비용 · 보험 · 토요일 · 야간 · 발치
// =============================================

import type { ForeignPage } from './foreign-emergency-seo'

const CLINIC_TEL = '+82-2-756-2828'

export const EXPANSION_JA_PAGES: ForeignPage[] = [

  // ===== 1. 親知らず抜歯 (Wisdom Tooth) =====
  {
    slug: 'ja/wisdom-tooth-extraction-seoul',
    lang: 'ja', heroEmoji: '🦷',
    title: 'ソウルで親知らず抜歯｜当日対応・日本語案内｜ハッピーイェイン歯科 明洞',
    metaDesc: 'ソウル旅行中に親知らずが痛む？ハッピーイェイン歯科は明洞・会賢駅徒歩2分。当日CT撮影・診断・抜歯対応。ソウル大学出身の専門医。日本より50-70%お得。',
    h1: 'ソウルで親知らず抜歯 — 当日対応可能',
    keywords: '親知らず 抜歯 ソウル, 親知らず 痛い 韓国旅行, 韓国 歯科 親知らず, 明洞 歯医者 抜歯, ソウル 歯科 外国人 親知らず',
    introParagraph: `旅行中に<strong>親知らずが急に痛み出した</strong>方へ。ハッピーイェイン歯科は明洞の中心、会賢駅1番出口から徒歩2分。<strong>当日CT撮影・診断・抜歯</strong>に対応しています。ソウル大学校出身の口腔外科専門医が安全に施術します。韓国での親知らず抜歯は<strong>日本の約半額</strong>。`,
    sections: [
      { heading: '🔍 こんな症状がある方', content: `<ul>
<li><strong>奥歯の痛み・腫れ</strong> — 親知らずの炎症の可能性</li>
<li><strong>口が開きにくい</strong> — 智歯周囲炎の症状</li>
<li><strong>食べ物が詰まる</strong> — 半分だけ生えた親知らず</li>
<li><strong>隣の歯が痛い</strong> — 親知らずが押している可能性</li>
<li><strong>繰り返す感染</strong> — 抗生物質では一時的な改善のみ</li>
</ul>` },
      { heading: '⚡ 当日抜歯の流れ', content: `<ol>
<li><strong>来院・受付</strong> — 予約不要、痛みのある方優先対応</li>
<li><strong>パノラマX線 + CT撮影</strong> — 親知らずの位置を正確に把握（10分）</li>
<li><strong>説明</strong> — 治療計画と費用を説明（日本語サポート）</li>
<li><strong>局所麻酔</strong> — 施術中の痛みはありません</li>
<li><strong>抜歯</strong> — 単純抜歯: 15-30分 ｜ 埋伏抜歯: 30-60分</li>
<li><strong>アフターケア</strong> — 注意事項の説明、痛み止め・抗生物質処方</li>
</ol>` },
      { heading: '💰 親知らず抜歯の費用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">施術内容</th><th style="padding:10px 12px;text-align:left;">費用（ウォン）</th><th style="padding:10px 12px;text-align:left;">日本円（目安）</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">単純抜歯</td><td style="padding:8px 12px;">₩100,000〜200,000</td><td style="padding:8px 12px;">約11,000〜22,000円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">埋伏歯の外科的抜歯</td><td style="padding:8px 12px;">₩200,000〜400,000</td><td style="padding:8px 12px;">約22,000〜44,000円</td></tr>
<tr><td style="padding:8px 12px;">CT撮影 + 診察</td><td style="padding:8px 12px;">₩50,000〜80,000</td><td style="padding:8px 12px;">約5,500〜8,800円</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">※ 日本での親知らず抜歯（自費）: 約15,000〜50,000円。韓国は同等以下の費用で対応。</p>` },
      { heading: '✈️ 抜歯後のフライトについて', content: `<ul>
<li><strong>単純抜歯</strong> — 24〜48時間後のフライトは通常問題なし</li>
<li><strong>外科的抜歯</strong> — 可能であれば48〜72時間お待ちください</li>
<li><strong>帰国時の備品</strong> — 予備のガーゼ、痛み止め、英文の術後ケアシートをお渡しします</li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 ｜ 明洞駅 徒歩5分</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '埋伏した親知らずも当日抜歯できますか？', a: 'CT撮影で状態を確認し、多くの場合は当日対応可能です。神経に非常に近い難症例は、後日の手術をお勧めする場合があります。' },
      { q: '抜歯は痛いですか？', a: '局所麻酔を使用するため、施術中は痛みを感じません。術後は2-3日間軽い痛みがありますが、処方する痛み止めで管理できます。' },
      { q: '4本まとめて抜けますか？', a: '同じ側の2本は一度に抜歯可能です。観光中の方には、回復を考慮して片側ずつをお勧めしています。' },
      { q: '帰国後のフォローアップは？', a: '詳細な術後記録と注意事項をお渡しします。帰国後にかかりつけの歯科医に見せていただければスムーズです。' }
    ],
    ctaText: '親知らずの診察を予約',
    ctaSubtext: 'CT撮影・当日抜歯対応 · 予約不要',
    priceRange: '₩100,000 – ₩400,000'
  },

  // ===== 2. ホワイトニング (Whitening) =====
  {
    slug: 'ja/teeth-whitening-myeongdong',
    lang: 'ja', heroEmoji: '✨',
    title: '明洞でホワイトニング｜1時間で完了・韓国価格でお得｜ハッピーイェイン歯科',
    metaDesc: '明洞でプロのホワイトニング。1時間で4-8トーン白く。日本の半額以下の韓国価格。K-beauty体験の仕上げに最適！予約不要・当日OK。ハッピーイェイン歯科。',
    h1: '明洞でホワイトニング — K-beautyスマイル',
    keywords: 'ホワイトニング 明洞, 韓国 ホワイトニング 安い, ソウル 歯 ホワイトニング, 明洞 歯科 ホワイトニング, K-beauty ホワイトニング 韓国',
    introParagraph: `K-beautyの本場・明洞で<strong>スマイルもアップグレード</strong>しませんか？ハッピーイェイン歯科のプロフェッショナルホワイトニングは<strong>わずか1時間</strong>で4〜8トーン白く。日本の歯科ホワイトニング料金の<strong>約半額以下</strong>。ショッピングの合間に、白く輝く笑顔を手に入れましょう。`,
    sections: [
      { heading: '💎 ホワイトニングメニュー', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">⚡ エクスプレス ホワイトニング</strong> — 30分、2〜4トーンアップ<br>
お時間のない方に最適。<br>
<span style="color:#F7BA18;font-weight:700;">₩150,000（約16,500円）</span>
</div>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:16px;border-radius:12px;">
<strong style="color:#F7BA18;">✨ プレミアム ホワイトニング</strong> — 60分、4〜8トーンアップ<br>
LED照射による本格的ホワイトニング。最大効果。<br>
<span style="color:#F7BA18;font-weight:700;">₩300,000（約33,000円）</span>
</div>
<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);padding:16px;border-radius:12px;">
<strong>🏠 テイクホームキット</strong> — カスタムトレー + ホワイトニングジェル<br>
2週間かけて段階的に白く。オフィスホワイトニングとの併用がおすすめ。<br>
<span style="color:#F7BA18;font-weight:700;">₩200,000（約22,000円）</span>
</div>
</div>
<p style="font-size:0.85rem;color:#aaa;margin-top:12px;">※ 日本のオフィスホワイトニング相場: 30,000〜80,000円。韓国なら半額以下！</p>` },
      { heading: '⏱️ 施術の流れ', content: `<ol>
<li><strong>カウンセリング</strong> — 現在のシェード確認（10分）</li>
<li><strong>クリーニング</strong> — 表面の汚れを除去（15分）</li>
<li><strong>ホワイトニングジェル塗布</strong> — プロ用過酸化水素ジェル</li>
<li><strong>LED照射</strong> — 1サイクル15〜20分 × 2〜3回</li>
<li><strong>完成!</strong> — 新しいシェードを確認。明洞で写真を撮りましょう📸</li>
</ol>` },
      { heading: '⚠️ 施術後の注意点', content: `<ul>
<li>24〜48時間は軽い知覚過敏が出ることがあります（知覚過敏用歯磨き粉をお渡しします）</li>
<li>48時間は着色しやすい食べ物・飲み物を避けてください（コーヒー、ワイン、キムチチゲなど）</li>
<li>効果は適切なケアで6〜12ヶ月持続</li>
</ul>` },
      { heading: '📍 明洞のど真ん中！', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 ｜ K-beauty ショッピングの合間に！</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'ホワイトニングは何分かかりますか？', a: 'エクスプレスは30分、プレミアムは約1時間です。ショッピングの合間にお気軽にどうぞ！' },
      { q: '痛みはありますか？', a: '施術中の痛みはほとんどありません。施術後24-48時間は軽い知覚過敏が出ることがありますが、一時的なものです。' },
      { q: 'ホワイトニング後に焼肉は食べられますか？', a: '48時間は着色しやすい食べ物を控えることをお勧めします。白米、豆腐、淡い色の食べ物は問題ありません。' },
      { q: '虫歯があってもホワイトニングできますか？', a: '施術前に口腔チェックを行います。未治療の虫歯がある場合は先に治療をお勧めすることがあります。' }
    ],
    ctaText: '今すぐホワイトニング',
    ctaSubtext: '予約不要 · 1時間で完了 · ₩150,000〜',
    priceRange: '₩150,000 – ₩300,000'
  },

  // ===== 3. 歯科検診・クリーニング (Checkup) =====
  {
    slug: 'ja/dental-checkup-cleaning-seoul',
    lang: 'ja', heroEmoji: '🔍',
    title: 'ソウルで歯科検診・クリーニング｜デジタルX線込み ₩80,000〜｜明洞',
    metaDesc: 'ソウル旅行中に歯科検診。パノラマX線・歯石除去込みで₩80,000〜。日本の半額以下。結果は英文レポートでお渡し。予約不要。ハッピーイェイン歯科 明洞。',
    h1: 'ソウルで歯科検診・プロのクリーニング',
    keywords: '歯科検診 ソウル, 歯石除去 韓国, スケーリング 明洞, 歯科クリーニング 韓国 安い, 旅行中 歯科検診 ソウル',
    introParagraph: `韓国の<strong>驚くほどお手頃な歯科医療</strong>を賢く活用しませんか？ハッピーイェイン歯科での総合検診 + クリーニングは日本の<strong>約半額以下</strong>。デジタルX線による精密診断と英文レポート付き。明洞観光の合間に30〜45分で完了します。`,
    sections: [
      { heading: '📋 検診内容', content: `<ul>
<li><strong>総合口腔検査</strong> — 歯・歯茎・噛み合わせ・顎関節</li>
<li><strong>デジタルパノラマX線</strong> — 全歯・顎骨の全体像</li>
<li><strong>虫歯チェック</strong> — 問題を早期発見</li>
<li><strong>歯周病検査</strong> — 歯茎の健康状態</li>
<li><strong>プロのスケーリング</strong> — 歯石・プラーク除去</li>
<li><strong>ポリッシング</strong> — 歯面を滑らかに仕上げ</li>
<li><strong>英文レポート</strong> — 帰国後かかりつけ医に見せられます</li>
</ul>` },
      { heading: '💰 検診料金 — 日本より断然お得', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">メニュー</th><th style="padding:10px 12px;text-align:left;">費用</th><th style="padding:10px 12px;text-align:left;">日本円目安</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">診察 + パノラマX線</td><td style="padding:8px 12px;">₩30,000〜50,000</td><td style="padding:8px 12px;">約3,300〜5,500円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">スケーリング（歯石除去）</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">約5,500〜11,000円</td></tr>
<tr><td style="padding:8px 12px;"><strong>検診 + クリーニング パッケージ</strong></td><td style="padding:8px 12px;"><strong>₩80,000〜150,000</strong></td><td style="padding:8px 12px;"><strong>約8,800〜16,500円</strong></td></tr>
</table>` },
      { heading: '💡 ソウルで検診をお勧めする理由', content: `<ul>
<li>🦷 帰国前に虫歯を発見 → 日本で高額治療になる前に対処</li>
<li>💰 同じ品質で日本の半額以下</li>
<li>🏥 CT・デジタルX線など最新設備</li>
<li>📄 英文レポート付きでかかりつけ医への共有も簡単</li>
<li>⏱️ 30〜45分で完了 — 観光の合間にサクッと</li>
</ul>` },
      { heading: '📍 予約不要・当日OK', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>月〜金: 09:30–18:30 ｜ 水: 09:30–20:00 ｜ 土: 09:30–14:00</p>
<p>🚇 会賢駅1番出口 徒歩2分</p>` }
    ],
    faq: [
      { q: '検診にどれくらい時間がかかりますか？', a: '検診 + クリーニングで約30〜45分です。CT撮影が必要な場合は+10〜15分。' },
      { q: '結果を日本の歯科医に見せられますか？', a: 'はい！英文の所見レポートとX線画像データをお渡しします。帰国後にかかりつけ医に共有いただけます。' },
      { q: '虫歯が見つかった場合は？', a: 'X線で説明し、治療オプションと費用をお伝えします。韓国で治療（日本より安い）するか、レポートを持ち帰って日本で治療するかお選びいただけます。' }
    ],
    ctaText: '検診を予約する',
    ctaSubtext: '検診+クリーニング ₩80,000〜 · 予約不要',
    priceRange: '₩50,000 – ₩150,000'
  },

  // ===== 4. インプラント (Implant) =====
  {
    slug: 'ja/dental-implant-seoul',
    lang: 'ja', heroEmoji: '🔩',
    title: 'ソウルでインプラント｜日本の半額・ソウル大出身専門医｜ハッピーイェイン歯科',
    metaDesc: 'ソウルでインプラント治療。Osstem・Straumann・Nobel Biocare対応。1本₩1,200,000〜。日本の約半額。ソウル大学校出身のインプラント専門医。明洞 会賢駅徒歩2分。',
    h1: 'ソウルでインプラント — 日本の半額で世界水準の治療',
    keywords: 'インプラント ソウル, 韓国 インプラント 費用, インプラント 韓国 安い, 明洞 インプラント, 韓国 歯科 インプラント ツーリズム',
    introParagraph: `韓国は<strong>世界で最もインプラントが普及している国</strong>。人口あたりのインプラント埋入数は世界一で、豊富な経験を持つ専門医が揃っています。ハッピーイェイン歯科では、<strong>ソウル大学校出身の専門医</strong>がOsstem・Straumann・Nobel Biocareなどの世界的システムを使用。日本の<strong>約半額〜3分の1</strong>の費用で同等以上の治療を受けられます。`,
    sections: [
      { heading: '💎 インプラント費用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">システム</th><th style="padding:10px 12px;text-align:left;">費用（1本）</th><th style="padding:10px 12px;text-align:left;">日本円目安</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Osstem（韓国プレミアム）</td><td style="padding:8px 12px;">₩1,200,000〜1,500,000</td><td style="padding:8px 12px;">約132,000〜165,000円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">Straumann（スイス）</td><td style="padding:8px 12px;">₩1,800,000〜2,200,000</td><td style="padding:8px 12px;">約198,000〜242,000円</td></tr>
<tr><td style="padding:8px 12px;">Nobel Biocare（スウェーデン）</td><td style="padding:8px 12px;">₩2,000,000〜2,500,000</td><td style="padding:8px 12px;">約220,000〜275,000円</td></tr>
</table>
<p style="font-size:0.85rem;color:#aaa;">※ 日本のインプラント相場: 1本 約300,000〜500,000円。韓国は同等品質で約半額です。</p>
<p><strong>費用に含まれるもの:</strong> インプラント体 + アバットメント + クラウン + CT撮影 + 全てのフォローアップ</p>` },
      { heading: '🏆 なぜ韓国でインプラント？', content: `<ul>
<li><strong>世界一の実績</strong> — 韓国は人口あたりインプラント数が世界最多</li>
<li><strong>Osstemは韓国生まれ</strong> — 世界第3位のインプラントメーカー</li>
<li><strong>最新技術</strong> — CTガイド手術、デジタルプランニング</li>
<li><strong>ソウル大学出身の専門医</strong> — 韓国最高の医学教育</li>
<li><strong>約半額の費用</strong> — 航空券・ホテル代を含めても大幅節約</li>
</ul>` },
      { heading: '📅 旅行者向けスケジュール', content: `<div style="display:grid;gap:12px;">
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第1回目の訪韓（1-2日）:</strong> 診察 + CT撮影 → インプラント埋入手術 → 術後チェック<br>
<span style="font-size:0.85rem;color:#aaa;">滞在目安: 2-3日</span>
</div>
<div style="background:rgba(247,186,24,0.04);padding:16px;border-radius:12px;border:1px solid rgba(247,186,24,0.12);">
<strong style="color:#F7BA18;">第2回目の訪韓（3-6ヶ月後）:</strong> 治癒確認 → アバットメント + クラウン装着<br>
<span style="font-size:0.85rem;color:#aaa;">滞在目安: 2-3日</span>
</div>
</div>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 ｜ 明洞駅 徒歩5分</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '短期旅行でインプラントは可能ですか？', a: 'インプラント埋入手術は初日に可能です（1-2時間）。ただし最終的なクラウン装着は3-6ヶ月後の治癒後になるため、2回の訪韓が必要です。即時荷重（同日クラウン）が可能な場合もありますのでご相談ください。' },
      { q: 'どのメーカーがおすすめですか？', a: '多くの患者様にはOsstemが品質とコストのバランスに優れています。より高級なケースではStraumannやNobel Biocareをご案内します。骨の状態により最適なものをお勧めします。' },
      { q: '痛みはありますか？', a: '局所麻酔で施術中は痛みを感じません。術後2-3日は軽い痛みがありますが、処方薬で管理可能です。' },
      { q: '全顎インプラントもできますか？', a: 'はい。院長のハン先生は全顎リハビリテーションの専門家です。All-on-4、All-on-6にも対応しています。' }
    ],
    ctaText: 'インプラント無料相談',
    ctaSubtext: 'CT撮影 · 治療計画 · 費用見積もり — 1回の来院で',
    priceRange: '₩1,200,000 – ₩2,500,000'
  },

  // ===== 5. 韓国 歯科治療費 ガイド (Cost Guide) =====
  {
    slug: 'ja/dental-cost-korea-guide',
    lang: 'ja', heroEmoji: '💰',
    title: '韓国の歯科治療費ガイド｜日本 vs 韓国 完全比較 2026年版',
    metaDesc: '韓国と日本の歯科治療費を完全比較。インプラント・クラウン・ホワイトニング・根管治療が韓国で50-70%安い理由と料金表。2026年最新版。ハッピーイェイン歯科。',
    h1: '韓国vs日本 歯科治療費 完全比較ガイド 2026',
    keywords: '韓国 歯科 費用, 韓国 歯医者 安い, 韓国 インプラント 費用 比較, 韓国 歯科ツーリズム, ソウル 歯科 料金表',
    introParagraph: `「韓国の歯科は安い」と聞いたことはありませんか？<strong>実際にどれくらいお得なのか</strong>、日本の相場と完全比較します。結論: ハッピーイェイン歯科（明洞）では、日本の<strong>50〜70%オフ</strong>で同等以上の治療を受けられます。`,
    sections: [
      { heading: '📊 治療費 完全比較表', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:0.85rem;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 8px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">治療内容</th><th style="padding:10px 8px;text-align:center;">🇰🇷 韓国</th><th style="padding:10px 8px;text-align:center;">🇯🇵 日本（自費）</th><th style="padding:10px 8px;text-align:center;">節約率</th></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">検診 + X線</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩30,000〜50,000</td><td style="padding:8px;text-align:center;">5,000〜15,000円</td><td style="padding:8px;text-align:center;">約30-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">スケーリング</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩50,000〜100,000</td><td style="padding:8px;text-align:center;">8,000〜20,000円</td><td style="padding:8px;text-align:center;">約30-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">コンポジット充填</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩80,000〜200,000</td><td style="padding:8px;text-align:center;">10,000〜50,000円</td><td style="padding:8px;text-align:center;">約30-60%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">根管治療</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩200,000〜400,000</td><td style="padding:8px;text-align:center;">30,000〜100,000円</td><td style="padding:8px;text-align:center;">約30-50%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">セラミッククラウン</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩400,000〜600,000</td><td style="padding:8px;text-align:center;">80,000〜150,000円</td><td style="padding:8px;text-align:center;">約40-60%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">インプラント</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩1,200,000〜2,500,000</td><td style="padding:8px;text-align:center;">300,000〜500,000円</td><td style="padding:8px;text-align:center;">約50-60%</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">ホワイトニング</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩150,000〜300,000</td><td style="padding:8px;text-align:center;">30,000〜80,000円</td><td style="padding:8px;text-align:center;">約40-60%</td></tr>
<tr><td style="padding:8px;">ラミネートベニア（1本）</td><td style="padding:8px;text-align:center;color:#F7BA18;font-weight:700;">₩500,000〜800,000</td><td style="padding:8px;text-align:center;">80,000〜150,000円</td><td style="padding:8px;text-align:center;">約40-50%</td></tr>
</table>
<p style="font-size:0.8rem;color:#aaa;">※ 韓国の料金はハッピーイェイン歯科の自費診療価格。日本は自費診療の一般的な相場。2026年6月現在。</p>` },
      { heading: '✈️ 歯科ツーリズムは本当にお得？', content: `<p><strong>インプラント2本</strong>の場合で計算:</p>
<div style="background:rgba(247,186,24,0.04);border:1px solid rgba(247,186,24,0.12);padding:20px;border-radius:12px;margin:12px 0;">
<p><strong>日本:</strong> 2本 × 400,000円 = <span style="color:#ff6b6b;">800,000円</span></p>
<p><strong>韓国:</strong> 2本 × 150,000円 + 航空券(30,000円) + ホテル3泊(30,000円) = <span style="color:#F7BA18;">360,000円</span></p>
<p style="font-size:1.1rem;font-weight:700;color:#F7BA18;margin-top:12px;">💰 約440,000円の節約 — 旅費込みでも半額以下！</p>
</div>` },
      { heading: '🏥 ハッピーイェイン歯科の強み', content: `<ul>
<li>✅ <strong>ソウル大学校出身の専門医チーム</strong></li>
<li>✅ <strong>CT・デジタルX線・手術用マイクロスコープ</strong>完備</li>
<li>✅ <strong>明洞の好立地</strong> — 観光のついでに通院</li>
<li>✅ <strong>日本語サポート</strong> — 治療説明・費用説明</li>
<li>✅ <strong>明朗会計</strong> — 治療前に費用を提示、追加料金なし</li>
<li>✅ <strong>海外旅行保険用の書類</strong> — 英文の領収書・診断書発行</li>
</ul>` },
      { heading: '📍 ご来院ください', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: 'なぜ韓国の歯科はこんなに安いのですか？', a: '運営コストの低さ、政府による基本治療の価格規制、歯科クリニックの激しい競争、そしてOsstemなど世界的歯科メーカーが国内にあることが要因です。品質は世界トップクラスです。' },
      { q: '品質は日本と同等ですか？', a: '韓国は医療品質で世界トップ5に常にランクインしています。当院の医師はソウル大学校出身で、世界と同じ材料・機器を使用しています。' },
      { q: '日本語は通じますか？', a: '治療説明、費用説明の際に日本語サポートがあります。詳細な書類は英文で発行します。' },
      { q: '海外旅行保険は使えますか？', a: '英文の領収書・診断書を発行しますので、帰国後に保険会社に請求できます。補償範囲はご加入の保険によります。' }
    ],
    ctaText: '無料で費用見積もり',
    ctaSubtext: '来院相談 · 明朗会計 · 日本語サポート',
  },

  // ===== 6. 歯の膿瘍・顔の腫れ (Abscess) =====
  {
    slug: 'ja/dental-abscess-swollen-face',
    lang: 'ja', heroEmoji: '🔴',
    title: '歯の膿瘍・顔の腫れ ソウルで緊急治療｜明洞 当日対応',
    metaDesc: 'ソウルで歯が腫れた・膿がある？ハッピーイェイン歯科で緊急対応。当日の切開排膿・抗生物質処方・痛み止め。明洞 会賢駅徒歩2分。予約不要・優先対応。',
    h1: '歯の膿瘍・顔の腫れ — ソウルで緊急治療',
    keywords: '歯 膿 ソウル, 顔 腫れ 歯科 韓国, 歯の膿瘍 治療 明洞, 歯茎 腫れ 韓国旅行, 歯科感染 緊急 ソウル',
    introParagraph: `<strong>歯の膿瘍</strong>は最も深刻な歯科緊急事態の一つ。顔が腫れて激痛があり、感染が広がる危険性も。<strong>すぐにご来院ください。</strong>ハッピーイェイン歯科では<strong>当日の切開排膿、抗生物質処方、痛み止め</strong>に対応。膿瘍の患者さんは優先対応します。`,
    sections: [
      { heading: '🚨 こんな症状があればすぐに来院', content: `<ul>
<li>😰 <strong>頬・顎・顔の腫れ</strong> — 特に悪化している場合</li>
<li>🤒 <strong>発熱</strong> — 感染が広がっているサイン</li>
<li>😫 <strong>ズキズキとした持続的な痛み</strong> — 鎮痛剤が効かない</li>
<li>🦷 <strong>膿や嫌な味</strong> — 口の中に膿が出ている</li>
<li>😮 <strong>口が開きにくい・飲み込みにくい</strong> — 緊急性が高い</li>
</ul>
<p style="color:#ff6b6b;font-weight:700;margin-top:12px;">⚠️ 呼吸困難や飲み込みが極端に困難な場合は119（韓国の救急番号）に電話してください。</p>` },
      { heading: '⚡ 治療の流れ', content: `<ol>
<li><strong>即座の診察</strong> — X線で膿瘍の位置を特定</li>
<li><strong>痛み止め</strong> — 局所麻酔と投薬</li>
<li><strong>切開排膿</strong> — 膿が溜まっている場合</li>
<li><strong>抗生物質処方</strong> — 感染をコントロール</li>
<li><strong>原因の治療</strong> — 感染が落ち着いた後に根管治療または抜歯</li>
<li><strong>アフターケア</strong> — 注意事項を説明</li>
</ol>` },
      { heading: '💰 治療費', content: `<ul>
<li>緊急診察 + X線: ₩30,000〜50,000（約3,300〜5,500円）</li>
<li>切開排膿: ₩50,000〜100,000（約5,500〜11,000円）</li>
<li>抗生物質処方: ₩10,000〜30,000（約1,100〜3,300円）</li>
<li>根管治療（必要な場合）: ₩200,000〜400,000（約22,000〜44,000円）</li>
</ul>` },
      { heading: '📍 優先対応します', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a> — 「膿瘍」とお伝えください。優先対応します。</p>` }
    ],
    faq: [
      { q: '膿瘍は危険ですか？', a: 'はい。放置すると顎や首、血管に感染が広がる可能性があります。当日の治療をお勧めします。' },
      { q: '膿瘍がある状態で飛行機に乗れますか？', a: '未治療の膿瘍でのフライトはお勧めしません。まず治療を受け、抗生物質が効き始めてから（通常24-48時間後）のフライトをお勧めします。' },
      { q: '治療にどれくらいかかりますか？', a: '初期の緊急治療（排膿+抗生物質）は30〜60分です。根本原因の治療（根管治療や抜歯）は別日の場合があります。' }
    ],
    ctaText: '緊急治療を受ける',
    ctaSubtext: '優先対応 · 当日排膿 · 抗生物質処方',
    priceRange: '₩30,000 – ₩400,000'
  },

  // ===== 7. 土曜日の歯医者 (Saturday) =====
  {
    slug: 'ja/saturday-dentist-myeongdong',
    lang: 'ja', heroEmoji: '📅',
    title: '明洞の土曜日の歯医者｜09:30-14:00営業｜予約不要',
    metaDesc: '土曜日に歯医者をお探しですか？ハッピーイェイン歯科は毎週土曜09:30-14:00営業。明洞・会賢駅徒歩2分。応急処置・検診・ホワイトニング対応。予約不要。',
    h1: '明洞で土曜日の歯科 — 09:30〜14:00',
    keywords: '土曜日 歯医者 明洞, 週末 歯科 ソウル, 土曜 歯医者 韓国, 明洞 歯科 土曜日, ソウル 歯医者 週末',
    introParagraph: `<strong>土曜日の明洞</strong>はショッピングで大賑わい。そんな時に歯のトラブルが起きたら？ハッピーイェイン歯科は毎週土曜日 <strong>09:30〜14:00</strong> に営業中。予約不要、当日対応可能です。`,
    sections: [
      { heading: '⏰ 診療時間', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">曜日</th><th style="padding:10px 12px;text-align:left;">診療時間</th><th style="padding:10px 12px;text-align:left;">備考</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">月・火・木・金</td><td style="padding:8px 12px;">09:30 – 18:30</td><td style="padding:8px 12px;">通常診療</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>水曜日</strong></td><td style="padding:8px 12px;"><strong>09:30 – 20:00</strong></td><td style="padding:8px 12px;color:#F7BA18;font-weight:700;">🌙 夜間診療！</td></tr>
<tr style="background:rgba(247,186,24,0.04);"><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>土曜日</strong></td><td style="padding:8px 12px;"><strong>09:30 – 14:00</strong></td><td style="padding:8px 12px;color:#F7BA18;font-weight:700;">✅ 営業中！</td></tr>
<tr><td style="padding:8px 12px;">日・祝日</td><td style="padding:8px 12px;">休診</td><td style="padding:8px 12px;">—</td></tr>
</table>` },
      { heading: '🦷 土曜日に対応可能な治療', content: `<ul>
<li>🚨 <strong>応急処置</strong> — 歯痛・歯の破損・被せ物の脱離</li>
<li>🔍 <strong>検診・クリーニング</strong> — 総合検診 + スケーリング</li>
<li>🦷 <strong>詰め物・修復</strong> — コンポジット充填、仮歯</li>
<li>✨ <strong>ホワイトニング</strong> — 1時間で完了</li>
<li>💊 <strong>痛み止め処方</strong></li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 ｜ 南大門市場・明洞のすぐそば</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '土曜日は予約が必要ですか？', a: '予約不要です。ただし土曜は14:00までと短いため、お電話いただけると確実です。' },
      { q: '日曜に歯が痛くなったら？', a: '日曜は休診です。可能であれば土曜午前中のご来院をお勧めします。緊急の場合はソウルの24時間救急歯科をご案内します。' }
    ],
    ctaText: '土曜日にご来院ください',
    ctaSubtext: '09:30〜14:00 · 予約不要 · 明洞',
  },

  // ===== 8. 水曜夜間 (Wednesday Night) =====
  {
    slug: 'ja/night-dentist-wednesday',
    lang: 'ja', heroEmoji: '🌙',
    title: '明洞の夜間歯科｜水曜20時まで営業｜ハッピーイェイン歯科',
    metaDesc: '仕事の後や夕食の後に歯医者に行きたい？ハッピーイェイン歯科は毎週水曜20時まで夜間診療。明洞・会賢駅徒歩2分。予約不要・緊急対応OK。',
    h1: '明洞の夜間歯科 — 水曜20時まで',
    keywords: '夜間 歯医者 明洞, 夜間診療 歯科 ソウル, 水曜 夜 歯科 韓国, 遅くまで開いてる歯医者 ソウル',
    introParagraph: `一日中ソウル観光を楽しんだ後に歯が痛くなった？日中は忙しくて歯医者に行けなかった？ハッピーイェイン歯科は<strong>毎週水曜日は20時まで夜間診療</strong>。仕事帰りや夕食後でも大丈夫です。`,
    sections: [
      { heading: '🌙 水曜夜間の診療時間', content: `<div style="background:rgba(247,186,24,0.06);border:1px solid rgba(247,186,24,0.15);padding:24px;border-radius:16px;text-align:center;">
<p style="font-size:1.3rem;font-weight:800;font-family:'Syne',sans-serif;">毎週水曜日</p>
<p style="font-size:2rem;font-weight:800;color:#F7BA18;font-family:'Syne',sans-serif;">09:30 – 20:00</p>
<p style="color:#B5B0A8;font-size:0.85rem;">初診の方の最終受付: 19:00</p>
</div>` },
      { heading: '🦷 水曜夜間に対応可能', content: `<ul>
<li>🚨 <strong>緊急治療</strong> — 痛み止め・歯の破損・被せ物の応急処置</li>
<li>🔍 <strong>検診・X線</strong> — 夜間の簡単チェック</li>
<li>✨ <strong>ホワイトニング</strong> — 1時間エクスプレス</li>
<li>🦷 <strong>詰め物・簡単な処置</strong></li>
<li>📋 <strong>インプラント・矯正の相談</strong></li>
</ul>` },
      { heading: '📍 アクセス', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分 ｜ 明洞駅 徒歩5分</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '水曜夜は何時まで受付ですか？', a: '初診の方は19:00まで。お電話いただければ、それ以降も対応可能な場合があります。' },
      { q: '夜間でも全ての治療を受けられますか？', a: '応急処置、検診、ホワイトニング、相談は可能です。複雑な手術は通常の診療時間をお勧めすることがあります。' }
    ],
    ctaText: '水曜夜にご来院',
    ctaSubtext: '20時まで · 予約不要',
  },

  // ===== 9. 被せ物が取れた (Lost Crown — expanded) =====
  {
    slug: 'ja/lost-crown-filling-seoul',
    lang: 'ja', heroEmoji: '👑',
    title: 'ソウルで被せ物・詰め物が取れた｜20分で再接着｜明洞の歯医者',
    metaDesc: '韓国旅行中に被せ物が取れた？詰め物が外れた？ハッピーイェイン歯科は明洞で20分の再接着に対応。予約不要・当日対応・外国人歓迎。会賢駅徒歩2分。',
    h1: '被せ物・詰め物が取れた？20分で再接着',
    keywords: '被せ物 取れた ソウル, クラウン 外れた 韓国, 詰め物 取れた 明洞, 被せ物 再接着 韓国旅行, 歯科 修復 明洞',
    introParagraph: `旅行中に<strong>被せ物（クラウン）が取れた</strong>、<strong>詰め物が外れた</strong> — 焦りますよね。でもご安心ください。ハッピーイェイン歯科では<strong>20分で再接着</strong>対応。予約不要です。`,
    sections: [
      { heading: '🔧 当日対応メニュー', content: `<ul>
<li><strong>クラウン再接着</strong> — お持ちの被せ物を20分で再装着（₩50,000〜）</li>
<li><strong>仮歯作成</strong> — 被せ物を紛失された場合、保護用の仮歯を作成</li>
<li><strong>詰め物の交換</strong> — コンポジット（歯色）充填（30-40分）</li>
<li><strong>インレー・アンレー修復</strong></li>
</ul>` },
      { heading: '💡 被せ物が取れたら', content: `<p><strong>被せ物を保管してください！</strong>多くの場合、元の被せ物を再接着できます。小さな袋やティッシュに包んでお持ちください。</p>
<ul>
<li>❌ 瞬間接着剤は使わないでください — 歯と被せ物の両方を傷めます</li>
<li>⚠️ その側では噛まないでください</li>
<li>🥤 熱い・冷たい飲食物は避けてください</li>
<li>💊 痛みがあれば市販のイブプロフェン（薬局で入手可能）</li>
</ul>` },
      { heading: '💰 費用', content: `<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr style="background:rgba(247,186,24,0.08);"><th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">内容</th><th style="padding:10px 12px;text-align:left;">費用</th><th style="padding:10px 12px;text-align:left;">日本円目安</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">クラウン再接着</td><td style="padding:8px 12px;">₩50,000〜100,000</td><td style="padding:8px 12px;">約5,500〜11,000円</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">仮歯作成</td><td style="padding:8px 12px;">₩100,000〜200,000</td><td style="padding:8px 12px;">約11,000〜22,000円</td></tr>
<tr><td style="padding:8px 12px;">コンポジット充填</td><td style="padding:8px 12px;">₩80,000〜200,000</td><td style="padding:8px 12px;">約8,800〜22,000円</td></tr>
</table>` },
      { heading: '📍 予約不要', content: `<p><strong>ソウル市中区南大門路9キル51 ヒョドクビル3F</strong></p>
<p>🚇 会賢駅1番出口 徒歩2分</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '被せ物の再接着にいくらかかりますか？', a: '₩50,000〜100,000（約5,500〜11,000円）です。新しい仮歯の場合は₩100,000〜200,000。' },
      { q: '被せ物を飲み込んでしまいました', a: '心配ありません。安全に排出されます。来院いただければ新しい仮歯を作成します。' },
      { q: '飛行機に被せ物なしで乗れますか？', a: '可能ですが、露出した歯は気圧変化に敏感です。フライト前に仮歯の装着をお勧めします。' }
    ],
    ctaText: '被せ物の修復はお任せ',
    ctaSubtext: '20分で再接着 · 予約不要',
    priceRange: '₩50,000 – ₩200,000'
  },

  // ===== 10. 旅行保険と歯科治療 (Insurance) =====
  {
    slug: 'ja/travel-insurance-dental-korea',
    lang: 'ja', heroEmoji: '🛡️',
    title: '韓国での歯科治療と海外旅行保険｜保険書類の発行｜ハッピーイェイン歯科',
    metaDesc: 'ソウルで歯科緊急事態。海外旅行保険は使える？ハッピーイェイン歯科では英文の領収書・診断書・X線を当日発行。保険請求をサポートします。明洞。',
    h1: '海外旅行保険と韓国の歯科治療',
    keywords: '海外旅行保険 歯科 韓国, 旅行保険 歯 ソウル, 韓国 歯科 保険 請求, 歯科 領収書 英文 韓国, 海外 歯の治療 保険',
    introParagraph: `ソウルで<strong>急な歯のトラブル</strong>が発生。海外旅行保険は使えるのか？どうやって請求するのか？このページでは、<strong>保険で何がカバーされるか</strong>、<strong>請求に必要な書類</strong>、そしてハッピーイェイン歯科が提供する<strong>保険請求サポート</strong>について説明します。`,
    sections: [
      { heading: '✅ 一般的にカバーされるもの', content: `<ul>
<li><strong>歯科緊急治療</strong> — 急な歯痛、歯の破損、詰め物の脱離</li>
<li><strong>事故による歯の外傷</strong> — 転倒、スポーツ事故、交通事故</li>
<li><strong>緊急の痛み止め</strong> — 投薬と応急処置</li>
<li><strong>緊急抜歯</strong> — 医学的に必要な場合</li>
</ul>
<p style="margin-top:12px;"><strong style="color:#ff6b6b;">通常カバーされないもの:</strong></p>
<ul>
<li>旅行前からの既往症</li>
<li>美容目的の処置（ホワイトニング、ベニアなど）</li>
<li>計画的な治療（歯科ツーリズム）</li>
<li>定期検診・クリーニング</li>
</ul>` },
      { heading: '📋 当院が提供する保険書類', content: `<ul>
<li>📄 <strong>英文の詳細領収書</strong> — 治療コードと内容を明記</li>
<li>📄 <strong>英文の診断書</strong> — 緊急性と医学的必要性を説明</li>
<li>🦷 <strong>X線画像データ</strong> — USBまたはメールで提供</li>
<li>📄 <strong>治療記録</strong> — 完全な治療ドキュメント</li>
<li>📋 <strong>保険請求フォームの記入サポート</strong></li>
</ul>
<p style="margin-top:8px;"><strong>全て無料</strong>で治療に含まれます。</p>` },
      { heading: '📝 保険請求の流れ', content: `<ol>
<li><strong>保険会社に連絡</strong> — できるだけ早く緊急事態を報告（24時間以内が求められる場合あり）</li>
<li><strong>治療を受ける</strong> — ハッピーイェイン歯科で緊急治療</li>
<li><strong>書類を受け取る</strong> — 領収書・診断書・X線を当日お渡し</li>
<li><strong>クリニックでお支払い</strong> — 多くの旅行保険は立替払い→後日精算方式</li>
<li><strong>帰国後に保険請求</strong> — 書類を保険会社に提出（通常30-90日以内）</li>
</ol>` },
      { heading: '💰 保険がなくても安心の料金', content: `<p>保険適用外でも、韓国の歯科料金は非常にリーズナブル:</p>
<ul>
<li>緊急診察 + X線: ₩30,000〜50,000（約3,300〜5,500円）</li>
<li>詰め物: ₩80,000〜200,000（約8,800〜22,000円）</li>
<li>クラウン再接着: ₩50,000〜100,000（約5,500〜11,000円）</li>
</ul>` },
      { heading: '📍 ご来院', content: `<p><strong>ハッピーイェイン歯科 — 明洞</strong></p>
<p>ソウル市中区南大門路9キル51 ヒョドクビル3F</p>
<p>📞 <a href="tel:${CLINIC_TEL}" style="color:#F7BA18;font-weight:700;">${CLINIC_TEL}</a></p>` }
    ],
    faq: [
      { q: '立替払いですか？直接請求できますか？', a: 'ほとんどの海外旅行保険は立替払い→後日精算方式です。クリニックでお支払いいただき、帰国後に保険会社へ請求していただきます。' },
      { q: '書類はいつもらえますか？', a: '治療当日にお渡しします。お待たせしません。' },
      { q: '保険会社指定の書式がありますが？', a: 'お持ちいただければ、医療情報欄の記入をお手伝いします。' }
    ],
    ctaText: '緊急治療 + 保険書類',
    ctaSubtext: '英文領収書 · 診断書 · X線 すべて当日発行',
  },
]
