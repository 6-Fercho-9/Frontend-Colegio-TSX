import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { PencilSquareIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { deleteRol, getPaginatedRoles, updateRol } from "../../services/Gestion_de_usuario/rolService"; // importa tu servicio
import { Rol } from "../../services/interfaces/usuarios";
import { Modal } from "../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { useNavigate } from "react-router";




interface TableRolProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const TableRol = ({ reloadTrigger, onDeleted }: TableRolProps) => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate()
  // para el edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [rolEditNombre, setRolEditNombre] = useState("");
  const [rolToEdit, setRolToEdit] = useState<Rol | null>(null);
  const openEditModal = (rol: Rol) => {
    setRolToEdit(rol);
    setRolEditNombre(rol.nombre); // precargar el input con el nombre actual
    setShowEditModal(true);
  };


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null);

  //abrir el modal de eliminacion
  const openDeleteModal = (rol: Rol) => {
    setSelectedRol(rol);
    setShowDeleteModal(true);
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAsignarPermisos = (rolId:number) => {
    console.log(`asignacion ${rolId}`)
    navigate(`/roles-permisos/rol/${rolId}`)
  }
  //handle para el edit del modal
  const handleEdit = async () => {
  if (!rolToEdit) return;

    try {
      const data = await updateRol(rolToEdit.id, rolEditNombre);
      Swal.fire({
        title: "Rol actualizado",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      setRolToEdit(null);
      setRolEditNombre("");

      const updatedData = await getPaginatedRoles(currentPage);
      setRoles(updatedData.items);
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

  //se dispara despues de presionar el eliminar
  const handleDelete = async () => {
    if (!selectedRol) return;

    try {
      console.log(selectedRol.id)
      const data = await deleteRol(selectedRol.id);
      Swal.fire({title:"Rol eliminado",
                 text:data.message, 
                 icon:"success",
                 timer:2000,
                 showConfirmButton: false,
                });
      setShowDeleteModal(false);
      setSelectedRol(null);
      const updatedData = await getPaginatedRoles(currentPage);

      //  Si la página actual se quedó sin elementos y no estás en la primera página, retrocede
      if (updatedData.items.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        // Si hay más elementos o estás en la primera, solo actualiza
        setRoles(updatedData.items);
        setTotalPages(updatedData.meta.total_pages);
      }

      
      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      Swal.fire({
      icon: "error",
      title: error.error || "Error",
      text: error.message || "No se pudo eliminar el rol",
    });
    }
  };

  // Dentro del componente:



  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getPaginatedRoles(currentPage);
        setRoles(data.items);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error("Error al obtener roles paginados", error);
      }
    };

    fetchRoles();
  }, [currentPage,reloadTrigger]);

  return (
    <>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">ID</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nombre</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Fecha creación</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Última actualización</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Acciones</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">{role.id}</TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{role.nombre}</TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{role.fecha_creacion}</TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{role.fecha_actualizacion}</TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                     onClick={() => openEditModal(role)}
                     >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => handleAsignarPermisos(role.id)}>
                      <UserPlusIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                    onClick={() => openDeleteModal(role)}>
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
    {/* modal de eliminacion */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el rol{" "}
            <span className="font-bold">{selectedRol?.nombre}</span>?
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
            Editar Rol
          </h2>
          <Label>Nombre</Label>
          <Input
            type="text"
            className="w-full p-2 border rounded"
            value={rolEditNombre}
            onChange={(e) => setRolEditNombre(e.target.value)}
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

export default TableRol;
