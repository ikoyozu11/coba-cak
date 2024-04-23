const endpoint = "https://pokeapi.co/api/v2/item?limit=24";
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    let result = data.results;
    let cards = ""; // Variabel untuk menampung hasil dari showCards
    result.forEach((item) => {
      let itemUrl = item.url;
      fetch(itemUrl)
        .then((response) => response.json())
        .then((Url) => {
          let itemImage = Url.sprites.default;
          console.log(itemImage);
          let itemName = Url.name;
          cards += showCards(itemName, itemImage); // Tambahkan hasil dari showCards ke dalam variabel cards
          const pokemonContainer = document.querySelector("#pokemon-list");
          pokemonContainer.innerHTML = cards;
        });
    });
  });

function showCards(itemName, itemImage) {
  return `
  <a href="#"
    <div class="card">
      <img src="${itemImage}"  alt="${itemName}" style="width: 150px">
      <div class="card-body">
      <h5">${itemName}</h5>
      </div>
    </div>
  </a> 
  `;
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
  });
});
