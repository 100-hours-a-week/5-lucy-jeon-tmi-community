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
const headerBnt = document.querySelector("#header-bnt");
const headerImg = document.querySelector("#header-img");
const postInfo = document.querySelector("#post-info");
const editBnt = document.getElementById("edit-bnt");
const cmtForm = document.getElementById("cmt-form");
const cmtBnt = document.querySelector(".reply-bnt");
const modal = document.querySelector(".modal");
const modatTitle = document.querySelector(".modal h1");
const modalTxt = document.querySelector(".modal span");
const modalCanBnt = document.getElementById("cancel-bnt");
const modalConBnt = document.getElementById("confirm-bnt");
const cmtBox = document.querySelector(".reply-wrap");
const cmtInfo = document.querySelectorAll(".cmt");
const cmtText = document.querySelector(".reply-text");
const cmtInput = document.querySelector(".reply-input");
let editCmt;
let deleteCmt;

// 댓글 수정 버튼에 이벤트 리스너 등록하기
const clickEdit = () => {
  const editCmtBnt = document.querySelectorAll(".cmt-edit-bnt");
  editCmtBnt.forEach((bnt) => {
    bnt.addEventListener("click", clickCmtEdit);
  });
};

// 댓글 삭제 버튼에 이벤트 리스너 등록하기
const clickDel = () => {
  const delCmtBnt = document.querySelectorAll(".cmt-del-bnt");
  delCmtBnt.forEach((bnt) => {
    bnt.addEventListener("click", clickCmtDel);
  });
};

// 댓글 수정 요청
const clickCmtEdit = (event) => {
  console.log("작동은 되는 중");
  const clickedBnt = event.target;
  const parentDiv = clickedBnt.parentElement.parentElement;
  const cmtText = parentDiv.querySelector(".reply-text");
  cmtInput.value = cmtText.innerText;
  // console.log(parentDiv, cmtText);
  cmtBnt.innerText = "수정 하기";
  // console.log(clickedBnt.getAttribute("cmtid"));

  // 댓글 수정 반영하기
  editCmt = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("post");
    fetch(`http://localhost:4000/post/editCmt?post=${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: params,
        cmtId: clickedBnt.getAttribute("cmtid"),
        content: cmtInput.value,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  };
};

// 댓글 삭제 눌렀을 떄
const clickCmtDel = (event) => {
  const clickedBnt = event.target;
  // 모달창 띄우기
  modatTitle.innerText = "댓글을 삭제하시겠습니까?";
  modalTxt.innerText = "삭제한 내용은 복수 할 수 없습니다.";
  document.body.style.overflow = "hidden";
  modal.classList.remove("hidden");

  deleteCmt = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("post");
    fetch(`http://localhost:4000/post/deleteCmt?post=${params}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: params,
        cmtId: clickedBnt.getAttribute("cmtid"),
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        location.href = location.href;
      });
  };
};

// 뒤로가기 -> 게시물 목록
headerBnt.addEventListener("click", () => {
  window.location.href = "/posts";
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
  if (modatTitle.innerText === "게시글을 삭제하시겠습니까?") {
    deletePost();
  } else if (modatTitle.innerText === "댓글을 삭제하시겠습니까?") {
    deleteCmt();
  }
});

postInfo.addEventListener("click", (event) => {
  // 수정버튼 누르면 이동
  if (event.target.id == "edit-bnt") {
    const urlParams = new URLSearchParams(window.location.search);
    const params = urlParams.get("post");
    window.location.href = `/html/post-cor.html?post=${params}`;
  } else if (event.target.id == "del-bnt") {
    // 삭제확인 모달 띄우기
    modatTitle.innerText = "게시글을 삭제하시겠습니까?";
    modalTxt.innerText = "삭제한 내용은 복수 할 수 없습니다.";
    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
  }
});

// 게시물과 댓글 불러오기
function fetchPostAndCmt() {
  // 현재 url의 쿼리스트리를 분석
  const urlParams = new URLSearchParams(window.location.search);
  const params = urlParams.get("post");
  // console.log(params);

  // params와 일치하는 postData 찾기
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
      // console.log(matchPost);
      postInfo.innerHTML = `<div class="post-info" id="post-info">
        <div class="post-title">${matchPost.title}</div>

        <div class="writer-info">
            <div class="writer-wrap">
                <img
          class="profile-img"
          id="post-user-img"
          src="${matchPost.userid}"
          alt="작성자 프로필 사진"
        />
                <span id="post-user-nickname" class="post-writer">${matchPost.userid}</span>
                <span class="date">${matchPost.date}</span>
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
        <img class="post-img" src="${matchPost.postimg}" alt="본문 이미지" />
        <div class="post-text">${matchPost.content}</div>

        <div class="post-status">
          <div class="views">
            ${matchPost.views >= 1000 ? `${Math.round(matchPost.views / 1000)}K` : `${matchPost.views}`} <br />
            조회수
          </div>
          <div class="comments">
            ${matchPost.cmts >= 1000 ? `${Math.round(matchPost.cmts / 1000)}K` : `${matchPost.cmts}`} <br />
            댓글
          </div>
        </div>
      </div>`;

      // 댓글 생성
      const cmtDetail = matchPost.cmtDetail;
      cmtDetail.forEach((cmt) => {
        const createCmt = document.createElement("div");
        createCmt.classList.add("cmt");
        createCmt.id = cmt.commentid;
        createCmt.innerHTML = `
            <div class="reply-info" id="${cmt.commentid}">
              <div class="reply-writer-info">
                <img class="profile-img cmt-user" src="${cmt.userid}" alt="댓글작성자 이미지" />
                <span class="writer">${cmt.userid}</span>
    
                <span class="date">${cmt.date}</span>
              </div>
              <div class="reply-text">${cmt.content}</div>
            </div>
            <div class="bnts">
              <button class="cmt-edit-bnt" cmtId="${cmt.commentid}">수정</button>
              <button class="cmt-del-bnt" cmtId="${cmt.commentid}">삭제</button>
            </div>
          `;
        cmtBox.appendChild(createCmt);
      });
      postUser();
      cmtUser();
    });
}

// 유저정보 맞춰넣기
function postUser() {
  fetch("http://localhost:4000/user/userData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      // 게시물 작성자 정보 넣기
      const postUserNick = document.querySelector("#post-user-nickname");
      const postUserImg = document.querySelector("#post-user-img");
      const postUser = res.data.find(
        (user) =>
          user && parseInt(user.userid) === parseInt(postUserNick.innerText)
      );
      postUserNick.innerText = postUser.nickname;
      postUserImg.src = postUser.userimg;
      // console.log(postUser);
    });
}

// 댓글 유저정보 맞춰넣기
function cmtUser() {
  fetch("http://localhost:4000/user/userData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      const cmtsUser = document.querySelectorAll(".writer");
      const cmtsUserImg = document.querySelectorAll(".cmt-user");
      const cmtsUserArr = Array.from(cmtsUser).map((e) =>
        parseInt(e.innerText)
      );
      // console.log(cmtsUser);
      const cmtsUserImgArr = Array.from(cmtsUserImg).map((e) => e.src);

      cmtsUserArr.forEach((e, index) => {
        const findCmtWriter = res.data.find((user) => {
          if (user.userid === e) {
            return user.nickname;
          } else {
            console.log("사용자를 찾을 수 없습니다.");
          }
        });
        cmtsUser[index].innerText = findCmtWriter.nickname;
      });

      cmtsUserImgArr.forEach((e, index) => {
        const findCmtImg = res.data.find((user) => {
          const parts = e.split("/");
          const lastPart = parts[parts.length - 1];
          if (user.userid === parseInt(lastPart)) {
            return user.userimg;
          } else {
            console.log("사용자 프로필 사진을 찾을 수 없습니다.");
          }
        });
        cmtsUserImg[index].src = findCmtImg.userimg;
      });
      clickEdit();
      clickDel();
    });
}

// 게시물 삭제 요청
const deletePost = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = urlParams.get("post");
  fetch(`http://localhost:4000/post/deletePost?post=${params}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ params: params }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      window.location.href = "/posts";
    });
};

fetchPostAndCmt();

// 댓글 창 입력시 버튼 색 변경 && disabled false

const cmtInputCheck = () => {
  const cmtVal = cmtInput.value;
  if (cmtVal.length < 1) {
    console.log(cmtVal);
    cmtBnt.setAttribute("disabled", true);
    cmtBnt.style.background = "#ACA0EB";
  } else {
    console.log(cmtVal);
    cmtBnt.removeAttribute("disabled");
    cmtBnt.style.background = "#7F6AEE";
  }
};

cmtInput.addEventListener("input", cmtInputCheck);

// 댓글 등록 요청
const updateCmt = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = urlParams.get("post");
  fetch(`http://localhost:4000/post/updateCmt?post=${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      params: params,
      userID: user,
      content: cmtInput.value,
      date: new Date(),
    }),
  });
};

// 댓글 등록 && 댓글 수정 버튼
cmtBnt.addEventListener("click", (event) => {
  event.preventDefault();
  if (cmtBnt.innerText === "댓글 등록") {
    console.log("댓글 등록");
    updateCmt();
    location.href = location.href;
  } else if (cmtBnt.innerText === "수정 하기") {
    console.log("댓글 수정");
    editCmt();
    location.href = location.href;
  }
});

// 드롭다운
headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});
