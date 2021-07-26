const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req,res) => {
    // 获取页码的值
    const page = req.query.page;

    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    let str = JSON.stringify(result);
    let json = JSON.parse(str);
    // res.send('欢迎来到博客首页');
    res.render('home/default.art',{
        result: json
    });
}