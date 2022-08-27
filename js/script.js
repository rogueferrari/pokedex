const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonShiny = document.querySelector(".btn-shiny");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

// variável para inicializar a pokedex com o primeiro pokemon
let searchPokemon = 1;
let data = {};

// fetch retorna uma "promise" sendo necessário esperar o retorno, passando "await" e "async"
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    //extraindo o JSON do retorno da API
    const data = await APIResponse.json();
    return data;
  }
};

//renderizar um pokemon na tela
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  data = await fetchPokemon(pokemon);

  if (data) {
    //peguei a chave "name" que é disponibilizada na API
    if (data.name.length >= 15) {
      pokemonName.innerHTML = data.species.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    } else if (data.id > 649) {
      pokemonName.innerHTML = data.species.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"][
          "front_default"
        ];
    } else {
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    }
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Not Found :c";
    pokemonNumber.innerHTML = "";
    pokemonImage.src =
      "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";
    input.value = "";
  }
};

//ouvir o enter e mostrar pokemon
form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonShiny.addEventListener("click", () => {
  console.log(data);
  if (data.id < 650) {
    pokemonName.innerHTML = data.species.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_shiny"
      ];
  } else {
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["front_shiny"];
  }
});

//utiliza a id do elemento para associar à uma classe e suas propriedades slide tampa
document.getElementById("tampa-pokedex").classList.add("efeito_pokedex");

//inicializa a pokedex com o primeiro pokemon
renderPokemon(searchPokemon);

/* teste para aumentar tamanho de pokemon
document.getElementById("pokemon-image").classList.add("pokemon-teste");
*/
