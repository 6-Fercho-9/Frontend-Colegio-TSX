
import { useState, useEffect } from "react";
import ComponentCardModified from "../../../../shared/ComponentCardModified";
import Input from "../../../../../components/form/input/InputField";
import Label from "../../../../../components/form/Label";
import Button from "../../../../../components/ui/button/Button";
import SelectModified from "../../../../shared/SelectModified";
import { Modal } from "../../../../../components/ui/modal";
import DropzoneComponent from "../../../../../components/form/form-elements/DropZone";
import AutoCompleteCombobox from "../../../../shared/AutoCompleteCombobox";

import Flatpickr from "react-flatpickr";
import Checkbox from "../../../../../components/form/input/Checkbox";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../../components/ui/table";
import PageMetaModified from "../../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../../shared/PageBreadcrumbModified";
import NavigationTabs from "../../../../shared/NavegationBar";
import { useParams } from "react-router";


interface DocenteAsignacion {
  id: number;
  nombre: string;
}
interface HorarioItem {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function InformacionPage() {
  const docentes: DocenteAsignacion[] = [
    { id: 1, nombre: "María Pérez" },
    { id: 2, nombre: "Carlos Rojas" },
    { id: 3, nombre: "Elena Gómez" },
  ];

  const {id} = useParams();
  const [form, setForm] = useState({
    cantidad_aprobados: "10",
    cantidad_reprobados: "2",
    cantidad_abandono: "1",
    estado: "Habilitado",
  });

  const [formCopia, setFormCopia] = useState({ ...form });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [docenteSeleccionado, setDocenteSeleccionado] = useState<DocenteAsignacion | null>(docentes[0]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);

  const handleActualizar = () => {
    setFormCopia({ ...form });
    setShowEditModal(true);
  };

  const handleConfirmar = () => {
    setForm({ ...formCopia });
    setShowEditModal(false);
  };

  const handleFormCopiaChange = (field: string, value: string) => {
    setFormCopia({ ...formCopia, [field]: value });
  };

  const handleUploadImage = async (file: File) => {
    const url = URL.createObjectURL(file);
    console.log("Imagen simulada subida:", url);
    setShowImageModal(false);
  };

  useEffect(() => {
    const valid = (v: string) => !isNaN(Number(v)) && Number(v) >= 0;
    setFormIsValid(
      valid(formCopia.cantidad_aprobados) &&
      valid(formCopia.cantidad_reprobados) &&
      valid(formCopia.cantidad_abandono)
    );
  }, [formCopia]);





  ///para horarios


  const [horarios, setHorarios] = useState<HorarioItem[]>([
    { id: 1, dia: "Lunes", hora_inicio: "09:00", hora_fin: "10:00" }
  ]);
  const [nuevoHorario, setNuevoHorario] = useState<Record<string, { inicio: string; fin: string; checked: boolean }>>({});
  const [showHorarioModal, setShowHorarioModal] = useState(false);
  const [showEditarHorarioModal, setShowEditarHorarioModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [horarioEditar, setHorarioEditar] = useState<HorarioItem | null>(null);
  const [horarioEliminar, setHorarioEliminar] = useState<HorarioItem | null>(null);

    useEffect(() => {
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


  // para el detalle 

  const [formDetalle, setFormDetalle] = useState({
    cantidad_clases: "40",
    cantidad_examenes: "2",
    cantidad_tareas: "6",
    cantidad_practicos: "4",
    cantidad_exposiciones: "2",
    estado: "Habilitado",
  });
  const [formDetalleCopia, setFormDetalleCopia] = useState({ ...formDetalle });
  const [showEditDetalleModal, setShowEditDetalleModal] = useState(false);

  const handleActualizarDetalle = () => {
    setFormDetalleCopia({ ...formDetalle });
    setShowEditDetalleModal(true);
  };

  const handleConfirmarDetalle = () => {
    setFormDetalle({ ...formDetalleCopia });
    setShowEditDetalleModal(false);
  };

  const handleFormDetalleChange = (field: string, value: string) => {
    setFormDetalleCopia({ ...formDetalleCopia, [field]: value });
  };
  //items

   const resolvedNavItems = [
    { label: "Principal", path: "/asignacion-cursos" },
    { label: "Curso", path: `/curso-gestion/:id` },
    { label: "Materias", path: `/curso-gestion/:id/materias` },
    { label: "Periodos", path: `/materia/:id/periodos` }, 
    { label: "Informacion", path: `/materia-periodo/${id}/info` }, 
    { label: "Inscripción", path: `/curso-gestion/:id}/inscripcion` },
    { label: "Integrantes", path: `/curso-gestion/:id}/integrantes` },
  ];
  return (
    <>
      <PageMetaModified
        title="Gestión de Materia"
        subtitle={`subtitule`}
        description="Vista general para editar datos de la materia y gestionar horarios y docente"
      />

      <PageBreadcrumbModified
        pageTitle="Gestión de Materia"
        subtitle={ `subtitule`}
      />
       <NavigationTabs
              items={resolvedNavItems}
              className="mb-4"
              activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
              defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagen */}
        <ComponentCardModified>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400 mb-4">ICONO DE MATERIA</h3>
            <img
              src="https://www.google.com/search?q=background+green&client=ubuntu-sn&hs=GAY&sca_esv=fd5281d190bdab12&channel=fs&udm=2&biw=1536&bih=752&sxsrf=AE3TifO8GTmGWRSTq7gMvw3EK_xsOOYlRA%3A1748804980361&ei=dKU8aLrkFYKo5OUPi7-A0QE&ved=0ahUKEwi67oqd9tCNAxUCFLkGHYsfIBoQ4dUDCBE&uact=5&oq=background+green&gs_lp=EgNpbWciEGJhY2tncm91bmQgZ3JlZW4yBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESLQZUMYTWKUXcAF4AJABAJgBa6ABigSqAQMwLjW4AQPIAQD4AQGYAgagArsEwgIHECMYJxjJAsICBhAAGAcYHpgDAIgGAZIHAzEuNaAHwxmyBwMwLjW4B68EwgcFMi01LjHIByk&sclient=img#vhid=6OBOD6Ga2wndfM&vssid=mosaic"
              alt="Imagen Curso"
              className="w-64 h-64 object-cover rounded-xl"
            />
            <Button size="sm" className="mt-4" onClick={() => setShowImageModal(true)}>
              Sube tu imagen
            </Button>
          </div>
        </ComponentCardModified>

        {/* Datos */}
        <ComponentCardModified title="Datos de la Materia">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input type="number" value={form.cantidad_reprobados} readonly />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input type="number" value={form.cantidad_aprobados} readonly />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input type="number" value={form.cantidad_abandono} readonly />
            </div>
            <div>
              <Label>Estado</Label>
              <SelectModified
                options={[
                  { label: "Habilitado", value: "Habilitado" },
                  { label: "Deshabilitado", value: "Deshabilitado" },
                ]}
                value={form.estado}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleActualizar}>Actualizar</Button>
          </div>
        </ComponentCardModified>

        {/* Detalle de la Materia */}
        <ComponentCardModified title="Detalle Académico">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Cantidad de Clases</Label>
              <Input type="number" value={formDetalle.cantidad_clases} readonly />
            </div>
            <div>
              <Label>Cantidad de Exámenes</Label>
              <Input type="number" value={formDetalle.cantidad_examenes} readonly />
            </div>
            <div>
              <Label>Cantidad de Tareas</Label>
              <Input type="number" value={formDetalle.cantidad_tareas} readonly />
            </div>
            <div>
              <Label>Cantidad de Prácticos</Label>
              <Input type="number" value={formDetalle.cantidad_practicos} readonly />
            </div>
            <div>
              <Label>Cantidad de Exposiciones</Label>
              <Input type="number" value={formDetalle.cantidad_exposiciones} readonly />
            </div>
             <div>
              <Label>Estado</Label>
              <SelectModified
                options={[
                  { label: "Habilitado", value: "Habilitado" },
                  { label: "Deshabilitado", value: "Deshabilitado" },
                ]}
                value={formDetalle.estado}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleActualizarDetalle}>Actualizar</Button>
          </div>
        </ComponentCardModified>
        <ComponentCardModified title="Docente">
          <div className="flex flex-col items-center gap-4">
            <img src="https://photomedia.in/wp-content/uploads/2021/05/dark-green-background-1024x576.jpg" className="w-48 h-48 object-cover rounded-xl" />
            <p className="text-white font-semibold">{docenteSeleccionado?.nombre ?? "Sin docente asignado"}</p>
          </div>
        </ComponentCardModified>

      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* DOCENTE */}

      {/* HORARIOS */}
      <ComponentCardModified title="Horario">
  <div className="flex justify-between items-center mb-4">
    <Label>Horario</Label>
    <Button size="sm" onClick={() => setShowHorarioModal(true)}>+ Agregar</Button>
  </div>

      `  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-center text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-center text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Día
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-center text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Hora Inicio
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-center text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Hora Fin
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-center text-theme-xs text-gray-500 dark:text-gray-400"
                  >
                    Acción
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {horarios.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-800 dark:text-white">
                      {h.id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-800 dark:text-white">
                      {h.dia}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-800 dark:text-white">
                      {h.hora_inicio}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-800 dark:text-white">
                      {h.hora_fin}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-800 dark:text-white">
                      <div className="flex justify-center gap-2">
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
`
    </div>








      {/* Modal de edición */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[600px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Editar datos de la materia</h2>

          {/* Cambiado a grid de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input
                type="number"
                value={formCopia.cantidad_reprobados}
                onChange={(e) => handleFormCopiaChange("cantidad_reprobados", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input
                type="number"
                value={formCopia.cantidad_aprobados}
                onChange={(e) => handleFormCopiaChange("cantidad_aprobados", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input
                type="number"
                value={formCopia.cantidad_abandono}
                onChange={(e) => handleFormCopiaChange("cantidad_abandono", e.target.value)}
              />
            </div>
            <div>
              <Label>Estado</Label>
              <SelectModified
                options={[
                  { label: "Habilitado", value: "Habilitado" },
                  { label: "Deshabilitado", value: "Deshabilitado" },
                ]}
                value={formCopia.estado}
                onChange={(v) => handleFormCopiaChange("estado", v)}
              />
            </div>
          </div>

          {/* Docente en fila completa */}
          <div className="mt-4">
            <Label>Docente</Label>
            <AutoCompleteCombobox<DocenteAsignacion>
              options={docentes}
              displayValue={(item) => item.nombre}
              getKey={(item) => item.id}
              placeholder="Selecciona un docente"
              onSelect={setDocenteSeleccionado}
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowEditModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleConfirmar} disabled={!formIsValid}>Confirmar</Button>
          </div>
        </div>
      </Modal>


      {/* Modal de Imagen */}
      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Subir nueva imagen</h2>
          <DropzoneComponent onUpload={handleUploadImage} />
        </div>
      </Modal>


      {/* modales para horarios */}
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



      {/* modal para el detalle */}
      <Modal isOpen={showEditDetalleModal} onClose={() => setShowEditDetalleModal(false)} className="max-w-[600px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Editar Detalle Académico</h2>

          {/* Ahora con grid de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Cantidad de Clases</Label>
              <Input
                type="number"
                value={formDetalleCopia.cantidad_clases}
                onChange={(e) => handleFormDetalleChange("cantidad_clases", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad de Exámenes</Label>
              <Input
                type="number"
                value={formDetalleCopia.cantidad_examenes}
                onChange={(e) => handleFormDetalleChange("cantidad_examenes", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad de Tareas</Label>
              <Input
                type="number"
                value={formDetalleCopia.cantidad_tareas}
                onChange={(e) => handleFormDetalleChange("cantidad_tareas", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad de Prácticos</Label>
              <Input
                type="number"
                value={formDetalleCopia.cantidad_practicos}
                onChange={(e) => handleFormDetalleChange("cantidad_practicos", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad de Exposiciones</Label>
              <Input
                type="number"
                value={formDetalleCopia.cantidad_exposiciones}
                onChange={(e) => handleFormDetalleChange("cantidad_exposiciones", e.target.value)}
              />
            </div>
            <div>
              <Label>Estado</Label>
              <SelectModified
                options={[
                  { label: "Habilitado", value: "Habilitado" },
                  { label: "Deshabilitado", value: "Deshabilitado" },
                ]}
                value={formDetalle.estado}
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowEditDetalleModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleConfirmarDetalle}>Confirmar</Button>
          </div>
        </div>
      </Modal>


    </>
  );
}
