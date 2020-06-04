// 临界条件：最近公共祖先为根节点   注意题目说：一个节点也可以是它自己的祖先
//   根节点是空节点
//   根节点是q节点
//   根节点是p节点
// 根据临界条件
//   此题相当于查找以 root 为根节点的树上是否有p节点或者q节点
//     有，返回p节点或q节点
//     无，返回null
// 求解
// 从左右子树分别进行递归，即查找左右子树上是否有p节点或者q节点
//   左右子树均无p节点或q节点
//   左子树找到，右子树没有找到，返回左子树的查找结果
//   右子树找到，左子树没有找到，返回右子树的查找结果
//   左、右子树均能找到
//     说明此时的p节点和q节点在当前root节点两侧，返回root节点

// 说明:
//    所有节点的值都是唯一的。
//    p、q 为不同节点且均存在于给定的二叉树中。

var lowestCommonAncestor = function (root, p, q) {
  // 临界条件:
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) {
    return root;
    // 左子树有，右子树没有，说明两个节点都在左子树上，先找到的节点本身就是最近公共祖先；
  } else if (left) {  
    return left;
    // 同理
  } else if (right) {
    return right;
  }
  return null;
};
