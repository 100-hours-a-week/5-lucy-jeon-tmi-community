// const { response } = require("express");
// TODO
// [V] 로그인 버튼 disabled로 관리하기

const loginForm = document.querySelector("#login-fnporm");
const emailInput = document.querySelector("#email-input");
const pwInput = document.querySelector("#pw-input");
const helpTxt = document.querySelector("#helper-text");
const loginBnt = document.querySelector("#login-bnt");

let pwValid = false;

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
  if ((loginBnt.style.background = "#7F6AEE")) {
    window.location.href = "/html/post-list.html";
  }
});

// 이메일 유효성 확인
const emailCheck = (event) => {
  let emailRex = /^\w+@\w+\.[a-zA-Z]/i;
  let emailVal = emailInput.value;
  if (emailVal.length < 10) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText =
      "*올바른 이메일 주소 형식을 입력해주세요 (예 : example@email.com)";
    emailValid = false;
  } else if (!emailRex.test(emailVal)) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText =
      "* 올바른 이메일 주소 형식으로 입력해주세요 (예 : example@email.com)";
    emailValid = false;
  } else {
    helpTxt.classList.add("hidden");
    emailValid = true;
    console.log(emailValid);
  }
};

// 비밀번호 유효성 확인
const pwCheck = (event) => {
  const pwRex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
  let pwVal = pwInput.value;
  let joinChecked = false;

  if (pwVal.length < 1) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "비밀번호를 입력해주세요";
    pwValid = false;
  } else if (!pwRex.test(pwVal)) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText =
      "비밀번호는 8자 이상 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    pwValid = false;
  } else if (!joinChecked) {
    fetch("/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userData = data;
        console.log(userData);
        // input 값과 동일한 user 찾기
        const userEmail = data.map((e) => e.email);
        const matchEmail = userEmail.find((e) => e == emailInput.value);
        console.log(emailInput.value);
        if (matchEmail) {
          // matchUser가 가진 비밀번호가 pw input값과 일치하는지 확인
          const loginUser = userData.find((e) => e.email == matchEmail);
          if (loginUser.password == pwInput.value) {
            joinChecked = true;
            helpTxt.classList.add("hidden");
            pwValid = true;
          } else {
            joinChecked = false;
            helpTxt.classList.remove("hidden");
            helpTxt.innerText = "비밀번호가 다릅니다.";
            pwValid = false;
          }
        } else {
          helpTxt.classList.remove("hidden");
          helpTxt.innerText = "가입되지 않은 이메일입니다";
          pwValid = false;
        }
      });
  }
};

emailInput.addEventListener("input", emailCheck);
pwInput.addEventListener("input", pwCheck);

emailInput.addEventListener("focus", () => {
  emailCheck();
  ValidCheck();
});
pwInput.addEventListener("focus", () => {
  pwCheck();
  ValidCheck();
});
emailInput.addEventListener("focusout", () => {
  ValidCheck();
});
pwInput.addEventListener("focusout", ValidCheck);
