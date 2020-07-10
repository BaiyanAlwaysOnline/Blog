// 初级排序：O(n^2)
// 1.选择排序
function selectionSort(arr) {
  const len = arr.length;
  let minIndex, tpl;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 循环完毕，获得最小index，交换值
    tpl = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = tpl;
  }
  return arr;
}

// 2.插入排序
function insertionSort(arr) {
  const len = arr.length;
  let preIndex, currentVal;
  for (let i = 1; i < len; i++) {
    currentVal = arr[i];
    preIndex = i - 1;
    //终止条件
    while (preIndex >= 0 && arr[preIndex] > currentVal) {
      // 调换位置并preindex减一
      arr[preIndex + 1] = arr[preIndex--];
    }
    arr[preIndex + 1] = currentVal;
  }
  return arr;
}

// 3.冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    //一次遍历，最大值会被挪到最后一位，所以 k < len - 1 - i
    for (let k = 0; k < len - 1 - i; i++) {
      //相邻俩元素对比
      if (arr[k] > arr[k + 1]) {
        //交换值
        const tpl = arr[k + 1];
        arr[k + 1] = arr[k];
        arr[k] = tpl;
      }
    }
  }
  return arr;
}
