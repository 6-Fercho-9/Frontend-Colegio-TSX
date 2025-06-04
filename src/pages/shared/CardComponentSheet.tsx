import { useEffect, useRef } from "react";
import Badge from "../../components/ui/badge/Badge";
import defaul_icono from "../../assets/images/default_image.png";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Server from "../../services/API/server";

interface MateriaCursoProp {
  id: number;
  nombre: string;
  estado?: string;
  imageUrl?: string;
}

interface OpcionAccion {
  label: string;
  onClick: (id: number) => void;
  className?: string;
}

interface MateriaCursoCardOpcionesProps {
  materiaCurso: MateriaCursoProp;
  activeOptionsId: number | null;
  setActiveOptionsId: (id: number | null) => void;
  opciones: OpcionAccion[];
  onCardClick?: (id: number) => void;
}

export default function CardComponentTSX({
  materiaCurso,
  activeOptionsId,
  setActiveOptionsId,
  opciones,
  onCardClick,
}: MateriaCursoCardOpcionesProps) {
  const isOptionsOpen = activeOptionsId === materiaCurso.id;
  const optionsRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setActiveOptionsId(null);
      }
    };

    if (isOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionsOpen, setActiveOptionsId]);

  return (
    <div className="relative" ref={optionsRef}>
      <div
        onClick={onCardClick ? () => onCardClick(materiaCurso.id) : undefined}
        className={clsx(
          "rounded-xl overflow-hidden transition-transform transform",
          "hover:scale-[1.02]",
          "hover:shadow-md dark:hover:shadow-xl",
          "border border-gray-300 dark:border-white/10",
          onCardClick ? "cursor-pointer" : "cursor-default"
        )}
      >
        <img
          src={
            materiaCurso.imageUrl?.startsWith("http") || materiaCurso.imageUrl?.startsWith("/")
              ? materiaCurso.imageUrl
              : materiaCurso.imageUrl
              ? `${Server.CLOUDINARY_URL}/${materiaCurso.imageUrl}`
              : defaul_icono
          }
          alt="Imagen de materia"
          className="w-full h-32 object-cover"
        />
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white truncate mb-2">
            {materiaCurso.nombre}
          </h3>
          <Badge color={materiaCurso.estado === "Habilitado" ? "success" : "error"} variant="light">
            {materiaCurso.estado}
          </Badge>
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveOptionsId(isOptionsOpen ? null : materiaCurso.id);
          }}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <EllipsisVerticalIcon className="w-5 h-5 text-gray-600 dark:text-white" />
        </button>

        {isOptionsOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 shadow-md rounded-md z-20">
            {opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  opcion.onClick(materiaCurso.id);
                  setActiveOptionsId(null);
                }}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                  opcion.className
                )}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
