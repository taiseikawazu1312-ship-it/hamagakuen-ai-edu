"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, ListChecks } from "lucide-react";
import { tasksBySubject, subjectColors } from "@/lib/student-data";

const subjects = ["全科目", ...Object.keys(tasksBySubject)];

export default function TodoPage() {
  const [activeSubject, setActiveSubject] = useState("全科目");
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => {
      const set = new Set<string>();
      Object.values(tasksBySubject).flat().forEach((t, i) => { if (t.completed) set.add(`${t.subject}-${i}-${t.title}`); });
      return set;
    }
  );

  const toggleTask = (key: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const allTasks = activeSubject === "全科目"
    ? Object.values(tasksBySubject).flat()
    : tasksBySubject[activeSubject] || [];

  const taskKeys = allTasks.map((t, i) => `${t.subject}-${i}-${t.title}`);
  const completedCount = taskKeys.filter(k => completedIds.has(k)).length;
  const totalCount = allTasks.length;
  const remainingTime = allTasks.filter((_, i) => !completedIds.has(taskKeys[i])).reduce((a, t) => a + t.duration, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">学習ToDo</h2>
        <p className="text-sm text-gray-500 mt-1">今週のタスクを科目ごとに確認して、一つずつクリアしていきましょう</p>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {subjects.map(sub => (
          <button key={sub} onClick={() => setActiveSubject(sub)}
            className={`px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${
              activeSubject === sub ? "bg-emerald-500 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
            }`}>
            {sub}
            {sub !== "全科目" && (
              <span className={`ml-1.5 text-xs ${activeSubject === sub ? "text-white/70" : "text-gray-400"}`}>
                {(tasksBySubject[sub] || []).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <div>
              <p className="text-xs text-gray-500">完了</p>
              <p className="text-xl font-bold text-gray-900">{completedCount}<span className="text-sm text-gray-400 font-normal"> / {totalCount}</span></p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500">残り</p>
              <p className="text-xl font-bold text-gray-900">{remainingTime}<span className="text-sm text-gray-400 font-normal"> 分</span></p>
            </div>
          </div>
          <div className="w-full sm:w-40">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>進捗</span>
              <span>{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-bold text-gray-900">
            {activeSubject === "全科目" ? "全科目のタスク" : `${activeSubject}のタスク`}
          </h3>
        </div>

        <div className="space-y-2">
          {allTasks.map((task, i) => {
            const key = taskKeys[i];
            const isCompleted = completedIds.has(key);
            return (
              <div key={key} onClick={() => toggleTask(key)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isCompleted ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-sm"
                }`}>
                <div className="flex-shrink-0">
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}>{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColors[task.subject] || "bg-gray-100 text-gray-700"}`}>{task.subject}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{task.duration}分</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${task.priority === "高" ? "bg-red-100 text-red-700" : task.priority === "中" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                  {task.priority}
                </span>
              </div>
            );
          })}
          {allTasks.length === 0 && <p className="text-sm text-gray-400 text-center py-8">この科目のタスクはありません</p>}
        </div>
      </div>
    </div>
  );
}
