"use strict";
class TreeStore {
  constructor(arr) {
    this.arr = arr;
  }
  getAll() {
    return this.arr;
  }
  getItem(id) {
    const res = this.arr.filter((e) => {
      return e.id == id;
    });
    return res[0] ? res[0] : [];
  }
  getChildren(id) {
    return this.arr.filter((e) => {
      return e.parent == id;
    });
  }
  getAllChildren(id) {
    const res = [];
    this.getChildren(id).forEach((e) => {
      res.push(e);
      res.push(...this.getAllChildren(e.id));
    });
    return res;
  }
  getAllParents(id) {
    const res = [];
    let parent = this.getItem(id);
    while (parent.parent !== "root") {
      res.push(parent);
      parent = this.getItem(parent.parent);
    }
    res.push(parent);
    return res;
  }
}

const items = [
  { id: 1, parent: "root" },
  { id: 2, parent: 1, type: "test" },
  { id: 3, parent: 1, type: "test" },

  { id: 4, parent: 2, type: "test" },
  { id: 5, parent: 2, type: "test" },
  { id: 6, parent: 2, type: "test" },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log(ts.getAll()); /*
[{"id":1,"parent":"root"},
{"id":2,"parent":1,"type":"test"},
{"id":3,"parent":1,"type":"test"},
{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},
{"id":6,"parent":2,"type":"test"},
{"id":7,"parent":4,"type":null},
{"id":8,"parent":4,"type":null}]*/
console.log(ts.getItem(7));
// {"id":7,"parent":4,"type":null}
console.log(ts.getChildren(4)); /*
[{"id":7,"parent":4,"type":null},
{"id":8,"parent":4,"type":null}]*/
console.log(ts.getChildren(5));
// []
console.log(ts.getChildren(2)); /*
[{"id":4,"parent":2,"type":"test"},
{"id":5,"parent":2,"type":"test"},
{"id":6,"parent":2,"type":"test"}]*/
console.log(ts.getAllChildren(2)); /*
[{"id":4,"parent":2,"type":"test"},
{"id":5,"parent":2,"type":"test"},
{"id":6,"parent":2,"type":"test"},
{"id":7,"parent":4,"type":null},
{"id":8,"parent":4,"type":null}]*/
console.log(ts.getAllParents(7)); /*
[{ id: 7, parent: 4, type: null },
{"id":4,"parent":2,"type":"test"},
{"id":2,"parent":1,"type":"test"},
{"id":1,"parent":"root"}]*/
