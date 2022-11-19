import { html, render } from './node_modules/lit-html/lit-html.js'
import { contacts } from './contacts.js'

const root = document.querySelector('#contacts');

const contactCard = (contact) =>
    html`
            <div class="contact card">
                <div>
                    <i class="far fa-user-circle gravatar"></i>
                </div>
                <div class="info">
                    <h2>Name: ${contact.name}</h2>
                    <button @click=${showDetails} class="detailsBtn">Details</button>
                    <div class="details" id="${contact.id}">
                        <p>Phone number: ${contact.phoneNumber}</p>
                        <p>Email: ${contact.email}</p>
                    </div>
                </div>
            </div>`

function showDetails(e){
    const detailsDiv = e.target.parentElement.querySelector('div');
    if (detailsDiv.style.display == 'none'){
        detailsDiv.style.display = 'block';
    } else{
        detailsDiv.style.display = 'none';
    }
}

render(contacts.map(contactCard), root);