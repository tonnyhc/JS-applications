import { post,get,put, del } from "../api/api.js";

export async function loginUser(email, password){
    const url = 'users/login';
    const body = {email, password}
    const data = await post(url, body)
    return data;
}

export async function registerUser(email, password){
    const url = 'users/register';
    const body = {email, password};
    const data = await post(url, body);
    return data;
}


export async function logoutUser(){
    const url = 'users/logout'
    const data = await get(url);
    return data;
}