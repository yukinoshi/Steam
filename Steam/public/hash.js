const bcrypt = require('bcryptjs');
// 生成随机字符串
// 接受数字为参数 越大越复杂

async function run() {
    const salt = await bcrypt.genSalt(10);
    // 对密码加密
    // 1.明文
    // 2.随机字符串
    // 返回加密的密码
    const result = await bcrypt.hash('123456',salt);
    console.log(salt);
    console.log(result);
}
run();