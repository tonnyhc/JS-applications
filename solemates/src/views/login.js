import {html} from '../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../data/auth.js';
import { setUserData } from '../data/handleUserData.js';

let context;

function createLoginView(){
    return html`
            <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`
}

export function renderLogin(ctx){
  ctx.render(createLoginView());
  context = ctx;
}


async function onSubmit(e){
  e.preventDefault();
  const form = e.target;
  const {email, password} = Object.fromEntries(new FormData(form));

  if (!email || !password){
    return alert("All fields must be filled!");
  }

  const data = await loginUser(email, password);
  setUserData(data);
  form.reset();
  context.page.redirect('/');
  context.nav;
  return data;
}