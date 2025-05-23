// data/data_r3.js
// 令和3年度 (2021年) の製菓衛生師試験問題データ
// correctAnswer と explanation を追記・修正しました。
// 必ずPDFの解答一覧と照らし合わせ、内容の正確性をご確認ください。

export const quizDataR3 = [
  {
    year: 2021,
    category: "衛生法規",
    question: "衛生関係の法律とその目的の組合せで、誤っているものを一つ選べ。",
    options: [
      "食品衛生法 - 飲食に起因する衛生上の危害の発生防止による国民の健康保護",
      "健康増進法 - 地域保健対策の推進による地域住民の健康保持・増進",
      "食品表示法 - 食品表示の適正確保による一般消費者の利益の増進",
      "食品安全基本法 - 食品の安全性の確保に関する施策の総合的な推進"
    ],
    correctAnswer: "健康増進法 - 地域保健対策の推進による地域住民の健康保持・増進", // 解答: 2
    explanation: "健康増進法は、国民の健康の増進の総合的な推進に関し基本的な事項を定めるとともに、国民の栄養改善その他の国民の健康の増進を図るための措置を講じ、もって国民保健の向上を図ることを目的としています。「地域保健対策の推進」は主に地域保健法の目的です。したがって、選択肢2が誤りです。"
  },
  {
    year: 2021,
    category: "衛生法規",
    question: "製菓衛生師免許に関する記述について、正しいものを一つ選べ。",
    options: [
      "製菓衛生師免許を受けようとする者は、住所地と本籍地が異なる場合には、本籍地の都道府県知事に申請しなければならない。",
      "住所地の変更が生じたときは、30日以内に名簿の登録事項の訂正を申請しなければならない。",
      "製菓衛生師免許の取消処分を受けた場合、3年を経過しない者には免許が与えられない。",
      "製菓衛生師が麻薬、あへん、大麻または覚せい剤の中毒者であるときは、その免許を取り消されることがある。"
    ],
    correctAnswer: "製菓衛生師が麻薬、あへん、大麻または覚せい剤の中毒者であるときは、その免許を取り消されることがある。", // 解答: 4
    explanation: "1. 免許申請は、養成施設卒業者は卒業した養成施設の所在地、試験合格者は合格した試験地の都道府県知事に行います。2. 住所地の変更は名簿の訂正事項ではありません（本籍地都道府県名、氏名、性別の変更は訂正申請が必要）。3. 免許取消処分後、再免許が与えられない期間は通常2年です（状況により異なる場合あり）。4. は正しい記述です。したがって、正しいのは4です。"
  },
  {
    year: 2021,
    category: "衛生法規",
    question: "製菓衛生師法に関する記述について、( )の中に入れるべき字句の正しい組合せを一つ選べ。\n製菓衛生師法は、製菓衛生師の(A)を定めることにより菓子製造業に従事する者の(B)を向上させ、もって(C)に寄与することを目的とする。",
    options: [
      "A:資格, B:資質, C:公衆衛生の向上及び増進",
      "A:権利, B:地位, C:菓子産業の振興及び発展",
      "A:権利, B:資質, C:公衆衛生の向上及び増進",
      "A:資格, B:地位, C:菓子産業の振興及び発展"
    ],
    correctAnswer: "A:資格, B:資質, C:公衆衛生の向上及び増進", // 解答: 1
    explanation: "製菓衛生師法第1条には、「この法律は、製菓衛生師の資格を定めることにより菓子製造業に従事する者の資質を向上させ、もつて公衆衛生の向上及び増進に寄与することを目的とする。」と規定されています。したがって、A:資格、B:資質、C:公衆衛生の向上及び増進 となる選択肢1が正しいです。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "衛生統計に関する記述について、正しいものを一つ選べ。",
    options: [
      "人口動態統計は、5年ごとの国勢調査により集計される。",
      "出生率とは、人口10,000人に対する年間の出生数である。",
      "主要死因別にみた死亡率は、心疾患(高血圧症を除く)が最も高い。",
      "我が国の平均寿命は男女とも80歳を超えており、世界有数の長寿国となっている。"
    ],
    correctAnswer: "我が国の平均寿命は男女とも80歳を超えており、世界有数の長寿国となっている。", // 解答: 4
    explanation: "1. 人口動態統計は出生、死亡、婚姻、離婚などの届出に基づいて毎月集計されます。国勢調査は人口静態統計です。2. 出生率は通常、人口1,000人に対する年間の出生数で表されます。3. 主要死因の順位は年によって変動しますが、悪性新生物（がん）が長年第1位です。4. は正しい記述です。したがって、正しいのは4です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "住居環境に関する記述について、正しいものを一つ選べ。",
    options: [
      "太陽光を取り入れて室内を明るくすることを照明という。",
      "シックハウス症候群の原因となる代表的な化学物質は、アスベスト(石綿)である。",
      "室内の一酸化炭素濃度が増加すると頭痛やめまいがおこり、死に至る場合がある。",
      "室内の快適な湿度の目安は、20~30%である。"
    ],
    correctAnswer: "室内の一酸化炭素濃度が増加すると頭痛やめまいがおこり、死に至る場合がある。", // 解答: 3
    explanation: "1. 太陽光を取り入れるのは採光、人工光は照明です。2. シックハウス症候群の主な原因物質はホルムアルデヒドやVOC（揮発性有機化合物）です。アスベストは中皮腫などの原因となります。4. 室内の快適湿度は40～60%程度です。3. は正しい記述です。したがって、正しいのは3です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "感染症とその病原体の種類の組合せで、誤っているものを一つ選べ。",
    options: [
      "結核 - ウイルス",
      "コレラ - 細菌",
      "白癬(水虫) - 真菌",
      "マラリア - 原虫"
    ],
    correctAnswer: "結核 - ウイルス", // 解答: 1
    explanation: "結核の病原体は結核菌という細菌です。ウイルスではありません。他の組み合わせは正しいです。したがって、誤っているのは1です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "労働衛生に関する記述について、誤っているものを一つ選べ。",
    options: [
      "労働衛生に関する法律には、労働基準法と労働安全衛生法がある。",
      "労働基準法に基づき、事業者は労働者に一般健康診断を実施しなければならない。",
      "労働安全衛生法の改正により、職場におけるメンタルヘルス対策としてストレスチェックが義務化された。",
      "労働衛生管理として、作業環境管理、作業管理、健康管理の3つがある。"
    ],
    correctAnswer: "労働基準法に基づき、事業者は労働者に一般健康診断を実施しなければならない。", // 解答: 2
    explanation: "一般健康診断の実施義務は、労働安全衛生法に規定されています。労働基準法は労働条件の最低基準などを定めています。したがって、誤っているのは2です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "衛生害虫とそれに媒介される疾病の組合せで、正しいものを一つ選べ。",
    options: [
      "ゴキブリ - 疥癬",
      "ハエ - つつが虫病",
      "マダニ - 日本脳炎",
      "ノミ - ペスト"
    ],
    correctAnswer: "ノミ - ペスト", // 解答: 4
    explanation: "1. 疥癬はヒゼンダニが原因です。ゴキブリは食中毒菌などを運びます。2. つつが虫病はツツガムシ（ダニの一種）が媒介します。ハエは腸管系感染症などを媒介します。3. 日本脳炎は蚊（コガタアカイエカなど）が媒介します。マダニは日本紅斑熱やライム病などを媒介します。4. ペストはペスト菌に感染したネズミなどにつき、ノミが媒介します。したがって、正しいのは4です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "感染症に関する記述について、誤っているものを一つ選べ。",
    options: [
      "空気感染とは、せきやくしゃみなどにより、病原体を含む飛沫が直接他の人の口や鼻の粘膜に接触し、体内に入ることによって感染することをいう。",
      "感染症の予防は、感染源対策、感染経路対策および感受性対策の3つがある。",
      "感染症は、感染症法により1~5類感染症、指定感染症、新感染症および新型インフルエンザ等感染症に分類されている。",
      "病気の症状を示さない人でも、体内に病原体を持っていることがある。"
    ],
    correctAnswer: "空気感染とは、せきやくしゃみなどにより、病原体を含む飛沫が直接他の人の口や鼻の粘膜に接触し、体内に入ることによって感染することをいう。", // 解答: 1
    explanation: "選択肢1の記述は飛沫感染の説明です。空気感染（飛沫核感染）は、飛沫の水分が蒸発して軽くなった飛沫核が空気中を漂い、それを吸い込むことで感染します。したがって、誤っているのは1です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "生活習慣病に関する記述について、誤っているものを一つ選べ。",
    options: [
      "高血圧症になる主な要因は、塩分やアルコールの過剰摂取、肥満、運動不足などである。",
      "生活習慣病対策の一次予防は、早期発見・早期治療である。",
      "メタボリックシンドロームとは、内臓脂肪症候群のことである。",
      "悪性新生物(がん)の発生の原因として関わりが深いのは、喫煙と食事である。"
    ],
    correctAnswer: "生活習慣病対策の一次予防は、早期発見・早期治療である。", // 解答: 2
    explanation: "生活習慣病対策の一次予防は、健康増進、生活習慣の改善、発病予防などです。早期発見・早期治療は二次予防に該当します。したがって、誤っているのは2です。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "環境衛生に関する記述について、正しいものの組合せを一つ選べ。\nア 主に日常生活から排出される一般廃棄物の排出量は、減少傾向にある。\nイ 安全な飲料水の確保のため、上水道には、水道法により水道水質基準が定められている。\nウ 空気の主な組成は、酸素が約78%、窒素が約21%である。\nエ 産業廃棄物は、排出事業所のある市町村の責任で処理をしなければならない。",
    options: [
      "ア、イ",
      "イ、ウ",
      "ウ、エ",
      "ア、エ"
    ],
    correctAnswer: "ア、イ", // 解答: 1
    explanation: "ウ：空気の主な組成は窒素が約78%、酸素が約21%です。エ：産業廃棄物は、排出した事業者の責任で処理しなければなりません。アとイは正しい記述です。したがって、正しい組合せは1のア、イです。"
  },
  {
    year: 2021,
    category: "公衆衛生学",
    question: "健康に関する記述について、( )の中に入れるべき字句の正しい組合せを一つ選べ。\nWHO(世界保健機関)憲章では、健康について「健康とは、(A)、(B)そして(C)に完全に良好な状態であり、単に疾病や虚弱ではないという状態ではない。」と定義している。",
    options: [
      "A:肉体的, B:経済的, C:社会的",
      "A:経済的, B:精神的, C:文化的",
      "A:肉体的, B:精神的, C:社会的",
      "A:経済的, B:医学的, C:文化的"
    ],
    correctAnswer: "A:肉体的, B:精神的, C:社会的", // 解答: 3
    explanation: "WHOの健康の定義は、「健康とは、肉体的(A)、精神的(B)及び社会的(C)に完全に良好な状態（well-being）であり、単に疾病又は虚弱でないことではない。」です。したがって、正しい組合せは3です。"
  },
  {
    year: 2021,
    category: "栄養学",
    question: "炭水化物に関する記述について、正しいものの組合せを一つ選べ。\nア 糖質は、1gにつき 9kcalのエネルギーをもつ。\nイ 難消化性炭水化物(食物繊維)は、便秘を予防する効果がある。\nウ 炭水化物(糖質)をエネルギーとして消費するには、ビタミンAが必要である。\nエ 日本人の食事摂取基準(2020年版)では、1歳以上のすべての年齢で、総エネルギーの50~65%を炭水化物から摂取するよう、目標量が示されている。",
    options: [
      "ア、イ",
      "ア、ウ",
      "イ、エ",
      "ウ、エ"
    ],
    correctAnswer: "イ、エ", // 解答: 3
    explanation: "ア：糖質（炭水化物）は1gあたり約4kcalのエネルギーをもちます。9kcalは脂質です。ウ：糖質の代謝には主にビタミンB群（特にビタミンB1）が必要です。ビタミンAは視覚や皮膚の健康などに関与します。イとエは正しい記述です。したがって、正しい組合せは3のイ、エです。"
  },
  {
    year: 2021,
    category: "栄養学",
    question: "ビタミンとその主な欠乏症の組合せで、誤っているものを一つ選べ。",
    options: [
      "ビタミンB1 - 脚気",
      "ナイアシン - ペラグラ",
      "ビタミンC - 壊血病",
      "ビタミンD - 口角炎"
    ],
    correctAnswer: "ビタミンD - 口角炎", // 解答: 4
    explanation: "口角炎は主にビタミンB2やB6の欠乏で起こります。ビタミンDの欠乏症は、くる病（小児）や骨軟化症・骨粗鬆症（成人）です。他の組合せは正しいです。したがって、誤っているのは4です。"
  },
  {
    year: 2021,
    category: "栄養学",
    question: "炭水化物の体内での消化吸収に関する記述について、( )の中に入れるべき字句の正しい組合せを一つ選べ。\n食物中のでん粉は、唾液(A) および膵液(A)によって(B)に分解される。(B)は小腸微絨毛表面に局在するマルターゼによって、2分子のブドウ糖に分解されて腸壁から吸収される。",
    options: [
      "A:アミラーゼ, B:麦芽糖",
      "A:リパーゼ, B:モノグリセリド",
      "A:リパーゼ, B:麦芽糖",
      "A:アミラーゼ, B:モノグリセリド"
    ],
    correctAnswer: "A:アミラーゼ, B:麦芽糖", // 解答: 1
    explanation: "でんぷんは、唾液や膵液に含まれるアミラーゼ(A)によって、主に麦芽糖(B)（マルトース）やデキストリンに分解されます。麦芽糖は小腸でマルターゼによってブドウ糖2分子に分解されて吸収されます。したがって、正しい組合せは1です。"
  },
  {
    year: 2021,
    category: "栄養学",
    question: "体内のホルモンとその主な作用の組合せで、正しいものを一つ選べ。",
    options: [
      "アドレナリン - 胃酸分泌",
      "インスリン - 血糖値低下",
      "グルカゴン - 血圧低下",
      "ガストリン - 血糖値上昇"
    ],
    correctAnswer: "インスリン - 血糖値低下", // 解答: 2
    explanation: "1. アドレナリンは血糖値上昇、心拍数増加など。3. グルカゴンは血糖値上昇。4. ガストリンは胃酸分泌促進。インスリンは血糖値を低下させる唯一のホルモンです。したがって、正しいのは2です。"
  },
  {
    year: 2021,
    category: "栄養学",
    question: "無機質に関する記述について、誤っているものを一つ選べ。",
    options: [
      "無機質は、体内では合成されないため食物から摂取する必要がある。",
      "カリウムは、主に細胞中に存在し、細胞内液の浸透圧が一定に保たれるように調節する。",
      "カルシウムは、体内にある約50%が骨と歯に存在する。",
      "鉄は、主に赤血球のヘモグロビン、筋肉のミオグロビン及び肝臓のフェリチンに含まれる。"
    ],
    correctAnswer: "カルシウムは、体内にある約50%が骨と歯に存在する。", // 解答: 3
    explanation: "体内のカルシウムの約99%は骨と歯に貯蔵されています。「約50%」という部分が誤りです。他の選択肢は正しい記述です。したがって、誤っているのは3です。"
  },
  {
    year: 2021,
    category: "栄養学",
    question: "容器包装に入れられた加工食品 (業務用を除く)を対象とした栄養成分表示において、表示が食品表示基準により義務付けられているものとして、誤っているものを一つ選べ。",
    options: [
      "エネルギー(熱量)",
      "ビタミン類",
      "たんぱく質",
      "食塩相当量"
    ],
    correctAnswer: "ビタミン類", // 解答: 2
    explanation: "栄養成分表示で義務付けられているのは、エネルギー、たんぱく質、脂質、炭水化物、食塩相当量です。ビタミン類やミネラル類は任意表示（ただし、栄養強調表示をする場合は表示義務が生じる）です。したがって、誤っているのは2です。"
  },
  {
    year: 2021,
    category: "食品学",
    question: "嗜好食品とその嗜好成分の組合せで、誤っているものを一つ選べ。",
    options: [
      "コーヒー - カフェイン",
      "ココア - テオブロミン",
      "ビール - フムロン",
      "緑茶 - シニグリン"
    ],
    correctAnswer: "緑茶 - シニグリン", // 解答: 4
    explanation: "シニグリンはアブラナ科の野菜（キャベツ、ワサビなど）に含まれる辛味成分です。緑茶の嗜好成分としてはカフェイン、テアニン、カテキンなどがあります。したがって、誤っているのは4です。"
  },
  {
    year: 2021,
    category: "食品学",
    question: "アレルゲンを含む食品の表示に関する記述について、( )の中に入れるべき数字の正しい組合せを一つ選べ。\n食品表示基準により、表示義務のある「特定原材料」として(A) 品目、表示が推奨される「特定原材料に準ずるもの」として( B ) 品目が指定されている。",
    options: [
      "A:5, B:21",
      "A:5, B:28",
      "A:7, B:21",
      "A:7, B:28"
    ],
    correctAnswer: "A:7, B:21", // 解答: 3 (2021年時点)
    explanation: "2021年時点では、特定原材料は7品目（えび、かに、小麦、そば、卵、乳、落花生）、特定原材料に準ずるものは21品目でした。したがって、A:7、B:21となる3が当時の正解です。（※その後、特定原材料に「くるみ」が追加され8品目になり、特定原材料に準ずるものも変動しています。試験年度に注意が必要です。）"
  },
  {
    year: 2021,
    category: "食品学",
    question: "次の食品の保存方法のうち、殺菌作用を含む方法として、正しいものの組合せを一つ選べ。\nア 塩蔵法\nイ 酢漬法\nウ くん煙法\nエ 砂糖漬け(糖蔵法)",
    options: [
      "ア、ウ",
      "ア、エ",
      "イ、ウ",
      "イ、エ"
    ],
    correctAnswer: "イ、ウ", // 解答: 3
    explanation: "酢漬法は酢の酸による静菌・殺菌作用があります。くん煙法は煙の成分（フェノール類、アルデヒド類など）による殺菌・防腐効果があります。塩蔵法や砂糖漬けは浸透圧により微生物の増殖を抑える静菌作用が主ですが、直接的な殺菌作用は弱いです。したがって、殺菌作用を含むのはイとウです。"
  },
  {
    year: 2021,
    category: "食品学",
    question: "食品表示基準における、遺伝子組換えに関する表示義務の対象農産物として、誤っているものを一つ選べ。",
    options: [
      "大豆",
      "とうもろこし",
      "パパイヤ",
      "トマト"
    ],
    correctAnswer: "トマト", // 解答: 4
    explanation: "遺伝子組換え表示義務の対象農産物として、大豆、とうもろこし、ばれいしょ、なたね、綿実、アルファルファ、てんさい、パパイヤがあります（2021年時点）。トマトは対象外です。したがって、誤っているのは4です。"
  },
  {
    year: 2021,
    category: "食品学",
    question: "食品保存の主な目的に関する記述について、誤っているものを一つ選べ。",
    options: [
      "食品の腐敗・変敗による損失を軽減する。",
      "食品の品質を低下させないで長期保存する。",
      "食品成分の分解による栄養素の破壊を防ぎ、栄養価を保持する。",
      "食品の嗜好性を高める。"
    ],
    correctAnswer: "食品の嗜好性を高める。", // 解答: 4
    explanation: "食品保存の主な目的は、品質保持、栄養価の維持、腐敗・変敗の防止、食中毒予防などです。「食品の嗜好性を高める」ことは、調理や加工の目的の一つではありますが、保存の主目的ではありません。したがって、誤っているのは4です。"
  },
  {
    year: 2021,
    category: "食品学",
    question: "次の表は、食料需給表における穀物の輸入量である。( )の中に入れるべき字句の正しい組合せを一つ選べ。\n| 品目 | 平成28年度 | 平成29年度 | 平成30年度 |\n|---|---|---|---|\n| (A) | 911 | 888 | 787 |\n| (B) | 5,624 | 5,939 | 5,638 |\n| (C) | 14,876 | 15,652 | 15,759 |",
    options: [
      "A:米, B:小麦, C:とうもろこし",
      "A:米, B:とうもろこし, C:小麦",
      "A:小麦, B:米, C:とうもろこし",
      "A:とうもろこし, B:小麦, C:米"
    ],
    correctAnswer: "A:米, B:小麦, C:とうもろこし", // 解答: 1
    explanation: "日本の穀物輸入量は、とうもろこしが最も多く（主に飼料用）、次いで小麦、米の順です。表の数値を見ると、(C)が最も多く、(B)が中間、(A)が最も少ないため、A:米、B:小麦、C:とうもろこし となる選択肢1が正しいです。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "食中毒に関する記述について、誤っているものを一つ選べ。",
    options: [
      "食中毒又はその疑いがある者を診断した医師は、直ちに保健所長に届け出る義務がある。",
      "細菌性食中毒予防の三原則とは、原因となる細菌を「つけない、増やさない、やっつける(殺す)」である。",
      "食中毒は7月に発生のピークがみられる。",
      "細菌性食中毒は、感染型と毒素型に分類される。"
    ],
    correctAnswer: "食中毒は7月に発生のピークがみられる。", // 解答: 3
    explanation: "食中毒の発生は年間を通して見られますが、細菌性食中毒は高温多湿な夏期（6月～9月頃）に多く、ノロウイルスなどのウイルス性食中毒は冬期（11月～2月頃）に多い傾向があります。「7月にピーク」とは限りません。したがって、誤っているのは3です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "ノロウイルスに関する記述について、正しいものを一つ選べ。",
    options: [
      "消毒にはアルコールが効果的である。",
      "カキなどの貝類、食品、河川水、海水中などで増殖する。",
      "ノロウイルスによる胃腸炎の症状が回復した後は、患者からノロウイルスは排出されない。",
      "食品の中心部が85~90℃で90秒間以上の加熱で不活化する。"
    ],
    correctAnswer: "食品の中心部が85~90℃で90秒間以上の加熱で不活化する。", // 解答: 4
    explanation: "1. ノロウイルスにアルコール消毒は効果が薄いです。次亜塩素酸ナトリウムが有効です。2. ノロウイルスは人の腸管内でのみ増殖します。3. 回復後も1週間～1ヶ月程度ウイルスが排出されることがあります。4. は正しい記述です。したがって、正しいのは4です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "カンピロバクター食中毒に関する記述について、誤っているものを一つ選べ。",
    options: [
      "数百個程度の菌でも発症することがある。",
      "潜伏期間は、6時間以内である。",
      "主な症状は、下痢・腹痛・発熱である。",
      "主な原因は、生の鶏肉料理(鳥刺し、鳥たたきなど)である。"
    ],
    correctAnswer: "潜伏期間は、6時間以内である。", // 解答: 2
    explanation: "カンピロバクターの潜伏期間は通常2～7日と比較的長いです。「6時間以内」は短すぎます。したがって、誤っているのは2です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "ヒスタミンによる食中毒に関する記述について、誤っているものを一つ選べ。",
    options: [
      "顔面の紅潮、頭痛、じんましん様の発疹など、アレルギー症状と似ているのでアレルギー様食中毒といわれている。",
      "ヒスタミンは細菌により生成され、中毒が発生する。",
      "原因食品は、サンマ・イワシなどの赤身の魚及びその加工品である。",
      "ヒスタミンは調理加熱により分解される。"
    ],
    correctAnswer: "ヒスタミンは調理加熱により分解される。", // 解答: 4
    explanation: "ヒスタミンは一度生成されると、通常の加熱調理では分解されにくい性質があります。したがって、誤っているのは4です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "動植物と有毒成分の組合せで、誤っているものを一つ選べ。",
    options: [
      "ムラサキイガイ - テトラミン",
      "ジャガイモの芽 - ソラニン",
      "クサウラベニタケ - ムスカリン",
      "フグ - テトロドトキシン"
    ],
    correctAnswer: "ムラサキイガイ - テトラミン", // 解答: 1
    explanation: "ムラサキイガイなどの二枚貝は、麻痺性貝毒（サキシトキシンなど）や下痢性貝毒（オカダ酸など）を蓄積することがあります。テトラミンはエゾボラモドキなどの巻貝に含まれる毒成分です。したがって、誤っているのは1です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "食品添加物の表示に関する記述について、( )の中に入れるべき字句の正しい組合せを一つ選べ。\n保存料、甘味料、酸化防止剤、(A)、(B)などの8種類の添加物には、その用途名と物質名を併記することが食品表示法の食品表示基準で定められている。",
    options: [
      "A:漂白剤, B:軟化剤",
      "A:着色料, B:酸味料",
      "A:糊料(増粘剤・安定剤・ゲル化剤を含む), B:膨張剤",
      "A:発色剤, B:防かび剤(防ばい剤)"
    ],
    correctAnswer: "A:発色剤, B:防かび剤(防ばい剤)", // 解答: 4
    explanation: "用途名と物質名の併記が義務付けられている8種類の添加物は、甘味料、着色料、保存料、増粘剤・安定剤・ゲル化剤、酸化防止剤、発色剤、漂白剤、防かび剤（防ばい剤）です。選択肢の中でこれに合致するのは4です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "食品添加物の種類と物質名の組合せで、正しいものを一つ選べ。",
    options: [
      "甘味料 - キシリトール",
      "保存料 - カテキン",
      "着色料 - 亜硝酸ナトリウム",
      "調味料 - カラメル"
    ],
    correctAnswer: "甘味料 - キシリトール", // 解答: 1
    explanation: "キシリトールは甘味料です。カテキンは酸化防止剤など。亜硝酸ナトリウムは発色剤。カラメルは着色料です。したがって、正しいのは1です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "消毒法とその適した用途の組合せで、誤っているものを一つ選べ。",
    options: [
      "煮沸消毒 - ふきん、タオル",
      "紫外線殺菌 - まな板",
      "次亜塩素酸ナトリウム - 手指",
      "アルコール - 器具類"
    ],
    correctAnswer: "次亜塩素酸ナトリウム - 手指", // 解答: 3
    explanation: "次亜塩素酸ナトリウムは刺激が強く、皮膚への使用は適していません。手指の消毒にはアルコールや逆性石けんなどが用いられます。したがって、誤っているのは3です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "HACCPに関する記述について、誤っているものを一つ選べ。",
    options: [
      "平成15年6月の食品衛生法の一部改正において、「HACCPに沿った衛生管理」の実施が制度化されることとなった。",
      "「HACCPに沿った衛生管理」は、その事業規模を考慮し、「HACCPに基づく衛生管理」と「HACCPの考え方を取り入れた衛生管理」に分けられる。",
      "食品取扱従事者が50人未満の小規模事業者は、「HACCPの考え方を取り入れた衛生管理」を導入することとなる。",
      "НАССPの考え方を取り入れた衛生管理」では、各事業団体が作成した手引書を利用して「衛生管理計画」を作成し、これを実施し、確認・記録を行う。"
    ],
    correctAnswer: "平成15年6月の食品衛生法の一部改正において、「HACCPに沿った衛生管理」の実施が制度化されることとなった。", // 解答: 1
    explanation: "HACCPに沿った衛生管理の制度化は、平成30年(2018年)の食品衛生法改正で行われ、令和2年(2020年)から段階的に施行、令和3年(2021年)6月1日から完全施行となりました。平成15年の改正ではありません。したがって、誤っているのは1です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "調理に係る施設、設備および器具類の衛生管理に関する記述について、誤っているものを一つ選べ。",
    options: [
      "まな板は、木製よりも合成樹脂又は合成のゴムのものが衛生上好ましい。",
      "まな板や包丁は、用途別に分けなくても良い。",
      "手洗い設備は、流水式の専用設備を設け、手洗い用洗剤、消毒液、ヘーパータオルなどを備える。",
      "床はタイル、コンクリートなどの耐水性材料を用い、排水が良く、掃除をしやすくするため勾配をつける。"
    ],
    correctAnswer: "まな板や包丁は、用途別に分けなくても良い。", // 解答: 2
    explanation: "交差汚染を防ぐため、まな板や包丁は、肉用、魚用、野菜用など、食材の種類によって使い分けることが推奨されます。「分けなくても良い」は誤りです。したがって、誤っているのは2です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "食品取扱者及び調理従事者の衛生管理に関する記述について、正しいものを一つ選べ。",
    options: [
      "健康であれば、定期的に検便をしなくてもよい。",
      "指輪は落下の恐れがなければ、外さなくてもよい。",
      "トイレには調理作業時に着用する作業着、帽子、履物のまま入らない。",
      "下痢などの症状がある場合は、手袋をして食品の取扱作業に従事すればよい。"
    ],
    correctAnswer: "トイレには調理作業時に着用する作業着、帽子、履物のまま入らない。", // 解答: 3
    explanation: "1. 食品取扱者は定期的な検便が必要です。2. 指輪などの装飾品は異物混入や細菌汚染の原因となるため、作業中は外すべきです。4. 下痢などの症状がある場合は、調理作業に従事すべきではありません。3. は正しい衛生管理です。したがって、正しいのは3です。"
  },
  {
    year: 2021,
    category: "食品衛生学",
    question: "逆性せっけん (陽イオン界面活性剤)に関する記述について、正しいものを一つ選べ。",
    options: [
      "洗浄する物の表面に石けんや陰イオン界面活性剤が残っていても、殺菌効果は変わらない。",
      "殺菌力が強く、手指の消毒に用いられる。",
      "食品添加物に指定されており、食品の消毒に使用することができる。",
      "洗浄する物の表面に食品の汚れが残っていても、殺菌効果は変わらない。"
    ],
    correctAnswer: "殺菌力が強く、手指の消毒に用いられる。", // 解答: 2
    explanation: "1. 逆性石けんは石けん（陰イオン界面活性剤）と混ざると効果が低下します。3. 逆性石けんは器具等の消毒には使われますが、食品添加物として食品の消毒には通常用いられません。4. 食品の汚れ（有機物）が残っていると殺菌効果は低下します。2. は正しい記述です。したがって、正しいのは2です。"
  },
  // ... (問37以降の問題データは、PDFを参照して手動で作成・追記してください)
];
