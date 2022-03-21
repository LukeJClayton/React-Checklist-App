import React, { useState, useContext, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from './js/Storage.js';
import { useRefreshProfile, useLoadProfile, useSaveProfile } from "./js/Profile.js";

import { FilterProvider, FilterContext } from "./context/Filter.js";
import { ItemsContext, ItemsProvider } from "./context/Items.js";

import { FilterBar } from './components/Filter.js';
import { ItemList } from './components/Items.js';

import './App.css';

const data = require('./data/data.json');

function Main(props) {
  const items = useContext(ItemsContext);
  const filters = useContext(FilterContext);
  const saveProfile = useSaveProfile();
  const loadProfile = useLoadProfile();
  const refreshProfile = useRefreshProfile();
  const [filtersHidden, setFiltersHidden] = useState(false);


  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <div className="main">
      <p className="main__title">{ data.title }</p>
      <button className="main__refresh" onClick={ refreshProfile }>Refresh Data (Clears Everything)</button><br/>
      <button className="main__refresh" onClick={() => {setFiltersHidden(!filtersHidden)} }>Show/Hide Filters</button>
      <FilterBar filters={filters.filters} hiddenClass={filtersHidden ? 'is--hidden' : ''}/>
      <ItemList data={items.items} />
    </div>
  );
}

function App() {
  return (
    <FilterProvider>
    <ItemsProvider>
      <Main />
    </ItemsProvider>
    </FilterProvider>
  );
}

export default App;
