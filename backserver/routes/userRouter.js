const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userControllers.js");

userRouter.post("/userData", userController.userData);
userRouter.post("/join", userController.join);
userRouter.post("/login", userController.login);

userRouter.post("/emailCheck", userController.emailCheck);
userRouter.post("/nickCheck", userController.nickCheck);

userRouter.patch("/editNick", userController.editNick);
userRouter.patch("/editPw", userController.editPw);

userRouter.delete("/deleteUser", userController.deleteUser);

module.exports = userRouter;
