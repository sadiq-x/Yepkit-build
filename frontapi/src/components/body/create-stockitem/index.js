class CreateStockItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    connectedCallback() {
        const h2 = this.shadowRoot.querySelector("#h2")
        document.addEventListener("createstock", e => {
            e.preventDefault()
            e.stopImmediatePropagation()
            const url = 'http://localhost:4040/insertstock';
            let data = { stockItem: { type: e.detail.data.type.value, name: e.detail.data.name.value, quantity: e.detail.data.quantity.value, reference: e.detail.data.reference.value } }
            fetch(url, {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify(data)
            }).then(response => {
                response.json().then((e) => {
                    if (!e) {
                        h2.innerHTML = `Error, invalid data`
                    } else {
                        h2.innerHTML = `Susseful, _id: , ${e}`
                    }
                })
            })
        })
    }

    disconnectedCallback() {
        document.removeEventListener("createstock", document)
    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();

    }

    getTemplate() {
        return `
        <div id="createstockitem">
        <h2 id="h2"> </h2>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() {
        return `
        <style>

        #createstockitem{
            display: block;
        }

        #h2 {
            font-family: Arial;
            color: GhostWhite;
        }
        
        </style>
        `
    }
}

customElements.define("create-stockitem", CreateStockItem);