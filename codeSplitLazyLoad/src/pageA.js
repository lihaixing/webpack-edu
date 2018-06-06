// import './subPageA'
// import './subPageB'
import * as _ from 'lodash'

// 将moduleA 从subpageA和subpageB中提取出来,放到pageA中
// require.include('./moduleA')
var page = 'subpageA'
// 将subPageA 和 subPageB单独分离出来 但两个里面都有moduleA
if(page === 'subpageA'){
    // 预加载
    require.ensure(['./subPageA'],function(){
        // 执行
        var subpageA=require('./subPageA')
    },'subPageA')
}else if(page === 'subpageD'){
    // require.ensure(['./subPageB'],function(){
    //     var subpageB=require('./subPageB')
    // },'subPageB')

    // import不仅加载还执行（动态）; 运用魔法注释为打包起名; 如果subpageA和subpageB打包名字相同，会打包到一个文件中
    import(/* webpackChunkName:'subPageB' */'./subPageB').then(function (subPageB) {
        console.log(subPageB)
    })
}

// 代码分割 将第三方依赖分离了出来 这是异步
// require.ensure(['lodash'],function(){
//     var _ = require('lodash')
//     _.join(['1','2'],'3')
// },'vender')
export default 'pageA'