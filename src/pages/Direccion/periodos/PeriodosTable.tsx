import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PencilSquareIcon, TrashIcon} from "@heroicons/react/24/solid";
import { Modal } from "../../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { getListPeriodos,deletePeriodos } from "../../../services/Personal-Academico/PeriodoService";
import { useHasRole } from "../../hooks/useRol";
import SelectModified from "../../shared/SelectModified";
import { Periodo } from "../../../services/interfaces/Periodo";

interface PeriodosTableProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const PeriodosTable = ({ reloadTrigger, onDeleted }: PeriodosTableProps) => {
  const [Periodoss, setPeriodoss] = useState<Periodo[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPeriodos, setSelectedPeriodos] = useState<Periodo | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editEstado,setEditEstado] = useState("");

  const fetchPeriodoss = async () => {
    try {
      const data = await getListPeriodos();
      setPeriodoss(data);
    } catch (error) {
      console.error("Error al obtener Periodoss paginadas", error);
    }
  };

  useEffect(() => {
    fetchPeriodoss();
  }, [ reloadTrigger]);

  const openEditModal = (Periodos: Periodo) => {
    setSelectedPeriodos(Periodos);
    setEditNombre(Periodos.nombre);
    setShowEditModal(true);
  };

  const openDeleteModal = (Periodos: Periodo) => {
    setSelectedPeriodos(Periodos);
    setShowDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedPeriodos) return;
    try {
      // const data = await updatePeriodos(selectedPeriodos.id, editNombre,editEstado);
      Swal.fire({
        title: "Periodos actualizada",
        // text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      fetchPeriodoss();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowEditModal(false);
      Swal.fire("Error", error.message || "No se pudo actualizar la Periodos", "error");
    }
  };

  const esAdmin = useHasRole(["ADMINISTRADOR"]);

  const handleDelete = async () => {
    if (!selectedPeriodos) return;
    try {
      const data = await deletePeriodos(selectedPeriodos.id);
      // Swal.fire("Periodos eliminada", data.message, "success");
      setShowDeleteModal(false);
      fetchPeriodoss();
      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowDeleteModal(false);
      Swal.fire("Error", error.message || "No se pudo eliminar la Periodos", "error");
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
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Estado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Periodoss.map((Periodos : Periodo) => (
                <TableRow key={Periodos.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{Periodos.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{Periodos.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{Periodos.estado}</TableCell>
                  
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(Periodos)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      {esAdmin && (<button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(Periodos)}>
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
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Editar Gestión</h2>
          <Label>Nombre</Label>
          <Input value={editNombre} onChange={(e) => setEditNombre(e.target.value)} placeholder="Nombre de la gestión" />

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
            ¿Estás seguro de que deseas eliminar la Periodos <span className="font-bold">{selectedPeriodos?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PeriodosTable;
