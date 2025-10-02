import { useState } from 'react';
import { useStudents } from './hooks/useStudents';
import { useCharacterFilters } from './hooks/useCharacterFilters';
import { useImageExporter } from './hooks/useImageExporter';
import { FilterPanel } from './components/FilterPanel';
import { CharacterList } from './components/CharacterList';
import { StatusBar } from './components/StatusBar';
import { SaveImageButton } from './components/SaveImageButton';

const App = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const {
    students,
    toggleOwnership,
    toggleAllByRarity,
    ownedCount,
    totalCount,
    ownershipPercentage,
  } = useStudents();

  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filterRarity,
    setFilterRarity,
    filterElement,
    setFilterElement,
    filterOwned,
    setFilterOwned,
    searchTerm,
    setSearchTerm,
    filteredAndSortedCharacters,
  } = useCharacterFilters(students);

  const { canvasRef, exportImage } = useImageExporter(students, ownershipPercentage, ownedCount);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        <StatusBar
          ownedCount={ownedCount}
          totalCount={totalCount}
          ownershipPercentage={ownershipPercentage}
        />

        {/* フィルタートグルボタン */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="items-center filter-button"
          >
            <img
              src="/svg/filter-list-svgrepo-com.svg"
              alt="フィルター"
              className="w-2 h-2"
            />
          </button>
        </div>

        {isFilterVisible && (
          <FilterPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterRarity={filterRarity}
            setFilterRarity={setFilterRarity}
            filterElement={filterElement}
            setFilterElement={setFilterElement}
            filterOwned={filterOwned}
            setFilterOwned={setFilterOwned}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            toggleAllByRarity={toggleAllByRarity}
          />
        )}

        <CharacterList
          characters={filteredAndSortedCharacters}
          toggleOwnership={toggleOwnership}
        />

        <SaveImageButton onClick={exportImage} />

        <canvas
          ref={canvasRef}
          width="800"
          height="1000"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default App;
