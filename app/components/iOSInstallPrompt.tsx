"use client";

import { useState, useEffect } from "react";

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function IOSInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // iOS Safari 감지
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    // 독립 실행 모드 확인 (iOS Safari용)
    const standalone = (window.navigator as NavigatorWithStandalone).standalone;

    setIsIOS(isIOSDevice && isSafari);
    setIsStandalone(!!standalone);

    // iOS Safari이고 아직 설치되지 않았다면 프롬프트 표시
    if (isIOSDevice && isSafari && !standalone) {
      const dismissed =
        localStorage.getItem("ios-install-dismissed") === "true";
      if (!dismissed) {
        setShowPrompt(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("ios-install-dismissed", "true");
  };

  const handleInstall = () => {
    // iOS Safari 설치 안내
    const message = `iOS Safari에서 앱 설치 방법:

1. Safari 브라우저 하단의 공유 버튼(□↗) 클릭
2. "홈 화면에 추가" 선택
3. 앱 이름 확인 후 "추가" 클릭
4. 홈 화면에서 앱 아이콘으로 실행

설치 후 Safari UI 없이 앱처럼 사용할 수 있습니다!`;

    alert(message);
    handleDismiss();
  };

  if (!showPrompt || !isIOS || isStandalone) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🍎</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                iOS 앱 설치
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Safari에서 홈 화면에 추가하세요
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              나중에
            </button>
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm"
            >
              설치 방법
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
