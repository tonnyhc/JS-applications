import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { renderHome } from './templates/homeTemp.js';
import { renderLogin } from './templates/loginTemp.js';
import { renderRegister } from './templates/registerTemp.js';
import { renderDashboard } from './templates/dashboardTemp.js';
import { renderCreate } from './templates/createTemp.js';
import { renderDetails } from './templates/detailsTemp.js';
import { renderEdit } from './templates/editTemp.js';
import { renderNav } from './nav.js';

const root = document.querySelector('#wrapper main');

renderNav();
page(renderMiddleware);
page('/', renderHome);
page('/login', renderLogin);
page('/register', renderRegister);
page('/dashboard', renderDashboard);
page('/create', renderCreate);
page('/details/:id', renderDetails);
page('/edit/:id', renderEdit);
page('*', renderHome);
page.start();

function renderMiddleware(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.nav = renderNav();
    next();
}
