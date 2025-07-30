import React from 'react'

interface JourneyFiltersProps {
  filters: {
    campaigns: string[]
    mediums: string[]
    contents: string[]
  }
  onFilterChange: (
    filterType: 'campaign' | 'medium' | 'content',
    value: string
  ) => void
}

const FilterSelect: React.FC<{
  label: string
  options: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ label, options, onChange }) => (
  <div>
    <label
      htmlFor={label}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={label}
      onChange={onChange}
      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option value="">Todos</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

export const JourneyFilters: React.FC<JourneyFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
      <FilterSelect
        label="Campaign"
        options={filters.campaigns}
        onChange={(e) => onFilterChange('campaign', e.target.value)}
      />
      <FilterSelect
        label="Medium"
        options={filters.mediums}
        onChange={(e) => onFilterChange('medium', e.target.value)}
      />
      <FilterSelect
        label="Content"
        options={filters.contents}
        onChange={(e) => onFilterChange('content', e.target.value)}
      />
    </div>
  )
}
