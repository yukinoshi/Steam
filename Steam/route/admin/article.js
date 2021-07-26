const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req,res) => {
    // 接受客户端传过来的页码
    const page = req.query.page;
    // 标识当前是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询文章所有数据
    // Unexpected token R in JSON at position 0 page 指定当前页 size 指定每页显示的数据条数 display 指定客户端显示的页码 exec 向数据库发送查询请求
    let articles = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();// 当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面。所以报错
    let str = JSON.stringify(articles); //先转化为普通字符串
    let json = JSON.parse(str);// 然后变成模板明白的JavaScript对象
    // res.send(articles);
    res.render('admin/article.art',{
        articles: json
    }); 
}