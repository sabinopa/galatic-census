const imagensPlanetas = {
  "Tatooine": "https://en.wikipedia.org/wiki/Tatooine#/media/File:Tatooine_(fictional_desert_planet).jpg",
  "Alderaan": "url_da_imagem_de_alderaan_aqui.jpg",
  // Adicione outros planetas conforme necessário
};

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
    detailsContainer.innerHTML = ''; 

    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const tableResponsive = document.createElement('div');
    tableResponsive.className = 'table-responsive';

    const table = document.createElement('table');
    table.className = 'table table-xs mb-0';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Clima</th>
            <th>População</th>
            <th>Terreno</th>
        </tr>`;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.innerHTML = `
        <tr>
            <td>${planet.name}</td>
            <td>${planet.climate}</td>
            <td>${planet.population}</td>
            <td>${planet.terrain}</td>
        </tr>`;
    table.appendChild(tbody);

    tableResponsive.appendChild(table);
    cardBody.appendChild(tableResponsive);
    card.appendChild(cardBody);
    detailsContainer.appendChild(card);
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
