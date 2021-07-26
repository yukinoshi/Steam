const url = require('url');
const path = require('path');

module.exports = (req,res,next) => {
    // 请求路径
    let pathname = url.parse(req.url).pathname;
    let a = path.join(__dirname,'public' + pathname)
    res.end(a);
}