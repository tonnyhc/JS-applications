import { del, get, post, put } from "../api/api.js";

export async function getShoes(){
    const url ='data/shoes?sortBy=_createdOn%20desc';
    const data = await get(url);
    return data;
}

export async function createShoe(body){
    const url = 'data/shoes/';
    const data = await post(url, body);
    return data;
}

export async function getShoeById(id){
    const url = `data/shoes/${id}`;
    const data = await get(url);
    return data;
}

export async function updateShoe(id, body){
    const url = `data/shoes/${id}`;
    const data = await put(url, body);
    return data;
}

export async function deleteShoe(id){
    const url = `data/shoes/${id}`;
    const data = await del(url);
    return data;
}

export async function searchShoes(query){
    const url = `data/shoes?where=brand%20LIKE%20%22${query}%22`;
    const data = await get(url);
    return data;
}