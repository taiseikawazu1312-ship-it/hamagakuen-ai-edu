// Student Portal Demo Data

export const studentProfile = {
  name: "田中 太郎",
  targetSchool: "早稲田大学",
  targetDepartment: "商学部",
  entranceMethod: "一般入試",
  currentDeviation: 65.0,
  targetDeviation: 68.0,
  daysUntilExam: 342,
  streak: 12,
  avatarInitial: "田",
};

export const subjectGaps = [
  { subject: "英語", current: 72.8, target: 66.0, gap: -6.8 },
  { subject: "数学", current: 65.0, target: 54.6, gap: -10.4 },
  { subject: "国語", current: 68.8, target: 64.4, gap: -4.4 },
  { subject: "物理", current: 58.6, target: 45.8, gap: -12.8 },
  { subject: "化学", current: 62.0, target: 68.0, gap: 6.0 },
];

export const weeklyPlan = [
  { day: "月", subjects: [{ name: "英語", duration: 60 }, { name: "数学", duration: 45 }] },
  { day: "火", subjects: [{ name: "国語", duration: 50 }, { name: "物理", duration: 60 }] },
  { day: "水", subjects: [{ name: "英語", duration: 45 }, { name: "化学", duration: 50 }] },
  { day: "木", subjects: [{ name: "数学", duration: 60 }, { name: "国語", duration: 40 }] },
  { day: "金", subjects: [{ name: "物理", duration: 50 }, { name: "英語", duration: 45 }] },
  { day: "土", subjects: [{ name: "数学", duration: 90 }, { name: "化学", duration: 60 }, { name: "英語", duration: 45 }] },
  { day: "日", subjects: [{ name: "国語", duration: 60 }, { name: "物理", duration: 45 }, { name: "復習", duration: 60 }] },
];

export const todaysTasks = [
  { title: "英語長文読解 演習問題3", subject: "英語", duration: 30, priority: "高", completed: true },
  { title: "数学IIB 微分積分 基礎問題", subject: "数学", duration: 45, priority: "高", completed: false },
  { title: "英単語 ターゲット1900 Unit15", subject: "英語", duration: 20, priority: "中", completed: false },
  { title: "現代文 評論文読解トレーニング", subject: "国語", duration: 30, priority: "中", completed: false },
  { title: "物理 力学 運動方程式の応用", subject: "物理", duration: 40, priority: "高", completed: false },
];

export const comprehensionRadar = [
  { area: "英語読解", score: 82, fullMark: 100 },
  { area: "英語文法", score: 75, fullMark: 100 },
  { area: "数学IA", score: 70, fullMark: 100 },
  { area: "数学IIB", score: 62, fullMark: 100 },
  { area: "現代文", score: 78, fullMark: 100 },
  { area: "古文", score: 65, fullMark: 100 },
];

export const weeklyProgress = [
  { week: "第1週", rate: 85 },
  { week: "第2週", rate: 72 },
  { week: "第3週", rate: 90 },
  { week: "第4週", rate: 68 },
  { week: "第5週", rate: 88 },
  { week: "第6週", rate: 78 },
];

export const comprehensionTrend = [
  { period: "駿台全国①", english: 65, math: 58, japanese: 62, physics: 50, chemistry: 55 },
  { period: "全統記述①", english: 68, math: 60, japanese: 65, physics: 52, chemistry: 58 },
  { period: "全統共テ②", english: 72, math: 63, japanese: 67, physics: 55, chemistry: 60 },
  { period: "駿台全国②", english: 75, math: 65, japanese: 70, physics: 58, chemistry: 62 },
  { period: "全統共テ③", english: 78, math: 68, japanese: 72, physics: 60, chemistry: 65 },
];

// 教材型定義
interface MaterialItem {
  title: string;
  subject: string;
  type: string;
  matchRate: number;
  description: string;
}

// 科目別おすすめ教材
export const materialsBySubject: Record<string, MaterialItem[]> = {
  英語: [
    { title: "英語長文 ハイパートレーニング レベル3", subject: "英語", type: "問題集", matchRate: 95, description: "早稲田レベルの長文読解力を養成。設問パターンの分析と速読力強化に最適。" },
    { title: "ネクステージ 英文法・語法", subject: "英語", type: "問題集", matchRate: 90, description: "文法・語法の網羅的な演習。仮定法・関係詞を重点的に。" },
    { title: "ターゲット1900", subject: "英語", type: "単語帳", matchRate: 92, description: "大学入試必須の英単語1900語。Unit15まで完了済み。" },
    { title: "英作文 ハイパートレーニング", subject: "英語", type: "問題集", matchRate: 85, description: "和文英訳と自由英作文の両方をカバー。早稲田の英作文対策に。" },
  ],
  数学: [
    { title: "青チャート 数学IIB 重要例題", subject: "数学", type: "参考書", matchRate: 88, description: "微分積分・ベクトルの弱点を集中カバー。基礎から応用まで段階的に。" },
    { title: "数学IIB 微分積分 基礎問題精講", subject: "数学", type: "問題集", matchRate: 93, description: "微分積分の基礎を固める厳選問題集。チェインルール・置換積分を重点的に。" },
    { title: "数学IA 標準問題精講", subject: "数学", type: "問題集", matchRate: 80, description: "二次関数・確率の標準レベル演習。共通テスト対策にも有効。" },
    { title: "合格る計算 数学IAIIB", subject: "数学", type: "問題集", matchRate: 85, description: "計算スピードと正確性を鍛える。ケアレスミス対策に。" },
  ],
  国語: [
    { title: "現代文 読解の基礎 完成編", subject: "国語", type: "問題集", matchRate: 82, description: "評論文・随筆の論理展開を読み取る力を養成。記述問題対策にも有効。" },
    { title: "古文単語 ゴロゴ", subject: "国語", type: "単語帳", matchRate: 88, description: "古文単語を語呂合わせで効率的に暗記。必須300語を収録。" },
    { title: "古文上達 基礎編", subject: "国語", type: "問題集", matchRate: 85, description: "助動詞の識別から読解まで段階的に。敬語表現の整理にも。" },
    { title: "漢文 早覚え速答法", subject: "国語", type: "参考書", matchRate: 78, description: "句法を効率的に整理。共通テスト漢文の得点源に。" },
  ],
  物理: [
    { title: "物理のエッセンス 力学・波動", subject: "物理", type: "参考書", matchRate: 90, description: "物理の根本原理から理解。図解が豊富で直感的に理解しやすい。" },
    { title: "良問の風 物理", subject: "物理", type: "問題集", matchRate: 88, description: "入試標準レベルの良問を厳選。力学・電磁気を中心に演習。" },
    { title: "物理のエッセンス 電磁気・熱・原子", subject: "物理", type: "参考書", matchRate: 85, description: "電磁気・熱力学の基礎概念を丁寧に。コンデンサー・電磁誘導を重点的に。" },
  ],
  化学: [
    { title: "化学 重要問題集", subject: "化学", type: "問題集", matchRate: 86, description: "理論・無機・有機を網羅した定番問題集。mol計算の反復に。" },
    { title: "鎌田の理論化学の講義", subject: "化学", type: "参考書", matchRate: 90, description: "理論化学の概念を図解で解説。化学平衡・酸塩基を重点的に。" },
    { title: "有機化学演習", subject: "化学", type: "問題集", matchRate: 82, description: "構造決定問題を中心に演習。芳香族・高分子の対策に。" },
  ],
};
export const materials: MaterialItem[] = Object.values(materialsBySubject).flat();

// 科目別タスク（週間）
export const tasksBySubject: Record<string, typeof todaysTasks> = {
  英語: [
    { title: "英語長文読解 演習問題3", subject: "英語", duration: 30, priority: "高", completed: true },
    { title: "英単語 ターゲット1900 Unit15", subject: "英語", duration: 20, priority: "中", completed: false },
    { title: "英文法 仮定法演習 10問", subject: "英語", duration: 25, priority: "中", completed: false },
    { title: "英作文 和文英訳 3題", subject: "英語", duration: 30, priority: "高", completed: false },
    { title: "リスニング 共テ形式 1回分", subject: "英語", duration: 30, priority: "中", completed: true },
  ],
  数学: [
    { title: "数学IIB 微分積分 基礎問題", subject: "数学", duration: 45, priority: "高", completed: false },
    { title: "数学IA 二次関数 最大最小 5題", subject: "数学", duration: 35, priority: "中", completed: true },
    { title: "数学IIB 数列 漸化式 3題", subject: "数学", duration: 40, priority: "高", completed: false },
    { title: "数学IIB ベクトル内積 演習", subject: "数学", duration: 40, priority: "中", completed: false },
    { title: "計算力トレーニング 20問", subject: "数学", duration: 15, priority: "低", completed: true },
  ],
  国語: [
    { title: "現代文 評論文読解トレーニング", subject: "国語", duration: 30, priority: "中", completed: false },
    { title: "古文 助動詞識別 演習", subject: "国語", duration: 25, priority: "高", completed: false },
    { title: "漢文 句法演習 10問", subject: "国語", duration: 20, priority: "中", completed: true },
    { title: "古文単語 ゴロゴ 50語", subject: "国語", duration: 15, priority: "低", completed: false },
  ],
  物理: [
    { title: "物理 力学 運動方程式の応用", subject: "物理", duration: 40, priority: "高", completed: false },
    { title: "物理 エネルギー保存則 演習", subject: "物理", duration: 35, priority: "高", completed: false },
    { title: "物理 電場と電位 基礎", subject: "物理", duration: 40, priority: "中", completed: false },
  ],
  化学: [
    { title: "化学 mol計算 演習 10題", subject: "化学", duration: 30, priority: "中", completed: true },
    { title: "化学 酸化還元反応 演習", subject: "化学", duration: 35, priority: "高", completed: false },
    { title: "化学 有機化学 構造決定 2題", subject: "化学", duration: 40, priority: "高", completed: false },
  ],
};

export const chatHistory = [
  {
    role: "user" as const,
    message: "合成関数の微分がよくわかりません。教えてください。",
  },
  {
    role: "ai" as const,
    message: `合成関数の微分について一緒に考えていきましょう！

まずヒントです。合成関数とは「関数の中に関数がある」状態のことです。例えば y = (2x + 3)^5 のような形ですね。

この場合、外側の関数と内側の関数に分けて考えることがポイントです。

考えてみてください：
- 外側の関数は何でしょう？
- 内側の関数は何でしょう？`,
  },
  {
    role: "user" as const,
    message: "外側が5乗で、内側が2x+3ですか？",
  },
  {
    role: "ai" as const,
    message: `その通りです！素晴らしい理解です。

では、合成関数の微分の公式（チェインルール）を適用しましょう：

dy/dx = dy/du * du/dx

ここで u = 2x + 3 とおくと：
- y = u^5 → dy/du = 5u^4
- u = 2x + 3 → du/dx = 2

したがって：
dy/dx = 5u^4 * 2 = 10(2x + 3)^4

【練習問題】
次の関数を微分してみましょう：
1. y = (3x - 1)^4
2. y = sin(2x + 1)
3. y = e^(x^2)`,
  },
];

export const subjectColors: Record<string, string> = {
  英語: "bg-blue-100 text-blue-700",
  数学: "bg-purple-100 text-purple-700",
  国語: "bg-orange-100 text-orange-700",
  物理: "bg-teal-100 text-teal-700",
  化学: "bg-pink-100 text-pink-700",
  復習: "bg-gray-100 text-gray-700",
};

export const subjectBarColors: Record<string, string> = {
  英語: "#3B82F6",
  数学: "#8B5CF6",
  国語: "#F97316",
  物理: "#14B8A6",
  化学: "#EC4899",
};
