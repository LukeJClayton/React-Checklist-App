import React, { useState } from 'react';
import {useContext} from 'react';
import './App.css';

import { FilterBar } from './components/Filters.js';
import { ItemList } from './components/Items.js';

import {FilterFunction, FilterContext} from "./context/Filter.js";

const data = require('./data/data.json');

function Main(props) {

  const [filteredData, setFilteredData] = useState(data.items);
  const [filterContext, setFilterContext] = useContext(FilterContext);
  const [filterFunction, setFilterFunction] = useContext(FilterFunction);

  return (
  	<FilterContext.Provider value={ data.filters }>
  	<FilterFunction.Provider value={ setFilteredData }>
	    <div className="main">
	      <p className="main__title">{ data.title }</p>
	      <FilterBar data={data.filters} />
	      <ItemList data={filteredData} />
	    </div>
    </FilterFunction.Provider>
    </FilterContext.Provider>
  );
}

function App() {
  return (<Main />);
}

export default App;
