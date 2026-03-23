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
    <div className="min-h-screen pb-12 lg:mx-20 mx-4">
      {/* Header */}
      <header className="mb-8 mt-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ color: 'var(--ba-sky-600)' }}
        >
          キャラクターチェッカー
        </h1>
      </header>

      <StatusBar
        ownedCount={ownedCount}
        totalCount={totalCount}
        ownershipPercentage={ownershipPercentage}
      />

      {/* Filter Toggle + Save */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <SaveImageButton onClick={exportImage} />
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="glass-card flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
          style={{
            color: isFilterVisible ? 'white' : 'var(--ba-sky-600)',
            background: isFilterVisible
              ? 'var(--ba-sky-600)'
              : 'var(--glass-bg)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          フィルター
        </button>
      </div>

      {isFilterVisible && (
        <div>
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
        </div>
      )}

      <CharacterList
        characters={filteredAndSortedCharacters}
        toggleOwnership={toggleOwnership}
      />

      <canvas
        ref={canvasRef}
        width="800"
        height="1000"
        className="hidden"
      />
    </div>
  );
};

export default App;
