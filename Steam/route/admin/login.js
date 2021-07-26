const bcrypt = require('bcryptjs');
// 用户集合构造函数
const {User} = require('../../model/user');
module.exports = async (req, res) =>{
    // 请求参数
        const {email, password} = req.body;
        if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误',var: 'admin/login'});
        // 根据邮箱地址查询用户信息
        // 如果查询到了用户 user是对象类型 存储的是用户信息
        // 没有查到就是为空
        let user = await User.findOne({email});
    
        if (user) {
            //将客户端密码与用户的密码判断
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                req.session.username = user.username;
                // 把用户角色存储在session中
                req.session.role = user.role;
                // res.send('登录成功');
                // 重定向到用户列表页面
                req.app.locals.userInfo = user;
                // 对用户角色进行判断
                if (user.role == 'admin') {
                    // 管理页面
                    res.redirect('/admin/user');
                } else {
                    // 博客首页
                    res.redirect('/Steam.html');
                }
                res.redirect('/admin/user');
            } else {
            // 没有查询到
                res.status(400).render('admin/error',{msg: '邮箱地址或者密码错误'});
            }
        }else{
            // 没有查询到
            res.status(400).render('admin/error',{msg: '邮箱地址或者密码错误'});
        }
}
