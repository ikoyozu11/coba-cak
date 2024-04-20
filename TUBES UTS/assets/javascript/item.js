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
  <div class="col-lg-2 col-md-3 col-sm-4 mb-4">
    <div class="card">
      <img src="${itemImage}" class="card-img-top mx-auto" alt="${itemName}" style="width: 150px">
      <div class="card-body">
      <h5 class="text-center card-title">${itemName}</h5>
      </div>
    </div>
  </div></a> 
  `;
}
