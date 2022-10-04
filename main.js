const btn = document.querySelector(".btn-send");
const card = document.querySelector(".card");
let small = document.querySelector(".small");

const renderError = (input, msg) => {
    input.value = "";
    input.classList.add("error");
    small.innerText = msg
}

const cleanError = (input) => {
    input.value = "";
    input.classList.remove("error");
    small.innerText = ""
}

const getPokemon = async () => {
    let input = document.querySelector(".input-pokemon");
    if((input.value != 0) && (input.value < 906)){
        const urlBase = `https://pokeapi.co/api/v2/pokemon/${input.value}/`;
        const respuesta = await fetch(urlBase);
        const data = await respuesta.json()
        cleanError(input);
        return data;
    } else if(input.value.length === 0){
        renderError(input,"Ingrese un ID");
    } else {
        renderError(input,"ID no encontrado");
    }
}

const renderPoke = (pokemon) => {
    const {name, types, height, weight, sprites} = pokemon;
    return `<img src=${sprites.other.home.front_default} alt="Imagen de ${name}">
        <h3>${name.toUpperCase()}</h3>
        <p class="typePoke">Type: <b>${types[0].type.name.toUpperCase()}</b></p>
        <p>Height: ${height/10}Mts | Weight: ${weight/10}Kgs</p>
        `        
}

btn.addEventListener("click", async () =>{
    let poke = await getPokemon();
    (poke == undefined) ? poke = poke : card.innerHTML = await renderPoke(poke);
})

