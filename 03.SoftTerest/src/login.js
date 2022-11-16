import { requester } from "./api.js";
import { onHome } from "./home.js";
import { loginBtn, navBar } from "./nav.js";
import { setUserData } from "./utils.js";

const section = document.querySelector('#login-page');
const main = document.querySelector('main');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', loginUser)

export function onLogin(e) {
    e.preventDefault();
    navBar();
    loginBtn.classList.add('active');
    main.replaceChildren(section);
}

async function loginUser(e) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(form));
    try {
        const data = await requester("POST", 'users/login', body);
        setUserData(data);
        onHome();

    } catch (err){
        alert(err.message);
        throw err;
    }

}