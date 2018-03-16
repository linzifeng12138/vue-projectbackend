<template>
    <div>
        <ul class="list-group">        
            <router-link to="/products" class="list-group-item">产品管理</router-link>
        
            <router-link to="/clients"  class="list-group-item">客户管理</router-link>
            
            <router-link to="/orders"  class="list-group-item">购物车管理</router-link>
            <router-link to="/prolist"  class="list-group-item">商品列表</router-link>         
        </ul>    
    </div>
</template>

<script>
    import common from '../../common/common.js'
    import './nav.css'
    export default{
        data(){
            return {
                showCommentInput: false
            }
        }
    }
</script>