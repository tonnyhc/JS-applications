import { logoutUser } from "./auth.js";
import { renderNav } from "../nav.js";
import { clearUserData } from "./handleUserData.js";
import page from '../../node_modules/page/page.mjs';

export function onLogout(e){
    e.preventDefault();
    logoutUser();
    clearUserData();
    renderNav();
    page.redirect('/')
}
