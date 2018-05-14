// es6
import sum from './sum';
// common.js
var minus = require('./minus');
// amd 异步加载，会生成两个bundle.js/0.bundle.js
require(['./muti'],function(muti){
    console.log('muti(2,3)=',muti(2,3));
});
console.log('sum(23,24)=',sum(23,24));
console.log('minus(24,17)=',minus(24,17));