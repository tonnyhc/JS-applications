export async function requester(method, url, givenData, token) {
    try {
        const path = 'http://localhost:3030/' + url;

        const option = {
            method,
            headers: {}
        }

        if (givenData) {
            option.headers['Content-Type'] = 'applcation/json';
            option.body = JSON.stringify(givenData);
        }
        if (token){
            option.headers['Content-Type'] = 'application/json';
            option.headers['X-authorization'] = token
        }

        const response = await fetch(path, option);
        if (url !== 'users/logout' && response.ok == false) {
            throw new Error('Error');
        }
        if (url !== 'users/logout'){
            const data = await response.json();
            return data;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}