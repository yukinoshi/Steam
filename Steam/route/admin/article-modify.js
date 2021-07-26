const { Article } = require('../../model/article');
const path = require('path');
const formidable = require('formidable');
var form = new formidable.IncomingForm()

module.exports = async (req,res,next) => {
    form.uploadDir = path.join(__dirname, '../','../','public','uploads');
    form.uploadDir = path.join(__dirname, '../','../','public','uploads');
    form.keepExtensions = true;
    form.parse(req, async (err,fields,files) => {
        //err 为错误信息 成功null
        //fields 对象类型 保存普通表单数据
        //files 对象类型 保存了上传文件相关的数据
        // res.send(files.cover.path.split('public')[1]);
            const id = req.query.id;
            await Article.updateOne({_id:id},{
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content,
            });
            res.redirect('/admin/article');
        });
};