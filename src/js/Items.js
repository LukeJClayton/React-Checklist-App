import { useContext } from "react";
import { ItemsContext } from "../context/Items.js";
import { useSaveProfile } from "../js/Profile.js";

const data = require('../data/data.json')

export function useUpdateItemState (e) {
  const itemsContext = useContext(ItemsContext);
  const saveProfile = useSaveProfile();

  function updateItemState (e) {
    let element = e.target.parentElement.parentElement
      , inputName = element.dataset.name;

    let found;

    for (var i = 0; i < itemsContext.length; i++) {
      if (inputName == itemsContext[i].name && itemsContext[i]) {
        itemsContext[i].active = !itemsContext[i].active;
        found = true;
      }
    }

    if (!found) {
      itemsContext.push({
        name: inputName,
        active: true
      })
    }

    saveProfile();
  }

  return { updateItemState };
}