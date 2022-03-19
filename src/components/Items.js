import { useContext } from 'react'
import { ItemsContext } from '../context/Items'
import { useLoadProfile, useSaveProfile } from "../js/Profile.js";
import { useUpdateItemState } from '../js/Items.js';

function ItemList(props) {
  var items = []
  for (var i = 0; i < props.data.length; i++) {
    var item = props.data[i];
    switch(item.type) {
      case 'checkbox':
        items.push(<Checkbox name={ item.name } label={ item.label } key={i} />)
        break;
      case 'event':
        items.push(<Event name={ item.name } label={ item.label } key={i}/>)
        break;
    }
  }

  return (
    <div className="items">
      { items }
    </div>
  );
}

function Event({ name, label }) {
  const { updateItemState } = useUpdateItemState();
  const { items } = useContext(ItemsContext);

  return (
    <div className="items__event js-filterable-item" data-name={ name }>
      { label }
    </div>
  )
}

function Checkbox({ name, label }) {
  const { updateItemState } = useUpdateItemState();
  const { items } = useContext(ItemsContext);

  return (
    <div className="items__checkbox js-filterable-item" data-name={ name }>
      <label className="items_checkbox-label">
        { label }
        <input
          className="items_checkbox-input"
          type="checkbox"
          name={ name }
          value={ name }
          onChange={ updateItemState }
          checked={
            items
              .find(f => f.name === name)
              .active
          }
        />
      </label>
    </div>
  )
}

export { ItemList };