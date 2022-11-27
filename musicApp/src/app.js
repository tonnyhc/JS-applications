import page from '../node_modules/page/page.mjs';
import { renderCatalog } from './templates/catalogTemp.js';
import { renderCreate } from './templates/createTemp.js';
import { renderDetails } from './templates/detailsTemp.js';
import { renderEdit } from './templates/editTemp.js';
import { renderHome } from './templates/homeTemp.js';
import { renderLogin } from './templates/loginTemp.js';
import { renderRegister } from './templates/registerTemp.js';
import { renderSearch } from './templates/searchTemp.js';
import { renderNav } from './nav.js';
import { render } from '../node_modules/lit-html/lit-html.js';


const root = document.getElementById('main-content');

renderNav();


page('/', renderMiddleware, renderHome);
page('/login',renderMiddleware ,renderLogin);
page('/register',renderMiddleware, renderRegister);
page('/catalog',renderMiddleware, renderCatalog);
page('/create', renderMiddleware, renderCreate);
page('/details/:id', renderMiddleware , renderDetails);
page('/edit/:id', renderMiddleware, renderEdit);
page('/search',renderMiddleware, renderSearch);
page('*', renderHome);
page.start();


function renderMiddleware(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.nav = renderNav();
    next();
}


