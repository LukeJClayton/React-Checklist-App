import { useContext } from "react";
import { FilterFunction, FilterContext } from "../context/Filter.js";
import { useSaveProfile } from "../js/Profile.js";

const data = require('../data/data.json')

export function useUpdateFilterState (e) {
  const filterContext = useContext(FilterContext);
  const filterFunction = useContext(FilterFunction);
  const saveProfile = useSaveProfile();

  function updateFilterState (e) {
    let element = e.target.parentElement.parentElement
      , sectionName = element.dataset.sectionName
      , inputName = element.dataset.name;

    for (var i = 0; i < filterContext.length; i++) {
      let items = filterContext[i].items;

      if (filterContext[i].name == sectionName) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].name == inputName) {
            items[j].active = true;
          } else {
            items[j].active = false;
          }
        }
      }
    }
    filterItems(filterContext, filterFunction, saveProfile);
  }

  return { updateFilterState };
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