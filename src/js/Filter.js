import { useContext } from "react";
import { FilterFunction, FilterContext } from "../context/Filter.js";
import { useSaveProfile } from "../js/Profile.js";

const data = require('../data/data.json')

export function useUpdateFilterState (e) {
  const { filters, setFilters } = useContext(FilterContext);
  const filterFunction = useContext(FilterFunction);
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
  };

  return { setFilterActive };
}

export function filterItems (filterState, filterFunction, saveProfile) {
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

  saveProfile()
  filterFunction(filteredData)
}
