const template = `
<div id="body">
    <todo-input></todo-input>
</div>
`;

const style = `
<style>
    #body{
        width: 50vw;
        border-radius: 10px;
        box-shadow: 0 0 8px 4px #eee;
        padding: 2%;
        text-align: center;
    }
</style>
`;

import TodoInput from "./TodoInput.js";

class Todolist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template + style;
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    adoptedCallback() {

    }
}

customElements.define('todo-list', Todolist);

export default Todolist;