// Vista principal: Edición de materia con grid de 2 columnas (Docente a la izquierda, Horarios a la derecha)
import { useEffect, useState } from "react";

import ComponentCardModified from "../../../shared/ComponentCardModified";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";

import Flatpickr from "react-flatpickr";
import Checkbox from "../../../../components/form/input/Checkbox";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { MateriaEditObject } from "../../../../services/interfaces/Personal-Escolar/Curso";
// import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";

interface HorarioItem {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
interface Props{
  data:MateriaEditObject,
  onActualizar: () => void
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CardDocenteMateria({ data, onActualizar }:Props) {
  const [horarios, setHorarios] = useState<HorarioItem[]>(data.horario || []);
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [showEditarHorarioModal, setShowEditarHorarioModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [horarioEditar, setHorarioEditar] = useState<HorarioItem | null>(null);
  const [horarioEliminar, setHorarioEliminar] = useState<HorarioItem | null>(null);


  const [nuevoHorario, setNuevoHorario] = useState<Record<string, { inicio: string; fin: string; checked: boolean }>>({});

  useEffect(() => {
    setHorarios([{ id: 1, dia: "Lunes", hora_inicio: "09:00", hora_fin: "10:00" }]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inicial: Record<string, any> = {};
    diasDisponibles.forEach((dia) => {
      inicial[dia] = { inicio: "07:00", fin: "08:00", checked: false };
    });
    setNuevoHorario(inicial);
  }, []);

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

  const handleEditarHorario = () => {
    if (!horarioEditar) return;
    setHorarios((prev) =>
      prev.map((h) =>
        h.id === horarioEditar.id ? { ...h, hora_inicio: horarioEditar.hora_inicio, hora_fin: horarioEditar.hora_fin } : h
      )
    );
    setShowEditarHorarioModal(false);
  };

   const handleEliminarHorario = () => {
    if (!horarioEliminar) return;
    setHorarios((prev) => prev.filter((h) => h.id !== horarioEliminar.id));
    setShowEliminarModal(false);
  };
  return (
    <>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComponentCardModified title="Docente">
          <div className="flex flex-col items-center gap-4">
            <img src="https://via.placeholder.com/200" className="w-48 h-48 object-cover rounded-xl" />
            <p className="text-white font-semibold">Nombre del Docente</p>
          </div>
        </ComponentCardModified>

        <ComponentCardModified title="Horario">
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
                      <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setHorarioEditar(h);
                              setShowEditarHorarioModal(true);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setHorarioEliminar(h);
                              setShowEliminarModal(true);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCardModified>
      </div>
         {/* <Modal isOpen={showHorarioModal} onClose={() => setShowHorarioModal(false)} className="max-w-[500px] m-4">
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
      </Modal> */}
      {/* Modal Editar */}
           {/* Modal Editar */}
     {/* <Modal isOpen={showEditarHorarioModal} onClose={() => setShowEditarHorarioModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Editar Horario</h2>

            {horarioEditar && (
            <>
                <Label className="mb-2 block text-gray-700 dark:text-white">{horarioEditar.dia}</Label>

                <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className="text-sm text-gray-700 dark:text-white">Hora Inicio</Label>
                    <Flatpickr
                    value={horarioEditar.hora_inicio}
                    onChange={([date]) =>
                        setHorarioEditar((prev) =>
                        prev
                            ? {
                                ...prev,
                                hora_inicio: date.toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                }),
                            }
                            : null
                        )
                    }
                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                    className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                    />
                </div>

                <div>
                    <Label className="text-sm text-gray-700 dark:text-white">Hora Fin</Label>
                    <Flatpickr
                    value={horarioEditar.hora_fin}
                    onChange={([date]) =>
                        setHorarioEditar((prev) =>
                        prev
                            ? {
                                ...prev,
                                hora_fin: date.toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                }),
                            }
                            : null
                        )
                    }
                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                    className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                    />
                </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                <Button variant="outline" onClick={() => setShowEditarHorarioModal(false)}>Cancelar</Button>
                <Button onClick={handleEditarHorario}>Guardar Horario</Button>
                </div>
            </>
            )}
        </div>
        </Modal> */}
      <Modal isOpen={showHorarioModal} onClose={() => setShowHorarioModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Agregar Horarios</h2>
          {diasDisponibles.map((dia) => (
            <div key={dia} className="grid grid-cols-12 items-center gap-3">
              <div className="col-span-1 flex justify-center">
                <Checkbox checked={nuevoHorario[dia]?.checked} onChange={(v) => setNuevoHorario((prev) => ({ ...prev, [dia]: { ...prev[dia], checked: v } }))} />
              </div>
              <div className="col-span-3 text-sm text-gray-800 dark:text-white">{dia}</div>
              <div className="col-span-4">
                <Flatpickr
                  value={nuevoHorario[dia]?.inicio}
                  onChange={([date]) => setNuevoHorario((prev) => ({ ...prev, [dia]: { ...prev[dia], inicio: date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }) } }))}
                  options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                  className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                />
              </div>
              <div className="col-span-4">
                <Flatpickr
                  value={nuevoHorario[dia]?.fin}
                  onChange={([date]) => setNuevoHorario((prev) => ({ ...prev, [dia]: { ...prev[dia], fin: date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }) } }))}
                  options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
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

      <Modal isOpen={showEditarHorarioModal} onClose={() => setShowEditarHorarioModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Editar Horario</h2>
          {horarioEditar && (
            <>
              <Label className="mb-2 block text-gray-700 dark:text-white">{horarioEditar.dia}</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 dark:text-white">Hora Inicio</Label>
                  <Flatpickr
                    value={horarioEditar.hora_inicio}
                    onChange={([date]) => setHorarioEditar((prev) => prev ? { ...prev, hora_inicio: date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }) } : null)}
                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                    className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 dark:text-white">Hora Fin</Label>
                  <Flatpickr
                    value={horarioEditar.hora_fin}
                    onChange={([date]) => setHorarioEditar((prev) => prev ? { ...prev, hora_fin: date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }) } : null)}
                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                    className="h-10 w-full rounded-lg border px-3 py-2 text-sm dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <Button variant="outline" onClick={() => setShowEditarHorarioModal(false)}>Cancelar</Button>
                <Button onClick={handleEditarHorario}>Guardar Horario</Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      <Modal isOpen={showEliminarModal} onClose={() => setShowEliminarModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Eliminar Horario</h2>
          <p className="text-gray-700 dark:text-white mb-4">¿Estás seguro que deseas eliminar este horario?</p>
          <div className="flex justify-end gap-3 pt-6">
            <Button variant="outline" onClick={() => setShowEliminarModal(false)}>Cancelar</Button>
            <Button variant="outline" onClick={handleEliminarHorario}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
