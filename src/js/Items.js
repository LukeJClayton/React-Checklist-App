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