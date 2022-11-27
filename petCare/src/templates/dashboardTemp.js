import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getPets, getPetById } from '../data/pets.js';
import { renderDetails } from './detailsTemp.js';



const root = document.getElementById('content');
function createDashboardTemp(pets) {
    if (pets.length >0) {
        return html`<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${repeat(pets, pet => createPetCard(pet))}
        <!--If there is no pets in dashboard-->
    </div>
</section>`
    }
    else {
        return html`
        <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>
            </div>
        </section>
        `
    }
}


function createPetCard(pet) {
    return html` 
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${pet.image}">
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a @click=${onDetails} class="btn" href="/details:${pet._id}" id=${pet._id}>Details</a>
        </div>
    </div>
    `
}


export async function renderDashboard() {
    const pets = await getPets();
    render(createDashboardTemp(pets), root)
}


async function onDetails(e) {
    e.preventDefault();
    const id = e.target.id;
    const pet = await getPetById(id);
    renderDetails(pet);
}