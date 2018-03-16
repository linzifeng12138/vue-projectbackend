<template>
<div>
    <fieldset class="lzf_fieldset">
            <legend class="lzf_legend">
                后台管理人员登录
            </legend>
            <div class="form-group">
                <label>username:</label>
                <input type="text" id="username" v-model="username"/>
            </div>
            <div class="form-group">
                <label>password:</label>
                <input type="password" id="pwd" v-model="pwd"/>
            </div>
            <div class="form-group">
                <label></label>
                <button  @click="login">login</button>
            </div>
    </fieldset>
</div>
</template>

<script>
    import './login.css'
    import common from '../../common/common.js'
    //第二步，引入datagrid模块
    //请去设置app.js
    //import datagrid from '../datagrid/datagrid.vue'
    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'

    import router from '../../router/router.js'

    export default{

        data(){
            return {
                username:'',
                pwd:''
            }
        },
        methods:{
            login: function(){
                http.post("http://localhost:8080/adminlogin", {username:this.username, pwd:this.pwd} ).then((res) => {
                    console.log(res);
                    if(res.data.status){
                        //console.log(res.data.data);
                        alert('登录成功');
                        //这一步是把token变成json字符串并存入localStorage里面目的是给其他页面判断是否登录状态
                        window.localStorage.setItem('dktoken', JSON.stringify(res.data.data));
                        router.push({name:'home'});
                    }else{
                        alert('登录不成功');
                    }                 
                })
            }
        }
    }
</script>