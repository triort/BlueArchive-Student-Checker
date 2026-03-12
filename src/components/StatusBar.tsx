interface StatusBarProps {
    ownedCount: number;
    totalCount: number;
    ownershipPercentage: number;
}

export const StatusBar = ({ ownedCount, totalCount, ownershipPercentage }: StatusBarProps) => {
    return (
        <div className="glass-card mb-6 p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold" style={{ color: 'var(--ba-sky-600)' }}>
                        {ownershipPercentage}%
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--neutral-500)' }}>
                        所持率
                    </span>
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--neutral-600)' }}>
                    <span style={{ color: 'var(--ba-sky-600)' }}>{ownedCount}</span>
                    <span style={{ color: 'var(--neutral-400)' }}> / {totalCount}</span>
                </div>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--neutral-200)' }}>
                <div
                    className="progress-bar-fill h-full"
                    style={{ width: `${ownershipPercentage}%` }}
                />
            </div>
        </div>
    );
};