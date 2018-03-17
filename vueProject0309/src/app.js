
//引入全局样式css
import './common/common.css'



// 设置入口，第一步，开端
import Vue from 'vue';

// 渲染root组件
// root组件作用
// 把app.vue 的组件引入进来

import appComponent from './components/app/app.vue'

// 0317使用vuex的第三步：引入store文件
import store from './vuex/store.js'


import router from './router/router.js';
//至此，框架已经建好，您只需在components里面疯狂写组件即可

// 0317接下来还要把模块输出--vuex第四步
new Vue({
    el:'#app',
    router, 
    store,
    render: h => h(appComponent)
    //render就是自动将home.vue 的内容渲染到index页面
    // 注意router-view标签要放在根vue才能渲染到index页面
})