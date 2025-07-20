import { Habit } from "../types/habit";

const STORAGE_KEY = "simplehobby_habits";

// 로컬 스토리지에서 습관 데이터 가져오기
export const getHabitsFromStorage = (): Habit[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load habits from storage:", error);
    return [];
  }
};

// 로컬 스토리지에 습관 데이터 저장하기
export const saveHabitsToStorage = (habits: Habit[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error("Failed to save habits to storage:", error);
  }
};

// CSV로 내보내기
export const exportToCSV = (habits: Habit[]): void => {
  if (habits.length === 0) {
    throw new Error("내보낼 데이터가 없습니다.");
  }

  const headers = ["날짜", "습관명", "완료여부", "생성시간"];
  const csvContent = [
    headers.join(","),
    ...habits.map((habit) =>
      [
        habit.date,
        habit.habitType,
        habit.completed ? "완료" : "미완료",
        habit.createdAt,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `습관데이터_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// CSV에서 가져오기
export const importFromCSV = (file: File): Promise<Habit[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        if (lines.length < 2) {
          reject(new Error("CSV 파일에 데이터가 없습니다."));
          return;
        }

        const habits: Habit[] = [];

        for (let i = 1; i < lines.length; i++) {
          const columns = lines[i].split(",");
          if (columns.length >= 4) {
            const habitType = columns[1].trim();
            const habit: Habit = {
              id: `${Date.now()}_${i}`,
              date: columns[0].trim(),
              habitType: habitType as Habit["habitType"],
              completed: columns[2].trim() === "완료",
              createdAt: columns[3].trim(),
            };
            habits.push(habit);
          }
        }

        resolve(habits);
      } catch {
        reject(new Error("CSV 파일을 읽는 중 오류가 발생했습니다."));
      }
    };

    reader.onerror = () => {
      reject(new Error("파일을 읽을 수 없습니다."));
    };

    reader.readAsText(file, "UTF-8");
  });
};
