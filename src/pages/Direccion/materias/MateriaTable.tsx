import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Pagination from "../../pagination/PaginacionT";
import { Modal } from "../../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Badge from "../../../components/ui/badge/Badge";
import SelectModified from "../../shared/SelectModified";
import { useHasRole } from "../../hooks/useRol";
import { getListMateria, updateMateria, deleteMateria } from "../../../services/Personal-Academico/MateriaService";
import { Materia } from "../../../services/interfaces/Personal-Escolar/Materia";

interface MateriaTableProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const MateriaTable = ({ reloadTrigger, onDeleted }: MateriaTableProps) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editEstado, setEditEstado] = useState("");

  const esAdmin = useHasRole(["ADMINISTRADOR"]);

  const fetchMaterias = async () => {
    try {
      const data = await getListMateria(currentPage);
      setMaterias(data.items);
      setTotalPages(data.meta.total_pages);
    } catch (error) {
      console.error("Error al obtener materias paginadas", error);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, [currentPage, reloadTrigger]);

  const openEditModal = (materia: Materia) => {
    setSelectedMateria(materia);
    setEditNombre(materia.nombre);
    setEditEstado(materia.estado);
    setShowEditModal(true);
  };

  const openDeleteModal = (materia: Materia) => {
    setSelectedMateria(materia);
    setShowDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedMateria) return;
    try {
      const data = await updateMateria(selectedMateria.id, editNombre, editEstado);
      Swal.fire({
        title: "Materia actualizada",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      fetchMaterias();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowEditModal(false);
      Swal.fire("Error", error.message || "No se pudo actualizar la materia", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedMateria) return;
    try {
      const data = await deleteMateria(selectedMateria.id);
      Swal.fire("Materia eliminada", data.message, "success");
      setShowDeleteModal(false);
      fetchMaterias();
      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowEditModal(false);
      Swal.fire("Error", error.message || "No se pudo eliminar la materia", "error");
    }
  };

  const estadoBadge = (estado: string) => (
    <Badge variant="light" color={estado === "Habilitado" ? "success" : "error"}>{estado}</Badge>
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Última actualización</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Estado</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {materias.map((materia) => (
                <TableRow key={materia.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{materia.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{materia.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{materia.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{materia.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">{estadoBadge(materia.estado)}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(materia)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      {esAdmin && (
                        <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(materia)}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
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

      {/* Modal Editar */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Editar Materia</h2>
          <Label>Nombre</Label>
          <Input value={editNombre} onChange={(e) => setEditNombre(e.target.value)} placeholder="Nombre de la materia" />

          <Label className="mt-4">Estado</Label>
          <SelectModified
            options={[
              { value: "Habilitado", label: "Habilitado" },
              { value: "Deshabilitado", label: "Deshabilitado" },
            ]}
            value={editEstado}
            onChange={(value) => setEditEstado(value)}
            placeholder="Seleccione un estado"
          />

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
            ¿Estás seguro de que deseas eliminar la materia <span className="font-bold">{selectedMateria?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MateriaTable;
