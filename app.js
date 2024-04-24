// express 모듈을 불러옵니다.
// const express = require('express');
import express from "express";
// import fileSyncSystem from "fs";

//[오류 기록] :  __dirname is not defined in ES module scope
// __dirname 변수가 ES모듈에서는 없기 떄문에 발생하는 오류
// 아래 코드를 추가 작성해서 해결
import path, { dirname } from "path";
const __dirname = path.resolve();

// express 애플리케이션을 생성합니다.
const app = express();

// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 3000;

// Express에서 정적 파일을 제공하기 위해서 express.static 메서드를 사용
// public : 디렉터리 이름
app.use(express.static(path.join(__dirname)));
// app.use(bodyParser.json())

// url(localhost:3000/)을 입력하면 login.html을 응답한다.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/login.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
