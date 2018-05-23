// 将moduleA 从subpageA和subpageB中提取出来
require.include('./moduleA')

// 将subPageA 和 subPageB单独分离出来 但两个里面都有moduleA
if(page === 'subpageA'){
    require.ensure(['./subPageA'],function(){
        var subpageA=require('./subPageA')
    },'subPageA')
}else if(page === 'subpageB'){
    require.ensure(['./subPageB'],function(){
        var subpageB=require('./subPageB')
    },'subPageB')
}
// import './subPageA'
// import './subPageB'
// import * as _ from 'lodash'

// 代码分割 将第三方依赖分离了出来
require.ensure(['lodash'],function(){
    var _ = require('lodash')
    _.join(['1','2'],'3')
},'vender')
export default 'pageA'