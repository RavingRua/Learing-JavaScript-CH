const buf = new ArrayBuffer(16);
console.log(buf.byteLength);                // 16

const buf1 = new ArrayBuffer(8);
const buf2 = buf1.slice(4, 8);
console.log(buf2 === buf1.slice(4, 8));     // false