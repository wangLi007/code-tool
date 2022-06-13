##### 表单校验

[validator.js](https://github.com/validatorjs/validator.js)

[approve.js](https://github.com/CharlGottschalk/approvejs)



##### 比较常用的

````javascript
process.browser //判断服务器环境还是浏览器环境
new Date().toJSON().substr(0, 19).replace('T', ' ') //"2020-06-24 05:26:46"
+new Date
// 1598084022687  时间戳
Math.floor(Math.random()*10)  //获取10以下的整数
Array.from({length:10},()=>0) //生成一个长度为10的数组  可以将伪数组转换为数组
Array(3).fill(4);  //填充数组里面的元素  [4, 4, 4]
10000.11.toFixed(2)  //保留小数

Object.prototype.toString.call('123') //可以用来判断任意类型  "[object String]"
````





##### 一些对数组、对象的操作

````javascript
typeof xx  //判断基本类型
instanceof  //判断复杂类型
Object.prototype.toString.call(obj) //可以用来判断类型
Array.isArray(arr1) //判断是否数组
//*不会改变原数组*
arr1.concat.(arr2)  //连接数组 返回连接后的数组
[...arr1,...arr2]  //连接数组
array.slice(0,1)  //切割
arr.join('-').split('-') 
// 拼接成字符串   然后再拆分为数组

//*会改变原数组*
arr.indexOf(ele) //查找ele在数组中的索引
arr.lastIndexOf(ele)  //倒序查找
arr.unshift() //往数组第一位插入元素
arr.shift()  //删除数组的第一位元素
arr.pop()  //删除数组最后一位元素
arr.push()  //往数组后面添加元素
arr.splice(idx,1) //删除数组中指定一个索引的元素  删除
arr.splice(idx,0,'Feb') //往指定索引里面插入元素
arr.splice(1, 1, 'Feb')  //替换掉指定索引的元素
["1",'2','3'].includes('3')  // true 是否包含

//es6 迭代的一些方法
[{'a':2,'value':11}].map((item)=>{ return { abc:item.value }  })
//  [{abc:11}]

[{'a':2,'value':22},{'a':1,'value':11}].find((item)=>item.a === 2)
//  {a: 2, value: 22}  返回的是找到的元素

[{'a':2,'value':22},{'a':1,'value':11}].findIndex((item)=>item.a === 2)
// 0  返回找到的索引

[{'a':2,'value':22},{'a':2,'value':11}].every((item)=>item.a === 2)
//true 迭代每一项 item.a === 2 当所有元素都满足这个条件 返回true  否则返回false

[{'a':2,'value':22},{'a':1,'value':11}].some((item)=>item.a === 2)
//true 迭代每一项 item.a === 2 当有一个元素满足这个条件 返回true  否则返回false

[{'a':3,'value':22},{'a':1,'value':11}].filter((item)=>item.a === 3)
// [{'a':3,'value':22}]  迭代每一项 把满足 item.a === 3 这个条件的元素 筛选出来  返回的是数组 如果都没有找到 返回的是空数组

var arr = [1,2,3,4,5,6]
arr.reduce(function(v1,v2){
    return v1 + v2;
) // 21 总数   //开始是1+2 = 3，之后3+3 =6，之后6+4 =10，之后

reduceRight() //反向遍历



//对象操作
Object.assgin(obj1,obj2)  //合并对象
Object.keys({a: 3, value: 22}) //["a", "value"] 是无序的
'a' in {a:1}  //判断是否有'a'这个字段

````



不常用

````javascript
11 ?? 22

//这个 ?? 的意思是，如果 ?? 左边的值是 null 或者 undefined，那么就返回右边的值。
````
