<template>
    <table class="table table-striped text-center" :config="config">
        <thead>
            <tr>
                <th v-for="(val, key) in dataset[0]" v-if="config.cols.indexOf(key) > -1">
                    {{key}}
                </th>
                <th></th>
                
            </tr>
        </thead>
        <tbody>
            <tr v-for="(obj, idx) in dataset">
                <td v-for="(val, key) in obj"  v-if="config.cols.indexOf(key) > -1"> 
                    {{val}}
                </td>   
                <td><input type="button" value="delete" @click="remove(obj)"/></td>      
                
            </tr> 
        </tbody>
    </table>
</template>

<script>

    import common from '../../common/common.js'
    import './orders.css'

    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'
    //路由跳转文件
    import router from '../../router/router.js'

    export default{
        data(){
            return {
                dataset: [],
                //imgurl:"http://"+"i1.mifile.cn/a1/pms_1509723338.05097112!220x220.jpg",
                //动态改变参数内容，根据需要加载内容config
                //这里的数据是传过去datagrid组件进行显示
                config:{
                    api:"http://localhost:8080/getorders",
                    //默认查找全部信息                   
                    params:{},

                    cols:['orderno', 'total', 'status', 'products'],

                    cols2 :['imgs']
                }
            }
        },
        methods:{
             remove: function(obj){
                console.log(obj);
                //获取点击当前行的产品的唯一id：_id
                //console.log(obj._id);
                this.display = true;
                let currentid = obj._id;
                http.post("http://localhost:8080/delorders", {currentid}).then((res) => {

                    if(res.status){
                        this.display = false;
                        alert('删除商品信息成功');
                        location.reload();
                    }else{
                        this.display = false;
                        alert('删除商品信息不成功');
                    }                 
                });   
            }
        },
        //发起ajax请求
        mounted(){
            let dktoken = window.localStorage.getItem('dktoken');

            if(!dktoken){
                router.push('/login');
            };


            //发起请求前为显示加载中
            this.show = true;
            //加载静态资源dictionary文件
            //http.get('http://localhost:88/src/dictionary/common.txt').then((res)=>{
                //console.log(res);
                //this.dictionary = res.data;
            //})

            //console.log(this.config.api);

            http.post("http://localhost:8080/getorders", {}).then((res) => {
                console.log(res.data.data);
                this.dataset = res.data.data;
                this.show = false;

            })          
        }
    }

</script>