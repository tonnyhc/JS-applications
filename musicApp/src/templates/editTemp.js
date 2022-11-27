import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCatalogById, updateCatalog } from '../data/catalogs.js';

let context;

function createEditTemp(catalog) {
    return html`
        <section class="editPage">
            <form @submit=${onSubmit} id=${catalog._id}>
                <fieldset>
                    <legend>Edit Album</legend>
        
                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value="${catalog.name}">
        
                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${catalog.imgUrl}">
        
                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value="${catalog.price}">
        
                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${catalog.releaseDate}">
        
                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value="${catalog.artist}">
        
                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value="${catalog.genre}">
        
                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${catalog.description}</textarea>
        
                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`
}

export async function renderEdit(ctx){
    const id = ctx.path.split('/edit/')[1];
    const catalog = await getCatalogById(id)
    context = ctx;
    ctx.render(createEditTemp(catalog));
}

async function onSubmit(e){
    e.preventDefault();
    const form = e.target;
    const id = form.id;
    const {name, imgUrl, price, releaseDate, artist, genre, description} = Object.fromEntries(new FormData(form));

    if (!name || !imgUrl || !price || !releaseDate || !artist ||!genre ||!description){
        alert("All fields must be filled");
        return;
    }

    const body = {name, imgUrl, price, releaseDate, artist, genre, description};

    const data = await updateCatalog(id, body);
    context.page.redirect('/catalog');
    return data;
}