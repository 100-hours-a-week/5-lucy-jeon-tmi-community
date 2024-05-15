const user = sessionStorage.getItem("userID");
if (!user) {
  alert("로그인 후 접속해주세요");
  window.location.href = "/";
}
// 유저 프로필 이미지 가져오기
const userImg = () => {
  console.log(user);
  fetch("http://localhost:4000/user/userImg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid: user }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      return res.data.userImg === ""
        ? (headerImg.src = "/img/profile_img.jpg")
        : (headerImg.src = res.data.userImg);
    });
};
userImg();

const headerImg = document.getElementById("header-img");
const pwHelper = document.querySelector(".pw-helper-text");
const pwCheckHelper = document.querySelector(".pw-check-helper-text");
const editBnt = document.querySelector(".pw-edit-bnt");
const pwInput = document.querySelector(".pw-input");
const pwCheckInput = document.querySelector(".pw-check-input");

// 드롭다운
headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  if (!user) {
    dropDown.style.display == "none";
  } else {
    dropDown.style.display == "block"
      ? (dropDown.style.display = "none")
      : (dropDown.style.display = "block");
  }
});

let pwDone;
let pwCheckDone;
// 비밀번호 유효성 검사
const pwCheck = () => {
  let pwValue = pwInput.value;
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
      "* 비밀번호는 8자 이상, 20자 이하이며 대문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    pwDone = false;
  } else {
    console.log("오케이 통과");
    pwHelper.classList.add("hidden");
    pwDone = true;
  }
};

const pwCheckCheck = () => {
  let pwCheckValue = pwCheckInput.value;
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

const checkDone = () => {
  console.log(pwDone, pwCheckDone);
  if (pwDone && pwCheckDone) {
    editBnt.removeAttribute("disabled");
    editBnt.style.background = "#7F6AEE";
  } else {
    editBnt.setAttribute("disabled", true);
    editBnt.style.background = "#ACA0EB";
  }
};

// 비밀번호 수정 반영
const editPw = () => {
  fetch("http://localhost:4000/user/editPw", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: user,
      pw: pwInput.value,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
    });
};

pwInput.addEventListener("keyup", () => {
  pwCheck();
  checkDone();
});

pwCheckInput.addEventListener("keyup", () => {
  pwCheckCheck();
  checkDone();
});

editBnt.addEventListener("click", () => {
  editPw();
  alert("비밀번호 수정이 완료되었습니다. 다시 로그인해주세요");
  window.location.href = "/";
});
