import { useState, useEffect, useRef } from 'react';
import studentsData from './assets/students.json';
import { Student } from './types';
import { FilterPanel } from './components/FilterPanel';
import { CharacterCard } from './components/CharacterCard';
import { StatusBar } from './components/StatusBar';
import { SaveImageButton } from './components/SaveImageButton';

// キャラクターデータを別ファイルとして管理
const CharacterData = (): Student[] => {
  try {
    // JSONデータはすでに配列形式なので、直接マッピング
    return studentsData.map(student => {
      const starRarity = '☆'.repeat(Number(student.rarity));


      return {
        ...student,
        rarity: starRarity,
        owned: false,
        attackType: student.attackType, // タイプミス修正
      };
    });
  } catch (error) {
    console.error("Failed to load student data:", error);
    return [];
  }
};

// メインアプリケーションコンポーネント
const CharacterOwnershipChecker = () => {
  // データをJSONファイルから読み込む
  const initialCharacters = CharacterData();
  const [characters, setCharacters] = useState(initialCharacters);
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterRarity, setFilterRarity] = useState('all');
  const [filterElement, setFilterElement] = useState('all');
  const [filterOwned, setFilterOwned] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const canvasRef = useRef(null);

  // 所持数と所持率の計算
  const ownedCount = characters.filter(char => char.owned).length;
  const ownershipPercentage = (ownedCount / characters.length * 100).toFixed(1);

  // フィルタリングとソートの適用
  const filteredAndSortedCharacters = characters
    .filter(char => {
      // 検索フィルターの修正
      const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.fullname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === 'all' || char.rarity === filterRarity;
      const matchesElement = filterElement === 'all' || char.element === filterElement;
      const matchesOwned = filterOwned === 'all' ||
        (filterOwned === 'owned' && char.owned) ||
        (filterOwned === 'notOwned' && !char.owned);
      return matchesSearch && matchesRarity && matchesElement && matchesOwned;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rarity':
          // ☆☆☆ > ☆☆ > ☆ の順でソート
          const rarityOrder = { '☆☆☆': 0, '☆☆': 1, '☆': 2 };
          comparison = rarityOrder[a.rarity] - rarityOrder[b.rarity];
          break;
        case 'releaseDate':
          comparison = new Date(a.releaseDate) - new Date(b.releaseDate);
          break;
        case 'element':
          comparison = (a.element || '').localeCompare(b.element || '');
          break;
        default:
          // idがstring型のため、数値比較からlocaleCompareに変更
          comparison = new Date(a.releaseDate) - new Date(b.releaseDate);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // キャラクターの所持状態を切り替える
  const toggleOwnership = (id) => {
    setCharacters(characters.map(char =>
      char.id === id ? { ...char, owned: !char.owned } : char
    ));
  };

  // 特定のレアリティのキャラをすべて所持/非所持に切り替える
  const toggleAllByRarity = (rarity, owned) => {
    setCharacters(characters.map(char =>
      char.rarity === rarity ? { ...char, owned } : char
    ));
  };

  // 画像保存機能
  const saveImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas をクリア
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // タイトルと所持率を描画
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("キャラクター所持状況", 20, 40);
    ctx.font = "18px Arial";
    ctx.fillText(`所持率: ${ownershipPercentage}% (${ownedCount}/${characters.length})`, 20, 70);

    // キャラクターアイコンの描画設定
    const iconSize = 60;
    const padding = 10;
    const textHeight = 30; // テキストのスペース
    const iconsPerRow = Math.floor((canvas.width - padding) / (iconSize + padding));

    // 画像の読み込みをPromise化
    const imagePromises = characters.map((char, index) => {
      return new Promise((resolve) => {
        const studentImg = new Image();
        studentImg.src = `./src/assets/img/student/${char.id}.webp`;
        studentImg.onload = () => resolve({ img: studentImg, char, index });
        studentImg.onerror = () => resolve({ img: null, char, index }); // 画像が見つからない場合
      });
    });

    // すべての画像がロードされてから描画
    Promise.all(imagePromises).then((loadedImages) => {
      loadedImages.forEach(({ img, char, index }) => {
        const row = Math.floor(index / iconsPerRow);
        const col = index % iconsPerRow;
        const x = padding + col * (iconSize + padding);
        const y = 100 + row * (iconSize + padding + textHeight);

        // アイコン背景
        ctx.fillStyle = char.owned ? "#e6f7ff" : "#f0f0f0";
        ctx.fillRect(x, y, iconSize, iconSize);

        // アイコン画像（グレーアウト処理）
        if (img) {
          if (!char.owned) {
            ctx.globalAlpha = 0.3; // 非所持キャラは透明度を下げる
          }
          ctx.drawImage(img, x, y, iconSize, iconSize);
          ctx.globalAlpha = 1.0; // 透明度をリセット
        }

        // キャラクター名とレアリティ（画像の下に表示）
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(char.name, x + iconSize / 2, y + iconSize + 15);
        ctx.fillText(char.rarity, x + iconSize / 2, y + iconSize + 30);
      });

      // 画像をダウンロード
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `キャラクター所持状況_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    });
  };


  return (
    <div className="">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">キャラクター所持率チェッカー</h1>

        {/* 所持率表示 */}
        <StatusBar
          ownedCount={ownedCount}
          totalCount={characters.length}
          ownershipPercentage={ownershipPercentage}
        />

        {/* フィルタとソートのコントロール */}
        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRarity={filterRarity}
          setFilterRarity={setFilterRarity}
          filterElement={filterElement}
          setFilterElement={setFilterElement}
          filterOwned={filterOwned}
          setFilterOwned={setFilterOwned}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          toggleAllByRarity={toggleAllByRarity}
        />

        {/* キャラクターリスト */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          {filteredAndSortedCharacters.map(char => (
            <CharacterCard
              key={char.id}
              character={char}
              toggleOwnership={toggleOwnership}
            />
          ))}
        </div>

        {/* 画像保存ボタン */}
        <SaveImageButton onClick={saveImage} />

        {/* 画像生成用の非表示キャンバス */}
        <canvas
          ref={canvasRef}
          width="800"
          height="1000"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default CharacterOwnershipChecker;