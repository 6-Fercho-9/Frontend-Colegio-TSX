
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { EyeIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Modal } from "../../../../../components/ui/modal";
import Input from "../../../../../components/form/input/InputField";
import Label from "../../../../../components/form/Label";
import Button from "../../../../../components/ui/button/Button";
import Swal from "sweetalert2";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlumnoAutoEvaluacion } from "../../../../../services/interfaces/Aula-Estudiantil/IntegranteCGMP";
import {
  updateIntegranteAutoEvaluacion,
  updateNotaVoletin,
} from "../../../../../services/Aula-Estudiantil/IntegranteService";
import Server from "../../../../../services/API/server";
import default_image from "../../../../../assets/images/default_profile_2.png";

interface Props {
  estudiantes: AlumnoAutoEvaluacion[];
  onActualizarEstudiantes: () => void;
}

const EstudianteTable = ({ estudiantes, onActualizarEstudiantes }: Props) => {
  const { id } = useParams<{ id: string }>();
  const cgmpId = parseInt(id || "0");

  const [selectedEstudiante, setSelectedEstudiante] = useState<AlumnoAutoEvaluacion | null>(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showRecalcularModal, setShowRecalcularModal] = useState(false);
  const [editableEstudiante, setEditableEstudiante] = useState<AlumnoAutoEvaluacion | null>(null);

  const handleOpenDetalleModal = (est: AlumnoAutoEvaluacion) => {
    setSelectedEstudiante(est);
    setEditableEstudiante({ ...est });
    setShowDetalleModal(true);
  };

  const handleCloseDetalleModal = () => {
    setShowDetalleModal(false);
  };

  const handleOpenRecalcularModal = (est: AlumnoAutoEvaluacion) => {
    setSelectedEstudiante(est);
    setShowRecalcularModal(true);
  };

  const handleCloseRecalcularModal = () => {
    setShowRecalcularModal(false);
  };

    const handleChangeNota = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setEditableEstudiante((prev) => (prev ? { ...prev, nota: value === "" ? null : parseFloat(value) } : prev));
    }
  };

  const handleChangeSer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setEditableEstudiante((prev) => (prev ? { ...prev, ser: value === "" ? null : parseFloat(value) } : prev));
    }
  };

  const handleChangeDecidir = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setEditableEstudiante((prev) => (prev ? { ...prev, decidir: value === "" ? null : parseFloat(value) } : prev));
    }
  };

  const handleActualizar = async () => {
    if (!editableEstudiante){
      console.log("No hay estudiante seleccionado para recalcular la nota.");
      return;
    } 

    try {
      const response = await updateIntegranteAutoEvaluacion(editableEstudiante.id, cgmpId, {
        nota: editableEstudiante.nota ?? 0,
        ser: editableEstudiante.ser ?? 0,
        decidir: editableEstudiante.decidir ?? 0,
      });

      handleCloseDetalleModal();
      await Swal.fire({
        title: "Datos actualizados",
        text: response.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      onActualizarEstudiantes();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleCloseDetalleModal();
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleRecalcular = async () => {
    if (!selectedEstudiante) {
      console.log("No hay estudiante seleccionado para recalcular la nota.");
      return;
    }

    try {
      const response = await updateNotaVoletin(selectedEstudiante.id, cgmpId);

      handleCloseRecalcularModal();
      await Swal.fire({
        title: "Nota recalculada",
        text: response.message,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      onActualizarEstudiantes();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleCloseRecalcularModal();
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Alumno</TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">CI</TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Nota</TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Ser</TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Decidir</TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {estudiantes.map((est) => (
                <TableRow key={est.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <TableCell className="text-center text-sm text-gray-800 dark:text-white/90">{est.id}</TableCell>
                  <TableCell className="text-sm text-gray-800 dark:text-white flex items-center justify-center gap-4 py-3">
                    <img
                      src={est.url_profile ? `${Server.CLOUDINARY_URL}/${est.url_profile}` : default_image}
                      alt={`Foto de ${est.nombre}`}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span>{est.nombre}</span>
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-700 dark:text-white/80">{est.ci}</TableCell>
                  <TableCell className="text-center text-sm text-gray-700 dark:text-white/80">{est.nota ?? "-"}</TableCell>
                  <TableCell className="text-center text-sm text-gray-700 dark:text-white/80">{est.ser ?? "-"}</TableCell>
                  <TableCell className="text-center text-sm text-gray-700 dark:text-white/80">{est.decidir ?? "-"}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button title="Ver datos" className="text-blue-500 hover:text-blue-700" onClick={() => handleOpenDetalleModal(est)}>
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button title="Autoevaluación" className="text-indigo-500 hover:text-indigo-700" onClick={() => handleOpenRecalcularModal(est)}>
                        <ClipboardDocumentCheckIcon className="w-5 h-5" />
                      </button>
                      <button title="Ver Boletines" className="text-green-500 hover:text-green-700">
                        <DocumentTextIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={showDetalleModal} onClose={handleCloseDetalleModal} className="max-w-[600px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">Detalle del Estudiante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nota Final</Label>
              <Input value={editableEstudiante?.nota ?? ""} onChange={handleChangeNota} />
            </div>
            <div>
              <Label>CI</Label>
              <Input readonly={true} value={selectedEstudiante?.ci ?? ""} />
            </div>
            <div>
              <Label>Autoevaluación - Ser</Label>
              <Input value={editableEstudiante?.ser ?? ""} onChange={handleChangeSer} />
            </div>
            <div>
              <Label>Autoevaluación - Decidir</Label>
              <Input value={editableEstudiante?.decidir ?? ""} onChange={handleChangeDecidir} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-6">
            <Button size="sm" variant="outline" onClick={handleCloseDetalleModal}>Cerrar</Button>
            <Button size="sm" onClick={handleActualizar}>Actualizar</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRecalcularModal} onClose={handleCloseRecalcularModal} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Recalcular Nota</h2>
          <p className="text-gray-600 dark:text-white">
            ¿Estás seguro de que deseas <strong>recalcular la nota del boletín</strong> del estudiante <strong>{selectedEstudiante?.nombre}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={handleCloseRecalcularModal}>Cancelar</Button>
            <Button size="sm" onClick={handleRecalcular}>Confirmar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EstudianteTable;
