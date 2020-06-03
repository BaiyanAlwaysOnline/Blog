// 1.前序  根 左 右
// 1-1 递归
var preorderTraversal = function (root) {
  let result = [];
  function pushRoot(root) {
    if (root !== null) {
      result.push(root.val);
      if (root.left !== null) {
        pushRoot(root.left);
      }
      if (root.right !== null) {
        pushRoot(root.right);
      }
    }
  }
  pushRoot(root);
  return result;
};
// 1-2 迭代 利用栈
var preorderTraversal = function (root) {
  let res = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    let node = stack.pop();
    res.push(node.val);
    if (node.right) {
      // 栈先入后出  所以先遍历右节点。
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
  return res;
};

// 2.后序  左 右 根
// 2-1 递归
var postorderTraversal = function (root) {
  let result = [];
  function pushRoot(root) {
    if (root !== null) {
      if (root.left !== null) {
        pushRoot(root.left);
      }
      if (root.right !== null) {
        pushRoot(root.right);
      }
      result.push(root.val);
    }
  }
  pushRoot(root);
  return result;
};
// 2-2 迭代 利用栈
var postorderTraversal = function (root) {
  let res = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    let node = stack.pop();
    // 结合前序遍历的思想 此时输出值为前序的逆输出 右 左 根；只需转成 左 右 根 即可；
    res.unshift(node.val);
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      // 栈先入后出  所以先遍历右节点。
      stack.push(node.right);
    }
  }
  return res;
};
