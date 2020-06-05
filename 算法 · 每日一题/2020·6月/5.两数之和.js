// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

 
// 暴力枚举
var twoSum = function (nums, target) {
  let result = [];
  for (let i = 0; i < nums.length - 1; i++) {
    for (let k = i + 1; k < nums.length; k++) {
      if (nums[i] + nums[k] === target) {
        return (result = [i, k]);
      }
    }
  }
  return result;
};

//利用差值
var twoSum = function () {
  let len = nums.length;
  while (len > 1) {
    const result = nums.pop();
    if (nums.indexOf(target - result) > -1) {
      return [nums.indexOf(target - result), nums.length];
    }
    len--;
  }
};
//  hashmap
var twoSum = function (nums, target) {
  let hashmap = [];
  for (let i = 0; i < nums.length; i++) {
    let key = target - nums[i];
    if (hashmap[key] !== undefined) {
      return [i, hashmap[key]];
    }
    hashmap[nums[i]] = i;
  }
};
