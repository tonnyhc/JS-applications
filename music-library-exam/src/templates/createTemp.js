import { html } from '../../node_modules/lit-html/lit-html.js';
import { createAlbum } from '../data/albums.js';

let context;

function createCreateView() {
  return html`
          <section id="create">
            <div class="form">
              <h2>Add Album</h2>
              <form class="create-form" @submit=${onCreate}>
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
                <input type="text" name="album" id="album-album" placeholder="Album" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
                <input type="text" name="release" id="album-release" placeholder="Release date" />
                <input type="text" name="label" id="album-label" placeholder="Label" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" />
          
                <button type="submit">post</button>
              </form>
            </div>
          </section>`
}

async function onCreate(e) {
  e.preventDefault();
  const form = e.target;
  const { singer, album, imageUrl, release, label, sales } = Object.fromEntries(new FormData(form));
  if (!singer || !album || !imageUrl || !release || !label || !sales) {
    return alert("All fields must be filled!");
  }
  const body = { singer, album, imageUrl, release, label, sales };
  const data = await createAlbum(body);
  context.page.redirect('/dashboard');
  return data;

}


export function renderCreate(ctx) {
  context = ctx;
  ctx.render(createCreateView());
}