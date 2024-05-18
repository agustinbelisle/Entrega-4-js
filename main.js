const resultContainer = document.getElementById('result-container');
const searchBtn = document.getElementById('search-btn');
const pokemonIdInput = document.getElementById('pokemon-id');

searchBtn.addEventListener('click', async () => {
  const pokemonId = pokemonIdInput.value.trim();

  if (!pokemonId || isNaN(pokemonId)) {
    resultContainer.innerHTML = '<p>Por favor, ingresa un número válido.</p>';
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    if (!response.ok) {
      resultContainer.innerHTML = '<p>No se encontró ningún Pokémon con ese ID.</p>';
      return;
    }

    const pokemon = await response.json();
    renderPokemon(pokemon);
  } catch (error) {
    console.error('Error al obtener los datos del Pokémon:', error);
    resultContainer.innerHTML = '<p>Hubo un error al buscar el Pokémon. Inténtalo de nuevo más tarde.</p>';
  }
});

function renderPokemon(pokemon) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const pokemonTypes = pokemon.types.map(type => type.type.name);
  const pokemonHeight = (pokemon.height / 10).toFixed(2);
  const pokemonWeight = (pokemon.weight / 10).toFixed(2);
  const pokemonImage = pokemon.sprites.front_default;

  pokemonCard.innerHTML = `
    <img src="${pokemonImage}" alt="${pokemonName}">
    <h2>${pokemonName}</h2>
    <p>Tipo: ${pokemonTypes.join(', ')}</p>
    <p>Altura: ${pokemonHeight} m</p>
    <p>Peso: ${pokemonWeight} kg</p>
  `;

  resultContainer.innerHTML = '';
  resultContainer.appendChild(pokemonCard);
}

