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
    showAbilities(pokemon.abilities);
    showMoves(pokemon.moves);
  })
  .catch((error) => console.error("Error fetching Pokémon details:", error));

function showDetail(pokemon) {
  // console.log(pokemon.id);
  let id = pokemon.id;
  let baseExperience = pokemon.base_experience;
  let weight = pokemon.weight;
  let height = pokemon.height;
  let name = pokemon.name;
  let image = pokemon.sprites.front_default;
  console.log(image);
  let stats = pokemon.stats;
  let types = pokemon.types.map((type) => type.type.name).join(", ");
  let sound = pokemon.cries.latest;

  document.getElementById("pokemon-detail").innerHTML = `
        <h2>${name}</h2>
        <div class="data">
          <img src="${image}" class="img-thumbnail" alt="${name}" style="width: 300px">
          <table>
            <tr>
              <td>ID</td>
              <td>:</td>
              <td>#${id}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>:</td>
              <td>${weight}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>:</td>
              <td>${height}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>:</td>
              <td>${types}</td>
            </tr>
            <tr>
              <td>Base Experience</td>
              <td>:</td>
              <td>${baseExperience}</td>
            </tr>
            <tr>
              <td>Cries</td>
              <td>:</td>
              <td><audio id="myAudio" controls>
              <source src="${sound}" type="audio/ogg">
            </audio></td>
            </tr>
          </table>
        </div>
        `;
  document.getElementById("pokemon-stats").innerHTML = `
        <h2>Base Stats</h2>
        <ul>
          ${stats
            .map((baseStat) => {
              const percentage = (baseStat.base_stat / 252) * 100;
              return `
                <div class="info">
                  <span>${baseStat.stat.name}: ${baseStat.base_stat}</span>
                </div>
                <div class="progress-line ${baseStat.stat.name}">
                  <span></span>
                </div>
                <style>
                .info {
                  margin-bottom: 5px;
                }
                
                .progress-line {
                  position: relative;
                  border-radius: 10px;
                  width: 200%;
                  height: 5px;
                  background-color: #000;
                  animation: animate 1s cubic-bezier(1, 0, 0.5, 1) forwards;
                  transform: scaleX(0);
                  transform-origin: left;
                }
                
                @keyframes animate {
                  100% {
                    transform: scaleX(1);
                  }
                }
                
                .progress-line span {
                  height: 100%;
                  background-color: red;
                  position: absolute;
                  border-radius: 10px;
                  animation: animate 1s 1s cubic-bezier(1, 0, 0.5, 1) forwards;
                  transform: scaleX(0);
                  transform-origin: left;
                }
                
                .progress-line.${baseStat.stat.name} span{
                  width: ${percentage}%;
                }
                </style>
              `;
            })
            .join("")}
        </ul>
      `;
  const audio = document.getElementById("myAudio");
  audio.volume = 0.2;

  // Inserting Pokémon data into HTML
}

function showAbilities(abilities) {
  const abilitiesContainer = document.getElementById("ability"); // Ensure this ID exists in your HTML
  abilitiesContainer.innerHTML = ""; // Clear previous abilities if needed

  abilities.forEach((ability) => {
    const endpoint = ability.ability.url;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const effectEntry = data.effect_entries.find(
          (entry) => entry.language.name === "en"
        );
        if (effectEntry) {
          const titleAbility = document.createElement("h3");
          const abilityDiv = document.createElement("div");
          abilityDiv.classList.add("ability-info");
          titleAbility.textContent = ability.ability.name;
          abilityDiv.textContent = effectEntry.effect; // Displaying the effect text
          abilitiesContainer.appendChild(titleAbility);
          abilitiesContainer.appendChild(abilityDiv); // Append each ability to the container
        } else {
          console.log(
            `No English effect entry found for ability: ${ability.ability.name}`
          );
        }
      })
      .catch((error) => {
        console.error(
          `Failed to fetch details for ability: ${ability.ability.name}`,
          error
        );
      });
  });

  // let abilitiesUrl = ability.map((ability) => ability.ability.url);
  // abilitiesUrl.forEach((Url) => {
  //   fetch(Url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const effectAbility = data.effect_entries;
  //       console.log(effectAbility);
  //       ability.forEach((ability) => {
  //         document.getElementById("ability").innerHTML = `
  //         <h2>${ability.ability.name}</h2>
  //         <p>${eff}</p>
  //         `;
  //       });
  //     });
  // });
}

function showMoves(moves) {
  const movesContainer = document.getElementById("moves-container"); // Get the container for moves
  movesContainer.innerHTML = ""; // Clear previous content

  moves.forEach((move) => {
    let endpoint = move.move.url;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // Create an anchor element to make the move card clickable
        const link = document.createElement("a");
        link.href = `#`; // Placeholder link, replace with your actual URL or JavaScript function
        link.className = "move-link"; // Styling purposes if needed

        // Create a div element for each move
        const moveDiv = document.createElement("div");
        moveDiv.className = "move";

        // Assuming data.name and optionally data.description are valid attributes from your API

        moveDiv.innerHTML = `
          <h3>${data.name}</h3>
        `;

        // Append the div to the link element
        link.appendChild(moveDiv);
        // Append the link element to the container
        movesContainer.appendChild(link);
      })
      .catch((error) => console.error("Failed to fetch move details:", error));
  });
}
