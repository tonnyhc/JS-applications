function solution() {
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(handleResponse)
        .then(handleData);
}

function handleResponse(response) {
    return response.json();
}

async function handleData(data) {
    const mainSection = document.getElementById('main');
    for (let article of Object.values(data)) {
        const url =`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`
        const response = await fetch(url);
        const data = await response.json();

        const content = data.content
        const div = document.createElement('div');
        div.className = 'accordion';
        div.innerHTML =  `<div class="head">`+
                            `<span>${article.title}</span>`+
                            `<button class="button" id="${article._id}">More</button>` +
                        `</div>` +
                        `<div class="extra">` +
                            `<p>${content}</p>` +
                        `</div>`;
        mainSection.appendChild(div);                           
    }
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', onClickBtn));
}

function onClickBtn(event) {
    const button = event.target;
    const accordionDiv = event.target.parentElement.parentElement;

    if (button.textContent === "More") {
        accordionDiv.getElementsByClassName('extra')[0].style.display = 'block';
        button.textContent = "Less";
    } else {
        accordionDiv.getElementsByClassName('extra')[0].style.display = 'none';
        button.textContent = "More";
    }
}



solution()
