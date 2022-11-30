import {html} from '../../node_modules/lit-html/lit-html.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { getShoes } from '../data/shoes.js';


function createDashboardView(shoes){
  if (shoes.length > 0){
    return html`
            <section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            ${repeat(shoes, shoe => createShoeCard(shoe))}
          </ul>
        </section>`
  } 
  return html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    <!-- Display an h2 if there are no posts -->
    <h2>There are no items added yet.</h2>
  </section>
  `
}

export function createShoeCard(shoe){
  return html`
              <li class="card">
              <img src="${shoe.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoe.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
              <a class="details-btn" href="/details/${shoe._id}">Details</a>
            </li>`
}

export async function renderDashboard(ctx){
  const shoes = await getShoes();
  ctx.render(createDashboardView(shoes));
}