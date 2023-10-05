import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import Loader from '../../components/Loader';
import Logo from './culinaria.png';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSearch = async () => {
    try {
      setCarregando(true);
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      console.log('Response:', response.data);

      if (response.data.meals === null || response.data.meals.length === 0) {
        console.log('Nenhum resultado encontrado');
        setSearchResults([]);
        setShowPopup(true);
      } else {
        console.log('Resultados encontrados');
        setSearchResults(response.data.meals);
        setShowPopup(false);
      }
    } catch (error) {
      console.error('Erro ao buscar o dado:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <header className="container">
        <div className='information-search'>
          <div className='logoImage'>
            <img src={Logo} alt='Culinária' />
            <h2>Culinária Criação</h2>
          </div>
          <span className='search-input'>
            <label htmlFor='searchTerm' className='label-input'>Pesquisar Receitas</label>
            <input
              type='text'
              className='search-input'
              id='searchTerm'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" className='search-button' onClick={handleSearch}>
              PESQUISAR
            </button>
          </span>
        </div>
      </header>
      <div className="content-container">
        <div className='answerImages'>
          {carregando ? (
            <Loader />
          ) : searchResults.length === 0 ? (
            <p>Nenhum item encontrado 😅</p>
          ) : (
            searchResults.map((recipe) => (
              <div className='containerImgs' key={recipe.idMeal}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h2>{recipe.strMeal}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
