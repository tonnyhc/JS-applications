import { render, html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs'
import { put } from '../api/api.js';
import { getItemById } from '../data/catalogItems.js';


function createEditTemp(item) {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit} id=${item._id}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value="${item.make}">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model" value="${item.model}">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year" value="${item.year}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                        value="${item.description}">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value="${item.price}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value="${item.img}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>`
}

const root = document.querySelector('.container');
export async function renderEdit(e, ctx) {
    if (e) {
        e.preventDefault();
    }
    const itemId = e.target.parentElement.id
    const item = await getItemById(itemId)
    render(createEditTemp(item), root);
}


async function onSubmit(e) {
    e.preventDefault();
    const id = e.target.id;
    const url = 'data/catalog/' + id;
    const form = e.target;
    const { make, model, year, description, price, img, material } = Object.fromEntries(new FormData(form));
    if (make.length < 4 || model.length < 4 || year < 1950 || year > 2050 || description.length < 10 || price < 0 || !img) {
        return;
    }
    const body = { make, model, year, description, price, img, material };
    const data = put(url, body);
    page.redirect('/')
    return data;
}


