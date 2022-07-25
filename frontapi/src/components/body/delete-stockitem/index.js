class DeleteStockItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    connectedCallback() {
        const h2 = this.shadowRoot.querySelector("#h2")
        document.addEventListener("deletestock", e => {
            e.preventDefault()
            e.stopImmediatePropagation()
            const url = 'http://localhost:4040/deletestock';
            let data = e.detail.data
            if (data.id.value) {
                data = { delete: { id: data.id.value } }
            } else if (data.name.value) {
                data = { delete: { name: data.name.value } }
            } else if (data.reference.value) {
                data = { delete: { reference: data.reference.value } }
            }
            fetch(url, {
                method: "DELETE",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify(data)
            }).then(response => {
                response.json().then((e) => {
                    if (!e) {
                        h2.innerHTML = `Error, invalid data`
                    } else {
                        console.log(e)
                        h2.innerHTML = `Susseful Delete`
                    }
                })
            })
        })



    }

    disconnectedCallback() {
        this.removeEventListener("deletestock", this)
    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();

    }

    getTemplate() {
        return `
        <div id="deletestockitem">
        <h2 id="h2"></h2>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() {
        return `
        <style>

        #h2 {
            font-family: Arial;
            color: GhostWhite;
        }

        #deletestockitem{
            display: block;
        }
        </style>
        `
    }
}

customElements.define("delete-stockitem", DeleteStockItem);