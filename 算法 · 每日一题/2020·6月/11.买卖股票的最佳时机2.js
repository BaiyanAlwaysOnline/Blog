
/**
 * @source https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/submissions/
 * @param {number[]} prices
 * @return {number}
 */

 // 贪心
var maxProfit = function(prices) {
  let curr = prices[0];
  let res = 0;
  for (let i = 1; i < prices.length; i ++) {
      if(prices[i] < curr) {
          curr = prices[i];
          continue;
      }
      res += (prices[i] - curr);
      curr = prices[i];
  }
  return res;
};