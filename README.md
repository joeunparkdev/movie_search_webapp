# camp_project_02

영화 추천 웹사이트

# 프로젝트 소개

개인과제에서 작성한 [내배캠 인기영화 콜렉션]을 발전시키는 팀 프로젝트

# 개발 기간

23.10.24일 ~ 22.10.27일

# 기술 스택
파이어베이스, 자바스크립트, HTML 

# 주요 기능

- hover 이벤트 및 파이어베이스 프로필 데이터 불러오기
- 댓글 작성시 비밀번호 암호화
- 댓글 작성시 현재 시간을 ID로 변환 (ID 겹침 방지)
- 파이어베이스에 댓글 데이터 저장

#### 영화 검색 정렬

- 조회순 정렬 https://github.com/wlduq0150/camp_project_02/blob/678cdedcd092c387da022be8cc73822fd97f2887/js/search.js#L185
- 별점순 정렬 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/search.js#L201
- 최신순 정렬 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/search.js#L218

#### 영화 상세페이지

- 영화 id url 파라미터를 통해 상세페이지 이동 및 api 요청 
- 영화 상세정보 표시하기 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/detail-page.js#L5

#### 개인 리뷰 작성

- 리뷰 영화별 필터링 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/review.js#L85C40
- 리뷰 생성 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/review.js#L76C24-L76C24
- 리뷰 표시 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/review.js#L154
- 리뷰 삭제 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/review.js#L187
- 리뷰 수정 https://github.com/wlduq0150/camp_project_02/blob/6d55cc84cc05227ff086c7b3e70bc797029f4967/js/review.js#L198

#### 유효성 체크

- 욕설 데이터 배열 저장
- 검색 유효성 검사 https://github.com/wlduq0150/camp_project_02/blob/4f56c6124d6dc971ddc7b20d377587233ab894fe/js/validation.js#L1
- 리뷰 유효성 검사 https://github.com/wlduq0150/camp_project_02/blob/4f56c6124d6dc971ddc7b20d377587233ab894fe/js/validation.js#L19C1-L19C1
  
#### 구글 로그인

- firebase를 통한 구글 로그인 https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/authService.js#L29
- 로그인 상태 체크 https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/authService.js#L54
- 로그인 상태에 따른 login 버튼 변화 // https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/authService.js#L19

#### 자동 검색어

- 자동완성 목록 화면 표시 https://github.com/wlduq0150/camp_project_02/blob/1c456157532c07a0873a0161298bade02f69aea7/js/autoSearch.js#L37
- 자동완성 목록에서 항목 선택 https://github.com/wlduq0150/camp_project_02/blob/1c456157532c07a0873a0161298bade02f69aea7/js/autoSearch.js#L52

#### 찜하기

- 찜 버튼 생성 및 DB 추가 https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/databaseService.js#L44
- 로그인 상태일 시 찜 버튼 생성 https://github.com/wlduq0150/camp_project_02/blob/main/js/favorite.js#L57
- 찜 전체 삭제 https://github.com/wlduq0150/camp_project_02/blob/main/js/firebase/databaseService.js#L119
