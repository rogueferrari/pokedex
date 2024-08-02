const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const alternateFrontBack = document.querySelector('.Alternate-front-back');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const elementType = document.querySelector('.element_type');
const ability = document.querySelector('.ability');
const elementAbility = document.querySelector('.element_ability');
const buttonShiny = document.querySelector('.btn-shiny');
const buttonOnOff = document.querySelector('.on-off');
const circleOnOff = document.querySelector('.circle-on-off');
const tampaPokedex = document.querySelector('.tampa_pokedex');
const frameOff = document.querySelector('.frame-off');
const audioDefault = document.querySelector('.audio-default');
const muteButton = document.querySelector('.mute-button');
const audioShiny = document.querySelector('.audio-shiny');

// variável para inicializar a pokedex com o primeiro pokemon
let searchPokemon = 1;
let data = {};

// fetch retorna uma "promise" sendo necessário esperar o retorno, passando "await" e "async"
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
  );

  if (APIResponse.status === 200) {
    //extraindo o JSON do retorno da API
    const data = await APIResponse.json();
    return data;
  }
};

//função que pega o audio (crie) de cada pokemon

//renderizar um pokemon na tela
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  //controla fluxo das cries de cada pokemon
  function playAudio(url) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = url;
    // audioPlayer.play();
    audioPlayer.volume = 0.05;

    tampaPokedex.classList.add('init');
  }

  data = await fetchPokemon(pokemon);

  if (data) {
    //peguei a chave "name" que é disponibilizada na API

    pokemonName.innerHTML = data.species.name;
    elementType.innerHTML = data['types'][0]['type'].name;
    elementAbility.innerHTML = data['abilities'][0]['ability'].name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.front_default;

    //chama as cries de cada pokemon
    playAudio(data.cries.latest);

    pokemonImage.classList.add('front-default');
    console.log(data);
    input.value = '';
    searchPokemon = data.id;
    circleOnOff.classList.add('iluminate-botton');
    circleOnOff.innerHTML = 'ON';
  } else {
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.src =
      'https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif';
    input.value = '';
  }
};

//inicia a música ambiente com o volume no mínimo
audioDefault.volume = 0.04;
audioShiny.volume = 0.05;

muteButton.addEventListener('click', () => {
  if (!audioDefault.muted) {
    audioDefault.pause();
    audioDefault.muted = true;
    muteButton.innerHTML = 'Retake';
  } else {
    audioDefault.play();
    audioDefault.muted = false;
    muteButton.innerHTML = 'Pause';
  }
});

// function removeClassClose() {
//   tampaPokedex.classList.remove('close');
// }

// if (tampaPokedex.classList.contains('close')) {
//   removeClass();
// }

//limpa a habilidade quando muda de pokemon
function clearAbility() {
  elementAbility.innerText = '';
  elementType.innerHTML = '';

  //limpa classes
  pokemonImage.classList.remove('back-default');
}

//ouvir o enter e mostrar pokemon
form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    clearAbility();
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
  clearAbility();
});

function removeClass() {
  pokemonImage.classList.remove('active-shiny');
}

alternateFrontBack.addEventListener('click', () => {
  console.log(data);

  if (pokemonImage.classList.toggle('back-default')) {
    pokemonImage.src = data['sprites']['back_default'];
    alternateFrontBack.innerHTML = 'Front';
    pokemonImage.classList.remove('front-default');
    removeClass();
    audioShiny.muted = true;
  } else {
    pokemonImage.src = data['sprites']['front_default'];
    alternateFrontBack.innerHTML = 'Back';
    pokemonImage.classList.add('front-default');
    removeClass();
    audioShiny.muted = true;
  }
});

//buscar pokemon shiny
function addFrontShiny() {
  if (pokemonImage.classList.toggle('active-shiny')) {
    pokemonImage.src = data['sprites']['front_shiny'];
    buttonShiny.innerHTML = 'Default';
    audioShiny.play();
    if (audioShiny.muted) {
      audioShiny.muted = false;
    }
  } else {
    pokemonImage.src = data['sprites']['front_default'];
    buttonShiny.innerHTML = 'Shiny';
    audioShiny.muted = true;
  }
}

function addBackShiny() {
  if (pokemonImage.classList.toggle('active-shiny')) {
    pokemonImage.src = data['sprites']['back_shiny'];
    buttonShiny.innerHTML = 'Default';
    audioShiny.play();
    if (audioShiny.muted) {
      audioShiny.muted = false;
    }
  } else {
    pokemonImage.src = data['sprites']['back_default'];
    buttonShiny.innerHTML = 'Shiny';
    audioShiny.muted = true;
  }
}

buttonShiny.addEventListener('click', () => {
  console.log(data);
  if (pokemonImage.classList.contains('front-default')) {
    addFrontShiny();
  } else if (pokemonImage.classList.contains('back-default')) {
    addBackShiny();
  } else {
    console.log('problema');
  }
});

//abrir e fechar a tampa da pokedex

// function offPokedex() {
//   pokemonImage.src = '';
//   elementAbility.innerHTML = '';
//   elementType.innerHTML = '';
//   pokemonName.innerHTML = '';
//   pokemonNumber.innerHTML = '';
//   // ability.innerHTML = '';
// }

buttonOnOff.addEventListener('click', () => {
  if (tampaPokedex.classList.contains('close')) {
    document
      .getElementById('tampa-pokedex')
      .classList.toggle('efeito_pokedex_open');
    tampaPokedex.classList.remove('close');
    tampaPokedex.classList.add('open');
    tampaPokedex.classList.remove('efeito_pokedex_close');
    circleOnOff.classList.toggle('iluminate-botton');
    circleOnOff.innerHTML = 'ON';
    circleOnOff.classList.remove('turn-off-light');
    renderPokemon(searchPokemon);
    frameOff.classList.toggle('turn-off-frame');
    // buttonOnOff.classList.toggle('iluminate-botton');
  } else if (tampaPokedex.classList.contains('init')) {
    document
      .getElementById('tampa-pokedex')
      .classList.toggle('efeito_pokedex_close');
    tampaPokedex.classList.remove('open');
    tampaPokedex.classList.add('close');
    tampaPokedex.classList.remove('efeito_pokedex_open');
    circleOnOff.classList.toggle('iluminate-botton');
    circleOnOff.classList.add('turn-off-light');
    circleOnOff.innerHTML = 'OFF';
    frameOff.classList.toggle('turn-off-frame');
    offPokedex();
  } else {
    console.log('problema');
  }
});

//utiliza a id do elemento para associar à uma classe e suas propriedades slide tampa

//inicializa a pokedex com o primeiro pokemon
renderPokemon(searchPokemon);

/* teste para aumentar tamanho de pokemon
document.getElementById("pokemon-image").classList.add("pokemon-teste");
*/
