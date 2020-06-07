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

// 应用
function isType(data, type) {
  const typeObj = {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Function]": "function",
    "[object Date]": "date", // Object.prototype.toString.call(new Date())
    "[object RegExp]": "regExp",
    "[object Map]": "map",
    "[object Set]": "set",
    "[object HTMLDivElement]": "dom", // document.querySelector('#app')
    "[object WeakMap]": "weakMap",
    "[object Window]": "window", // Object.prototype.toString.call(window)
    "[object Error]": "error", // new Error('1')
    "[object Arguments]": "arguments",
  };
  let name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || "未知类型"; // 匹配数据类型
  return typeName === type; // 判断该数据类型是否为传入的类型
}
