import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getMateriasParaCard } from "../../../../services/Personal-Academico/CursoGestionService";
import MateriaCursoCard from "../../../shared/ComponentCard";
import NavigationTabs from "../../../shared/NavegationBar";
import { listMaterias } from "../../../../services/Personal-Academico/MateriaService";
import { MateriaAsignacion } from "../../../../services/interfaces/Personal-Escolar/Materia";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";

import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import Swal from "sweetalert2";
import ComponentCardModified from "../../../AuthPages/ComponentCardModified";
import { CursoGestionMateriaCard } from "../../../../services/interfaces/Personal-Escolar/CursoGestionMateria";
import { SimpleCursoGestion } from "../../../../services/interfaces/Personal-Escolar/CursoGestion";

export default function MateriasPrincipalPage() {
  const { id } = useParams();
  const [activeOptionsId, setActiveOptionsId] = useState<number | null>(null);
  const [cursoGestion, setCursoGestion] = useState<SimpleCursoGestion | null>(null);
  const [materias, setMaterias] = useState<CursoGestionMateriaCard[]>([]);
  const [todasMaterias, setTodasMaterias] = useState<MateriaAsignacion[]>([]);
  const [materiasSeleccionado, setMateriasSeleccionado] = useState<MateriaAsignacion | null>(null);
  // const [materiaFiltro, setMateriaFiltro] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getMaterias();
      cargarMateriasDisponibles();
    }
  }, [id]);

  const getMaterias = async () => {
    try {
      const data = await getMateriasParaCard(Number(id));
      setMaterias(data.materias);
      setCursoGestion(data.curso_gestion);
    } catch (error) {
      console.error("Error al obtener materias del curso:", error);
    }
  };

  const cargarMateriasDisponibles = async () => {
    try {
      const data = await listMaterias();
      setTodasMaterias(data);
    } catch (error) {
      console.error("Error al obtener lista de materias:", error);
    }
  };


  const handleAgregarMateria = () => {
    if (materiasSeleccionado) {
      setShowConfirmModal(true);
    }
  };

    const confirmarAsignacion = async () => {
        if (materiasSeleccionado) {

          try {
            
            await Swal.fire(
              "Materia asignada",
              `Materia ${materiasSeleccionado.nombre} asignada con éxito`,
              "success"
            );
            setMateriasSeleccionado(null);
            setShowConfirmModal(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error:any) {
            console.error("Error al subir confirmar la asignacion:", error.mess);
            await Swal.fire("Error",error.message, "error");
          }
          
      }
    }


    const resolvedNavItems = [
      {
        label: "Principal",
        path:`/asignacion-cursos`
      },
    {
      label: "Curso",
      path: `/curso-gestion/${cursoGestion?.id ?? 0}`,
    },
    {
      label: "Materias",
      path: `/curso-gestion/${cursoGestion?.id ?? 0}/materias`,
    },
    {
      label: "Inscripción",
      path: `/curso-gestion/${cursoGestion?.id ?? 0}/inscripcion`,
    },
    {
      label: "Integrantes",
      path: `/curso-gestion/${cursoGestion?.id ?? 0}/integrantes`,
    },
  ];
  return (
    <>
      <NavigationTabs
        items={resolvedNavItems}
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      />
      <PageMetaModified title="Materias" description="vista de materias" />
      <PageBreadcrumbModified
        pageTitle={`Materias`}
        subtitle={`[${cursoGestion?.gestion.nombre}] - ${cursoGestion?.curso.nombre}`}
      />
      <div className="space-y-6">
        <ComponentCardModified title="Seleccion de Materias">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-4">
              <AutoCompleteCombobox<MateriaAsignacion>
                options={todasMaterias}
                onSelect={setMateriasSeleccionado}
                displayValue={(item) => item.nombre}
                getKey={(item) => item.id}
                placeholder="Buscar materia"
                label="Materia"
              />
            </div>
            {
              materiasSeleccionado && (
                <div className="md:col-span-1 flex justify-end">
                  <Button
                    onClick={handleAgregarMateria}
                    className="w-full md:w-auto"
                  >
                    + Agregar
                  </Button>
                </div>
              )
            }
          </div>
        </ComponentCardModified>
        <ComponentCardModified title="Materias">
          <div className="px-4 py-2">
          
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
              {materias.map((materia) => (
                <MateriaCursoCard
                  key={materia.id}
                  materiaCurso={{
                    id: materia.id,
                    nombre: materia.materia.nombre,
                    imageUrl: materia.url_image,
                    estado: materia.estado,
                  }}
                  activeOptionsId={activeOptionsId}
                  setActiveOptionsId={setActiveOptionsId}
                  onNavigate={() => navigate(`/materia/${materia.id}/periodos`)}
                  
                  // onClick={() => navigate(`/curso-gestion/${id}/materia/${materia.id}/data`)}
                />
              ))}
            </div>
          </div>
        </ComponentCardModified>

      </div>
        
        <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="max-w-[500px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Confirmar Asignación
          </h2>
          <p className="text-gray-700 dark:text-gray-200">
            ¿Estás seguro de asignar la materia <strong>{materiasSeleccionado?.nombre}</strong> al curso <strong>{cursoGestion?.curso?.nombre}</strong> en la gestión <strong>{cursoGestion?.gestion.nombre}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarAsignacion}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
