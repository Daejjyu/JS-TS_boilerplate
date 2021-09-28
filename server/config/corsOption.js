module.exports = {
    origin: ['http://localhost:9000', 'http://127.0.0.1:9000'], // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200 // 응답 상태 200으로 설정 
};