const { Article } = require('../../model/article');
module.exports = async (req, res, next) => {
    // 获取要删除的用户id
    // 根据用户id删除
    await Article.findOneAndDelete({_id: req.query.id});
    // 将页面重定向到用户列表页面
    res.redirect('/admin/article');
}