import React, { useState, useCallback, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import Item from './components/Item';

// Custom hook for debouncing a value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = useCallback(async (searchTerm) => {
    try {
      const response = await fetch(`/api/items/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, []);

  // Run search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== '') {
      handleSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, handleSearch]);

  const onChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  // Virtualized list row renderer
  const Row = useCallback(({ index, style }) => {
    const item = results[index];
    return (
      <div style={style}>
        <Item 
          iid={item._id} 
          name={item.name} 
          description={item.description} 
          onUpdateDelete={() => handleSearch(debouncedQuery)} 
        />
      </div>
    );
  }, [results, debouncedQuery, handleSearch]);

  return (
    <div style={{ padding: '5px' }}>
      <h1>Search App (Optimized Frontend)</h1>
      <input 
        type="text" 
        value={query} 
        onChange={onChangeHandler} 
        placeholder="Enter search term" 
        style={{ padding: '10px', fontSize: '16px', width: '90%', marginBottom: '20px' }}
      />
      {results.length > 0 ? (
        <List
          height={500}               // height of the list container in pixels
          itemCount={results.length} // number of items in the list
          itemSize={200}             // height of each item row in pixels (adjust based on your design)
          width="97%"               // full width
        >
          {Row}
        </List>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default App;
