import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardDocenteMateria from "./CardDocenteMateria";
import CardMateriaDatos from "./CardMateriaData";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";
import { MateriaEditObject } from "../../../../services/interfaces/Personal-Escolar/Curso";
import { getMateriaCompletaById } from "../../../../services/Personal-Academico/CursoGestionMateriaService";
import { getListDocentesDisponibles } from "../../../../services/Personal-Academico/DocenteService";
import { DocenteAsignacion } from "../../../../services/interfaces/Personal-Escolar/Docente";


export default function DocenteMateriaPage() {
  const { id } = useParams();
  const [data, setData] = useState<MateriaEditObject | null>(null);
  const [docentes, setDocentes] = useState<DocenteAsignacion[]>([]);

  const fetchData = async () => {
    if (!id) return;
    const response = await getMateriaCompletaById(parseInt(id));
    setData(response);
  };

  const fetchDocentes = async () => {
    const response = await getListDocentesDisponibles();
    setDocentes([{ id: 0, nombre: "Sin Docente" }, ...response]); // Agrega manualmente "Sin Docente"
  };

  useEffect(() => {
    fetchData();
    fetchDocentes();
  }, [id]);

  return (
    <>
      <PageMetaModified
        title="Gestión de Materia"
        subtitle={data ? `${data.curso_gestion.curso.nombre} - ${data.curso_gestion.gestion.nombre}` : ""}
        description="Vista general para editar datos de la materia y gestionar horarios y docente"
      />

      <PageBreadcrumbModified
        pageTitle="Gestión de Materia"
        subtitle={data ? `${data.curso_gestion.curso.nombre} - ${data.curso_gestion.gestion.nombre}` : ""}
      />

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <CardMateriaDatos data={data} docentes={docentes} onActualizar={fetchData} />
          <CardDocenteMateria data={data} onActualizar={fetchData} />
        </div>
      )}
    </>
  );
}
