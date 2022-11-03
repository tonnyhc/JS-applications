const busStopField = document.getElementById('stopId');
const list = document.getElementById('stopName');
const busesList = document.getElementById('buses');


function getInfo() {
    const busStop = busStopField.value;
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStop}`)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError)
}

function handleResponse(response){
    busesList.innerHTML = '';
    if (response.ok == false) {
        throw Error('Error')
    }

    return response.json();
}

function handleData(data){
    const buses = data.buses;
    list.textContent = data.name;

    for (let [bus, time] of Object.entries(buses)) {
        const li = document.createElement('li');
        li.textContent = `Bus ${bus} arrives in ${time} minutes`
        busesList.appendChild(li)
        
    }
}

function handleError(error){
    list.innerText = 'Error';
}