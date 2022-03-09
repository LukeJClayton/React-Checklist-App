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
  return (
    <div className="items__checkbox js-filterable-item" data-keys={ props.data.keys.join(',') }>
      <label>
        { props.data.label }
        <input type="checkbox" name="Test" value="{ props.name }"/>
      </label>
    </div>
  )
}

export { ItemList };