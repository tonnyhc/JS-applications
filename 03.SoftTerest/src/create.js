import { requester } from "./api.js";
import { onHome } from "./home.js";
import { createBtn, navBar } from "./nav.js";

const section = document.querySelector('#create-page');
const main = document.querySelector('main');

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function onCreate(e) {
    createBtn.classList.add('active');
    navBar();
    e.preventDefault();
    main.replaceChildren(section)
}


async function onSubmit(e) {
    e.preventDefault();
    const token = JSON.parse(sessionStorage.getItem('user')).accessToken;
    const { title, description, imageURL } = Object.fromEntries(new FormData(form));
    form.reset();
    try {
        if (title.length < 6 || description.lenth < 10 || imageURL.length < 5) {
            throw new Error("Error!");
        }
        const body = { title, description, image:imageURL};
        const data = await requester("POST", 'data/ideas/', body, token);
        return onHome();

    } catch (err) {
        alert(err.message);
    }

}