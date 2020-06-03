/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// 1.顺序记录值，再倒序输出。
var reversePrint = function(head) {
    let cur = head;
    let res = [];
    while (cur) {
        res.push(cur.val);
        cur = cur.next;
    }
    return res.reverse()
};

// 2.题目要求的是从尾到头。这种“后入先出”的访问顺序，自然想到了用栈。
var reversePrint = function (head) {
  let cur = head;
  let res = [];
  let stack = [];
  while (cur) {  // 先入栈
    stack.push(cur);
    cur = cur.next;
  }
  while (stack.length > 0) {
    let node = stack.pop();  // 后入先出
    res.push(node.val);
  }
  return res;
};
