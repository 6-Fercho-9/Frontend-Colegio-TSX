
// import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Badge from "../../components/ui/badge/Badge";
import defaul_icono from "../../assets/images/default_image.png";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Server from "../../services/API/server";



interface MateriaCursoProp{
  id: number;
  nombre: string;
  estado: string;
  imageUrl?: string;
}
interface MateriaCardProps {
  materiaCurso :MateriaCursoProp,
  activeOptionsId: number | null;
  setActiveOptionsId: (id: number | null) => void;
  onNavigate?: (id:number) => void,
  onDelete?:(id:number) => void 
   
  // onClick?: () => void;
}

export default function MateriaCursoCard({
  materiaCurso,
  activeOptionsId,
  setActiveOptionsId,
  onNavigate,
  onDelete,
  
}: MateriaCardProps) {
  // const navigate = useNavigate();
  const isOptionsOpen = activeOptionsId === materiaCurso.id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    setShowDeleteModal(false);
    //llamo al metodo desde el componente padre 
    onDelete?.(materiaCurso.id);
  };

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


  const handleNavigate = () => {
    if (onNavigate){
      onNavigate(materiaCurso.id)
    }
  }

  return (
    <div className="relative" ref={optionsRef}>
      {/* <div
        // onClick={handleNavigate}
        onClick={onNavigate ? handleNavigate : undefined}
        className={clsx(
          "rounded-xl shadow-md overflow-hidden transition-transform",
          onNavigate
            ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg"
            : "cursor-default"
        )}
        //className="cursor-pointer rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-900 transition-transform hover:scale-[1.02] hover:shadow-lg"
      > */}
        <div
            onClick={onNavigate ? handleNavigate : undefined}
            className={clsx(
              "rounded-xl overflow-hidden transition-transform transform",
              "hover:scale-[1.02]",
              "hover:shadow-md dark:hover:shadow-xl", // sombras en modo claro/oscuro
              "border",                                 // borde base
              "border-gray-300 dark:border-white/10",   // color del borde por modo
              onNavigate ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : "cursor-default"
            )}
          >
          {/* <img
          src={materiaCurso.imageUrl?`${Server.CLOUDINARY_URL}/${materiaCurso.imageUrl}`: defaul_icono}
          alt="Imagen de materia"
          className="w-full h-32 object-cover"
        /> */}
          <img
            src={
              materiaCurso.imageUrl?.startsWith("http") || materiaCurso.imageUrl?.startsWith("/") // Imagen absoluta o local
                ? materiaCurso.imageUrl
                : materiaCurso.imageUrl
                  ? `${Server.CLOUDINARY_URL}/${materiaCurso.imageUrl}` // Imagen desde Cloudinary
                  : defaul_icono
            }
            alt="Imagen de materia"
            className="w-full h-32 object-cover"
          />
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white truncate mb-2">{materiaCurso.nombre}</h3>
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
          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-md rounded-md z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
                setActiveOptionsId(null);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
            >
              Eliminar
            </button>
          </div>
        )}
        

      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">¿Estás seguro?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ¿Deseas eliminar la materia "<span className="font-bold">{materiaCurso.nombre}</span>"?</p>
          <div className="flex justify-end gap-3 pt-6">
            
            <Button size="sm" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
