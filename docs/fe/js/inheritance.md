## 继承方法
上一篇文章中讨论了原型和原型链，这篇文章主要是来讲一下原型相关的继承。

### 原型链继承
对象可以通过原型链来继承原型的方法和属性。原型链继承本质：**重写原型对象，代之以一个新类型的实例**。 
```
function Animal(type) {
    this.name = 'animal'            // 跟子类的属性重名，只能通过 __proto__ 访问
    this.childs = ['dog']
    this.type = type
}

Animal.prototype.run = function (){
	console.log(this.type + ' can run')
}

function Dog(name, characteristic) {
  this.name = name
  this.characteristic = characteristic
}

Dog.prototype = new Animal('Dog')   // 关键，重写原型对象
Dog.prototype.constructor = Dog     // 第一点，需要手动重写 constructor 指向
Dog.prototype.swim = function(){    // 第二点，子类添加属性和方法需要在替换原型之后
	console.log(this.name + ' can swim')
}

var erha = new Dog('erha', 'fool')  // 第四点，无法向父类型的构造函数传参
erha.childs.push('cat')             // 第三点，对于引用类型的修改
console.log(erha.childs)            // ["dog", "cat"]
var teddy = new Dog('teddy', 'cute')
console.log(teddy.childs)           // ["dog", "cat"]

```
从上面的例子可以看出，原型链继承有以下几个缺点：  
  - 需要手动重写 `constructor` 属性
  - 子类添加属性和方法必须要在替换原型之后
  - 创建子类实例时无法向父类的构造函数传参
  - 最致命的一点是，某个实例对于原型上引用类型的数据进行修改会影响其他的实例
  - 存在属性遮蔽，如果子类的属性、方法跟父类命名一样，父类的属性或者方法只能通过 `__proto__` 来获取。

### 借用构造函数继承
使用**父类的构造函数**来增强子类实例，等同于复制父类的实例给子类(不使用原型)。
```
function Animal(type) {
    this.name = 'animal'
    this.childs = ['dog']
    this.type = type
}

Animal.prototype.run = function (){
	console.log(this.type + ' can run')
}

function Dog(type, name, characteristic) {
  this.name = name
  this.characteristic = characteristic
  Animal.call(this, type)    // 这里是关键，调用父类的构造函数
}

var erha = new Dog('dog', 'erha', 'fool')
var teddy = new Dog('dog', 'teddy', 'cute')
erha.childs = ['cat']
console.log(erha.run)      // undefined
console.log(teddy.childs)  // ['dog']
```
从上面的例子可以看出
  - 子类只能继承父类的实例方法和属性，无法继承原型的方法和属性
  - 虽然解决了上面原型链继承对于引用类型修改会出现纂改的问题，但是无法实现复用，每个子类都有父类实例函数的副本，影响性能

### 组合继承
用**原型链**来继承原型的方法和属性，用**借用构造函数**来实现实例属性的继承。
```
function Animal(type) {
  this.type = type
  this.list = [1,2]
  this.id = 1
}

Animal.prototype.name = 'animal'
Animal.prototype.run = function (){
	console.log(this.type + ' can run')
}

function Dog(type, name, characteristic) {
  this.name = name
  this.characteristic = characteristic
  Animal.call(this, type)   // 实例属性和方法继承
}

Dog.prototype = new Animal() //原型属性和方法继承
Dog.prototype.constructor = Dog
Dog.prototype.swim = function() {
	return 'swim'
}

var erha = new Dog('dog', 'erha', 'fool')
var teddy = new Dog('dog', 'teddy', 'cute')
erha.run() //dog can run
erha.list.push(3)
erha.list   // [1,2,3]
teddy.list  // [1,2]
```
虽然目前可以复用原型链上的方法以及子类又有各自的属性，但是有个问题就是，父类的构造函数调用了两次，子类的原型(Dog.prototype)上也有一份父类实例属性的副本，而且这些属性会被子类实例(erha, teddy)的属性覆盖，即通过 erha.name 访问不到 Dog.prototype 的 name 属性，还是存在内存浪费。

### 原型式继承
该方法最初由道格拉斯·克罗克福德于2006年在一篇题为 《Prototypal Inheritance in JavaScript》(JavaScript中的原型式继承) 的文章中提出。 他的想法是借助原型可以基于已有的对象创建新对象， 同时还不必因此创建自定义类型。

```
function createObject(obj){
  function F(){}
  F.prototype = obj
  return new F()
}

// 自定义对象作为原型
var person = {
  name: 'user name',
  friends: []
}

var p1 = createObject(person)
p1.name = 'xiaoming'
p1.idol = ['lee']
p1.friends.push('xiaofeng')
console.log(p1.friends) // ["xiaofeng"]

var p2 = createObject(person)
p2.name = 'xiaoqing'
p2.idol = ['vim']
p2.friends.push('xiaomin')

console.log(p1.friends) // ["xiaofeng", "xiaomin"]
console.log(p2.friends) // ["xiaofeng", "xiaomin"]
```
先看 createObject 函数，先是定义一个临时的构造函数 F()，把作为“原型”的对象 person 赋值给 F.prototype，接着返回 `new F()`，因为构造函数没有定义任何属性，所以返回一个空对象，这个对象的 `__proto__` 则指向“原型”对象，从而继承了“原型”对象 person 的属性。  
从上面的列子可以看出，就是对于原型的引用类型进行修改会出现篡改的情况。  
在 ECMAScript5 中，通过新增 Object.create() 方法规范化了上面的原型式继承。  
用法：Object.create(proto[, propertiesObject])
  - 新创建对象的原型对象。
  - 可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。  
```
// 自定义对象作为原型
var person = {
  name: 'user name',
  friends: []
}
var p1 = Object.create(person)
```
### 寄生式继承
寄生式继承是与原型式继承紧密相关的一种思路， 同样是克罗克福德推而广之。  
寄生式继承，即创建一个仅用于封装继承过程的函数，该函数内部以某种方法来增强对象，最后再像真的对它做了所有操作之后返回对象。
```
function createAnother(original){
  var clone = Object.create(original)  // 调用 Object.create 函数创建一个对象
  clone.sayHi = function() {  // 以某种方法来增强对象
    console.log('hi')
  }

  return clone   // 返回这个对象
}

var person = {
  name: 'user name',
  friends: []
}
```
### 寄生式组合继承
结合借用构造函数**传递参数**和寄生模式实现继承。
```
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype) // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype                      // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function(){
  alert(this.name)
}


function SubType(name, age){
  SuperType.call(this, name)    // 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
  this.age = age
}

// 将子类原型指向父类
inheritPrototype(SubType, SuperType)

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age)
}

var instance1 = new SubType('xyc', 23)
var instance2 = new SubType('lxy', 23)

instance1.colors.push('2') // ["red", "blue", "green", "2"]
instance2.colors.push('3') // ["red", "blue", "green", "3"]
```
