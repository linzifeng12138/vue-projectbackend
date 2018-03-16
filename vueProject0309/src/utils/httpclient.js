//生成路径的优化代码
//




//axios的二次封装
//注意记得npm install axios --save -dev第三方插件
import axios from 'axios'
import router from '../router/router.js'

//定义一个基础默认---实质上这里就是默认的端口地址api
const baseUrl = 'http://localhost:8080';
// 注意不要多加一个“/”


export default {
    get(_url, _params){
        var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                params: _params || {},
                headers: {authorization: window.localStorage.getItem('dktoken')}
            }).then(res => {
                // if(!res.data.status && res.data.error == "unauthorized"){
                //     router.push('login');
                //     return false;
                // }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },


    post(_url, _params){
        var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: 'post',
                data: _params || {},
                //目的是设置符合post请求的请求头

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    authorization: window.localStorage.getItem('dktoken')
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }], 
            }).then(res => {
                // if(!res.data.status && res.data.error == "unauthorized"){
                //     router.push('login');
                //     console.log(res);
                //     return false;
                // }               
                resolve(res)
            }).catch(error => {
                
                reject(error)
            })
        })
    },
    
    //我的自制模糊搜索发起ajax请求的专属
    poststr(_url, _params){
        var url = _url && _url.startsWith('http') ? _url : `${baseUrl}/${_url}`;
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: 'post',
                data: _params || {},

                //目的是设置符合post请求的请求头
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    authorization: window.localStorage.getItem('dktoken')
                }
            }).then(res => {

                resolve(res)
            }).catch(error => {
                
                reject(error)
            })
        })
    }
}