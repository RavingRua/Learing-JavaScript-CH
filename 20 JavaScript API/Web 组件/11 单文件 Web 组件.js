const template = `
#shadow-root
<p>This is a custom element.</p>
<slot></slot>
`;

const style = `
<style>
    
</style>
`;

class CustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template + style;
    }
}

customElements.define('custom-el', CustomElement);

export default CustomElement;
