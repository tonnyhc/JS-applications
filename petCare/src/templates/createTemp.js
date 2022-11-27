import {render, html} from '../../node_modules/lit-html/lit-html.js';
import { createPet } from '../data/pets.js';
import page from '../../node_modules/page/page.mjs';

const root = document.getElementById('content')
function createCreateTemp(){
    return html`        <section id="createPage">
    <form class="createForm" @submit=${onSubmit}>
        <img src="./images/cat-create.jpg">
        <div>
            <h2>Create PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" placeholder="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" placeholder="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" placeholder="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Create Pet</button>
        </div>
    </form>
</section>`
}

export function renderCreate(){
    render(createCreateTemp(), root)
}


async function onSubmit(e){
    e.preventDefault();
    const form = e.target;
    const {name, breed, age, weight, image} = Object.fromEntries(new FormData(form));

    if (!name || !breed || !age ||  !weight || !image){
        alert("All fields must be filled!");
        return
    }

    const body = {
        name, breed, age, weight, image
    }

    const data = await createPet(body);
    form.reset();
    page.redirect('/');
    return data;
}