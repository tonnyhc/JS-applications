import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const root = document.querySelector('#allCats');


const catTemplate = html`
<ul>
    ${cats.map(cat => createCatCard(cat))};
</ul>`;

render(catTemplate, root);

function createCatCard(cat) {
    const li = html`<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${onClick} class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`

return li;
}

function onClick(e){
    const statusDiv = e.target.parentElement.querySelector('.status');
    if (statusDiv.style.display == 'none'){
        statusDiv.style.display = 'block';
        e.target.textContent = 'Hide status code';
    } else {
        statusDiv.style.display = 'none';
        e.target.textContent = 'Show status code';
    }

}

