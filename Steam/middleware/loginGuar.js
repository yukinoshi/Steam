const guard = (req, res, next) =>{
    // 判断用户是否是登录页面 判断用户的登录状态 登录了就下一步 不是就跳转到登录页面
    if (req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else{
        // 如果是普通用户
        if (req.session.role == 'normal'){
            // 跳转博客首页 阻止去管理页面
            return res.redirect('/home/');
        }
        next();
    }
}
module.exports = guard;