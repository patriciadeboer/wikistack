const express = require('express');
const router = express.Router();

const { Page, User } = require('../models');

const {userList, userPages} = require("../views");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) { next(error)}
});

router.get("/:userId", async (req, res, next) => {
  try {
    //console.log("before extracted: ", user)
    let user = await User.findAll({
      where: {
        id: req.params.userId
      }
    });
    console.log(user);
    // const user = await User.findById(req.params.userId);
    console.log("User extracted: ", user)
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    res.send(userPages(user[0], pages));
  } catch (error) { next(error)}
})

module.exports=router;

