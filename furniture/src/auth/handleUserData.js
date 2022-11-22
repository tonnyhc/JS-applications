export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify({
        email: data.email,
        accessToken: data.accessToken,
        id: data._id
    }));
}

export function deleteUserData(){
    sessionStorage.removeItem('userData');
}