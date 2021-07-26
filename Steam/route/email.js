const nodemailer = require('nodemailer');
module.exports = (req,res) => {
    const emails =  req.body.email;
    function num(){
        let Num = '';
        for (let i = 0; i < 6; i++) {
            Num+=Math.floor(Math.random()*10);
        }   
        return Num;
       }
    var nums = num();
    global.numcode = nums;
 let tranSport = nodemailer.createTransport({
     host: 'smtp.qq.com',
     secureConnection: true,
     auth:{
         user: '2972854873@qq.com',
         pass: 'kzdfcpakiwmxdcje'
     }
 })
 let options = {
     from: '2972854873@qq.com',
     to: emails,
     subject: '登录Steam社区验证码',
     text: `你的验证码为${nums}，不要告诉别人`
 };
 tranSport.sendMail(options,(err,msg) => {
     if (err) {
        console.log(err);
        res.send();
     } else {
         // res.send(msg);
        console.log('邮件发送成功');
        transport.close();
        
     }
 })
}
