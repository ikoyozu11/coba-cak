let currentPage = 1;
const itemsPerPage = 56;

function fetchItems(page) {
  const endpoint = `https://pokeapi.co/api/v2/item?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      let result = data.results;

      // Fetch category information for each item
      Promise.all(result.map(item => fetch(item.url).then(response => response.json())))
        .then(items => {
          // Sort items based on their categories
          items.sort((a, b) => a.category.name.localeCompare(b.category.name));

          let cards = ""; // Variable to store the generated cards
          items.forEach(item => {
            let itemImage = item.sprites.default;
            let itemName = item.name;
            cards += showCards(itemName, itemImage); // Add the card to the cards variable
          });

          const pokemonContainer = document.querySelector("#pokemon-list");
          pokemonContainer.innerHTML = cards; // Update the HTML content with the generated cards
        });
    });
}

// Function to load the next page of items
function loadNextPage() {
  currentPage++;
  fetchItems(currentPage);
}

// Initial load of items
fetchItems(currentPage);

function showCards(itemName, itemImage) {
  return `
  <a href="#">
      <div class="card">
        <img src="${itemImage}" class="card-img-top mx-auto" alt="${itemName}" style="width: 150px">
        <div class="card-body">
          <h5 class="text-center card-title">${itemName}</h5>
        </div>
      </div>
  </a>`;
}
