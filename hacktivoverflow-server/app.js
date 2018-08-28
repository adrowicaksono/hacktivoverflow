require('dotenv').config()
const cors = require('cors')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const app = express();
const background = require('./middleware/cron')
app.use(cors())

background.test()
//set MONGOURI

let MONGO_URI = {
  development:`mongodb://${process.env.dbUser}:${process.env.dbPassword}@ds157901.mlab.com:57901/hacktiv8-over-flow-adrodb`,

  test:`mongodb://${process.env.dbUser}:${process.env.dbPassword}@ds157901.mlab.com:57901/hacktiv8-over-flow-adrodb`
}

mongoose.connect(MONGO_URI[process.env.NODE_ENV], { useNewUrlParser: true } ,function(err){
  if(err){
    console.log(err)
  }
  console.log("connect with mLab")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions')
const commentsRouter = require('./routes/comments')


app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/comments', commentsRouter);
// catch 404 and forward to error handler


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;