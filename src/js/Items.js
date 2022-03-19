import { useContext } from "react";
import { ItemsContext } from "../context/Items.js";
import { useSaveProfile } from "../js/Profile.js";
import { Graph } from "../js/Graph.js";

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
  let graph = new Graph();

  for (var i = 0; i < items.length; i++) {
    graph.addNode(items[i].name);
  }

  for (var i = 0; i < items.length; i++) {
    let precursors = items[i].precursors;

    for (var j = 0; j < precursors.length; j++) {
      graph.addDirectedEdge(precursors[j], items[i].name)
    }

    let successors = items[i].successors;

    for (var k = 0; k < successors.length; k++) {
      graph.addDirectedEdge(items[i].name, successors[k])
    }
  }

  graph.topologicalSort()

  items.sort(function(a, b){  
    return graph.output.indexOf(a.name) - graph.output.indexOf(b.name);
  });

  return items;
}
