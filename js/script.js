const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const novoInput = document.querySelector('.input_search2');
const res = document.querySelector('.res');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const cry = document.getElementById('cry');
var button1 = new Audio('./music/sound-button1.mp4');
var button2 = new Audio('./music/sound-button2.mp4');
var buttonMute = document.querySelector('.mute');
var buttondef = document.querySelector('.default'); // botoes default e shiny
var buttonshi = document.querySelector('.shiny');
var audio = new Audio('./music/music.mp4');
var pokestyle = "default";
var muteCont = 1;
let RightLeftVariable = 0;
let searchPokemon = 1;
var FrontBack = 0;
let ListaNomesModificados = [];
audio.volume = 0.05;
button1.volume = 0.05;
button2.volume = 0.05;
let inputVisibleConfirmed = 0;
//////////////////////////////////////////////////////////////////////////////

function buttonSound1(){
    button1.currentTime = 0;
    button1.play();
};

function buttonSound2(){
    button2.currentTime = 0;
    button2.play();
};

function ModificarNome(nome){
    let nomeModificado = nome;
    if(nomeModificado!=""){
    ListaNomesModificados[searchPokemon] = nomeModificado;
    pokemonName.innerHTML = nomeModificado;
    }
    localStorage.setItem(`nome${searchPokemon}`, nomeModificado);
};

function playMusic(){
    if(muteCont%2 != 0){
        audio.play();
    } else if(muteCont%2 == 0){
        audio.pause();
    }
};

function pauseMusic(){
    audio.pause();
};

function apagar(){
    pokemonImage.style.scale= "1";
    pokemonImage.style.left= "50%";
    pokemonImage.style.filter= "brightness(100%)";

  console.log("clicou fora");
  novoInput.style.opacity = "0%";
  novoInput.style.padding = "0%";
  novoInput.style.width = "0";
  novoInput.style.animation = "none";
  inputVisibleConfirmed = 0;
};

const fetchPokemon = async(pokemon) => {
    playMusic();
    if (ListaNomesModificados.includes(pokemon)) {
        console.log("ACHOOU")
        pokemon = ListaNomesModificados.indexOf(pokemon);
    }
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        if(data.id >=1 && data.id<=649){
            return data;
        }
    }
};

const renderPokemonBack = async (pokemon, pokestyle, FrontBack) => {
    const data = await fetchPokemon(pokemon);
    if(FrontBack % 2 ==0){
        if(data){
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`back_${pokestyle}`];
            }
        }else {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_${pokestyle}`];
    }
};

const renderPokemon = async (pokemon, pokestyle, RightLeftVariable) => {

    FrontBack = 0;
    pokemonName.style.color = "#3a444d";
    pokemonName.style.fontWeight = 600;
    pokemonImage.style.animation = "none"
    pokemonName.style.animation = "none"
    pokemonNumber.style.animation = "none"
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);
    if(data){

            if(ListaNomesModificados[data.id] !== undefined){
                data.name = `${ListaNomesModificados[data.id]}`;
        }
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_${pokestyle}`];
        pokemonImage.onload = function() {
            if(RightLeftVariable == "r" || RightLeftVariable == "l"){
                pokemonImage.style.animation = `pokeanime-${RightLeftVariable} 0.3s ease-in-out`;
                pokemonName.style.animation = `pokeanime-${RightLeftVariable} 0.3s ease-in-out`;
                pokemonNumber.style.animation = `pokeanime-${RightLeftVariable} 0.3s ease-in-out`;
        }
            if(pokestyle == "shiny"){
                pokemonName.style.fontWeight = 700;
                pokemonName.style.color = "#ad1717";
                pokemonName.innerHTML = `${data.name}✧`;
            } else if (pokestyle == "default"){
                pokemonName.innerHTML = `${data.name}`;
            }

            if(RightLeftVariable == "0"){
                pokemonImage.style.animation = "pokeshine 0.2s linear"
                pokemonName.style.animation = "pokeshine 0.2s linear"
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
};



//////////////// Event Listeners //////////////////////////////////




form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if (input.value != ""){
        renderPokemon(input.value.toLowerCase(), pokestyle);
        buttonSound1();
    }
});

buttonPrev.addEventListener('click', () =>{
    RightLeftVariable = "l";
    buttonSound1();
    if(searchPokemon>1){
        searchPokemon -=1;
        renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
    }
});

buttonNext.addEventListener('click', () =>{
    RightLeftVariable = "r";
    buttonSound2();
    if(searchPokemon<649){
        searchPokemon +=1;
        renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
        }
});

document.addEventListener('keydown', (event) =>{
    if(event.key ==="ArrowLeft"){
        if(inputVisibleConfirmed==1){
        apagar();}
        RightLeftVariable = "l";
        buttonSound1();
    if(searchPokemon>1){
        searchPokemon -=1;
        renderPokemon(searchPokemon,pokestyle,RightLeftVariable)}; ////////////////
        buttonPrev.classList.add('button-active');

    setTimeout(() =>{
        buttonPrev.classList.remove('button-active');
        buttonPrev.classList.add('button');
    }, 100);

    }else if(event.key === "ArrowRight"){
        if(inputVisibleConfirmed==1){
        apagar();}
        RightLeftVariable = "r";
        buttonSound2();
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
    buttonSound1();
    pokestyle = "default";
    renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
});

buttonshi.addEventListener('click', () =>{
    RightLeftVariable = 0;
    buttonSound1();
    pokestyle = "shiny";
    renderPokemon(searchPokemon, pokestyle, RightLeftVariable);
});

buttonMute.addEventListener('click', () =>{
    muteCont++;
    playMusic();
});



pokemonImage.addEventListener('click', async () =>{
    const { cries: { latest } } = await fetchPokemon(searchPokemon);
    cry.src = latest;
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


pokemonName.addEventListener('click', function(){
    novoInput.value = "";
    buttonSound2();
    novoInput.style.opacity = "100%";
    novoInput.style.padding = "4%";
    novoInput.style.width = "100%";
    inputVisibleConfirmed = 1;
    pokemonImage.style.animation = "pokeshine 0.2s linear"
    pokemonImage.style.scale= "1.2";
    pokemonImage.style.left= "54%";
    pokemonImage.style.filter= "brightness(110%)";
    novoInput.style.animation = "inout 0.24s ease-in";

    novoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter'){
            buttonSound1();
            event.preventDefault();
            if (novoInput.value != ""){
            apagar();
            ModificarNome(novoInput.value);
            }
        }
    });

document.addEventListener('click', function(event) {
        if (event.target !== novoInput && !novoInput.contains(event.target) && event.target !== pokemonName && inputVisibleConfirmed == 1) {
            apagar();
        }
    });
});

window.addEventListener('load', function(){
    for(let i = 1; i <= 649; i++){
        if(localStorage.getItem(`nome${i}`) !== null){
            ListaNomesModificados[i] = localStorage.getItem(`nome${i}`);
        }
    }
    renderPokemon(searchPokemon, pokestyle);
});


playMusic();