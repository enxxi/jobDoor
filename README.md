# [ Jobdoor : wanted-pre-onboarding-backend ]

# 소개

🚪 **JobDoor** : 문을 두드려 새로운 기회를 찾듯이, 기업이 게시한 채용 공고에 신속하게 지원할 수 있는 서비스입니다.

---
<br/>
<details>
  <summary>폴더구조</summary>

  ```jsx
  📦wanted-pre-onboarding-backend
   ┣ 📂.git
   ┣ 📂node_modules
   ┣ 📂src
   ┃ ┣ 📂controllers
   ┃ ┣ 📂database
   ┃ ┃ ┣ 📂config
   ┃ ┃ ┣ 📂migrations
   ┃ ┃ ┣ 📂models
   ┃ ┃ ┣ 📂repositories
   ┃ ┃ ┗ 📂seeders
   ┃ ┣ 📂middlewares
   ┃ ┣ 📂routes
   ┃ ┣ 📂services
   ┃ ┣ 📂utils
   ┃ ┗ 📜app.js
   ┣ 📂test
   ┣ 📜.babelrc
   ┣ 📜.env
   ┣ 📜.gitignore
   ┣ 📜.prettierrc
   ┣ 📜.sequelizerc
   ┣ 📜index.js
   ┣ 📜package.json
   ┣ 📜README.md
   ┗ 📜yarn.lock
```
</details>

<details>
  <summary>사용 기술 스택</summary>

<div align=center> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    </div>
</details>

<br/>

## 구현과정

1. [ERD](https://www.erdcloud.com/d/pqcapjs3QNY5LreNz) 설계
    - companies, users, posts, applications 테이블 및 관계형 데이터 모델 설계
    ![jobdoor erd](https://github.com/enxxi/wanted-pre-onboarding-backend/assets/101889199/129e4a79-d833-4e72-962d-c9f20e7db06f)

2. 시퀄라이즈 사용
    - MySQL의 ORM으로 시퀄라이즈 사용
3. 테스트 코드 작성
    - Jest를 이용한 테스트 코드 작성 및 테스트용 DB 생성
4. 미들웨어 활용
    - express-validator를 사용하여 request 데이터 유효성 검사
    - 에러 처리 미들웨어 활용
<br/><br/><br/>

## 요구사항 분석

1. 채용공고 등록
    - 회사는 채용공고를 등록합니다.
    - 필드 : **회사 ID, 채용포지션, 채용보상금, 채용내용, 사용기술**
2. 채용공고 수정
    - 회사는 채용공고를 수정할 수 있습니다. (회사 ID는 수정 불가)
    - 유효성 검사를 통해 데이터를 수정합니다.
3. 채용공고 삭제
    - 회사는 채용공고를 삭제할 수 있습니다.
4. 채용공고 목록 조회
    - 사용자는 채용 공고의 목록을 조회할 수 있습니다.
    - 표시되는 필드 : **회사명, 국가, 지역, 채용포지션, 채용보상금, 사용기술**
5. 채용공고 검색
    - 사용자는 키워드를 가지고 채용공고를 검색할 수 있습니다.
    - 검색이 가능한 필드 : **회사명, 채용포지션, 사용기술 (확장 가능)**
6. 채용공고 상세페이지 조회
    - 채용공고의 **내용**을 포함한 상세 페이지를 조회할 수 있습니다.
    - 같은 회사의 다른 채용 공고 리스트를 조회할 수 있습니다.
7. 채용공고 지원
    - 사용자는 채용 공고에 지원할 수 있습니다. (한 회사에 한 번만 지원 가능)
<br/><br/><br/>
## 기능 설명

### [ 채용공고 ]

1. 채용공고 등록
    - 회사의 ID를 확인하여 회사 테이블에 존재하지 않으면 에러를 반환합니다.
    - createPostValidate 미들웨어를 통한 유효성 검사 후 공고를 등록합니다.
2. 채용공고 수정
    - 채용공고의 ID를 확인하여 채용공고 테이블에 존재하지 않으면 에러를 반환합니다.
    - setPostValidate 미들웨어를 통한 유효성 검사 후 공고를 수정합니다.
        - 회사의 ID는 수정할 수 없기 때문에 body에 포함되어 있다면 에러를 반환합니다.
3. 채용공고 삭제
    - 채용공고의 ID를 확인하여 채용공고 테이블에 존재하지 않으면 에러를 반환합니다.
    - 해당 ID의 공고를 DB에서 완전히 삭제합니다.
4. 채용공고 목록 조회
    - DB에 저장된 모든 채용 공고를 조회합니다.
    - Company모델을 참조하여 회사명, 국가, 지역 속성을 포함합니다.
    - 검색 기능 : 쿼리로 검색어를 전달받아 검색이 가능합니다. 해당 필드들에는 index를 설정하여 검색 성능을 높였습니다.
5. 채용공고 상세페이지 조회
    - 채용공고의 ID를 확인하여 채용공고 테이블에 존재하지 않으면 에러를 반환합니다.
    - 해당 ID의 공고를 조회합니다.
    - Post모델을 재참조하여 해당 회사가 올린 모든 채용 공고의 리스트를 포함합니다.

### [ 지원 ]

1. 지원
    - 채용공고와 사용자의 ID를 확인하여 각 테이블에 존재하지 않으면 에러를 반환합니다.
    - 중복 지원을 확인하여 에러를 반환합니다.
    - 지원 내역을 저장합니다.
    - 채용 공고가 삭제된다면 CASCADE로 지원 내역도 삭제하여 데이터의 일관성을 유지합니다.
