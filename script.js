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

if (planet.residents.length > 0) {
  const residentsPromises = planet.residents.map(url =>
      fetch(url + '?format=json').then(response => response.json())
  );

  Promise.all(residentsPromises)
      .then(residents => {
          const residentsHeader = document.createElement('h5');
          residentsHeader.className = 'card-title';
          residentsHeader.textContent = 'Residentes Famosos';
          cardBody.appendChild(residentsHeader);

          const residentsTable = document.createElement('table');
          residentsTable.className = 'table';
          const theadResidents = document.createElement('thead');
          theadResidents.innerHTML = `
              <tr>
                  <th>Nome</th>
                  <th>Data de Nascimento</th>
              </tr>`;
          residentsTable.appendChild(theadResidents);

          const tbodyResidents = document.createElement('tbody');
          residents.forEach(resident => {
              const tr = document.createElement('tr');
              tr.innerHTML = `<td>${resident.name}</td><td>${resident.birth_year}</td>`;
              tbodyResidents.appendChild(tr);
          });
          residentsTable.appendChild(tbodyResidents);
          cardBody.appendChild(residentsTable);
      })
      .catch(error => console.error('Erro ao buscar detalhes dos residentes:', error));
} else {
  const noResidentsMsg = document.createElement('p');
  noResidentsMsg.textContent = 'Nenhum residente famoso encontrado.';
  cardBody.appendChild(noResidentsMsg);
}

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
