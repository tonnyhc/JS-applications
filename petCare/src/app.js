import page from '../node_modules/page/page.mjs';
import { renderRegister } from './templates/registerTemp.js';
import {renderLogin} from './templates/loginTemp.js';
import { renderHome } from './templates/homePageTemp.js';
import { renderDashboard } from './templates/dashboardTemp.js';
import {renderCreate} from './templates/createTemp.js';
import { checkNav } from './nav.js';
import {renderDetails} from './templates/detailsTemp.js';

checkNav();
page('/', renderHome);
page('/register', renderRegister);
page('/login',renderLogin);
page('/dashboard', renderDashboard);
page('/create' ,renderCreate);
page('/details/:petId', renderDetails);
page('/edit/:petId' , () => console.log('edit'));
page('*', ()=> page.redirect('/'))
page.start();