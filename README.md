# camp_project_02

영화 추천 웹사이트

# 프로젝트 소개

팀 6조를 소개하는 웹사이트 입니다.

# 개발 기간

23.10.05일 ~ 22.10.10일 (7,8,9 휴일)

# 기술 스택

# 주요 기능

#### 멤버 소개

- hover 이벤트 및 파이어베이스 프로필 데이터 불러오기

#### 댓글 쓰기

- 비밀번호 암호화
- 현재 시간을 ID로 변환 (ID 겹침 방지)
- 파이어베이스에 댓글 데이터 저장

#### 영화 검색 정렬

- 조회순 정렬 https://github.com/wlduq0150/camp_project_02/blob/678cdedcd092c387da022be8cc73822fd97f2887/js/search.js#L185

#### 영화 상세페이지

#### 개인 리뷰 작성

#### 유효성 체크

#### 구글 로그인

- firebase를 통한 구글 로그인 // https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/authService.js#L29
- 로그인 상태 체크 // https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/authService.js#L54
- 로그인 상태에 따른 login 버튼 변화 // https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/authService.js#L19

#### 자동 검색어

#### 찜하기

- 찜 버튼 생성 및 DB 추가 // https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/databaseService.js#L44
- 로그인 상태일 시 찜 버튼 생성 // https://github.com/wlduq0150/camp_project_02/blob/main/js/favorite.js#L57
- 찜 전체 삭제 // https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/databaseService.js#L119
