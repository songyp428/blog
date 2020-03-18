### 原型和原型链
- 什么是原型？
- 原型链是什么？
- 如何实现原型链？

#### 构造函数
构造函数: 使用 new 调用生成实例的函数。可以使用构造函数创建对象。
```js
function Idol(name) {
    this.name = name
}

var lee = new Idol('lee')
```

#### 原型
每一个函数都有 `prototype` 属性，函数的 `prototype` 指向一个对象。这个对象就是调用该构造函数创建的实例的原型。
```js
function Idol(name) {
    this.name = name
}

Idol.prototype.type = 'idol'
Idol.prototype.skill = function () {
    console.log('帅')
}

var lee = new Idol('lee')
var vim = new Idol('vim')
```
从上面的例子看，Idol.prototype 就是实例 lee 和 vim 的原型。  
那么原型到底是什么呢？每一个 JavaScript 对象（null 除外）在创建的时候就会与之关联另外一个对象，这个与之关联的对象就是原型。每一个对象从原型中“继承”属性。  

那么它们到底怎么关联的呢？

####  `__proto__`
每一个 JavaScript 对象（null 除外）都具有一个属性 `__proto__`, 这个属性指向对象的原型。
```js
function Idol(name) {
    this.name = name
}

var lee = new Idol('lee')
console.log(lee.__proto__  === Idol.prototype) // true
```
到目前为止，构造函数有一个属性 `prototype` 指向原型，实例有 `__proto__` 指向原型，那么原型是否也有属性构造函数和实例对象呢？

####  `constructor`
原型指向实例对象的属性，其实也不必需要。原型都有一个属性 `constructor` 指向关联的构造函数。
```js
function Idol(name) {
    this.name = name
}

console.log(Idol  === Idol.prototype.constructor) // true
```
那么这样子我们就可以得到了构造函数、原型和实例对象之间的关系。  
通过上面的分析，我们可以得出三者的关系如下图：  
![Aaron Swartz](https://raw.githubusercontent.com/songyp428/photo/master/ret/prototype1.png)

#### 实例与原型
我们着重来分析一下实例和原型的关系，实例是从原型上“继承”属性，那么怎么继承呢？
先来看一下例子吧。
```js
function Idol(name) {
    this.name = name
}

Idol.prototype.type = 'idol'

var lee = new Idol('lee')
console.log(lee.type)  // 'idol'

lee.type = 'actor'
console.log(lee.type)  // 'actor'

delete lee.type
console.log(lee.type)  // 'idol'

```
从上面的例子可以看出，第一次打印 lee.type 的时候，虽然 lee 对象本身没有 type 属性，但是它的原型拥有 type 属性，lee “继承” 它的原型的 type 属性，所以第一次打印的结果是 idol；接下来我们给 lee 对象添加一个 type 属性，再打印一次 lee.name， 这时 lee 对象本身就有 type 属性，就不再去找原型上面找 type，打印结果为 actor；接下来我们删除了 lee 的 type 属性。这是 lee 本身没有 type 属性了，所以需要去原型上找，原型拥有 type 的属性，所以第三次的打印结果为 idol。  
这里我们可以得出一个结论：优先访问实例中的属性，如果实例中没有的属性，则去原型上找。

如果没有原型上没有找到相应的属性呢？

#### 原型的原型
其实原型也是一个对象，原型对象是通过 Object 构造函数生成，也就是说原型的 `__proto__` 指向 Object.prototype。
这样子关系应该更新为
![Aaron Swartz](https://raw.githubusercontent.com/songyp428/photo/master/ret/prototype2.png)

那么 Object.prototype 的原型是什么呢？

#### 原型链
Object.prototype 的 `__prpro__` 指向 null。Object.prototype 是浏览器底层根据 ECMAScript 规范创造的一个对象。
```js
console.log(Object.prototype.__proto__ === null) // true
```
null 是表示缺少的标识，指示变量未指向任何对象。也就是说 Object.prototype 没有原型。  
关系图更新为:
![Aaron Swartz](https://raw.githubusercontent.com/songyp428/photo/master/ret/prototype3.png)

那么原型链是什么呢？  
每一个对象拥有一个原型对象，通过 `__proto__` 指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 null。这种关系被称为原型链 (prototype chain)，通过原型链一个对象会拥有定义在其他对象中的属性和方法。也就是说原型链是基于 `__proto__` 实现。

有个问题，你发现了吗？构造函数从何而来？

#### 构造函数的原型链
- 任何函数都是由 new Function 创建。也就是说所有的构造函数的 `__proto__` 都是指向 Function.prototype。  
- Function.prototype 对象是一个函数（对象），其 [[Prototype]] 内部属性值指向内建对象 Object.prototype。Function.prototype 没有 prototype 属性。`Function.prototype.__proto__  === Object.prototype`。  
那么关系图可以更新为: 
![Aaron Swartz](https://raw.githubusercontent.com/songyp428/photo/master/ret/prototype5.png)

#### 总结
- 每一个 JavaScript 对象（null 除外）在创建的时候就会与之关联另外一个对象，这个与之关联的对象就是**原型**。每一个对象从原型中“继承”属性。 
- 每一个对象拥有一个原型对象，通过 `__proto__` 指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 null。这种关系被称为**原型链** (prototype chain)，通过原型链一个对象会拥有定义在其他对象中的属性和方法。也就是说原型链是基于 `__proto__` 实现。
