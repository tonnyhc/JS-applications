import {html} from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../data/handleUserData.js';
import { deleteShoe, getShoeById } from '../data/shoes.js';

let context;

function createDetailsView(shoe, isOwner){
    return html`
        <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${shoe.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${isOwner? html`<div id="action-buttons">
              <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
              <a id=${shoe._id} @click=${onDelete} href="" id="delete-btn">Delete</a>
            </div>` : "" }
            
          </div>
        </section>
`
}

export async function renderDetails(ctx){
  const user = getUserData();
  const id = ctx.path.split('/details/')[1];
  const shoe = await getShoeById(id)
  let isOwner = false;
  if (user){
    if (user.id == shoe._ownerId){
      isOwner = true
    }
  }
  
  ctx.render(createDetailsView(shoe, isOwner));
  context = ctx;
}


async function onDelete(e){
  e.preventDefault();
  const id = e.target.id;
  const conf= confirm('Are you sure you want to delete your shoe?');
  if (!conf){
    return;
  }
  const data = await deleteShoe(id);
  context.page.redirect('/dashboard')
  return data;
}
