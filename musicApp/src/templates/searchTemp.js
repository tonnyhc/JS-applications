import { html, render } from '../../node_modules/lit-html/lit-html.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { search } from '../data/catalogs.js';
import { getUserData } from '../data/handleUserData.js';
let context;

function createSearchTemp() {
    return html`
            <section id="searchPage">
                <h1>Search by Name</h1>
            
                <div class="search">
                    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                    <button @click=${onClick} class="button-list">Search</button>
                </div>
            
                <h2>Results:</h2>
                <div class="search-result">
        
                </div>
            </section>`
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
    </div>`
}


export function renderSearch(ctx) {
    context = ctx;
    ctx.render(createSearchTemp());
}


async function onClick(e) {
    e.preventDefault();
    const input = e.target.parentElement.querySelector('input').value;

    if (!input) {
        alert("Input field must be filled");
        return;
    }
//  ${repeat(catalogs, catalog => createCatalogCard(catalog))}
    const catalogs = await search(input);
    const searchRoot = document.querySelector('.search-result');

    if (catalogs.length == 0){
        return render(html`<p class="no-result">No result.</p>`, searchRoot);
    }
    const catalogCards = catalogs.map(catalog => createCatalogCard(catalog));
    render(catalogCards, searchRoot);
    
    const user = getUserData();
    if (!user){
        document.querySelectorAll('.btn-group').forEach(group => group.remove());
    }
}