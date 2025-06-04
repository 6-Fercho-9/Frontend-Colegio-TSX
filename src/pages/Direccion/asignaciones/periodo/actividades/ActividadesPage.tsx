import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import icono_primer_periodo from "../../../../../assets/images/background-green.png";
import icono_segundo_periodo from "../../../../../assets/images/background-segundo-trimestre.jpg";
import icono_tercer_periodo from "../../../../../assets/images/fondo-red-primer-tri.jpg";
import default_image from "../../../../../assets/images/default_image.png";

import { getActividades } from "../../../../../services/Aula-Estudiantil/ActividadService";
import { Actividad } from "../../../../../services/interfaces/Aula-Estudiantil/Actividad";
import { IISimpleCursoGestionMateriaPeriodo } from "../../../../../services/interfaces/Personal-Escolar/CursoGestionMateriaPeriodo";

import NavigationTabs from "../../../../shared/NavegationBar";
import PageMetaModified from "../../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../../shared/PageBreadcrumbModified";
import ComponentCardModified from "../../../../shared/ComponentCardModified";

import CardComponentTSX from "../../../../shared/CardComponentSheet";
import Button from "../../../../../components/ui/button/Button";


export default function ActividadesPage() {
  const { id } = useParams(); // ID del curso_gestion_materia_periodo
  const navigate = useNavigate();

  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [cursoGestionMateriaPeriodo, setCursoGestionMateriaPeriodo] = useState<IISimpleCursoGestionMateriaPeriodo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeOptionsId, setActiveOptionsId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchActividades(parseInt(id));
    }
  }, [id]);

  const fetchActividades = async (idPeriodo: number) => {
    try {
      const response = await getActividades(idPeriodo);
      setActividades(response.actividades);
      setCursoGestionMateriaPeriodo(response.curso_gestion_materia_periodo);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    } finally {
      setLoading(false);
    }
  };

   const resolvedNavItems = useMemo(() => [
      { label: "Periodos", path: `/materia/${cursoGestionMateriaPeriodo?.curso_gestion_materia.id ?? 0}/periodos` },
      { label: "Informacion", path: `/materia-periodo/${cursoGestionMateriaPeriodo?.curso_gestion_materia.id ?? 0}/info` },
      { label: "Actividades", path: `/materia-periodo/${cursoGestionMateriaPeriodo?.id ?? 0}/actividades` },
      { label: "Notas", path: `/materia-periodo/${cursoGestionMateriaPeriodo?.id ?? 0}/notas` },
      { label: "Asistencia", path: `/materia-periodo/${cursoGestionMateriaPeriodo?.id ?? 0}/asistencias` },
    ], [cursoGestionMateriaPeriodo]);

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

  return (
    <>
      <NavigationTabs
        items={resolvedNavItems}
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      />

      <PageMetaModified
        title="Actividades asignadas"
        subtitle={
          cursoGestionMateriaPeriodo
            ? `${cursoGestionMateriaPeriodo.curso_gestion_materia.materia.nombre} - ${cursoGestionMateriaPeriodo.curso_gestion_materia.curso_gestion.curso.nombre} (${cursoGestionMateriaPeriodo.curso_gestion_materia.curso_gestion.gestion.nombre})`
            : "Cargando..."
        }
        description="Listado de actividades para el periodo seleccionado."
      />

      <PageBreadcrumbModified
        pageTitle={`Gestión ${cursoGestionMateriaPeriodo?.curso_gestion_materia.curso_gestion.gestion.nombre} - ${cursoGestionMateriaPeriodo?.curso_gestion_materia.curso_gestion.curso.nombre}`}
        subtitle={
          cursoGestionMateriaPeriodo
            ? `MATERIA ${cursoGestionMateriaPeriodo.curso_gestion_materia.materia.nombre}`
            : "Cargando..."
        }
      />

      <ComponentCardModified title="Actividades registradas">
        <div className="flex justify-end px-4">
        <Button
            onClick={() => navigate(`/materia-periodo/${id}/actividades/crear`)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
        >
            + Agregar
        </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
          {loading ? (
            <p className="col-span-full text-center">Cargando actividades...</p>
          ) : actividades.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No hay actividades registradas.</p>
          ) : (
            actividades.map((actividad) => (
              <CardComponentTSX
                key={actividad.id}
                materiaCurso={{
                  id: actividad.id,
                  nombre: actividad.titulo.toUpperCase(),
                  imageUrl: getIconoPorGrado(cursoGestionMateriaPeriodo?.periodo.peso ?? 0),
                 // estado: actividad.descripcion,
                }}
                activeOptionsId={activeOptionsId}
                setActiveOptionsId={setActiveOptionsId}
                onCardClick={(id) => console.log("Click card", id)}
                opciones={[
                    {
                    label: "Ver detalles",
                    onClick: (id) => navigate(`/detalle/${id}`),
                    },
                    {
                    label: "Editar",
                    onClick: (id) => navigate(`/editar/${id}`),
                    className: "text-yellow-600",
                    },
                    {
                    label: "Eliminar",
                    onClick: (id) => console.log("clickeado para eliminar",id),
                    className: "text-red-600",
                    },
                ]}
              />
            ))
          )}
        </div>
      </ComponentCardModified>
    </>
  );
}
