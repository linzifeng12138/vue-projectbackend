//0317为了使用vuex实行的第二步：前提环境配置，引入Vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'


// 将需要整合信息的模块先引入进来
import header from '../components/header/header.js'

// import common from '../common/common.js'


// 告诉电脑使用vuex规则
Vue.use(Vuex)

// 实例化--并将上面的模块写入---这样子系统就会帮我们把里面的数据对象整合
const store = new Vuex.Store({
    modules: {
        header
    }
})

export default store;