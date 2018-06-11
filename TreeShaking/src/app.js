import base from './css/base.css'
import common from './css/common.css'
import main from './less/main.less'
import { apple } from './js/util'
// lodash写的方法是一个整体函数，不是通过import方法写的，treeShaking没起作用
import { chunk } from 'babel-plugin-lodash'

console.log(apple())

console.log(chunk([1, 2, 3, 4, 5, 6], 2))