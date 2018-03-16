<template>
    <div>
        <ul class="ul">
            <li v-for="(obj, idx) in dataset" class="li">
                <div v-for="(value, key) in obj">
                    <span class="name" v-if="key == 'name'">{{value}}</span>
                    <span class="price" v-else-if="key == 'price'">{{value}}</span>
                    
                    <span class="imgs" v-else-if="key == 'imgs'">
                        <img :src = value>
                    </span>  
                    <span class="color" v-else-if="key == 'color'">{{value}}</span>
                    <span class="memory" v-else-if="key == 'memory'">{{value}}</span>
                    <span class="repertory" v-else-if="key == 'repertory'">{{value}}</span>
                    <span class="type" v-else-if="key == 'type'">{{value}}</span>                 
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import '../../common/common.css'
    import './prolist.css'
    //axios的ajax请求的二次封装httpclient
    import http from '../../utils/httpclient.js'

    import router from '../../router/router.js'

    export default{
        data(){
            return {
                //盛放后端请求过来的数据的容器dataset
                dataset: []
            }
        },

        methods:{

        },

        mounted(){
            http.post("http://localhost:8080/myproduct",{}).then((res)=>{
                console.log(res);
                this.dataset = res.data.data;
            })
        }
    }

</script>