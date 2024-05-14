const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 3002;
const publicPath = __dirname + "/public";
console.log(__dirname);

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// 로그인 페이지
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "login.html"));
});

// 회원가입 페이지
app.get("/join", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "join.html"));
});

// 게시물 목록 페이지
app.get("/posts", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-list.html"));
});

// 게시물 작성 페이지
app.get("/writepost", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-write.html"));
});

// 라우터 설정 : 프론트에도 설정을 해줘야 넘어가는구나..
const userRouter = require("../backserver/routes/userRouter");
const postRouter = require("../backserver/routes/postRouter");

app.use("/user", userRouter);
app.use("/post", postRouter);

app.use((req, res) => {
  res.status(404).send("404 not Found");
});

const PORT = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
