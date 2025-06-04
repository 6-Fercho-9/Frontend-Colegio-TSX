import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableRol from "./TableRol";
import TablePermiso from "./TablePermiso";
import Button from "../../components/ui/button/Button";
import ComponentCardModified from "./ComponentCardModified";
import { useState } from "react";
import { Modal } from "../../components/ui/modal";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Swal from "sweetalert2"
import { createRol } from "../../services/Gestion_de_usuario/rolService";
import { createPermiso } from "../../services/Gestion_de_usuario/permisoService";
export const RolPermisoPage = () => {
  const [showCreateRolModal, setShowCreateRolModal] = useState(false);
  const [showCreatePermisoModal, setShowCreatePermisoModal] = useState(false);

  const [rolNombre, setRolNombre] = useState("");
  const [permisoNombre, setPermisoNombre] = useState("");

  const [reloadRoles, setReloadRoles] = useState(false);
  const [reloadPermisos, setReloadPermisos] = useState(false);

  const handleCrearRol = async () => {
  try {
      const data = await createRol(rolNombre);
      setRolNombre("");
      setShowCreateRolModal(false);
      setReloadRoles(prev => !prev);

      Swal.fire({
        icon: 'success',
        title: 'Rol creado',
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
       setShowCreatePermisoModal(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el rol.',
      });
      console.error("Error al crear rol:", error);
    }
  };

  const handleCrearPermiso = async () => {
    try {
      const data = await createPermiso(permisoNombre);
      setPermisoNombre("");
      setShowCreatePermisoModal(false);
      setReloadPermisos(prev => !prev);

      Swal.fire({
        icon: 'success',
        title: 'Permiso creado',
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el permiso.',
      });
       setShowCreatePermisoModal(false)
      console.error("Error al crear permiso:", error);
    }
  };

  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Roles y Permisos"
        description="Esta es la pagina de Roles y permisos"
      />
    <PageBreadcrumb pageTitle="Roles y Permisos" />
      {/* esto es donde dinde Basic Tables o un header  */}
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
          <ComponentCardModified
            title="Roles"
            action={
               <Button onClick={() => setShowCreateRolModal(true)}>
                 + Agregar
              </Button>
            }
            >
            <TableRol reloadTrigger={reloadRoles} onDeleted={() => setReloadRoles(prev => !prev)}/>

          </ComponentCardModified>
            {/* crea la tabla ya con todos los datos */}
          
          <ComponentCardModified title="Permisos"
            action={
              <Button onClick={() => setShowCreatePermisoModal(true)}>
                + Agregar
              </Button>
            }
          >
        
            <TablePermiso key={reloadPermisos ? "reload-permisos-1" : "reload-permisos-2"} />
          </ComponentCardModified>
            
            {/* Modal para crear Rol */}
        <Modal isOpen={showCreateRolModal} onClose={() => setShowCreateRolModal(false)} className="max-w-[500px] m-4">
          <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nuevo Rol</h2>
            <div className="space-y-4">
              
              <Label>Nombre del Rol</Label>
              <Input
                value={rolNombre}
                onChange={(e) => setRolNombre(e.target.value)}
                placeholder="Ej. Administrador"
              />
              <div className="flex justify-end gap-3 pt-4">
                <Button size="sm" variant="outline" onClick={() => setShowCreateRolModal(false)}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleCrearRol}>
                  Crear Rol
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal para crear Permiso */}
        <Modal isOpen={showCreatePermisoModal} onClose={() => setShowCreatePermisoModal(false)} className="max-w-[500px] m-4">
          <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nuevo Permiso</h2>
            <div className="space-y-4">
              <Label>Nombre del Permiso</Label>
              <Input
                value={permisoNombre}
                onChange={(e) => setPermisoNombre(e.target.value)}
                placeholder="Ej. editar_configuracion"
              />
              <div className="flex justify-end gap-3 pt-4">
                <Button size="sm" variant="outline" onClick={() => setShowCreatePermisoModal(false)}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleCrearPermiso}>
                  Crear Permiso
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      
      </div>
    </>
  );
}




