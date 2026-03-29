// 教師⇔生徒 共有学習データ（デモ用）

import { curriculum, getAllUnits } from "./curriculum-data";

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
  relatedUnitId?: string; // カリキュラム単元との紐付け
}

export interface WeeklyTaskSet {
  weekLabel: string;     // "10/21〜10/27" など
  weekNumber: number;    // 1-based
  startDate: string;
  tasks: LearningTask[];
  totalMinutes: number;
  completedMinutes: number;
  completionRate: number;
}

export interface CurriculumProgress {
  subjectId: string;
  subjectName: string;
  totalUnits: number;
  completedUnits: number;
  inProgressUnits: number;
  notStartedUnits: number;
  progressPercent: number;
  sections: {
    sectionName: string;
    totalUnits: number;
    completedUnits: number;
    status: "completed" | "in_progress" | "not_started";
  }[];
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
  weeklyTaskSets: WeeklyTaskSet[];
  weeklyLogs: WeeklyStudyLog[];
  comprehensionRadar: { area: string; score: number }[];
  curriculumProgress: CurriculumProgress[];
}

// 擬似乱数
function seed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return ((Math.sin(h) * 10000) % 1 + 1) % 1;
}

// タスクテンプレート
const taskPool = [
  { t: "英語長文読解 演習", s: "英語", d: 30, u: "e1" },
  { t: "英単語 暗記200語", s: "英語", d: 20, u: "e14" },
  { t: "英文法 仮定法演習", s: "英語", d: 25, u: "e9" },
  { t: "英作文 和文英訳", s: "英語", d: 30, u: "e16" },
  { t: "数学IA 二次関数 最大最小", s: "数学", d: 40, u: "m6" },
  { t: "数学IA 確率 条件付き確率", s: "数学", d: 35, u: "m13" },
  { t: "数学IIB 微分積分 基礎", s: "数学", d: 45, u: "m28" },
  { t: "数学IIB ベクトル内積", s: "数学", d: 40, u: "m35" },
  { t: "数学IIB 数列 漸化式", s: "数学", d: 40, u: "m33" },
  { t: "数学III 合成関数の微分", s: "数学", d: 45, u: "m43" },
  { t: "現代文 評論文読解", s: "国語", d: 30, u: "j1" },
  { t: "古文 助動詞の識別", s: "国語", d: 25, u: "j6" },
  { t: "漢文 句法演習", s: "国語", d: 20, u: "j11" },
  { t: "物理 運動方程式の応用", s: "物理", d: 40, u: "p3" },
  { t: "物理 エネルギー保存則", s: "物理", d: 35, u: "p4" },
  { t: "物理 電場と電位", s: "物理", d: 40, u: "p8" },
  { t: "化学 mol計算演習", s: "化学", d: 30, u: "c1" },
  { t: "化学 酸化還元反応", s: "化学", d: 35, u: "c3" },
  { t: "化学 有機化学 構造決定", s: "化学", d: 40, u: "c17" },
];

// 週の日付ラベル生成
function weekLabel(weekNum: number): string {
  const baseDate = new Date(2024, 8, 30); // 9/30
  const start = new Date(baseDate);
  start.setDate(start.getDate() + (weekNum - 1) * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return `${start.getMonth() + 1}/${start.getDate()}〜${end.getMonth() + 1}/${end.getDate()}`;
}

function weekStartDate(weekNum: number): string {
  const baseDate = new Date(2024, 8, 30);
  const start = new Date(baseDate);
  start.setDate(start.getDate() + (weekNum - 1) * 7);
  return start.toISOString().split("T")[0];
}

// カリキュラム進捗を生成
function generateCurriculumProgress(studentId: string, deviation: number): CurriculumProgress[] {
  return curriculum.map(subject => {
    const sections = subject.sections.map((section, si) => {
      const r = seed(studentId + section.id);
      // 偏差値が高いほど進捗が高い、セクション順で前のほうが完了率高い
      const progressFactor = (deviation - 40) / 35;
      const positionFactor = 1 - (si / subject.sections.length) * 0.6;
      const completedRatio = Math.min(1, progressFactor * positionFactor + (r * 0.3 - 0.15));
      const completed = Math.floor(section.units.length * completedRatio);
      const inProgress = completed < section.units.length ? Math.min(2, section.units.length - completed) : 0;
      return {
        sectionName: section.name,
        totalUnits: section.units.length,
        completedUnits: completed,
        status: (completed === section.units.length ? "completed" : completed > 0 || inProgress > 0 ? "in_progress" : "not_started") as "completed" | "in_progress" | "not_started",
      };
    });

    const totalUnits = sections.reduce((s, sec) => s + sec.totalUnits, 0);
    const completedUnits = sections.reduce((s, sec) => s + sec.completedUnits, 0);
    const inProgressUnits = sections.filter(s => s.status === "in_progress").length;
    const notStartedUnits = sections.filter(s => s.status === "not_started").length;

    return {
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
      totalUnits,
      completedUnits,
      inProgressUnits: inProgressUnits,
      notStartedUnits: notStartedUnits,
      progressPercent: Math.round((completedUnits / totalUnits) * 100),
      sections,
    };
  });
}

// 週ごとのタスクセットを生成
function generateWeeklyTasks(studentId: string, numWeeks: number): WeeklyTaskSet[] {
  const weeks: WeeklyTaskSet[] = [];
  for (let w = 1; w <= numWeeks; w++) {
    const r = seed(studentId + `week${w}`);
    const numTasks = 5 + Math.floor(r * 3); // 5-7 tasks per week
    const tasks: LearningTask[] = [];
    const isCurrent = w === numWeeks;
    const isPast = w < numWeeks;

    for (let t = 0; t < numTasks; t++) {
      const tmpl = taskPool[(Math.floor(seed(studentId + `w${w}t${t}`) * 100) + t) % taskPool.length];
      const completed = isPast ? seed(studentId + `w${w}c${t}`) > 0.2 : (isCurrent ? t < 2 && seed(studentId + `ct${t}`) > 0.4 : false);
      tasks.push({
        id: `${studentId}-w${w}-t${t}`,
        title: tmpl.t,
        subject: tmpl.s,
        duration: tmpl.d,
        priority: t < 2 ? "高" : t < 4 ? "中" : "低",
        completed,
        assignedBy: t % 3 === 0 ? "teacher" : "ai",
        assignedDate: weekStartDate(w),
        completedDate: completed ? weekStartDate(w) : undefined,
        relatedUnitId: tmpl.u,
      });
    }

    const totalMin = tasks.reduce((s, t) => s + t.duration, 0);
    const completedMin = tasks.filter(t => t.completed).reduce((s, t) => s + t.duration, 0);

    weeks.push({
      weekLabel: weekLabel(w),
      weekNumber: w,
      startDate: weekStartDate(w),
      tasks,
      totalMinutes: totalMin,
      completedMinutes: completedMin,
      completionRate: Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100),
    });
  }
  return weeks;
}

// s009用の手動データ（生徒ポータルと一致）
function generateS009Data(): StudentLearningProfile {
  const weeklyTaskSets: WeeklyTaskSet[] = [
    // 過去5週 + 今週
    ...([
      { wl: "9/30〜10/6", wn: 1, rate: 85, tasks: [
        { id: "s009-w1-t0", title: "英語長文読解 基礎演習1", subject: "英語", duration: 30, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-09-30", completedDate: "2024-09-30", relatedUnitId: "e1" },
        { id: "s009-w1-t1", title: "数学IA 二次関数演習", subject: "数学", duration: 40, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-09-30", completedDate: "2024-10-01", relatedUnitId: "m6" },
        { id: "s009-w1-t2", title: "物理 等加速度運動", subject: "物理", duration: 35, priority: "高" as const, completed: true, assignedBy: "teacher" as const, assignedDate: "2024-09-30", completedDate: "2024-10-02", relatedUnitId: "p1" },
        { id: "s009-w1-t3", title: "英単語 ターゲット1900 Unit10", subject: "英語", duration: 20, priority: "中" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-09-30", completedDate: "2024-10-03", relatedUnitId: "e14" },
        { id: "s009-w1-t4", title: "化学 mol計算基礎", subject: "化学", duration: 30, priority: "中" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-09-30", completedDate: "2024-10-04", relatedUnitId: "c1" },
        { id: "s009-w1-t5", title: "古文 用言活用", subject: "国語", duration: 25, priority: "低" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-09-30", relatedUnitId: "j5" },
      ]},
      { wl: "10/7〜10/13", wn: 2, rate: 72, tasks: [
        { id: "s009-w2-t0", title: "英語長文読解 演習問題1", subject: "英語", duration: 30, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-07", completedDate: "2024-10-07", relatedUnitId: "e1" },
        { id: "s009-w2-t1", title: "数学IIB 三角関数グラフ", subject: "数学", duration: 45, priority: "高" as const, completed: true, assignedBy: "teacher" as const, assignedDate: "2024-10-07", completedDate: "2024-10-08", relatedUnitId: "m24" },
        { id: "s009-w2-t2", title: "物理 力のつり合い", subject: "物理", duration: 40, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-07", completedDate: "2024-10-09", relatedUnitId: "p2" },
        { id: "s009-w2-t3", title: "現代文 小説読解", subject: "国語", duration: 30, priority: "中" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-10-07", relatedUnitId: "j2" },
        { id: "s009-w2-t4", title: "化学 酸と塩基", subject: "化学", duration: 35, priority: "中" as const, completed: false, assignedBy: "teacher" as const, assignedDate: "2024-10-07", relatedUnitId: "c2" },
      ]},
      { wl: "10/14〜10/20", wn: 3, rate: 90, tasks: [
        { id: "s009-w3-t0", title: "英語 段落整序演習", subject: "英語", duration: 25, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-14", completedDate: "2024-10-14", relatedUnitId: "e3" },
        { id: "s009-w3-t1", title: "数学IIB 微分法 導関数", subject: "数学", duration: 45, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-14", completedDate: "2024-10-15", relatedUnitId: "m28" },
        { id: "s009-w3-t2", title: "英単語 ターゲット1900 Unit12", subject: "英語", duration: 20, priority: "中" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-14", completedDate: "2024-10-16", relatedUnitId: "e14" },
        { id: "s009-w3-t3", title: "物理 運動方程式", subject: "物理", duration: 40, priority: "高" as const, completed: true, assignedBy: "teacher" as const, assignedDate: "2024-10-14", completedDate: "2024-10-17", relatedUnitId: "p3" },
        { id: "s009-w3-t4", title: "漢文 返り点演習", subject: "国語", duration: 20, priority: "低" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-14", completedDate: "2024-10-18", relatedUnitId: "j10" },
        { id: "s009-w3-t5", title: "化学 酸化還元", subject: "化学", duration: 35, priority: "中" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-10-14", relatedUnitId: "c3" },
      ]},
      { wl: "10/21〜10/27", wn: 4, rate: 68, tasks: [
        { id: "s009-w4-t0", title: "英語長文読解 演習問題2", subject: "英語", duration: 30, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-21", completedDate: "2024-10-21", relatedUnitId: "e1" },
        { id: "s009-w4-t1", title: "数学IIB 積分法 面積", subject: "数学", duration: 45, priority: "高" as const, completed: true, assignedBy: "teacher" as const, assignedDate: "2024-10-21", completedDate: "2024-10-23", relatedUnitId: "m31" },
        { id: "s009-w4-t2", title: "物理 コンデンサー", subject: "物理", duration: 40, priority: "高" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-10-21", relatedUnitId: "p9" },
        { id: "s009-w4-t3", title: "古文 敬語演習", subject: "国語", duration: 25, priority: "中" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-10-21", relatedUnitId: "j7" },
        { id: "s009-w4-t4", title: "英文法 関係詞", subject: "英語", duration: 25, priority: "中" as const, completed: false, assignedBy: "teacher" as const, assignedDate: "2024-10-21", relatedUnitId: "e10" },
      ]},
      { wl: "10/28〜11/3", wn: 5, rate: 88, tasks: [
        { id: "s009-w5-t0", title: "英語 論説文読解", subject: "英語", duration: 30, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-28", completedDate: "2024-10-28", relatedUnitId: "e1" },
        { id: "s009-w5-t1", title: "数学IIB 数列 等差等比", subject: "数学", duration: 40, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-28", completedDate: "2024-10-29", relatedUnitId: "m32" },
        { id: "s009-w5-t2", title: "物理 仕事とエネルギー", subject: "物理", duration: 40, priority: "高" as const, completed: true, assignedBy: "teacher" as const, assignedDate: "2024-10-28", completedDate: "2024-10-30", relatedUnitId: "p4" },
        { id: "s009-w5-t3", title: "現代文 評論文記述", subject: "国語", duration: 30, priority: "中" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-10-28", completedDate: "2024-10-31", relatedUnitId: "j4" },
        { id: "s009-w5-t4", title: "化学 電池と電気分解", subject: "化学", duration: 35, priority: "中" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-10-28", relatedUnitId: "c4" },
      ]},
    ].map(w => ({
      weekLabel: w.wl, weekNumber: w.wn, startDate: w.tasks[0].assignedDate,
      tasks: w.tasks,
      totalMinutes: w.tasks.reduce((s, t) => s + t.duration, 0),
      completedMinutes: w.tasks.filter(t => t.completed).reduce((s, t) => s + t.duration, 0),
      completionRate: w.rate,
    }))),
    // 今週（第6週）
    {
      weekLabel: "11/4〜11/10", weekNumber: 6, startDate: "2024-11-04",
      tasks: [
        { id: "t1", title: "英語長文読解 演習問題3", subject: "英語", duration: 30, priority: "高" as const, completed: true, assignedBy: "ai" as const, assignedDate: "2024-11-04", completedDate: "2024-11-04", relatedUnitId: "e1" },
        { id: "t2", title: "数学IIB 微分積分 基礎問題", subject: "数学", duration: 45, priority: "高" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-11-04", relatedUnitId: "m29" },
        { id: "t3", title: "英単語 ターゲット1900 Unit15", subject: "英語", duration: 20, priority: "中" as const, completed: false, assignedBy: "ai" as const, assignedDate: "2024-11-04", relatedUnitId: "e14" },
        { id: "t4", title: "現代文 評論文読解トレーニング", subject: "国語", duration: 30, priority: "中" as const, completed: false, assignedBy: "teacher" as const, assignedDate: "2024-11-04", relatedUnitId: "j1" },
        { id: "t5", title: "物理 力学 運動方程式の応用", subject: "物理", duration: 40, priority: "高" as const, completed: false, assignedBy: "teacher" as const, assignedDate: "2024-11-04", relatedUnitId: "p3" },
      ],
      totalMinutes: 165, completedMinutes: 30, completionRate: 20,
    },
  ];

  return {
    studentId: "s009",
    streak: 12,
    weeklyStudyHours: 18.5,
    weeklyTargetHours: 22,
    weeklyTaskSets,
    weeklyLogs: weeklyTaskSets.map(w => ({
      week: `第${w.weekNumber}週`,
      hoursStudied: Math.round((w.completedMinutes / 60) * 10) / 10 + 10,
      targetHours: 22,
      completionRate: w.completionRate,
    })),
    comprehensionRadar: [
      { area: "英語読解", score: 82 }, { area: "英語文法", score: 75 },
      { area: "数学IA", score: 70 }, { area: "数学IIB", score: 62 },
      { area: "現代文", score: 78 }, { area: "古文", score: 65 },
    ],
    curriculumProgress: generateCurriculumProgress("s009", 65.0),
  };
}

// 全生徒データ生成
function generateLearningData(): Record<string, StudentLearningProfile> {
  const data: Record<string, StudentLearningProfile> = {};
  data["s009"] = generateS009Data();

  const configs = [
    { id: "s001", streak: 28, hours: 25.0, target: 25, dev: 72.4 },
    { id: "s002", streak: 15, hours: 20.0, target: 22, dev: 65.2 },
    { id: "s003", streak: 8, hours: 17.5, target: 20, dev: 63.8 },
    { id: "s004", streak: 3, hours: 12.0, target: 20, dev: 57.1 },
    { id: "s005", streak: 22, hours: 19.0, target: 20, dev: 59.4 },
    { id: "s006", streak: 10, hours: 15.5, target: 18, dev: 52.3 },
    { id: "s007", streak: 18, hours: 22.0, target: 25, dev: 70.1 },
    { id: "s008", streak: 7, hours: 14.0, target: 18, dev: 50.5 },
  ];

  for (const cfg of configs) {
    const weeklyTaskSets = generateWeeklyTasks(cfg.id, 6);
    const areas = ["英語読解", "英語文法", "数学IA", "数学IIB", "現代文", "古文"];

    data[cfg.id] = {
      studentId: cfg.id,
      streak: cfg.streak,
      weeklyStudyHours: cfg.hours,
      weeklyTargetHours: cfg.target,
      weeklyTaskSets,
      weeklyLogs: weeklyTaskSets.map(w => ({
        week: `第${w.weekNumber}週`,
        hoursStudied: Math.round((cfg.hours * (0.7 + seed(cfg.id + `h${w.weekNumber}`) * 0.5)) * 10) / 10,
        targetHours: cfg.target,
        completionRate: w.completionRate,
      })),
      comprehensionRadar: areas.map((area, i) => ({
        area,
        score: Math.round(40 + cfg.streak * 0.8 + seed(cfg.id + area) * 30 + (i < 2 ? 10 : 0)),
      })),
      curriculumProgress: generateCurriculumProgress(cfg.id, cfg.dev),
    };
  }
  return data;
}

const learningData = generateLearningData();

export function getStudentLearning(studentId: string): StudentLearningProfile | undefined {
  return learningData[studentId];
}

// 現在の週のタスク取得
export function getCurrentWeekTasks(studentId: string): WeeklyTaskSet | undefined {
  const profile = learningData[studentId];
  if (!profile) return undefined;
  return profile.weeklyTaskSets[profile.weeklyTaskSets.length - 1];
}

export const subjectColorMap: Record<string, string> = {
  英語: "bg-blue-100 text-blue-700",
  数学: "bg-purple-100 text-purple-700",
  国語: "bg-orange-100 text-orange-700",
  物理: "bg-teal-100 text-teal-700",
  化学: "bg-pink-100 text-pink-700",
};
