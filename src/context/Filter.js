import { createContext, useState } from 'react'
// import { useLoadFilters } from "../js/Profile.js";
import { setLocalStorage, getLocalStorage } from '../js/Storage.js';
import data from '../data/data.json'

export const FilterContext = createContext([{}, () => {}])

export const FilterProvider = ({ children }) => {
  const profileKey = 'userProfile';
  const [filters, setFilters] = useState(getLocalStorage('profileKey').filters || data.filters)

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const FilterFunction = createContext([{}, () => {}])
