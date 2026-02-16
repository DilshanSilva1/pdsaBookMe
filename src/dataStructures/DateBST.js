import BSTNode from './BSTNode';

class DateBST {
  constructor() {
    this.root = null;
  }

  insert(date) {
    this.root = this._insertRec(this.root, date);
  }

  _insertRec(node, date) {
    if (node === null) return new BSTNode(date);
    const nodeTime = new Date(node.date).getTime();
    const dateTime = new Date(date).getTime();
    if (dateTime < nodeTime) {
      node.left = this._insertRec(node.left, date);
    } else if (dateTime > nodeTime) {
      node.right = this._insertRec(node.right, date);
    }
    return node;
  }

  inOrderTraversal() {
    const result = [];
    this._inOrderRec(this.root, result);
    return result;
  }

  _inOrderRec(node, result) {
    if (node !== null) {
      this._inOrderRec(node.left, result);
      result.push(node.date);
      this._inOrderRec(node.right, result);
    }
  }

  search(date) {
    return this._searchRec(this.root, date);
  }

  _searchRec(node, date) {
    if (node === null) return false;
    const nodeTime = new Date(node.date).getTime();
    const dateTime = new Date(date).getTime();
    if (dateTime === nodeTime) return true;
    if (dateTime < nodeTime) return this._searchRec(node.left, date);
    return this._searchRec(node.right, date);
  }
}

export default DateBST;
