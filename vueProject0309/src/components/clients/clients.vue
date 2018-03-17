<template>
<div>
    <fieldset>
            <legend>
                Create New Person
            </legend>
            <div class="form-group">
                <label>username:</label>
                <input type="text" id="username" v-model="newperson.username"/>
            </div>
            <div class="form-group">
                <label>password:</label>
                <input type="password" id="password" v-model="newperson.pwd"/>
            </div>
            <div class="form-group">
                <label></label>
                <button  @click="createuser">Create</button>
            </div>
    </fieldset>

    <table class="table table-striped text-center" :config = "config">
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
                <td v-for="(val, key) in obj"  v-if="config.cols.indexOf(key) > -1">{{val}}</td>
                <td><input type="button" value="delete" @click="remove(obj)"/></td>
            </tr> 
        </tbody>
    </table>
    
</div>
</template>

<script>
    import './clients.css'
    //第二步，引入datagrid模块
    //请去设置app.js
    //import datagrid from '../datagrid/datagrid.vue'
    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'

    import router from '../../router/router.js'

    export default{

        data(){
            return {
                newperson:{
                    username:'',
                    pwd:''
                },

                dataset:[],

                config:{
                    api:"http://localhost:8080/showusers",
                    params: {},
                    cols:['username', 'pwd']
                }
            }
        },
        methods:{
            createuser: function(){
                http.post("http://localhost:8080/adduser", this.newperson ).then((res) => {
                    if(res.status){
                        alert('添加用户信息成功');
                        location.reload();
                    }else{
                        alert('添加用户信息不成功');
                    }                 
                })
            },
            remove: function(obj){
                console.log(obj);
                //获取点击当前行的产品的唯一id：_id
                //console.log(obj._id);
                let currentid = obj._id;
                http.post("http://localhost:8080/deluser", {currentid}).then((res) => {
                    if(res.status){
                        alert('删除用户信息成功');
                        location.reload();
                    }else{
                       alert('删除用户信息不成功');
                    }                 
                });   
            }
        },

        //发起ajax请求---一旦页面加载就获取最新的用户数据
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

            http.post(this.config.api, this.config.params || {}).then((res) => {
                this.dataset = res.data.data;
                this.show = false;
            })          
        }
    }
</script>