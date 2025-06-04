import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";

import Swal from "sweetalert2";

import { asignarPermisosToRol, getRol } from "../../services/Gestion_de_usuario/rolService";
// import { getAllPermisos, assignPermisoToRol } from "../../services/Gestion_de_usuario/permisoService";
// import { Permiso, Rol } from "../../services/interfaces/usuarios";

import SelectModified from "./SelectModified";
import ComponentCardModified from "./ComponentCardModified";
import { Permiso, Rol } from "../../services/interfaces/usuarios";
import { getListPermisos } from "../../services/Gestion_de_usuario/permisoService";
import { PermisosDelRolTable } from "./PermisosDelRolTable";


export const PermisoAsignacionPage = () => {
  const { id } = useParams();
  const [rolNombre, setRolNombre] = useState("");
  const [rol,setRol] = useState<Rol | null>(null);
//   const [permisosAsignados, setPermisosAsignados] = useState<Permiso[]>([]);
  const [todosPermisos, setTodosPermisos] = useState<Permiso[]>([]);
  const [permisoSeleccionado, setPermisoSeleccionado] = useState<string>("");

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  


   const ejecutarSwalBien = (title:string,text:string):void => {
       Swal.fire({title,
                       text, 
                       icon:"success",
                       timer:2000,
                       showConfirmButton: false,
                      });
                      
   }
   const ejecutarSwalMal = (title:string,text:string):void => {
      Swal.fire({title,
                       text, 
                       icon:"error",
                       showConfirmButton: true,
                      });
   }
  useEffect(() => {
    const fetchRol = async () => {
      if (id) {
        try {
          const data = await getRol(Number(id));
          setRolNombre(data.rol?.nombre || "");
          setRol(data.rol || null)
        //   setPermisosAsignados(data.rol?.permisos || []);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          setShowAssignModal(false)
          console.error("Error al obtener el rol", error);
          ejecutarSwalMal("Rol No encontrado",error.message?? "Hubo errores al obtener el rol")
        }
      }
    };
    fetchRol();
  
  }, [id, reloadTrigger]);

   useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const data = await getListPermisos();
        setTodosPermisos(data);
      } catch (error) {
        console.error("Error al cargar permisos disponibles", error);
      }
    };

    fetchPermisos(); // Se llama una sola vez al montar el componente
  }, []);
 

  const handleAsignarPermiso = async () => {
    if (!permisoSeleccionado || !id) return;
    try {
        //los 2 son id
      const data = await asignarPermisosToRol(Number(id), Number(permisoSeleccionado));
      setShowAssignModal(false);
      setPermisoSeleccionado("");
      setReloadTrigger(prev => !prev);
      ejecutarSwalBien("Éxito", data.message?? "Exito");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any){
      setShowAssignModal(false);
      ejecutarSwalMal("Error", error.message?? "Hubo errores..");
      console.error(error)
    }
  };



  
  return (
    <>
      <PageMeta
        title={`Permisos - ${rolNombre}`}
        description={`Gestión de permisos del rol ${rolNombre}`}
      />
      <PageBreadcrumb pageTitle={`Asignaciones`} />

      <div className="space-y-6">
        <ComponentCardModified
          title={`Permisos de ${rolNombre}`}
          action={
            <Button onClick={() => setShowAssignModal(true)}>
              + Asignar 
            </Button>
          }
        >
          {/* Aquí luego irá tu tabla con permisos asignados */}
          <PermisosDelRolTable  permisos={rol?.permisos ?? []}
                                rolId={Number(id)}
                                onPermisoEliminado={() => setReloadTrigger(prev => !prev)}/>
        </ComponentCardModified>
      </div>

      {/* Modal para asignar nuevo permiso */}
      <Modal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Asignar nuevo permiso
          </h2>
          <div className="space-y-4">
            <div>
              <Label>Selecciona un permiso</Label>
              <SelectModified
                options={todosPermisos.map((p) => ({
                  value: p.id.toString(),
                  label: p.nombre,
                }))}
                value={permisoSeleccionado}
                onChange={setPermisoSeleccionado}
                placeholder="Selecciona un permiso"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" onClick={handleAsignarPermiso}>
                Asignar Permiso
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
