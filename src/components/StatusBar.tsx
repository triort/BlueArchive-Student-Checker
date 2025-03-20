export const StatusBar = ({ ownedCount, totalCount, ownershipPercentage }) => {
    return (
        <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-xl">
                <span className="font-bold">所持率: {ownershipPercentage}%</span> ({ownedCount}/{totalCount})
            </p>
        </div>
    );
};