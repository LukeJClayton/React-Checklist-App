import { createContext, useState } from 'react'
import data from '../data/data.json'

export const FilterContext = createContext({})

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(data.filters)

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const FilterFunction = createContext([{}, () => {}])
