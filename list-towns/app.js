import { html, render } from './node_modules/lit-html/lit-html.js';


const root = document.getElementById('root');
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);


function onSubmit(e){
    e.preventDefault();
    const {towns} = Object.fromEntries(new FormData(form));
    if (!towns) {
        return
    }
    form.reset();
    const townsArr = towns.split(', ');
    renderTownsList(townsArr);
}

function renderTownsList(data){
    const result = createTownList(data);
    render(result, root);
    
}


function createTownList(data){
    const ul = html`
    <ul>
        ${data.map(el => html`<li>${el}</li>`)}
    </ul>`
    return ul;
}