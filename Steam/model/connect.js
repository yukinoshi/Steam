const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{useUnifiedTopology: true,useNewUrlParser: true})
.then(()=>console.log(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`))
.catch(()=>console.log('数据库连接失败'));
mongoose.set('useCreateIndex', true);