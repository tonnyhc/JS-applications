import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteCatalog, getCatalogById } from '../data/catalogs.js';
import { getUserData } from '../data/handleUserData.js';
let context;

function createDetailsTemp(catalog) {
    return html`
            <!--Details Page-->
            <section id="detailsPage">
                <div class="wrapper">
                    <div class="albumCover">
                        <img src="${catalog.imgUrl}">
                    </div>
                    <div class="albumInfo">
                        <div class="albumText">
            
                            <h1>Name: ${catalog.name}</h1>
                            <h3>Artist: ${catalog.artist}</h3>
                            <h4>Genre: ${catalog.genre}</h4>
                            <h4>Price: $${catalog.price}</h4>
                            <h4>Date: ${catalog.releaseDate}</h4>
                            <p>Description: ${catalog.description}</p>
                        </div>
            
                        <!-- Only for registered user and creator of the album-->
                        <div class="actionBtn">
                            <a href="/edit/${catalog._id}" class="edit">Edit</a>
                            <a @click=${onDelete} id=${catalog._id} href="#" class="remove">Delete</a>
                        </div>
                    </div>
                </div>
            </section>`
}


export async function renderDetails(ctx){
    context = ctx;

    const id = ctx.path.split('/details/')[1];
    const catalog = await getCatalogById(id);
    const user = getUserData();
    let userId;
    if (user){
        userId = user.id;
    }
    ctx.render(createDetailsTemp(catalog));
    if (userId !== catalog._ownerId){
        document.querySelector('.actionBtn').remove();
    }

    
}

async function onDelete(e){
    e.preventDefault();
    const id = e.target.id;
    const data = await deleteCatalog(id);
    context.page.redirect('/catalog');
    return data;
}