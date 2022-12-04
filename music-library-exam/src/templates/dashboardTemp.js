import { html } from '../../node_modules/lit-html/lit-html.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { getAlbums } from '../data/albums.js';

function createDashboardView(albums) {
  let albumsHave = false
  if (albums.length > 0){
    albumsHave = true
  }
  return html`
          <!-- Dashboard page -->
          <section id="dashboard">
            <h2>Albums</h2>
            ${albumsHave? html`<ul class="card-wrapper">
              ${repeat(albums, album => createAlbumCard(album))}
            </ul>` : html`<h2>There are no albums added yet.</h2>`}
          
            <!-- Display an h2 if there are no posts -->
            <!-- <h2>There are no albums added yet.</h2> -->
          </section>`
}

function createAlbumCard(album) {
  return html`
                <li class="card">
                  <img src="${album.imageUrl}" alt="travis" />
                  <p>
                    <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
                  </p>
                  <p>
                    <strong>Album name: </strong><span class="album">${album.album}</span>
                  </p>
                  <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
                  <a class="details-btn" href="/details/${album._id}">Details</a>
                </li>`
}

export async function renderDashboard(ctx) {
  const albums = await getAlbums();
  ctx.render(createDashboardView(albums));
}