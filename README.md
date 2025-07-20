# 📝 [편리한 습관 앱 (ez-habit)](https://ez-habit.vercel.app)

<img width="1566" height="697" alt="image" src="https://github.com/user-attachments/assets/e4b009b7-a2bd-41fa-ac4a-02f91215f315" />

모바일 최적화된 심플하고 직관적인 습관 추적 애플리케이션입니다. 타이핑 없이 미리 정의된 습관들을 선택하여 빠르게 기록할 수 있습니다.

## ✨ 주요 기능

### 🎯 핵심 기능

- **미리 정의된 습관**: 30가지 다양한 습관 중에서 선택
- **하루 최대 3개**: 하루에 최대 3개의 습관 선택 가능
- **즉시 추가**: 모달에서 습관 선택 시 즉시 추가
- **자동 날짜 기록**: 선택한 날짜 자동 저장
- **완료 상태 관리**: 체크박스로 완료/미완료 토글

### 📊 데이터 관리

- **로컬 스토리지**: 브라우저에 데이터 자동 저장
- **CSV 내보내기**: 백업을 위한 데이터 내보내기
- **CSV 가져오기**: 백업 데이터 복원
- **전체 삭제**: 모든 데이터 일괄 삭제

### 🔄 정렬 및 필터링

- **날짜순 정렬**: 최신순/오래된순
- **완료 우선 정렬**: 완료된 습관을 먼저 표시
- **개별 삭제**: 각 습관별 삭제 기능

### 🎨 사용자 인터페이스

- **모바일 최적화**: 모바일 우선 반응형 디자인
- **다크모드**: 기본 다크 테마 적용
- **모던 UI**: 그라데이션, 그림자, 둥근 모서리
- **토스트 알림**: 사용자 피드백을 위한 알림
- **확인 모달**: 삭제 시 안전한 확인 절차
- **PWA 지원**: 백그라운드에서 자동 PWA 기능 제공

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **Storage**: LocalStorage
- **Build Tool**: Turbopack
- **PWA**: Progressive Web App 지원

## 📱 화면 구성

### 메인 화면

- **습관 목록**: 선택된 습관들의 목록 표시
- **정렬 메뉴**: 중앙 정렬된 정렬 옵션
- **탭 네비게이션**: 습관 목록 / 데이터 관리

### 습관 추가

- **플로팅 버튼**: 우하단 "+" 버튼
- **모달 선택**: 습관 선택 모달
- **즉시 추가**: 선택 시 즉시 목록에 추가
- **토스트 알림**: 추가 완료 시 자동 알림

### 데이터 관리

- **CSV 내보내기**: 현재 데이터 백업
- **CSV 가져오기**: 백업 데이터 복원
- **전체 삭제**: 모든 데이터 삭제

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone [repository-url]
cd simplehobby

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` (또는 사용 가능한 포트)로 접속하세요.

### 빌드 및 배포

```bash
# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 미리보기
npm run preview
```

### PWA 아이콘 설정

PWA가 완전히 작동하려면 아이콘 파일이 필요합니다:

```bash
# PWA_ICONS.md 파일 참조
# public/icon-192x192.png 및 public/icon-512x512.png 생성
```

## 📁 프로젝트 구조

```
simplehobby/
├── app/
│   ├── components/
│   │   ├── AddHabitButton.tsx      # 플로팅 추가 버튼
│   │   ├── ConfirmModal.tsx        # 확인 모달
│   │   ├── DataManager.tsx         # 데이터 관리 컴포넌트
│   │   ├── HabitList.tsx           # 습관 목록 컴포넌트
│   │   ├── HabitModal.tsx          # 습관 선택 모달
│   │   └── Toast.tsx               # 토스트 알림
│   ├── contexts/
│   │   └── ThemeContext.tsx        # 테마 컨텍스트
│   ├── types/
│   │   └── habit.ts                # 타입 정의
│   ├── utils/
│   │   └── storage.ts              # 스토리지 유틸리티
│   ├── globals.css                 # 전역 스타일
│   ├── layout.tsx                  # 루트 레이아웃
│   └── page.tsx                    # 메인 페이지
├── public/                         # 정적 파일
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 사용법

### 습관 추가하기

1. 우하단의 "+" 버튼 클릭
2. 모달에서 원하는 습관 선택
3. 자동으로 목록에 추가됨

### 습관 완료 체크

- 습관 항목의 체크박스 클릭
- 완료/미완료 상태 토글

### 정렬하기

- 상단 정렬 메뉴에서 원하는 옵션 선택
- 최신순, 오래된순, 완료우선순

### 데이터 백업

1. "데이터 관리" 탭 클릭
2. "CSV로 내보내기" 클릭
3. 파일이 자동 다운로드됨

### 데이터 복원

1. "데이터 관리" 탭 클릭
2. "CSV에서 가져오기" 클릭
3. 백업 파일 선택

## 📱 PWA 기능

### 자동 PWA 지원

- **백그라운드 작동**: 사용자 인터페이스 없이 자동 PWA 기능 제공
- **모바일 최적화**: Android/iOS에서 홈 화면에 추가 가능
- **오프라인 지원**: Service Worker로 오프라인 캐싱
- **앱처럼 실행**: 브라우저 UI 없이 독립 실행

### 설치 방법 (선택사항)

- **Android Chrome**: 주소창 옆 "설치" 버튼
- **iOS Safari**: 공유 버튼 → "홈 화면에 추가"
- **데스크톱**: 개발자 도구 → Application → Manifest → Install

## 🎨 디자인 특징

### 색상 팔레트

- **Primary**: 파란색 그라데이션 (#3B82F6 → #8B5CF6)
- **Success**: 녹색 그라데이션 (#10B981 → #059669)
- **Danger**: 빨간색 그라데이션 (#EF4444 → #DC2626)
- **Background**: 다크 그레이 (#1F2937)

### UI 컴포넌트

- **카드**: 둥근 모서리, 그림자 효과
- **버튼**: 그라데이션 배경, 호버 효과
- **모달**: 백드롭 블러, 애니메이션
- **토스트**: 바운스 애니메이션, 자동 숨김

## 📱 모바일 최적화

- **터치 친화적**: 충분한 버튼 크기
- **반응형 레이아웃**: 모든 화면 크기 지원
- **스와이프 제스처**: 모바일 네이티브 느낌
- **접근성**: 키보드 네비게이션 지원

## 🔧 커스터마이징

### 습관 타입 추가

`app/types/habit.ts`에서 `HABIT_TYPES` 배열을 수정하세요.

### 스타일 변경

`app/globals.css`에서 Tailwind CSS 클래스를 수정하세요.

### 테마 변경

`app/contexts/ThemeContext.tsx`에서 테마 설정을 수정하세요.

## 🚀 배포

### Vercel 배포 (권장)

```bash
npm install -g vercel
vercel
```

### 정적 내보내기

```bash
npm run build
npm run export
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- Next.js 팀에게 훌륭한 프레임워크를 제공해주셔서 감사합니다
- Tailwind CSS 팀에게 아름다운 CSS 프레임워크를 제공해주셔서 감사합니다
- React 팀에게 강력한 UI 라이브러리를 제공해주셔서 감사합니다

---

**SimpleHobby** - 당신의 습관을 더욱 편리하게 관리하세요! 📝✨
