"use client";

import { useRef } from "react";
import { Habit } from "../types/habit";
import { exportToCSV, importFromCSV } from "../utils/storage";

interface DataManagerProps {
  habits: Habit[];
  onImportHabits: (habits: Habit[]) => void;
  onDeleteAllHabits: () => void;
  onShowToast: (message: string) => void;
}

export default function DataManager({
  habits,
  onImportHabits,
  onDeleteAllHabits,
  onShowToast,
}: DataManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportToCSV(habits);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedHabits = await importFromCSV(file);
      onImportHabits(importedHabits);
      onShowToast(
        `${importedHabits.length}개의 습관 데이터를 성공적으로 가져왔습니다!`
      );
    } catch (error) {
      onShowToast(
        `데이터 가져오기 실패: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="habit-card">
      <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">
        데이터 관리
      </h3>

      <div className="space-y-4">
        <button
          onClick={handleExport}
          disabled={habits.length === 0}
          className={`
            w-full p-4 rounded-xl font-semibold transition-all duration-200 shadow-sm
            ${
              habits.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-md transform hover:scale-[1.02]"
            }
          `}
        >
          📊 CSV로 내보내기 ({habits.length}개)
        </button>

        <button
          onClick={handleImportClick}
          className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm transform hover:scale-[1.02]"
        >
          📥 CSV에서 가져오기
        </button>

        {habits.length > 0 && (
          <button
            onClick={onDeleteAllHabits}
            className="w-full p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm transform hover:scale-[1.02]"
          >
            🗑️ 모든 습관 삭제
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800 text-center">
          💡 <strong>데이터 백업:</strong> CSV 파일로 데이터를 내보내서
          백업하고, 나중에 다시 가져올 수 있습니다.
        </p>
      </div>
    </div>
  );
}
