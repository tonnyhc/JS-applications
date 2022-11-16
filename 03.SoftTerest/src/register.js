import { navBar, registerBtn } from './nav.js';
import { requester } from './api.js';
import { onHome } from './home.js';
import { setUserData } from './utils.js';

const section = document.querySelector('#register-page');
section.remove();
const main = document.querySelector('main');

const form = section.querySelector('form')

export function onRegister(e) {
    e.preventDefault();
    navBar();
    main.replaceChildren(section);
    registerBtn.classList.add('active');
    form.addEventListener('submit', registerUser)
}

async function registerUser(e) {
    e.preventDefault();
    const { email, password, repeatPassword } = Object.fromEntries(new FormData(form));
    try {
        if (email.length < 3 || password.length < 3 || password !== repeatPassword) {
            throw new Error('Validation error');
        }

        const body = {email, password}

        const userData = await requester("POST", 'users/register', body);
        setUserData(userData);
        return onHome();
    } catch (err) {
        alert(err.message)
    }
}