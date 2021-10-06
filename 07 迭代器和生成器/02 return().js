const set = new Set([1, 2, 3]);
const iter = set.entries();

try {
    iter.return();
} catch (e) {
    console.log(e.message);     // iter.return is not a function
}

class Bar {
    count = 0;

    [Symbol.iterator]() {
        return {
            next: () => {
                this.count++;
                return this.count <= 3 ? {done: false, value: this.count} : {done: true, value: undefined}
            },
            return: () => {
                console.log('exiting early');
                return {done: true, value: undefined};
            }
        }
    }
}

for (let i of new Bar()) {
    console.log(i);
    break;
    // 1
    // exiting early
}