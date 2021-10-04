// 申请一个长度为6（6位数）的int32
const int32 = new Int32Array(6);

console.log(int32.length);                  // 6

// 每个int32数字占4个字节，因此其缓冲区占4*6个字节
console.log(int32.buffer.byteLength);       // 24