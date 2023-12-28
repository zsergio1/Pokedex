// Importar los hooks useState y useEffect de React, axios para hacer solicitudes HTTP y el componente PokemonCard
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './Components/PokemonCard';
import './App.css'; // Estilos adicionales
import myImage from './img/imagen.png'; // Importar una imagen

function App() {
  // Estados para almacenar la información del Pokémon, la búsqueda, el contador y el ID aleatorio
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(1);
  const [randomId, setRandomId] = useState(null);


  useEffect(() => {
    // Efecto que se ejecuta al montar la aplicación
    // Genera un ID aleatorio y realiza la primera llamada a fetchPokemon
    const initialRandomId = Math.floor(Math.random() * 150) + 1;
    setRandomId(initialRandomId);
    fetchPokemon(initialRandomId);
  }, []); // El segundo parámetro [] asegura que este efecto se ejecute solo al montar la aplicación

  // Función asincrónica para realizar una solicitud a la API de Pokémon y actualizar el estado
  const fetchPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await axios.get(url);
    setPokemon(res.data);
  }

  // Función para manejar la búsqueda de un Pokémon por nombre
  const handleSearch = async () => {
    if (search.trim() === "") {
      // Cuadro de búsqueda vacío, limpiar el estado del Pokémon
      setPokemon(null);
      setError("Por favor, ingresa el nombre de un Pokémon.");
      return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
    try {
      const res = await axios.get(url);
      // Actualizar el estado 'pokemon' con los datos recibidos de la respuesta
      setPokemon(res.data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("No se pudo encontrar el Pokémon."); 
    }
  }

  // Función para manejar el siguiente Pokémon
  const handleNext = () => {
    setCount(prevCount => prevCount + 1);
    fetchPokemon(count + 1);
  }

  // Función para manejar un Pokémon aleatorio
  const handleRandom = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    setRandomId(id);
    fetchPokemon(id);
  }

  // Renderización de la interfaz de usuario
  return (
    <div className="bg-red-500 p-8 text-black rounded">
            <h1 className="text-5xl font-extrabold text-center mb-8 text-white" style={{ fontFamily: 'cursive' }}>
        Buscador de Pokémon
      </h1>

      <div className="mb-4 flex items-center">
        {/* Cuadro de entrada y botón para buscar Pokémon por nombre */}
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          className="border p-2 rounded mr-2" 
        />
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-lg p-2 rounded"
          onClick={handleSearch}  
        >
          Buscar
        </button>
      </div>

      {/* Imagen personalizada */}
      <div style={{ position: 'absolute', top: '200px', right: '350px' }}>
        <img
          style={{ width: '500px', height: '200px' }}
          src={myImage}
          alt="Custom Image"
        />
      </div>

      {/* Componente PokemonCard que muestra la información del Pokémon */}
      <PokemonCard pokemon={pokemon} />
      
      <div className="mt-4 text-lg flex justify-around">
        {/* Botones para mostrar el siguiente Pokémon o uno aleatorio */}
        <button  
          className="bg-blue-400 hover:bg-blue-500 p-2 rounded"
          onClick={handleNext}  
        >
          Siguiente ({count}) 
        </button>

        <button
          className="bg-green-400 hover:bg-green-500 p-2 rounded"
          onClick={handleRandom}
        >
          Aleatorio ({randomId}) 
        </button>
      </div>
    </div>
  );
}

export default App;
