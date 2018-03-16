const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

// 目的是为了保证用户必须先登录成功才可以使用，使用方式见代码的第十一行的filter
//app.post('/myproduct', filter, (req, res) => {})

module.exports = {
    register(app){
        //一、产品管理的接口：
        //全部商品产品查询
        app.post('/myproduct', (req, res) => {

            //必须查看或新建mongo或MySQL数据库数据先
            //接收前端传过来的数据参数，req.body.barcode
            // let barcode = req.body.barcode;
            // console.log(barcode);
            // 得到的是字符串---数据库里面的barcode也必须是字符串

            db.mongodb.select('shop', {}).then((result)=>{
                
                if(result && result.length > 0){
                    res.send(apiResult(true, result));
                }else{
                    //和数据库比对之后找不到该产品
                    res.send(apiResult(false));
                }
            })
        })

        //查询单个商品---商品详情页
        app.post('/oneproduct', (req, res) =>{
            let id = req.body.currentid;
            let oid = db.mongodb.objectid(id);

            db.mongodb.select('shop', {"_id":oid}).then((result)=>{
                res.send(apiResult(true, result));
            })
        })
        
        //产品的分类查询
        app.post('/typequery', (req, res) =>{
            //console.log(req.body.type);
            let type = req.body.type;
            db.mongodb.select('shop', {"type":type}).then((result)=>{
                res.send(apiResult(true, result));
            })
        })



        // 后台使用--产品增加
        app.post('/addproduct', (req, res) => {
            let id = Number(req.body.id);
            let name = req.body.name;
            let price = Number(req.body.price);
            let details = req.body.details;
            let imgs = req.body.imgs;
            let color = req.body.color;
            let memory = req.body.memory;
            let repertory = req.body.repertory;
            let type = req.body.type;
            //将数据用对象盛放起来
            let newpro = {
                id,
                name,
                price, 
                details,
                imgs,
                color,
                memory,
                repertory,
                type
            };
            db.mongodb.insert('shop', newpro).then((result)=>{
                res.send(apiResult(true, result));
            })

        })

        //后台---产品删除
        app.post('/delproduct', (req, res) => {
           
            let id = req.body.currentid;
            let oid = db.mongodb.objectid(id);

            db.mongodb.remove('shop', {"_id":oid}).then((result)=>{
                res.send(apiResult(true, result));
            })
        }) 

        //分页查询----适用于全部分类的数据
        app.post('/pageidx', (req, res)=>{
            var limitnum = 5;
            //要从前台接收page参数和行数rows
            var page = req.body.page;
            //显示多少数量一页
            //var limitnum = req.body.rows;//6
            // 根据页面跳过多少的数量的数据量
            //var skipnum = Number((page-1)*limitnum);

            var skipnum = Number((page-1)*limitnum);

            db.mongodb.pageidx('shop', {}, skipnum, limitnum).then((result)=>{
                res.send(apiResult(true, result));
            })
        })

        // 模糊查询---只适用于name字段的模糊搜索       
        app.post('/myfuzzy', (req, res)=>{

            for(var key in req.body){
                var condition = key;
            };
            
            db.mongodb.myfuzzy('shop', condition).then((result)=>{
                res.send(apiResult(true, result));
            })
        })
    }
}