function attachEvents() {
    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', getMsg);

    const sendBtn = document.getElementById('submit')
    sendBtn.addEventListener('click', sendMsg)
}


async function getMsg (){
    const url = 'http://localhost:3030/jsonstore/messenger';
    try{
    const response = await fetch(url);
    const data = await response.json();
    displayMsg(data);
    } catch(error) {
        console.log(error)
    }
}

async function sendMsg(e){
    e.preventDefault();
    
    const url = 'http://localhost:3030/jsonstore/messenger';

    const authorField = e.target.parentElement.querySelector('input[name="author"');
    const contentField = e.target.parentElement.querySelector('input[name="content"');

    const author = authorField.value;
    const content = contentField.value;

    if (!author || !content){
        return;
    }
    body = {author, content}
    authorField.value = '';
    contentField.value = '';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    getMsg();
    const data = await response.json();
    return data
}

function displayMsg(data) {
    const array = []
    const textArea = document.getElementById('messages');
    textArea.textContent = ''
    for (const msg of Object.values(data)){
        array.push(`${msg.author}: ${msg.content}`);
    }
    textArea.textContent = array.join('\n')
}



attachEvents();