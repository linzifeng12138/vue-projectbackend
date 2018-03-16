<template>
    <div>
        <div class="header">
            <dkheader></dkheader>
        </div>
        <div class="body">
            <dknav></dknav>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../../router/router.js'
    
    import common from '../../common/common.js'
    import './home.css'
    import dknav from '../nav/nav.vue'
    import dkheader from '../header/header.vue'
    //把nav和header两个组件引入进来，并特定化两个对应的标签
    //目的是为了显示两处指定内容到里面
    export default{
        components:{
            dknav:dknav,
            dkheader:dkheader
        },
        mounted(){
            let dktoken = window.localStorage.getItem('dktoken');

            if(!dktoken){
                router.push('/login');
            }
        }
    }

</script>