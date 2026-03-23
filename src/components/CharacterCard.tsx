import { Student } from "../types";

interface CharacterCardProps {
    character: Student;
    toggleOwnership: (id: string) => void;
}

const starLabel = (rarity: number): string => '★'.repeat(rarity);

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, toggleOwnership }) => {
    const imageSrc = `/img/student/${character.id}.webp`;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleOwnership(character.id);
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-pressed={character.owned}
            onClick={() => toggleOwnership(character.id)}
            onKeyDown={handleKeyDown}
            className="character-card glass-card group relative cursor-pointer overflow-hidden p-2.5"
        >
            {/* Owned check badge */}
            {character.owned && (
                <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md"
                    style={{ background: '#27AE60' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            )}

            {/* Image */}
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={imageSrc}
                    alt={character.name}
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/svg/placeholder.svg';
                    }}
                    className={`aspect-square w-full object-cover ${character.owned
                            ? ''
                            : 'opacity-40 grayscale'
                        }`}
                />
            </div>

            {/* Info */}
            <div className="mt-2 space-y-1 text-center">
                <div className="truncate text-xs font-bold sm:text-sm" style={{ color: 'var(--neutral-800)' }}>
                    {character.name}
                </div>
                <div className="text-sm font-bold" style={{ color: '#F2C94C' }}>
                    {starLabel(character.rarity)}
                </div>
            </div>
        </div>
    );
};
