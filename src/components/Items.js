import { useLoadProfile, useSaveProfile } from "../js/Profile.js";
import { useUpdateItemState } from '../js/Items.js';


function ItemList(props) {
  var items = []
  for (var i = 0; i < props.data.length; i++) {
    switch(props.data[i].type) {
      case 'checkbox':
        items.push(<Checkbox data={ props.data[i] } key={i}/>)
        break;
    }
  }

  return (
    <div className="items">
      { items }
    </div>
  );
}

function Checkbox(props) {
  const { updateItemState } = useUpdateItemState();

  return (
    <div className="items__checkbox js-filterable-item" data-name={ props.data.name } data-keys={ props.data.keys.join(',') }>
      <label>
        { props.data.label }
        <input type="checkbox" name={ props.data.name } value={ props.data.name } onChange={ updateItemState } />
      </label>
    </div>
  )
}

export { ItemList };