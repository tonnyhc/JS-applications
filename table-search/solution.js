import {render,html} from "./node_modules/lit-html/lit-html.js";

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const textInput = document.getElementById('searchField');
   function onClick() {

      const rows = Array.from(document.querySelectorAll('tbody tr'));
      rows.forEach(row => row.className = '');
      const text = textInput.value.toLowerCase();
      textInput.value = '';
      rows.map(row => checkForMatch(row, text));

   }
}


function checkForMatch(row, search){
   if (row.textContent.toLowerCase().includes(search)){
      row.className = 'select';
   }
}

const root = document.querySelector('tbody');
solve();
renderInfo();

async function getInfo(){
   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const response = await fetch(url);
   const data = await response.json();
   return data;
}



async function renderInfo(){
   const data = Object.values(await getInfo());
   render(data.map(student => createStudentCard(student)),root);

}


function createStudentCard(student){
   return html`
   <tr>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
   </tr>`

}