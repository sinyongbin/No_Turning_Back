프로젝트 소개<br/>
&emsp;&emsp;https://www.canva.com/design/DAFzWY-g4pg/g3wKMce_yCEasKDTEHFEsg/edit?locale=ko-KRhttps://www.canva.com/design/DAFzWY-g4pg/g3wKMce_yCEasKDTEHFEsg/edit?locale=ko-KR

연동된 프로젝트 <br/>
  &emsp;오라클 서버 <br/>
    &emsp;&emsp;https://github.com/KColdCastle/No_Turning_Back_Oracle_Server  <br/>
  오라클 Admin 전용 <br/>
   &emsp;&emsp; https://github.com/KColdCastle/NoTurnBack_Admin <br/> <br/>
    
Oralce DB 설치 필요 <br/>
 &emsp;&emsp; https://github.com/KColdCastle/No_Turning_Back_Oracle_Server  설치 꼭 필요 <br/>
.env 최상위 폴더에 생성 <br/>
  &emsp;&emsp;DATABASE_URL="몽고DB url 삽입 필요"// Mongo Atlas 무료 티어 사용함. 무료라서 가끔 데이터가 받아지지 않는 문제가 발생함 <br/>
  &emsp;&emsp;username> <br/>
  &emsp;&emsp;password> 부분은 변경이 필요함 <br/>
  콜렉션이 없다면 생성후에 URL 에 따로 넣어줘야 정상 작동함 <br/>
   &emsp;&emsp; URL 복사시 이런식으로 복사 하지만 <br/>
   &emsp;&emsp;   -mongodb.net/? <br/>
   &emsp;&emsp;   -mongodb.net/<콜렉션 이름>? 위에 url에 콜렉션 이름 추가 필요 <br/>
Prisma 스키마로 데이터 관게 생성 <br/>
 &emsp;&emsp; npm prisma generate <br/>
MongoDB 에 관계성 주입 (몽고DB 는 비관계성 데이터 베이스기 때문에 관계성이 주입시 일부 안될수 있음) <br/>
 &emsp;&emsp; npm prisma db push <br/>


