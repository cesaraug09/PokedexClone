const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
var button1 = document.getElementById('button1'); // audio dos botoes
var button2 = document.getElementById('button2');
var buttonMute = document.querySelector('.mute');
var buttondef = document.querySelector('.default'); // botoes default e shiny
var buttonshi = document.querySelector('.shiny');
var audio = document.getElementById('myAudio');
var pokestyle = "default"
let muteCont = 1;
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let RightLeftVariable = 1;
let searchPokemon = 1;


function playMusic(){

    if(muteCont%2 != 0){
        audio.volume = 0.02
        audio.play();
    } else if(muteCont%2 == 0){
        audio.pause()
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

const renderPokemon = async (pokemon, pokestyle) => {
    playMusic();
    pokemonImage.style.animation = "none"
    pokemonName.style.animation = "none"
    pokemonNumber.style.animation = "none"
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if(data){
        if(pokestyle == "default"){
                pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
                pokemonImage.onload = function() {
                if(data.id>RightLeftVariable){
                pokemonImage.style.animation = "pokeanime-r 0.3s ease-in-out"
                pokemonName.style.animation = "pokeanime-r 0.3s ease-in-out"
                pokemonNumber.style.animation = "pokeanime-r 0.3s ease-in-out"
                RightLeftVariable = data.id;
                } else{
                    pokemonImage.style.animation = "pokeanime-l 0.3s ease-in-out"
                    pokemonName.style.animation = "pokeanime-l 0.3s ease-in-out"
                    pokemonNumber.style.animation = "pokeanime-l 0.3s ease-in-out"
                    RightLeftVariable = data.id;
                }
                pokemonName.innerHTML = `${data.name}`;
                pokemonImage.style.display = "block"
                pokemonNumber.innerHTML = data.id;
            }
            } else{
                pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
                pokemonImage.onload = function() {
                        pokemonImage.style.animation = "pokeanime-r 0.3s ease-in-out"
                        pokemonName.style.animation = "pokeanime-r 0.3s ease-in-out"
                        pokemonNumber.style.animation = "pokeanime-r 0.3s ease-in-out"
                        RightLeftVariable = data.id;
                pokemonName.innerHTML = `${data.name} ✧`;
                pokemonImage.style.display = "block"
                pokemonNumber.innerHTML = data.id;
                }
        }
        input.value = "";
        searchPokemon = data.id;
    } else{
        pokemon
        pokemonImage.style.display = "none"
        pokemonNumber.innerHTML = "";
        pokemonName.innerHTML = "Not found!";
    }
}
renderPokemon(searchPokemon, "default");


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    button1.volume = 0.07
    button1.currentTime = 0
    button1.play();
});

buttonPrev.addEventListener('click', () =>{
    button1.currentTime = 0
    button1.volume = 0.07
    button1.play();
    if(searchPokemon>1){
        searchPokemon -=1;
        renderPokemon(searchPokemon, pokestyle)
    }
});
buttonNext.addEventListener('click', () =>{
    button2.play();
    button2.volume = 0.07
    button2.currentTime = 0
    if(searchPokemon<649){
        searchPokemon +=1;
        renderPokemon(searchPokemon, pokestyle)}
    });

    document.addEventListener('keydown', (event) =>{
        if(event.key ==="ArrowLeft"){
    button1.currentTime = 0
    button1.volume = 0.07
    button1.play();
    if(searchPokemon>1){
    searchPokemon -=1;
    renderPokemon(searchPokemon)}
    buttonPrev.classList.add('button-active');
    setTimeout(() =>{
        buttonPrev.classList.remove('button-active');
        buttonPrev.classList.add('button');
    }, 100);
    }else if(event.key === "ArrowRight"){
    button2.currentTime = 0
    button2.volume = 0.07
    button2.play();
    if(searchPokemon<649){
    searchPokemon +=1;
    renderPokemon(searchPokemon)}
    buttonNext.classList.add('button-active');
    setTimeout(() =>{
        buttonNext.classList.remove('button-active');
        buttonNext.classList.add('button');
    }, 100);
    }
});




buttondef.addEventListener('click', () =>{
    button1.currentTime = 0
    button1.volume = 0.05
    button1.play();
    pokestyle = "default"
    renderPokemon(searchPokemon, pokestyle)
});

buttonshi.addEventListener('click', () =>{
    button1.currentTime = 0
    button1.volume = 0.05
    button1.play();
    pokestyle = "shiny"
    renderPokemon(searchPokemon, pokestyle)
});

buttonMute.addEventListener('click', () =>{
    muteCont++;
    playMusic();
});

window.addEventListener("focus", function() {
    playMusic();
  });

  window.addEventListener("blur", function() {
    pauseMusic();
  });