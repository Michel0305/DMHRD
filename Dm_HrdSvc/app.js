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
var resOverWorkRouter = require('./routes/overwork');
var resAttendanceRouter = require('./routes/attendance');
// const { hostname } = require('os');
// const cors = require('cors')

var expressJWT = require('express-jwt');
var fs = require('fs');
var app = express();

// app.use(cors());
app.use((req, res, next) => {//解决跨域问题
  res.header("Access-Control-Allow-Credentials", "true");
  var allowedOrigins = ['http://10.83.50.18:9527', 'http://localhost:9527', 'http://127.0.0.1:9527'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Content-Type', 'application/x-www-form-urlencoded');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, X-Token');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method == 'OPTIONS') {
    res.send(20000);
  } else {
    next();
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var secretOrPrivateKey = fs.readFileSync(path.join(__dirname, './control/ssl/private.pem'))  //加密token 校验token时要使用

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(expressJWT({
  secret: Buffer.from(secretOrPrivateKey),
  algorithms: ['RS256']
}).unless({//过滤验证URL
  path: ['/api/user/login', '/api/user/logout', '/api/public/images/*']
}));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.send({ code: 50014, data: "invalid token..." })
    // res.status(50014).send('');
  } else {
    next();
  }
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

/**
 * 用户登录API
 */
app.use('/api/user', loginRouter);
app.use('/api/personnel', resUserRouter);
app.use('/api/leave', resLeaveRouter);
app.use('/api/overwork', resOverWorkRouter);
app.use('/api/attendance', resAttendanceRouter);
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
