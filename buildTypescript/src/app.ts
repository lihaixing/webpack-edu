import * as _ from 'lodash'
console.log(_.chunk([1,2,3,4,5],2))
const Num =45;
interface Cat{
    name:String,
    gender:String
}
function touchCat(cat:Cat){
    console.log('miao~',cat.name)
}
touchCat({
    name:'Tom',
    gender:'male'
})