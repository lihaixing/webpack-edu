// import './css/base.css'
// import './css/common.css'

// 同步
// import './b'

// 异步
import(/* webpackChunkName:'b'*/'./b').then(function(b){
    console.log(b)
})
import base from './css/base.css'
import common from './css/common.css'
import main from './less/main.less'

// var flag =0;
// setInterval(function(){
//     if(flag){
//         base.unuse();
//     }else{
//         base.use()
//     }
//     flag = !flag;
// },500);

// css模块化
var module = document.getElementById('module');
module.innerHTML = '<div class="' + base.box + '">你呀你</div>';