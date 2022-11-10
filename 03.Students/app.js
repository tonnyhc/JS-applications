async function solve() {
    const form = document.getElementById('form');
    form.addEventListener('submit', addStudent);

    const url = 'http://localhost:3030/jsonstore/collections/students';
    const response = await fetch(url);
    const data = await response.json();

    const students = Object.values(data);
    let tbody = document.querySelector('#results tbody');
    tbody.innerHTML = '';
    students.forEach(student => {
        let row = document.createElement('tr');
        let firstName = document.createElement('td');
        firstName.textContent = student.firstName;
        const lastName = document.createElement('td');
        lastName.textContent = student.lastName
        const facultyNumber = document.createElement('td');
        facultyNumber.textContent = student.facultyNumber;
        const grade = document.createElement('td');
        grade.textContent = student.grade;
        row.appendChild(firstName);
        row.appendChild(lastName);
        row.appendChild(facultyNumber);
        row.appendChild(grade);
        tbody.appendChild(row);
    });
}

async function addStudent(event) {
    event.preventDefault();
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const newForm = new FormData(form);
    const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(newForm);

    const notification = document.querySelector('.notification');
    try {
        if (!firstName || !lastName || !facultyNumber || !grade) {
            throw new Error('All fields are needed');
        }
       

        const body = {
            firstName,
            lastName,
            facultyNumber,
            grade,
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
    } catch (error) {
        notification.textContent = error.message;
        setTimeout(() => {
            notification.textContent = '';
        }, 3500)
        }
};
solve()