function fetchPlanets() {
    fetch('https://swapi.dev/api/planets/?format=json')
        .then(response => response.json())
        .then(data => {
            displayPlanets(data.results);
        })
        .catch(error => console.error('Erro ao buscar planetas:', error));
}

function displayPlanets(planets) {
    const container = document.getElementById('planets') || document.createElement('div');
    container.innerHTML = ''; 
    planets.forEach(planet => {
        const button = document.createElement('button');
        button.innerText = planet.name;
        button.addEventListener('click', () => displayPlanetDetails(planet));
        container.appendChild(button);
    });
    document.getElementById('planets').appendChild(container); 
}

function displayPlanetDetails(planet) {
    const detailsContainer = document.getElementById('search-results');
    detailsContainer.innerHTML = `<p><b>Nome:</b> ${planet.name}</p>
                                  <p><b>Clima:</b> ${planet.climate}</p>
                                  <p><b>População:</b> ${planet.population}</p>
                                  <p><b>Terreno:</b> ${planet.terrain}</p>`;
}

function searchPlanets() {
    const searchText = document.getElementById('planet-field').value; 
    fetch(`https://swapi.dev/api/planets/?search=${searchText}&format=json`)
        .then(response => response.json())
        .then(data => {
            displayPlanets(data.results);
        });
}

document.getElementById('planet-search').addEventListener('click', searchPlanets);

fetchPlanets();
