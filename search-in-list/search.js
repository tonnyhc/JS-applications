import { render, html } from './node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';

const root = document.querySelector('#towns');
const resultRoot = document.querySelector('#result');
document.querySelector('button').addEventListener('click', search)


update();

function searchTemplate(townsName, match){
   const ul = html`
   <ul>
      ${townsName.map(town => createLiTemplate(town, match))}
   </ul>`
   return ul
}


function createLiTemplate(town, match){
   return html`<li class="${town.includes(match) ? "active" : "" }">${town}</li>`
}


function update(match){
   const ul = searchTemplate(towns, match)
   render(ul, root)
   updateCount();
}

function search() {
   const inputField = document.querySelector('#searchText');
   const input = inputField.value;
   if (input == ''){
      return update(null);
   }
   update(input)
}

function updateCount(){
   const count = document.querySelectorAll('.active').length;
   const countText = html`<p>${count} matches found</p>`
   render(countText, resultRoot);
}
