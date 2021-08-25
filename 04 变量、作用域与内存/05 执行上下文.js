var val1 = 10;
let val2 = 20;

console.log(this);                  // 浏览器：window对象，NodeJS：空对象
console.log(this.val1);             // 浏览器：10，NodeJS：undefined
console.log(this.val2);             // 浏览器：undefined，NodeJS：undefined