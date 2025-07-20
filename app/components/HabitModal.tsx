"use client";

import { useEffect } from "react";
import { HabitType, HABIT_TYPES } from "../types/habit";

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHabitSelect: (habitType: HabitType) => void;
  onShowToast: (message: string) => void;
}

export default function HabitModal({
  isOpen,
  onClose,
  onHabitSelect,
  onShowToast,
}: HabitModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleHabitClick = (habitType: HabitType) => {
    // 즉시 습관 추가
    onHabitSelect(habitType);
    onShowToast(`${habitType} 습관이 추가되었습니다!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            습관 선택
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 습관 선택 그리드 */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 gap-3">
            {HABIT_TYPES.map((habitType) => (
              <button
                key={habitType}
                onClick={() => handleHabitClick(habitType)}
                className="p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-105 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 hover:shadow-md"
              >
                <span className="text-sm font-semibold">{habitType}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            원하는 습관을 클릭하면 즉시 추가됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
