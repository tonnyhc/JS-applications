export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify({
        email: data.email,
        accessToken: data.accessToken,
        id: data._id
    }));
}

export function clearUserData(){
    sessionStorage.removeItem('userData');
}


export function getUserId(){
    const user = JSON.parse(sessionStorage.getItem("userData"));
    let id;
    if (user){
        id = user.id
    }
    return id;
}