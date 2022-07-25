
class SearchStockItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    connectedCallback() {
        const table = this.shadowRoot.querySelector("#tableSearch")
        document.addEventListener("searchstock", e => {
            e.preventDefault()
            e.stopImmediatePropagation()
            const url = 'http://localhost:4040//searchstock';
            let data = e.detail.data
            if (data.id.value) {
                data = { search: { id: data.id.value } }
            } else if (data.name.value) {
                data = { search: { name: data.name.value } }
            } else if (data.reference.value) {
                data = { search: { reference: data.reference.value } }
            } else if (data.type.value === 'all') {
                data = { search: { all: "" } }
            }
            fetch(url, {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify(data)
            }).then(response => {
                response.json().then((e) => {
                    const errorview = this.shadowRoot.querySelector("#errorstock")
                    if (!e) {
                        errorview.style.display = 'block';
                        table.style.display = 'none';
                    } else {
                        errorview.style.display = 'none';
                        this.getTable(e)
                        //table.style.display = 'inline';
                    }

                })
            })
        })


    }

    getTable(data) {
        const table = this.shadowRoot.querySelector("#tableSearch")
        table.style.display = 'inline';
        if (data.length > 1) {
            for (let count in data) {
                let soloData = data[count]
                var tr = table.insertRow(-1);
                var idCell = tr.insertCell(-1)
                idCell.innerHTML = data[count]._id
                for (let entry in soloData.stockItem) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = soloData.stockItem[entry]
                }
            }
        } else {
            var tr = table.insertRow(-1);
            var idCell = tr.insertCell(-1)
            idCell.innerHTML = data._id
            for (let entry in data.stockItem) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data.stockItem[entry]
            }
        }
    }

    disconnectedCallback() {
        document.removeEventListener("searchstock", document)
    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();

    }

    getTemplate() {
        return `
        <div id="searchstockitem">
        <h1 id="errorstock"> Stock not found </h1>
            <table id="tableSearch"> 
                <tr id="headertable">
                    <th>_Id</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Reference</th>
                    <th>Date</th>
                </tr>
            </table>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() {
        return `
        <style>

        #headertable {
            background-color: LightGrey;
            border: 1px solid black;
            padding: 2px
        }

        #searchstockitem{
            text-align: center;
        }

        #errorstock {
            color: Maroon;
        }

        #tableSearch {            
            margin-left: auto;
            margin-right: auto;
        }

        td {
            font-size: 20px;
            background-color: GhostWhite;
        }

        #h2 {
            font-family: Arial;
            color: GhostWhite;
        }

        </style>
        `
    }
}

customElements.define("search-stockitem", SearchStockItem);