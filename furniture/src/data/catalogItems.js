import {del, get, post} from '../api/api.js'

export async function getItems(){
    const url = 'data/catalog';
    const data = await get(url);
    return data;
}


export async function createItem(body) {
    const url = 'data/catalog'
    const data = await post(url, body);
    return data

}

export async function getItemById(id){
    const url = 'data/catalog/' + id;
    const data = await get(url);
    return data;
}
//MUst fix this;
export async function editItem(id){
    const url = 'data/catalog/' + id;

}

export async function deleteItem(id){
    const url = 'data/catalog/' + id;
    const data = await del(url);
    return data;
}

export async function getUserItems(id){
    const url = `data/catalog?where=_ownerId%3D%22${id}%22`;
    const data = await get(url);
    return data;
}