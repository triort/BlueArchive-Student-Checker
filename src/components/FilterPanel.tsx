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
        <div className="flat-card filter-panel mb-8 space-y-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {/* 検索 */}
                <div className="filter-item space-y-2">
                    <label className="block text-sm font-semibold text-slate-600">キャラクター名検索</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flat-input w-full rounded-xl bg-slate-50/40 text-sm"
                        placeholder="キャラクター名を入力..."
                    />
                </div>

                {/* レアリティフィルタ */}
                <div className="filter-item space-y-2">
                    <label className="block text-sm font-semibold text-slate-600">レアリティ</label>
                    <select
                        value={filterRarity}
                        onChange={(e) => setFilterRarity(e.target.value)}
                        className="flat-input w-full rounded-xl  bg-slate-50/40 text-sm"
                    >
                        <option value="all">すべて</option>
                        <option value="3">☆☆☆</option>
                        <option value="2">☆☆</option>
                        <option value="1">☆</option>
                    </select>
                </div>

                {/* 攻撃タイプフィルタ */}
                <div className="filter-item space-y-2">
                    <label className="block text-sm font-semibold text-slate-600">攻撃タイプ</label>
                    <select
                        value={filterElement}
                        onChange={(e) => setFilterElement(e.target.value)}
                        className="flat-input w-full rounded-xl  bg-slate-50/40 text-sm"
                    >
                        <option value="all">すべて</option>
                        <option value="explosive">爆発</option>
                        <option value="piercing">貫通</option>
                        <option value="mystic">神秘</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {/* 所持フィルタ */}
                <div className="filter-item space-y-2">
                    <label className="block text-sm font-semibold text-slate-600">所持状態</label>
                    <select
                        value={filterOwned}
                        onChange={(e) => setFilterOwned(e.target.value)}
                        className="flat-input w-full rounded-xl  bg-slate-50/40 text-sm"
                    >
                        <option value="all">すべて</option>
                        <option value="owned">所持</option>
                        <option value="notOwned">未所持</option>
                    </select>
                </div>

                {/* ソート */}
                <div className="filter-item space-y-2">
                    <label className="block text-sm font-semibold text-slate-600">ソート</label>
                    <div className="flex overflow-hidden rounded-xl   bg-slate-50/60">
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                        >
                            <option value="releaseDate">実装日</option>
                            <option value="name">名前</option>
                            <option value="rarity">レアリティ</option>

                        </select>
                        <button
                            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center justify-center bg-slate-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                        >
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                {/* 一括操作ボタン */}
                <div className="filter-item space-y-3 md:col-span-2 xl:col-span-3">
                    <label className="block text-sm font-semibold text-slate-600">レアリティ一括操作</label>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center justify-between rounded-xl  bg-amber-50/70 px-4 py-3">
                            <span className="text-sm font-semibold text-amber-600">☆☆☆</span>
                            <div className="flex gap-2">
                                <button onClick={() => toggleAllByRarity('☆☆☆', true)} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-600">
                                    すべて所持
                                </button>
                                <button onClick={() => toggleAllByRarity('☆☆☆', false)} className="rounded-lg bg-slate-400 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-500">
                                    すべて未所持
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl  bg-purple-50/70 px-4 py-3">
                            <span className="text-sm font-semibold text-purple-600">☆☆</span>
                            <div className="flex gap-2">
                                <button onClick={() => toggleAllByRarity('☆☆', true)} className="rounded-lg bg-purple-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-600">
                                    すべて所持
                                </button>
                                <button onClick={() => toggleAllByRarity('☆☆', false)} className="rounded-lg bg-slate-400 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-500">
                                    すべて未所持
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-sky-50/70 px-4 py-3">
                            <span className="text-sm font-semibold text-sky-600">☆</span>
                            <div className="flex gap-2">
                                <button onClick={() => toggleAllByRarity('☆', true)} className="rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-600">
                                    すべて所持
                                </button>
                                <button onClick={() => toggleAllByRarity('☆', false)} className="rounded-lg bg-slate-400 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-500">
                                    すべて未所持
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
