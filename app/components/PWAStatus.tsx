"use client";

import { useState, useEffect } from "react";

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function PWAStatus() {
  const [pwaStatus, setPwaStatus] = useState<{
    isInstalled: boolean;
    isStandalone: boolean;
    hasServiceWorker: boolean;
    hasManifest: boolean;
    isIOS: boolean;
    isSafari: boolean;
  }>({
    isInstalled: false,
    isStandalone: false,
    hasServiceWorker: false,
    hasManifest: false,
    isIOS: false,
    isSafari: false,
  });

  useEffect(() => {
    const checkPWAStatus = async () => {
      // PWA 설치 여부 확인
      const isInstalled = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;

      // 독립 실행 모드 확인 (iOS Safari용)
      const isStandalone =
        (window.navigator as NavigatorWithStandalone).standalone || isInstalled;

      // Service Worker 등록 확인
      const hasServiceWorker = "serviceWorker" in navigator;

      // Manifest 확인
      const hasManifest = !!document.querySelector('link[rel="manifest"]');

      // iOS Safari 감지
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);

      setPwaStatus({
        isInstalled,
        isStandalone,
        hasServiceWorker,
        hasManifest,
        isIOS: isIOSDevice,
        isSafari: isSafari,
      });
    };

    checkPWAStatus();
  }, []);

  const handleInstallClick = () => {
    // Chrome의 설치 프롬프트 트리거
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // 설치 프롬프트가 있는지 확인
        if (registration.active) {
          // 수동으로 설치 안내
          const message = `PWA 설치 방법:

🌐 Chrome 브라우저:
1. 주소창 오른쪽의 "설치" 아이콘 클릭
2. 또는 F12 → Application → Manifest → Install
3. 또는 메뉴(⋮) → "앱 설치"

📱 모바일 Chrome:
1. 주소창 옆 "설치" 버튼 클릭
2. "홈 화면에 추가" 선택

🍎 iOS Safari:
1. 공유 버튼 → "홈 화면에 추가"

현재 브라우저: ${
            navigator.userAgent.includes("Chrome")
              ? "Chrome"
              : navigator.userAgent.includes("Firefox")
              ? "Firefox"
              : navigator.userAgent.includes("Safari")
              ? "Safari"
              : "기타"
          }`;

          alert(message);
        }
      });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
          📱 PWA 상태
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">설치됨:</span>
            <span
              className={
                pwaStatus.isInstalled ? "text-green-500" : "text-red-500"
              }
            >
              {pwaStatus.isInstalled ? "✅" : "❌"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">독립 실행:</span>
            <span
              className={
                pwaStatus.isStandalone ? "text-green-500" : "text-red-500"
              }
            >
              {pwaStatus.isStandalone ? "✅" : "❌"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Service Worker:
            </span>
            <span
              className={
                pwaStatus.hasServiceWorker ? "text-green-500" : "text-red-500"
              }
            >
              {pwaStatus.hasServiceWorker ? "✅" : "❌"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Manifest:</span>
            <span
              className={
                pwaStatus.hasManifest ? "text-green-500" : "text-red-500"
              }
            >
              {pwaStatus.hasManifest ? "✅" : "❌"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">iOS:</span>
            <span
              className={pwaStatus.isIOS ? "text-green-500" : "text-red-500"}
            >
              {pwaStatus.isIOS ? "✅" : "❌"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Safari:</span>
            <span
              className={pwaStatus.isSafari ? "text-green-500" : "text-red-500"}
            >
              {pwaStatus.isSafari ? "✅" : "❌"}
            </span>
          </div>
        </div>

        {!pwaStatus.isInstalled && (
          <button
            onClick={handleInstallClick}
            className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm"
          >
            설치 방법 보기
          </button>
        )}

        {/* 개발 모드에서 설치 프롬프트 재설정 */}
        {process.env.NODE_ENV === "development" && (
          <button
            onClick={() => {
              localStorage.removeItem("pwa-install-dismissed");
              window.location.reload();
            }}
            className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 text-sm"
          >
            설치 프롬프트 재설정
          </button>
        )}
      </div>
    </div>
  );
}
