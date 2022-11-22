import { loginUser } from '../auth/auth.js';
import { checkNav } from '../nav.js';
import {render, html} from '/../../node_modules/lit-html/lit-html.js';


function loginTemplate(){
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmitLogin}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`
}


const root = document.querySelector('.container');
let context;
export function loginView(ctx){
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    render(loginTemplate(), root)
    document.querySelector('#loginLink').classList.add('active');
    context = ctx
}


async function onSubmitLogin(e){
    e.preventDefault();
    const form = document.querySelector('form');
    const {email, password} = Object.fromEntries(new FormData(form));
    form.reset();
    const data = await loginUser(email, password);
    checkNav();
    context.page.redirect('/');
    return data;
}

