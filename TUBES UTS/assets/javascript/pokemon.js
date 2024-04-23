const pokemonData = document.getElementById("pokemon-list");
const pokemonSearch = document.getElementById("pokemon-search").value;
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const buttonSearch = document.getElementById("searchQuerySubmit");

function fetchPokemon(endpoint) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const pokemonArray = data.results;
      const nextUrl = data.next;
      const previousUrl = data.previous;

      document.getElementById("previous-button").style.visibility = previousUrl
        ? "visible"
        : "hidden";
      document.getElementById("next-button").style.visibility = nextUrl
        ? "visible"
        : "hidden";

      previousButton.setAttribute("data-url", previousUrl);
      nextButton.setAttribute("data-url", nextUrl);

      return Promise.all(
        pokemonArray.map((pokemon) =>
          fetch(pokemon.url).then((result) => result.json())
        )
      );
    })
    .then((pokemonDetails) => {
      showCards(pokemonDetails);
    })
    .catch((error) => {
      console.error("Terjadi masalah ketika mengambil data API:", error);
    });
}

function showCards(pokemonArray) {
  pokemonData.innerHTML = "";
  pokemonArray.forEach((pokemon) => {
    let id = pokemon.id;
    let img = pokemon.sprites.front_default;
    let name = pokemon.name;
    pokemonData.innerHTML += `
    <a href="detailPokemon.html?id=${id}" class="card-link">
      <div class="card">
        <img src="${img}" alt="${name}" style="width: 150px">
        <div class="container">
          <h5>${name}</h5>
        </div>
      </div>
    </a>`;
  });
}

previousButton.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  fetchPokemon(url);
});

nextButton.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  fetchPokemon(url);
});

function setupSearch() {
  const inputElement = document.getElementById("pokemon-search");
  const button = document.querySelector(".search-container button");

  // Adding an event listener to handle the Enter key press
  inputElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission if part of a form
      performSearch(inputElement.value); // Perform search based on the input's value
    }
  });

  // Setup click event listener for the button
  buttonSearch.addEventListener("click", function () {
    performSearch(inputElement.value); // Perform search based on the input's value
  });
}

function performSearch(query) {
  if (query.trim() === "") return; // Optionally prevent search on empty query
  console.log(query); // For debugging: log the query to the console
  window.location.href = `detailPokemon.html?id=${encodeURIComponent(query)}`;
}

// Initialize the search functionality
document.addEventListener("DOMContentLoaded", setupSearch);

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});

fetchPokemon(`https://pokeapi.co/api/v2/pokemon?limit=24`);
