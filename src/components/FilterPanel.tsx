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
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* 検索 */}
                <div>
                    <label className="block text-sm font-medium mb-1">キャラクター名検索</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="キャラクター名を入力..."
                    />
                </div>

                {/* レアリティフィルタ */}
                <div>
                    <label className="block text-sm font-medium mb-1">レアリティ</label>
                    <select
                        value={filterRarity}
                        onChange={(e) => setFilterRarity(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="all">すべて</option>
                        <option value="3">☆☆☆</option>
                        <option value="2">☆☆</option>
                        <option value="1">☆</option>
                    </select>
                </div>

                {/* 攻撃タイプフィルタ */}
                <div>
                    <label className="block text-sm font-medium mb-1">攻撃タイプ</label>
                    <select
                        value={filterElement}
                        onChange={(e) => setFilterElement(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="all">すべて</option>
                        <option value="explosive">爆発</option>
                        <option value="piercing">貫通</option>
                        <option value="mystic">神秘</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 所持フィルタ */}
                <div>
                    <label className="block text-sm font-medium mb-1">所持状態</label>
                    <select
                        value={filterOwned}
                        onChange={(e) => setFilterOwned(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="all">すべて</option>
                        <option value="owned">所持</option>
                        <option value="notOwned">未所持</option>
                    </select>
                </div>

                {/* ソート */}
                <div>
                    <label className="block text-sm font-medium mb-1">ソート</label>
                    <div className="flex">
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-full p-2 border rounded-l"
                        >
                            {/* <option value="id">実装順</option> */}
                            <option value="releaseDate">実装日</option>
                            <option value="name">名前</option>
                            <option value="rarity">レアリティ</option>

                        </select>
                        <button
                            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                            className="px-4 bg-blue-500 text-white rounded-r"
                        >
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                {/* 一括操作ボタン */}
                {/* ☆☆☆ */}
                <div className="flex items-end gap-2">
                    <button onClick={() => toggleAllByRarity('☆☆☆', true)} className="p-2 bg-yellow-500 text-white rounded">
                        ☆☆☆すべて所持
                    </button>
                    <button onClick={() => toggleAllByRarity('☆☆☆', false)} className="p-2 bg-gray-500 text-white rounded">
                        ☆☆☆すべて未所持
                    </button>
                </div>
                {/* ☆☆ */}
                <div className="flex items-end gap-2">
                    <button onClick={() => toggleAllByRarity('☆☆', true)} className="p-2 bg-yellow-500 text-white rounded">
                        ☆☆すべて所持
                    </button>
                    <button onClick={() => toggleAllByRarity('☆☆', false)} className="p-2 bg-gray-500 text-white rounded">
                        ☆☆すべて未所持
                    </button>
                </div>
                {/* ☆ */}
                <div className="flex items-end gap-2">
                    <button onClick={() => toggleAllByRarity('☆', true)} className="p-2 bg-yellow-500 text-white rounded">
                        ☆すべて所持
                    </button>
                    <button onClick={() => toggleAllByRarity('☆', false)} className="p-2 bg-gray-500 text-white rounded">
                        ☆すべて未所持
                    </button>
                </div>
            </div>
        </div>
    );
};