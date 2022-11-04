const conditionEnum = {
    "Sunny": "&#x2600", // ☀
    "Partly sunny": "&#x26C5", // ⛅
    "Overcast":	"&#x2601", // ☁
    "Rain": "&#x2614", // ☂
    "Degrees": "&#176"   // °
}


function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather)
}

async function getWeather() {
    const name = document.getElementById('location').value;
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const response = await fetch(url);
    const data = await response.json();


    const location = data.filter(x => x.name === name);
    createTodayDOM(location[0]);
    createThreeDayDom(location[0]);
}

async function createTodayDOM(location) {
    document.getElementById('current').innerHTML = `<div class="label">Current conditions</div>`

    const url = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;
    const response = await fetch(url);
    const data = await response.json();
    const {condition, high, low} = data.forecast


    const forecastContainer = document.createElement('div');
    forecastContainer.className ='forecasts';

    const conditionSymbol = document.createElement('span');
    conditionSymbol.className = 'condition symbol';
    conditionSymbol.innerHTML = `${conditionEnum[condition]}`

    const conditionContainer = document.createElement('span');
    conditionContainer.classList.add('condition');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('forecast-data');
    nameSpan.innerText = data.name;

    const tempSpan = document.createElement('span');
    tempSpan.classList.add('forecast-data');
    tempSpan.innerHTML = `${low}${conditionEnum['Degrees']}/${high}${conditionEnum["Degrees"]}`;

    const conditionSpan = document.createElement('span');
    conditionSpan.classList.add('forecast-data');
    conditionSpan.textContent = condition;

    conditionContainer.appendChild(nameSpan);
    conditionContainer.appendChild(tempSpan);
    conditionContainer.appendChild(conditionSpan);

    forecastContainer.appendChild(conditionSymbol);
    forecastContainer.appendChild(conditionContainer);

    document.getElementById('current').appendChild(forecastContainer);
    document.getElementById('forecast').style.display = 'block';
}

async function createThreeDayDom(location){
    document.getElementById('upcoming').innerHTML = '<div class="label">Three-day forecast</div>';
    
    // upcomingDiv.innerHTML = ''
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;
    const response = await fetch(url);
    const data = await response.json();
    const forecastArray = data.forecast
    

    const forecastInfo = document.createElement('div');
    forecastInfo.className = 'forecast-info';

    for (let forecast of forecastArray){
        const {condition, high, low } = forecast
        const upcomingSpan = document.createElement('span');
        upcomingSpan.className = 'upcoming';

        const symbolSpan = document.createElement('span');
        symbolSpan.className = 'symbol';
        symbolSpan.innerHTML = conditionEnum[condition];

        const tempSpan = document.createElement('span');
        tempSpan.className = 'forecast-data';
        tempSpan.innerHTML = `${low}${conditionEnum['Degrees']}/${high}${conditionEnum["Degrees"]}`;

        const conditionSpan = document.createElement('span');
        conditionSpan.className = 'forecast-data';
        conditionSpan.textContent = condition;

        upcomingSpan.appendChild(symbolSpan);
        upcomingSpan.appendChild(tempSpan);
        upcomingSpan.appendChild(conditionSpan);
        forecastInfo.appendChild(upcomingSpan);
    }
    document.getElementById('upcoming').appendChild(forecastInfo);
}

attachEvents();