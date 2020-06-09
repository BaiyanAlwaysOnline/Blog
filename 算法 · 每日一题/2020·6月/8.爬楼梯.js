/**
 * @param {number} n
 * @return {number}
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
  注意：给定 n 是一个正整数。
 */

// O(n) 标签：动态规划
var climbStairs = function (n) {
  let result = []; // 记录每n阶爬台阶 有几种方法；
  result[1] = 1; // 1个台阶 1种;
  result[2] = 2; // 2个台阶 2种;
  for (let i = 3; i <= n; i++) {
    // n个台阶就有   n-1和n-2的和  种方法;
    result[i] = result[i - 1] + result[i - 2];
  }
  return result[n];
};
