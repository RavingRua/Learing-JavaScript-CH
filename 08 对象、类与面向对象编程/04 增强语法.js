let name = 'Steven';
let person = {
    name
};
console.log(person);            // { name: 'Steven' }

let ageTag = 'a' + 'g' + 'e';

person = {
    ['name']: 'Steven',
    [ageTag]: 21
};
console.log(person);