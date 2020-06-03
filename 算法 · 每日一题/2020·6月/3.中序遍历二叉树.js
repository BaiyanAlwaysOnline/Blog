/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归
var inorderTraversal = function (root) {
  let result = [];
  function pushRoot(root) {
    if (root !== null) {
      if (root.left !== null) {
        pushRoot(root.left);
      }
      result.push(root.val);
      if (root.right !== null) {
        pushRoot(root.right);
      }
    }
  }
  pushRoot(root);
  return result;
};

// 迭代
var inorderTraversal = function (root) {
  const stack = [];
  const res = [];
  let node = root;
  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    res.push(node.val);
    node = node.right;
  }
  return res;
};
