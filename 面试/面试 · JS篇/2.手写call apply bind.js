// call
// 改变this的指向，...rest参数
Function.prototype.myCall = function () {
  if (typeof this !== "function") {
    throw new Error("this is not a function");
  }
  let [context, ...args] = [...arguments];
  if (!context) {
    //不传或者传null undefined都指向window
    context = typeof window === "undefined" ? global : window; //严格模式
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// apply
// 和call的参数处理不同，第二个参数是一个[]
Function.prototype.myApply = function () {
  if (typeof this !== "function") {
    throw new Error("this is not a function");
  }
  let [context, args] = [...arguments];
  if (!context) {
    //不传或者传null undefined都指向window
    context = typeof window === "undefined" ? global : window; //严格模式
  }
  context.fn = this;
  const result = args ? context.fn(...args) : context.fn();
  delete context.fn;
  return result;
};

// bind
// bind返回一个改变了this指向的func
Function.prototype.myBind = function () {
  if (typeof this !== "function") {
    throw new Error("this is not a function");
  }
  let [context, ...args] = [...arguments];
  if (!context) {
    context = typeof window === "undefined" ? global : window;
  }
  let func = this;
  // 利用闭包保存一下this
  return function newFunc() {
    //如果bind绑定后的函数被new运算符调用，this指向当前构造函数的实例，new的优先级高于bind
    if (this instanceof newFunc) {
      return new func(...args);
    }
    return func.call(context, ...args);
  };
};
