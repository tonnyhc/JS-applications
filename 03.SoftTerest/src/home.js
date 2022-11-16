import { navBar } from "./nav.js";

const section = document.querySelector('#home-page');
section.remove();
const main = document.querySelector('main');



export function onHome(e) {
    navBar();
    if (e) {
        e.preventDefault();
    }
    main.replaceChildren(section);
}


