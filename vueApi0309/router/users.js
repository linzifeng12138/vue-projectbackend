//使用token模块引入--查看packjson是否已安装该插件
const jwt = require('jsonwebtoken');
//连接数据库
const db = require('../db');

//连接自定义公共模块--数据返回的格式化封装模块
const apiResult = require('../utils/apiResult');

module.exports={
    register(app){
        //仅供后端前台使用---后台管理者登录接口
        app.post('/adminlogin', (req, res)=>{
            let account = req.body.username;
            let pwd = req.body.pwd;

            db.mongodb.select('Administrator', {account, pwd}).then((result)=>{
                if(result.length>0){
                    res.send(apiResult(result && result.length>0 , result));
                }else{
                    res.send(apiResult(false));
                }
            })
        })
        //仅供后端前台使用--普通用户全部的数据端口
        app.post('/showusers', (req,res)=>{
            db.mongodb.select('users', {}).then((result) => {    
                res.send(apiResult(result && result.length > 0, result));
                // 返回给前端的数据格式是{status:_result}
                // 里面的_result参数要么true--登录成功；false表示登录失败:
            })
        })
        //仅供后端前台使用---删除普通的用户
        app.post('/deluser', (req, res) => {
            // console.log(req.body.currentid);
            let id = req.body.currentid;
            let oid = db.mongodb.objectid(id);

            db.mongodb.remove('users', {"_id":oid}).then((result)=>{
                res.send(apiResult(true, result));
            })
        })



        //客户端用户登录接口
        app.post('/login', (req, res)=>{
            let username = req.body.username;
            let pwd = req.body.pwd;

            db.mongodb.select('users', {username, pwd}).then((result)=>{
                if(result.length>0){
                    res.send(apiResult(result && result.length>0 , result));
                }else{
                    res.send(apiResult(false));
                }
            })
        })

        //客户端注册新用户先去检查是否存在，存在就返回true信息
        app.post('/usercheck', (req, res)=>{
            let username = req.body.username;
            //let pwd = req.body.pwd;

            db.mongodb.select('users', {username}).then((result)=>{
                if(result && result.length>0){
                    res.send(apiResult(true));
                }else{              
                   res.send(apiResult(false));
                }
            })
        })

        
        // 增加普通用户
        app.post('/adduser', (req, res) => {
            let username = req.body.username;
            let pwd = req.body.pwd;
            //写入数据库的普通用户表users
            db.mongodb.insert('users', {username, pwd}).then((result)=>{
                res.send(apiResult(true, result));
            })
        })
       
    }
}
