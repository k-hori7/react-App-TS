type Props = {
  name: string;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function CategoryBadge({
  name,
  isSelected,
  onToggle,
  disabled,
}: Props) {
  return (
    <button
      type="button" //これがないとsubmitと勘違いされる
      onClick={onToggle}
      disabled={disabled}
      className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-white text-black border-gray-300 hover:border-blue-400"
        } 
        disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {name}
    </button>
  );
}
