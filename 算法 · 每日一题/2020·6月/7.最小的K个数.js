// 1.直接排序再slice
var getLeastNumbers = function (arr, k) {
  arr = arr.sort((a, b) => a - b);
  return arr.slice(0, k);
};

// 2.二叉堆  手写一个最大堆
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

class MaxHeap {
  constructor(arr = []) {
    this.container = [];
    if (Array.isArray(arr)) {
      arr.forEach(this.insert.bind(this));
    }
  }

  insert(data) {
    const { container } = this;
    container.push(data);
    let index = container.length - 1;
    while (index) {
      let parent = Math.floor((index - 1) / 2);
      if (container[index] <= container[parent]) {
        break;
      }
      swap(container, index, parent);
      index = parent;
    }
  }

  extract() {
    const { container } = this;
    if (!container.length) {
      return null;
    }

    swap(container, 0, container.length - 1);
    const res = container.pop();
    const length = container.length;
    let index = 0,
      exchange = index * 2 + 1;

    while (exchange < length) {
      // 如果有右节点，并且右节点的值大于左节点的值
      let right = index * 2 + 2;
      if (right < length && container[right] > container[exchange]) {
        exchange = right;
      }
      if (container[exchange] <= container[index]) {
        break;
      }
      swap(container, exchange, index);
      index = exchange;
      exchange = index * 2 + 1;
    }

    return res;
  }

  top() {
    if (this.container.length) return this.container[0];
    return null;
  }
}
// 解答
var getLeastNumbers = function (arr, k) {
  const length = arr.length;
  if (k >= length) {
    return arr;
  }
  // 初始化深度为k的二叉堆,内容是数组前K个值
  const heap = new MaxHeap(arr.slice(0, k));
  // 从第k个元素继续遍历
  for (let i = k; i < length; ++i) {
    if (heap.top() > arr[i]) {
      heap.extract(); // 堆顶元素大于当前遍历元素，直接删掉
      heap.insert(arr[i]); // 再插入当前元素
    }
  }
  return heap.container;
};


// 3.快排   todo
