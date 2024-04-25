const wrtBnt = document.getElementById("wrt-bnt");
const postList = document.querySelector(".posts");
const title = document.querySelector(".post-title");
const likes = document.querySelector(".likes");
const cmts = document.querySelector(".cmts");
const views = document.querySelector(".views");
// const postBox = document.querySelectorAll(".post");
const postBox = document.querySelector(".posts");
const clickBox = document.querySelectorAll(".title-wrap");

const postFetch = fetch("/posts.json")
  .then((response) => response.json())
  .then((data) => {
    // forEach로 post div 추가하는 방식으로 변경하기 @!
    postList.innerHTML = Object.values(data)
      .map(
        (post) =>
          ` <div class="post" id="${post.postid}">
      <div class="title-wrap">
        <div class="post-title">${post.title.slice(0, 26)}</div>
        <div class="post-info">
          <span class="post-status">
            <span class="likes">${post.likes >= 1000 ? `좋아요 ${Math.round(post.likes / 1000)}K` : `좋아요 ${post.likes}`} </span>
            <span class="cmts">${post.cmts >= 1 ? `댓글수 ${Math.round(post.cmts / 1000)}K` : `댓글수 ${post.cmts}`}</span>
            <span class="views">${post.views >= 1000 ? `조회수 ${Math.round(post.views / 1000)}K` : `조회수 ${post.views}`}</span>
          </span>
          <span class="post-date">${post.date.year}-${post.date.month}-${post.date.day} ${post.date.hour}:${post.date.minute}:${post.date.second}</span>
        </div>
      </div>
      <hr />
      <div class="writer-wrap">
        <img src="${post.userimgurl}" alt="댓글 작성자" />
        <span>${post.username}</span>
      </div>
    </div>`
      )
      .join("");
  });

// [NOTE] 포스트 전체가 하나의 링크로만..

// postBox.addEventListener("click", () => {
//   window.location.href = `/html/post-read.html?postId=${postId}`;
// });

// document안에 어디든
// 근데 post만 딱 클릭이 안됨
// postID = undefined
document.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.classList.contains("post-info")) {
    const postId = event.target.dataset.postid; // 클릭된 게시글의 ID 가져오기
    console.log(event.target.dataset);
    window.location.href = `/html/post-read.html?postid=${postId}`;
  } else {
    console.log("fail");
  }
});

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
