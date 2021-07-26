const { Article } = require('../../model/article');

module.exports = async (req,res) => {
    // 标识,标识当前是文章管理页面
    req.app.locals.currentLink = 'article';
    const { message,id } = req.query;
    if (id) {
        let art = await Article.findOne({_id:id});
        res.render('admin/article-edit.art',{
            art: art,
            id: id,
            button: '修改',
            link: '/admin/article-modify?id='+id,
        });
    }else{
        res.render('admin/article-edit.art',{
            art: message,
            button: '添加',
            link: '/admin/article-add',
        });
    }

}