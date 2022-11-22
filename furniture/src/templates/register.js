import {render, html} from '../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../auth/auth.js';
import { checkNav } from '../nav.js';


function registerTemp(){
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmitRegister}>
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
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`
}
let context;
export function registerView(ctx, next){
    context = ctx
    render(registerTemp(), document.querySelector('.container'));
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    document.querySelector('#registerLink').classList.add('active')
}



async function onSubmitRegister(e){
    e.preventDefault();
    const form = document.querySelector('form');
    const {email, password, rePass} = Object.fromEntries(new FormData(form));
    if (password != rePass){
        return;
    }
    const data = await registerUser(email, password);
    checkNav();
    context.page.redirect('/')
    return data;
}