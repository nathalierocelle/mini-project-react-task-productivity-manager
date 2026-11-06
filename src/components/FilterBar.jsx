import { STATUS_FILTERS } from '../utils/tasks'
import SearchInput from './SearchInput'
import FilterTabs from './FilterTabs'
import UserSelect from './UserSelect'

// Presentational: the filter values live in TasksPage; changes go back up via onChange(patch).
export default function FilterBar({ filters, counts, assigneeOptions, onChange }) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="lg:flex-1">
        <SearchInput value={filters.search} onChange={(search) => onChange({ search })} />
      </div>
      <FilterTabs
        options={STATUS_FILTERS}
        value={filters.status}
        counts={counts}
        onChange={(status) => onChange({ status })}
      />
      <UserSelect
        options={assigneeOptions}
        value={filters.userId}
        onChange={(userId) => onChange({ userId })}
      />
    </div>
  )
}
