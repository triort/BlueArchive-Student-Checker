import { useStudents } from './hooks/useStudents';
import { useCharacterFilters } from './hooks/useCharacterFilters';
import { useImageExporter } from './hooks/useImageExporter';
import { FilterPanel } from './components/FilterPanel';
import { CharacterList } from './components/CharacterList';
import { StatusBar } from './components/StatusBar';
import { SaveImageButton } from './components/SaveImageButton';

const App = () => {
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
    <div className="">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">キャラクター所持率チェッカー</h1>

        <StatusBar
          ownedCount={ownedCount}
          totalCount={totalCount}
          ownershipPercentage={ownershipPercentage}
        />

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
