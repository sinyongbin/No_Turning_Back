프로젝트 소개
  https://www.canva.com/design/DAFzWY-g4pg/g3wKMce_yCEasKDTEHFEsg/edit?locale=ko-KRhttps://www.canva.com/design/DAFzWY-g4pg/g3wKMce_yCEasKDTEHFEsg/edit?locale=ko-KR

연동된 프로젝트
  오라클 서버
    https://github.com/KColdCastle/No_Turning_Back_Oracle_Server 
  오라클 Admin 전용
    https://github.com/KColdCastle/NoTurnBack_Admin
    
Oralce DB 설치 필요
  https://github.com/KColdCastle/No_Turning_Back_Oracle_Server  설치 꼭 필요
.env 최상위 폴더에 생성
  DATABASE_URL="몽고DB url 삽입 필요"// Mongo Atlas 무료 티어 사용함. 무료라서 가끔 데이터가 받아지지 않는 문제가 발생함
  <username>
  <password> 부분은 변경이 필요함
  콜렉션이 없다면 생성후에 URL 에 따로 넣어줘야 정상 작동함
    URL 복사시 이런식으로 복사 하지만
      -mongodb.net/?
      -mongodb.net/<콜렉션 이름>? 위에 url에 콜렉션 이름 추가 필요
Prisma 스키마로 데이터 관게 생성
  npm prisma generate
MongoDB 에 관계성 주입 (몽고DB 는 비관계성 데이터 베이스기 때문에 관계성이 주입시 일부 안될수 있음)
  npm prisma push


