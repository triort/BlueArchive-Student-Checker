import { useRef, useCallback } from 'react';
import { Student } from '../types';

// --- Layout Constants ---
const CANVAS_PADDING = 40;
const HEADER_HEIGHT = 140;
const ICON_SIZE = 80;
const CELL_GAP = 12;
const NAME_HEIGHT = 22;
const RARITY_HEIGHT = 18;
const CARD_PADDING = 6;
const CARD_TOTAL = ICON_SIZE + CARD_PADDING * 2 + NAME_HEIGHT + RARITY_HEIGHT + 8;
const FOOTER_HEIGHT = 50;

// --- Colors ---
const COLORS = {
  bgGradientTop: '#E8F4FD',
  bgGradientBottom: '#F0F4FF',
  headerGradientStart: '#2F80ED',
  headerGradientEnd: '#56CCF2',
  progressBg: '#E2E8F0',
  progressFill1: '#56CCF2',
  progressFill2: '#2F80ED',
  cardBg: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.6)',
  ownedCheckBg: '#27AE60',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  rarity3: '#E6A817',
  rarity2: '#9B51E0',
  rarity1: '#2D9CDB',
  footerText: '#94A3B8',
} as const;

const RARITY_COLORS: Record<number, string> = {
  3: COLORS.rarity3,
  2: COLORS.rarity2,
  1: COLORS.rarity1,
};

// --- Helper: rounded rect ---
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// --- Helper: clip and draw image in rounded rect ---
function drawRoundedImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, size: number, radius: number) {
  ctx.save();
  roundRect(ctx, x, y, size, size, radius);
  ctx.clip();
  ctx.drawImage(img, x, y, size, size);
  ctx.restore();
}

export const useImageExporter = (students: Student[], ownershipPercentage: number, ownedCount: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const exportImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 8;
    const cellWidth = ICON_SIZE + CARD_PADDING * 2;
    const canvasWidth = CANVAS_PADDING * 2 + cols * cellWidth + (cols - 1) * CELL_GAP;
    const rows = Math.ceil(students.length / cols);
    const gridHeight = rows * CARD_TOTAL + (rows - 1) * CELL_GAP;
    const canvasHeight = HEADER_HEIGHT + gridHeight + FOOTER_HEIGHT + CANVAS_PADDING;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // --- Background gradient ---
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bgGrad.addColorStop(0, COLORS.bgGradientTop);
    bgGrad.addColorStop(1, COLORS.bgGradientBottom);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // --- Header ---
    const headerGrad = ctx.createLinearGradient(CANVAS_PADDING, 30, canvasWidth - CANVAS_PADDING, 30);
    headerGrad.addColorStop(0, COLORS.headerGradientStart);
    headerGrad.addColorStop(1, COLORS.headerGradientEnd);

    ctx.fillStyle = headerGrad;
    ctx.font = 'bold 28px "Noto Sans JP", "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('ブルアカ 生徒所持チェッカー', CANVAS_PADDING, CANVAS_PADDING);

    // --- Stats line ---
    ctx.font = 'bold 20px "Inter", "Noto Sans JP", sans-serif';
    ctx.fillStyle = COLORS.headerGradientStart;
    ctx.fillText(`${ownershipPercentage}%`, CANVAS_PADDING, CANVAS_PADDING + 42);

    ctx.font = '16px "Noto Sans JP", sans-serif';
    ctx.fillStyle = COLORS.textSecondary;
    const pctWidth = ctx.measureText(`${ownershipPercentage}%`).width;
    ctx.fillText(`  所持率`, CANVAS_PADDING + pctWidth, CANVAS_PADDING + 44);

    ctx.textAlign = 'right';
    ctx.fillStyle = COLORS.textSecondary;
    ctx.fillText(`${ownedCount} / ${students.length}`, canvasWidth - CANVAS_PADDING, CANVAS_PADDING + 44);
    ctx.textAlign = 'left';

    // --- Progress bar ---
    const barY = CANVAS_PADDING + 72;
    const barWidth = canvasWidth - CANVAS_PADDING * 2;
    const barHeight = 10;
    const barRadius = 5;

    // Background
    ctx.fillStyle = COLORS.progressBg;
    roundRect(ctx, CANVAS_PADDING, barY, barWidth, barHeight, barRadius);
    ctx.fill();

    // Fill
    if (ownershipPercentage > 0) {
      const fillWidth = Math.max(barHeight, barWidth * (ownershipPercentage / 100));
      const fillGrad = ctx.createLinearGradient(CANVAS_PADDING, barY, CANVAS_PADDING + fillWidth, barY);
      fillGrad.addColorStop(0, COLORS.progressFill1);
      fillGrad.addColorStop(1, COLORS.progressFill2);
      ctx.fillStyle = fillGrad;
      roundRect(ctx, CANVAS_PADDING, barY, fillWidth, barHeight, barRadius);
      ctx.fill();
    }

    // --- Load images and draw grid ---
    const imagePromises = students.map((char) => {
      return new Promise<{ img: HTMLImageElement | null; char: Student }>((resolve) => {
        const studentImg = new Image();
        studentImg.src = `/img/student/${char.id}.webp`;
        studentImg.onload = () => resolve({ img: studentImg, char });
        studentImg.onerror = () => resolve({ img: null, char });
      });
    });

    Promise.all(imagePromises).then((loadedImages) => {
      loadedImages.forEach(({ img, char }, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const cardW = cellWidth;
        const cardH = CARD_TOTAL;
        const x = CANVAS_PADDING + col * (cardW + CELL_GAP);
        const y = HEADER_HEIGHT + row * (cardH + CELL_GAP);

        // Card background
        ctx.fillStyle = COLORS.cardBg;
        roundRect(ctx, x, y, cardW, cardH, 12);
        ctx.fill();
        ctx.strokeStyle = COLORS.cardBorder;
        ctx.lineWidth = 1;
        roundRect(ctx, x, y, cardW, cardH, 12);
        ctx.stroke();

        const imgX = x + CARD_PADDING;
        const imgY = y + CARD_PADDING;

        // Draw image
        if (img) {
          if (!char.owned) {
            ctx.globalAlpha = 0.3;
          }
          drawRoundedImage(ctx, img, imgX, imgY, ICON_SIZE, 8);
          ctx.globalAlpha = 1.0;

          // Grayscale overlay for unowned
          if (!char.owned) {
            ctx.fillStyle = 'rgba(200, 200, 210, 0.15)';
            roundRect(ctx, imgX, imgY, ICON_SIZE, ICON_SIZE, 8);
            ctx.fill();
          }
        } else {
          // Placeholder
          ctx.fillStyle = '#E2E8F0';
          roundRect(ctx, imgX, imgY, ICON_SIZE, ICON_SIZE, 8);
          ctx.fill();
        }

        // Owned check badge
        if (char.owned) {
          const badgeSize = 20;
          const bx = imgX + ICON_SIZE - badgeSize + 4;
          const by = imgY - 4;

          ctx.fillStyle = COLORS.ownedCheckBg;
          ctx.beginPath();
          ctx.arc(bx + badgeSize / 2, by + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);
          ctx.fill();

          // Checkmark
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(bx + 5, by + 10);
          ctx.lineTo(bx + 9, by + 14);
          ctx.lineTo(bx + 15, by + 7);
          ctx.stroke();
        }

        // Name
        const nameY = imgY + ICON_SIZE + 6;
        ctx.fillStyle = COLORS.textPrimary;
        ctx.font = 'bold 12px "Noto Sans JP", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(char.name, x + cardW / 2, nameY, cardW - 8);

        // Rarity stars
        const rarityY = nameY + NAME_HEIGHT - 4;
        const rarityColor = RARITY_COLORS[char.rarity] ?? COLORS.textMuted;
        ctx.fillStyle = rarityColor;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('★'.repeat(char.rarity), x + cardW / 2, rarityY);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
      });

      // --- Footer ---
      const footerY = canvasHeight - FOOTER_HEIGHT + 10;
      ctx.fillStyle = COLORS.footerText;
      ctx.font = '12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(
        `Generated by ブルアカ 生徒所持チェッカー • ${new Date().toLocaleDateString('ja-JP')}`,
        canvasWidth / 2,
        footerY,
      );

      // --- Export ---
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ブルアカ所持状況_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    });
  }, [students, ownershipPercentage, ownedCount]);

  return { canvasRef, exportImage };
};
