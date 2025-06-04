import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { getListCategoria} from "../../../services/Personal-Academico/CategoriaService";
import { useHasRole } from "../../hooks/useRol";
import SelectModified from "../../shared/SelectModified";
import { categoria } from "../../../services/interfaces/CategoriaMateria";

interface CategoriaTableProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const CategoriaTable = ({ reloadTrigger, onDeleted }: CategoriaTableProps) => {
  const [categorias, setCategorias] = useState<categoria[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<categoria | null>(null);
  // const [materiasDisponibles, setMateriasDisponibles] = useState<materia[]>([]);
  const [editNombre, setEditNombre] = useState("");
  const [editEstado,setEditEstado] = useState("");

  const fetchCategorias = async () => {
    try {
      const data = await getListCategoria();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener Categorias paginadas", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [ reloadTrigger]);

  
  const openViewModal = (categoria: categoria) => {
    setSelectedCategoria(categoria);
    setEditNombre(categoria.nombre);
    setShowViewModal(true);
  };

  const openEditModal = (categoria: categoria) => {
    setSelectedCategoria(categoria);
    setEditNombre(categoria.nombre);
    setShowEditModal(true);
  };

  const openDeleteModal = (categoria: categoria) => {
    setSelectedCategoria(categoria);
    setShowDeleteModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedCategoria) return;
    try {
      // const data = await updateCategoria(selectedCategoria.id, editNombre,editEstado);
      Swal.fire({
        title: "Categoria actualizada",
        // text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      fetchCategorias();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowEditModal(false);
      Swal.fire("Error", error.message || "No se pudo actualizar la Categoria", "error");
    }
  };

  const esAdmin = useHasRole(["ADMINISTRADOR"]);

  const handleDelete = async () => {
    if (!selectedCategoria) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
     // const data = await deleteCategoria(selectedCategoria.id);
      // Swal.fire("Categoria eliminada", data.message, "success");
      setShowDeleteModal(false);
      fetchCategorias();
      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setShowDeleteModal(false);
      Swal.fire("Error", error.message || "No se pudo eliminar la Categoria", "error");
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
              {categorias.map((categoria : categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{categoria.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{categoria.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{categoria.estado}</TableCell>
                  
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openViewModal(categoria)}>
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(categoria)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      {esAdmin && (<button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(categoria)}>
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

      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} className="max-w-[500px] m-4">
      <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Materias de {selectedCategoria?.nombre}</h2>

        <ul className="mb-4 list-disc pl-5 text-sm text-gray-700 dark:text-gray-200">
          {selectedCategoria?.materias?.map((m) => (
            <li key={m.id}>{m.nombre}</li>
          ))}
        </ul>

        <div className="flex justify-end gap-3 pt-6">
          <Button size="sm" variant="outline" onClick={() => setShowViewModal(false)}>Cerrar</Button>
        </div>
      </div>
      </Modal>
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
            ¿Estás seguro de que deseas eliminar la categoria <span className="font-bold">{selectedCategoria?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoriaTable;
