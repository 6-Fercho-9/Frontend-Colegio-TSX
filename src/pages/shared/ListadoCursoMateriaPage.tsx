import { useState } from "react";
import MateriaCursoCard from "./ComponentCard";
import NavigationTabs from "./NavegationBar";


const materias = [
  { id: 1, nombre: "Matemática I", estado: "Habilitado", imageUrl: "https://via.placeholder.com/300x150?text=Mate" },
  { id: 2, nombre: "Física II", estado: "Deshabilitado", imageUrl: "" },
  { id: 3, nombre: "Química Orgánica", estado: "Habilitado" },
  // Agrega más materias simuladas...
];

export default function ListadoMateriasPage() {
  const [activeOptionsId, setActiveOptionsId] = useState<number | null>(null);
  return (
    <>
        <NavigationTabs
          className="mb-4"
          activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
          defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
        {materias.map((materia) => (
            <MateriaCursoCard key={materia.id} materiaCurso={materia} activeOptionsId={activeOptionsId} setActiveOptionsId={setActiveOptionsId}/>
        ))}
        </div>
    </>
  );
}
