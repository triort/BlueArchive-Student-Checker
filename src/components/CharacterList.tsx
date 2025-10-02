import { CharacterCard } from './CharacterCard';
import { Student } from '../types';

interface CharacterListProps {
  characters: Student[];
  toggleOwnership: (id: string) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters, toggleOwnership }) => {
  return (
    <div className="mb-6 grid grid-cols-3 md:grid-cols-5 ">
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
