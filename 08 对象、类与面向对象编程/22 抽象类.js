class Animal {
    constructor() {
        if (new.target === Animal) throw new Error('Abstract class cannot be instantiated.');

        if (!this.eat) throw new Error('Inheriting class must define abstract method eat().');
    }
}

try {
    new Animal();
} catch (e) {
    console.error(e.message);           // Abstract class cannot be instantiated.
}

class Human extends Animal {
}

new Human();