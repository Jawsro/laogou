const PENDING = 'pending'; //等待
const FULFILLED = 'fulfilled';//成功
const REJECTED = 'rejected';//失败

class MyPromise{
  constructor(executor){
    try{
      executor(this.resolve,this.reject)
    }catch(e){
      this.reject(e)
    }
    
  }
  //Promise状态
  status = PENDING;
  //成功之后的值
  value = undefined;
  //失败的原因
  reason = undefined;
  sucessCallback= [];
  failCallback = [];
  resolve = value => {//使用箭头函数就是海边this的指向，指向该类MyPromise
    //如果状态不是等待，组织程序向下执行
    if(this.status != PENDING) return;
    //改变Promise状态为成功
    this.status = FULFILLED;
    //保存成功之后的值
    this.value = value;
    //判断成功回调是否存在，如果存在，调用
    // this.sucessCallback &&this.sucessCallback(this.value)
    while(this.sucessCallback.length) this.sucessCallback.shift() ()
   
  }
  reject = reason => {
    if(this.status != PENDING) return;
      //改变Promise状态为失败
      this.status = REJECTED;
      //保存失败的原因
      this.reason = reason
      //判断失败回调是否存在，如果存在，调用
      while(this.failCallback.length) this.failCallback.shift() ()
  }
  then (sucessCallback,failCallback){
    sucessCallback = sucessCallback ? sucessCallback : value => value;
     failCallback = failCallback ? failCallback : reason => reason;
    let promise2 = new MyPromise((resolve,reject) =>{
       //判断状态
      if(this.status === FULFILLED){
        try{
          setTimeout(()=>{//setTimeout是为了把下面的两行代码变成异步代码，用来获取 promise2.异步代码会在同步代码执行完之后在执行
            //为了让then被链式调用
            //判断x的值是普通纸还是promise对象
            //如果是普通值 直接调用resolve
            //如果是promise对象 查看promise对对象返回的结果
            //再根据promise对象返回的结果决定调用resolve还是调用reject
            let x = sucessCallback(this.value);
            resolvePromise(promise2,x,resolve,reject)
          },0)
        }catch(e){
          reject(e)
        }
        
      }else if(this.status === REJECTED){
        try{
          setTimeout(()=>{//setTimeout是为了把下面的两行代码变成异步代码，用来获取 promise2.异步代码会在同步代码执行完之后在执行
            //为了让then被链式调用
            //判断x的值是普通纸还是promise对象
            //如果是普通值 直接调用resolve
            //如果是promise对象 查看promise对对象返回的结果
            //再根据promise对象返回的结果决定调用resolve还是调用reject
            let x = failCallback(this.reason);
            resolvePromise(promise2,x,resolve,reject)
          },0)
        }catch(e){
          reject(e)
        }
        
      }else{
        //成功回调和失败回调存储起来
        this.sucessCallback.push(()=>{
           try{
            setTimeout(()=>{//setTimeout是为了把下面的两行代码变成异步代码，用来获取 promise2.异步代码会在同步代码执行完之后在执行
              //为了让then被链式调用
              //判断x的值是普通纸还是promise对象
              //如果是普通值 直接调用resolve
              //如果是promise对象 查看promise对对象返回的结果
              //再根据promise对象返回的结果决定调用resolve还是调用reject
              let x = sucessCallback(this.value);
              resolvePromise(promise2,x,resolve,reject)
            },0)
          }catch(e){
            reject(e)
          }
        }) ;
        this.failCallback.push(()=>{
          try{
            setTimeout(()=>{//setTimeout是为了把下面的两行代码变成异步代码，用来获取 promise2.异步代码会在同步代码执行完之后在执行
              //为了让then被链式调用
              //判断x的值是普通纸还是promise对象
              //如果是普通值 直接调用resolve
              //如果是promise对象 查看promise对对象返回的结果
              //再根据promise对象返回的结果决定调用resolve还是调用reject
              let x = failCallback(this.reason);
              resolvePromise(promise2,x,resolve,reject)
            },0)
          }catch(e){
            reject(e)
          }
        }) ;
      }
    });
   
    return promise2;
  }
  finally (callback) {
    return this.then( value =>{
      return MyPromise.resolve(callback()).then(() => value);
    },reason =>{
      return MyPromise.resolve(callback()).then(() => {throw reason});
    })
  }
  catch(failCallback){
    return this.then(undefined,failCallback)
  }
  //static 声明all是一个静态方法
  static all (array) {
    let result = [];
    let index = 0;
    
    return new MyPromise( (resolve,reject) => {
      function addData (key ,value){
        result[key] = value;
        index ++;
        if(index === array.length){
          resolve(result);
        }
      }
      for(let i = 0; i< array.length;i++){
        let current = array[i];
        if(current instanceof MyPromise){
          //promise 对象
          current.then(valuv => addData(i,value),reason => reject(reason))
        }else{
          //普通值
          addData(i,array[i])
        }
      }
    })
  }
  static resolve(value){
    if(value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value))
  }
}

function resolvePromise (promise2,x,resolve,reject) {
  if(promise2 === x){
    return reject (new TypeError('Chaining cycyle detxcted for promise #<promise>'))
  }
  if(x instanceof MyPromise){
    //x是promise对象
    x.then(resolve,reject)
  }else{
    //x是普通值
    resolve(x)
  }
}
module.exports = MyPromise;