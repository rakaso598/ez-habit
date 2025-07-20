"use client";

import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  type = "danger",
}: ConfirmModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
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
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const getButtonColors = () => {
    switch (type) {
      case "danger":
        return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700";
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700";
      case "info":
        return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
      default:
        return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "danger":
        return "⚠️";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "⚠️";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* 헤더 */}
        <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="text-2xl mr-3">{getIcon()}</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
        </div>

        {/* 메시지 */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCancel}
            className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 p-3 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm ${getButtonColors()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
