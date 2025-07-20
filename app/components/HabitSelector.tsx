"use client";

import { useState } from "react";
import { HabitType, HABIT_TYPES } from "../types/habit";

interface HabitSelectorProps {
  onHabitSelect: (habitType: HabitType) => void;
}

export default function HabitSelector({ onHabitSelect }: HabitSelectorProps) {
  const [selectedHabits, setSelectedHabits] = useState<HabitType[]>([]);

  const handleHabitClick = (habitType: HabitType) => {
    if (selectedHabits.length < 3) {
      const newSelected = [...selectedHabits, habitType];
      setSelectedHabits(newSelected);

      if (newSelected.length === 3) {
        // 3개가 선택되면 자동으로 습관 생성
        newSelected.forEach((habit) => onHabitSelect(habit));
        setSelectedHabits([]);
      }
    }
  };

  const removeHabit = (habitType: HabitType) => {
    setSelectedHabits(selectedHabits.filter((h) => h !== habitType));
  };

  return (
    <div className="habit-card">
      <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">
        오늘 할 습관을 선택하세요 ({selectedHabits.length}/3)
      </h3>

      {/* 선택된 습관들 */}
      {selectedHabits.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3 font-medium">선택된 습관:</p>
          <div className="flex flex-wrap gap-2">
            {selectedHabits.map((habit, index) => (
              <button
                key={index}
                onClick={() => removeHabit(habit)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
              >
                {habit} ✕
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 습관 선택 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {HABIT_TYPES.map((habitType) => (
          <button
            key={habitType}
            onClick={() => handleHabitClick(habitType)}
            disabled={
              selectedHabits.length >= 3 && !selectedHabits.includes(habitType)
            }
            className={`
              p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105
              ${
                selectedHabits.includes(habitType)
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 shadow-md"
                  : selectedHabits.length >= 3
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:shadow-md"
              }
            `}
          >
            <span className="text-sm font-semibold">{habitType}</span>
          </button>
        ))}
      </div>

      {selectedHabits.length === 3 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
          <p className="text-green-800 text-sm font-semibold text-center">
            🎉 3개의 습관이 선택되었습니다. 자동으로 추가됩니다!
          </p>
        </div>
      )}
    </div>
  );
}
