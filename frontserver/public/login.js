sessionStorage.removeItem("userID");

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const pwInput = document.querySelector("#pw-input");
const helpTxt = document.querySelector("#helper-text");
const loginBnt = document.querySelector("#login-bnt");

let pwValid = false;

// 가입된 이메일, 비밀번호 일치 여부 확인
const loginCheck = () => {
  const loginInfo = {
    email: emailInput.value,
    pw: pwInput.value,
  };
  fetch("http://localhost:4000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 400) {
        helpTxt.classList.remove("hidden");
        helpTxt.innerText = data.message;
        pwValid = false;
      } else {
        helpTxt.classList.add("hidden");
        pwValid = true;
        userID = data.data.userID;
        console.log(userID);
      }
    });
};

// 이메일 && 로그인 유효성 통과 확인
const ValidCheck = () => {
  if (emailValid && pwValid) {
    loginBnt.removeAttribute("disabled");
    loginBnt.style.background = "#7F6AEE";
  } else {
    loginBnt.setAttribute("disabled", true);
    loginBnt.style.background = "#ACA0EB";
  }
};

// 버튼색이 바뀌면 페이지 이동 가능
loginBnt.addEventListener("click", (event) => {
  event.preventDefault();
  // 세션에 로그인한 이메일값 저장
  sessionStorage.setItem("userID", userID);
  window.location.href = "/posts";
});

// 이메일 유효성 확인
const emailCheck = (event) => {
  let emailRex = /^\w+@\w+\.[a-zA-Z]/i;
  let emailVal = emailInput.value;

  if (emailVal.length < 10 || !emailRex.test(emailVal)) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText =
      "* 올바른 이메일 주소 형식을 입력해주세요 (예 : example@email.com)";
    emailValid = false;
  } else {
    helpTxt.classList.add("hidden");
    emailValid = true;
  }
};

// 비밀번호 유효성 확인
const pwCheck = (event) => {
  const pwRex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
  let pwVal = pwInput.value;
  if (pwVal.length < 1) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "비밀번호를 입력해주세요";
    pwValid = false;
  } else if (!pwRex.test(pwVal)) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText =
      "비밀번호는 8자 이상 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    pwValid = false;
  } else {
    loginCheck();
  }
};

emailInput.addEventListener("keyup", () => {
  emailCheck();
  ValidCheck();
});
pwInput.addEventListener("keyup", () => {
  pwCheck();
  ValidCheck();
});
