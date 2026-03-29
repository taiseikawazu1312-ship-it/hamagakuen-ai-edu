// 教師⇔生徒 共有学習データ（デモ用）
// student-data.ts の値をミラーし、教師側から同じデータを参照可能にする

export interface LearningTask {
  id: string;
  title: string;
  subject: string;
  duration: number;
  priority: "高" | "中" | "低";
  completed: boolean;
  assignedBy: "ai" | "teacher";
  assignedDate: string;
  completedDate?: string;
}

export interface WeeklyStudyLog {
  week: string;
  hoursStudied: number;
  targetHours: number;
  completionRate: number;
}

export interface StudentLearningProfile {
  studentId: string;
  streak: number;
  weeklyStudyHours: number;
  weeklyTargetHours: number;
  tasks: LearningTask[];
  weeklyLogs: WeeklyStudyLog[];
  comprehensionRadar: { area: string; score: number }[];
}

// 擬似乱数
function seed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return ((Math.sin(h) * 10000) % 1 + 1) % 1;
}

// 全生徒の学習データを生成
function generateLearningData(): Record<string, StudentLearningProfile> {
  const data: Record<string, StudentLearningProfile> = {};

  // s009 = 田中太郎（生徒ポータルのデータと完全一致させる）
  data["s009"] = {
    studentId: "s009",
    streak: 12,
    weeklyStudyHours: 18.5,
    weeklyTargetHours: 22,
    tasks: [
      { id: "t1", title: "英語長文読解 演習問題3", subject: "英語", duration: 30, priority: "高", completed: true, assignedBy: "ai", assignedDate: "2024-10-28", completedDate: "2024-10-28" },
      { id: "t2", title: "数学IIB 微分積分 基礎問題", subject: "数学", duration: 45, priority: "高", completed: false, assignedBy: "ai", assignedDate: "2024-10-28" },
      { id: "t3", title: "英単語 ターゲット1900 Unit15", subject: "英語", duration: 20, priority: "中", completed: false, assignedBy: "ai", assignedDate: "2024-10-28" },
      { id: "t4", title: "現代文 評論文読解トレーニング", subject: "国語", duration: 30, priority: "中", completed: false, assignedBy: "teacher", assignedDate: "2024-10-27" },
      { id: "t5", title: "物理 力学 運動方程式の応用", subject: "物理", duration: 40, priority: "高", completed: false, assignedBy: "teacher", assignedDate: "2024-10-27" },
    ],
    weeklyLogs: [
      { week: "第1週", hoursStudied: 19.5, targetHours: 22, completionRate: 85 },
      { week: "第2週", hoursStudied: 16.0, targetHours: 22, completionRate: 72 },
      { week: "第3週", hoursStudied: 20.5, targetHours: 22, completionRate: 90 },
      { week: "第4週", hoursStudied: 15.0, targetHours: 22, completionRate: 68 },
      { week: "第5週", hoursStudied: 20.0, targetHours: 22, completionRate: 88 },
      { week: "第6週", hoursStudied: 18.5, targetHours: 22, completionRate: 78 },
    ],
    comprehensionRadar: [
      { area: "英語読解", score: 82 },
      { area: "英語文法", score: 75 },
      { area: "数学IA", score: 70 },
      { area: "数学IIB", score: 62 },
      { area: "現代文", score: 78 },
      { area: "古文", score: 65 },
    ],
  };

  // 他の生徒 (s001-s008) のデータを生成
  const studentConfigs: { id: string; streak: number; hours: number; target: number }[] = [
    { id: "s001", streak: 28, hours: 25.0, target: 25 },
    { id: "s002", streak: 15, hours: 20.0, target: 22 },
    { id: "s003", streak: 8, hours: 17.5, target: 20 },
    { id: "s004", streak: 3, hours: 12.0, target: 20 },
    { id: "s005", streak: 22, hours: 19.0, target: 20 },
    { id: "s006", streak: 10, hours: 15.5, target: 18 },
    { id: "s007", streak: 18, hours: 22.0, target: 25 },
    { id: "s008", streak: 7, hours: 14.0, target: 18 },
  ];

  const subjects = ["数学", "英語", "国語", "物理", "化学"];
  const taskTemplates = [
    { t: "長文読解 演習", s: "英語", d: 30 },
    { t: "微分積分 標準問題", s: "数学", d: 45 },
    { t: "単語暗記 200語", s: "英語", d: 20 },
    { t: "評論文 記述練習", s: "国語", d: 30 },
    { t: "力学 応用問題", s: "物理", d: 40 },
    { t: "理論化学 計算演習", s: "化学", d: 35 },
    { t: "古文読解 助動詞", s: "国語", d: 25 },
    { t: "ベクトル 基本問題", s: "数学", d: 35 },
  ];

  for (const cfg of studentConfigs) {
    const r = seed(cfg.id);
    const tasks: LearningTask[] = [];
    const numTasks = 4 + Math.floor(r * 3);
    for (let i = 0; i < numTasks; i++) {
      const tmpl = taskTemplates[(i + Math.floor(r * 100)) % taskTemplates.length];
      const completed = i < Math.floor(numTasks * (0.3 + r * 0.4));
      tasks.push({
        id: `${cfg.id}-t${i}`,
        title: tmpl.t,
        subject: tmpl.s,
        duration: tmpl.d,
        priority: i < 2 ? "高" : i < 4 ? "中" : "低",
        completed,
        assignedBy: i % 3 === 0 ? "teacher" : "ai",
        assignedDate: `2024-10-${26 + (i % 3)}`,
        completedDate: completed ? `2024-10-${27 + (i % 2)}` : undefined,
      });
    }

    const weeklyLogs: WeeklyStudyLog[] = [];
    for (let w = 1; w <= 6; w++) {
      const wr = seed(cfg.id + `w${w}`);
      const rate = Math.round(50 + cfg.streak * 1.2 + wr * 20);
      weeklyLogs.push({
        week: `第${w}週`,
        hoursStudied: Math.round((cfg.hours * (0.8 + wr * 0.4)) * 10) / 10,
        targetHours: cfg.target,
        completionRate: Math.min(100, rate),
      });
    }

    const areas = ["英語読解", "英語文法", "数学IA", "数学IIB", "現代文", "古文"];
    const comprehensionRadar = areas.map((area, i) => ({
      area,
      score: Math.round(40 + cfg.streak * 0.8 + seed(cfg.id + area) * 30 + (i < 2 ? 10 : 0)),
    }));

    data[cfg.id] = {
      studentId: cfg.id,
      streak: cfg.streak,
      weeklyStudyHours: cfg.hours,
      weeklyTargetHours: cfg.target,
      tasks,
      weeklyLogs,
      comprehensionRadar,
    };
  }

  return data;
}

const learningData = generateLearningData();

export function getStudentLearning(studentId: string): StudentLearningProfile | undefined {
  return learningData[studentId];
}

export const subjectColorMap: Record<string, string> = {
  英語: "bg-blue-100 text-blue-700",
  数学: "bg-purple-100 text-purple-700",
  国語: "bg-orange-100 text-orange-700",
  物理: "bg-teal-100 text-teal-700",
  化学: "bg-pink-100 text-pink-700",
};
