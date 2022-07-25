
class NavHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }


    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }


    connectedCallback() {
    }

    getTemplate() {
        return `
        <div>
            <a href="/search" id="nav-search">Search</a>
            <a href="/create" id="nav-create">Create Stock</a>
            <a href="/update" id="nav-update">Upgrade Stock</a>
            <a href="/delelete" id="nav-delete">Delete Stock</a>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() {
        return `
        <style>

        a {
            background-color: lightblue;;
            font-size: 25px;
            color: black;
            text-decoration: none;
            padding: 7px;
            border: 1px solid black; 
            margin-left: 20px;
            margin-right: 20px; 
        }

        div {
            text-align: center;
            padding: 10px;
        }

        </style>
        `

    }

}

customElements.define("nav-body", NavHeader)