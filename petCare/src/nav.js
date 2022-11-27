import { html, render } from '../node_modules/lit-html/lit-html.js';
import {onLogout} from './data/handleLogOut.js'

function createGuestNav() {
    return html`
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`
}

function createUserNav() {
    return html`
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/create">Create Postcard</a></li>
    <li><a id="logout" @click=${onLogout} href="#">Logout</a></li>`
}

const root = document.querySelector('nav ul ');
export function checkNav() {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if (user){
        return render(createUserNav(), root);
    }
    render(createGuestNav(), root);

}