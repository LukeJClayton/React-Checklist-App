import { createContext, useState } from 'react';
import { setLocalStorage, getLocalStorage } from '../js/Storage.js';
import data from '../data/data.json'

export const ItemsContext = createContext([{}, () => {}])

export const ItemsProvider = ({ children }) => {
  const profileKey = 'userProfile';
  const [items, setItems] = useState(getLocalStorage('profileKey').items || data.items)

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  )
}