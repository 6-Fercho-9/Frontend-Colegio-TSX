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
import { adminDeleteUserMethod, getPaginatedListUsers } from "../../services/Gestion_de_usuario/usuarioService";
import { Usuario } from "../../services/interfaces/usuarios";
import { useNavigate } from "react-router";
import { Modal } from "../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../components/ui/button/Button";

const UsuarioTable = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  const openDeleteModal = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowDeleteModal(true);
  };
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getPaginatedListUsers(currentPage);
        setUsuarios(data.items);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error("Error al obtener usuarios paginados", error);
      }
    };

    fetchUsuarios();
  }, [currentPage]);

   const handleEditarPerfil = (usuarioId:number) => {
    console.log(`asignacion ${usuarioId}`)
    navigate(`/profile/usuario/${usuarioId}`)
  }

  const handleDeleteUser = async () => {
    if (!usuarioSeleccionado) return;
    try {
      const response = await adminDeleteUserMethod(usuarioSeleccionado.id);
      Swal.fire({
        title: "Exito",
        text: response.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Refresca la lista de usuarios
      const data = await getPaginatedListUsers(currentPage);
      setUsuarios(data.items);
      setTotalPages(data.meta.total_pages);

      setShowDeleteModal(false);
      setUsuarioSeleccionado(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo eliminar el usuario", "error");
    }
  };
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Username</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Correo</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Última actualización</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Rol</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{usuario.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{usuario.username}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{usuario.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{usuario.email}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{usuario.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{usuario.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{usuario.rol?.nombre ?? "-"}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => handleEditarPerfil(usuario.id)}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                          className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                          onClick={() => openDeleteModal(usuario)}
                        >
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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className="max-w-[400px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <span className="font-bold">{usuarioSeleccionado?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDeleteUser}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default UsuarioTable;
