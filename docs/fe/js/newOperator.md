### new 运算符了解一下~

#### 定义
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。  
new 关键字会进行如下的操作：
1. 创建一个空的简单的 JavaScript 空对象（即 {}）
2. 链接该对象到另一个对象
3. 将步骤1创建的对象作为 this 的上下文
4. 如果该函数没有返回对象，把 this 返回

```js
// 模拟 new 关键字
function Idol(age){
	var 临时对象 = {}
    临时对象.__proto__ = Idol.原型
    临时对象.age = age

    return 临时对象
}
```