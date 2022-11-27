import { del, get, post, put } from "../api/api.js";


export async function getPets(){
    const url = 'data/pets?sortBy=_createdOn%20desc&distinct=name';
    const data = get(url);
    return data;
}


export async function createPet(body){
    const url = 'data/pets';
    const data = await post(url, body);
    return data;
}

export async function getPetById(id){
    const url = `data/pets/${id}`;
    const data = await get(url);
    return data;
}

export async function editPetById(id, body){
    const url = `data/pets/${id}`;
    const data = await put(url, body);
    return data;
}

export async function deletePetById(id){
    const url = `data/pets/${id}`;
    const data = await del(url);
    return data;
}

export async function donate(id){
    const url = 'data/donation';
    const body = {id}
    const data = await post(url, body);
    return data;
}

export async function getPetDonations(id){
    const url = `data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`;
    const data = await get(url);
    return data;
}