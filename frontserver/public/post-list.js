// const { response } = require("express");

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
      return res.data.userImg === ""
        ? (headerImg.src = "/img/profile_img.jpg")
        : (headerImg.src = res.data.userImg);
    });
};
userImg();
const headerImg = document.getElementById("header-img");

const wrtBnt = document.getElementById("wrt-bnt");
const title = document.querySelector(".post-title");
const likes = document.querySelector(".likes");
const cmts = document.querySelector(".cmts");
const views = document.querySelector(".views");
const postBox = document.querySelectorAll(".post");
const clickBox = document.querySelectorAll(".title-wrap");
const dropDown = document.querySelector(".dropdown");

// 게시글 불러오기
const postFetch = () => {
  fetch("http://localhost:4000/post/postData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.data.forEach((post) => {
        const createPost = document.createElement("div");
        createPost.classList.add("post");
        createPost.id = post.postid;
        createPost.innerHTML = `<div class="title-wrap">
      <div class="post-title">${post.title.slice(0, 26)}</div>
      <div class="post-info">
        <span class="post-status">
          <span class="likes">${post.likes >= 1000 ? `좋아요 ${Math.round(post.likes / 1000)}K` : `좋아요 ${post.likes}`} </span>
          <span class="cmts">${post.cmts >= 1 ? `댓글수 ${Math.round(post.cmts / 1000)}K` : `댓글수 ${post.cmts}`}</span>
          <span class="views">${post.views >= 1000 ? `조회수 ${Math.round(post.views / 1000)}K` : `조회수 ${post.views}`}</span>
        </span>
        <span class="post-date">${post.date}</span>
      </div>
    </div>

    <hr />

    <div class="writer-wrap">
      <img src="${post.userid}" "alt="댓글 작성자" />
      <span>${post.userid}</span>
    </div>`;
        const posts = document.querySelector(".posts");
        posts.appendChild(createPost);
        createPost.onclick = function () {
          window.location.href = `/html/post-read.html?post=${post.postid}`;
        };
      });
      userFetch();
    });
};

// 사용자 정보 불러오기
const userFetch = () => {
  fetch("http://localhost:4000/user/userData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const userData = data.data;
      // 유저 정보 적용
      const writer = document.querySelectorAll(".writer-wrap");
      const writerId = Array.from(writer).map((e) => e.innerText);
      writerId.forEach((e, index) => {
        const findUser = userData.find(
          (user) => user && parseInt(user.userid) === parseInt(e)
        );
        // console.log(findUser, e);
        if (findUser) {
          writer[index].innerHTML = `
          <img src="${findUser.userimg === "" ? "/img/profile_img.jpg" : findUser.userimg}" "alt="댓글 작성자" />
          <span>${findUser.nickname}</span>`;
        } else {
          console.log("사용자를 찾지 못함");
        }
      });
    });
};

postFetch();

// ---- 구분 -----

// 게시글 작성
wrtBnt.addEventListener("click", () => {
  window.location.href = "/html/post-write.html";
});

// 버튼 호버
wrtBnt.addEventListener("mouseover", () => {
  wrtBnt.style.background = "#7F6AEE";
});
wrtBnt.addEventListener("mouseout", () => {
  wrtBnt.style.background = "#ACA0EB";
});

// 프로필 클릭시
headerImg.addEventListener("click", () => {
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});
