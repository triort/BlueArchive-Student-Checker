import { CharacterCard } from './CharacterCard';
import { Student } from '../types';

interface CharacterListProps {
  characters: Student[];
  toggleOwnership: (id: string) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters, toggleOwnership }) => {
  return (
    <div className="gap-4 mb-6 grid grid-cols-5 ">
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
