//模块化路由
//以路由router.js作为中继站，设置的组件的路劲？投射到app.js，
//因为app.js才是真正的投射HTML的端口

// 设置入口，第一步，开端
import Vue from 'vue';
//加载组件路由模块
//记得去安装 npm install vue-router --save -dev
import VueRouter from 'vue-router';
//路由：1、vue实例化
// 要告诉 vue 使用 vueRouter--全局作用过滤器
Vue.use(VueRouter)


// 把组件引入进来
import loginComponent from '../components/login/login.vue'

import HomeComponent from '../components/home/home.vue'
import NavComponent from '../components/nav/nav.vue'
import HeaderComponent from '../components/header/header.vue'
import ContainerComponent from '../components/container/container.vue'

// ContainerComponent的自组件
import productsComponent from '../components/products/products.vue'
import clientsComponent from '../components/clients/clients.vue'
import ordersComponent from '../components/orders/orders.vue'
import prolistComponent from '../components/prolist/prolist.vue'


const router = new VueRouter({
    routes:[
        {
            path:'/',
            component: HomeComponent,
            children:[
                {
                    path:'home',
                    name:'home',
                    components:{
                        default: ContainerComponent,
                        nav: NavComponent,
                        header: HeaderComponent
                    }
                },
                {
                    path:'products',
                    name:'products',
                    component:productsComponent
                },
                {
                    path:'clients',
                    name:'clients',
                    component:clientsComponent
                },
                {
                    path:'orders',
                    name:'orders',
                    component:ordersComponent
                },
                {
                    path:'prolist',
                    name: 'prolist',
                    component: prolistComponent
                }        
            ]
        },
        {
            path:'/login', 
            component:loginComponent
        }    
    ]
})

// 模块化输出
export default router;