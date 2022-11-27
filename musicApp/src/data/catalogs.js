import { del, get, post, put } from "../api/api.js";

export async function getCatalogs(){
    const url = 'data/albums?sortBy=_createdOn%20desc&distinct=name';
    const data = await get(url);
    return data;
}

export async function getCatalogById(id){
    const url = `data/albums/${id}`;
    const data = await get(url);
    return data;
}

export async function createCatalog(body){
    const url = 'data/albums/';
    const data = await post(url, body);
    return data;
}

export async function updateCatalog(id, body){
    const url = `data/albums/${id}`;
    const data = await put(url, body);
    return data
}

export async function deleteCatalog(id){
    const url = `data/albums/${id}`;
    const data = await del(url);
    return data;
}

export async function search(query){
    const url = `data/albums?where=name%20LIKE%20%22${query}%22`;
    const data = await get(url);
    return data;
}