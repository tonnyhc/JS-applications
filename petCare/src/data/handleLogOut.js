import { logoutUser } from "../auth/auth.js";
import { clearUserData } from "../auth/handleUserData.js";
import { checkNav } from "../nav.js";


export async function onLogout(e){
    e.preventDefault();
    const data = await logoutUser();
    clearUserData();
    checkNav();
    return data;
}