<template>
    <div class="header_lzf">
        <select v-model="$store.state.header.lanType" class="form-control form-control-sm lanchange">        
            <option value="en">en</option>
            <option value="cn">cn</option>
        </select>
        <span>{{$store.state.header.lanType}}</span>
    </div>
</template>

<script>
    //0317引入common 的js文件---应用了Vuex就会被取代放弃
    // import common from '../../common/common.js'


    import './header.css'

    export default{
        //0317绑定输出语言类型---应用了vuex之后就会被代替
         // data(){
         //    return {
         //         lanType: common.lanType          
         //     }
         // },
         mounted(){
            console.log(this);
            //0317vuex 的第五步：vueconponent对象
            // 查看$store下面的state的common和header，发现里面已经传过来了header的语言类型
            console.log(this.$store.state);
            console.log(this.$store.state.header.lanType);
         }  
        
    }
</script>

<style type="text/css">
    .header_lzf{width:100%;height:100%;background:#efefef;}
    .lanchange{width:60px;height:100%;}
</style>