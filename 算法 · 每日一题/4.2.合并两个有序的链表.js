// 利用哨兵变量
var mergeTwoLists = function (l1, l2) {
  const shaob = new ListNode(-1);
  let shaobCopy = shaob;
  while (l1 && l2) {
    if (l1.val > l2.val) {
      shaobCopy.next = l2;
      l2 = l2.next;
    } else {
      shaobCopy.next = l1;
      l1 = l1.next;
    }
    shaobCopy = shaobCopy.next;
  }
  // 比较完成后 肯定l1或者l2有一个值没有取到；
  shaobCopy.next = l1 || l2;
  return shaob.next;
};

// 利用递归
var mergeTwoLists = function (l1, l2) {
  // 临界条件:一个链表为空，直接返回另一个链表即可；因为都是升序的；
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val > l2.val) {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  } else {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }
};
