import './subPageA'
import './subPageB'

// 动态import
import(/* webpackChunkName:'async' */'./async').then(function (a) {
    console.log(a + '11')
})
import * as _ from 'lodash'
console.log(1)
export default 'pageA'
