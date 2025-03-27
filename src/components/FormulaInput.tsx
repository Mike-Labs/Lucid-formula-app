import { useState, KeyboardEvent, ChangeEvent } from "react";
import useFormulaStore from "../store/formulaStore";
import { useAutocomplete } from "../hooks/useAutocomplete";
import FormulaTag from "./FormulaTag";

const operators = ["+", "-", "*", "/", "^", "(", ")"];

const FormulaInput: React.FC = () => {
  const { formula, setFormula } = useFormulaStore();
  const [input, setInput] = useState<string>("");
  const { data: suggestions } = useAutocomplete(input);
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (text: string) => {
    if (text.trim()) {
      setTags([...tags, text.trim()]);
      setFormula([...tags, text.trim()].join(" ")); // Update global state
      setInput(""); // Clear input
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    setFormula(tags.filter((_, i) => i !== index).join(" "));
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex flex-wrap items-center border p-2 rounded">
        {tags.map((tag, index) => (
          <FormulaTag key={index} value={tag} onRemove={() => removeTag(index)} />
        ))}
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter formula..."
          className="border-none outline-none px-2 py-1"
        />
      </div>

      {/* Autocomplete */}
      {suggestions?.length ? (
        <ul className="mt-2 border rounded p-2 bg-white shadow-lg">
          {suggestions?.map((s) => (
            <li
              key={s.id}
              className="cursor-pointer hover:bg-gray-100 p-1"
              onClick={() => addTag(s.name)}
            >
              {s.name} ({s.category}) = {s.value}
            </li>
          ))}
        </ul>
      ): null}

      <p className="mt-4 text-gray-600">Formula: {formula}</p>
    </div>
  );
};

export default FormulaInput;





// import { useState, ChangeEvent } from "react";
// import useFormulaStore from "../store/formulaStore";
// import { useAutocomplete } from "../hooks/useAutocomplete";

// const FormulaInput: React.FC = () => {
//   const { formula, setFormula } = useFormulaStore();
//   const [input, setInput] = useState<string>("");
//   const { data: suggestions } = useAutocomplete(input);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//     setFormula(e.target.value);
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         value={input} 
//         onChange={handleChange} 
//         placeholder="Enter formula..." 
//       />
//       {suggestions?.length ? (
//         <ul>
//           {suggestions?.map((s) => (
//             // <li key={s.id}>{s.value}</li>
//             <li key={s.id}>
//                 <strong>{s.name}</strong> - {s.category} - {s.value}
//             </li>
//           ))}
//         </ul>
//       ) : null}
//       <p>Current Formula: {formula}</p>
//     </div>
//   );
// };

// export default FormulaInput;
