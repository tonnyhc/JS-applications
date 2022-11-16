import {requester} from './api.js'
import { onHome } from './home.js';
import { clearUserData } from './utils.js';

export async function onLogout(e){
    e.preventDefault();
    const token = JSON.parse(sessionStorage.getItem('user')).accessToken;
    await requester('GET', 'users/logout', null, token);
    clearUserData()
    return onHome();

}