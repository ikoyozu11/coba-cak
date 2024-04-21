const endpoint = "https://pokeapi.co/api/v2/pokemon?limit=24";
const spinnerContainer = document.getElementById("loader");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const pokemonListElement = document.getElementById("pokemon-list");

function fetchPokemon(url) {
  spinnerContainer.style.display = "flex"; // Show loading spinner
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      spinnerContainer.style.display = "none"; // Hide loading spinner when data is loaded
      const pokemonDataArray = data.results;
      const nextUrl = data.next;
      const previousUrl = data.previous;

      previousButton.style.visibility = previousUrl ? "visible" : "hidden"; // Control visibility of previous button
      nextButton.style.visibility = nextUrl ? "visible" : "hidden"; // Control visibility of next button

      // Store the URLs as data attributes of the buttons
      previousButton.setAttribute("data-url", previousUrl);
      nextButton.setAttribute("data-url", nextUrl);

      // Fetch details for each Pokémon
      return Promise.all(
        pokemonDataArray.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );
    })
    .then((pokemonDetails) => {
      pokemonDetails.sort((a, b) => a.id - b.id); // Sort Pokémon by ID
      showCards(pokemonDetails); // Display all Pokémon cards
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
      spinnerContainer.style.display = "none"; // Hide spinner in case of error
    });
}

function showCards(pokemonArray) {
  pokemonListElement.innerHTML = ""; // Clear existing content
  pokemonArray.forEach((pokemon) => {
    let pokemonImage = pokemon.sprites.front_default;
    let pokemonName = pokemon.name;
    let pokemonId = pokemon.id;
    pokemonListElement.innerHTML += `
      <a href="detailPokemon.html?id=${pokemonId}" class="card-link">
        <div class="card">
          <img src="${pokemonImage}" alt="${pokemonName}" style="width: 150px">
          <div class="container">
            <h5>${pokemonName}</h5>
          </div>
        </div>
      </a>`;
  });
}

// Event handlers for pagination
previousButton.onclick = () => {
  const url = previousButton.getAttribute("data-url");
  if (url) fetchPokemon(url);
};

nextButton.onclick = () => {
  const url = nextButton.getAttribute("data-url");
  if (url) fetchPokemon(url);
};

// Initial fetch call
fetchPokemon(endpoint);
