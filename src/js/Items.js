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

export function sortItems (items, passes) {
  let dependencies
    , list
    , result;

  while (passes) {
    passes = passes - 1;
    dependencies = generateDependenciesList(items)
    list = createEdges(dependencies)
    result = tsort(list)
  }

  items.sort(function(a, b){  
    return result.indexOf(a.name) - result.indexOf(b.name);
  });

  return items;
}

function generateDependenciesList (items) {
  if (!items) return;

  let dependencies = {};

  for (var i = 0; i < items.length; i++) {
    dependencies[items[i].name] = items[i].precursors;
  }

  return dependencies;
}

function tsort(edges) {
  let nodes = {}
    , sorted = []
    , visited = {};

  let Node = function (id) {
    this.id = id;
    this.afters = [];
  }

  edges.forEach( (v)=> {
    let from = v[0], to = v[1];
    if (!nodes[from]) nodes[from] = new Node(from);
    if (!nodes[to]) nodes[to] = new Node(to);
    nodes[from].afters.push(to);
  });

  Object.keys(nodes).forEach(function visit(idstr, ancestors) {
    let node = nodes[idstr],id = node.id;

    if (visited[idstr]) return;
    if (!Array.isArray(ancestors)) ancestors = [];

    ancestors.push(id);
    visited[idstr] = true;
    node.afters.forEach(function (afterID) {
      if (ancestors.indexOf(afterID) >= 0)  
        throw new Error('closed chain : ' + afterID + ' is in ' + id);
      visit(afterID.toString(), ancestors.map(function (v) { return v })); 
    });
    sorted.unshift(id);
  });

  return sorted;
}

const createEdges = (dep) => {
  let result = []
  Object.keys(dep).forEach(key => {
    dep[key].forEach(n => {
      result.push([n, key])
    })
  })

  return result
}