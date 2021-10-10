function Animal() {
    console.log(new.target);
}

let dog = new Animal();     // [Function: Animal]
Animal();                   // undefined