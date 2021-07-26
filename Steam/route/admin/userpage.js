// 导入用户集合函数
const { User } = require('../../model/user');
module.exports = async (req, res) =>{
    // 标识,标识当前是用户管理页面
    req.app.locals.currentLink = 'user';
    // 接受客户端的当前页参数
    let page = req.query.page || 1;
    // 每一页的显示的数据
    let pagesize = 10;
    // 查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pagesize);
    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;
    // 将用户信息查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user',{
        users: users,
        page: page,
        total: total,
        count: count
    });
}