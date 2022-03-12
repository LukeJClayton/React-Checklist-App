import { useContext } from 'react'
import { FilterContext } from '../context/Filter'
import { useUpdateFilterState } from '../js/Filter.js'

const FilterBar = ({ filters }) => (
  <div className="filters">
    {filters.map(f => (
      <FilterSection key={f.name} title={f.title} filters={f.items} sectionName={f.name} />
    ))}
  </div>
);

const FilterSection = ({ title, filters, sectionName }) => (
  <div className="filters__section">
    <h4 className="filters__title">{title}</h4>
    {filters.map(f => (
      <Filter name={f.name} key={f.name} label={f.label} sectionName={sectionName} />
    ))}
  </div>
)

function Filter({ label, name, sectionName }) {
  const { filters } = useContext(FilterContext)
  const { setFilterActive } = useUpdateFilterState()

  return (
    <div className="filters__filter js-filter">
      <label>
        {label}
        <input
          type="radio"
          name={name}
          value={name}
          onChange={() => setFilterActive(sectionName, name)}
          checked={
            filters
              .find(s => s.name === sectionName)
              .items
              .find(f => f.name === name)
              .active
          }
        />
      </label>
    </div>
  );
}

export { FilterBar };
