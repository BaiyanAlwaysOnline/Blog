// 1;
let newArr = new Set(arr);
let result = Array.from(newArr);

// 2;
let newArr = [];
for (let i = 0; i < arr.length; i++) {
  let result = newArr.some((item) => {
    return item === arr[i];
  });

  !result && newArr.push(arr[i]);
}
//tips: some对true敏感, every对false敏感；

// 3;
let newArr = [];
for (let k of arr) {
  if (!newArr.includes(k)) {
    newArr.push(k);
  }
}
//tips: includes是ES6的数组和字符串的方法, 返回true/false;
//      indexOf用法类似（缺点：语义不明显，返回值 -1 / 1；NaN无法判断）

// 4;
let newArr = [];
let myMap = new Map();
for (let k of arr) {
  if (!myMap.has(k)) {
    myMap.set(k, k);
    newArr.push(k);
  }
}

// 5;
let obj = {};
let newArr = arr.filter((item) => {
  return obj.hasOwnProperty(item) ? false : (obj[item] = 1);
});
//tips: hasOwnProperty()方法返回一个布尔值，指示对象自身属性中是否具有指定的属性，而不是继承来的。

// 6;
let newArr = arr.reduce((pre, cur) => {
  !pre.includes(cur) && pre.push(cur);
  return pre;
}, []);
//tips: arr.reduce((pre, cur, index, arr)=>{}, init)  pre是上一次的返回值，
//      或者初始值init；cur是当前正在处理的数组元素


// 数组成员是对象的，如何去重呢；
const arr = [
  { name: "柏", id: 1 },
  { name: "柏", id: 1 },
  { name: "柏", id: 1 },
  { name: "李", id: 2 },
  { name: "张", id: 3 },
  { name: "张", id: 3 },
  { name: "张", id: 3 },
  { name: "王", id: 2 },
  { name: "王", id: 2 },
  { name: "王", id: 4 },
];
const result = arr.reduce((pre, cur) => {
  const ids = pre.map((item) => item.id);
  return ids.includes(cur.id) ? pre : [...pre, cur];
}, []);
