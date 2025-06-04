// import { useState, useEffect, useRef } from "react";

// interface Option {
//   id: number;
//   nombre: string;
// }

// interface SearchableSelectProps {
//   items: Option[];
//   value?: Option | null;
//   onSelect: (item: Option) => void;
//   placeholder?: string;
//   disabled?: boolean;
// }

// export default function SearchableSelect({
//   items,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   value = null,
//   onSelect,
//   placeholder = "Buscar...",
//   disabled = false,
// }: SearchableSelectProps) {
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState<Option[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (search.trim() === "") {
//       setFiltered([]);
//     } else {
//       const lower = search.toLowerCase();
//       const matches = items.filter((item) =>
//         item.nombre.toLowerCase().includes(lower)
//       );
//       setFiltered(matches);
//     }
//   }, [search, items]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (item: Option) => {
//     onSelect(item);
//     setSearch(item.nombre);
//     setShowDropdown(false);
//   };

//   return (
//     <div ref={containerRef} className="relative w-full">
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         onFocus={() => setShowDropdown(true)}
//         disabled={disabled}
//         placeholder={placeholder}
//         className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2.5 shadow-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none"
//       />

//       {showDropdown && filtered.length > 0 && (
//         <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-y-auto">
//           {filtered.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => handleSelect(item)}
//               className="cursor-pointer px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-600"
//             >
//               {item.nombre}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export interface SearchableSelectProps<T> {
  items: T[];
  displayField: keyof T; // Campo que se muestra
  idField: keyof T;      // Campo único (id, clave, etc.)
  filterValue: string;
  onlyEnabled?: boolean;
  onFilterChange: (value: string) => void;
  onFilteredChange: (filtered: T[]) => void;
  filterCondition?: (item: T) => boolean; // extra para control adicional
}

function SearchableSelect<T>({
  items,
  displayField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  idField,
  filterValue,
  onlyEnabled = true,
  onFilterChange,
  onFilteredChange,
  filterCondition
}: SearchableSelectProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    const lowerValue = filterValue.trim().toLowerCase();

    const result = items.filter((item) => {
      const name = String(item[displayField]).toLowerCase();
      const matchesText = name.includes(lowerValue);
      const matchesCondition = filterCondition ? filterCondition(item) : true;
      return matchesText && (!onlyEnabled || matchesCondition);
    });

    setFilteredItems(result);
    onFilteredChange(result);
  }, [filterValue, items, onlyEnabled]);

  return (
    <input
      type="text"
      value={filterValue}
      onChange={(e) => onFilterChange(e.target.value)}
      className="w-full p-2 rounded-lg border dark:bg-gray-900 dark:text-white"
      placeholder="Buscar..."
    />
  );
}

export default SearchableSelect;
