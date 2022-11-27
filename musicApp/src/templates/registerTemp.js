import { html } from '../../node_modules/lit-html/lit-html.js';
import {registerUser} from '../data/auth.js';
import {setUserData} from '../data/handleUserData.js';

let context;

function createRegisterTemp() {
    return html`
            <!--Registration-->
            <section id="registerPage">
                <form @submit=${onRegister}>
                    <fieldset>
                        <legend>Register</legend>
            
                        <label for="email" class="vhide">Email</label>
                        <input id="email" class="email" name="email" type="text" placeholder="Email">
            
                        <label for="password" class="vhide">Password</label>
                        <input id="password" class="password" name="password" type="password" placeholder="Password">
            
                        <label for="conf-pass" class="vhide">Confirm Password:</label>
                        <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
            
                        <button type="submit" class="register">Register</button>
            
                        <p class="field">
                            <span>If you already have profile click <a href="/login">here</a></span>
                        </p>
                    </fieldset>
                </form>
            </section>`
}

export function renderRegister(ctx){
    ctx.render(createRegisterTemp());
    context = ctx;
}


async function onRegister(e){
    e.preventDefault();
    const form = e.target;
    const {
        email,
        password, 
        ['conf-pass'] : confPass} = Object.fromEntries(new FormData(form));
    if (!email || !password || !confPass){
        alert("All fields must be filled!");
        return
    }
    if (password !== confPass){
        alert("Passwords do not match!");
        return
    }
    form.reset();
    const data = await registerUser(email, password);
    setUserData(data);
    context.page.redirect('/');
    context.nav;
    return data;
}
