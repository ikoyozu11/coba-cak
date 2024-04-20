// Extract the Pokémon ID from the URL query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonId = urlParams.get("id");
const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

// Fetch details for a single Pokémon using the Pokémon ID
fetch(endpoint)
  .then((response) => response.json())
  .then((pokemon) => {
    // Call the function to display Pokémon details
    showDetail(pokemon);
    showMoves(pokemon.moves);
  })
  .catch((error) => console.error("Error fetching Pokémon details:", error));

function showDetail(pokemon) {
  // console.log(pokemon.id);
  let id = pokemon.id;
  let name = pokemon.name;
  let image = pokemon.sprites.front_default;
  let stats = pokemon.stats;
  let abilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", "); // Summarizing abilities
  let types = pokemon.types.map((type) => type.type.name).join(", "); // Summarizing types
  // console.log(moves);

  // Inserting Pokémon data into HTML
  document.getElementById("pokemon-detail").innerHTML = `
  <span class="badge text-bg-warning">#${id}</span>
  <h2 class="text-center"\>${name}</h2>
  <img src="${image}" class="img-thumbnail" alt="${name}" style="width: 300px">
  <h3>Abilities: </h3> ${abilities}
  <h3>Type: </h3> ${types}
  `;
  document.getElementById("pokemon-stats").innerHTML = `
  <ul>
    ${stats
      .map((baseStat) => {
        const percentage = (baseStat.base_stat / 252) * 100;
        return `<li>${baseStat.stat.name}: <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${baseStat.base_stat}" aria-valuemin="0" aria-valuemax="720">
                <div class="progress-bar" style="width: ${percentage}%">${baseStat.base_stat}</div>
              </div></li>`;
      })
      .join("")}
  </ul>
`;
}

function showMoves(moves) {
  const totalMoves = moves.length;
  const movesPerColumn = Math.ceil(totalMoves / 3); // Distribute moves evenly across 3 columns

  // Loop through moves and divide them into three columns
  let column1 = "";
  let column2 = "";
  let column3 = "";
  moves.forEach((move, index) => {
    const moveName = move.move.name;
    const moveHTML = `<li>${moveName}</li>`;
    if (index < movesPerColumn) {
      column1 += moveHTML;
    } else if (index < 2 * movesPerColumn) {
      column2 += moveHTML;
    } else {
      column3 += moveHTML;
    }
  });

  // Insert moves into HTML
  document.getElementById("pokemon-moves").innerHTML = `
    <div class="col-md-4">
      <ul>${column1}</ul>
    </div>
    <div class="col-md-4">
      <ul>${column2}</ul>
    </div>
    <div class="col-md-4">
      <ul>${column3}</ul>
    </div>
  `;
}
