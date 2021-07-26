const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat');
const morgan = require('morgan');
const config = require('config');
const app = express();
require('./model/connect');//数据库连接
// 处理post请求参数
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// 告诉express模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 模板默认后缀
app.set('view engine','art');
// 渲染art文件的模板引擎
app.engine('art',require('express-art-template'));
// 向模板内部导入dateformate变量
template.defaults.imports.dateFormat = dateFormat;
// 引入路由模块
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

// 获取系统环境变量
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境');
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'));
} else {
    // 当前是生产环境
    console.log('当前是生产环境');
}

const home = require('./route/home');
const admin = require('./route/admin');
// 拦截请求 判断用户登录状态
app.use('/admin',require('./middleware/loginGuar'));
app.get('/zc',require('./route/register'));
app.post('/register',require('./route/register-fn'));
app.post('/email',require('./route/email'));
app.use('/home', home);
app.use('/admin', admin);
app.use('/',require('./middleware/steam'));
// 重定向错误处理
let params = [];
app.use((err,req,res,next) => {
    // 将字符串对象转换为对象 JSON.parse
    const result = JSON.parse(err);
    for(let attr in result){
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});
app.listen(3000); 
console.log('网站服务器启动成功');