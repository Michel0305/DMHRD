var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var conf = require('./conf/config')
// var logger = require('morgan');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var loginRouter = require('./routes/login');
var resUserRouter = require('./routes/resuser');
var resLeaveRouter = require('./routes/leave');
// const { hostname } = require('os');
// const cors = require('cors')

var expressJWT = require('express-jwt');
var fs = require('fs');
var app = express();

app.use((req, res, next) => {//解决跨域问题
  res.header("Access-Control-Allow-Credentials", "true");
  var allowedOrigins = ['http://10.83.4.182:9527', 'http://localhost:9527', 'http://127.0.0.1:9527'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Content-Type', 'application/x-www-form-urlencoded');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, X-Token');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var secretOrPrivateKey = fs.readFileSync(path.join(__dirname, './control/ssl/private.pem'))  //加密token 校验token时要使用

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(expressJWT({
  secret: Buffer.from(secretOrPrivateKey),
  algorithms: ['RS256']
}).unless({//过滤验证URL
  path: ['/user/login', '/user/logout', '/user/departmentjob', '/public/images/*']
}));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(50014).send('invalid token...');
  } else {
    next();
  }
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

/**
 * 用户登录API
 */
app.use('/user', loginRouter);
app.use('/personnel', resUserRouter);
app.use('/leave', resLeaveRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8888, '127.0.0.1', () => {
  console.log('Server is start for url: http://127.0.0.1:8888');
})
module.exports = app;
