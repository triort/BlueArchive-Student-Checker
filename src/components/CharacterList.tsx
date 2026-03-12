import { CharacterCard } from './CharacterCard';
import { Student } from '../types';

interface CharacterListProps {
  characters: Student[];
  toggleOwnership: (id: string) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters, toggleOwnership }) => {
  return (
    <div className="mb-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      {characters.map(char => (
        <CharacterCard
          key={char.id}
          character={char}
          toggleOwnership={toggleOwnership}
        />
      ))}
    </div>
  );
};
