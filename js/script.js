const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
var button1 = document.getElementById('button1'); // audio dos botoes
var button2 = document.getElementById('button2');
var buttondef = document.querySelector('.default'); // botoes default e shiny
var buttonshi = document.querySelector('.shiny');
var audio = document.getElementById('myAudio');
var pokestyle = "default"

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async(pokemon) => {
    audio.volume = 0.02
    audio.play();
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        pokemonImage.style.animation = "pokeanime 0.5s ease-in-out"
        pokemonName.style.animation = "pokeanime 0.5s ease-in-out"
        pokemonNumber.style.animation = "pokeanime 0.2s ease-in-out"
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon, pokestyle) => {
    pokemonImage.style.animation = "none"
    pokemonName.style.animation = "none"
    pokemonNumber.style.animation = "none"
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if(data){
    pokemonImage.style.display = "block"
    if(pokestyle == "default"){
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonName.innerHTML = `${data.name}`;
    } else {
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    pokemonName.innerHTML = `${data.name}*`;
    }
    pokemonNumber.innerHTML = data.id;
    input.value = "";
    searchPokemon = data.id;
    } else{
        pokemon
    pokemonImage.style.display = "none"
    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Not found!";
    }
}
renderPokemon(searchPokemon);


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    button1.volume = 0.1
    button1.currentTime = 0
    button1.play();
});

buttonPrev.addEventListener('click', () =>{
    button1.currentTime = 0
    button1.play();
    button1.volume = 0.1
    if(searchPokemon>1){
    searchPokemon -=1;
    renderPokemon(searchPokemon, pokestyle)
    }
});
buttonNext.addEventListener('click', () =>{
    button2.play();
    button2.currentTime = 0
    button2.volume = 0.1
    if(searchPokemon<649){
    searchPokemon +=1;
    renderPokemon(searchPokemon, pokestyle)}
});

document.addEventListener('keydown', (event) =>{
    if(event.key ==="ArrowLeft"){
    button1.currentTime = 0
    button1.play();
    button1.volume = 0.1
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
    button2.play();
    button2.volume = 0.1
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
    button1.play();
    button1.volume = 0.1
    pokestyle = "default"
    renderPokemon(searchPokemon, pokestyle)
});

buttonshi.addEventListener('click', () =>{
    button1.currentTime = 0
    button1.play();
    button1.volume = 0.1
    pokestyle = "shiny"
    renderPokemon(searchPokemon, pokestyle)
});