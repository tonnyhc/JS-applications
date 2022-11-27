import { get, post } from "../api/api.js";


export async function registerUser(email, password){
    const url = 'users/register/';

    const body = {
        email,
        password
    }
    try{
        const data = await post(url, body);
        return data;
    } catch(error){
        alert(error.message);
        throw err;
    }

}

export async function loginUser(email, password){
    const url = 'users/login/';
    const body = {email, password};
    try{
        const data = await post(url, body);
        return data;
    } catch(err){
        alert(err.message);
        throw err
    }

}

export async function logoutUser(){
    const url = 'users/logout/';
    try {
        const data = await get(url);
        return data;
    } catch(error){
        alert(error.message);
        throw error;
    }
}