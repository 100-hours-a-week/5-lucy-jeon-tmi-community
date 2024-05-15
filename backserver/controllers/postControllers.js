const fs = require("fs");
const moment = require("moment");
const jsonUrl = __dirname + "/.." + "/model/posts.json";

// model폴더에서 데이터 불러오기

const postJson = () => {
  const json = fs.readFileSync(jsonUrl, "utf8");
  return JSON.parse(json);
};

// 게시글 (전체) 불러오기
function postData(req, res) {
  try {
    const posts = postJson();
    res.json({
      status: 200,
      message: "게시글 불러오기 성공",
      data: posts,
    });
  } catch (error) {
    console.error(error);
  }
}

// 새로운 게시글 추가하기
function updatePost(req, res) {
  try {
    const posts = postJson();
    const postIds = posts.map((post) => post.postid);
    const MaxPostId = Math.max(...postIds);
    const newPostId = MaxPostId + 1;

    const newPost = {
      postid: newPostId,
      userid: parseInt(req.body.user),
      title: req.body.title,
      content: req.body.content,
      postimg: "",
      date: moment(req.body.date).format("YYYY-MM-DD hh:mm:ss"),
      likes: 0,
      cmts: 0,
      views: 0,
      cmtDetail: [],
    };

    posts.push(newPost);

    fs.writeFileSync(jsonUrl, JSON.stringify(posts), "utf8");
    res.json({
      status: 200,
      message: "게시글 등록 성공",
      data: posts,
    });
  } catch (error) {
    console.error(error);
  }
}

// 게시글 수정하기
function editPost(req, res) {
  const posts = postJson();

  const { postID, title, content, postImg } = req.body;
  // const postID = req.body.postID;
  // const title = req.body.title;
  // const content = req.body.content;
  // const postImg = req.body.postImg;

  const editPost = posts.find((post) => post.postid === postID);
  console.log(editPost);
  editPost.title = title;
  editPost.content = content;
  editPost.postimg = postImg;

  fs.writeFileSync(jsonUrl, JSON.stringify(posts), "utf8");
  res.json({
    status: 200,
    message: "게시글 수정 성공",
    data: posts,
  });
}

// 게시글 삭제하기
function deletePost(req, res) {
  const posts = postJson();
  const params = req.body.params;
  const deletePost = posts.find((post) => post.postid === parseInt(params));
  console.log(deletePost);

  const newPosts = posts.filter((post) => post.postid !== deletePost.postid);

  fs.writeFileSync(jsonUrl, JSON.stringify(newPosts), "utf8");
  res.json({
    status: 200,
    message: "게시글 삭제 성공",
    data: newPosts,
  });
}

// 새로운 댓글 추가하기
function updateCmt(req, res) {
  try {
    const posts = postJson();
    const params = req.body.params;
    const matchPost = posts.find((post) => post.postid === parseInt(params));
    const cmts = matchPost.cmtDetail;
    const cmtIds = cmts.map((cmt) => parseInt(cmt.commentid));
    const MaxCmtId = cmtIds.length < 1 ? 0 : Math.max(...cmtIds);
    const newCmtId = MaxCmtId + 1;
    console.log(cmts, cmtIds, MaxCmtId, newCmtId);

    const newCmt = {
      commentid: newCmtId,
      userid: parseInt(req.body.userID),
      content: req.body.content,
      date: moment(req.body.date).format("YYYY-MM-DD hh:mm:ss"),
    };

    cmts.push(newCmt);
    // posts.push(cmts);

    fs.writeFileSync(
      __dirname + "/.." + "/model/posts.json",
      JSON.stringify(posts),
      "utf8"
    );
    res.json({
      status: 200,
      message: "댓글 등록 성공",
      data: posts,
    });
  } catch (error) {
    console.error(error);
  }
}

// 댓글 수정하기
function editCmt(req, res) {
  const posts = postJson();
  console.log(req.body);

  const { params, cmtID, content } = req.body;
  // const params = req.body.params;
  cmtID = parseInt(cmtId);
  // const content = req.body.content;

  const matchPost = posts.find((post) => post.postid === parseInt(params));
  const cmts = matchPost.cmtDetail;
  const matchCmt = cmts.find((cmt) => cmt.commentid === parseInt(cmtID));
  matchCmt.content = content;

  fs.writeFileSync(jsonUrl, JSON.stringify(posts), "utf8");
  res.json({
    status: 200,
    message: "댓글 수정 성공",
    data: posts,
  });
}

function deleteCmt(req, res) {
  const posts = postJson();
  const { params, cmtID } = req.body;
  // const params = req.body.params;
  cmtID = parseInt(cmtID);
  const matchPost = posts.find((post) => post.postid === parseInt(params));
  const cmts = matchPost.cmtDetail;
  const matchCmt = cmts.find((cmt) => cmt.commentid === parseInt(cmtID));

  const newCmts = cmts.filter((cmt) => cmt.commentid !== matchCmt.commentid);
  matchPost.cmtDetail = newCmts;

  fs.writeFileSync(jsonUrl, JSON.stringify(posts), "utf8");
  res.json({
    status: 200,
    message: "댓글 삭제 성공",
    data: posts,
  });
}

module.exports = {
  postData,
  updatePost,
  editPost,
  deletePost,
  updateCmt,
  editCmt,
  deleteCmt,
};
