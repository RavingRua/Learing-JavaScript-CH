const buf = new ArrayBuffer(16);

// 创建一个视图
const fullDataView = new DataView(buf);

// buffer属性是视图实际缓冲区的引用
console.log(fullDataView.buffer === buf);       // true

// byteOffset表示视图相对缓冲区的起点，0表示视图从缓冲区头部开始
console.log(fullDataView.byteOffset);           // 0

// 一半缓冲区的视图
const halfDataView = new DataView(buf, 8, 8);
console.log(halfDataView.byteOffset);           // 8

const view = new DataView(new ArrayBuffer(2));
view.setUint8(0, 255);
console.log(view.buffer);                       //  <ff 00>
console.log(view.getUint8(0));      // 255