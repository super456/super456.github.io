---
title: JavaScript 优化技巧
date: 2023-08-19 20:00:00
tag:
 - JavaScript
categories:
 - 前端进击
---
# JavaScript 优化技巧
## 1、三元运算
精简 if-else 单一操作（赋值表达式）
```javascript
// 方式一
if (offsetTop < 0) {
	this.titleFixed = true
} else {
	this.titleFixed = false
}

// 修改为
this.titleFixed = offsetTop < 0

// 方式二
let hungry = true;
let eat;
if (hungry == true) {
       eat = 'yes';
} else {
       eat = 'no';
}

修改为：
let hungry = true;
let eat = hungry == true ? 'yes' : 'no';
```

## 2、逻辑与运算符
```javascript
if (falg) {
	someMethod()
}

// 修改为
falg && someMethod()
```

## 3、优化判断条件

1. 使用 `includes` 处理多重条件
```javascript
if (code === 202 || code === 203 || code === 204) {
	...
}

 // 修改为
 if ([202, 203, 204].inclueds(code)) {
 	...
 }
```

## 4、过滤数组唯一值
Set 对象类型是在 ES6 中引入的，配合扩展符（`...`）一起使用，我们可以使用它来创建一个新的数组，该数组只有唯一的值。
```javascript
// 基本用法
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // Result: [1, 2, 3, 5]
```
此技巧适用于包含基本类型的数组：undefined，null，boolean，string和number。（如果你有一个包含对象，函数或其他数组的数组，你需要一个不同的方法！）
```javascript
const array = [1,2,1,3,2,5,undefined,null,true,true,null,undefined,'123','123']
const uniqurArray = [...new Set(array)]
console.log(uniqurArray) // [1, 2, 3, 5, undefined, null, true, "123"]
```
如果需要过滤六种布尔值为空的情况：
```javascript
const array = [1,2,1,3,2,5,undefined,null,true,true,null,undefined,'123','123']
const uniqurArrayTrue = [...new Set(array)].filter(item => Boolean(item))
// const uniqurArrayTrue = [...new Set(array)].filter(Boolean)
console.log(uniqurArrayTrue) // [1, 2, 3, 5, true, "123"]
```
## 5、数字转字符串/字符串转数字
```javascript
let num = 15;
let s = num.toString(); // number to string
let n = Number(s); // string to number

修改为：
let num = 15;
let s = num + ""; // 数字转字符串
let n = +s; // 字符串转数字

```
## 6、填充数组
```javascript
for(let i=0; i < arraySize; i++){
  filledArray[i] = {'hello' : 'goodbye'};
}

修改为：
let filledArray = new Array(arraysize).fill(null).map(()=> ({hello: 'goodbye'}));
```
## 7、对象的动态属性
```javascript
let dynamic = "value";
let user = {
     id: 1
};
user[dynamic] = "other value";

修改为：
let dynamic = "value";
let user = {
    id: 1,
    [dynamic]: "other value"
};
```
## 8、删除数组重复项
```javascript
let array = [100, 23, 23, 23, 23, 67, 45];
let outputArray = [];
let flag = false;
for (j = 0; < array.length; j++) {
   for (k = 0; k < outputArray.length; k++) {
      if (array[j] == outputArray[k]) {
         flag = true;
       }
    }
    if (flag == false) {
      outputArray.push(array[j]);
     }
     flag = false;
}
// tArray = [100, 23, 67, 45]

修改为：
let array = [100, 23, 23, 23, 23, 67, 45];
let outputArray = Array.from(new Set(array))
```
## 9、数组到对象
```javascript
let arr = ["value1", "value2", "value3"];
let arrObject = {};
for (let i = 0; i < arr.length; ++i) {
   if (arr[i] !== undefined) {
     arrObject[i] = arr[i];
   }
}

修改为：
let arr = ["value1", "value2", "value3"];
let arrObject = {...arr};
```
## 10、对象到数组
```javascript
let number = {
  one: 1,
  two: 2,
};
let keys = [];
for (let numbers in numbers) {
  if (number.hasOwnProperty(number)) {
     keys.push(number);
    }
}
// key = [ 'one', 'two' ]

修改为：
let number = {
  one: 1,
  two: 2,
};
let key = Object.keys(numbers); // key = [ 'one', 'two' ]
let value = Object.values(numbers);  // value = [ 1, 2 ]
let entry = Object.entries(numbers); // entry = [['one' : 1], ['two' : 2]]
```
## 11、初始化大小为 N 的数组并填充默认值
```javascript
const size = 5;
const defaultValue = 0;
const arr = Array(size).fill(defaultValue);
console.log(arr); // [0, 0, 0, 0, 0]
```

## 12、函数 settimeout 封装
```javascript
function onTimeout(timeout: number, handler: () => void) {
  const timeoutId = setTimeout(handler, timeout)
  return () => clearTimeout(timeoutId)
}

// 使用
const cancelTimeout = onTimeout(1000, () => {
  console.log('timeout')
}

cancelTimeout()
```

## 13、if-else
举例：今天是星期几

初学者：
```javascript
function returnWeekday() {
	let string = "今天是星期";
	let date = new Date().getDay();
	if (date === 0) {
		string += "日"
	} else if (date === 1) {
		string += "一"
	} else if (date === 2) {
		string += "二"
	} else if (date === 3) {
		string += "三"
	} else if (date === 4) {
		string += "四"
	} else if (date === 5) {
		string += "五"
	} else if (date === 6) {
		string += "六"
	}
	return string
}
console.log(returnWeekday())
```

入门：
`switch` 语句与 `if` 语句的关系最为密切，而且也是在其他语言中普遍使用的一种流控制语句。
```javascript
function returnWeekday() {
	let string = "今天是星期";
	let date = new Date().getDay();
	switch (date) {
	case 0:
		string += "日";
		break;
	case 1:
		string += "一";
		break;
	case 2:
		string += "二";
		break;
	case 3:
		string += "三";
		break;
	case 4:
		string += "四";
		break;
	case 5:
		string += "五";
		break;
	case 6:
		string += "六";
		break
	}
	return string
}
console.log(returnWeekday())
```

中级：
数组或对象优化
```javascript
// 数组
function returnWeekday() {
	let string = "今天是星期";
	let date = new Date().getDay();
	let dateArr = ['天', '一', '二', '三', '四', '五', '六'];
	return string + dateArr[date]
}
console.log(returnWeekday())

// 对象
function returnWeekday() {
	let string = "今天是星期";
	let date = new Date().getDay();
	dateObj = {
		0: "天",
		1: "一",
		2: "二",
		3: "三",
		4: "四",
		5: "五",
		6: "六",
	};
	return string + dateObj[date]
}
console.log(returnWeekday())

// 最简单字符串索引方式（类似数组下标）
function returnWeekday() {
	return "今天是星期" + "日一二三四五六".charAt(new Date().getDay())
}
console.log(returnWeekday())
```

需求变动，返回星期几的同时，返回工作日和休息日
```javascript
function returnWeekday() {
	let string = "今天是星期";
	let date = new Date().getDay();
	dateObj = {
		0: ['天', '休'],
		1: ["一", '工'],
		2: ["二", '工'],
		3: ["三", '工'],
		4: ["四", '工'],
		5: ["五", '工'],
		6: ["六", '休'],
	}
	dayType = {
		'休': function() {
			console.log('为休息日')
		},
		'工': function() {
			console.log('为工作日')
		}
	}
	let returnData = {
		string: string + dateObj[date][0],
		method: dayType[dateObj[date][1]]
	}
	return returnData
};
console.log(returnWeekday().method.call(this))
```
