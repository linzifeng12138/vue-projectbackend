//判断是否有访问权限----登录
//配合session进行判断
const apiResult = require('./apiResult');

const jwt = require('jsonwebtoken');
//目的是获取请求头header

module.exports = function(req, res, next){
    //只有当用户名已存在的前提下，才执行next后面的东西
    // if(req.session.username){
    //     next();
    // }else{
    //     res.send(apiResult(false, null, null, 'unauthorized'));
    //     //前端会收到{status:false, error: 'you are unauthorized to visit'}       
    // }
    let token = req.headers['authorization'];
    //注意区分大小写，默认写成小写authorization才不会出bug

    //注意这里的上面的'Authorization'来自于Vue的httpclient.js的headers参数

    if(token){
        jwt.verify(token, 'secret', (error, result)=>{
            if(error){
                res.send(apiResult(false, null, null, 'unauthorized'));
            }else{
                 next();
            }
        })
    }else{
        res.send(apiResult(false, null, null, 'unauthorized'));
    }
}