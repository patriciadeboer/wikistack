const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');

const { addPage } = require('./../views');

const wikipage = require('./../views/wikipage');
const layout = require('./../views/layout');

const main=require('./../views/main')

const editPage=require('./../views/editPage')

router.get('/', async (req, res, next) => {
  let pageList = await Page.findAll();
  console.log(pageList);
  res.send(main(pageList));
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug/edit', async (req, res, next) => {
  try{
    const pageEdit= await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(editPage(pageEdit))
  } catch (error) {
    next(error);
  }
});



router.get('/:slug', async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    if(!page){
      res.status(404).send("Page is not in server.")
    }

    res.send(wikipage(page));
  } catch (error) {
    next(error);
  }
});

router.get('*',function(req,res){
  res.status(404).send("current page path doesn't exist")
})

router.post('/', async (req, res, next) => {
  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content,
  //   status: req.body.status,
  // });

  // const user = new User({
  //   name: req.body.author,
  //   email: req.body.email
  // })

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })
    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }



});

module.exports = router;
