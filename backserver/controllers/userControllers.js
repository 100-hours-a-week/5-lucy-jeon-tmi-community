const fs = require("fs");
const jsonUrl = __dirname + "/.." + "/model/user.json";

// user.json 데이터 가져오기
const userJson = fs.readFileSync(jsonUrl, "utf8");
const users = JSON.parse(userJson);

// 유저 데이터 불러오기
function userData(req, res) {
  try {
    res.json({
      status: 200,
      message: "유저정보 불러오기 성공",
      data: users,
    });
  } catch (error) {
    console.error(error);
  }
}

function userImg(req, res) {
  try {
    const userID = req.body.userid;
    const loginUser = users.find(
      (user) => user && parseInt(user.userid) === parseInt(userID)
    );
    console.log(userID, users, loginUser);
    res.json({
      status: 200,
      message: "유저 이미지 불러오기 성공",
      data: { userImg: loginUser.userimg },
    });
  } catch (error) {
    console.log(error);
  }
}

// 이메일 가입여부 & 비밀번호 일치 여부 확인
function login(req, res) {
  try {
    const { email, pw } = req.body;
    // const email = req.body.email;
    // const pw = req.body.pw;

    const matchUser = users.find((user) => user && user.email === email);
    if (!matchUser) {
      res.json({
        status: 400,
        message: "가입된 이메일이 아닙니다",
        data: null,
      });
    } else if (matchUser && matchUser.password !== pw) {
      res.json({
        status: 400,
        message: "비밀번호가 일치하지 않습니다.",
        data: null,
      });
    } else {
      res.json({
        status: 200,
        message: "로그인 성공",
        data: { userID: matchUser.userid, nick: matchUser.nickname },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// 이메일 중복 검사
function emailCheck(req, res) {
  try {
    const email = req.body.email;
    const alreadyEmail = users.find((user) => user && user.email === email);

    if (alreadyEmail) {
      res.json({
        status: 400,
        message: "중복된 이메일입니다.",
        data: null,
      });
    } else {
    }
    res.json({
      status: 200,
      message: "사용 가능한 이메일입니다.",
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
}

// 닉네임 중복 검사
function nickCheck(req, res) {
  try {
    const nick = req.body.nick;
    const alreadyNick = users.find((user) => user && user.nickname === nick);

    if (alreadyNick) {
      res.json({
        status: 400,
        message: "중복된 닉네임입니다.",
        data: null,
      });
    } else {
      res.json({
        status: 200,
        message: "사용 가능한 닉네임입니다.",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// 회원가입
function join(req, res) {
  try {
    const userIds = users.map((user) => user.userid);
    const MaxUserId = Math.max(...userIds);
    const newUserId = MaxUserId + 1;

    const newUser = {
      userid: newUserId,
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      userimg: "",
    };

    users.push(newUser);

    fs.writeFileSync(
      __dirname + "/.." + "/model/user.json",
      JSON.stringify(users),
      "utf8"
    );
    res.json({
      status: 200,
      message: "회원가입 성공",
      data: users,
    });
  } catch (error) {
    console.error(error);
  }
}

// 닉네임 수정
function editNick(req, res) {
  const { userID, nick } = req.body;
  // console.log(userID, nick);
  const matchUser = users.find(
    (user) => user && user.userid === parseInt(userID)
  );
  // console.log(matchUser);
  matchUser.nickname = nick;

  fs.writeFileSync(jsonUrl, JSON.stringify(users), "utf8");
  res.json({
    status: 200,
    message: "닉네임 변경 성공",
    data: matchUser,
  });
}

function editPw(req, res) {
  const { userID, pw } = req.body;
  // console.log(userID, pw);
  const matchUser = users.find(
    (user) => user && user.userid === parseInt(userID)
  );
  // console.log(matchUser);
  matchUser.password = pw;

  fs.writeFileSync(jsonUrl, JSON.stringify(users), "utf8");
  res.json({
    status: 200,
    message: "비밀번호 변경 성공",
    data: matchUser,
  });
}

function deleteUser(req, res) {
  const userID = req.body.userid;
  const matchUser = users.find(
    (user) => user && user.userid === parseInt(userID)
  );
  const newUsers = users.filter((user) => user.userid !== matchUser.userid);

  fs.writeFileSync(jsonUrl, JSON.stringify(newUsers), "utf8");
  res.json({
    status: 200,
    message: "회원 탈퇴 성공",
    data: newUsers,
  });
}

module.exports = {
  userData,
  userImg,
  login,
  join,
  emailCheck,
  nickCheck,
  editNick,
  editPw,
  deleteUser,
};
