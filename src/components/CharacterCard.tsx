import { Student } from "../types";

interface CharacterCardProps {
    character: Student;
    toggleOwnership: (id: string) => void;
}

const rarityBadgeClass: Record<number, string> = {
    3: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
    2: 'bg-gradient-to-r from-violet-400 to-purple-500 text-white',
    1: 'bg-gradient-to-r from-sky-400 to-blue-500 text-white',
};

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
            className={`character-card group relative flex cursor-pointer flex-col items-center gap-5 rounded-2xl  from-slate-50 via-white to-slate-100 px-5 pb-5 pt-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl  `}
        >
            <div className="relative w-full overflow-hidden rounded-xl shadow-inner">
                {character.owned && (
                    <span className="absolute left-3 top-3 z-10 rounded-full  px-3 py-1 text-xs font-semibold text-white shadow">
                    </span>
                )}
                <img
                    src={imageSrc}
                    alt={character.name}
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/svg/placeholder.svg';
                    }}
                    className={`aspect-square w-full object-cover transition duration-300 ${character.owned ? 'opacity-95 group-hover:scale-[1.02]' : 'opacity-80 grayscale group-hover:grayscale-0'}`}
                />
            </div>

            <div className="flex w-full flex-col items-center gap-1 px-3">
                <div className="text-base font-semibold text-slate-900">{character.name}</div>
                <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm ${rarityBadgeClass[character.rarity] ?? 'bg-slate-200 text-slate-600'}`}>
                    {'★'.repeat(character.rarity)}
                </div>
                <div className="text-xs text-slate-500">
                    {new Date(character.releaseDate).toLocaleDateString('ja-JP')}
                </div>
            </div>

            <div className="mt-3 flex w-full flex-wrap justify-center gap-3 px-3 text-xs font-medium text-slate-600">
                <span className="rounded-md bg-slate-100 px-3 py-1">{character.school}</span>

            </div>
        </div>
    );
};
