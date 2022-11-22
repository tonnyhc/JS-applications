import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { getItems } from '../data/catalogItems.js';
import { checkNav } from '../nav.js';
import { renderDetails } from './detail.js';

function createCatalogTemplate(items){
    return html` <div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${repeat(items, item => createCatalogCard(item))}     
</div>`
}


function createCatalogCard(item){
    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src="${item.img}" />
                    <p>${item.description}</p>
                    <footer>
                        <p>Price: <span>${item.price} $</span></p>
                    </footer>
                    <div>
                        <a href="#"  id=${item._id} @click=${renderDetails} class="btn btn-info">Details</a>
                        <p style='display: none' id=${item._ownerId}></p>
                    </div>
            </div>
        </div>`
}

export async function catalogView(ctx, next){
    checkNav();
    const container = document.querySelector('.container')
    const items = await getItems();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    document.querySelector('#catalogLink').classList.add('active')
    render(createCatalogTemplate(items), container)
}


