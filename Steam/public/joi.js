const Joi = require('joi');

// 定义验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('名字长度为2到5个字符')),
    birthday: Joi.number().min(1900).max(2020).error(new Error('年份为1900年以上')) 

};

async function run() { 
    // 实验验证
    try {
        await Joi.validate({username:'ab',birthday: 1800},schema);        
    } catch (error) {
        console.log(error.message);
        return;
    }
    console.log('验证通过');
}
run();