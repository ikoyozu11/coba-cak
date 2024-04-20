const endpoint = "https://freetestapi.com/api/v1/animals";
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    let show = "";
    data.forEach((animal) => {
      let name = animal.name;
      let image = animal.image;
      console.log(image);
      show += showAnimal(name, image); // Call showAnimal function with name and image
    });

    const pokemonContainer = document.querySelector("#pokemon-list");
    pokemonContainer.innerHTML = show; // Set the HTML after the loop
  });

function showAnimal(name, image) {
  // Define the function to create HTML for each animal
  return `
    <div class="animal">
      <h2>${name}</h2>
      <img src="${image}" alt="${name}">
    </div>
  `;
}
