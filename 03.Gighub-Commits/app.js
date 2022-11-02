const usernameField = document.getElementById('username');
const repoNameField = document.getElementById('repo');
const list = document.getElementById('commits');

function loadCommits() {
    const username = usernameField.value;
    const repoName = repoNameField.value;

    fetch(`https://api.github.com/repos/${username}/${repoName}/commits`)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);
}

function handleResponse(response){
    if (response.ok == false) {
        throw Error(`Error: ${response.status} (Not Found)`)
    }
    return response.json()
}

function handleData(data) {
    list.textContent = ''
    const commit = data.commit;

    for (let com of data) {
        const author = com.commit.author.name;
        const message = com.commit.message;
        const li = document.createElement('li');
        li.textContent = `${author}: ${message}`;
        list.append(li);
    }
}

function handleError(error){
    list.textContent = error.message
}