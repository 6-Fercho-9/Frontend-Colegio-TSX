import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  getPaginatedCategorias,
  updateCategoria,
  deleteCategoria,
} from "../../services/Gestion_de_Productos/categoriaService";
import { Categoria } from "../../services/interfaces/categoria";
import Swal from "sweetalert2";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface TableCategoriaProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const TableCategoria = ({ reloadTrigger, onDeleted }: TableCategoriaProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [categoriaEditNombre, setCategoriaEditNombre] = useState("");

  const fetchCategorias = async () => {
    try {
      const data = await getPaginatedCategorias(currentPage);
      setCategorias(data.items);
      setTotalPages(data.meta.total_pages);
    } catch (error) {
      console.error("Error al obtener categorías paginadas", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [currentPage, reloadTrigger]);

  const openEditModal = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setCategoriaEditNombre(categoria.nombre);
    setShowEditModal(true);
  };

  const openDeleteModal = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setShowDeleteModal(true);
  };

  const handleEdit = async () => {
    if (!selectedCategoria) return;

    try {
      const data = await updateCategoria(selectedCategoria.id, categoriaEditNombre);
      Swal.fire({
              title: "Categoria actualizada",
              text: data.message,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo actualizar la categoría", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedCategoria) return;

    try {
      const data = await deleteCategoria(selectedCategoria.id);
      Swal.fire("Categoría eliminada", data.message, "success");
      setShowDeleteModal(false);

      const updatedData = await getPaginatedCategorias(currentPage);
      if (updatedData.items.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setCategorias(updatedData.items);
        setTotalPages(updatedData.meta.total_pages);
      }

      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo eliminar la categoría", "error");
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Última actualización</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {categorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{categoria.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{categoria.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{categoria.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{categoria.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(categoria)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(categoria)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>

      {/* Modal Edición */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Editar Categoría</h2>
          <Label>Nombre</Label>
          <Input
            value={categoriaEditNombre}
            onChange={(e) => setCategoriaEditNombre(e.target.value)}
            placeholder="Nombre de la categoría"
          />
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowEditModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleEdit}>Guardar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Eliminación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Confirmar eliminación</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar la categoría <span className="font-bold">{selectedCategoria?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableCategoria;

