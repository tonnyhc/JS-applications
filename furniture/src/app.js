import page from '../node_modules/page/page.mjs';
import { loginView } from './templates/login.js';
import { catalogView } from './templates/catalog.js';
import { registerView } from './templates/register.js';
import { createView } from './templates/create.js';
import { myFurnitureView } from './templates/myFurniture.js';
import { logoutUser } from './auth/auth.js';
import {renderEdit} from './templates/edit.js'

document.querySelector('#logoutBtn').addEventListener('click', logoutUser);

page('/', catalogView);
page('/register', registerView);
page('/login', loginView);
page('/create', createView);
page('/edit/:id', renderEdit);
page('/delete/:id', () => console.log('create'));
page('/my-furniture', myFurnitureView);
// page("*", page.redirect('/'))
page.start();