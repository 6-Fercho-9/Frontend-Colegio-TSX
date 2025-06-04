import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Swal from "sweetalert2";
import { eliminarPermisosToRol } from "../../services/Gestion_de_usuario/rolService";
import { Permiso } from "../../services/interfaces/usuarios";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { useState } from "react";


interface Props {
  permisos: Permiso[];
  rolId: number;
  onPermisoEliminado: () => void;
}

export const PermisosDelRolTable = ({
  permisos,
  rolId,
  onPermisoEliminado
}: Props) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
      const [permisoAEliminar, setPermisoAEliminar] = useState<Permiso | null>(null);



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
  const handleEliminar = async () => {
      if (!permisoAEliminar) return;
    try {
      const data = await eliminarPermisosToRol(rolId, permisoAEliminar.id);
      setShowConfirmModal(false)
      onPermisoEliminado(); // Para que el padre recargue el rol actualizado
      ejecutarSwalBien("Eliminado",data.message?? "Exito")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error(error);
      
    ejecutarSwalMal("Error",error.message??"Hubo un error al eliminar..")
    }
  };

   const confirmarEliminar = (permiso: Permiso) => {
    setPermisoAEliminar(permiso);
    setShowConfirmModal(true);
  };
  return (
    <>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
            <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-theme-xs text-gray-500 text-start dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-theme-xs text-gray-500 text-start dark:text-gray-400">Nombre</TableCell>
                
                <TableCell isHeader className="px-5 py-3 font-medium text-theme-xs text-gray-500 text-start dark:text-gray-400">Acción</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {permisos.map((permiso) => (
                <TableRow key={permiso.id}>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white">{permiso.id}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white">{permiso.nombre}</TableCell>
            
                    <TableCell className="px-5 py-4 text-start">
                    
                    <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => confirmarEliminar(permiso)}>
                            <TrashIcon className="h-5 w-5" />
                    </button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
        </div>
        {/* Modal de confirmación */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="max-w-[400px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar la asignación del permiso <strong>{permisoAEliminar?.nombre}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleEliminar}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
