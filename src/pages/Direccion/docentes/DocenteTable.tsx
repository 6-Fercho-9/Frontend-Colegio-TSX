import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useHasRole } from "../../hooks/useRol";
import { DocenteList } from "../../../services/interfaces/Personal-Escolar/Docente";
import { getDocentes, updateDocente, deleteDocente } from "../../../services/Personal-Academico/DocenteService";

interface DocenteTableProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const DocenteTable = ({ reloadTrigger, onDeleted }: DocenteTableProps) => {
  const [docentes, setDocentes] = useState<DocenteList[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState<DocenteList | null>(null);
  // const [materiasDisponibles, setMateriasDisponibles] = useState<materia[]>([]);
  const [editNombre, setEditNombre] = useState("");
	const [editEmail, setEditEmail] = useState("");

  const fetchDocentes = async () => {
    try {
      const data = await getDocentes();
      setDocentes(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error al obtener Categorias paginadas", error);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, [ reloadTrigger]);

  const openEditModal = (docente: DocenteList) => {
    setSelectedDocente(docente);
    setEditNombre(docente.nombre);
		setEditEmail(docente.email);
    setShowEditModal(true);
  };

  const openDeleteModal = (docente: DocenteList) => {
    setSelectedDocente(docente);
    setShowDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedDocente) return;
    try {
      const data = await updateDocente(selectedDocente.id, editNombre, editEmail);
      Swal.fire({
        title: "Docente actualizado",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      fetchDocentes();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowEditModal(false);
      Swal.fire("Error", error.message || "No se pudo actualizar la Categoria", "error");
    }
  };

  const esAdmin = useHasRole(["ADMINISTRADOR"]);

  const handleDelete = async () => {
    if (!selectedDocente) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await deleteDocente(selectedDocente.id);
      // Swal.fire("Categoria eliminada", data.message, "success");
      setShowDeleteModal(false);
      fetchDocentes();
      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowDeleteModal(false);
      Swal.fire("Error", error.message || "No se pudo eliminar al docente", "error");
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">CI</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Email</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Edad</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Sexo</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Estado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {docentes.map((docente : DocenteList) => (
                <TableRow key={docente.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{docente.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{docente.ci}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{docente.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{docente.email}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{docente.edad}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{docente.sexo}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{docente.estado}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(docente)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      {esAdmin && (<button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(docente)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal Editar */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Editar docente</h2>
          <Label>Nombre</Label>
          <Input value={editNombre} onChange={(e) => setEditNombre(e.target.value)} placeholder="Nombre de la gestión" />

          <Label>Correo Electronico</Label>
          <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Correo del docente" />

          {/* <Label className="mt-4">Estado</Label>
          <SelectModified
            options={[
              { value: "AC", label: "Habilitado" },
              { value: "Deshabilitado", label: "Deshabilitado" },
            ]}
            value={editEstado}
            onChange={(value) => setEditEstado(value)}
            placeholder="Seleccione un estado"
          /> */}

          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowEditModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleUpdate}>Guardar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Eliminar */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Confirmar eliminación</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el docente <span className="font-bold">{selectedDocente?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DocenteTable;
