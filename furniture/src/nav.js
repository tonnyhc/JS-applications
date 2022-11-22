import {render} from '../node_modules/lit-html/lit-html.js';

const root = document.querySelector('nav');
const userSection = document.getElementById('user');
const guestSection = document.getElementById('guest');
export function checkNav(){

    const user = sessionStorage.getItem('userData');
    if (user){
        guestSection.remove();
        render(userSection, root)
    } else {
        userSection.remove();
        render(guestSection, root);
    }
}