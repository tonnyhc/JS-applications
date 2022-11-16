import { onHome } from './home.js';
import { onRegister } from './register.js';
import { onLogin } from './login.js'
import { onLogout } from './logout.js';
import { onDashboard } from './dashboard.js';
import {onCreate} from './create.js'


export const dashboardBtn = document.querySelectorAll('nav li')[0];
export const createBtn = document.querySelectorAll('nav li')[1];
export const logoutBtn = document.querySelectorAll('nav li')[2];
export const loginBtn = document.querySelectorAll('nav li')[3];
export const registerBtn = document.querySelectorAll('nav li')[4];

export function navBar() {
    createBtn.remove();
    logoutBtn.remove();
    loginBtn.remove();
    registerBtn.remove();
    const navDiv = document.querySelector('.collapse.navbar-collapse ul');


    const user = JSON.parse(sessionStorage.getItem("user"));
    document.querySelectorAll('nav li').forEach(x => x.classList.remove('active'));

    const homeBtn = document.querySelector('nav div a');
    homeBtn.addEventListener('click', onHome);

    registerBtn.addEventListener('click', onRegister);
    loginBtn.addEventListener('click', onLogin);
    logoutBtn.addEventListener('click', onLogout);
    dashboardBtn.addEventListener('click', onDashboard);
    createBtn.addEventListener('click', onCreate);

    if (user){
        navDiv.appendChild(createBtn);
        navDiv.appendChild(logoutBtn);
    } else {
        navDiv.appendChild(loginBtn);
        navDiv.appendChild(registerBtn);
    }
}