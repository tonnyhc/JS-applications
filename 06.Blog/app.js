function attachEvents() {
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    loadPostsBtn.addEventListener('click', onLoadPosts);

    const viewPostBtn = document.getElementById('btnViewPost');
    viewPostBtn.addEventListener('click', onViewPost);
}


let allPosts = null;

async function onLoadPosts(){
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const data = await response.json();
    
    allPosts = Object.values(data);
    const postsSelector = document.getElementById('posts');
    postsSelector.innerHTML = '';
    for (const article of Object.values(data)) {
        const option = document.createElement('option');
        option.value = article.id;
        
        option.textContent = article.title;
        postsSelector.appendChild(option)
    }
}

async function onViewPost(event) {
    const currPostId = event.target.parentElement.getElementsByTagName('select')[0].value;
    const currPost = allPosts.filter(post => post.id == currPostId);

    const url = `http://localhost:3030/jsonstore/blog/comments/`;
    const response = await fetch(url);
    const data = await response.json();

    const filteredComm = Object.values(data).filter(data => data.postId == currPostId)
    
    const postTitle = document.getElementById('post-title');
    postTitle.textContent = currPost[0].title;
    document.getElementById('post-body').textContent = currPost[0].body;    

    const commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = '';
    for (let comment of filteredComm) {
        const li = document.createElement('li');
        li.textContent = comment.text;
        li.id = comment.id
        commentsUl.appendChild(li);
    }
    
    
}

attachEvents();