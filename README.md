# Plot Weaver

Git 워크플로우를 소설 창작에 도입한 혁신적인 웹 기반 창작 워크스페이스

## 🎯 프로젝트 개요

Plot Weaver는 Git의 강력한 버전 관리 시스템을 소설 창작에 적용한 AI 기반 개인 워크스페이스입니다. 작가가 여러 스토리라인을 동시에 탐색하고, 모든 창작 과정을 안전하게 기록하며, 최적의 서사를 선택적으로 통합할 수 있도록 돕습니다.

## ✨ 핵심 기능

### 🌿 브랜치 (Branch) - "모든 가능성을 탐험하라"
- 현재 스토리에서 새로운 분기점 생성
- 여러 스토리라인을 동시에 관리
- 원본에 영향 없이 자유로운 실험 가능

### 💾 커밋 (Commit) - "모든 순간을 기록하라"
- 중요한 창작 지점을 버전으로 저장
- 의미 있는 메시지와 함께 진행 상황 기록
- 언제든 특정 시점으로 안전하게 되돌리기

### 🔀 병합 (Merge) - "최고의 아이디어만 선택하라"
- 여러 브랜치의 장점만 선별적으로 통합
- AI 지원을 통한 자연스러운 연결
- 설정 충돌 자동 감지 및 해결 제안

### 📚 백스토리 시스템
- 메인 스토리에 나오지 않는 배경 사건 관리
- 시간순 타임라인으로 세계관 구축
- 복선과 연결점 자동 추천

## 🛠️ 기술 스택

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Storage**: LocalStorage API
- **Architecture**: 함수형 프로그래밍 지향

## 📁 프로젝트 구조

```
├── index.html              # 메인 HTML 파일
├── css/                    # 스타일시트
│   ├── main.css
│   ├── layout.css
│   └── components.css
├── js/                     # JavaScript 모듈
│   ├── app.js
│   ├── git-system.js
│   ├── file-manager.js
│   ├── backstory.js
│   ├── storage.js
│   └── utils.js
├── docs/                   # 프로젝트 문서
│   ├── 개발계획.md
│   ├── 지시사항.md
│   ├── Plot Weaver_MVP.md
│   ├── 추가기능.md
│   └── 추가 아이디어.md
└── README.md
```

## 🚀 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
cd plot-weaver
```

2. 브라우저에서 `index.html` 열기
```bash
# 로컬 서버 실행 (권장)
python -m http.server 8000
# 또는
npx serve .
```

3. http://localhost:8000 접속

## 📖 사용법

1. **새 프로젝트 생성**: 메인 화면에서 "새 프로젝트" 버튼 클릭
2. **파일 관리**: 왼쪽 패널에서 폴더/파일 생성 및 편집
3. **브랜치 생성**: "새 브랜치" 버튼으로 스토리 분기점 생성
4. **커밋**: 중요한 변경사항을 버전으로 저장
5. **백스토리**: 오른쪽 패널에서 배경 이벤트 관리

## 🎯 개발 현황

- [x] 프로젝트 구조 설계
- [x] 기술 스택 선정
- [ ] HTML 기본 구조
- [ ] CSS 레이아웃
- [ ] JavaScript 모듈 구현
- [ ] Git 워크플로우 시스템
- [ ] 백스토리 기능
- [ ] UI/UX 완성

## 📚 문서

자세한 개발 계획과 구현 가이드는 `docs/` 폴더를 참고하세요:

- [개발계획.md](docs/개발계획.md) - 전체 개발 로드맵
- [지시사항.md](docs/지시사항.md) - 단계별 구현 가이드
- [Plot Weaver_MVP.md](docs/Plot%20Weaver_MVP.md) - MVP 상세 기획
- [추가기능.md](docs/추가기능.md) - 확장 기능 목록

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 📞 연락처

프로젝트 관련 문의나 제안사항이 있으시면 Issues를 통해 연락해 주세요.

---

**"Git for Novels"** - 소설 창작의 새로운 패러다임을 제시합니다.