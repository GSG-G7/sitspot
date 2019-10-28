import React from 'react';

import './style.css';
import SearchResult from '../components/SearchResultComponent/index';

const App = () => {
  return (
    <div className="App">
      <SearchResult resultArray={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
    </div>
  );
};

export default App;
