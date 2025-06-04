
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CursoGestionEdit } from "../../../../services/interfaces/Personal-Escolar/CursoGestion";
import { get_curso_gestion_data, updateCursoGestion, uploadIconCurso, UploadIconoDTO } from "../../../../services/Personal-Academico/CursoGestionService";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";
import NavigationTabs from "../../../shared/NavegationBar";
import ComponentCard from "../../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import {EstudiantesPorCursoPage} from "../../../AuthPages/EstudiantesPorCurso";

export default function CursoIntegrantesPage() {
  const { id } = useParams();
  const [cursoGestion, setCursoGestion] = useState<CursoGestionEdit | null>(null);

  useEffect(() => {
    if (id) {
      fetchCursoGestionData(parseInt(id));
    }
  }, [id]);

  const fetchCursoGestionData = async (id: number) => {
    try {
      const data = await get_curso_gestion_data(id);
      setCursoGestion(data);
    } catch (error) {
      console.error("Error al obtener datos del curso gestión:", error);
    }
  };


  return (
    <>
      <NavigationTabs
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      />
      <PageMetaModified
        title="Integrantes del Curso"
        subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`}
        description="Formulario para editar curso por gestión"
      />
      <PageBreadcrumbModified pageTitle="Lista de integrantes de curso" subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`} />
        <PageBreadcrumb pageTitle=""/>
          <div className="space-y-6">
            <ComponentCard title="Lista de Integrantes del Curso">
              
              <EstudiantesPorCursoPage cursoGestion={parseInt(id)} />
            </ComponentCard>
            
          </div>

    </>
  );
}
