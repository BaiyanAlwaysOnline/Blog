/**
 * @param {number[]} prices
 * @return {number}
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
  如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
  注意：你不能在买入股票前卖出股票。
 */
// 1 暴力循环
var maxProfit = function (prices) {
  let num = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let k = i + 1; k < prices.length; k++) {
      if (prices[i] < prices[k]) {
        num = Math.max(prices[k] - prices[i], num);
      }
    }
  }
  return num;
};

var maxProfit = function (prices) {
  let curMin = prices[0];
  let num = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < curMin) {
      curMin = prices[i];
      continue;
    }
    num = Math.max(prices[i] - curMin, num);
  }
  return num;
};
