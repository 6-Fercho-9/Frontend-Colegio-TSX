// export default CursoTable;

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { Modal } from "../../../components/ui/modal";
import Swal from "sweetalert2";
import Button from "../../../components/ui/button/Button";
import Pagination from "../../pagination/PaginacionT";
import Badge from "../../../components/ui/badge/Badge";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { getListCursos, updateCurso, deleteCurso } from "../../../services/Personal-Academico/CursoService";
import { Curso } from "../../../services/interfaces/Personal-Escolar/Curso";
import { useHasRole } from "../../hooks/useRol";
import SelectModified from "../../shared/SelectModified";

interface TableCursoProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const CursoTable = ({ reloadTrigger, onDeleted }: TableCursoProps) => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editTurno, setEditTurno] = useState("");
  const [editGrado, setEditGrado] = useState("");
  const [editEstado,setEditEstado] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const esAdmin = useHasRole(["ADMINISTRADOR"]);

  const fetchCursos = async () => {
    try {
      const data = await getListCursos(currentPage);
      setCursos(data.items);
      setTotalPages(data.meta.total_pages);
    } catch (error) {
      console.error("Error al obtener cursos paginados", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, [currentPage, reloadTrigger]);

  const handleDeleteCurso = async () => {
    if (!cursoSeleccionado) return;
    try {
      const data = await deleteCurso(cursoSeleccionado.id);
      Swal.fire({
        title: "Eliminado",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowDeleteModal(false);
      setCursoSeleccionado(null);
      fetchCursos();
      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setShowDeleteModal(false);
      Swal.fire("Error", "No se pudo eliminar el curso", "error");
    }
  };

  const handleUpdateCurso = async () => {
    if (!cursoSeleccionado) return;
    try {
      const data = await updateCurso(cursoSeleccionado.id, editNombre, editTurno,editEstado,+ editGrado);
      
      Swal.fire({
        title: "Actualizado",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      fetchCursos();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setShowEditModal(false);
      Swal.fire("Error", "No se pudo actualizar el curso", "error");
    }
  };

  const openDeleteModal = (curso: Curso) => {
    setCursoSeleccionado(curso);
    setShowDeleteModal(true);
  };

  const openEditModal = (curso: Curso) => {
    setCursoSeleccionado(curso);
    setEditNombre(curso.nombre);
    setEditTurno(curso.turno);
    setEditEstado(curso.estado);
    setEditGrado(curso.grado.toString());
    setShowEditModal(true);
  };

  const estadoBadge = (estado: string) => (
    <Badge variant="light" color={estado === "Habilitado" ? "success" : "error"}>{estado}</Badge>
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Turno</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Grado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Última actualización</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Estado</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {cursos.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{curso.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{curso.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{curso.turno}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{curso.grado}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{curso.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{curso.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">{estadoBadge(curso.estado)}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(curso)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      {esAdmin && (
                        <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(curso)}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
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

      {/* Modal de edición */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Editar Curso</h2>
          <Label>Nombre</Label>
          <Input value={editNombre} onChange={(e) => setEditNombre(e.target.value)} placeholder="Nombre del curso" />
          <Label className="mt-4">Turno</Label>

          <Input value={editTurno} onChange={(e) => setEditTurno(e.target.value)} placeholder="Turno (ej. Mañana, Tarde)" />
          <Label className="mt-4">Grado</Label>
          <Input type="number" value={editGrado} onChange={(e) => setEditGrado(e.target.value)} placeholder="Grado (ej. 1, 2)" />
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
            <Button size="sm" onClick={handleUpdateCurso}>Guardar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal de eliminación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Confirmar eliminación</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el curso <span className="font-bold">{cursoSeleccionado?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDeleteCurso}>Eliminar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CursoTable;
