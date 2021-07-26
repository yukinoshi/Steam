const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');


//  创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱不重复
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启动状态
    // 1 启用状态
    state: {
        type: Number,
        default: 0,
    }
});
const User = mongoose.model('User', userSchema);
// 测试用户创建
async function createUser(){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('1234567',salt);
    const user = await User.create({
        username: 'iteheima1',
        email: 'iteheima1@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    });
};
// createUser();
// 验证创建用户信息
const validateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名应为2到12字符')),
        email: Joi.string().email().required().error(new Error('邮箱格式不正确')),
        password: Joi.string().regex(/^[a-zA-Z]\S\w{5,17}$/).required().error(new Error('密码不符合规则')),
        role: Joi.string().valid('normal','admin').required().error(new Error('角色值错误')),
        state: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user,schema);    
}

// 将用户集合做为模块导出
module.exports = {
    User,
    validateUser
}