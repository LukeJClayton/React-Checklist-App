import React, { useState, useContext, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from './js/Storage.js';
import { useLoadProfile, useSaveProfile } from "./js/Profile.js";

import { FilterFunction, FilterProvider, FilterContext } from "./context/Filter.js";
import { ProfileContext } from "./context/Profile.js";
import { ItemsContext } from "./context/Items.js";

import { FilterBar } from './components/Filters.js';
import { ItemList } from './components/Items.js';

import './App.css';

const data = require('./data/data.json');

function Main(props) {
  const filters = useContext(FilterContext);
  const filterFunction = useContext(FilterFunction);
  const saveProfile = useSaveProfile();
  const loadProfile = useLoadProfile();

  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <div className="main">
      <p className="main__title">{ data.title }</p>
      <FilterBar filters={filters.filters} />
      <ItemList data={ props.filteredData } />
    </div>
  );
}

function App() {
  const [filteredData, setFilteredData] = useState(data.items);

  return (
    <FilterProvider>
    <FilterFunction.Provider value={ setFilteredData }>
    <ItemsContext.Provider value={ [] }>
    <ProfileContext.Provider value={ '' }>
      <Main filteredData={ filteredData } />
    </ProfileContext.Provider>
    </ItemsContext.Provider>
    </FilterFunction.Provider>
    </FilterProvider>
  );
}

export default App;
