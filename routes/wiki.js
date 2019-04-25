const express = require('express');
const router = express.Router();
const { Page } = require("../models");

const {addPage}= require('./../views');

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/',(req,res,next)=>{
  res.send('got to GET /wiki/')
});

router.post('/', async (req,res,next)=>{
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  console.log(page)
  // res.json(req.body)

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add',(req,res)=>{
  res.send(addPage())
})



module.exports=router;
