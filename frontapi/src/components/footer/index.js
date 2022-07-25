

class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
        <div>
            <h5>Yepkit Stock Itens - Sadiq.developer</h5>
            <a href="https://www.yepkit.com/">https://www.yepkit.com/</a>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() {
        return `
        <style>

        h5{
            font-family: 'Roboto', sans-serif;
        }

        a{
            color: blue;
        }

        </style>
        `
    }
}

customElements.define("site-footer", SiteFooter)