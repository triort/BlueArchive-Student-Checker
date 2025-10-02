import { Student } from "../types";

interface CharacterCardProps {
    character: Student;
    toggleOwnership: (id: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, toggleOwnership }) => {
    // レアリティに応じた色を設定（フラットデザイン用）
    const rarityColorClass =
        character.rarity === 3 ? 'text-yellow-500' :
            character.rarity === 2 ? 'text-purple-500' : 'text-blue-500';

    return (
        <div
            onClick={() => toggleOwnership(character.id)}
            className={`flat-card character-card cursor-pointer text-center transition-opacity duration-200`}
        >
            <div className="mb-3 flex justify-center">
                <div className={`w-20 h-20 rounded-lg overflow-hidden ${character.owned ? 'border-green-400' : 'border-gray-300'
                    }`}>
                    <img
                        src="/svg/placeholder.svg"
                        alt={character.name}
                        className={`w-full h-full object-cover ${character.owned ? 'opacity-100' : 'opacity-60'
                            }`}
                    />
                </div>
            </div>
            <div className="font-semibold text-gray-800 mb-1">{character.name}</div>
            <div className={`text-sm font-medium mb-2 ${rarityColorClass}`}>
                {'★'.repeat(character.rarity)}
            </div>
            <div className="text-xs text-gray-500 mb-2">
                {new Date(character.releaseDate).toLocaleDateString('ja-JP')}
            </div>
            <div className={`text-xs font-semibold px-2 py-1 rounded ${character.owned
                ? 'bg-green-500 text-white'
                : 'bg-gray-400 text-white'
                }`}>
                {character.owned ? '所持' : '未所持'}
            </div>
        </div>
    );
};