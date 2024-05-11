const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const cry = document.getElementById('cry');
var button1 = document.getElementById('button1'); // audio dos botoes
var button2 = document.getElementById('button2');
var buttonMute = document.querySelector('.mute');
var buttondef = document.querySelector('.default'); // botoes default e shiny
var buttonshi = document.querySelector('.shiny');
var audio = document.getElementById('myAudio');
var pokestyle = "default";
var muteCont = 1;
let RightLeftVariable = 0;
let searchPokemon = 1;
var FrontBack = 0;

function playMusic(){
    if(muteCont%2 != 0){
        audio.volume = 0.1;
        audio.play();
    } else if(muteCont%2 == 0){
        audio.pause();
    }
}

function pauseMusic(){
    audio.pause();
    }

playMusic();

const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        if(data.id >=1 && data.id<=649){
        return data;
        }
    }
}

const renderPokemon = async (pokemon, pokestyle, RightLeftVariable) => {
    FrontBack=0;
    if(pokestyle=="back"){
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];
        }
    playMusic();
    pokemonImage.style.animation = "none"
    pokemonName.style.animation = "none"
    pokemonNumber.style.animation = "none"
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if(data){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_${pokestyle}`];
            pokemonImage.onload = function() {
            if(RightLeftVariable == "r" || RightLeftVariable == "l"){
                pokemonImage.style.animation = `pokeanime-${RightLeftVariable} 0.3s ease-in-out`;
                pokemonName.style.animation = `pokeanime-${RightLeftVariable} 0.3s ease-in-out`;
                pokemonNumber.style.animation = `pokeanime-${RightLeftVariable} 0.3s ease-in-out`;
            };
            if(pokestyle == "shiny"){
                pokemonName.innerHTML = `${data.name}⋆*`;
            } else{
                pokemonName.innerHTML = `${data.name}`;
            }
            pokemonImage.style.display = "block"
            pokemonNumber.innerHTML = data.id;
            input.value = "";
            searchPokemon = data.id;
            }
        } else{
            pokemon
            pokemonImage.style.display = "none"
            pokemonNumber.innerHTML = "";
            pokemonName.innerHTML = "Not found!";
        }
    }

renderPokemon(searchPokemon, pokestyle);

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if (input.value != ""){
        renderPokemon(input.value.toLowerCase(), pokestyle);
        button1.volume = 0.1;
        button1.currentTime = 0;
        button1.play();
        }
    })

buttonPrev.addEventListener('click', () =>{
    RightLeftVariable = "l";
    button1.currentTime = 0;
    button1.volume = 0.1;
    button1.play();
    if(searchPokemon>1){
        searchPokemon -=1;
        renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
        }
    });

buttonNext.addEventListener('click', () =>{
    RightLeftVariable = "r";
    button2.play();
    button2.currentTime = 0;
    button2.volume = 0.1;
    if(searchPokemon<649){
        searchPokemon +=1;
        renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
        }
    });

document.addEventListener('keydown', (event) =>{
    if(event.key ==="ArrowLeft"){
        RightLeftVariable = "l";
        button1.currentTime = 0;
        button1.volume = 0.1;
        button1.play();
    if(searchPokemon>1){
        searchPokemon -=1;
        renderPokemon(searchPokemon,pokestyle,RightLeftVariable)}; ////////////////
        buttonPrev.classList.add('button-active');

    setTimeout(() =>{
        buttonPrev.classList.remove('button-active');
        buttonPrev.classList.add('button');
    }, 100);

    }else if(event.key === "ArrowRight"){
        RightLeftVariable = "r";
        button2.currentTime = 0;
        button2.volume = 0.1;
        button2.play();
    if(searchPokemon<649){
        searchPokemon +=1;
        renderPokemon(searchPokemon, pokestyle, RightLeftVariable)} ////////////////
        buttonNext.classList.add('button-active');

    setTimeout(() =>{
        buttonNext.classList.remove('button-active');
        buttonNext.classList.add('button');
    }, 100);

    }
});

buttondef.addEventListener('click', () =>{
    RightLeftVariable = 0;
    button1.currentTime = 0;
    button1.volume = 0.1;
    button1.play();
    pokestyle = "default";
    renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
});

buttonshi.addEventListener('click', () =>{
    RightLeftVariable = 0;
    button1.currentTime = 0;
    button1.volume = 0.1;
    button1.play();
    pokestyle = "shiny";
    renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
});

buttonMute.addEventListener('click', () =>{
    muteCont++;
    playMusic();
});

const renderPokemonBack = async (pokemon, pokestyle, FrontBack) => {
    console.log(pokestyle);
    const data = await fetchPokemon(pokemon);
    if(FrontBack % 2 ==0){
        if(data){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`back_${pokestyle}`];
            }
        }else {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_${pokestyle}`];
        }
};

pokemonImage.addEventListener('click', async () =>{
    const data = await fetchPokemon(searchPokemon);
    cry.src = data['cries']['latest'];
    cry.volume = 0.05;
    cry.play();
    renderPokemonBack(searchPokemon, pokestyle, FrontBack);
    FrontBack++;
});

window.addEventListener("focus", function() {
    playMusic();
  });

window.addEventListener("blur", function() {
    pauseMusic();
  });