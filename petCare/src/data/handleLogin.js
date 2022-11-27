import { loginUser } from "../auth/auth.js";
import { setUserData } from "../auth/handleUserData.js";
import page from '../../node_modules/page/page.mjs';
import { checkNav } from "../nav.js";

export async function onLogin(e) {
    e.preventDefault();
    const form = e.target;
    const { email, password } = Object.fromEntries(new FormData(form));
    if (!email || !password){
        alert('All fields must be filled!');
        return;
    }
    const data = await loginUser(email, password);
    setUserData(data);
    page.redirect('/');
    checkNav();
    return data;
}