import { useState } from "react";
import Swal from "sweetalert2";
import { SimpleCursoGestionMateria } from "../../../../services/interfaces/Personal-Escolar/Curso";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../../components/ui/table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Badge from "../../../../components/ui/badge/Badge";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";

interface Props {
  data: SimpleCursoGestionMateria[];
  onDeleted: (id: number) => void;
}

export default function MateriaAsignadaTable({ data, onDeleted }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materiaToDelete, setMateriaToDelete] = useState<SimpleCursoGestionMateria | null>(null);

  const estadoBadge = (estado: string) => {
    switch (estado) {
      case "Habilitado":
        return <Badge variant="light" color="success">Habilitado</Badge>;
      case "Deshabilitado":
        return <Badge variant="light" color="error">Deshabilitado</Badge>;
      case "Libre":
        return <Badge variant="light" color="warning">Libre</Badge>;
      default:
        return <Badge variant="light" color="info">Desconocido</Badge>;
    }
  };

  const openDeleteModal = (item: SimpleCursoGestionMateria) => {
    setMateriaToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmarEliminacion = () => {
    if (!materiaToDelete) return;
    onDeleted(materiaToDelete.id);
    setShowDeleteModal(false);
    setMateriaToDelete(null);
    Swal.fire("Eliminado", "La materia ha sido eliminada.", "success");
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Materia</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Estado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.materia.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{estadoBadge(item.estado)}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                        onClick={() => openDeleteModal(item)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar la materia <span className="font-bold">{materiaToDelete?.materia.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={confirmarEliminacion}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
