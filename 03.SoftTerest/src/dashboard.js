import { requester } from "./api.js";
import { dashboardBtn, navBar } from "./nav.js";
import {onDetails} from './details.js'

const section = document.querySelector('#dashboard-holder');
const main = document.querySelector('main');
section.remove();

const noIdeas = section.querySelector('#no-ideas');
noIdeas.remove();


export function onDashboard(e){
    if (e){
        e.preventDefault();
    }
    dashboardBtn.classList.add('active');
    navBar();
    main.replaceChildren(section);
    return getIdeas();
}

async function getIdeas(){
    const url = 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc'
    const response = await requester("GET", url);
    const data = await response;
    return renderIdeas(data)
}

async function renderIdeas(data){
    const ideas = await data;
    section.innerHTML = '';
    if (!ideas) {
        return section.appendChild(noIdeas);
    }

    ideas.forEach(idea => {
        section.innerHTML += `<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                            <div class="card-body">
                                <p class="card-text">${idea.title}</p>
                            </div>
                            <img class="card-image" src="${idea.img}" alt="Card image cap">
                            <a class="btn" id="${idea._id}" data="${idea._ownerId}" href="">Details</a>
                        </div>`
    })
    section.querySelectorAll('a').forEach(button => button.addEventListener('click', onDetails));
}



