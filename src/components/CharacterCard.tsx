import { Student } from "../types";

interface CharacterCardProps {
    character: Student;
    toggleOwnership: (id: string) => void;
}

const rarityConfig: Record<number, { gradient: string; label: string }> = {
    3: { gradient: 'linear-gradient(135deg, #F2C94C, #E6A817)', label: '★★★' },
    2: { gradient: 'linear-gradient(135deg, #BB6BD9, #9B51E0)', label: '★★' },
    1: { gradient: 'linear-gradient(135deg, #56CCF2, #2D9CDB)', label: '★' },
};

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, toggleOwnership }) => {
    const imageSrc = `/img/student/${character.id}.webp`;
    const rarity = rarityConfig[character.rarity] ?? { gradient: 'var(--neutral-300)', label: '?' };

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
                    style={{ background: 'linear-gradient(135deg, #27AE60, #2ECC71)' }}>
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
                    className={`aspect-square w-full object-cover transition-all duration-300 ${character.owned
                            ? 'group-hover:scale-105'
                            : 'opacity-40 grayscale group-hover:opacity-70 group-hover:grayscale-[50%]'
                        }`}
                />
            </div>

            {/* Info */}
            <div className="mt-2 space-y-1 text-center">
                <div className="truncate text-xs font-bold sm:text-sm" style={{ color: 'var(--neutral-800)' }}>
                    {character.name}
                </div>
                <div
                    className="mx-auto w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm"
                    style={{ background: rarity.gradient }}
                >
                    {rarity.label}
                </div>
            </div>
        </div>
    );
};
