
### 数组去重

#### 1、双重循环
>第一层循环是需要去重的 array  
>第二层循环是存放没有重复的元素的临时 array (初始化为空数组)  
> 关键点我理解有两点：  
>1、如果存在相等（ 全等哦，=== ）则跳出第二层循环  
>2、如果第二层循环 index: j 的值与 tmpArr 的长度 length 相等，则存到tmpArr

```
var a = [1,1,2,3,2,'1',true,'1','2',false,true,null,null,undefined,undefined]

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

console.log(getUniqueArray(a))  //[1, 2, 3, "1", true, "2", false, null, undefined]
```



#### 2、indexOf 方法

```
var a = [1,1,2,3,2,'1',true,'1','2',false,true,null,null,undefined,undefined]

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

console.log(getUniqueArray(a)) //[1, 2, 3, "1", true, "2", false, null, undefined]
```

