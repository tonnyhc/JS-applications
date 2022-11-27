import {render, html} from '../../node_modules/lit-html/lit-html.js';
import { editPetById } from '../data/pets.js';
import page from '../../node_modules/page/page.mjs';

const root = document.getElementById('content');

function createEditTemp(pet){
    return html`
            <section id="editPage">
            <form id=${pet._id} class="editForm" @submit=${onSubmit}>
                <img src="${pet.image}">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${pet.name}">
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${pet.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${pet.age}">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${pet.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>`
}


export function renderEdit(pet){
    render(createEditTemp(pet), root)
}


async function onSubmit(e){
    e.preventDefault();
    const form = e.target;
    const id = form.id
    const {name, breed, age, weight, image} = Object.fromEntries(new FormData(form));
    if (!name || !breed ||!age || !weight ||!image){
        alert("All fields must be filled");
        return;
    }
    const body = {name, breed, age, weight, image};
    const data = await editPetById(id, body);
    page.redirect(`/details:${id}`)
    return data;
}