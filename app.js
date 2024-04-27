import express from "express";
// const path = require("path");
import path from "path";
const __dirname = path.resolve();
// // console.log(__dirname);
// // /Users/lucy.jeon/5-lucy-jeon-tmi-community

const app = express();
const port = 3000;
const publicPath = __dirname + "/public";
console.log(publicPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "login.html"));
});

app.get("/join", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "join.html"));
});

app.get("/posts", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-list.html"));
});

app.get("/writepost", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-write.html"));
});

// postid에 해당하는 페이지 라우팅
app.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  res.sendFile(path.join(publicPath, "html", "post-read.html"));
});

app.use((req, res) => {
  res.status(404).send("404 not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
