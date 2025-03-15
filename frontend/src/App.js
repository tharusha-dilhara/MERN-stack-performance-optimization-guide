import React, { useState } from 'react';
import Item from './components/Item';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  // Trigger search on every keystroke (non-optimized)
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`/api/items/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Calls handleSearch on every keystroke (no debounce)
    handleSearch(value);
  };

  console.log('Rendering App component');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search App (Optimized Frontend)</h1>
      <input 
        type="text" 
        value={query} 
        onChange={onChangeHandler} 
        placeholder="Enter search term" 
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <div>
        {results.map((item) => (
          <Item key={item._id} iid={item._id} onUpdateDelete={() => handleSearch(query)} name={item.name} description={item.description} />
        ))}
      </div>
    </div>
  );
}

export default App;
