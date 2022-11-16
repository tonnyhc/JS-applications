import {requester} from './api.js'
import { onDashboard } from './dashboard.js';

const section = document.querySelector('.container.home.some');
section.remove();
const main = document.querySelector('main');

export function onDetails(e){
    e.preventDefault();
    main.replaceChildren(section);
    const id = e.target.id;
    return getRecipe(id);
}


async function getRecipe(id){
    const recipe = await requester('GET', `data/ideas/${id}`);
    return renderDetails(recipe);
}

async function renderDetails(data){
    const recipe = await data;
    const user = JSON.parse(sessionStorage.getItem('user'))
    let id;
    if(user){id=user.id};
    section.innerHTML = `<img class="det-img" src="${recipe.img}" />
    <div class="desc">
        <h2 class="display-5">${recipe.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${recipe.description}</p>
    </div>
    <div class="text-center">
        <a class="btn detb" id="${recipe._id}" href="">Delete</a>
    </div>`;

    const deleteBtn =section.querySelector('a');
    deleteBtn.addEventListener('click', onDelete);
    if (recipe._ownerId !== id){
        deleteBtn.remove();
    }
}

function onDelete(e){
    e.preventDefault();
    const id = e.target.id;
    deleteIdea(id);
    return onDashboard();
}

async function deleteIdea(id){
    const token = JSON.parse(sessionStorage.getItem('user')).accessToken;
    try{
    const data = await requester('DELETE', `data/ideas/${id}`, null, token);
    } catch (err){ alert(err.message)};
}