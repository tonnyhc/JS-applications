import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../data/catalogItems.js';
import {renderEdit} from './edit.js';
import page from '../../node_modules/page/page.mjs';
const root = document.querySelector('.container')

function detailsTemplate(item){
    return html` <div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        <div class="buttons" id=${item._id}>
            <a href=”#” @click=${renderEdit} class="btn btn-info">Edit</a>
            <a href=”#” @click=${onDelete} class="btn btn-red">Delete</a>
        </div>
    </div>
</div>`
}


export async function renderDetails(e){
    e.preventDefault();
    const itemId = e.target.id;
    const item = await getItemById(itemId);
    const ownerId = e.target.parentElement.querySelector('p').id;
    render(detailsTemplate(item), root);
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if(!user){
        document.querySelector('.buttons').remove();
        return
    }
    const userId = user.id;
    if (userId !== ownerId){
        document.querySelector('.buttons').remove();
    }
}

function onDelete(e){
    e.preventDefault();
    const confirmation = confirm('Are you sure you want to delete your item ?');
    const id = e.target.parentElement.id;
    if (!confirmation){
        return;
    }
    const data = deleteItem(id);
    page.redirect('/');
    return data;

}


