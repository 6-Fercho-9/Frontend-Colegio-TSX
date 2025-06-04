// import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
// import Input from "../../components/form/input/InputField";
// import { Modal } from "../../components/ui/modal";
import ComponentCardModified from "./ComponentCardModified";
import UsuarioTable from "./UsuarioTable";
// import Label from "../../components/form/Label";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { adminDeleteUserMethod, getAlumnosByCurso, getPaginatedListUsers } from "../../services/Gestion_de_usuario/usuarioService";
import { useNavigate } from "react-router";
import { AlumnoPaginado } from "../../services/interfaces/Alumno";

export const EstudiantesPorCursoPage = ( {cursoGestion} : {cursoGestion: number}) => {

  const [Alumnos, setAlumnos] = useState<AlumnoPaginado[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleNavigate = () => {
    navigate('/registrar-usuario')
  }

  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getAlumnosByCurso(cursoGestion);
        if (Array.isArray(data)) {
          setAlumnos(data);
        } else {
          setAlumnos([]);
  console.warn("La respuesta no es un arreglo de alumnos:", data);
}
      } catch (error) {
        console.error("Error al obtener alumnos paginados", error);
      }
    };

    fetchUsuarios();
  }, [currentPage]);


  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Ci</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Correo</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">RUDE</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Edad</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">Sexo</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Alumnos.map((AlumnoPaginado) => (
                <TableRow key={AlumnoPaginado.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{AlumnoPaginado.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{AlumnoPaginado.ci}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{AlumnoPaginado.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{AlumnoPaginado.email}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{AlumnoPaginado.rude}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{AlumnoPaginado.edad}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{AlumnoPaginado.sexo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* <div className="p-4">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div> */}
      </div>
    </>
  );
}
