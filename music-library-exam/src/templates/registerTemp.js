import {html} from '../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../data/auth.js';
import { setUserData } from '../data/handleUserData.js';

let context;

function createRegisterView(){
    return html`
      <section id="register">
        <div class="form" @submit=${onRegister}>
          <h2>Register</h2>
          <form class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>`
}

export function renderRegister(ctx){
    context = ctx;
    ctx.render(createRegisterView())
}

async function onRegister(e){
  e.preventDefault();
  const form = e.target;

  const {email, password, ['re-password']: rePass} = Object.fromEntries(new FormData(form));

  if (!email || !password || !rePass){
    return alert('All fields must be filled!');
  }
  if (password !== rePass){
    return alert("Passwords do not match!");
  }
  form.reset();
  const data = await registerUser(email, password);
  setUserData(data);
  context.page.redirect('/dashboard');
  context.nav;
  return data;

}