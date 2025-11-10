// utils/LinkedList.js
import Comparator from '../../../utils/comparator/Comparator';
import LinkedListNode from './LinkedListNode';

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  // 头插入
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  // 尾插入
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  // 指定位置插入 - 修复了这里的语法错误
  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex; // 修复变量名
    
    if (index === 0) { // 修复条件判断
      this.prepend(value);
    } else {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);
      
      while (currentNode && count < index) {
        currentNode = currentNode.next;
        count += 1;
      }
      
      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        
        // 如果插入到最后一个节点后面，更新tail
        if (newNode.next === null) {
          this.tail = newNode;
        }
      } else {
        // 如果位置超出链表长度，添加到末尾
        this.append(value);
      }
    }
    return this;
  }

  delete(value) {
    if (!this.head) { // 修复条件判断
      return null;
    }
    
    let deletedNode = null;
    
    // 删除头节点
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }
    
    let currentNode = this.head;
    if (currentNode) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    
    // 更新tail
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }
    
    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }
    
    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  deleteTail() {
    const deletedTail = this.tail;
    
    if (this.head === this.tail) { // 修复条件判断
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    
    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    
    const deletedHead = this.head;
    
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    
    return deletedHead;
  }

  fromArray(values) {
    values.forEach((value) => this.append(value));
    return this;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  // 获取链表长度
  getLength() {
    return this.toArray().length;
  }

  // 清空链表
  clear() {
    this.head = null;
    this.tail = null;
    return this;
  }
}