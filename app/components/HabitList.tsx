"use client";

import { Habit, SortType } from "../types/habit";

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
}

export default function HabitList({
  habits,
  onToggleHabit,
  onDeleteHabit,
  sortType,
  onSortChange,
}: HabitListProps) {
  const getSortedHabits = () => {
    const sorted = [...habits];

    switch (sortType) {
      case "date":
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "latest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "completed":
        return sorted.sort((a, b) => {
          // 완료된 항목을 먼저, 그 다음 미완료 항목
          if (a.completed && !b.completed) return -1;
          if (!a.completed && b.completed) return 1;
          // 둘 다 완료되었거나 둘 다 미완료인 경우 날짜순 정렬
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      default:
        return sorted;
    }
  };

  const sortedHabits = getSortedHabits();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "오늘";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "어제";
    } else {
      return date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
        weekday: "short",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* 정렬 옵션 */}
      <div className="habit-card">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { value: "date" as SortType, label: "날짜별" },
            { value: "latest" as SortType, label: "최신순" },
            { value: "oldest" as SortType, label: "과거순" },
            { value: "completed" as SortType, label: "완료순" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`
                sort-button ${sortType === option.value ? "active" : ""}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 습관 목록 */}
      <div className="space-y-3">
        {sortedHabits.length === 0 ? (
          <div className="habit-card text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
              아직 습관이 없습니다
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              우하단 + 버튼을 눌러 습관을 추가해보세요!
            </p>
          </div>
        ) : (
          sortedHabits.map((habit) => (
            <div
              key={habit.id}
              className={`
                habit-card border-l-4 transition-all duration-300 transform hover:scale-[1.02]
                ${
                  habit.completed
                    ? "border-l-green-500 opacity-75"
                    : "border-l-blue-500"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    onClick={() => onToggleHabit(habit.id)}
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                      ${
                        habit.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-blue-400"
                      }
                    `}
                  >
                    {habit.completed && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1">
                    <h4
                      className={`
                      font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent
                      ${habit.completed ? "line-through opacity-50" : ""}
                    `}
                    >
                      {habit.habitType}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {formatDate(habit.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`
                    text-xs px-2 py-1 rounded-full font-medium
                    ${
                      habit.completed
                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                        : "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                    }
                  `}
                  >
                    {habit.completed ? "완료" : "진행중"}
                  </span>
                  <button
                    onClick={() => onDeleteHabit(habit.id)}
                    className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    aria-label="습관 삭제"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
