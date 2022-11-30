import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
import { renderNav } from './nav.js';
import { renderCreate } from './views/create.js';
import { renderDashboard } from './views/dashboard.js';
import { renderDetails } from './views/details.js';
import { renderEdit } from './views/edit.js';
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderSearch } from './views/search.js';

const root = document.querySelector('#wrapper main');

renderNav();
page('/', renderMiddleware, renderHome);
page('/login', renderMiddleware, renderLogin);
page('/register', renderMiddleware, renderRegister);
page('/dashboard', renderMiddleware, renderDashboard);
page('/create', renderMiddleware, renderCreate);
page('/details/:id', renderMiddleware, renderDetails);
page('/edit/:id', renderMiddleware, renderEdit);
page('/search', renderMiddleware, renderSearch)
page('*', renderHome);
page.start()

function renderMiddleware(ctx, next){
    ctx.render = (content) => render(content, root)
    ctx.nav = renderNav();
    next();
}
