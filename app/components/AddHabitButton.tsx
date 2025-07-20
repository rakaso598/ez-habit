"use client";

interface AddHabitButtonProps {
  onClick: () => void;
}

export default function AddHabitButton({ onClick }: AddHabitButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center"
      aria-label="습관 추가"
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
}
