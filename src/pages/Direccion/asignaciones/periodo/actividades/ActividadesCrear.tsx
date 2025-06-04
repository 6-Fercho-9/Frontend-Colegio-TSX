// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// import ComponentCardModified from "../../../../shared/ComponentCardModified";
// import Label from "../../../../../components/form/Label";
// import Input from "../../../../../components/form/input/InputField";
// import Flatpickr from "react-flatpickr";
// import Button from "../../../../../components/ui/button/Button";
// import { CalenderIcon } from "../../../../../icons";
// import "flatpickr/dist/themes/material_blue.css";
// import SelectModified from "../../../../shared/SelectModified";


// import { crearActividad } from "../../../../../services/Aula-Estudiantil/ActividadService";
// import { TipoActividad } from "../../../../../services/interfaces/Aula-Estudiantil/TipoActividad";
// import { getTipoActividades } from "../../../../../services/Aula-Estudiantil/TipoActividadService";

// export default function CrearActividadPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     titulo: "",
//     descripcion: "",
//     valor: 0,
//     fecha_fin: "",
//     tipo_actividad_id: "",
//   });

//   const [tipos, setTipos] = useState<{ label: string; value: string }[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data: TipoActividad[] = await getTipoActividades();
//         const mapped = data.map((t) => ({ label: t.nombre, value: t.id.toString() }));
//         setTipos(mapped);
//       } catch (error) {
//         console.error("Error al obtener tipos de actividad", error);
//         Swal.fire("Error", "No se pudieron cargar los tipos de actividad.", "error");
//       }
//     })();
//   }, []);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleChange = (key: string, value: any) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!form.titulo || !form.descripcion || !form.tipo_actividad_id || !form.fecha_fin) {
//       return Swal.fire("Campos incompletos", "Por favor rellena todos los campos.", "warning");
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         ...form,
//         tipo_actividad_id: parseInt(form.tipo_actividad_id),
//         valor: Number(form.valor),
//       };

//       await crearActividad(Number(id), payload);

//       await Swal.fire("Éxito", "Actividad creada correctamente.", "success");
//       navigate(`/materia-periodo/${id}/actividades`);
//     } catch (error) {
//       console.error("Error al crear la actividad:", error);
//       Swal.fire("Error", "No se pudo registrar la actividad.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ComponentCardModified title="Registrar Nueva Actividad">
//       <div className="space-y-6 px-4 py-6">
//         <div>
//           <Label htmlFor="titulo">Título</Label>
//           <Input
//             id="titulo"
//             type="text"
//             value={form.titulo}
//             onChange={(e) => handleChange("titulo", e.target.value)}
//             placeholder="Ej: Examen parcial"
//           />
//         </div>

//         <div>
//           <Label htmlFor="descripcion">Descripción</Label>
//           <Input
//             id="descripcion"
//             type="text"
//             value={form.descripcion}
//             onChange={(e) => handleChange("descripcion", e.target.value)}
//             placeholder="Breve descripción de la actividad"
//           />
//         </div>

//         <div>
//           <Label htmlFor="valor">Valor (0 a 100)</Label>
//           <Input
//             id="valor"
//             type="number"
//             value={form.valor}
//             onChange={(e) => handleChange("valor", parseInt(e.target.value))}
//           />
//         </div>

//         <div>
//           <Label htmlFor="tipo_actividad_id">Tipo de Actividad</Label>
//           <SelectModified
//             options={tipos}
//             value={form.tipo_actividad_id}
//             onChange={(val) => handleChange("tipo_actividad_id", val)}
//             placeholder="Seleccione tipo de actividad"
//           />
//         </div>

//         <div>
//           <Label>Fecha de Entrega</Label>
//           <div className="relative w-full">
//             <Flatpickr
//               options={{ enableTime: true, dateFormat: "Y-m-d H:i" }}
//               value={form.fecha_fin}
//               onChange={([date]) => handleChange("fecha_fin", date.toISOString())}
//               className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/30 dark:border-gray-700 dark:focus:border-brand-800"
//             />
//             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//               <CalenderIcon className="size-6" />
//             </span>
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <Button onClick={handleSubmit} disabled={loading}>
//             {loading ? "Guardando..." : "Guardar Actividad"}
//           </Button>
//         </div>
//       </div>
//     </ComponentCardModified>
//   );
// }
