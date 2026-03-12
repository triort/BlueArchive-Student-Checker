interface FilterPanelProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filterRarity: string;
    setFilterRarity: (value: string) => void;
    filterElement: string;
    setFilterElement: (value: string) => void;
    filterOwned: string;
    setFilterOwned: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    sortDirection: 'asc' | 'desc';
    setSortDirection: (value: 'asc' | 'desc') => void;
    toggleAllByRarity: (rarity: string, owned: boolean) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    searchTerm, setSearchTerm,
    filterRarity, setFilterRarity,
    filterElement, setFilterElement,
    filterOwned, setFilterOwned,
    sortBy, setSortBy,
    sortDirection, setSortDirection,
    toggleAllByRarity
}) => {

    const handleSortChange = (newSortBy: string) => {
        if (newSortBy === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortDirection('asc');
        }
    };

    return (
        <div className="glass-card mb-8 space-y-6 p-5 sm:p-6">
            {/* Top row: search + filters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* 検索 */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--neutral-500)' }}>
                        キャラクター検索
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ba-input"
                        placeholder="名前を入力..."
                    />
                </div>

                {/* レアリティ */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--neutral-500)' }}>
                        レアリティ
                    </label>
                    <select
                        value={filterRarity}
                        onChange={(e) => setFilterRarity(e.target.value)}
                        className="ba-select"
                    >
                        <option value="all">すべて</option>
                        <option value="3">★★★</option>
                        <option value="2">★★</option>
                        <option value="1">★</option>
                    </select>
                </div>

                {/* 攻撃タイプ */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--neutral-500)' }}>
                        攻撃タイプ
                    </label>
                    <select
                        value={filterElement}
                        onChange={(e) => setFilterElement(e.target.value)}
                        className="ba-select"
                    >
                        <option value="all">すべて</option>
                        <option value="explosive">爆発</option>
                        <option value="piercing">貫通</option>
                        <option value="mystic">神秘</option>
                    </select>
                </div>

                {/* 所持状態 */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--neutral-500)' }}>
                        所持状態
                    </label>
                    <select
                        value={filterOwned}
                        onChange={(e) => setFilterOwned(e.target.value)}
                        className="ba-select"
                    >
                        <option value="all">すべて</option>
                        <option value="owned">所持</option>
                        <option value="notOwned">未所持</option>
                    </select>
                </div>
            </div>

            {/* Sort row */}
            <div className="flex flex-wrap items-end gap-4">
                <div className="min-w-[180px] space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--neutral-500)' }}>
                        ソート
                    </label>
                    <div className="flex overflow-hidden rounded-xl border" style={{ borderColor: 'var(--neutral-200)' }}>
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="flex-1 border-none bg-transparent px-3 py-2.5 text-sm font-medium focus:outline-none"
                            style={{ color: 'var(--neutral-700)' }}
                        >
                            <option value="releaseDate">実装日</option>
                            <option value="name">名前</option>
                            <option value="rarity">レアリティ</option>
                        </select>
                        <button
                            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center justify-center px-3 text-sm font-bold text-white transition-colors"
                            style={{ background: 'linear-gradient(135deg, var(--ba-sky-500), var(--ba-sky-600))' }}
                        >
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bulk operations */}
            <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--neutral-500)' }}>
                    一括操作
                </label>
                <div className="grid gap-2 sm:grid-cols-3">
                    {([
                        { rarity: '☆☆☆', label: '★★★', color: '#E6A817', bgColor: 'rgba(242, 201, 76, 0.1)' },
                        { rarity: '☆☆', label: '★★', color: '#9B51E0', bgColor: 'rgba(155, 81, 224, 0.1)' },
                        { rarity: '☆', label: '★', color: '#2D9CDB', bgColor: 'rgba(45, 156, 219, 0.1)' },
                    ] as const).map(({ rarity, label, color, bgColor }) => (
                        <div key={rarity} className="flex items-center justify-between rounded-xl px-4 py-2.5"
                            style={{ backgroundColor: bgColor, border: `1px solid ${color}22` }}
                        >
                            <span className="text-sm font-bold" style={{ color }}>{label}</span>
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => toggleAllByRarity(rarity, true)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
                                    style={{ background: color }}
                                >
                                    所持
                                </button>
                                <button
                                    onClick={() => toggleAllByRarity(rarity, false)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:brightness-90"
                                    style={{ backgroundColor: 'var(--neutral-200)', color: 'var(--neutral-600)' }}
                                >
                                    未所持
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
