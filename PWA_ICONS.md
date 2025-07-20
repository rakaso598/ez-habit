# PWA 아이콘 생성 가이드

## 필요한 아이콘 파일

PWA가 완전히 작동하려면 다음 아이콘 파일들이 필요합니다:

```
public/
├── icon-192x192.png  (192x192 픽셀)
└── icon-512x512.png  (512x512 픽셀)
```

## 아이콘 생성 방법

### 방법 1: 온라인 도구 사용

1. **Favicon Generator** (https://realfavicongenerator.net/)

   - `public/icon.svg` 파일을 업로드
   - PWA 아이콘 생성 옵션 선택
   - 다운로드 후 `public/` 폴더에 복사

2. **PWA Builder** (https://www.pwabuilder.com/)
   - 웹사이트 URL 입력
   - 아이콘 자동 생성

### 방법 2: 수동 생성

1. **SVG를 PNG로 변환**

   ```bash
   # ImageMagick 사용 (설치 필요)
   convert public/icon.svg -resize 192x192 public/icon-192x192.png
   convert public/icon.svg -resize 512x512 public/icon-512x512.png
   ```

2. **온라인 SVG to PNG 변환기**
   - https://convertio.co/svg-png/
   - https://cloudconvert.com/svg-to-png

### 방법 3: 디자인 도구 사용

1. **Figma, Sketch, Adobe XD**
   - 512x512 크기로 디자인
   - PNG로 내보내기
   - 192x192 크기로 리사이즈

## 아이콘 요구사항

- **형식**: PNG
- **크기**: 192x192, 512x512 픽셀
- **배경**: 투명 또는 단색
- **스타일**: 둥근 모서리 권장
- **색상**: 브랜드 컬러와 일치

## 테스트

아이콘 파일을 추가한 후:

1. 개발 서버 재시작
2. 브라우저에서 PWA 상태 확인
3. 모바일에서 설치 테스트

## 현재 상태

- ✅ `public/icon.svg` - 기본 아이콘 생성됨
- ❌ `public/icon-192x192.png` - 생성 필요
- ❌ `public/icon-512x512.png` - 생성 필요

아이콘 파일을 생성하면 PWA가 완전히 작동합니다!
