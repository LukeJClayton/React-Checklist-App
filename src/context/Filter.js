import { createContext, useState } from 'react'
import { useLoadFilters } from "../js/Profile.js";
import data from '../data/data.json'

export const FilterContext = createContext({})

export const FilterProvider = ({ children }) => {
  const loadFilters =  useLoadFilters();
  const [filters, setFilters] = useState(loadFilters || data.filters)

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const FilterFunction = createContext([{}, () => {}])
