import { useRef } from 'react';
import { Student } from '../types';

export const useImageExporter = (students: Student[], ownershipPercentage: number, ownedCount: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("キャラクター所持状況", 20, 40);
    ctx.font = "18px Arial";
    ctx.fillText(`所持率: ${ownershipPercentage}% (${ownedCount}/${students.length})`, 20, 70);

    const iconSize = 60;
    const padding = 10;
    const textHeight = 30;
    const iconsPerRow = Math.floor((canvas.width - padding) / (iconSize + padding));

    const imagePromises = students.map((char) => {
      return new Promise<{ img: HTMLImageElement | null; char: Student }>((resolve) => {
        const studentImg = new Image();
        // Vite/Reactでは `import` 経由でのリソース解決が推奨されるが、
        // 動的パスのためここでは `public` ディレクトリからの読み込みを想定する
        studentImg.src = `/img/student/${char.id}.webp`;
        studentImg.onload = () => resolve({ img: studentImg, char });
        studentImg.onerror = () => resolve({ img: null, char });
      });
    });

    Promise.all(imagePromises).then((loadedImages) => {
      loadedImages.forEach(({ img, char }, index) => {
        const row = Math.floor(index / iconsPerRow);
        const col = index % iconsPerRow;
        const x = padding + col * (iconSize + padding);
        const y = 100 + row * (iconSize + padding + textHeight);

        ctx.fillStyle = char.owned ? "#e6f7ff" : "#f0f0f0";
        ctx.fillRect(x, y, iconSize, iconSize);

        if (img) {
          if (!char.owned) {
            ctx.globalAlpha = 0.3;
          }
          ctx.drawImage(img as HTMLImageElement, x, y, iconSize, iconSize);
          ctx.globalAlpha = 1.0;
        }

        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(char.name, x + iconSize / 2, y + iconSize + 15);
        ctx.fillText('☆'.repeat(char.rarity), x + iconSize / 2, y + iconSize + 30);
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `キャラクター所持状況_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return { canvasRef, exportImage };
};
