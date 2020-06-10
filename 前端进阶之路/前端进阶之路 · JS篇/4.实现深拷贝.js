// 深拷贝
JSON.parse(JSON.stringify(obj))
//
function deepClone(target) {
  if (typeof target === "object" && target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
} 

// test
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  field5: null,
};
console.log(clone(target))
console.log(clone(target) === target)


