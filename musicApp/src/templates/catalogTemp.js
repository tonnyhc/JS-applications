import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getCatalogs } from '../data/catalogs.js';

function createCatalogTemp(catalogs) {
    if (catalogs.length > 0) {
        return html`
            <section id="catalogPage">
                <h1>All Albums</h1>
                ${repeat(catalogs, catalog => createCatalogCard(catalog))}
            </section>
    `
    } else {
        return html`
        <section id="catalogPage">
            <h1>All Albums</h1>
            <p>No Albums in Catalog!</p>
        
        </section>
`
    }
}

function createCatalogCard(catalog) {
    return html`
    <div class="card-box">
        <img src="${catalog.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${catalog.name}</p>
                <p class="artist">Artist: ${catalog.artist}</p>
                <p class="genre">Genre: ${catalog.genre}</p>
                <p class="price">Price: $${catalog.price}</p>
                <p class="date">Release Date: ${catalog.releaseDate}</p>
            </div>
            <div class="btn-group">
                <a href="/details/${catalog._id}" id="details">Details</a>
            </div>
        </div>
    </div>
    `
}

export async function renderCatalog(ctx) {
    const catalogs = await getCatalogs();
    const user = JSON.parse(sessionStorage.getItem("userData"));
    ctx.render(createCatalogTemp(catalogs, user));

    
    if (!user){
        document.querySelectorAll('.btn-group').forEach(group => group.remove());
    }
}