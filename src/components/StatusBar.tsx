interface StatusBarProps {
    ownedCount: number;
    totalCount: number;
    ownershipPercentage: number;
}

export const StatusBar = ({ ownedCount, totalCount, ownershipPercentage }: StatusBarProps) => {
    return (
        <div className="flat-card p-6 mb-6 text-center bg-blue-50">
            <p className="text-xl text-gray-800">
                <span className="font-semibold text-blue-600">所持率: {ownershipPercentage}%</span>
                <span className="text-gray-600 ml-2">({ownedCount}/{totalCount})</span>
            </p>
        </div>
    );
};