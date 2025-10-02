export const SaveImageButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="text-center mb-6">
            <button
                onClick={onClick}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition-colors duration-200"
            >
                所持状況画像を保存
            </button>
        </div>
    );
};