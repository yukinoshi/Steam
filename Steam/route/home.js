const express = require('express');
// 创建博客展示页面路由
const home = express.Router();
// steam
// 社区
home.get('/',require('./home/index'));
// 文章详情
home.get('/article',require('./home/article'));
// 评论功能
home.post('/comment',require('./home/comment'));
module.exports = home;