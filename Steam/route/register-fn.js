const Joi = require('joi');
const { User, validateUser } = require('../model/user');
const bcrypt = require('bcryptjs');
module.exports = async (req, res, next) => {
    // 定义对象验证规则 2330681912@qq.com
    if (req.body.code != global.numcode) { //判断验证码是否正确
        try {
            await validateUser(req.body);
        } catch (error) {
            // 验证没有通过   重定向回到用户提交页面  JSON.stringify将对象数据转换为字符串数据类型 next传下去会触发appjs的重定向中间件
            return res.status(400).render('admin/error-zc', {msg: '验证码不正确或者密码不符合要求'});
        }
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({email: req.body.email});
    // 如果用户存在 就有人注册过了
    if (user) {
        // return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}));
        return res.status(400).render('admin/error-zc', {msg: '邮箱已经被占用'});
    }
    // 对密码加密处理    
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password =  await bcrypt.hash(req.body.password, salt);
    // 替换存储到数据库
    req.body.password = password;
    // 将用户添加到数据库
    await User.create(req.body);
    res.redirect('/admin/user');
};
