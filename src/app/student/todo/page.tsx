"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, ListChecks } from "lucide-react";
import { todaysTasks, subjectColors } from "@/lib/student-data";

export default function TodoPage() {
  const [tasks, setTasks] = useState(todaysTasks);

  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const remainingTime = tasks
    .filter((t) => !t.completed)
    .reduce((acc, t) => acc + t.duration, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">学習ToDo</h2>
        <p className="text-sm text-gray-500 mt-1">
          今日のタスクを確認して、一つずつクリアしていきましょう
        </p>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <ListChecks className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-gray-900">今日のタスク</h3>
        </div>

        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div
              key={i}
              onClick={() => toggleTask(i)}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                task.completed
                  ? "bg-gray-50 border-gray-200 opacity-70"
                  : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-sm"
              }`}
            >
              {/* Checkbox */}
              <div className="flex-shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 hover:text-emerald-400 transition-colors" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      subjectColors[task.subject] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.subject}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.duration}分
                  </span>
                </div>
              </div>

              {/* Priority */}
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                  task.priority === "高"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                重要度{task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-gray-500">完了状況</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedCount}
                <span className="text-base text-gray-400 font-normal">
                  {" "}
                  / {totalCount} タスク
                </span>
              </p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div>
              <p className="text-sm text-gray-500">残り予想時間</p>
              <p className="text-2xl font-bold text-gray-900">
                {remainingTime}
                <span className="text-base text-gray-400 font-normal">
                  {" "}
                  分
                </span>
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full sm:w-48">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>進捗</span>
              <span>
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(completedCount / totalCount) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
