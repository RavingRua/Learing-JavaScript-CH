class Vegetable {
    constructor(name) {
        this.type = 'Vegetable';
        this.name = name;
    }
}

let vegeta = new Vegetable('Vegeta');
console.log(vegeta);                            // Vegetable { type: 'Vegetable', name: 'Vegeta' }

console.log(typeof Vegetable);                  // function
console.log(Vegetable.prototype);               // {constructor: class Vegetable}
console.log(Vegetable.prototype.constructor);   // class Vegetable

console.log(new Vegetable('Kakarot') instanceof Vegetable);     // true
console.log(vegeta instanceof Vegetable.constructor);               // false