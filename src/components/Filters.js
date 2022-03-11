import FilterData, { useUpdateFilterState } from '../js/Filter.js';

function FilterBar(props) {
  var filterSections = []
  for (var i = 0; i < props.data.length; i++) {
    filterSections.push(<FilterSection data={ props.data[i] } key={i} />)
  }
  return (
    <div className="filters">
      { filterSections }
    </div>
  );
}

function FilterSection(props) {
  var filters = []
  for (var i = 0; i < props.data.items.length; i++) {
    filters.push(<Filter name={props.data.name} data={ props.data.items[i] } key={i} />)
  }
  return (
    <div className="filters__section">
      <h4 className="filters__title">{ props.data.title }</h4>
      { filters }
    </div>
  );
}

function Filter(props) {
  const { updateFilterState } = useUpdateFilterState();

  return (
    <div className="filters__filter js-filter" data-section-name={ props.name } data-name={ props.data.name } data-keys={ props.data.keys.join(',') }>
      <label>
        { props.data.label }
        <input type="radio" name={ props.name } value={ props.data.name } onChange={ updateFilterState } />
      </label>
    </div>
  );
}

export { FilterBar };