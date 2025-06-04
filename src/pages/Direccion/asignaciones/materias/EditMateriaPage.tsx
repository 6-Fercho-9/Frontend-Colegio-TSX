

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import DropzoneComponent from "../../../../components/form/form-elements/DropZone";
import Swal from "sweetalert2";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";
import SelectModified from "../../../shared/SelectModified";
import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";
import Checkbox from "../../../../components/form/input/Checkbox";
import Flatpickr from "react-flatpickr";

interface HorarioItem {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function EditarMateriaPage() {
  const { id } = useParams();
  const [showImageModal, setShowImageModal] = useState(false);
  const [form, setForm] = useState({
    cantidad_aprobados: 0,
    cantidad_reprobados: 0,
    cantidad_abandono: 0,
    estado: "Habilitado",
    docente: null,
  });
  const [horarios, setHorarios] = useState<HorarioItem[]>([]);
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [nuevoHorario, setNuevoHorario] = useState<Record<string, { inicio: string; fin: string; checked: boolean }>>({});

  useEffect(() => {
    setForm({
      cantidad_aprobados: 10,
      cantidad_reprobados: 2,
      cantidad_abandono: 1,
      estado: "Habilitado",
      docente: null,
    });
    setHorarios([{ id: 1, dia: "Lunes", hora_inicio: "09:00", hora_fin: "10:00" }]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const horariosIniciales: Record<string, any> = {};
    diasDisponibles.forEach(dia => {
      horariosIniciales[dia] = { inicio: "07:00", fin: "08:00", checked: false };
    });
    setNuevoHorario(horariosIniciales);
  }, [id]);

  const handleInputChange = (field: string, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleAgregarHorarios = () => {
    const nuevos: HorarioItem[] = [];
    for (const dia of diasDisponibles) {
      const config = nuevoHorario[dia];
      if (config.checked) {
        nuevos.push({
          id: Date.now() + Math.random(),
          dia,
          hora_inicio: config.inicio,
          hora_fin: config.fin,
        });
      }
    }
    setHorarios((prev) => [...prev, ...nuevos]);
    setShowHorarioModal(false);
  };

  const handleEliminarHorario = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setHorarios((prev) => prev.filter((h) => h.id !== id));
        Swal.fire("Eliminado", "El horario fue eliminado.", "success");
      }
    });
  };

  return (
    <>
      <PageMetaModified title="Editar Materia" subtitle="PRIMERO-A-TARDE GESTIÓN 2-2025" description="Formulario para editar una materia" />
      <PageBreadcrumbModified pageTitle="Editar Materia" subtitle="PRIMERO-A-TARDE GESTIÓN 2-2025" />

      <ComponentCardModified>
        <div className="flex flex-col items-center gap-4">
          <img src={form.docente ? form.docente : "https://via.placeholder.com/200"} alt="Preview" className="w-48 h-48 object-cover rounded-xl" />
          <Button size="sm" onClick={() => setShowImageModal(true)}>Sube tu imagen</Button>
        </div>
      </ComponentCardModified>

      <ComponentCardModified>
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input type="number" value={form.cantidad_reprobados} onChange={(e) => handleInputChange("cantidad_reprobados", parseInt(e.target.value))} />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input type="number" value={form.cantidad_aprobados} onChange={(e) => handleInputChange("cantidad_aprobados", parseInt(e.target.value))} />
            </div>
            <div>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <AutoCompleteCombobox<any> 
              options=
              {[{ id: 1, nombre: "Docente A" }]} 
              onSelect={(docente) => setForm({ ...form, docente })}
               displayValue={(item) => item.nombre} 
               getKey={(item) => item.id} 
               placeholder="Buscar Por nombre" 
               label="Docente" />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input type="number" value={form.cantidad_abandono} onChange={(e) => handleInputChange("cantidad_abandono", parseInt(e.target.value))} />
            </div>
            <div>
              <Label>Estado</Label>
              <SelectModified options={[{ label: "Habilitado", value: "Habilitado" }, { label: "Deshabilitado", value: "Deshabilitado" }]} value={form.estado} onChange={(v) => handleInputChange("estado", v)} />
            </div>
          </div>

          <div className="flex justify-end w-full pt-4">
            <Button onClick={() => Swal.fire("Actualizado", "Los datos fueron actualizados.", "success")}>Actualizar</Button>
          </div>
        </div>
      </ComponentCardModified>

      <ComponentCardModified>
        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-4">
            <Label>Horario</Label>
            <Button size="sm" onClick={() => setShowHorarioModal(true)}>+ Agregar</Button>
          </div>



            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Día</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Hora Inicio</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Hora Fin</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acción</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {horarios.map((h) => (
                            <TableRow key={h.id}>
                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{h.id}</TableCell>
                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{h.dia}</TableCell>
                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{h.hora_inicio}</TableCell>
                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{h.hora_fin}</TableCell>
                                <TableCell>
                                <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => handleEliminarHorario(h.id)}>
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                </div>
            </div>
          
        </div>
      </ComponentCardModified>

      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Subir nueva imagen</h2>
          <DropzoneComponent onUpload={() => setShowImageModal(false)} />
        </div>
      </Modal>

       <Modal isOpen={showHorarioModal} onClose={() => setShowHorarioModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Agregar Horarios</h2>
         

                {diasDisponibles.map((dia) => (
                    <div key={dia} className="grid grid-cols-12 items-center gap-3">
                        <div className="col-span-1 flex justify-center">
                        <Checkbox
                            checked={nuevoHorario[dia]?.checked}
                            onChange={(v) =>
                            setNuevoHorario((prev) => ({
                                ...prev,
                                [dia]: { ...prev[dia], checked: v },
                            }))
                            }
                        />
                        </div>
                        <div className="col-span-3 text-sm text-gray-800 dark:text-white">
                        {dia}
                        </div>
                        <div className="col-span-4">
                        <Flatpickr
                            value={nuevoHorario[dia]?.inicio}
                            onChange={([date]) =>
                            setNuevoHorario((prev) => ({
                                ...prev,
                                [dia]: {
                                ...prev[dia],
                                inicio: date.toLocaleTimeString("es-ES", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }),
                                },
                            }))
                            }
                            options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true,
                            }}
                            className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                        />
                        </div>
                        <div className="col-span-4">
                        <Flatpickr
                            value={nuevoHorario[dia]?.fin}
                            onChange={([date]) =>
                            setNuevoHorario((prev) => ({
                                ...prev,
                                [dia]: {
                                ...prev[dia],
                                fin: date.toLocaleTimeString("es-ES", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                }),
                                },
                            }))
                            }
                            options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true,
                            }}
                            className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                        />
                        </div>
                    </div>
                    ))}

          <div className="flex justify-end gap-3 pt-6">
            <Button variant="outline" onClick={() => setShowHorarioModal(false)}>Cancelar</Button>
            <Button onClick={handleAgregarHorarios}>Guardar Horario</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
