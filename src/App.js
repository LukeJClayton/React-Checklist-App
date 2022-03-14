import React, { useState, useContext, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from './js/Storage.js';
import { useLoadProfile, useSaveProfile } from "./js/Profile.js";

import { FilterProvider, FilterContext } from "./context/Filter.js";
import { ProfileContext } from "./context/Profile.js";
import { ItemsContext, ItemsProvider } from "./context/Items.js";

import { FilterBar } from './components/Filters.js';
import { ItemList } from './components/Items.js';

import './App.css';

const data = require('./data/data.json');

function Main(props) {
  const items = useContext(ItemsContext);
  const filters = useContext(FilterContext);
  const saveProfile = useSaveProfile();
  const loadProfile = useLoadProfile();

  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <div className="main">
      <p className="main__title">{ data.title }</p>
      <FilterBar filters={filters.filters} />
      <ItemList data={items.items} />
    </div>
  );
}

function App() {
  return (
    <FilterProvider>
    <ItemsProvider>
    <ProfileContext.Provider value={ '' }>
      <Main />
    </ProfileContext.Provider>
    </ItemsProvider>
    </FilterProvider>
  );
}

export default App;
