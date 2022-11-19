import {render,html} from './node_modules/lit-html/lit-html.js';
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const root = document.querySelector('#menu');
const form = document.querySelector('form')
form.addEventListener('submit', onSubmit);

getItems();
function addItem() {
    console.log('TODO:...');
}


async function getItems(){
    const response = await fetch(url);
    const data = await response.json();
    return renderItems(data);
}

function renderItems(data){
    const items = Object.values(data);
    const result = items.map(item => itemCard(item))
    render(result, root);
}

function itemCard(item){
    const option =  html`<option value="${item._id}">${item.text}</option>`
    return option
}

function onSubmit(e){
    e.preventDefault();
    const text = document.querySelector('#itemText').value;
    if (!text) {
        return;
    }
    form.reset();
    addOption(text);
}

async function addOption(option){
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({'text': option})
    });
    const data = await response.json();
    getItems();
    return data;
}

