
### 数组去重

#### 1、双重循环
>第一层循环是需要去重的 array  
>第二层循环是存放没有重复的元素的临时 array (初始化为空数组)  
> 关键点我理解有两点：  
>1、如果存在相等（ 全等哦，=== ）则跳出第二层循环  
>2、如果第二层循环 index: j 的值与 tmpArr 的长度 length 相等，则存到 tmpArr

**注意： 对象和 NaN 不去重。**

```js
var a = [1, 1, 2, 3, 2, '1', true, '1', '2', 1, false, true, null, null, undefined, undefined, NaN, NaN]

function getUniqueArray(arr){
	let j
	let tmp_len
	let tmpArr = []

	for (let i = 0,len_i = arr.length; i < len_i; i++ ) {
		for (j = 0,tmp_len = tmpArr.length; j < tmp_len; j++ ) {
			//注意是 === 
			if (arr[i] === tmpArr[j]) {
				break
			}
		}


		//j === tmp_len,则说明没有找到相同值
		if (j === tmp_len) {
			tmpArr.push(arr[i])
		}
	}

	return tmpArr
}

console.log(getUniqueArray(a))  //[1, 2, 3, "1", true, "2", false, null, undefined, NaN, NaN]
```

#### 2、indexOf 方法
>借助辅助数组，和 indexOf() 方法，循环一遍需要去重的数组，要执行 n 次 indexOf() 方法，如果数组很大，还是比较耗时。

**注意：对象和 NaN 不去重。**
```js
var a = [1, 1, 2, 3, 2, '1', true, '1', '2', 1, false, true, null, null, undefined, undefined, NaN, NaN]

function getUniqueArray(arr) {
	var tmpArr = []

	for (let i = 0,len = arr.length; i < len; i++) {
		//关键点在这里
		if (!(tmpArr.indexOf(arr[i]) > -1)) {
			tmpArr.push(arr[i])
		}
	}

	return tmpArr
}

console.log(getUniqueArray(a)) //[1, 2, 3, "1", true, "2", false, null, undefined, NaN, NaN]
```

#### 3、借助 Object 键值对
>第一次写的时候，只是用元素本身作为 object 的 key，但是这样会导致一个问题，例如 1 和 ‘1’ 就是相同的 key,所以需要用元素数据类型和元素作为 key。

**特别好，除了对象外都去重了**
```js
var a = [1,1,'1',true,'1',1,false,true,null,null,undefined,undefined,NaN,NaN]

function getUniqueArray(arr) {
	var obj = {}
	var tmpArr = []

	for (let i = 0,len = arr.length; i < len; i++) {
		if (!obj.hasOwnProperty(typeof arr[i] + arr[i])) {
			obj[typeof arr[i] + arr[i]] = arr[i]
		}
	}

	tmpArr = Object.values(obj)

	return tmpArr
}

console.log(getUniqueArray(a))  //[1, "1", true, false, null, undefined, NaN]

```
#### 4、数组排序去重
>先对需要去重的数组进行排序，如果循环已经排序好的数组，只需要比较当前元素和上一个元素是否相同就好。  
>执行效率比使用 indexOf 方法要快。  
>如果要求是去重，并且不改变元素本身的相对位置，这种方法就不适用了。

**注意：对象和 NaN 不去重 数字 1 也不去重。**

```js
//排序循环去重
var a = [1,1,2,3,2,'1',true,'1','2',1,1,false,true,null,null,undefined,undefined,NaN,NaN]
function getUniqueArray(arr) {
	// var sortedArr = arr.concat().sort()  //copy,不修改原有数组
	var sortedArr = JSON.parse(JSON.stringify(arr)).sort()  //copy,不修改原有数组

	var seen = sortedArr[0]   //赋值已排序数组的第一个元素作为seen
	var tmpArr = [sortedArr[0]]

	for (var i = 1, len = sortedArr.length; i < len; i++) {
		if(seen !== sortedArr[i]) {
			tmpArr.push(sortedArr[i])  //记录不重复的元素
			seen = sortedArr[i]        //更新新的seen
		}
	}

	return tmpArr
}

console.log(getUniqueArray(a))

```

#### 5、利用 ES5 的 filter 简化循环流程
##### 辅助 indexOf 去重方法


#### 6、借助 ES6 一行代码去重
>只针对一维数组，并且对象无法去重。

```js
var a = [1,1,2,3,2,'1',true,'1','2',1,1,false,true,null,null,undefined,undefined,NaN,NaN]
console.log([...new Set(a)])          //[1, 2, 3, "1", true, "2", false, null, undefined, NaN]
console.log(Array.from(new Set(a)))   //[1, 2, 3, "1", true, "2", false, null, undefined, NaN]
```

#### 7、数组元素为对象去重
>先来了解一下reduceRight  
>reduceRight() : 从数组的末尾向前将数组中的数组项做累加。接收 callbackfn ( function callbackfn ( preValue, curValue, index, array ) ) 函数，而这个函数包含四个参数：  
>**preValue**: 上一次调用回调返回的值，或者是提供的初始值（initialValue）。 
>**curValue**: 数组中当前被处理的数组项。  
>**index**: 当前数组项在数组中的索引值。  
>**array**: 调用 reduce()方法的数组。  


>需要根据对象中唯一的 id 来作为唯一标示去重。初始值 initialValue 赋值为空数组（也就是 item 初始时为 [] )，然后判断当前处理元素的 id 是在辅助对象 hash 已有的 key ，不存在则 hash 增加这一条记录，并且把 curValue push 到 preValue 中。
```js
var a = [{id: 1,name: 'ss'},{id: 2,name: 's'},{id: 3,name: 'sss'},{id: 1,name: 'ss'},{id: 3,name: 'sss'},{id: 4,name: 'ssss'}]

var hash = {}
var newArr = a.reduceRight((preValue, curValue) => {
    hash[curValue.id] ? '' : (hash[curValue.id] = true && preValue.push(curValue))
    return preValue
}, [])

console.log(newArr)  //[{id: 4, name: "ssss"},{id: 3, name: "sss"},{id: 1, name: "ss"},{id: 2, name: "s"}]
```

