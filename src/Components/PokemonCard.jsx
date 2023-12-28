// Importar React para crear componentes de React
import React from 'react';

// Definir el componente funcional PokemonCard que acepta 'pokemon' como prop
function PokemonCard({ pokemon }) {
  // Verificar si no hay información del Pokémon, y si es así, no renderizar nada
  if (!pokemon) return null;

  // Renderizar la tarjeta del Pokémon
  return (
    <div className="max-w-xs bg-white text-gray-700 rounded-lg overflow-hidden shadow-lg my-4" style={{ position: 'relative', top: '10px', left: '0px' }}>
      {/* Mostrar la imagen del Pokémon */}
      <img
        className="w-full"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      {/* Sección de información del Pokémon */}
      <div className="px-6 py-4">
        {/* Mostrar el nombre del Pokémon  */}
        <div className="mb-2 text-xl font-bold capitalize">
          {pokemon.name}
        </div>

        {/* Sección de habilidades del Pokémon */}
        <p className="text-gray-700 text-base font-semibold mb-2">
          Habilidades:
        </p>

        {/* Lista de habilidades del Pokémon */}
        <ul className="list-disc pl-4">
          {pokemon.abilities.map((ability) => (
            <li
              key={ability.ability.name}
              className="text-gray-600 text-sm"
            >
              {ability.ability.name}
            </li>
          ))}
        </ul>

        {/* Sección de tipos del Pokémon */}
        <p className="text-gray-700 text-base font-semibold mt-2">
          Tipo(s):
        </p>

        {/* Lista de tipos del Pokémon */}
        <ul className="list-disc pl-4">
          {pokemon.types.map((type) => (
            <li key={type.type.name} className="text-gray-600 text-sm">
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Exportar el componente PokemonCard para su uso en otros archivos
export default PokemonCard;
