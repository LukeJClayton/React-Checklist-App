import { useContext } from "react";
import { FilterContext } from "../context/Filter.js";
import { ItemsContext } from "../context/Items.js";
import { useSaveProfile } from "../js/Profile.js";

const data = require('../data/data.json')

export function useUpdateFilterState (e) {
  const { filters, setFilters } = useContext(FilterContext);
  const { items, setItems } = useContext(ItemsContext);
  const saveProfile = useSaveProfile();

  const setFilterActive = (sectionName, name) => {
    const newFilters = filters.reduce((acc, section) => [
      ...acc,
      {
        ...section,
        items: section.name === sectionName
          ? section.items.map(s => s.name === name ? { ...s, active: true } : { ...s, active: false })
          : section.items
      }
    ], [])

    setFilters(newFilters)
    filterItems(newFilters, setItems, saveProfile);
  };

  return { setFilterActive };
}

export function filterItems (filterState, setItems, saveProfile) {
  var keys = [];

  for (var i = 0; i < filterState.length; i++) {
    let items = filterState[i].items;
    for (var j = 0; j < items.length; j++) {
      if (items[j].active == true) {
        keys = keys.concat(items[j].keys)
      }
    }
  }

  let filteredData = data.items.filter(function(item) {
    for (let i = 0; i <= keys.length; i++) {
      if (item.keys.includes(keys[i])) return true;
    }
  })

  setItems(filteredData);
  saveProfile(filterState, filteredData);
}
