const express = require('express');
const morgan = require('morgan');
const app = express();
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// parses json bodies
app.use(express.json());

app.use('/wiki', wikiRouter);
app.use('/user', userRouter)

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const init = async () => {
  models.db.authenticate().then(() => {
    console.log('connected to the database');
  });

  await models.db.sync({force:true});
  //await models.Page.sync();

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
