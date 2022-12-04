import { del, get, post, put } from "../api/api.js";

export async function getAlbums(){
    const url = 'data/albums?sortBy=_createdOn%20desc';
    const data = await get(url);
    return data;
}

export async function createAlbum(body){
    const url = 'data/albums';
    const data = await post(url, body);
    return data;
}

export async function getAlbumById(id){
    const url = `data/albums/${id}`;
    const data = await get(url);
    return data;
}

export async function updateAlbum(id, body){
    const url = `data/albums/${id}`;
    const data = await put(url, body);
    return data;
}

export async function deleteAlbumById(id){
    const url = `data/albums/${id}`;
    const data = await del(url);
    return data;
}

export async function likeAlbum(albumId){
    const url = 'data/likes';
    const data = await post(url, albumId);
    return data;
}

export async function getLikesPerAlbum(albumId){
    const url = `data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`;
    const data = await get(url);
    return data;
}

export async function getLikesPerAlbumForUser(albumId, userId){
    const url = `data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    const data = await get(url);
    return data;
}