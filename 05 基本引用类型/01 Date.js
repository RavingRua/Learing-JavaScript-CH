let date = new Date();

console.log(date);                      // ISO 8601
console.log(date.toLocaleString());     // 本地时间表示
console.log(date.toString());           // 格林尼治时间
console.log(date.valueOf());            // 1970.1.1至今的毫秒数
console.log(date.toTimeString());
console.log(date.toDateString());
console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());
console.log(date.toUTCString());