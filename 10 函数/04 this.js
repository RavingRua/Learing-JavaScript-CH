let obj = {
    name: 'obj',
    say() {
        console.log(this.name);
    },
    sayThat: () => {
        console.log(this.name);
    }
}
obj.say();          // 'obj'
obj.sayThat();      // undefined