const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');


module.exports = {
    register(app){
        app.post('/neworder', (req, res) => {
            //从前端获取到数据pro
            //ley buyer = req.body.buyer;
            //console.log(req.body);
            var reqobj = req.body;
            
            let pros = {
                _id: reqobj._id,
                name: reqobj.name,
                price: reqobj.price,
                details: reqobj.details,
                imgs: reqobj.imgs,
                color: reqobj.color,
                imgs: reqobj.imgs
            }

            // let pros = JSON.parse(req.body);
            // console.log(pros);
            // let total = 0;
            // // 计算总消费金额
            // for(let item of pros){
            //     total += item.price;
            // }

            //生成数据流
            let order = {
                orderno: parseInt(Math.random()*1000000),
                status:0,
                products:pros
            }
            // // let order = {
            // //     orderno: parseInt(Math.random()*1000000),
            // //     total,
            // //     status:0,
            // //     buyer,
            // //     products:pros
            // // }
            // // 需要前端配合将buyer也作为参数传过来

            // //写入数据库
            db.mongodb.insert('orders', order).then((result) =>{
                res.send(apiResult(true, result));
            })
        })

        //查询所有的订单----仅用于后台
        app.post('/getorders', (req, res)=>{
            db.mongodb.select('orders', {}).then((result)=>{   
                res.send(apiResult(true, result));        
            })
        })
        
        //后台---购物车信息删除
        app.post('/delorders', (req, res) => {
           
            let id = req.body.currentid;
            let oid = db.mongodb.objectid(id);

            db.mongodb.remove('orders', {"_id":oid}).then((result)=>{
                res.send(apiResult(true, result));
            })
        }) 
    }
}