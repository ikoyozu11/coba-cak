const endpoint = "https://pokeapi.co/api/v2/pokemon?limit=24";
const spinnersContainer = document.getElementById("spinner-container");
spinnersContainer.style.display = "flex";
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    let result = data.results;
    let pokemonDataArray = [];
    let cards = ""; // Variabel untuk menampung hasil dari showCards
    result.forEach((pokemon) => {
      let pokemonUrl = pokemon.url;
      fetch(pokemonUrl)
        .then((response) => response.json())
        .then((pokemon) => {
          pokemonDataArray.push(pokemon);
          if (pokemonDataArray.length === result.length) {
            pokemonDataArray.sort((a, b) => a.id - b.id);

            spinnersContainer.style.display = "none";
            showCards(pokemonDataArray);
          }
        })
        .catch((error) => {
          console.error("Gagal melakukan permintaan:", error);
        });
    });
  });

function showCards(pokemonArray) {
  pokemonArray.forEach((pokemonData) => {
    let pokemonImage = pokemonData.sprites.front_default;
    let pokemonName = pokemonData.name;
    let pokemonId = pokemonData.id;
    console.log(pokemonName);
    document.getElementById("pokemon-list").innerHTML += `
    <a href="detailPokemon.html?id=${pokemonId}"
    <div class="col-lg-2 col-md-3 col-sm-4 mb-4">
      <div class="card">
        <img src="${pokemonImage}" class="card-img-top mx-auto" alt="${pokemonName}" style="width: 150px">
        <div class="card-body">
        <h5 class="text-center card-title">${pokemonName}</h5>
        </div>
      </div>
    </div></a> 
    `;
  });
}
