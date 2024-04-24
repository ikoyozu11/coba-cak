const itemsData = document.getElementById("items-list");
const itemsSearch = document.getElementById("items-search");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

function fetchItems(endpoint) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const itemArray = data.results;
      const nextUrl = data.next;
      const previousUrl = data.previous;
      previousButton.setAttribute("data-url", previousUrl);
      nextButton.setAttribute("data-url", nextUrl);

      return Promise.all(
        itemArray.map((item) => fetch(item.url).then((result) => result.json()))
      );
    })
    .then((itemDetails) => {
      showCards(itemDetails);
    })
    .catch((error) => {
      console.error("Terjadi masalah ketika mengambil data API: ", error);
    });
}

function showCards(itemArray) {
  itemsData.innerHTML = "";
  itemArray.forEach((items) => {
    let id = items.id;
    let img = items.sprites.default;
    let name = items.name;
    itemsData.innerHTML += `
    <a href="detailPokemon.html?id=${id}" class="card-link">
      <div class="card">
        <img src="${img}" alt="${name}">
        <div class="container">
          <h5>${name}</h5>
        </div>
      </div>
    </a>
    `;
    console.log(items);
  });
}

previousButton.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  fetchItems(url);
});

nextButton.addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  fetchItems(url);
});

function setupSearch() {
  const inputElement = document.getElementById("items-search");
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});
fetchItems(`https://pokeapi.co/api/v2/item?limit=24`);
