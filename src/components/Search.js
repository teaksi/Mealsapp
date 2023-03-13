import React, { useState } from 'react'
import { useGlobalContext } from '../context/context';

const Search = () => {
  const [text, setText] = useState('');
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  }

  const handleRandomClick = (e) => {
    e.preventDefault();
    setSearchTerm('');
    setText('');
    fetchRandomMeal();
  }

  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='type your favourite meal' value={text} onChange={handleChange} className='form-input' />
        <button type='submit' className='btn'>Search</button>
        <button type='button' className='btn btn-hipster' onClick={handleRandomClick}>Surprise me</button>
      </form>
    </header>
  )
}

export default Search
