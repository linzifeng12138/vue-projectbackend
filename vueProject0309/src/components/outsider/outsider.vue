

addOrder(val){
    this.clicknum=1;
    this.orderlist.push({name:val.name,qty:val.qty,des:val.des,price:val.price,status:0});
    console.log(this.orderlist)
},
gotoOrder(val){
    this.clicknum=1;
    var cookies = document.cookie.substring(9);
    var username = cookies;
    // console.log({username:username,data:JSON.stringify(this.orderlist)});
    axios.post('http://10.3.136.68:8083/apporder',{username:username,data:JSON.stringify(this.orderlist)}).then((res)=>{
            console.log(res);
    })        
}
