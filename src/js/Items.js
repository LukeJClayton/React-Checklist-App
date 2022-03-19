import { useContext } from "react";
import { ItemsContext } from "../context/Items.js";
import { useSaveProfile } from "../js/Profile.js";

const data = require('../data/data.json')

export function useUpdateItemState (e) {
  const { items, setItems } = useContext(ItemsContext);
  const saveProfile = useSaveProfile();

  function updateItemState (e) {
    let element = e.target.parentElement.parentElement
      , inputName = element.dataset.name;

    const newItems = items.map(item => item.name === inputName ? { ...item, active: !item.active } : { ...item })

    setItems(newItems)
    saveProfile(undefined, newItems);
  }

  return { updateItemState };
}

export function sortItems (items) {
  let map = {}
    , result = []
    , visited = {}
    , reverseItems = items.slice().reverse();

  reverseItems.forEach(function (item) {
    map[item.name]  = item;
  });

  reverseItems.forEach(function (item) {
    if (!visited[item.name] && item) {
      sort_util(item);
    }
  });

  function sort_util (obj) {
    visited[obj.name] = true;

    obj.precursors.forEach(function (dep) {
      if (!visited[dep] && map[dep]) {
        sort_util(map[dep]);
      } 
    });

    result.push(obj);
  }

  return result;
}


