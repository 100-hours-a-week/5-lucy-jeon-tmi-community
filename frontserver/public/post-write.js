const user = sessionStorage.getItem("userID");
console.log(user);

const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const submitBnt = document.getElementById("submit-bnt");
const headerBnt = document.querySelector(".header-bnt");
const helpTxt = document.querySelector(".helper-text");

// 뒤로가기 버튼 -> 게시글 목록
headerBnt.addEventListener("click", () => {
  window.location.href = "/html/post-list.html";
});

// 작성하기 버튼 -> 게시물 추가 && 이동
submitBnt.addEventListener("click", () => {
  updatePost();
  window.location.href = "/html/post-list.html";
});

// 제목 입력 확인, 내용 입력확인 후 버튼 활성화 + helper텍스트 hidden.
const ValidCheck = () => {
  let titleVal = titleInput.value;
  let contentVal = contentInput.value;

  if (titleVal && contentVal) {
    submitBnt.removeAttribute("disabled");
    submitBnt.style.background = "#7F6AEE";
    helpTxt.classList.add("hidden");
  } else {
    submitBnt.setAttribute("disabled", true);
    submitBnt.style.background = "#ACA0EB";
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "* 제목, 내용을 모두 작성해주세요";
  }
};

titleInput.addEventListener("input", ValidCheck);
contentInput.addEventListener("input", ValidCheck);

const headerImg = document.getElementById("header-img");

headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});

// 게시글 추가 api
const updatePost = () => {
  const newPost = {
    title: titleInput.value,
    user: user,
    content: contentInput.value,
    date: new Date(),
  };
  fetch("http://localhost:4000/post/updatePost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
