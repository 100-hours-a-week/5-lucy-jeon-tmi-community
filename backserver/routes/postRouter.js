const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/postControllers");

postRouter.post("/postData", postController.postData);
postRouter.post("/updatePost", postController.updatePost);
postRouter.patch("/editPost", postController.editPost);
postRouter.delete("/deletePost", postController.deletePost);

postRouter.post("/updateCmt", postController.updateCmt);
postRouter.patch("/editCmt", postController.editCmt);
postRouter.delete("/deleteCmt", postController.deleteCmt);

module.exports = postRouter;
