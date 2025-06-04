import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import Swal from "sweetalert2";

import {
  deleteProduct,
  getPaginatedListProduct,
} from "../../services/Gestion_de_Productos/productoService";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import { ProductoResponseTableBackend } from "../../services/interfaces/producto";

const TableProducto = () => {
  const [productos, setProductos] = useState<ProductoResponseTableBackend[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoResponseTableBackend | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getPaginatedListProduct(currentPage);
        setProductos(data.items);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error("Error al obtener productos paginados", error);
      }
    };

    fetchProductos();
  }, [currentPage]);

  const openDeleteModal = (producto: ProductoResponseTableBackend) => {
    setProductoSeleccionado(producto);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productoSeleccionado) return;
    try {
      await deleteProduct(productoSeleccionado.id);
      setProductos((prev) => prev.filter((p) => p.id !== productoSeleccionado.id));
      setShowDeleteModal(false);
      Swal.fire("Eliminado", "El producto fue eliminado con éxito", "success");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/productos/${id}/edit`);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Color</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Stock</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Precio</TableCell>
                
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Creado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Actualizado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-sm text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{producto.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{producto.modelo.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{producto.caracteristica.color}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{producto.stock}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">Bs {producto.precio}</TableCell>
                  
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{producto.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{producto.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                        onClick={() => handleEdit(producto.id)}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                        onClick={() => openDeleteModal(producto)}
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
        <div className="p-4">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>

      {/* Modal de eliminación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el producto <span className="font-bold">{productoSeleccionado?.modelo.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableProducto;

