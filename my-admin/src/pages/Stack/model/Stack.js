// utils/Stack.js
import LinkedList from '../../LinkedList/model/LinkedList';

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {  // 修复：应该是 this.isEmpty() 而不是 !this.isEmpty
      return null;
    }
    return this.linkedList.head.value;
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  pop() {
    const deletedHead = this.linkedList.deleteHead();
    return deletedHead ? deletedHead.value : null;
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }

  // 添加一些有用的方法
  getSize() {
    return this.linkedList.toArray().length;
  }

  clear() {
    this.linkedList = new LinkedList();
  }
}