// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
// 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 说明：你不能倾斜容器，且 n 的值至少为 2。

// O(n^2)  暴力枚举
var maxArea = function (height) {
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    for (let k = i + 1; k < height.length; k++) {
      const area = (k - i) * Math.min(height[i], height[k]);
      max = Math.max(max, area);
    }
  }
  return max;
};
//O(n)  夹逼法
var maxArea = function (height) {
  let max = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    const minHeight =
      height[left] < height[right] ? height[left++] : height[right--];
    const area = minHeight * (right - left + 1); //left ++或者right --补回1
    max = Math.max(area, max);
  }
  return max;
};
