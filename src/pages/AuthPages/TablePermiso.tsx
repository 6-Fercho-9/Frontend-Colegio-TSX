// components/tables/TablePermiso.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deletePermiso, getPaginatedPermisos, updatePermiso } from "../../services/Gestion_de_usuario/permisoService";
import { Permiso } from "../../services/interfaces/usuarios";
import Swal from "sweetalert2";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
interface TablePermisoProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}
const TablePermiso = ({reloadTrigger,onDeleted}:TablePermisoProps) => {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPermiso, setSelectedPermiso] = useState<Permiso | null>(null);
   // para el edit
    const [showEditModal, setShowEditModal] = useState(false);
    const [permisoEditNombre, setPermisoEditNombre] = useState("");
    const [permisoToEdit, setPermisoToEdit] = useState<Permiso | null>(null);
    const openEditModal = (permiso: Permiso) => {
      setPermisoToEdit(permiso);
      setPermisoEditNombre(permiso.nombre); // precargar el input con el nombre actual
      setShowEditModal(true);
    };



    
  const handleEdit = async () => {
    if (!permisoToEdit) return;

    try {
      const data = await updatePermiso(permisoToEdit.id, permisoEditNombre);
      Swal.fire({
        title: "Permiso actualizado",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      setPermisoToEdit(null);
      setPermisoEditNombre("");

      const updatedData = await getPaginatedPermisos(currentPage);
      setPermisos(updatedData.items);
      setTotalPages(updatedData.meta.total_pages);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.error || "Error",
        text: error.message || "No se pudo actualizar el rol",
      });
    }
  };


  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const data = await getPaginatedPermisos(currentPage);
        //console.log(data)
        setPermisos(data.items);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error("Error al obtener permisos paginados", error);
      }
    };

    fetchPermisos();
  }, [currentPage,reloadTrigger]);

  const openDeleteModal = (permiso: Permiso) => {
    setSelectedPermiso(permiso);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedPermiso) return;

    try {
      const data = await deletePermiso(selectedPermiso.id);
      Swal.fire({
        title: "Permiso eliminado",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowDeleteModal(false);
      setSelectedPermiso(null);

      //  Actualiza los permisos con el nuevo total
      const updatedData = await getPaginatedPermisos(currentPage);

      // 🧠 Si la página actual se quedó sin elementos y no estás en la primera página, retrocede
      if (updatedData.items.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        // Si hay más elementos o estás en la primera, solo actualiza
        setPermisos(updatedData.items);
        setTotalPages(updatedData.meta.total_pages);
      }

      // Notifica al padre si hace falta
      onDeleted?.();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.error || "Error",
        text: error.message || "No se pudo eliminar el permiso",
      });
    }
  };



  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Última actualización</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acción</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {permisos.map((permiso) => (
                <TableRow key={permiso.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">{permiso.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{permiso.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{permiso.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{permiso.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => openEditModal(permiso)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      
                      <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                      onClick={() => openDeleteModal(permiso)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
      {/* Modal eliminación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el permiso{" "}
            <span className="font-bold">{selectedPermiso?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
       {/* modal de edicion */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Editar Permiso
          </h2>
          <Label>Nombre</Label>
          <Input
            type="text"
            className="w-full p-2 border rounded"
            value={permisoEditNombre}
            onChange={(e) => setPermisoEditNombre(e.target.value)}
          />
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleEdit}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TablePermiso;
