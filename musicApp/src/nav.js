import { render, html } from '../node_modules/lit-html/lit-html.js';
import {onLogout} from './data/logout.js'
const root = document.querySelector('header nav ul')

function createGuestNav() {
    return html`
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>
    <!--Only guest-->
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`
}

function createUserNav(){
    return html`
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>
    <li><a href="/create">Create Album</a></li>
    <li @click=${onLogout}><a href="#">Logout</a></li>
    `
}

export function renderNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData){
        return render(createUserNav(), root);
    }
    return render(createGuestNav(), root);
}

