
export function setUserData(data){
    sessionStorage.setItem('user', JSON.stringify({
        'email': data.email,
        'accessToken': data.accessToken,
        'id': data._id
    }))
}

export function clearUserData(){
    sessionStorage.clear();
}