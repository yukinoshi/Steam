const express = require('express');
// 创建博客展示页面路由
const admin = express.Router();
// 用户列表渲染
admin.get('/login',require('./admin/loginPage'));
// 登录功能
admin.post('/login',require('./admin/login'));
// 访问用户列表功能
admin.get('/user',require('./admin/userpage'));
// 退出登录
admin.get('/logout',require('./admin/logout'));
// 创建用户编辑页面功能
admin.get('/user-edit',require('./admin/user-edit'));
// 用户添加功能
admin.post('/user-edit',require('./admin/user-edit-fn'));
// 用户修改功能
admin.post('/user-modify',require('./admin/user-modify'));
// 用户注册功能
// 用户删除功能
admin.get('/delete',require('./admin/user-delete'));
// 文章列表功能
admin.get('/article', require('./admin/article'));
// 文章编辑功能
admin.get('/article-edit', require('./admin/article-edit'));
// 文章添加功能
admin.post('/article-add', require('./admin/article-add'));
// 文章修改功能
admin.post('/article-modify',require('./admin/article-modify'));
// 文章删除功能
admin.get('/article-delete',require('./admin/article-delete'));




module.exports = admin;
