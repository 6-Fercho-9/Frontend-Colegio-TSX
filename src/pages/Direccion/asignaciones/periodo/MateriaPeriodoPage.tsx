import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationTabs from "../../../shared/NavegationBar";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import { getPeriodosPorCursoGestionMateriaSeleccionado } from "../../../../services/Personal-Academico/CursoGestionService";
import { SimpleCursoGestionMateriaPeriodo } from "../../../../services/interfaces/Personal-Escolar/CursoGestionMateriaPeriodo";
import MateriaCursoCard from "../../../shared/ComponentCard";
import icono_primer_periodo from "../../../../assets/images/background-green.png"
import icono_segundo_periodo from "../../../../assets/images/background-segundo-trimestre.jpg"
import icono_tercer_periodo from "../../../../assets/images/fondo-red-primer-tri.jpg"
import default_image from "../../../../assets/images/default_image.png"; 
export default function MateriaPeriodoPage() {
  const { id } = useParams(); // este ID es del curso_gestion_materia
  const navigate = useNavigate();
  
  const [periodos, setPeriodos] = useState<SimpleCursoGestionMateriaPeriodo[]>([]);
  const [materiaInfo, setMateriaInfo] = useState<SimpleCursoGestionMateriaPeriodo["curso_gestion_materia"] | null>(null);
  const [activeOptionsId, setActiveOptionsId] = useState<number | null>(null);


  const getIconoPorGrado = (grado: number): string => {
    switch (grado) {
      case 1:
        return icono_primer_periodo;
      case 2:
        return icono_segundo_periodo;
      case 3:
        return icono_tercer_periodo;
      default:
        return default_image;
    }
  };



  useEffect(() => {
    if (id) {
      fetchPeriodos(parseInt(id));
    }
  }, [id]);

  const fetchPeriodos = async (idMateria:number) => {
    try {
      const data = await getPeriodosPorCursoGestionMateriaSeleccionado(idMateria);
      setPeriodos(data);
      setMateriaInfo(data[0]?.curso_gestion_materia || null);
    } catch (error) {
      console.error("Error al cargar periodos:", error);
    }
  };

  const resolvedNavItems = [
    { label: "Principal", path: "/asignacion-cursos" },
    { label: "Curso", path: `/curso-gestion/${materiaInfo?.curso_gestion.id ?? 0}` },
    { label: "Materias", path: `/curso-gestion/${materiaInfo?.curso_gestion.id ?? 0}/materias` },
    { label: "Periodos", path: `/materia/${id}/periodos` }, 
    { label: "Inscripción", path: `/curso-gestion/${materiaInfo?.curso_gestion.id ?? 0}/inscripcion` },
    //{ label: "Integrantes", path: `/curso-gestion/${materiaInfo?.curso_gestion.id ?? 0}/integrantes` },
  ];

  return (
    <>
      <NavigationTabs
        items={resolvedNavItems}
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      />

      <PageMetaModified
        title={`Seleccionar Trimestre`}
        subtitle={
          materiaInfo
            ? `${materiaInfo.materia.nombre} - ${materiaInfo.curso_gestion.curso.nombre} (${materiaInfo.curso_gestion.gestion.nombre})`
            : "Cargando..."
        }
        description="Seleccione un trimestre para gestionar los datos correspondientes."
      />

      <PageBreadcrumbModified
        pageTitle={`Gestion ${materiaInfo?.curso_gestion.gestion.nombre} - ${materiaInfo?.curso_gestion.curso.nombre} `}
        subtitle={
          materiaInfo
            ? `MATERIA ${materiaInfo.materia.nombre}`
            : "Cargando..."
        }
      />

      <ComponentCardModified title="Trimestres disponibles">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-6">
          {periodos.map((periodo) => (
            <MateriaCursoCard
              key={periodo.id}
              materiaCurso={{
                id: periodo.id,
                nombre: periodo.periodo.nombre.toUpperCase(),
                imageUrl:  getIconoPorGrado(periodo.periodo.peso ?? 1),
                estado: periodo.estado,
              }}
              activeOptionsId={activeOptionsId}
              setActiveOptionsId={setActiveOptionsId}
              onNavigate={() =>
                //navigate(`/materia-periodo/${periodo.curso_gestion_materia.id}/info`)
                navigate(`/materia-periodo/${periodo.id}/notas`)
                
              }
            />
          ))}
        </div>
      </ComponentCardModified>
    </>
  );
}
