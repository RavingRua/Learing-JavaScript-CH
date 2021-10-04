const template = `
<input placeholder="Please Input Today's Todo">
`;

const style = `
<style>
    input{
        border: 1px solid lightgray;
        border-radius: 10px;
        width: 96%;
        height: 40px;
        transition: 0.2s ease;
        padding: 0 10px;
        font-size: 16px;
    }
    input:focus{
        outline: 0;
        box-shadow: 0 0 4px 2px #eee;
    }
</style>
`;

class TodoInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template + style;
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        const input = this.shadowRoot.querySelector('input');
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    adoptedCallback() {

    }
}

customElements.define('todo-input', TodoInput);

export default TodoInput;