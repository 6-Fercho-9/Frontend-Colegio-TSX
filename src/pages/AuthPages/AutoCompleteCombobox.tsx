import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface AutoCompleteComboboxProps<T> {
  options: T[];
  onSelect: (option: T | null) => void;
  placeholder?: string;
  label?: string;
  displayValue: (item: T) => string;
  getKey: (item: T) => string | number;
}

export default function AutoCompleteCombobox<T>({
  options,
  onSelect,
  placeholder = "Buscar...",
  label = "Selecciona una opción",
  displayValue,
  getKey,
}: AutoCompleteComboboxProps<T>) {
  const [selected, setSelected] = useState<T | null>(null);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          displayValue(option).toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onSelect(value);
        }}
      >
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md dark:bg-gray-800">
            <ComboboxInput
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white"
            //   displayValue={(item: T) => displayValue(item)}
              displayValue={(item: T | null) => (item ? displayValue(item) : "")}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={getKey(option)}
                  value={option}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      focus ? "bg-brand-500 text-white" : "text-gray-900 dark:text-white"
                    }`
                  }
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {displayValue(option)}
                      </span>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            focus ? "text-white" : "text-brand-500"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
}



//combobox funcional
// import { useState } from "react";
// import {
//   Combobox,
//   ComboboxButton,
//   ComboboxInput,
//   ComboboxOption,
//   ComboboxOptions,
// } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// interface Option {
//   id: number;
//   name: string;
// }

// interface AutoCompleteComboboxProps {
//   options: Option[];
//   onSelect: (option: Option|null) => void;
//   placeholder?: string;
//   label?: string;
// }

// export default function AutoCompleteCombobox({
//   options,
//   onSelect,
//   placeholder = "Buscar...",
//   label = "Selecciona una opción",
// }: AutoCompleteComboboxProps) {
//   const [selected, setSelected] = useState<Option | null>(null);
//   const [query, setQuery] = useState("");

//   const filteredOptions =
//     query === ""
//       ? options
//       : options.filter((option) =>
//           option.name.toLowerCase().includes(query.toLowerCase())
//         );

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
//         {label}
//       </label>
//       <Combobox
//         value={selected}
//         onChange={(value) => {
//           setSelected(value);
//           onSelect(value);
//         }}
//       >
//         <div className="relative">
//           <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md dark:bg-gray-800">
//             <ComboboxInput
//               className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white"
//               displayValue={(option: Option) => option?.name ?? ""}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder={placeholder}
//             />
//             <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
//               <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             </ComboboxButton>
//           </div>

//           {filteredOptions.length > 0 && (
//             <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
//               {filteredOptions.map((option) => (
//                 <ComboboxOption
//                   key={option.id}
//                   value={option}
//                   className={({ focus }) =>
//                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                       focus ? "bg-brand-500 text-white" : "text-gray-900 dark:text-white"
//                     }`
//                   }
//                 >
//                   {({ selected, focus }) => (
//                     <>
//                       <span
//                         className={`block truncate ${
//                           selected ? "font-medium" : "font-normal"
//                         }`}
//                       >
//                         {option.name}
//                       </span>
//                       {selected && (
//                         <span
//                           className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
//                             focus ? "text-white" : "text-brand-500"
//                           }`}
//                         >
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </ComboboxOption>
//               ))}
//             </ComboboxOptions>
//           )}
//         </div>
//       </Combobox>
//     </div>
//   );
// }
