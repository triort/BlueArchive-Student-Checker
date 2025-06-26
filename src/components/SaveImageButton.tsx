export const SaveImageButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="text-center mb-6">
            <button
                onClick={onClick}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
            >
                所持状況画像を保存
            </button>
        </div>
    );
};