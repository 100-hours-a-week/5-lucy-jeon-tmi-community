const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const pwInput = document.querySelector("#pw-input");
const helpTxt = document.querySelector("#helper-text");
const loginBnt = document.querySelector("#login-bnt");

let emailValid;
let pwValid;
const ValidCheck = () => {
  if (emailValid && pwValid) {
    loginBnt.style.background = "#7F6AEE";
    helpTxt.classList.add("hidden");
    loginBnt.addEventListener("click", (event) => {
      event.preventDefault();
      loginBnt.style.background == "#7F6AEE";
      window.location.href = "/html/post-list.html";
    });
  } else {
    loginBnt.style.background = "#ACA0EB";
  }
};

const emailCheck = (event) => {
  let emailRex = /^\w+@\w+\.[a-zA-Z]/i;
  let emailVal = event.target.value;
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

const pwCheck = (event) => {
  let pwRex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
  let pwVal = event.target.value;
  const userPw = "Qlalf123!";
  // const userPw = fetch("/user.json")
  //   .then((response) => response.json())
  //   .then((data) => data[0].password);
  // console.log(userPw);
  if (pwVal.length < 1) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "비밀번호를 입력해주세요";
    pwValid = false;
  } else if (!pwRex.test(pwVal)) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText =
      "비밀번호는 8자 이상 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    pwValid = false;
  } else if (pwVal !== userPw) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "비밀번호가 다릅니다.";
  } else {
    helpTxt.classList.add("hidden");
    pwValid = true;
    console.log(pwValid);
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
emailInput.addEventListener("focusout", ValidCheck);
pwInput.addEventListener("focusout", ValidCheck);
