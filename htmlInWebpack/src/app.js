import './css/base.css'
import './css/common.css'
import './less/main.less'
import { a } from './js/util'
// 其实不需要，只是eslint会报错
// import $ from 'jquery'

console.log(a())

$('.imgWrapper').css({
    'background': 'blue'
})

$.get('/api/newxhtiao', {
    pid: 'hao123-index',
    callback: 'getXhtData',
    c: '97062DC29409D85650F7507C9AE27198',
    sys: 5,
    brw: 1,
    edt: 0,
    _: 1529314468694
}, function (data) {
    console.log(data)
    console.log(5)
})

$.get('/aj/account/watermark', {
    ajwvr: 6,
    _t: 0,
    __rnd: 1529315849867
}, function (data) {
    console.log(data)
})

// 热更新代码  一般不需要 vue-loader等各种loader会帮我们做
if (module.hot) {
    module.hot.accept()
}