export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify({
        'email': data.email,
        'id': data._id,
        'accessToken': data.accessToken

    }))
}

export function clearUserData(){
    sessionStorage.removeItem('userData');
}

export function getUserData(){
    return JSON.parse(sessionStorage.getItem("userData"));
}