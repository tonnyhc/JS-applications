function lockedProfile() {
    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(handleResponse)
        .then(handleData);
}


function handleResponse(response){
    return response.json()
}

function handleData(data) {
    const userContainer = document.getElementById('main');
    userContainer.innerHTML = '';
    let userCard = document.createElement('div');
    userCard.className = 'profile';

    let counter = 0;
    for (const user of Object.values(data)) {
        counter++;
        let userCard = document.createElement('div');
        userCard.className = 'profile';

        userCard.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                              <label>Lock</label>
                              <input type="radio" name="user${counter}Locked" value="lock" checked>
                              <label>Unlock</label>
                              <input type="radio" name="user${counter}Locked" value="unlock"><br>
                              <hr>
                              <label>Username</label>
                              <input type="text" name="user${counter}Username" value="${user.username}" disabled readonly />
                              <div id="user${counter}HiddenFields" style="display:none">
                                  <hr>
                                  <label>Email:</label>
                                  <input type="email" name="user${counter}Email" value="${user.email}" disabled readonly />
                                  <label>Age:</label>
                                  <input type="email" name="user${counter}Age" value="${user.age}" disabled readonly />
                              </div>
                              <button>Show more</button>`;

        main.appendChild(userCard);
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', showHidenContent));
}


function showHidenContent(event){
    const radioButton = event.target.parentElement.querySelector('input[type="radio"');
    const hiddenDiv = event.target.parentElement.querySelectorAll('div')[0];
    const button = event.target;

    if (radioButton.checked) {
        return 
    }
    if (button.textContent == 'Show more') {
        hiddenDiv.style.display = 'block';
        button.textContent = 'Hide it';
    } else {
        hiddenDiv.style.display = 'none';
        button.textContent = 'Show more';
    }
    


}
