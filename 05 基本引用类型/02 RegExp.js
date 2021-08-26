let pattern = /mom( and dad( and baby)?)?/g;
console.log(pattern);               // /mom( and dad( and baby)?)?/g
console.log(typeof pattern);        // 'object'
console.log(pattern.lastIndex);     // 0
console.log(pattern.exec('mom and dad and baby'));
/*
[
  'mom and dad and baby',
  ' and dad and baby',
  ' and baby',
  index: 0,
  input: 'mom and dad and baby',
  groups: undefined
]
 */
console.log(pattern.lastIndex);     // 20
pattern.lastIndex = 0;
console.log(pattern.test('mom and dad and baby'));      // true

// 静态成员
console.log(RegExp.$1);