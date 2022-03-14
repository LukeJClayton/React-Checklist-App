import { useContext } from 'react';
import { setLocalStorage, getLocalStorage } from '../js/Storage.js';
import { ProfileContext } from "../context/Profile.js";
import { FilterContext } from "../context/Filter.js";
import { ItemsContext } from "../context/Items.js";
import { useUpdateFilterState } from "../js/Filter.js";
import { useUpdateItemState } from "../js/Items.js";

export function useLoadProfile () {
  const profileKey = 'userProfile';
  const updateFilterState = useUpdateFilterState();
  const saveProfile = useSaveProfile();
  const { filters, setFilters } = useContext(FilterContext);
  const { items, setItems } = useContext(ItemsContext);

  function loadProfile () {
    const profileData = getLocalStorage(profileKey);

    if (profileData && profileData.filters && profileData.items) {
      setFilters(profileData.filters);
      setItems(profileData.items);
    } else {
      saveProfile();
    }
  }

  return loadProfile;
}

export function useSaveProfile () {
  const [profileContext, setProfileContext] = useContext(ProfileContext);
  const filterContext = useContext(FilterContext).filters;
  const itemsContext =  useContext(ItemsContext).items;
  const profileKey = 'userProfile';

  function saveProfile (filterOverride, itemOverride) {
    setLocalStorage(profileKey, {"filters": filterOverride || filterContext || [], "items": itemOverride || itemsContext || []})
  }

  return saveProfile;
}

function formatFilterData (data) {
  let filterItems = [];

  for (let i = 0; i < data.length; i++) {
    let itemSection = data[i].items.map(function(item) {
      if (item.active) {
        return {
          name: item.name,
          active: item.active
        }
      }
    })

    itemSection = itemSection.filter(function( element ) {
      return element !== undefined;
    });

    filterItems = filterItems.concat(itemSection);
  }

  return filterItems;
}