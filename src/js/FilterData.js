const data = require('../data/data.json')

// export default function handleFilterSelection(e, filterFunc, filterState) {
//   let activeFilters = document.querySelectorAll('.js-filter input:checked')

//   let element = e.target
//   //   , keys = element.dataset.keys.split(',')
//   //   , items = document.querySelectorAll('.js-filterable-item')

//   let keys = []
//   for (let i = 0; i < activeFilters.length; i++) {
//     console.log(activeFilters[i].parentElement.parentElement)
//     keys.push(activeFilters[i].parentElement.parentElement.dataset.keys)
//   }

//   console.log(keys)

//   let filteredData = data.items.filter(function(item) {
//     for (let i = 0; i <= keys.length; i++) {
//       if (item.keys.includes(keys[i])) return true;
//     }

//     return;
//   })

//   console.log(filteredData)

//   // filterFunc(filteredData)
// }

export function updateFilterState(e, filterState, filterFunction) {
  let element = e.target.parentElement.parentElement
    , sectionName = element.dataset.sectionName
    , inputName = element.dataset.name

  for (var i = 0; i < filterState.length; i++) {
    let items = filterState[i].items;

    if (filterState[i].name == sectionName) {
      for (var j = 0; j < items.length; j++) {
        if (items[j].name == inputName) {
          items[j].active = true;
        } else {
          items[j].active = false;
        }
      }
    }
  }

  filterItems(filterState, filterFunction);
}

function filterItems(filterState, filterFunction) {
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

  filterFunction(filteredData)
}