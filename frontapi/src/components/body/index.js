import './nav/index.js';
import './create-stockitem/index.js';
import './search-stockitem/index.js';
import './update-stockitem/index.js';
import './delete-stockitem/index.js';
class BodyMain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    connectedCallback() {
        const resetbodyComp = this.shadowRoot.querySelector("#reset-divcomponents")

        const divcomp = this.shadowRoot.querySelector("#divcomp") // <div> que vai servir os componentes, esta vazia

        const navbody = this.shadowRoot.querySelector("#navbody") //Componente <nav-body>
        const snav = navbody.shadowRoot.querySelector("#nav-search") // <a> Search
        const cnav = navbody.shadowRoot.querySelector("#nav-create")
        const unav = navbody.shadowRoot.querySelector("#nav-update")
        const dnav = navbody.shadowRoot.querySelector("#nav-delete")

        var searchComp = document.createElement('search-stockitem'); //Criar o componente -> <search-stockitem>
        var createComp = document.createElement('create-stockitem'); //Criar o componente -> <search-stockitem>
        var updateComp = document.createElement('update-stockitem'); //Criar o componente -> <search-stockitem>
        var deleteComp = document.createElement('delete-stockitem'); //Criar o componente -> <search-stockitem>

        const form = this.shadowRoot.querySelector("#form-body")
        const formData = {
            id: form.querySelector("#id"),
            name: form.querySelector("#name"),
            reference: form.querySelector("#reference"),
            quantity: form.querySelector("#quantity"),
            type: form.querySelector("#type")
        }

        snav.addEventListener("click", e => { //Ao fazer um click adiciona o componente 'search-stockitem'
            e.preventDefault() //cancela a href
            if (formData.id || formData.name || formData.reference) {
                divcomp.appendChild(searchComp) //Componente a ser adicionada
                document.dispatchEvent(new CustomEvent("searchstock", { detail: { data: formData }, bubbles: false }))
            } else {
                alert(`error`)
            }

        })

        cnav.addEventListener("click", e => { //Ao fazer um click adiciona o componente 'create-stockitem'
            e.preventDefault() //cancela a href
            if (formData.name && formData.type) {
                divcomp.appendChild(createComp) //Componente a ser adicionada
                document.dispatchEvent(new CustomEvent("createstock", { detail: { data: formData } }))
            } else {
                alert(`error`)
            }
        })

        unav.addEventListener("click", e => { //Ao fazer um click adiciona o componente 'update-stockitem'
            e.preventDefault() //cancela a href
            if (formData && formData.id) {
                divcomp.appendChild(updateComp) //Componente a ser adicionada
                document.dispatchEvent(new CustomEvent("updatestock", { detail: { data: formData } }))
            } else {
                alert(`error`)
            }

        })

        dnav.addEventListener("click", e => { //Ao fazer um click adiciona o componente 'delete-stockitem'
            e.preventDefault() //cancela a href
            if (formData.id || formData.name || formData.reference) {
                divcomp.appendChild(deleteComp) //Componente a ser adicionada
                document.dispatchEvent(new CustomEvent("deletestock", { detail: { data: formData } }))
            } else {
                alert(`error`)
            }

        })

        resetbodyComp.addEventListener("click", e => {
            e.preventDefault()//cancela a href
            searchComp.remove() //Componente a ser removida
            createComp.remove() //Componente a ser removida
            updateComp.remove() //Componente a ser removida
            deleteComp.remove() //Componente a ser removida

        })

    }

    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    getTemplate() { //Template
        return `
        <div>
            <nav-body id="navbody" ></nav-body>
            <form id="form-body">
                <label for="id">Id:</label>
                <input type="text" id="id">

                <label for="name">Name:</label>
                <input type="text" id="name">

                <label for="reference">Reference:</label>
                <input type="text" id="reference">

                <label for="quantity">Quantity:</label>
                <input type="text" id="quantity">

                
                <label for="type">Type:</label>
                <input type="text" id="type">

                

                <input type="reset" id="reset">
            </form>
            <div id="divcomp">
                <input type="reset" id="reset-divcomponents" value="Clear view">
            </div>
        </div>
        ${this.getStyles()}
        `
    }

    getStyles() { //Styles do template
        return `
        <style>

        input#name, input#quantity, input#reference, input#type, input#id{
            margin-right: 3px;
        }

        #resetbodyComp {
            color: lightblack;
        }

        #divcomp {
            display: block;
        }

        #reset-divcomponents {
            margin-top: 5px;
            margin-bottom: 5px;
            color: blue;
            padding: 5px;
            cursor: pointer;
            

        }

        </style>
        `
    }
}

customElements.define("main-body", BodyMain) 