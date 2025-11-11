import LinkedList from '../../LinkedList/model/LinkedList';

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.head.value;
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead();  
    return removedHead ? removedHead.value : null;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }

  // 添加一些有用的方法
  toArray() {
    return this.linkedList.toArray().map(node => node.value);
  }

  getSize() {
    return this.linkedList.toArray().length;
  }

  clear() {
    this.linkedList = new LinkedList();
  }

  // 获取队尾元素
  getRear() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.tail ? this.linkedList.tail.value : null;
  }
}
