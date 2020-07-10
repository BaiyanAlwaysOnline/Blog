/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 夹逼法
var threeSum = function (nums) {
  // 先排序
  nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break; // 升序排序 num[i] > 0 其他必大于0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 重复 直接过；
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // 略去重复项
        while (left < right && nums[right] === nums[right - 1]) right--;
        while (left < right && nums[left] === nums[left + 1]) left++;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      }
    }
  }
  return result;
};
