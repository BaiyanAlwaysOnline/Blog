//继承有几种方式：  (万变不离其宗：继承的本质就是原型链)
// 父类
function Parent() {
  this.name = '想进大厂的第N天'
}
// 父类的原型方法
Parent.prototype.getName = function() {
  return this.name
}
// 子类
function Child() {}



//1.原型链继承
Child.prototype = new Parent()  //等价于 (new Child()).__proto__ = new Parent()
Child.prototype.constructor = Child 
//缺点：Child 的所有实例，修改一个的属性，其他的也会改变。

//2.构造函数继承
function Child() {
  Parent.call(this)
}
//缺点：无法继承到Parent原型上的属性或者方法。

//3.组合式继承
function Child() {
  // 构造函数继承
  Parent.call(this) 
}
//原型链继承
Child.prototype = new Parent()
Child.prototype.constructor = Child
// 缺点：每次创建子类实例都执行了两次构造函数(Parent.call()和new Parent())，并不优雅。


//4.组合式继承优化 - 寄生组合式继承
function Child() {
  // 构造函数继承
  Parent.call(this) 
}
Child.prototype = Object.create(Parent.prototype) //创建了一个空对象 __proto__为
Child.prototype.constructor = Child //空对象补充constructor属性 值为Child




