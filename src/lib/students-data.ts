// Teacher-side: Individual student management data

export interface StudentListItem {
  id: string;
  name: string;
  class: string;
  grade: string;
  latestScore: number;
  trend: "up" | "down" | "flat";
  targetSchool: string;
  deviation: number;
  avatarInitial: string;
  tags: string[];
}

export interface StudentDetail extends StudentListItem {
  targetDepartment: string;
  entranceMethod: string;
  targetDeviation: number;
  strengths: string[];
  weaknesses: string[];
  aiComment: string;
}

export interface ExamResult {
  examName: string;
  provider: "駿台" | "河合塾";
  date: string;
  subjects: {
    name: string;
    score: number;
    maxScore: number;
    deviation: number;
  }[];
  totalScore: number;
  totalMaxScore: number;
  overallDeviation: number;
  rank: string;
  judgment?: { university: string; level: "A" | "B" | "C" | "D" | "E" };
}

export interface UnitScore {
  subject: string;
  unit: string;
  score: number;
  classAverage: number;
  status: "excellent" | "good" | "warning" | "danger";
}

export interface StudentTrendPoint {
  period: string;
  数学: number;
  国語: number;
  物理: number;
  化学: number;
  total: number;
}

// ============================================================
// Student List (8 students)
// ============================================================
export const studentsList: StudentDetail[] = [
  {
    id: "s001", name: "佐藤 花子", class: "Sクラス", grade: "高2",
    latestScore: 362, trend: "up", targetSchool: "東京大学 理科一類", deviation: 72.4,
    avatarInitial: "佐", tags: ["全科目安定", "物理◎"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 74.0,
    strengths: ["全科目バランスよく高得点", "物理の力学・電磁気に強い", "時間配分の意識が優秀"],
    weaknesses: ["国語の記述問題でやや減点が多い", "英語リスニングがやや弱い"],
    aiComment: "佐藤さんは全科目で安定した成績を維持しており、東大理一の合格圏内にいます。特に理科は偏差値75と突出しています。国語の記述力を強化すれば、さらに安定した合格が見込めます。12月模試では国語の記述対策の成果が問われるため、この1ヶ月が正念場です。",
  },
  {
    id: "s002", name: "山田 太一", class: "Aクラス", grade: "高2",
    latestScore: 298, trend: "up", targetSchool: "早稲田大学 商学部", deviation: 65.2,
    avatarInitial: "山", tags: ["数学急上昇", "英語苦手"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 68.0,
    strengths: ["数学の伸びが著しい（偏差値+8/3ヶ月）", "文章題への取り組み意欲が高い"],
    weaknesses: ["英語のリスニング分野が弱い", "ケアレスミスが多い（特に計算）"],
    aiComment: "山田くんは直近3ヶ月で数学の偏差値が8上昇しており、成長速度は学年トップクラスです。一方、英語のリスニングと計算ミスが課題です。計算ミスは「検算の習慣化」で改善可能であり、これだけで偏差値1〜2の改善が見込めます。早稲田商学部合格には英語の底上げが鍵です。",
  },
  {
    id: "s003", name: "鈴木 美咲", class: "Aクラス", grade: "高2",
    latestScore: 285, trend: "flat", targetSchool: "慶應義塾大学 文学部", deviation: 63.8,
    avatarInitial: "鈴", tags: ["国語◎", "数学停滞"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 66.0,
    strengths: ["国語の読解力が非常に高い", "記述問題の得点率がクラストップ"],
    weaknesses: ["数学の微分積分が弱い", "物理の計算問題で躓く", "数学の成績が3ヶ月横ばい"],
    aiComment: "鈴木さんは国語が突出して強く、記述問題では安定して高得点を取れています。しかし数学が3ヶ月間横ばいで、特に微分積分の単元で正答率が40%台と低迷しています。数学の基礎からの再構築が急務です。慶應文学部は小論文・国語重視の配点なので、数学を平均レベルに引き上げれば合格可能性は高いです。",
  },
  {
    id: "s004", name: "高橋 健太", class: "Bクラス", grade: "高2",
    latestScore: 242, trend: "down", targetSchool: "北海道大学 総合理系", deviation: 57.1,
    avatarInitial: "高", tags: ["成績低下中", "物理好き"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 62.5,
    strengths: ["物理への興味・関心が高い", "物理の記述問題の質が良い"],
    weaknesses: ["数学・国語とも下降傾向", "宿題の提出率が低下（80%→60%）", "集中力の持続に課題"],
    aiComment: "高橋くんは2学期に入って成績が下降傾向にあります。宿題提出率も80%から60%に低下しており、学習習慣の乱れが懸念されます。物理への興味は強く、物理を起点にしたモチベーション回復が有効と考えます。北大総合理系の合格には偏差値62.5が必要で、現状から5.4の改善が求められます。まず宿題提出率を80%以上に戻すことが最優先です。",
  },
  {
    id: "s005", name: "田中 陽菜", class: "Bクラス", grade: "高2",
    latestScore: 255, trend: "up", targetSchool: "関西学院大学 経済学部", deviation: 59.4,
    avatarInitial: "田", tags: ["着実に成長", "日本史◎"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 62.0,
    strengths: ["日本史（特に近現代史）が得意", "コツコツ型で学習習慣が安定", "毎日欠かさず学習している"],
    weaknesses: ["数学の応用問題が苦手", "化学の理論分野が弱い"],
    aiComment: "田中さんは着実に成績を伸ばしており、5ヶ月前の偏差値55から59.4まで上昇しました。日本史は偏差値65と強みです。数学の応用問題と化学分野が課題ですが、学習習慣が非常に安定しているため、適切な教材を与えれば確実に伸びるタイプです。関西学院大学の合格ラインまであと偏差値2.6です。",
  },
  {
    id: "s006", name: "伊藤 龍之介", class: "Cクラス", grade: "高2",
    latestScore: 210, trend: "flat", targetSchool: "小樽商科大学 商学部", deviation: 52.3,
    avatarInitial: "伊", tags: ["基礎固め中", "数学苦手"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 55.0,
    strengths: ["国語の漢字・語彙力は高い", "真面目な性格で指示に従える"],
    weaknesses: ["数学全般が苦手（偏差値48）", "文章題の立式ができない", "英語の語彙力が不足"],
    aiComment: "伊藤くんは数学の偏差値が48と他科目に比べて足を引っ張っています。文章題を読んで式を立てる力が不足しており、「何を求めるか」を整理する訓練が必要です。小樽商科大学の合格には偏差値55が必要で、現在の52.3からあと2.7の改善で到達可能です。英語の語彙力強化と数学の基礎固めを並行して進めましょう。",
  },
  {
    id: "s007", name: "中村 さくら", class: "Sクラス", grade: "高2",
    latestScore: 348, trend: "down", targetSchool: "京都大学 理学部", deviation: 70.1,
    avatarInitial: "中", tags: ["国語低下", "数学◎"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 72.0,
    strengths: ["数学は偏差値74と学年トップクラス", "論理的思考力が高い"],
    weaknesses: ["国語の成績が2ヶ月連続で低下", "長文読解のスピードが落ちている", "最近やや意欲低下気味"],
    aiComment: "中村さんは数学が非常に強い一方、国語が2ヶ月連続で低下しており注意が必要です。長文読解のスピードが落ちていることから、読書量の減少や疲労の蓄積が考えられます。京大理学部合格には国語の安定が不可欠です。学習量よりも質を重視し、1日の学習時間を適正に保つことを提案します。",
  },
  {
    id: "s008", name: "小林 大翔", class: "Cクラス", grade: "高2",
    latestScore: 198, trend: "up", targetSchool: "北海学園大学 経済学部", deviation: 50.5,
    avatarInitial: "小", tags: ["急成長中", "数学改善"],
    targetDepartment: "", entranceMethod: "一般入試", targetDeviation: 47.5,
    strengths: ["この2ヶ月で偏差値が4上昇", "数学の基礎計算力が改善", "前向きな学習態度"],
    weaknesses: ["全科目で基礎の抜けが多い", "テスト慣れしていない", "時間配分に課題"],
    aiComment: "小林くんはこの2ヶ月で偏差値が46.5から50.5へと大きく伸びました。基礎計算ドリルの効果が出ています。北海学園大学の合格ライン47.5は既にクリアしており、このペースを維持すれば安定した合格が見込めます。さらに上位の大学も視野に入れられるよう、基礎の穴を埋めていきましょう。",
  },
];

// ============================================================
// Exam History per student
// ============================================================
export const examHistory: Record<string, ExamResult[]> = {
  s001: [
    { examName: "第1回 駿台全国模試", provider: "駿台" as const, date: "2024-05", subjects: [
      { name: "数学", score: 88, maxScore: 100, deviation: 72.0 },
      { name: "国語", score: 82, maxScore: 100, deviation: 70.5 },
      { name: "物理", score: 90, maxScore: 100, deviation: 74.8 },
      { name: "化学", score: 78, maxScore: 100, deviation: 68.2 },
    ], totalScore: 338, totalMaxScore: 400, overallDeviation: 71.2, rank: "15/450" },
    { examName: "第1回 全統記述模試", provider: "河合塾" as const, date: "2024-06", subjects: [
      { name: "数学", score: 90, maxScore: 100, deviation: 73.1 },
      { name: "国語", score: 78, maxScore: 100, deviation: 68.0 },
      { name: "物理", score: 92, maxScore: 100, deviation: 75.5 },
      { name: "化学", score: 80, maxScore: 100, deviation: 69.0 },
    ], totalScore: 340, totalMaxScore: 400, overallDeviation: 71.5, rank: "12/450" },
    { examName: "第2回 全統共通テスト模試", provider: "河合塾" as const, date: "2024-08", subjects: [
      { name: "数学", score: 92, maxScore: 100, deviation: 73.8 },
      { name: "国語", score: 85, maxScore: 100, deviation: 71.2 },
      { name: "物理", score: 95, maxScore: 100, deviation: 76.5 },
      { name: "化学", score: 82, maxScore: 100, deviation: 70.0 },
    ], totalScore: 354, totalMaxScore: 400, overallDeviation: 72.8, rank: "8/450" },
    { examName: "第2回 駿台全国模試", provider: "駿台" as const, date: "2024-10", subjects: [
      { name: "数学", score: 91, maxScore: 100, deviation: 73.5 },
      { name: "国語", score: 80, maxScore: 100, deviation: 69.2 },
      { name: "物理", score: 93, maxScore: 100, deviation: 75.8 },
      { name: "化学", score: 85, maxScore: 100, deviation: 71.5 },
    ], totalScore: 349, totalMaxScore: 400, overallDeviation: 72.4, rank: "10/450" },
  ],
  s002: [
    { examName: "第1回 駿台全国模試", provider: "駿台" as const, date: "2024-05", subjects: [
      { name: "数学", score: 62, maxScore: 100, deviation: 55.0 },
      { name: "国語", score: 70, maxScore: 100, deviation: 60.5 },
      { name: "物理", score: 68, maxScore: 100, deviation: 58.8 },
      { name: "化学", score: 55, maxScore: 100, deviation: 50.2 },
    ], totalScore: 255, totalMaxScore: 400, overallDeviation: 56.5, rank: "180/450" },
    { examName: "第1回 全統記述模試", provider: "河合塾" as const, date: "2024-06", subjects: [
      { name: "数学", score: 70, maxScore: 100, deviation: 60.2 },
      { name: "国語", score: 72, maxScore: 100, deviation: 62.0 },
      { name: "物理", score: 72, maxScore: 100, deviation: 61.5 },
      { name: "化学", score: 58, maxScore: 100, deviation: 52.0 },
    ], totalScore: 272, totalMaxScore: 400, overallDeviation: 59.8, rank: "145/450" },
    { examName: "第2回 全統共通テスト模試", provider: "河合塾" as const, date: "2024-08", subjects: [
      { name: "数学", score: 78, maxScore: 100, deviation: 65.5 },
      { name: "国語", score: 75, maxScore: 100, deviation: 64.0 },
      { name: "物理", score: 74, maxScore: 100, deviation: 62.8 },
      { name: "化学", score: 60, maxScore: 100, deviation: 53.5 },
    ], totalScore: 287, totalMaxScore: 400, overallDeviation: 63.0, rank: "110/450" },
    { examName: "第2回 駿台全国模試", provider: "駿台" as const, date: "2024-10", subjects: [
      { name: "数学", score: 82, maxScore: 100, deviation: 68.0 },
      { name: "国語", score: 73, maxScore: 100, deviation: 63.0 },
      { name: "物理", score: 76, maxScore: 100, deviation: 64.2 },
      { name: "化学", score: 62, maxScore: 100, deviation: 54.8 },
    ], totalScore: 293, totalMaxScore: 400, overallDeviation: 65.2, rank: "95/450" },
  ],
  s004: [
    { examName: "第1回 駿台全国模試", provider: "駿台" as const, date: "2024-05", subjects: [
      { name: "数学", score: 65, maxScore: 100, deviation: 57.0 },
      { name: "国語", score: 68, maxScore: 100, deviation: 59.0 },
      { name: "物理", score: 72, maxScore: 100, deviation: 61.5 },
      { name: "化学", score: 60, maxScore: 100, deviation: 53.5 },
    ], totalScore: 265, totalMaxScore: 400, overallDeviation: 60.2, rank: "130/450" },
    { examName: "第1回 全統記述模試", provider: "河合塾" as const, date: "2024-06", subjects: [
      { name: "数学", score: 63, maxScore: 100, deviation: 55.8 },
      { name: "国語", score: 65, maxScore: 100, deviation: 57.0 },
      { name: "物理", score: 70, maxScore: 100, deviation: 60.2 },
      { name: "化学", score: 58, maxScore: 100, deviation: 52.0 },
    ], totalScore: 256, totalMaxScore: 400, overallDeviation: 58.5, rank: "155/450" },
    { examName: "第2回 全統共通テスト模試", provider: "河合塾" as const, date: "2024-08", subjects: [
      { name: "数学", score: 60, maxScore: 100, deviation: 53.8 },
      { name: "国語", score: 62, maxScore: 100, deviation: 55.0 },
      { name: "物理", score: 68, maxScore: 100, deviation: 58.8 },
      { name: "化学", score: 55, maxScore: 100, deviation: 50.5 },
    ], totalScore: 245, totalMaxScore: 400, overallDeviation: 57.5, rank: "175/450" },
    { examName: "第2回 駿台全国模試", provider: "駿台" as const, date: "2024-10", subjects: [
      { name: "数学", score: 58, maxScore: 100, deviation: 52.5 },
      { name: "国語", score: 60, maxScore: 100, deviation: 53.8 },
      { name: "物理", score: 70, maxScore: 100, deviation: 60.2 },
      { name: "化学", score: 54, maxScore: 100, deviation: 49.8 },
    ], totalScore: 242, totalMaxScore: 400, overallDeviation: 57.1, rank: "185/450" },
  ],
};

// Generate default exam data for students without explicit entries
function generateExamData(student: StudentDetail): ExamResult[] {
  const base = student.deviation - 5;
  return [
    { examName: "第1回 駿台全国模試", provider: "駿台" as const, date: "2024-05", subjects: [
      { name: "数学", score: Math.round(base * 1.0 + 5), maxScore: 100, deviation: base - 2 },
      { name: "国語", score: Math.round(base * 0.95 + 8), maxScore: 100, deviation: base - 1 },
      { name: "物理", score: Math.round(base * 0.9 + 10), maxScore: 100, deviation: base - 3 },
      { name: "化学", score: Math.round(base * 0.85 + 12), maxScore: 100, deviation: base - 4 },
    ], totalScore: Math.round(student.latestScore - 30), totalMaxScore: 400, overallDeviation: student.deviation - 4, rank: `${Math.round(450 - student.deviation * 4)}/450` },
    { examName: "第1回 全統記述模試", provider: "河合塾" as const, date: "2024-06", subjects: [
      { name: "数学", score: Math.round(base * 1.02 + 6), maxScore: 100, deviation: base - 1 },
      { name: "国語", score: Math.round(base * 0.97 + 9), maxScore: 100, deviation: base },
      { name: "物理", score: Math.round(base * 0.92 + 11), maxScore: 100, deviation: base - 2 },
      { name: "化学", score: Math.round(base * 0.88 + 13), maxScore: 100, deviation: base - 3 },
    ], totalScore: Math.round(student.latestScore - 18), totalMaxScore: 400, overallDeviation: student.deviation - 2.5, rank: `${Math.round(450 - student.deviation * 4.2)}/450` },
    { examName: "第2回 全統共通テスト模試", provider: "河合塾" as const, date: "2024-08", subjects: [
      { name: "数学", score: Math.round(base * 1.05 + 7), maxScore: 100, deviation: base },
      { name: "国語", score: Math.round(base * 1.0 + 10), maxScore: 100, deviation: base + 1 },
      { name: "物理", score: Math.round(base * 0.95 + 12), maxScore: 100, deviation: base - 1 },
      { name: "化学", score: Math.round(base * 0.9 + 14), maxScore: 100, deviation: base - 2 },
    ], totalScore: Math.round(student.latestScore - 8), totalMaxScore: 400, overallDeviation: student.deviation - 1, rank: `${Math.round(450 - student.deviation * 4.5)}/450` },
    { examName: "第2回 駿台全国模試", provider: "駿台" as const, date: "2024-10", subjects: [
      { name: "数学", score: Math.round(base * 1.08 + 8), maxScore: 100, deviation: base + 1 },
      { name: "国語", score: Math.round(base * 1.02 + 10), maxScore: 100, deviation: base + 2 },
      { name: "物理", score: Math.round(base * 0.98 + 13), maxScore: 100, deviation: base },
      { name: "化学", score: Math.round(base * 0.92 + 15), maxScore: 100, deviation: base - 1 },
    ], totalScore: student.latestScore, totalMaxScore: 400, overallDeviation: student.deviation, rank: `${Math.round(450 - student.deviation * 4.8)}/450` },
  ];
}

export function getExamHistory(studentId: string): ExamResult[] {
  if (examHistory[studentId]) return examHistory[studentId];
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return [];
  return generateExamData(student);
}

// ============================================================
// Unit Scores per student (カリキュラム単元ベース)
// ============================================================
import { curriculum } from "./curriculum-data";

// セクション単位の集約スコア
export interface SectionScore {
  subjectId: string;
  subjectName: string;
  sectionId: string;
  sectionName: string;
  avgScore: number;
  classAverage: number;
  status: "excellent" | "good" | "warning" | "danger";
  units: UnitScore[];
}

// 擬似乱数（生徒ID + 単元IDからシード生成）
function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  return ((Math.sin(h) * 10000) % 1 + 1) % 1;
}

export function getUnitScores(studentId: string): UnitScore[] {
  const student = studentsList.find(s => s.id === studentId);
  if (!student) return [];
  const d = student.deviation;
  const results: UnitScore[] = [];

  for (const subject of curriculum) {
    for (const section of subject.sections) {
      for (const unit of section.units) {
        const r = seededRandom(studentId + unit.id);
        // 基礎科目は偏差値に比例、発展は低め、ランダム要素も
        const baseFactor = unit.importance === 1 ? 1.15 : unit.importance === 2 ? 0.95 : 0.78;
        const rawScore = d * baseFactor + (r * 20 - 10);
        const score = Math.max(20, Math.min(98, Math.round(rawScore)));
        const classAvg = Math.round(50 + (r * 15 - 5));
        const status: UnitScore["status"] = score >= 80 ? "excellent" : score >= 65 ? "good" : score >= 50 ? "warning" : "danger";
        results.push({ subject: subject.subjectName, unit: `${section.name} - ${unit.name}`, score, classAverage: classAvg, status });
      }
    }
  }
  return results;
}

export function getSectionScores(studentId: string): SectionScore[] {
  const allUnits = getUnitScores(studentId);
  const sections: SectionScore[] = [];

  for (const subject of curriculum) {
    for (const section of subject.sections) {
      const sectionUnits = allUnits.filter(u => u.unit.startsWith(section.name + " - "));
      if (sectionUnits.length === 0) continue;
      const avgScore = Math.round(sectionUnits.reduce((s, u) => s + u.score, 0) / sectionUnits.length);
      const classAvg = Math.round(sectionUnits.reduce((s, u) => s + u.classAverage, 0) / sectionUnits.length);
      const status: SectionScore["status"] = avgScore >= 80 ? "excellent" : avgScore >= 65 ? "good" : avgScore >= 50 ? "warning" : "danger";
      sections.push({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName,
        sectionId: section.id,
        sectionName: section.name,
        avgScore, classAverage: classAvg, status,
        units: sectionUnits,
      });
    }
  }
  return sections;
}

// ============================================================
// Trend Data per student
// ============================================================
export function getStudentTrend(studentId: string): StudentTrendPoint[] {
  const exams = getExamHistory(studentId);
  return exams.map(e => ({
    period: e.date.replace('2024-', '') + '月',
    数学: e.subjects.find(s => s.name === '数学')?.deviation || 50,
    国語: e.subjects.find(s => s.name === '国語')?.deviation || 50,
    物理: e.subjects.find(s => s.name === '物理')?.deviation || 50,
    化学: e.subjects.find(s => s.name === '化学')?.deviation || 50,
    total: e.overallDeviation,
  }));
}
