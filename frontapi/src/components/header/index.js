

class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }


    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
        <div>
            <h2>Yepkit Stock Item</h2>  
        </div>
        ${this.getStyles()}
        `;
    }

    getStyles() {
        return `
        <style>

        h2{
            font-family: 'Roboto', sans-serif;
        }

        </style>
        `;
    }
}

customElements.define("site-header", SiteHeader);