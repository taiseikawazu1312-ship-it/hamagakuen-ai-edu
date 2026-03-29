// 志望校別の過去合格者データ

export interface MonthlyDeviationPoint {
  month: string;
  overall: number;
  subjects: Record<string, number>;
}

export interface SubjectTarget {
  subject: string;
  targetDeviation: number;
  priority: "必須" | "重要" | "補助";
  notes: string;
}

export interface KeyMilestone {
  month: string;
  description: string;
  targetDeviation: number;
}

export interface FailurePattern {
  description: string;
  frequency: "very_common" | "common" | "occasional";
  affectedSubjects: string[];
  preventionAdvice: string;
}

export interface AcceptanceRateTrend {
  year: number;
  applicants: number;
  accepted: number;
  rate: number;
  averageDeviation: number;
}

export interface UniversityHistoricalData {
  universityId: string;
  universityName: string;
  requiredDeviation: number;
  examType: string;
  successProfile: {
    deviationTrajectory: MonthlyDeviationPoint[];
    subjectTargets: SubjectTarget[];
    keyMilestones: KeyMilestone[];
  };
  failurePatterns: FailurePattern[];
  acceptanceRateTrends: AcceptanceRateTrend[];
  aiAdvice: string;
}

// 全8大学の過去データ
export const universityData: Record<string, UniversityHistoricalData> = {
  "東京大学 理科一類": {
    universityId: "todai-rika1", universityName: "東京大学 理科一類",
    requiredDeviation: 74.0, examType: "前期日程（2次重視型）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 65.0, subjects: { 数学: 66, 英語: 64, 国語: 62, 物理: 65, 化学: 63 }},
        { month: "5月", overall: 66.5, subjects: { 数学: 67, 英語: 65, 国語: 63, 物理: 67, 化学: 65 }},
        { month: "6月", overall: 67.5, subjects: { 数学: 69, 英語: 66, 国語: 64, 物理: 68, 化学: 66 }},
        { month: "7月", overall: 68.5, subjects: { 数学: 70, 英語: 67, 国語: 65, 物理: 69, 化学: 68 }},
        { month: "8月", overall: 70.0, subjects: { 数学: 72, 英語: 68, 国語: 66, 物理: 71, 化学: 69 }},
        { month: "9月", overall: 71.0, subjects: { 数学: 73, 英語: 69, 国語: 67, 物理: 72, 化学: 70 }},
        { month: "10月", overall: 72.0, subjects: { 数学: 74, 英語: 70, 国語: 68, 物理: 73, 化学: 72 }},
        { month: "11月", overall: 73.0, subjects: { 数学: 75, 英語: 71, 国語: 69, 物理: 74, 化学: 73 }},
        { month: "12月", overall: 73.5, subjects: { 数学: 75, 英語: 72, 国語: 70, 物理: 75, 化学: 73 }},
        { month: "1月", overall: 74.5, subjects: { 数学: 76, 英語: 72, 国語: 70, 物理: 76, 化学: 74 }},
      ],
      subjectTargets: [
        { subject: "数学", targetDeviation: 76.0, priority: "必須", notes: "数学III微積・複素数平面が最重要。東大は数学配点120/440で最大" },
        { subject: "英語", targetDeviation: 72.0, priority: "必須", notes: "英作文と要約問題で差がつく。リスニングも30点分あり" },
        { subject: "物理", targetDeviation: 76.0, priority: "必須", notes: "力学・電磁気の記述問題が頻出。計算力と論述力の両方が必要" },
        { subject: "化学", targetDeviation: 74.0, priority: "重要", notes: "理論化学の計算と有機化学の構造決定が鍵" },
        { subject: "国語", targetDeviation: 70.0, priority: "補助", notes: "古文・漢文で基礎点を確実に。現代文は差がつきにくい" },
      ],
      keyMilestones: [
        { month: "6月", description: "数学IAIIB基礎完成・物理力学完成", targetDeviation: 67.5 },
        { month: "8月", description: "数学III基礎完了・理科2科目の基礎固め完了", targetDeviation: 70.0 },
        { month: "10月", description: "東大実戦模試・東大オープンでC判定以上", targetDeviation: 72.0 },
        { month: "11月", description: "過去問演習開始（直近10年分）", targetDeviation: 73.0 },
        { month: "1月", description: "共通テスト85%以上・足切りクリア", targetDeviation: 74.0 },
      ],
    },
    failurePatterns: [
      { description: "数学IIIの対策開始が遅く、秋以降に焦って詰め込んだ", frequency: "very_common", affectedSubjects: ["数学"], preventionAdvice: "数学IIIは高2の冬から先取り学習を始め、高3夏までに基礎を完成させる" },
      { description: "理科2科目のバランスが悪く、片方だけ伸ばして片方が停滞", frequency: "common", affectedSubjects: ["物理", "化学"], preventionAdvice: "物理と化学は偏差値差を5以内に保ちながら並行して学習する" },
      { description: "英語を後回しにして12月から慌てて対策", frequency: "common", affectedSubjects: ["英語"], preventionAdvice: "英語は毎日30分の長文読解を欠かさないこと" },
      { description: "共通テスト対策に時間を取られすぎて2次対策が不十分に", frequency: "occasional", affectedSubjects: ["数学", "物理", "化学"], preventionAdvice: "共通テスト対策は12月から集中的に。11月までは2次対策に専念" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 2790, accepted: 1126, rate: 40.4, averageDeviation: 73.5 },
      { year: 2023, applicants: 2830, accepted: 1108, rate: 39.2, averageDeviation: 74.0 },
      { year: 2024, applicants: 2868, accepted: 1112, rate: 38.8, averageDeviation: 74.2 },
      { year: 2025, applicants: 2905, accepted: 1100, rate: 37.9, averageDeviation: 74.5 },
    ],
    aiAdvice: "東大理一合格には、数学と理科で偏差値75前後が必要です。特に数学IIIの微積分は配点が高く、ここで安定した得点を取れるかが合否を分けます。英語は「東大英語」特有の問題形式（要約・和訳・英作文・リスニング）への慣れも重要です。",
  },
  "京都大学 理学部": {
    universityId: "kyodai-rigaku", universityName: "京都大学 理学部",
    requiredDeviation: 72.0, examType: "前期日程（2次重視型）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 63.0, subjects: { 数学: 65, 英語: 62, 国語: 60, 物理: 64, 化学: 62 }},
        { month: "5月", overall: 64.5, subjects: { 数学: 66, 英語: 63, 国語: 61, 物理: 65, 化学: 63 }},
        { month: "6月", overall: 65.5, subjects: { 数学: 67, 英語: 64, 国語: 62, 物理: 66, 化学: 65 }},
        { month: "7月", overall: 67.0, subjects: { 数学: 69, 英語: 65, 国語: 63, 物理: 68, 化学: 66 }},
        { month: "8月", overall: 68.5, subjects: { 数学: 71, 英語: 66, 国語: 64, 物理: 69, 化学: 68 }},
        { month: "9月", overall: 69.5, subjects: { 数学: 72, 英語: 67, 国語: 65, 物理: 70, 化学: 69 }},
        { month: "10月", overall: 70.0, subjects: { 数学: 73, 英語: 68, 国語: 66, 物理: 71, 化学: 70 }},
        { month: "11月", overall: 71.0, subjects: { 数学: 73, 英語: 69, 国語: 67, 物理: 72, 化学: 71 }},
        { month: "12月", overall: 71.5, subjects: { 数学: 74, 英語: 70, 国語: 68, 物理: 72, 化学: 71 }},
        { month: "1月", overall: 72.5, subjects: { 数学: 75, 英語: 70, 国語: 68, 物理: 73, 化学: 72 }},
      ],
      subjectTargets: [
        { subject: "数学", targetDeviation: 75.0, priority: "必須", notes: "京大数学は記述式で思考力重視。数学IIIの微積が特に重要" },
        { subject: "英語", targetDeviation: 70.0, priority: "重要", notes: "長文の英文和訳と和文英訳。正確な読解力が求められる" },
        { subject: "物理", targetDeviation: 73.0, priority: "必須", notes: "記述式で論理的な解答が必要。力学と電磁気が中心" },
        { subject: "化学", targetDeviation: 72.0, priority: "重要", notes: "理論化学の計算問題の精度が重要" },
        { subject: "国語", targetDeviation: 68.0, priority: "補助", notes: "京大は国語の配点が低めだが、古文は確実に取りたい" },
      ],
      keyMilestones: [
        { month: "6月", description: "数学IAIIB完成・物理力学基礎完了", targetDeviation: 65.5 },
        { month: "8月", description: "数学III・理科基礎固め完了", targetDeviation: 68.5 },
        { month: "10月", description: "京大実戦模試でC判定以上", targetDeviation: 70.0 },
        { month: "12月", description: "過去問演習開始", targetDeviation: 71.5 },
        { month: "1月", description: "共通テスト80%以上", targetDeviation: 72.0 },
      ],
    },
    failurePatterns: [
      { description: "京大数学の記述対策が不十分で、解法は浮かぶが答案が書けない", frequency: "very_common", affectedSubjects: ["数学"], preventionAdvice: "模範解答を写す練習ではなく、白紙から完全な答案を書く訓練を" },
      { description: "物理の概念理解が浅く、典型問題以外に対応できない", frequency: "common", affectedSubjects: ["物理"], preventionAdvice: "公式暗記ではなく「なぜその式が成り立つか」を理解する学習を" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 732, accepted: 316, rate: 43.2, averageDeviation: 71.8 },
      { year: 2023, applicants: 745, accepted: 311, rate: 41.7, averageDeviation: 72.0 },
      { year: 2024, applicants: 758, accepted: 308, rate: 40.6, averageDeviation: 72.2 },
      { year: 2025, applicants: 770, accepted: 305, rate: 39.6, averageDeviation: 72.5 },
    ],
    aiAdvice: "京大理学部は数学と理科の記述力が合否を分けます。特に数学は「発想力」よりも「論理的に答案を組み立てる力」が重要です。物理は公式の暗記ではなく、原理から立式できる力を身につけてください。",
  },
  "早稲田大学 商学部": {
    universityId: "waseda-sho", universityName: "早稲田大学 商学部",
    requiredDeviation: 67.5, examType: "一般入試（3科目型）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 58.0, subjects: { 数学: 56, 英語: 60, 国語: 58 }},
        { month: "5月", overall: 59.5, subjects: { 数学: 58, 英語: 61, 国語: 59 }},
        { month: "6月", overall: 60.5, subjects: { 数学: 59, 英語: 62, 国語: 60 }},
        { month: "7月", overall: 62.0, subjects: { 数学: 61, 英語: 63, 国語: 62 }},
        { month: "8月", overall: 63.5, subjects: { 数学: 62, 英語: 65, 国語: 63 }},
        { month: "9月", overall: 64.5, subjects: { 数学: 63, 英語: 66, 国語: 64 }},
        { month: "10月", overall: 65.5, subjects: { 数学: 64, 英語: 67, 国語: 65 }},
        { month: "11月", overall: 66.5, subjects: { 数学: 65, 英語: 68, 国語: 66 }},
        { month: "12月", overall: 67.0, subjects: { 数学: 66, 英語: 69, 国語: 66 }},
        { month: "1月", overall: 68.0, subjects: { 数学: 67, 英語: 70, 国語: 67 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 70.0, priority: "必須", notes: "早稲田商は英語の配点が最も高い。長文読解と正誤問題が頻出" },
        { subject: "数学", targetDeviation: 67.0, priority: "重要", notes: "数学IAIIBのみ。微積分・確率が頻出" },
        { subject: "国語", targetDeviation: 67.0, priority: "重要", notes: "現代文が中心。古文も出題される" },
      ],
      keyMilestones: [
        { month: "7月", description: "英語の基礎力完成・過去問分析開始", targetDeviation: 62.0 },
        { month: "9月", description: "早稲田形式の問題演習開始", targetDeviation: 64.5 },
        { month: "11月", description: "過去問で合格最低点を超える", targetDeviation: 66.5 },
        { month: "1月", description: "共通テスト利用で滑り止め確保", targetDeviation: 68.0 },
      ],
    },
    failurePatterns: [
      { description: "英語の語彙力不足で長文の細部が読めない", frequency: "very_common", affectedSubjects: ["英語"], preventionAdvice: "「速単上級」レベルまでの語彙を高3夏までに完成させる" },
      { description: "国語を軽視して英数に偏り、本番で国語で大失点", frequency: "common", affectedSubjects: ["国語"], preventionAdvice: "週に最低2回は現代文の演習を入れる" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 5832, accepted: 750, rate: 12.9, averageDeviation: 67.0 },
      { year: 2023, applicants: 5950, accepted: 740, rate: 12.4, averageDeviation: 67.5 },
      { year: 2024, applicants: 6100, accepted: 735, rate: 12.0, averageDeviation: 68.0 },
      { year: 2025, applicants: 6250, accepted: 730, rate: 11.7, averageDeviation: 68.2 },
    ],
    aiAdvice: "早稲田商学部は英語の出来で合否が決まると言っても過言ではありません。長文読解の速度と精度を最優先で鍛えてください。数学はIAIIBの範囲ですが、計算量が多いため時間配分の練習も重要です。",
  },
  "慶應義塾大学 文学部": {
    universityId: "keio-bun", universityName: "慶應義塾大学 文学部",
    requiredDeviation: 66.0, examType: "一般入試（英語+小論文+社会/数学）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 57.0, subjects: { 英語: 59, 国語: 58, 数学: 54 }},
        { month: "6月", overall: 59.5, subjects: { 英語: 62, 国語: 60, 数学: 56 }},
        { month: "8月", overall: 62.0, subjects: { 英語: 64, 国語: 62, 数学: 58 }},
        { month: "10月", overall: 64.0, subjects: { 英語: 66, 国語: 64, 数学: 60 }},
        { month: "1月", overall: 66.5, subjects: { 英語: 69, 国語: 66, 数学: 62 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 69.0, priority: "必須", notes: "慶應文は英語の超長文（辞書持ち込み可）が特徴。精読力が鍵" },
        { subject: "国語", targetDeviation: 66.0, priority: "重要", notes: "小論文対策が必須。現代文の記述力がベース" },
        { subject: "数学", targetDeviation: 62.0, priority: "補助", notes: "選択科目。数学IAIIBの基礎ができていれば十分" },
      ],
      keyMilestones: [
        { month: "8月", description: "英語精読力完成・小論文対策開始", targetDeviation: 62.0 },
        { month: "10月", description: "過去問で合格ライン突破", targetDeviation: 64.0 },
        { month: "1月", description: "小論文の型を確立", targetDeviation: 66.0 },
      ],
    },
    failurePatterns: [
      { description: "小論文対策を直前まで放置し、型が身につかない", frequency: "very_common", affectedSubjects: ["国語"], preventionAdvice: "高3夏から月2回は小論文を書いて添削を受ける" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 3200, accepted: 590, rate: 18.4, averageDeviation: 65.5 },
      { year: 2023, applicants: 3350, accepted: 580, rate: 17.3, averageDeviation: 66.0 },
      { year: 2024, applicants: 3420, accepted: 575, rate: 16.8, averageDeviation: 66.2 },
      { year: 2025, applicants: 3500, accepted: 570, rate: 16.3, averageDeviation: 66.5 },
    ],
    aiAdvice: "慶應文学部は英語の超長文読解が独特です。辞書は持ち込めますが、速度が求められるため辞書に頼りすぎない精読力を鍛えてください。小論文は高3夏から定期的に書く練習を始めましょう。",
  },
  "大阪大学 工学部": {
    universityId: "handai-ko", universityName: "大阪大学 工学部",
    requiredDeviation: 62.0, examType: "前期日程",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 53.0, subjects: { 数学: 54, 英語: 52, 物理: 53, 化学: 52, 国語: 50 }},
        { month: "6月", overall: 55.0, subjects: { 数学: 56, 英語: 54, 物理: 55, 化学: 54, 国語: 51 }},
        { month: "8月", overall: 57.5, subjects: { 数学: 59, 英語: 56, 物理: 58, 化学: 57, 国語: 53 }},
        { month: "10月", overall: 59.5, subjects: { 数学: 61, 英語: 58, 物理: 60, 化学: 59, 国語: 54 }},
        { month: "1月", overall: 62.5, subjects: { 数学: 64, 英語: 61, 物理: 63, 化学: 62, 国語: 56 }},
      ],
      subjectTargets: [
        { subject: "数学", targetDeviation: 64.0, priority: "必須", notes: "数学III必須。微積分と線形代数の計算力" },
        { subject: "物理", targetDeviation: 63.0, priority: "必須", notes: "力学・電磁気中心" },
        { subject: "化学", targetDeviation: 62.0, priority: "重要", notes: "理論化学の計算精度" },
        { subject: "英語", targetDeviation: 61.0, priority: "重要", notes: "科学英語の読解がポイント" },
        { subject: "国語", targetDeviation: 56.0, priority: "補助", notes: "共テのみ。最低限の得点を" },
      ],
      keyMilestones: [
        { month: "7月", description: "数学III基礎完了", targetDeviation: 56.5 },
        { month: "9月", description: "理科2科目の基礎完成", targetDeviation: 58.5 },
        { month: "11月", description: "阪大実戦でC判定以上", targetDeviation: 60.0 },
        { month: "1月", description: "共通テスト78%以上", targetDeviation: 62.0 },
      ],
    },
    failurePatterns: [
      { description: "数学IIIの計算力不足で時間切れ", frequency: "very_common", affectedSubjects: ["数学"], preventionAdvice: "数学IIIは計算スピードも重要。毎日計算演習を" },
      { description: "理科のどちらか一方を後回しにした", frequency: "common", affectedSubjects: ["物理", "化学"], preventionAdvice: "理科2科目はバランスよく" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 2100, accepted: 820, rate: 39.0, averageDeviation: 61.5 },
      { year: 2023, applicants: 2150, accepted: 810, rate: 37.7, averageDeviation: 62.0 },
      { year: 2024, applicants: 2200, accepted: 805, rate: 36.6, averageDeviation: 62.2 },
      { year: 2025, applicants: 2250, accepted: 800, rate: 35.6, averageDeviation: 62.5 },
    ],
    aiAdvice: "阪大工学部は数学と理科の計算力が鍵です。特に数学IIIの微積分は計算量が多いため、速く正確に解く練習が必要です。",
  },
  "関西学院大学 経済学部": {
    universityId: "kwansei-keizai", universityName: "関西学院大学 経済学部",
    requiredDeviation: 62.0, examType: "全学日程（3科目型）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 52.0, subjects: { 英語: 53, 数学: 51, 国語: 52 }},
        { month: "6月", overall: 54.5, subjects: { 英語: 56, 数学: 53, 国語: 54 }},
        { month: "8月", overall: 57.0, subjects: { 英語: 58, 数学: 56, 国語: 57 }},
        { month: "10月", overall: 59.0, subjects: { 英語: 60, 数学: 58, 国語: 59 }},
        { month: "1月", overall: 62.5, subjects: { 英語: 64, 数学: 61, 国語: 62 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 64.0, priority: "必須", notes: "マーク式。長文読解の速度と正確性" },
        { subject: "数学", targetDeviation: 61.0, priority: "重要", notes: "IAIIBの標準問題が中心" },
        { subject: "国語", targetDeviation: 62.0, priority: "重要", notes: "現代文中心。古文も出題" },
      ],
      keyMilestones: [
        { month: "8月", description: "全科目の基礎完成", targetDeviation: 57.0 },
        { month: "10月", description: "過去問で合格ラインに接近", targetDeviation: 59.0 },
        { month: "1月", description: "共通テスト利用で合格確保", targetDeviation: 62.0 },
      ],
    },
    failurePatterns: [
      { description: "英語の語彙不足で時間内に解ききれない", frequency: "very_common", affectedSubjects: ["英語"], preventionAdvice: "ターゲット1900レベルを完璧に" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 4500, accepted: 1350, rate: 30.0, averageDeviation: 61.0 },
      { year: 2023, applicants: 4600, accepted: 1320, rate: 28.7, averageDeviation: 61.5 },
      { year: 2024, applicants: 4700, accepted: 1300, rate: 27.7, averageDeviation: 62.0 },
      { year: 2025, applicants: 4800, accepted: 1280, rate: 26.7, averageDeviation: 62.2 },
    ],
    aiAdvice: "関学経済は英語で差がつきます。ターゲット1900レベルの単語を完璧にし、マーク式の長文を時間内に正確に解く練習を積みましょう。",
  },
  "神戸大学 法学部": {
    universityId: "kobe-ho", universityName: "神戸大学 法学部",
    requiredDeviation: 60.0, examType: "前期日程",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 50.0, subjects: { 英語: 51, 数学: 49, 国語: 52, 物理: 48, 化学: 48 }},
        { month: "6月", overall: 52.5, subjects: { 英語: 54, 数学: 51, 国語: 54, 物理: 50, 化学: 50 }},
        { month: "8月", overall: 55.0, subjects: { 英語: 57, 数学: 53, 国語: 56, 物理: 53, 化学: 53 }},
        { month: "10月", overall: 57.5, subjects: { 英語: 59, 数学: 56, 国語: 58, 物理: 55, 化学: 55 }},
        { month: "1月", overall: 60.5, subjects: { 英語: 62, 数学: 59, 国語: 61, 物理: 58, 化学: 58 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 62.0, priority: "必須", notes: "英文読解と英作文。法学部は記述式" },
        { subject: "国語", targetDeviation: 61.0, priority: "重要", notes: "現代文の記述力が問われる" },
        { subject: "数学", targetDeviation: 59.0, priority: "重要", notes: "IAIIBの標準問題" },
        { subject: "物理", targetDeviation: 58.0, priority: "補助", notes: "共テ＋2次" },
        { subject: "化学", targetDeviation: 58.0, priority: "補助", notes: "共テ＋2次" },
      ],
      keyMilestones: [
        { month: "8月", description: "基礎固め完了", targetDeviation: 55.0 },
        { month: "10月", description: "神大模試でC判定以上", targetDeviation: 57.5 },
        { month: "1月", description: "共テ75%以上", targetDeviation: 60.0 },
      ],
    },
    failurePatterns: [
      { description: "数学の苦手意識が克服できず足を引っ張る", frequency: "common", affectedSubjects: ["数学"], preventionAdvice: "苦手なら基礎問題精講を繰り返す" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 850, accepted: 175, rate: 20.6, averageDeviation: 59.5 },
      { year: 2023, applicants: 870, accepted: 170, rate: 19.5, averageDeviation: 60.0 },
      { year: 2024, applicants: 890, accepted: 168, rate: 18.9, averageDeviation: 60.2 },
      { year: 2025, applicants: 900, accepted: 165, rate: 18.3, averageDeviation: 60.5 },
    ],
    aiAdvice: "神戸大法学部は英語と国語の記述力が合否を分けます。特に英作文は毎週添削を受けて実力を磨いてください。数学は苦手でも基礎問題で確実に得点できればOKです。",
  },
  "同志社大学 商学部": {
    universityId: "doshisha-sho", universityName: "同志社大学 商学部",
    requiredDeviation: 55.0, examType: "全学部日程（3科目型）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 45.0, subjects: { 英語: 46, 数学: 44, 国語: 45 }},
        { month: "6月", overall: 47.5, subjects: { 英語: 49, 数学: 46, 国語: 47 }},
        { month: "8月", overall: 50.0, subjects: { 英語: 52, 数学: 48, 国語: 50 }},
        { month: "10月", overall: 52.5, subjects: { 英語: 54, 数学: 51, 国語: 52 }},
        { month: "1月", overall: 55.5, subjects: { 英語: 57, 数学: 54, 国語: 55 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 57.0, priority: "必須", notes: "マーク式。語彙と長文読解が中心" },
        { subject: "数学", targetDeviation: 54.0, priority: "重要", notes: "IAIIBの基礎〜標準レベル" },
        { subject: "国語", targetDeviation: 55.0, priority: "重要", notes: "現代文と古文" },
      ],
      keyMilestones: [
        { month: "8月", description: "基礎完成", targetDeviation: 50.0 },
        { month: "10月", description: "過去問演習開始", targetDeviation: 52.5 },
        { month: "1月", description: "合格ライン突破", targetDeviation: 55.0 },
      ],
    },
    failurePatterns: [
      { description: "基礎が固まらないまま過去問に入ってしまう", frequency: "very_common", affectedSubjects: ["英語", "数学"], preventionAdvice: "10月までは基礎固めに専念。過去問は11月から" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 5500, accepted: 1980, rate: 36.0, averageDeviation: 54.5 },
      { year: 2023, applicants: 5650, accepted: 1950, rate: 34.5, averageDeviation: 55.0 },
      { year: 2024, applicants: 5800, accepted: 1920, rate: 33.1, averageDeviation: 55.2 },
      { year: 2025, applicants: 5950, accepted: 1900, rate: 31.9, averageDeviation: 55.5 },
    ],
    aiAdvice: "同志社商学部は基礎力勝負です。英語はターゲット1400レベルの語彙を完璧にし、数学は教科書レベルの問題を確実に解けるようにしましょう。基礎が固まれば合格は十分可能です。",
  },
  "北海道大学 総合理系": {
    universityId: "hokudai-sori", universityName: "北海道大学 総合理系",
    requiredDeviation: 62.5, examType: "前期日程（総合入試）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 53.0, subjects: { 数学: 54, 英語: 53, 国語: 50, 物理: 54, 化学: 52 }},
        { month: "5月", overall: 54.5, subjects: { 数学: 56, 英語: 54, 国語: 51, 物理: 55, 化学: 53 }},
        { month: "6月", overall: 55.5, subjects: { 数学: 57, 英語: 55, 国語: 52, 物理: 56, 化学: 55 }},
        { month: "7月", overall: 57.0, subjects: { 数学: 59, 英語: 56, 国語: 53, 物理: 58, 化学: 56 }},
        { month: "8月", overall: 58.5, subjects: { 数学: 60, 英語: 57, 国語: 54, 物理: 59, 化学: 58 }},
        { month: "9月", overall: 59.5, subjects: { 数学: 61, 英語: 58, 国語: 55, 物理: 60, 化学: 59 }},
        { month: "10月", overall: 60.5, subjects: { 数学: 62, 英語: 59, 国語: 56, 物理: 61, 化学: 60 }},
        { month: "11月", overall: 61.0, subjects: { 数学: 63, 英語: 60, 国語: 57, 物理: 62, 化学: 61 }},
        { month: "12月", overall: 62.0, subjects: { 数学: 64, 英語: 61, 国語: 58, 物理: 63, 化学: 62 }},
        { month: "1月", overall: 63.0, subjects: { 数学: 65, 英語: 62, 国語: 58, 物理: 64, 化学: 63 }},
      ],
      subjectTargets: [
        { subject: "数学", targetDeviation: 65.0, priority: "必須", notes: "数学III必須。微積分・線形代数の計算力が求められる。北大は標準的な良問が多い" },
        { subject: "英語", targetDeviation: 62.0, priority: "必須", notes: "長文読解と英作文。語彙力と速読力の両方が必要" },
        { subject: "物理", targetDeviation: 64.0, priority: "必須", notes: "力学・電磁気が中心。計算量はやや多め" },
        { subject: "化学", targetDeviation: 63.0, priority: "重要", notes: "理論化学の計算と有機化学。無機の暗記も手を抜かない" },
        { subject: "国語", targetDeviation: 58.0, priority: "補助", notes: "共通テストのみ。古文・漢文の基礎点を確実に" },
      ],
      keyMilestones: [
        { month: "6月", description: "数学IAIIB完成・物理力学基礎完了", targetDeviation: 55.5 },
        { month: "8月", description: "数学III基礎完了・理科基礎固め", targetDeviation: 58.5 },
        { month: "10月", description: "北大実戦模試でC判定以上", targetDeviation: 60.5 },
        { month: "11月", description: "過去問演習開始（直近7年分）", targetDeviation: 61.0 },
        { month: "1月", description: "共通テスト78%以上", targetDeviation: 62.5 },
      ],
    },
    failurePatterns: [
      { description: "数学IIIの対策が遅れ、秋以降に計算ミスが多発", frequency: "very_common", affectedSubjects: ["数学"], preventionAdvice: "数学IIIは高2冬から先取りし、高3夏までに基礎計算力を完成させる" },
      { description: "共通テストの地歴公民で大きく失点し、ボーダーに届かない", frequency: "common", affectedSubjects: ["国語"], preventionAdvice: "共通テストは12月から集中対策。特に地歴は暗記の仕上げを計画的に" },
      { description: "北海道外の受験生に比べ、本番の緊張で実力が出せない", frequency: "occasional", affectedSubjects: ["数学", "物理"], preventionAdvice: "本番形式のシミュレーション（時間計測・教室環境）を11月から実施" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 3850, accepted: 1210, rate: 31.4, averageDeviation: 62.0 },
      { year: 2023, applicants: 3920, accepted: 1195, rate: 30.5, averageDeviation: 62.3 },
      { year: 2024, applicants: 4010, accepted: 1180, rate: 29.4, averageDeviation: 62.5 },
      { year: 2025, applicants: 4100, accepted: 1170, rate: 28.5, averageDeviation: 62.8 },
    ],
    aiAdvice: "北大総合理系は「総合入試」で入学後に学部を選べる特徴があります。2次試験は標準的な良問が多く、奇問は少ないため、基礎を完璧に仕上げることが最重要です。数学IIIと理科2科目をバランスよく鍛えてください。共通テストの比率も高いため、12月からは共テ対策にも時間を確保しましょう。",
  },
  "北海道大学 文学部": {
    universityId: "hokudai-bun", universityName: "北海道大学 文学部",
    requiredDeviation: 60.0, examType: "前期日程",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 50.5, subjects: { 英語: 52, 数学: 48, 国語: 53 }},
        { month: "5月", overall: 52.0, subjects: { 英語: 54, 数学: 49, 国語: 54 }},
        { month: "6月", overall: 53.5, subjects: { 英語: 55, 数学: 51, 国語: 55 }},
        { month: "7月", overall: 55.0, subjects: { 英語: 57, 数学: 52, 国語: 56 }},
        { month: "8月", overall: 56.5, subjects: { 英語: 58, 数学: 53, 国語: 58 }},
        { month: "9月", overall: 57.5, subjects: { 英語: 59, 数学: 54, 国語: 59 }},
        { month: "10月", overall: 58.5, subjects: { 英語: 60, 数学: 55, 国語: 60 }},
        { month: "11月", overall: 59.0, subjects: { 英語: 61, 数学: 56, 国語: 60 }},
        { month: "12月", overall: 59.5, subjects: { 英語: 61, 数学: 56, 国語: 61 }},
        { month: "1月", overall: 60.5, subjects: { 英語: 62, 数学: 57, 国語: 62 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 62.0, priority: "必須", notes: "長文読解と英作文が中心。北大英語は標準的だが量が多い" },
        { subject: "国語", targetDeviation: 62.0, priority: "必須", notes: "現代文・古文・漢文すべて出題。記述力が合否を分ける" },
        { subject: "数学", targetDeviation: 57.0, priority: "重要", notes: "IAIIBの標準問題。苦手でも基礎で得点できればOK" },
      ],
      keyMilestones: [
        { month: "7月", description: "英語・国語の基礎力完成", targetDeviation: 55.0 },
        { month: "9月", description: "記述対策開始", targetDeviation: 57.5 },
        { month: "11月", description: "過去問演習開始", targetDeviation: 59.0 },
        { month: "1月", description: "共通テスト76%以上", targetDeviation: 60.0 },
      ],
    },
    failurePatterns: [
      { description: "国語の記述問題で必要な要素を書ききれない", frequency: "very_common", affectedSubjects: ["国語"], preventionAdvice: "高3夏から毎週記述答案を書いて添削を受ける" },
      { description: "数学を完全に捨ててしまい、共テで足を引っ張る", frequency: "common", affectedSubjects: ["数学"], preventionAdvice: "数学は捨てずに基礎問題で5割取れるレベルを維持" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 680, accepted: 155, rate: 22.8, averageDeviation: 59.5 },
      { year: 2023, applicants: 700, accepted: 152, rate: 21.7, averageDeviation: 60.0 },
      { year: 2024, applicants: 720, accepted: 150, rate: 20.8, averageDeviation: 60.2 },
      { year: 2025, applicants: 735, accepted: 148, rate: 20.1, averageDeviation: 60.5 },
    ],
    aiAdvice: "北大文学部は英語と国語の記述力が合否を分けます。特に国語は現代文・古文・漢文のすべてが出題されるため、バランスよく対策してください。数学は捨てずに基礎点を確保しましょう。",
  },
  "小樽商科大学 商学部": {
    universityId: "otaru-sho", universityName: "小樽商科大学 商学部",
    requiredDeviation: 55.0, examType: "前期日程",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 45.5, subjects: { 英語: 47, 数学: 44, 国語: 46 }},
        { month: "5月", overall: 47.0, subjects: { 英語: 48, 数学: 45, 国語: 47 }},
        { month: "6月", overall: 48.5, subjects: { 英語: 50, 数学: 47, 国語: 48 }},
        { month: "7月", overall: 50.0, subjects: { 英語: 52, 数学: 48, 国語: 50 }},
        { month: "8月", overall: 51.5, subjects: { 英語: 53, 数学: 50, 国語: 51 }},
        { month: "9月", overall: 52.5, subjects: { 英語: 54, 数学: 51, 国語: 52 }},
        { month: "10月", overall: 53.5, subjects: { 英語: 55, 数学: 52, 国語: 53 }},
        { month: "11月", overall: 54.0, subjects: { 英語: 56, 数学: 52, 国語: 54 }},
        { month: "12月", overall: 54.5, subjects: { 英語: 56, 数学: 53, 国語: 54 }},
        { month: "1月", overall: 55.5, subjects: { 英語: 57, 数学: 54, 国語: 55 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 57.0, priority: "必須", notes: "商学部は英語重視。長文読解の正確性と速度が鍵" },
        { subject: "数学", targetDeviation: 54.0, priority: "重要", notes: "IAIIBの基本問題中心。計算ミスをなくすことが重要" },
        { subject: "国語", targetDeviation: 55.0, priority: "重要", notes: "現代文中心。共テ対策をしっかりと" },
      ],
      keyMilestones: [
        { month: "7月", description: "全科目の基礎固め完了", targetDeviation: 50.0 },
        { month: "9月", description: "過去問分析開始", targetDeviation: 52.5 },
        { month: "11月", description: "過去問で合格ライン突破", targetDeviation: 54.0 },
        { month: "1月", description: "共通テスト70%以上", targetDeviation: 55.0 },
      ],
    },
    failurePatterns: [
      { description: "英語の語彙力不足で長文が時間内に読めない", frequency: "very_common", affectedSubjects: ["英語"], preventionAdvice: "ターゲット1400を高3夏までに完成。毎日30分の長文音読を継続" },
      { description: "共テの社会科目で想定外の低得点", frequency: "common", affectedSubjects: ["国語"], preventionAdvice: "社会科目は11月から集中暗記。過去問5年分を3周する" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 1200, accepted: 475, rate: 39.6, averageDeviation: 54.5 },
      { year: 2023, applicants: 1180, accepted: 470, rate: 39.8, averageDeviation: 55.0 },
      { year: 2024, applicants: 1150, accepted: 465, rate: 40.4, averageDeviation: 55.0 },
      { year: 2025, applicants: 1130, accepted: 460, rate: 40.7, averageDeviation: 55.2 },
    ],
    aiAdvice: "小樽商科大学は英語力が合否を大きく左右します。2次試験の英語は標準レベルですが、正確に読む力が求められます。基礎を丁寧に固めれば十分に合格可能です。北海道内では就職に強い大学として人気があります。",
  },
  "北海学園大学 経済学部": {
    universityId: "hokkai-keizai", universityName: "北海学園大学 経済学部",
    requiredDeviation: 47.5, examType: "一般入試（2〜3科目型）",
    successProfile: {
      deviationTrajectory: [
        { month: "4月", overall: 38.0, subjects: { 英語: 39, 数学: 37, 国語: 38 }},
        { month: "6月", overall: 40.5, subjects: { 英語: 42, 数学: 39, 国語: 40 }},
        { month: "8月", overall: 43.0, subjects: { 英語: 44, 数学: 42, 国語: 43 }},
        { month: "10月", overall: 45.5, subjects: { 英語: 47, 数学: 44, 国語: 45 }},
        { month: "1月", overall: 48.0, subjects: { 英語: 49, 数学: 47, 国語: 48 }},
      ],
      subjectTargets: [
        { subject: "英語", targetDeviation: 49.0, priority: "必須", notes: "基礎的な長文読解と文法。ターゲット1200レベルの語彙で対応可能" },
        { subject: "数学", targetDeviation: 47.0, priority: "重要", notes: "IAの基本問題が中心。教科書の例題レベルを確実に" },
        { subject: "国語", targetDeviation: 48.0, priority: "重要", notes: "現代文の基本的な読解力。漢字の読み書きも出題" },
      ],
      keyMilestones: [
        { month: "8月", description: "基礎問題集を1周完了", targetDeviation: 43.0 },
        { month: "10月", description: "過去問で5割以上得点", targetDeviation: 45.5 },
        { month: "1月", description: "過去問で合格ライン突破", targetDeviation: 47.5 },
      ],
    },
    failurePatterns: [
      { description: "基礎が固まらないまま過去問に入ってしまう", frequency: "very_common", affectedSubjects: ["英語", "数学"], preventionAdvice: "10月までは教科書レベルの基礎に専念。焦って応用に手を出さない" },
    ],
    acceptanceRateTrends: [
      { year: 2022, applicants: 3200, accepted: 2080, rate: 65.0, averageDeviation: 47.0 },
      { year: 2023, applicants: 3100, accepted: 2020, rate: 65.2, averageDeviation: 47.2 },
      { year: 2024, applicants: 3050, accepted: 1980, rate: 64.9, averageDeviation: 47.5 },
      { year: 2025, applicants: 3000, accepted: 1960, rate: 65.3, averageDeviation: 47.5 },
    ],
    aiAdvice: "北海学園大学は基礎力を問う問題が中心です。教科書レベルの問題を確実に解けるようにすれば合格は十分可能です。英語は毎日の単語学習を欠かさず、数学は教科書の例題・章末問題を繰り返し解きましょう。",
  },
};

// ヘルパー: 生徒の志望校名からデータを取得
export function getUniversityData(targetSchool: string): UniversityHistoricalData | undefined {
  return universityData[targetSchool];
}
