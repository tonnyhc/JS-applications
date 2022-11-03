function solve() {
    const infoDiv = document.querySelector('#info');
    const departBnt = document.querySelector('#depart');
    const arriveBnt = document.querySelector('#arrive');
    let busStop = {
        next: 'depot'
    };
 
    async function depart() {
        try {
            const firstStop = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;
 
            const response = await fetch(firstStop);
            const data = await response.json();
 
            busStop = Object.assign(data);
            infoDiv.textContent = `Next stop ${busStop.name}`;
            arriveBnt.disabled = false;
            departBnt.disabled = true;
        } catch (e) {
            infoDiv.textContent = 'Error';
            arriveBnt.disabled = true;
            departBnt.disabled = true;
        }
    }
 
    async function arrive() {
        infoDiv.textContent = `Arriving at ${busStop.name}`
        departBnt.disabled = false;
        arriveBnt.disabled = true;
    }
 
    return {
        depart,
        arrive
    };
}
 
let result = solve();