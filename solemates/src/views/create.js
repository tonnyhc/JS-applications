import {html} from '../../node_modules/lit-html/lit-html.js';
import { createShoe } from '../data/shoes.js';
let context;

function createCreateView(){
    return html`
            <section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`
}


export function renderCreate(ctx){
  context = ctx;
  ctx.render(createCreateView());
}


async function onSubmit(e){
  e.preventDefault();
  const form = e.target;
  const {brand,  model, imageUrl, release, designer, value} = Object.fromEntries(new FormData(form));
  
  if (!brand || !model || !imageUrl || !release ||! designer ||! value){
    return alert('All fields must be filled!');
  }

  const body = {brand, model, imageUrl, release, designer, value};
  form.reset();
  const data = await createShoe(body);
  context.page.redirect('/dashboard');
  return data

}