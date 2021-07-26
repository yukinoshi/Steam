const mongoose = require('mongoose');
// 文章集合规则
const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		maxlength: 20,
		minlength: 4,
		required: [true, '请填写文章标题']
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, '请传递作者']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	},
	content: {
		type: String
	}
});
// 创建集合
const Article = mongoose.model('Article',articleSchema);

// 模块成员导出
module.exports = {
    Article
}
