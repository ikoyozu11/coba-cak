const endpoint = "https://pokeapi.co/api/v2/move?limit=937";
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    let result = data.results;
    // console.log(result);
    let cards = ""; // Variabel untuk menampung hasil dari showCards
    result.forEach((moves) => {
      let namaMove = moves.url;
      //   cards += showCards(namaMove);
      //   const pokemonContainer = document.querySelector("#pokemon-list");
      //   pokemonContainer.innerHTML = cards;
      //   console.log(namaMove);
      fetch(namaMove)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    });
  });

function showCards(namaMove) {
  return `
  <a href="#"
  <div class="col-lg-2 col-md-3 col-sm-4 mb-4">
    <div class="card">
      
      <div class="card-body">
      <h5 class="text-center card-title">${namaMove}</h5>
      </div>
    </div>
  </div></a> 
  `;
}
