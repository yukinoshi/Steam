const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req,res) => {
    // 获取文章的id值
    const id = req.query.id;
    // 根据id查询文章
    let article = await Article.findOne({_id: id}).populate('author');
    let str = JSON.stringify(article);
    let json = JSON.parse(str);
    // 查询当前文章所对应的评论信息
    let comment = await Comment.find({aid: id}).populate('uid');
    let strc = JSON.stringify(comment);
    let jsonc = JSON.parse(strc);
    // res.send(comment);
    // res.send('欢迎来到博客文章');
    res.render('home/article.art',{
        article: json,
        comment: jsonc
    });
}