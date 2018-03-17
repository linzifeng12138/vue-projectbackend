<template>
<div> 
    <fieldset>
            <legend>
                Create New Products
            </legend>
            <div class="form-group">
                <label>id:</label>
                <input type="number" id="id" v-model="newpro.id"/>
            </div>
            
            <div class="form-group">
                <label>Product name:</label>
                <input type="text" id="name" v-model="newpro.name"/>
            </div>
            
            <div class="form-group">
                <label>Price:</label>
                <input type="number" id="price" v-model="newpro.price"/>
            </div>
            <div class="form-group">
                <label>Details:</label>
                <input type="text" id="details" v-model="newpro.details"/>
            </div>
            <div class="form-group">
                <label>imgs:</label>
                <input type="text" value="" id="imgs" v-model="newpro.imgs"/>
            </div>
            <div class="form-group">
                <label>color:</label>
                <input type="text" value="" id="color" v-model="newpro.color"/>
            </div>
            <div class="form-group">
                <label>memory:</label>
                <input type="text" value="" id="memory" v-model="newpro.memory"/>
            </div>
            <div class="form-group">
                <label>repertory:</label>
                <input type="text" value="" id="repertory" v-model="newpro.repertory"/>
            </div>
            <div class="form-group">
                <label>type:</label>
                <input type="text" value="" id="type" v-model="newpro.type"/>
            </div>

            <div class="form-group">
                <label></label>
                <button  @click="createPro">Create</button>
            </div>

            <div class="form-group">
                <span class="selectionspan">产品分类(精准)查询:</span>
                <select class="selection" v-model="type" @change="change(type)">
                    <option value="手机">手机</option>
                    <option value="电视">电视</option>
                    <option value="家电">家电</option>
                    <option value="笔记本">笔记本</option>
                    <option value="耳机">耳机</option>
                </select>
            </div>

            <div class="form-group">
                <label></label>
                <button  @click="pages">跳转到</button>
                <input type="number" id="pageidx" name="pageidx" min="1" v-model="pageidx" :max ="max"/>
                <span>页</span>
                <span>共</span>
                <span>{{max}}</span>
                <span>页</span>
            </div>

            <div class="form-group">
                <label>模糊查询:</label>
                <input type="text" value="" id="fuzzycheck" v-model="optiontxt"/>
                <button  @click="fuzzycheck">模糊查询</button>
            </div>          
    </fieldset>

    <h3>{{$store.state.header.lanType}}</h3>
    <table class="table table-striped text-center" :config="config">
        <thead>
            <tr>
                <th v-for="(val, key) in dataset[0]" v-if="config.cols.indexOf(key) > -1">
                    {{dictionary[$store.state.header.lanType][key] || key}}
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(obj, idx) in dataset">
                <td v-for="(val, key) in obj"  v-if="config.cols.indexOf(key) > -1">        
                    <span v-if="key !== 'imgs' ">
                        {{val}}
                    </span>

                    <span v-else>
                        <img :src= val class="pics">
                    </span>          
                </td>

                <td><input type="button" value="delete" @click="remove(obj)"/></td>
            </tr> 
        </tbody>
    </table>

    

    <spinner v-if="display"></spinner>

</div>
</template>

<script>
    //0317创建一个引入--axios
    import axios from 'axios'
    //0317引入对应的语言包----应用了vuex就会被取代
    //import common from '../../common/common.js'


    import './products.css'

    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'

    import router from '../../router/router.js'

    import spinner from '../spinner/spinner.vue'

    export default{
        //components:{
        //也就是说datagrid是products的子组件，也是说可以用prop传数据
            //datagrid
        //},
        
        data(){
            return {
                
                newpro:{
                    id: Number(''),
                    name:'',
                    //价格保存成数值类型:
                    price: Number(''),
                    details:'',
                    imgs:'',
                    color:'',
                    memory:'',
                    repertory:'',
                    type:''
                },
                // 0317加入字典对象
                dictionary: {},
                //lanType: 'en',最后会被vuex的$store.state.header.lanType所代替
                //
                //
                //
                //盛放后端请求过来的数据的容器dataset
                dataset: [] ,
                //动态生成产品类型--使用下拉框表单元素
                type: '' ,

                pageidx: 1 ,

                max: 0,

                optiontxt: '' ,

                //遮罩层开关--布尔值控制
                display: false ,

                //动态改变参数内容，根据需要加载内容config
                //这里的数据是传过去datagrid组件进行显示
                config:{
                    api:"http://localhost:8080/myproduct",
                    //默认查找全部信息                   
                    params:{},

                    cols:['id', 'name', 'price', 'details', 'imgs', 'color', 'memory', 'repertory', 'type']
                }
            }
        },
        //子组件中的子组件，记得不要少写“s”
        components: {
            spinner
        },

        methods:{
            createPro: function(){

                this.display = true;
                http.post("http://localhost:8080/addproduct", this.newpro ).then((res) => {
                    if(res.status){
                        this.display = false;
                        alert('添加商品信息成功');
                        location.reload();
                    }else{
                        this.display = false;
                        alert('添加商品信息不成功');
                    }                 
                });    
            },
            remove: function(obj){
                console.log(obj);
                //获取点击当前行的产品的唯一id：_id
                //console.log(obj._id);
                this.display = true;
                let currentid = obj._id;
                http.post("http://localhost:8080/delproduct", {currentid}).then((res) => {

                    if(res.status){
                        this.display = false;
                        alert('删除商品信息成功');
                        location.reload();
                    }else{
                        this.display = false;
                        alert('删除商品信息不成功');
                    }                 
                });   
            },
            change: function(type){
                console.log(type);
                this.display = true;
                http.post("http://localhost:8080/typequery",{type: this.type}).then((res) =>{
                    //console.log(res);
                    this.dataset = res.data.data;
                    this.display = false;
                })

            },
            //分页加载对应页码的数据
            pages: function(){
                http.post("http://localhost:8080/pageidx", {page: this.pageidx}).then((res)=>{
                    this.dataset = res.data.data;
                })
            },
            // 注意这里的发起的二次封装ajax函数跟其他不同---poststr
            fuzzycheck: function(){
                var option = this.optiontxt;
                http.poststr("http://localhost:8080/myfuzzy", option).then((res)=>{
                    console.log(res.data.data.length);

                    if(res.data.data.length > 0){
                         this.dataset = res.data.data;
                    }else{
                        alert("查找不到该商品！")
                    }                  
                })
            }
        },
        //发起ajax请求
        mounted(){
            let dktoken = window.localStorage.getItem('dktoken');

            if(!dktoken){
                router.push('/login');
            };
            //发起请求前为显示加载中
            this.display = true;

            // 0317在这里创建仅仅是为了获取字典翻译
            // 注意一下要将整一个网址输入到浏览器测试一下是否可以连接，下面的端口8899就是本Vue项目自己在package.json定义的端口，必须一致
            axios.get('http://localhost:8899/src/dictionary/common.txt').then((res)=>{
                //console.log(res);
                this.dictionary = res.data;
                //以上操作你就可以获取当前字典类型，但是这是静态的资源，您还需要实现动态资源切换才行
                //涉及到跨组件通信操作
            })
            

            http.post("http://localhost:8080/pageidx", {page: this.pageidx}).then((res)=>{
                //console.log(res);
                this.dataset = res.data.data;
                this.display = false;
            })  

            http.post("http://localhost:8080/myproduct", {}).then((result)=>{
                //console.log(result.data.data.length);//29
                //生成所有的产品数量的总页数max
                this.max = Math.ceil(result.data.data.length/5);
            })  
        }
    }
    
</script>