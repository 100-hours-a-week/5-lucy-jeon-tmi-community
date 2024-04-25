const headerBnt = document.querySelector("#header-bnt");
const headerImg = document.querySelector("#header-img");
const postInfo = document.querySelector("#wrap");
const editBnt = document.getElementById("edit-bnt");
const cmtForm = document.getElementById("cmt-form");
const cmtInput = document.getElementById("cmt-input");
const cmtBnt = document.getElementById("cmt-bnt");
const modal = document.querySelector(".modal");
const modatTitle = document.querySelector(".modal h1");
const modalTxt = document.querySelector(".modal span");
const modalCanBnt = document.getElementById("cancel-bnt");
const modalConBnt = document.getElementById("confirm-bnt");

// 뒤로가기
headerBnt.addEventListener("click", () => {
  window.location.href = "/html/post-list.html";
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
  // 게시글 삭제되는 코드
  alert("delete !");
  window.location.href = "/html/post-list.html";
});

postInfo.addEventListener("click", (event) => {
  // 수정버튼 누르면 이동
  if (event.target.id == "edit-bnt") {
    window.location.href = "/html/post-cor.html";
  } else if (event.target.id == "del-bnt") {
    // 삭제확인 모달 띄우기
    modatTitle.innerText = "게시글을 삭제하시겠습니까?";
    modalTxt.innerText = "삭제한 내용은 복수 할 수 없습니다.";
    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
  }
});

fetch("/posts.json")
  .then((response) => response.json())
  .then((data) => {
    // forEach로 post div 추가 하기
    // 댓글도 forEach로 추가하기?
    // 변경되는 부분만 선언해서 추가하기? 구글링 필요
    const post = data[0];
    postInfo.innerHTML = `<div class="post-info" id="post-info">
        <div class="post-title">${post.title}</div>

        <div class="writer-info">
            <div class="writer-wrap">
                <img
          class="profile-img"
          src="${post.userimgurl}"
          alt="작성자 프로필 사진"
        />
                <span class="writer">${post.username}</span>
                <span class="date">${post.date.year}-${post.date.month}-${post.date.day} ${post.date.hour}:${post.date.minute}:${post.date.second}</span>
        </div>

      <!-- 버튼 -->
          <div class="bnts" id="post-bnts">
            <button class="bnt" id="edit-bnt">수정</button>
            <button class="bnt" id="del-bnt">삭제</button>
          </div>
        </div>
    </div>
    <hr />

    <!-- 본문 -->
    <div class="post-wrap">
        <img class="post-img" src="${post.postimgurl}" alt="본문 이미지" />
        <div class="post-text">${post.posttext}</div>

        <div class="post-status">
          <div class="views">
            ${post.views >= 1000 ? `${Math.round(post.views / 1000)}K` : `${post.views}`} <br />
            조회수
          </div>
          <div class="comments">
            ${post.cmts >= 1000 ? `${Math.round(post.cmts / 1000)}K` : `${post.cmts}`} <br />
            댓글
          </div>
        </div>

        <hr />

        <!-- 댓글 작성 폼 -->
        <form class="reply-form" id="cmt-form">
          <input
            id="cmt-input"
            class="reply-input"
            type="text"
            placeholder="댓글을 남겨주세요!"
          />
          <hr />
          <button class="reply-bnt id="cmt-bnt"">댓글 등록</button>
        </form>

        <!-- 댓글 내용 -->
        <div class="reply-wrap">
          <div class="reply-info">
            <div class="reply-writer-info">
              <img class="profile-img" src="${post.cmtwriterimg}" alt="댓글작성자 이미지" />
              <span class="writer">${post.cmtwriter}</span>

              <span class="date">${post.cmtdate}</span>
            </div>
            <div class="reply-text">${post.cmttext}</div>
          </div>
          <div class="bnts">
            <button class="bnt">수정</button>
            <button class="bnt">삭제</button>
          </div>
        </div>
      </div>`;
  });

headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});
