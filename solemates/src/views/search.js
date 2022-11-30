import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {  searchShoes } from '../data/shoes.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { createShoeCard } from './dashboard.js';
import { getUserData } from '../data/handleUserData.js';

function createSearchView(){
    return html`
            <section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${onSubmit} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            <h2>There are no results found.</h2>
           
          </div>
        </section>`
}


export function renderSearch(ctx){
  ctx.render(createSearchView());
}


async function onSubmit(e){
  e.preventDefault();
  const form = e.target
  const {search} = Object.fromEntries(new FormData(form));
  if (!search){
    return alert("You must write some search parameters!");
  }

  const shoes = await searchShoes(search);
  renderFoundShoes(shoes);
  return shoes
}


function shoeWrapper(shoes){
  return html`
  <ul class="card-wrapper">
    ${repeat(shoes, shoe => createShoeCard(shoe))}
  </ul>`
}


function renderFoundShoes(shoes){      
  const root = document.getElementById('search-container');
  const user = getUserData();
  if (shoes.length > 0 ){
    render(shoeWrapper(shoes), root);
  } else{
    render(html`<h2>There are no results found.</h2>`, root)
  }
  if (!user){
    document.querySelectorAll('.details-btn').forEach(el => el.remove());
  }
}




// Display a li with information about every post (if any)
//               <li class="card">
//                 <img src="./images/travis.jpg" alt="travis" />
//                 <p>
//                   <strong>Brand: </strong><span class="brand">Air Jordan</span>
//                 </p>
//                 <p>
//                   <strong>Model: </strong
//                   ><span class="model">1 Retro High TRAVIS SCOTT</span>
//                 </p>
//                 <p><strong>Value:</strong><span class="value">2000</span>$</p>
//                 <a class="details-btn" href="">Details</a>
//               </li>