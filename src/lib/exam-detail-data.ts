// 模試の種類定義（駿台・河合塾の実際の模試に基づく）
export interface MockExamType {
  id: string;
  name: string;
  provider: "駿台" | "河合塾";
  type: "記述" | "マーク" | "共テ";
  subjects: string[];
  totalApplicants: number;
}

export const mockExamTypes: MockExamType[] = [
  { id: "sundai-1", name: "第1回 駿台全国模試", provider: "駿台", type: "記述", subjects: ["英語", "数学", "国語", "物理", "化学"], totalApplicants: 39669 },
  { id: "zentou-1", name: "第1回 全統共通テスト模試", provider: "河合塾", type: "共テ", subjects: ["英語R", "英語L", "数学IA", "数学IIB", "国語", "物理", "化学"], totalApplicants: 42830 },
  { id: "zentou-k1", name: "第1回 全統記述模試", provider: "河合塾", type: "記述", subjects: ["英語", "数学", "国語", "物理", "化学"], totalApplicants: 38450 },
  { id: "sundai-2", name: "第2回 駿台全国模試", provider: "駿台", type: "記述", subjects: ["英語", "数学", "国語", "物理", "化学"], totalApplicants: 41200 },
  { id: "zentou-2", name: "第2回 全統共通テスト模試", provider: "河合塾", type: "共テ", subjects: ["英語R", "英語L", "数学IA", "数学IIB", "国語", "物理", "化学"], totalApplicants: 45120 },
];

// 合格判定
export type JudgmentLevel = "A" | "B" | "C" | "D" | "E";
export interface UnivJudgment {
  university: string;
  department: string;
  judgment: JudgmentLevel;
  borderDeviation: number;
  studentDeviation: number;
  gap: number;
}

// 設問別成績
export interface QuestionResult {
  questionNo: string;  // 大問番号
  area: string;        // 出題分野
  score: number;       // 得点
  maxScore: number;    // 配点
  avgScore: number;    // 全体平均点
  rate: number;        // 得点率%
  avgRate: number;     // 全体平均得点率%
}

// 科目別の設問別成績
export interface SubjectQuestionDetail {
  subject: string;
  questions: QuestionResult[];
  radarData: { area: string; score: number; avg: number }[];
  comment: string;     // 学習アドバイス
}

// 個別生徒の模試詳細データ（デモ）
export const sampleExamDetail: {
  examName: string;
  provider: string;
  date: string;
  totalApplicants: number;
  judgments: UnivJudgment[];
  questionDetails: SubjectQuestionDetail[];
} = {
  examName: "第2回 全統共通テスト模試",
  provider: "河合塾",
  date: "2024年10月実施",
  totalApplicants: 45120,
  judgments: [
    { university: "早稲田大学", department: "商学部", judgment: "C", borderDeviation: 67.5, studentDeviation: 65.0, gap: -2.5 },
    { university: "明治大学", department: "商学部", judgment: "B", borderDeviation: 62.5, studentDeviation: 65.0, gap: 2.5 },
    { university: "中央大学", department: "商学部", judgment: "A", borderDeviation: 60.0, studentDeviation: 65.0, gap: 5.0 },
  ],
  questionDetails: [
    {
      subject: "英語リーディング",
      questions: [
        { questionNo: "第1問", area: "短文読解", score: 8, maxScore: 10, avgScore: 6.8, rate: 80, avgRate: 68 },
        { questionNo: "第2問", area: "情報検索", score: 14, maxScore: 20, avgScore: 12.5, rate: 70, avgRate: 62.5 },
        { questionNo: "第3問", area: "長文読解（物語）", score: 12, maxScore: 15, avgScore: 9.2, rate: 80, avgRate: 61.3 },
        { questionNo: "第4問", area: "長文読解（説明文）", score: 10, maxScore: 16, avgScore: 8.8, rate: 62.5, avgRate: 55.0 },
        { questionNo: "第5問", area: "長文読解（論説）", score: 20, maxScore: 24, avgScore: 14.5, rate: 83.3, avgRate: 60.4 },
        { questionNo: "第6問", area: "長文読解（総合）", score: 16, maxScore: 24, avgScore: 11.2, rate: 66.7, avgRate: 46.7 },
      ],
      radarData: [
        { area: "短文読解", score: 80, avg: 68 },
        { area: "情報検索", score: 70, avg: 62 },
        { area: "物語文", score: 80, avg: 61 },
        { area: "説明文", score: 62, avg: 55 },
        { area: "論説文", score: 83, avg: 60 },
      ],
      comment: "長文読解は全体的に平均を上回っています。特に論説文の読解力は高水準です。一方、説明文（第4問）でやや得点率が低く、グラフ・図表を含む問題の読み取りに課題があります。図表問題を重点的に演習しましょう。",
    },
    {
      subject: "数学IA",
      questions: [
        { questionNo: "第1問", area: "数と式・集合と論理", score: 18, maxScore: 30, avgScore: 16.5, rate: 60, avgRate: 55 },
        { questionNo: "第2問", area: "二次関数・データの分析", score: 15, maxScore: 30, avgScore: 14.2, rate: 50, avgRate: 47.3 },
        { questionNo: "第3問", area: "場合の数と確率", score: 14, maxScore: 20, avgScore: 10.8, rate: 70, avgRate: 54 },
        { questionNo: "第4問", area: "整数の性質", score: 10, maxScore: 20, avgScore: 8.5, rate: 50, avgRate: 42.5 },
      ],
      radarData: [
        { area: "数と式", score: 60, avg: 55 },
        { area: "二次関数", score: 50, avg: 47 },
        { area: "確率", score: 70, avg: 54 },
        { area: "整数", score: 50, avg: 42 },
      ],
      comment: "場合の数と確率は平均を大きく上回っており得意分野です。一方、二次関数と整数の性質が50%と伸び悩んでいます。二次関数は共通テスト頻出のため、最大・最小問題を重点演習してください。",
    },
    {
      subject: "数学IIB",
      questions: [
        { questionNo: "第1問", area: "三角関数・指数対数", score: 12, maxScore: 30, avgScore: 14.5, rate: 40, avgRate: 48.3 },
        { questionNo: "第2問", area: "微分・積分", score: 15, maxScore: 30, avgScore: 13.0, rate: 50, avgRate: 43.3 },
        { questionNo: "第3問", area: "数列", score: 10, maxScore: 20, avgScore: 9.5, rate: 50, avgRate: 47.5 },
        { questionNo: "第4問", area: "ベクトル", score: 8, maxScore: 20, avgScore: 8.2, rate: 40, avgRate: 41 },
      ],
      radarData: [
        { area: "三角関数", score: 40, avg: 48 },
        { area: "微積分", score: 50, avg: 43 },
        { area: "数列", score: 50, avg: 47 },
        { area: "ベクトル", score: 40, avg: 41 },
      ],
      comment: "微積分と数列は平均をやや上回っていますが、三角関数（40%）とベクトル（40%）が大きな弱点です。三角関数は公式の使い分けが不安定で、ベクトルは空間座標への応用で躓いています。基本公式の暗記から始めましょう。",
    },
    {
      subject: "物理",
      questions: [
        { questionNo: "第1問", area: "小問集合", score: 12, maxScore: 20, avgScore: 11.5, rate: 60, avgRate: 57.5 },
        { questionNo: "第2問", area: "力学", score: 10, maxScore: 25, avgScore: 12.0, rate: 40, avgRate: 48 },
        { questionNo: "第3問", area: "電磁気", score: 14, maxScore: 25, avgScore: 10.5, rate: 56, avgRate: 42 },
        { questionNo: "第4問", area: "波動", score: 12, maxScore: 20, avgScore: 9.8, rate: 60, avgRate: 49 },
        { questionNo: "選択", area: "熱力学", score: 6, maxScore: 10, avgScore: 5.2, rate: 60, avgRate: 52 },
      ],
      radarData: [
        { area: "小問", score: 60, avg: 57 },
        { area: "力学", score: 40, avg: 48 },
        { area: "電磁気", score: 56, avg: 42 },
        { area: "波動", score: 60, avg: 49 },
        { area: "熱力学", score: 60, avg: 52 },
      ],
      comment: "電磁気・波動・熱力学は平均を上回っており、電磁気は特に高得点です。一方、力学（40%）が大きな課題です。運動方程式の立式に問題があり、力の図示から丁寧にやり直す必要があります。力学は他の全分野の基礎なので最優先で取り組んでください。",
    },
    {
      subject: "化学",
      questions: [
        { questionNo: "第1問", area: "小問集合", score: 14, maxScore: 20, avgScore: 12.0, rate: 70, avgRate: 60 },
        { questionNo: "第2問", area: "理論化学（化学平衡）", score: 12, maxScore: 25, avgScore: 11.5, rate: 48, avgRate: 46 },
        { questionNo: "第3問", area: "無機化学", score: 16, maxScore: 25, avgScore: 13.0, rate: 64, avgRate: 52 },
        { questionNo: "第4問", area: "有機化学", score: 10, maxScore: 20, avgScore: 9.0, rate: 50, avgRate: 45 },
        { questionNo: "選択", area: "高分子化合物", score: 6, maxScore: 10, avgScore: 5.5, rate: 60, avgRate: 55 },
      ],
      radarData: [
        { area: "小問", score: 70, avg: 60 },
        { area: "理論", score: 48, avg: 46 },
        { area: "無機", score: 64, avg: 52 },
        { area: "有機", score: 50, avg: 45 },
        { area: "高分子", score: 60, avg: 55 },
      ],
      comment: "無機化学と小問集合は平均を大きく上回っています。理論化学の化学平衡が48%とやや弱く、有機化学も50%に留まっています。理論化学は平衡定数の計算問題を、有機は構造決定問題を重点的に演習しましょう。",
    },
  ],
};
