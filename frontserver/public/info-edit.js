// const { response } = require("express");
const user = sessionStorage.getItem("userID");
if (!user) {
  alert("로그인 후 접속해주세요");
  window.location.href = "/";
}
// 유저 프로필 이미지 가져오기
const loginedUserImg = () => {
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
loginedUserImg();

const headerImg = document.getElementById("header-img");
const email = document.querySelector(".email-text");
const nickInput = document.querySelector(".nickname-input");
const userImg = document.querySelector(".login-user-img");
const editBnt = document.querySelector("#edit-bnt");
const toastMessage = document.querySelector("#toast");
const helpTxt = document.querySelector(".helper-text");
const delUser = document.querySelector(".del-user");

const modal = document.querySelector(".modal");
const modatTitle = document.querySelector(".modal h1");
const modalTxt = document.querySelector(".modal span");
const modalCanBnt = document.getElementById("cancel-bnt");
const modalConBnt = document.getElementById("confirm-bnt");

console.log(user);

// 1. [초기 세팅] user정보로 nickname, img 찾기 : POST
const userFetch = () => {
  fetch("http://localhost:4000/user/userData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      const loginedUser = res.data.find(
        (e) => e && e.userid === parseInt(user)
      );
      nickInput.value = loginedUser.nickname;
      email.innerText = loginedUser.email;
      userImg.src =
        loginedUser.userimg === ""
          ? (headerImg.src = "/img/profile_img.jpg")
          : (headerImg.src = res.data.userImg);
      console.log(res, nickInput, email, userImg.src);
    });
};
userFetch();

// 닉네임 유효성 검사
let nickDone;
const nickValid = () => {
  let nickRex = /\s/g;
  let nickValue = nickInput.value;
  if (nickValue.length < 1) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "닉네임을 입력해주세요";
    nickDone = false;
  } else if (nickRex.test(nickValue)) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "띄어쓰기를 없애주세요";
    nickDone = false;
  } else if (nickValue.length > 10) {
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "닉네임은 최대 10자까지 작성 가능합니다.";
    nickDone = false;
  } else {
    fetch("http://localhost:4000/user/nickCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick: nickInput.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 400) {
          helpTxt.classList.remove("hidden");
          helpTxt.innerText = data.message;
          nickDone = false;
        } else {
          // helpTxt.classList.add("hidden");
          helpTxt.innerText = data.message;
          nickDone = true;
        }
      });
  }
};

// 유효성 검사 통과하면 버튼 색상 변경
nickInput.addEventListener("keyup", () => {
  nickValid();
  console.log(nickDone);
  if (!nickDone) {
    editBnt.setAttribute("disabled", true);
    editBnt.style.background = "#ACA0EB";
  } else {
    editBnt.removeAttribute("disabled");
    editBnt.style.background = "#7F6AEE";
  }
});

// 닉네임 변경 반영
const editNick = () => {
  fetch("http://localhost:4000/user/editNick", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: user,
      nick: nickInput.value,
    }),
  })
    .then((response) => response.json())
    .then((res) => console.log(res));
};

// 수정하기 버튼
editBnt.addEventListener("click", () => {
  // api 요청
  editNick();
  toastOn();
});

const deleteUser = () => {
  fetch("http://localhost:4000/user/deleteUser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: user }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      alert("회원탈퇴 완료!");
      window.location.href = "/";
    });
};

// -----------------------------------
// 헤더 프로필 클릭 시
headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});

// 토스트 메세지
const toastOn = () => {
  toastMessage.classList.add("active");
  setTimeout(() => {
    toastMessage.classList.remove("active");
  }, 1000);
};

// 회원 탈퇴
delUser.addEventListener("click", () => {
  modatTitle.innerText = "회원 탈퇴하시겠습니까?";
  modalTxt.innerText = "작성된 게시글과 댓글은 삭제됩니다.";
  document.body.style.overflow = "hidden";
  modal.classList.remove("hidden");
});

// 모달 취소 버튼
modalCanBnt.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  modal.classList.add("hidden");
});

// 모달 확인 버튼
modalConBnt.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  modal.classList.add("hidden");
  deleteUser();
});
