import { registerUser } from "../auth/auth.js";
import { setUserData } from "../auth/handleUserData.js";
import page from '../../node_modules/page/page.mjs';
import { checkNav } from "../nav.js";

export async function onRegister(e){
    e.preventDefault();
    const form = e.target;
    const {email, password, repeatPassword} = Object.fromEntries(new FormData(form));
    
    if (!email || !password || !repeatPassword){
        alert('All fields must be filled!');
        return;
    }
    if (password !== repeatPassword) {
        alert("Passwords don't match!");
        return;
    }

    const data = await registerUser(email, password);
    setUserData(data);
    page.redirect('/');
    checkNav();
    return data;
}