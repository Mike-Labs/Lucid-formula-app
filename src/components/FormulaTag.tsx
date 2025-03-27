import { useState } from "react";

interface FormulaTagProps {
  value: string;
  onRemove: () => void;
}

const FormulaTag: React.FC<FormulaTagProps> = ({ value, onRemove }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center border rounded-lg px-2 py-1 bg-gray-200">
      <span>{value}</span>

      {/* Dropdown Toggle */}
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="ml-2 p-1 text-gray-600 hover:text-black"
      >
        ▼
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <ul className="text-sm">
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => alert(`Editing ${value}`)}
            >
              ✏️ Edit
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={onRemove}
            >
              ❌ Remove
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormulaTag;
