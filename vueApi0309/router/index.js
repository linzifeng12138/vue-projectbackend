//使用socket.io模块必须加载资源
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 实现跨资源访问所需模块
const path = require('path');
//支持post请求
const bp = require('body-parser');

//实现保留用户名数据效果的所需模块
// const session = require('express-session');

// 引入自定义模块
const userRouter = require('./users');
const productRouter = require('./product');
const orderRouter = require('./order');

// 避免使用file协议，同时实现跨域请求允许，注意必须放在首位
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});



// 过滤器
// 1、实现body-parser模块的全局应用
app.use(bp.urlencoded({extended:false}));

//注意要在前端先安装客户端npm install socket.io-client --save-dev
io.on('connection', (client)=>{
    console.log('io connection');
    client.on('getClientMsg', (msg)=>{
        console.log(msg);
        io.emit('print', msg);
    })
})

//实现跨资源访问----目的是访问HTML文件夹的文件
// app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/html')));


//实现用户名数据验证保留--全局使用
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));

module.exports={
    //这里输出给server.js进行调用的哦
    start(_port){

        userRouter.register(app);
        productRouter.register(app);
        orderRouter.register(app);
        
        //设置默认路由--否则无法发起ajax请求
        // app.get('/', (req, res)=>{
        //     res.send('get root');
        // });

        http.listen(_port || 8080, function(){
            console.log(`now running on http://localhost:${_port || 8080}`);
        });
    }
}