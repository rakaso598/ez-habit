"use client";

import { useState, useEffect } from "react";
import { Habit, HabitType, SortType } from "./types/habit";
import { getHabitsFromStorage, saveHabitsToStorage } from "./utils/storage";
import HabitList from "./components/HabitList";
import DataManager from "./components/DataManager";
import HabitModal from "./components/HabitModal";
import AddHabitButton from "./components/AddHabitButton";
import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [sortType, setSortType] = useState<SortType>("date");
  const [activeTab, setActiveTab] = useState<"habits" | "data">("habits");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const storedHabits = getHabitsFromStorage();
    setHabits(storedHabits);
  }, []);

  // 습관 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    saveHabitsToStorage(habits);
  }, [habits]);

  const handleHabitSelect = (habitType: HabitType) => {
    const today = new Date().toISOString().split("T")[0];
    const newHabit: Habit = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      habitType,
      date: today,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setHabits((prev) => [...prev, newHabit]);
    handleShowToast(`${habitType} 습관이 추가되었습니다!`);
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const handleDeleteHabit = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "습관 삭제",
      message: "이 습관을 삭제하시겠습니까?",
      onConfirm: () => {
        setHabits((prev) => prev.filter((habit) => habit.id !== id));
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
      type: "danger",
    });
  };

  const handleDeleteAllHabits = () => {
    setConfirmModal({
      isOpen: true,
      title: "모든 습관 삭제",
      message: "모든 습관을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.",
      onConfirm: () => {
        setHabits([]);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
      type: "danger",
    });
  };

  const handleImportHabits = (importedHabits: Habit[]) => {
    setHabits((prev) => [...prev, ...importedHabits]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleShowToast("습관 선택이 완료되었습니다!");
  };

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const handleHideToast = () => {
    setIsToastVisible(false);
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const totalCount = habits.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📝 편리한 습관 앱
          </h1>
          {totalCount > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full">
                <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                  완료: {completedCount} / 전체: {totalCount}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 탭 네비게이션 */}
        <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-lg p-1 border border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("habits")}
            className={`
              flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200
              ${
                activeTab === "habits"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              }
            `}
          >
            습관 관리
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`
              flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200
              ${
                activeTab === "data"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              }
            `}
          >
            데이터 관리
          </button>
        </div>

        {/* 습관 관리 탭 */}
        {activeTab === "habits" && (
          <HabitList
            habits={habits}
            onToggleHabit={handleToggleHabit}
            onDeleteHabit={handleDeleteHabit}
            sortType={sortType}
            onSortChange={setSortType}
          />
        )}

        {/* 데이터 관리 탭 */}
        {activeTab === "data" && (
          <DataManager
            habits={habits}
            onImportHabits={handleImportHabits}
            onDeleteAllHabits={handleDeleteAllHabits}
            onShowToast={handleShowToast}
          />
        )}
      </main>

      {/* 푸터 */}
      <footer className="max-w-md mx-auto px-4 py-6 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            🔒 모든 데이터는 로컬에 안전하게 저장됩니다
          </p>
        </div>
      </footer>

      {/* 플로팅 액션 버튼 */}
      <AddHabitButton onClick={handleOpenModal} />

      {/* 습관 선택 모달 */}
      <HabitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onHabitSelect={handleHabitSelect}
        onShowToast={handleShowToast}
      />

      {/* 토스트 알림 */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={handleHideToast}
      />

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        type={confirmModal.type}
      />
    </div>
  );
}
