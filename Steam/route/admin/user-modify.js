const { User} = require('../../model/user');
const bcrypt = require('bcryptjs');
module.exports = async (req,res,next) => {
    // 接受客户端传递的请求参数
    const { username,email,role,state,password } = req.body;
    // 即将修改的用户id 
    const id = req.query.id;
    let user = await User.findOne({_id: id});
    // 密码比对 明文比暗文
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        // 密码比对成功
        await User.updateOne({_id:id},{
            username: username,
            email: email,
            role: role,
            state: state,
        });
        res.redirect('/admin/user');
    }else{
        // 密码比对失败
        let obj = {path: '/admin/user-edit',message: '密码比对失败,不能进行修改',id:id};
        next(JSON.stringify(obj));
    }
}