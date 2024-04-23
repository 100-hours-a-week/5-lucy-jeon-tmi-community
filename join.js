const joinForm = document.querySelector(".info-form");
const emailInput = document.getElementById("email-input");
const pwInput = document.getElementById("pw-input");
const pwCheckInput = document.getElementById("pw-check-input");
const nickInput = document.getElementById("nick-input");
const emailHelper = document.getElementById("email-helper");
const pwHelper = document.getElementById("pw-helper");
const pwCheckHelper = document.getElementById("pw-check-helper");
const nickHelper = document.getElementById("nickname-helper");
const joinBnt = document.getElementById("join-bnt");

let userEmail;
let userNick;
fetch("/user.json")
  .then((response) => response.json())
  .then((data) => {
    userEmail = data[0].email;
    userNick = data[0].nickname;
  });

let emailDone = false;
let pwDone = false;
let pwCheckDone = false;
let nickDone = false;

const emailCheck = (event) => {
  let emailValue = event.target.value;
  let emailRex = /^\w+@\w+\.[a-zA-Z]/i;
  let already = userEmail === emailValue;
  // 글자수가 10자 미만일 때
  if (emailValue.length < 10 || !emailRex.test(emailValue)) {
    emailHelper.innerText =
      "* 올바른 이메일 주소 형식을 입력해주세요. (예 : example@example.com)";
    emailDone = false;
  } else if (already) {
    emailHelper.classList.remove("hidden");
    emailHelper.innerText = "중복된 이메일입니다.";
    emailDone = false;
  } else {
    emailHelper.classList.add("hidden");
    emailDone = true;
  }
};

const pwCheck = (event) => {
  let pwValue = event.target.value;
  let pwRex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
  // 입력 안했을 때
  if (pwValue.length < 1) {
    pwHelper.classList.remove("hidden");
    pwHelper.innerText = "비밀번호를 입력해주세요";
    pwDone = false;
    // 양식 확인
  } else if (!pwRex.test(pwValue)) {
    pwHelper.classList.remove("hidden");
    pwHelper.innerText =
      "* 비밀번호는 8자 이상, 20자 이하이면, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    pwDone = false;
  } else {
    pwHelper.classList.add("hidden");
    pwDone = true;
  }
};

const pwCheckCheck = (event) => {
  let pwCheckValue = event.target.value;
  if (pwCheckValue.length < 1) {
    pwCheckHelper.classList.remove("hidden");
    pwCheckHelper.innerText = "비밀번호를 한번더 입력해주세요";
    pwCheckDone = false;
  } else if (pwInput.value !== pwCheckValue) {
    pwCheckHelper.classList.remove("hidden");
    pwCheckHelper.innerText = "비밀번호가 다릅니다.";
    pwCheckDone = false;
  } else {
    pwCheckHelper.classList.add("hidden");
    pwCheckDone = true;
  }
};

const nickCheck = (event) => {
  let nickRex = /\s/g;
  let nickValue = event.target.value;
  if (nickValue.length < 1) {
    nickHelper.classList.remove("hidden");
    nickHelper.innerText = "닉네임을 입력해주세요";
    nickDone = false;
  } else if (nickRex.test(nickValue)) {
    nickHelper.classList.remove("hidden");
    nickHelper.innerText = "띄어쓰기를 없애주세요";
    nickDone = false;
  } else if (nickValue.length > 10) {
    nickHelper.classList.remove("hidden");
    nickHelper.innerText = "닉네임은 최대 10자까지 작성 가능합니다.";
    nickDone = false;
  } else {
    let already = userNick === nickValue;
    if (already) {
      nickHelper.classList.remove("hidden");
      nickHelper.innerText = "중복된 닉네임입니다.";
      nickDone = false;
    } else {
      nickHelper.classList.add("hidden");
      nickDone = true;
    }
  }
};

// 모든 유효성 검사를 통과했는지 확인
const checkDone = () => {
  if (emailDone && pwDone && pwCheckDone && nickDone) {
    joinBnt.removeAttribute("disabled");
    joinBnt.style.background = "#7F6AEE";
  } else joinBnt.setAttribute("disabled", true);
};

// 버튼색이 바뀌면 버튼 이벤트 추가
joinBnt.addEventListener("click", (event) => {
  event.preventDefault();
  if ((joinBnt.style.background = "#7F6AEE")) {
    // 회원정보를 저장하고...
    // 로그인 페이지로 이동
    window.location.href = "/html/login.html";
  }
});

// 비어 있거나 작성중인 경우
emailInput.addEventListener("focus", () => {
  emailHelper.classList.remove("hidden");
  emailHelper.innerText = "이메일을 입력해주세요";
});

pwInput.addEventListener("focus", () => {
  pwHelper.classList.remove("hidden");
  pwHelper.innerText = "비밀번호를 입력해주세요";
});

pwCheckInput.addEventListener("focus", () => {
  pwCheckHelper.classList.remove("hidden");
  pwCheckHelper.innerText = "비밀번호를 한번더 입력해주세요";
});

nickInput.addEventListener("focus", () => {
  nickHelper.classList.remove("hidden");
  nickHelper.innerText = "닉네임을 입력해주세요.";
});

// 포커스아웃
emailInput.addEventListener("focusout", emailCheck);
emailInput.addEventListener("focusout", checkDone);

pwInput.addEventListener("focusout", pwCheck);
pwInput.addEventListener("focusout", checkDone);

pwCheckInput.addEventListener("focusout", pwCheckCheck);
pwCheckInput.addEventListener("focusout", checkDone);

nickInput.addEventListener("focusout", nickCheck);
nickInput.addEventListener("focusout", checkDone);
