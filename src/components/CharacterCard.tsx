export const CharacterCard = ({ character, toggleOwnership }) => {
    // レアリティに応じた色を設定
    const rarityColorClass =
        character.rarity === '☆☆☆' ? 'text-yellow-600' :
            character.rarity === '☆☆' ? 'text-purple-600' : 'text-blue-600';

    return (
        <div
            onClick={() => toggleOwnership(character.id)}
            className={`p-3 rounded-lg cursor-pointer transition-transform transform hover:scale-105 text-center ${character.owned ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
                }`}
        >
            <div className="mb-2 flex justify-center">
                {/* キャラクター画像 */}
                <img
                    src={`./src/assets/img/student/${character.id}.webp`}
                    alt={character.name}
                    className={`rounded-full ${character.owned ? 'opacity-100' : 'opacity-50'}`}
                    width="80"
                    height="80"
                />
            </div>
            <div className="font-bold">{character.name}</div>
            <div className={`text-sm ${rarityColorClass}`}>
                {character.rarity}
            </div>
            <div className="text-xs text-gray-500">
                {new Date(character.releaseDate).toLocaleDateString()}
            </div>
            <div className="mt-2 text-sm font-bold">
                {character.owned ? '所持' : '未所持'}
            </div>
        </div>
    );
};