// const { response } = require("express");

const wrtBnt = document.getElementById("wrt-bnt");
const title = document.querySelector(".post-title");
const likes = document.querySelector(".likes");
const cmts = document.querySelector(".cmts");
const views = document.querySelector(".views");
const postBox = document.querySelectorAll(".post");
const clickBox = document.querySelectorAll(".title-wrap");

const postFetch = fetch("/posts.json")
  .then((response) => response.json())
  .then((data) => {
    // forEach로 post div 추가하는 방식으로 변경하기 @!
    //[기존!!]
    //   postList.innerHTML = Object.values(data)
    //     .map(
    //       (post) =>
    //         ` <div class="post" id="${post.postid}">
    //     <div class="title-wrap">
    //       <div class="post-title">${post.title.slice(0, 26)}</div>
    //       <div class="post-info">
    //         <span class="post-status">
    //           <span class="likes">${post.likes >= 1000 ? `좋아요 ${Math.round(post.likes / 1000)}K` : `좋아요 ${post.likes}`} </span>
    //           <span class="cmts">${post.cmts >= 1 ? `댓글수 ${Math.round(post.cmts / 1000)}K` : `댓글수 ${post.cmts}`}</span>
    //           <span class="views">${post.views >= 1000 ? `조회수 ${Math.round(post.views / 1000)}K` : `조회수 ${post.views}`}</span>
    //         </span>
    //         <span class="post-date">${post.date.year}-${post.date.month}-${post.date.day} ${post.date.hour}:${post.date.minute}:${post.date.second}</span>
    //       </div>
    //     </div>
    //     <hr />
    //     <div class="writer-wrap">
    //       <img src="${post.userimgurl}" alt="댓글 작성자" />
    //       <span>${post.username}</span>
    //     </div>
    //   </div>`
    //     )
    //     .join("");
    // [기존!!]

    const postData = data;
    // console.log(postData);
    postData.forEach((e) => {
      const createPost = document.createElement("div");
      createPost.classList.add("post");
      createPost.id = e.postid;
      createPost.innerHTML = `<div class="title-wrap">
      <div class="post-title">${e.title.slice(0, 26)}</div>
      <div class="post-info">
        <span class="post-status">
          <span class="likes">${e.likes >= 1000 ? `좋아요 ${Math.round(e.likes / 1000)}K` : `좋아요 ${e.likes}`} </span>
          <span class="cmts">${e.cmts >= 1 ? `댓글수 ${Math.round(e.cmts / 1000)}K` : `댓글수 ${e.cmts}`}</span>
          <span class="views">${e.views >= 1000 ? `조회수 ${Math.round(e.views / 1000)}K` : `조회수 ${e.views}`}</span>
        </span>
        <span class="post-date">${e.date.year}-${e.date.month}-${e.date.day} ${e.date.hour}:${e.date.minute}:${e.date.second}</span>
      </div>
    </div>

    <hr />

    <div class="writer-wrap">
      <img src="${e.userimgurl}" alt="댓글 작성자" />
      <span>${e.cmtwriter}</span>
    </div>`;
      const posts = document.querySelector(".posts");
      posts.appendChild(createPost);
    });
  });

// // 게시물을 클릭하면 postid 가 일치하는 게시물 상세조회로 넘어가기
// postBox.onclick = function () {
//   window.location.href = `/html/post-read.html?post=${postid}`;
// };

// let queryString = window.location.search;
// let params = new URLSearchParams(queryString);
// let postid = params.get("postid");

// [NOTE] 날짜 형식에서 01 처럼 두 자리 맞추기 기능 추가해야함

wrtBnt.addEventListener("click", () => {
  window.location.href = "/html/post-write.html";
});

wrtBnt.addEventListener("mouseover", () => {
  wrtBnt.style.background = "#7F6AEE";
});
wrtBnt.addEventListener("mouseout", () => {
  wrtBnt.style.background = "#ACA0EB";
});

// clickBox.forEach((box) => {
//   box.addEventListener("click", () => {
//     window.location.href = "/html/post-read.html";
//   });
// });

const headerImg = document.getElementById("header-img");

headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});
