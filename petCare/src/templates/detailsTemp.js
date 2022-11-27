import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getUserId } from '../auth/handleUserData.js';
import { deletePetById, donate, getPetById, getPetDonations } from '../data/pets.js';
import { renderEdit } from './editTemp.js';
const root = document.getElementById('content');

function createDetailsTemp(pet, donation) {
    return html`
            <section id="detailsPage">
                <div class="details">
                    <div class="animalPic">
                        <img src="${pet.image}">
                    </div>
                    <div>
                        <div class="animalInfo">
                            <h1>Name: ${pet.name}</h1>
                            <h3>Breed: ${pet.breed}</h3>
                            <h4>Age: ${pet.age}</h4>
                            <h4>Weight: ${pet.weight}</h4>
                            <h4 class="donation">Donation: ${donation}$</h4>
                        </div>
                        <!-- if there is no registered user, do not display div-->
                        <div id=${pet._id} class="actionBtn">
                            <!-- Only for registered user and creator of the pets-->
                            <a @click=${onEdit} class='owner' href="/edit:${pet.id}" class="edit">Edit</a>
                            <a @click=${onDelete} class='owner' href="#" class="remove">Delete</a>
                            <!--(Bonus Part) Only for no creator and user-->
                            <a class="donate" @click=${onDonate} href="#" class="donate">Donate</a>
                        </div>
                    </div>
                </div>
            </section>`
}


export async function renderDetails(pet) {
    const ownerId = pet._ownerId;
    const userId = getUserId();
    const donation = await getPetDonations(pet.id);
    render(createDetailsTemp(pet, donation), root)
    if (!userId) {
        document.querySelector('.actionBtn').remove();
    }
    if (userId !== ownerId) {
        document.querySelectorAll('.owner').forEach(item => item.remove())
    }
    if (userId == ownerId) {
        document.querySelector('.donate').remove();
    }
}


async function onEdit(e) {
    e.preventDefault();
    const id = e.target.parentElement.id;
    const pet = await getPetById(id);
    renderEdit(pet);
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.parentElement.id;
    const conf = confirm("Are you sure you want to delete your pet?");
    if (conf) {
        const data = await deletePetById(id);
        page.redirect('/');
        return data;
    }
    return;
}

async function onDonate(e){
    e.preventDefault();
    const id = e.target.parentElement.id;
    const data = await donate(id);
    debugger;
}