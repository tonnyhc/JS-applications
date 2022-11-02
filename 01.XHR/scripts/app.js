function loadRepos() {
   fetch('https://api.github.com/users/tonnyhc/repos')
      .then(handleResponse)
      .then(handleData)
}


function handleResponse(response){
   console.log(response.text)
   return response.json();
}


function handleData(data) {
   const div = document.getElementById('res');
   div.innerText += JSON.stringify(data)
   console.log(data)
   return JSON.stringify(data)
}