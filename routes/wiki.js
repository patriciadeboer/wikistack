const express = require('express');
const router = express.Router();
const { Page } = require('../models');

const { addPage } = require('./../views');

const wikipage = require('./../views/wikipage');
const layout = require('./../views/layout');

const main=require('./../views/main')

router.get('/', async (req, res, next) => {
  let pageList = await Page.findAll();
  console.log(pageList);
  res.send(main(pageList));
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikipage(page));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.dataValues.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
