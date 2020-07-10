/**
 * @source https://leetcode-cn.com/problems/jump-game/
 * @param {number[]} nums
 * @return {boolean}
 */
// 贪心
var canJump = function(nums) {
  //换一种思路，计算出该路线能到的最远距离，判断最远的距离是否超过了该路径或者刚好到达终点
  //每一次都计算当前位置以及以前能走到的最远距离（贪心）
  let maxDistance = 0;
  const len = nums.length;
  for(let i = 0; i < len; i ++) {
      //如果当前位置值为0，且当前能到达的最远距离还小于等于这个位置，
      //那么它已经走不到后面了，直接退出循环就好了
      if(nums[i] === 0 && maxDistance <= i) break;
      maxDistance = Math.max(i + nums[i], maxDistance)
  }
  return maxDistance >= len- 1;
};