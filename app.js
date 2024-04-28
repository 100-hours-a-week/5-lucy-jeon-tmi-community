import express from "express";
import path from "path";
const __dirname = path.resolve();
// /Users/lucy.jeon/5-lucy-jeon-tmi-community
import bodyParser from "body-parser";
import fileSystem from "fs";
import readlineSyncModule from "readline-sync";

const app = express();
const port = 3000;
const publicPath = __dirname + "/public";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "login.html"));
});

app.get("/join", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "join.html"));
});

app.post("/joinApi", (req, res) => {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
    };

    const userInfo = fileSystem.readFileSync("user.json", "utf-8");
    const jsonUsers = JSON.parse(userInfo);
    let users = [...jsonUsers];
    users.push(newUser);

    fileSystem.writeFileSync("user.json", JSON.stringify(users), "utf-8");
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

app.get("/posts", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-list.html"));
});

app.get("/writepost", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-write.html"));
});

// [] postid에 해당하는 페이지 라우팅
app.post("/post/:id", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "post-read.html"));
});

app.use((req, res) => {
  res.status(404).send("404 not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
