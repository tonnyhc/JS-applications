import { html } from '../../node_modules/lit-html/lit-html.js';
import {loginUser} from '../data/auth.js'
import { setUserData } from '../data/handleUserData.js';

let context;

function createLoginTemp() {
    return html`
            <!--Login-->
            <section id="loginPage">
                <form @submit=${onLogin}>
                    <fieldset>
                        <legend>Login</legend>
            
                        <label for="email" class="vhide">Email</label>
                        <input id="email" class="email" name="email" type="text" placeholder="Email">
            
                        <label for="password" class="vhide">Password</label>
                        <input id="password" class="password" name="password" type="password" placeholder="Password">
            
                        <button type="submit" class="login">Login</button>
            
                        <p class="field">
                            <span>If you don't have profile click <a href="/register">here</a></span>
                        </p>
                    </fieldset>
                </form>
            </section>`
}

export function renderLogin(ctx){
    ctx.render(createLoginTemp());
    context = ctx;
}

async function onLogin(e){
    e.preventDefault();
    const form = e.target;
    const {email, password} = Object.fromEntries(new FormData(form));

    if (!email ||!password){
        alert("All fields must be filled!");
    }

    const data = await loginUser(email, password);
    setUserData(data);
    context.page.redirect('/');
    context.nav
    return data;
}