const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const submitBnt = document.getElementById("submit-bnt");
const headerBnt = document.querySelector(".header-bnt");
const helpTxt = document.querySelector(".helper-text");

// 1. 뒤로가기 버튼 -> 게시글 목록
headerBnt.addEventListener("click", () => {
  window.location.href = "post-list.html";
});

// 2. 제목 입력 확인, 내용 입력확인 후 버튼 활성화 + helper텍스트 hidden.
const ValidCheck = () => {
  let titleVal = titleInput.value;
  let contentVal = contentInput.value;

  if (titleVal && contentVal) {
    submitBnt.style.background = "#7F6AEE";
    helpTxt.classList.add("hidden");
  } else {
    submitBnt.style.background = "#ACA0EB";
    helpTxt.classList.remove("hidden");
    helpTxt.innerText = "* 제목, 내용을 모두 작성해주세요";
  }
};

titleInput.addEventListener("input", ValidCheck);
contentInput.addEventListener("input", ValidCheck);
