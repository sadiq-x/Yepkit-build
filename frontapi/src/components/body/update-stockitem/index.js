class UpdateStockItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    connectedCallback() {
        const h2 = this.shadowRoot.querySelector("#h2")
        document.addEventListener("updatestock", e => {
            e.preventDefault()
            e.stopImmediatePropagation()
            const url = 'http://localhost:4040/updatestock';
            let data = { id: e.detail.data.id.value, stockItem: { type: e.detail.data.type.value, name: e.detail.data.name.value, quantity: e.detail.data.quantity.value, reference: e.detail.data.reference.value } }
            if (data.id) {
                fetch(url, {
                    method: "PUT",
                    headers: new Headers({ "Content-Type": "application/json" }),
                    body: JSON.stringify(data)
                }).then(response => {
                    response.json().then((e) => {
                        if (!e) {
                            h2.innerHTML = `Error, invalid data`
                        } else {
                            h2.innerHTML = `Susseful Update, ${data.id}`
                        }
                    })
                })
            } else {
                h2.innerHTML = `Error, insert id`
            }
        })
    }

    disconnectedCallback() {
        this.removeEventListener("updatestock", this)
    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
        <div id="updatestockitem">
        <h2 id="h2"> </h2>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() {
        return `
        <style>

        #updatestockitem{
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

customElements.define("update-stockitem", UpdateStockItem);