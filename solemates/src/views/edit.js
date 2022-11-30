import {html} from '../../node_modules/lit-html/lit-html.js';
import { getShoeById, updateShoe } from '../data/shoes.js';

let context;

function createEditView(shoe){
    return html`
     <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form id=${shoe._id} class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value = "${shoe.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value = "${shoe.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value = "${shoe.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value = "${shoe.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value = "${shoe.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value = "${shoe.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`
}

export async function renderEdit(ctx){
  const id = ctx.path.split('/edit/')[1];
  const shoe = await getShoeById(id)
  context = ctx;
  ctx.render(createEditView(shoe));
}


async function onSubmit(e){
  e.preventDefault()
  const form = e.target;
  const id = form.id
  const {brand,  model, imageUrl, release, designer, value} = Object.fromEntries(new FormData(form));
  
  if (!brand || !model || !imageUrl || !release ||! designer ||! value){
    return alert('All fields must be filled!');
  }

  const body = {brand, model, imageUrl, release, designer, value};
  form.reset();
  const data = await updateShoe(id, body);
  context.page.redirect('/dashboard');
  return data;
}