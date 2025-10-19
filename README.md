# bye2money

## 나만의 체크포인트

### 0. 환경 세팅

- [x] react + vite + typescript + tailwind 설치

### 1. tailwind에 커스텀 디자인 시스템 적용

- 타이포그래피
  - [x] 조선일보명조, pretendard 적용
  - [x] fontSize와 lineHeight 지정해서 폰트 스타일 종류 세분화
- 색상
  - [x] primitive와 token 색상 지정
- 아이콘
  - [x] svg로 다운로드해서 asset에 넣어두기

### 2. 메인 페이지 레이아웃 구현

- 헤더 (세부사항 추후 구현)
  - [x] width, height, color 맞추어 영역만 표시
- 새로운 내역 입력 (`inputBar`)
  - [x] 위쪽에 라벨, 아래쪽에 입력창이 있는 `LabeledInput` 공통 컴포넌트 구현
  - [x] `Dropdown` 공통 컴포넌트 기본 구현
  - [x] `TextInput` 공통 컴포넌트 구현
  - [x] `Button` 공통 컴포넌트 구현
  - [x] '일자' 필드 구현
  - [x] '금액' 필드 구현
  - [x] '내용' 필드 구현
  - [x] '결제수단' 필드 구현
  - [x] '분류' 필드 구현

### 다음주 할일

- [ ] `Dropdown` 단순 문자열 옵션 이외에 컴포넌트도 받을 수 있도록 확장
- [ ] `Button` 종류 확장
- [ ] '결제수단' 추가/삭제 기능 구현
- [ ] 거래 내역 리스트 구현
- [ ] 달력 화면 구현
- [ ] 통계 화면 구현
