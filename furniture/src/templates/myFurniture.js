import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { getUserItems } from '../data/catalogItems.js';
import {renderDetails} from './detail.js'

function myFurnTemplate(items){
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${repeat(items, item=> myFurnCard(item))}
</div>`
}

function myFurnCard(item){
    return html`<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${item.img}" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="#" @click=${renderDetails} id=${item._id} class="btn btn-info">Details</a>
                    <p id=${item._ownerId} style="display: none"></p>
                </div>
        </div>
    </div>
</div>`
}

export async function myFurnitureView(){
    const user = JSON.parse(sessionStorage.getItem("userData"));
    const id = user.id;
    const items = await getUserItems(id)
    render(myFurnTemplate(items), document.querySelector('.container'))
}