type SearchFilterProps = {
  filters: {
    search: string;
    status: string[];
    species: string[];
    gender: string[];
  };
  onPageChange: (page: number) => void;
  onSearch: (searchValue: string) => void;
  onFilterChange: (key: string, value: string) => void;
  allSpecies: string[];
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  filters,
  onSearch,
  onFilterChange,
  onPageChange,
  allSpecies,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 text-black">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => {
          onSearch(e.target.value);
          onPageChange(1);
        }}
        className="p-2 border rounded"
        placeholder="Search characters"
      />

      <select
        value={filters.status[0] || ""}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Statuses</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        value={filters.species[0] || ""}
        onChange={(e) => onFilterChange("species", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Species</option>
        {allSpecies.map((species, index) => (
          <option key={index} value={species}>
            {species}
          </option>
        ))}
      </select>

      <select
        value={filters.gender[0] || ""}
        onChange={(e) => onFilterChange("gender", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
};

export default SearchFilter;
