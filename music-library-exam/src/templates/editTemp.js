import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAlbumById, updateAlbum } from '../data/albums.js';

let context;

function createEditView(album) {
  return html`
          <section id="edit">
            <div class="form">
              <h2>Edit Album</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${album.singer} />
                <input type="text" name="album" id="album-album" placeholder="Album" value=${album.album} />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${album.imageUrl} />
                <input type="text" name="release" id="album-release" placeholder="Release date" value=${album.release} />
                <input type="text" name="label" id="album-label" placeholder="Label" value=${album.label} />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${album.sales} />
          
                <button type="submit">post</button>
              </form>
            </div>
          </section>`
}

export async function renderEdit(ctx) {
  const id = ctx.path.split('/edit/')[1];
  const album = await getAlbumById(id);
  context = ctx;
  ctx.render(createEditView(album));
}

async function onEdit(e){
  e.preventDefault();
  const form = e.target;
  const id = context.path.split('/edit/')[1];
  const { singer, album, imageUrl, release, label, sales } = Object.fromEntries(new FormData(form));
  if (!singer || !album || !imageUrl || !release || !label || !sales) {
    return alert("All fields must be filled!");
  }
  const body = { singer, album, imageUrl, release, label, sales };
  const data = await updateAlbum(id, body);
  context.page.redirect(`/details/${id}`);
  return data;
}