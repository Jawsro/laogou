//一、将下边异步代码使用Promise方法改进
setTimeout(function(){
  var a = 'hello'
  setTimeout(function(){
    var b ='lagou'
    setTimeout(function(){
      var c = ' I ❤ U'
     console.log(a+b+c)
    },10)
  },10)
},10)

//答：
let r = new Promise((resolve,reject) => {
  setTimeout(()=>{
    resolve('hello')
  },10)
})

r.then(value=>{
  var b ='lagou'
  return value + b
}).then(value=>{
    var c = ' I ❤ U'
   return value + c
}).then(value=>{
  console.log(value)
})
/**
 * 基于以下代码完成下面四个练习
 */
const fp = require('lodash/fp');
const cars = [
  {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
  {name:'Spyker C12ZAgato',horsepower:650,dollar_value:648000,in_stock:false},
  {name:'Jaguar XKR-S',horsepower:550,dollar_value:132000,in_stock:false},
  {name:'Audi r8',horsepower:525,dollar_value:114200,in_stock:false},
  {name:'Astin Martin One-77',horsepower:750,dollar_value:1850000,in_stock:true},
]
//一、使用函数组合fp.flowRight()重新实现下面的函数
/**
 * 
let isLaskInStock = function (cars){
    let last_car = fp.last(cars)
    return fp.prop('in_stock',last_car)
}
 */
//答：
let isLastInStock =fp.flowRight(fp.prop('in_stock'),fp.last)
console.log(isLastInStock(cars));

//二、使用函数组合fp.flowRight()、fp.prop()和fp.first()获取第一个car的name

let isFirstInStock =fp.flowRight(fp.prop('name'),fp.first);
console.log(isFirstInStock(cars));
/**
 * 三、使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
 */
let  _average = function (xs){
    return fp.reduce(fp.add,0,xs) / xs.length
} // 无需改动

/**
 * 
 let averageDollarValue = function(cars){
    let dollar_values = fp.map(function(car){
        return car.dollar_value
    },cars)
    console.log(dollar_values)
    return _average(dollar_values)
}
 */

let averageDollarValue = fp.flowRight(_average,fp.map(car => car.dollar_value ))
let a = averageDollarValue(cars)
console.log(a)
/**
 * 四、使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式，
 * 例如：sanitizeNames([‘Hello World’]) => [‘hello_world’]
*/
let _underscore = fp.replace(/\W+/g,"_")
let sanitizeNames = fp.flowRight(_underscore,fp.toLower)
console.log(sanitizeNames(['Hello World']))

/**
 * 基于下面提供的代码，完成后续的四个练习
 */
class Container{
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}

class MayBe{
    static of(x){
        return new MayBe(x)
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
    constructor(x){
        this._value = x
    }
    map(fn){
        return this.isNothing() ? this:MayBe.of(fn(this._value))
    }
}

/**
 * 1、使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
 */
let maybe = MayBe.of([5,6,1])
let ex1 = (num) =>{
      //补充
      let fn = fp.flowRight(fp.map(fp.add(num)))
      return maybe.map(fn)
}
console.log(ex1(3)._value)
/**
 * 2、实现一个函数ex2，能够使用fp.first获取列表的第一个元素
 */
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = () => {
    //要实现的函数
    return xs.map(fp.first)._value
}
console.log(ex2())
/**
 * 3、实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
 */
let safeProp = fp.curry(function(x,o){
  return MayBe.of(o[x])
})
let user = {id:2,name:'Albert'};
let ex3 = (name) =>{
  return safeProp('name',user).map(fp.first)._value
}
console.log(ex3())
/**
 * 4、使用MayBe重写ex4，不要有if语句
 */
let ex4 = function(n){
  // if(n){
  //   return parseInt(n)
  // }
  //实现
  return MayBe.of(n).map(parseInt)._value
}
console.log(ex4(9.8))