const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;
const corsOption = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("server on");
});

// 라우터 설정
const userRouter = require("./routes/userRouter.js");
const postRouter = require("./routes/postRouter.js");

app.use("/user", userRouter);
app.use("/post", postRouter);

const PORT = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
