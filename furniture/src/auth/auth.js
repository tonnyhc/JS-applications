import {post, get} from '../api/api.js';
import { checkNav } from '../nav.js';
import {setUserData, deleteUserData} from './handleUserData.js';

export async function registerUser(email, password){
    const url = 'users/register';
    const body = {email, password}
    const data = await post(url, body);
    setUserData(data);
    return data;
}

export async function loginUser(email, password){
    const url = 'users/login';
    const body = {email, password};
    const data = await post(url, body);
    setUserData(data);
    return data;
}

export async function logoutUser(){
    const url = 'users/logout';
    const data = await get(url);
    deleteUserData();
    checkNav();
    return data;
}