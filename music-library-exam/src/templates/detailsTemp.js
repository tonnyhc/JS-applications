import { html } from '../../node_modules/lit-html/lit-html.js';
import { get } from '../api/api.js';
import { getAlbumById, deleteAlbumById, likeAlbum, getLikesPerAlbum, getLikesPerAlbumForUser } from '../data/albums.js';
import { getUserData } from '../data/handleUserData.js';

let context;

function createDetailsView(album, likes, isUserLiked) {
  return html`
          <!-- Details page -->
          <section id="details">
            <div id="details-wrapper">
              <p id="details-title">Album Details</p>
              <div id="img-wrapper">
                <img src="${album.imageUrl}" alt="example1" />
              </div>
              <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                  <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
              </div>
              <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
          
              <!--Edit and Delete are only for creator-->
              <div class=${album._id} id="action-buttons">
                ${isUserLiked ? "" : html`<a @click=${onLike} class="non-author" href="#" id="like-btn">Like</a>`}
                <a class="author" href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} class='author' href="#" id="delete-btn">Delete</a>
              </div>
            </div>
          </section>`
}

export async function renderDetails(ctx) {
  context = ctx;
  const id = ctx.path.split('/details/')[1];
  const album = await getAlbumById(id);

  let likedUserId;
  const userData = getUserData()
  if (userData){
    likedUserId = userData.id
  }

  const likes = await getLikesPerAlbum(album._id);
  const isUserLiked= await getLikesPerAlbumForUser(album._id, likedUserId)
  ctx.render(createDetailsView(album, likes, isUserLiked));

  const ownerId = album._ownerId;
  const user = getUserData();
  let userId;
  if (user) {
    userId = user.id;
  }
  if (!user){
    document.getElementById('action-buttons').remove();
  }
  if (userId == ownerId){
    document.querySelector('.non-author').remove();
  }
  if (userId != ownerId){
    document.querySelectorAll('.author').forEach(a => a.remove());
  }

}

async function onDelete(e){
  e.preventDefault();
  const id = e.target.parentElement.className;
  const data = await deleteAlbumById(id);
  context.page.redirect('/dashboard')
  return data;
}

async function onLike(e){
  e.preventDefault();
  const albumId = e.target.parentElement.className;
  const body = {
    albumId: albumId
  }
  const data = await likeAlbum(body);
  context.page.redirect(`/details/${albumId}`)
  return data;

  }