const user = sessionStorage.getItem("userID");
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
      return (headerImg.src = res.data.userImg);
    });
};
userImg();

const editBnt = document.querySelector(".edit-bnt");

// 뒤로가기 버튼 -> 게시물 상세조회
editBnt.addEventListener("click", () => {
  window.location.href = "/html/post-read.html";
});

// 드롭다운
const headerImg = document.getElementById("header-img");

headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});

// 수정하고자 하는 게시글 정보 불러오기
const urlParams = new URLSearchParams(window.location.search);
const params = urlParams.get("post");
// console.log(params);

const titleInput = document.querySelector(".edit-title-input");
const contentInput = document.querySelector(".edit-content-textarea");
const imgInput = document.querySelector(".img-input");
const submitBnt = document.querySelector(".edit-bnt");
const helpTxt = document.querySelector(".helper-text");

const postData = () => {
  fetch("http://localhost:4000/post/postData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      const matchPost = res.data.find(
        (post) => parseInt(post.postid) === parseInt(params)
      );
      titleInput.value = matchPost.title;
      contentInput.value = matchPost.content;
      imgInput.src = matchPost.postimg;
    });
};

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

// 수정하기 버튼 클릭시 -> 수정한 내용 Json에 저장하기
const editPost = () => {
  fetch("http://localhost:4000/post/editPost", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID: parseInt(params),
      title: titleInput.value,
      content: contentInput.value,
      postImg: imgInput.value,
    }),
  })
    .then((response) => response.json())
    .then((res) => console.log(res));
};

postData();

submitBnt.addEventListener("click", (event) => {
  event.preventDefault();
  editPost();
  window.location.href = "/posts";
});
