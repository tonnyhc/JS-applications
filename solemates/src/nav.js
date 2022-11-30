import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logoutUser } from './data/auth.js';
import { clearUserData } from './data/handleUserData.js';
const root = document.querySelector('header nav')

function createGuestNav() {
    return html`
        <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
        </div>
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div> 
    `
}

function createUserNav(){
    return html`
        <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
        </div>
        <div class="user">
            <a href="/create">Add Pair</a>
            <a @click=${onLogout} href="#">Logout</a>
          </div>
    `
}

export function renderNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData){
        return render(createUserNav(), root);
    }
    return render(createGuestNav(), root);
}

async function onLogout(e){
    const data = await logoutUser();
    clearUserData();
    renderNav();
    page.redirect('/dashboard');
    return data;
}