
import { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  asignarCursoAGestion,
  getCursosByGestion,
  getCompleteList as getGestiones,
} from "../../../../services/Personal-Academico/GestionService";
import { GestionAsignacion } from "../../../../services/interfaces/Personal-Escolar/Gestion";
import { CursoAsignacion } from "../../../../services/interfaces/Personal-Escolar/Curso";
import { CursoGestion } from "../../../../services/interfaces/Personal-Escolar/CursoGestion";

// Components
import PageMeta from "../../../../components/common/PageMeta";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import SelectModified from "../../../shared/SelectModified";
import Button from "../../../../components/ui/button/Button";
import Label from "../../../../components/form/Label";
import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
// import CursoGestionTable from "./CursoPorGestionTable";
import { Modal } from "../../../../components/ui/modal";
import { getCompleteList } from "../../../../services/Personal-Academico/CursoService";
import MateriaCursoCard from "../../../shared/ComponentCard";
import { useNavigate } from "react-router";
import { eliminarAsignacion } from "../../../../services/Personal-Academico/CursoGestionService";


export default function AsignacionCursoPage() {
  // Estados
  const [gestiones, setGestiones] = useState<GestionAsignacion[]>([]);
  const [cursos, setCursos] = useState<CursoAsignacion[]>([]);
  const [cursoSeleccionado,setCursoSeleccionado] = useState<CursoAsignacion | null>(null)

  const [cursosPorGestion, setCursosPorGestion] = useState<CursoGestion[]>([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState<number | null>(null);
  //para controlar el eliminado
  const [activeOptionsId, setActiveOptionsId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState({
    gestiones: false,
    cursos: false,
    asignacion: false,
  });

  // Memoizaciones
  const gestionActual = useMemo(
    () => gestiones.find((g) => g.id === gestionSeleccionada),
    [gestiones, gestionSeleccionada]
  );

  const cardTitle = useMemo(
    () => `${gestionActual?.nombre || "-"}`,
    [gestionActual]
  );

  const opcionesGestion = useMemo(
    () => gestiones.map((g) => ({ label: g.nombre, value: g.id.toString() })),
    [gestiones]
  );

  // Callbacks
  const triggerRefresh = useCallback(() => {
    if (gestionSeleccionada) {
      fetchCursosPorGestion(gestionSeleccionada);
    }
  }, [gestionSeleccionada]);

  const fetchData = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, gestiones: true }));
    try {
      const gestionesData = await getGestiones();
      setGestiones(gestionesData);
      if (gestionesData.length > 0) {
        const ultimaGestionId = gestionesData[gestionesData.length - 1].id;
        setGestionSeleccionada(ultimaGestionId);

      const cursosData = await getCompleteList()
      setCursos(cursosData)

      }
    } catch (error) {
      console.error("Error fetching gestiones o cursos:", error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "No se pudieron cargar las gestiones",
      // });
    } finally {
      setIsLoading(prev => ({ ...prev, gestiones: false }));
    }
  }, []);

  const fetchCursosPorGestion = useCallback(async (gestionId: number) => {
    setIsLoading(prev => ({ ...prev, cursos: true }));
    try {
      const data = await getCursosByGestion(gestionId);
      setCursosPorGestion(data);
    } catch (error) {
      console.error("Error al obtener cursos por gestión:", error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: "No se pudieron cargar los cursos",
      // });
    } finally {
      setIsLoading(prev => ({ ...prev, cursos: false }));
    }
  }, []);

  const handleAgregarCurso = useCallback(() => {
    if (cursoSeleccionado) {
      setShowConfirmModal(true);
    }
  }, [cursoSeleccionado]);

  const confirmarAsignacion = useCallback(async () => {
    setIsLoading(prev => ({ ...prev, asignacion: true }));
    try {
      if (cursoSeleccionado?.id === undefined){
        console.log(`no existe id del curso seleccionado`)
        throw Error
      }

      const response = await asignarCursoAGestion(
        gestionSeleccionada! ,cursoSeleccionado?.id
      );

      setShowConfirmModal(false);
      setCursoSeleccionado(null);
      triggerRefresh();

      await Swal.fire({
        icon: "success",
        title: "Curso asignado",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al asignar curso:", error);
      setShowConfirmModal(false);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo asignar el curso.",
        showConfirmButton: true,
      });
    } finally {
      setIsLoading(prev => ({ ...prev, asignacion: false }));
    }
  }, [gestionSeleccionada, cursoSeleccionado, triggerRefresh]);

  // Efectos
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (gestionSeleccionada !== null) {
      fetchCursosPorGestion(gestionSeleccionada);
    }
  }, [gestionSeleccionada, fetchCursosPorGestion]);



   const confirmarEliminacion = async (id:number) => {
      try {
        
        const response = await eliminarAsignacion(id);
        triggerRefresh()
        await Swal.fire("Eliminado", response.message, "success");
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.error("Error al eliminar el curso:", error);
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message!,
          showConfirmButton: true,
        });
      }
    };
  return (
    <>
      <PageMeta title="Asignar Cursos" description="Asignar cursos a gestiones académicas" />
      <PageBreadcrumb pageTitle="Asignación de Curso" />
      <div className="space-y-6" >
        <ComponentCardModified title={`Gestion ${cardTitle}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label>Gestión</Label>
              <SelectModified
                options={opcionesGestion}
                value={gestionSeleccionada?.toString() || ""}
                onChange={(v) => setGestionSeleccionada(parseInt(v))}
              // disabled={isLoading.gestiones}
              />
            </div>

            <div className="md:col-span-2">
              <AutoCompleteCombobox<CursoAsignacion>
                options={cursos}
                onSelect={setCursoSeleccionado}
                displayValue={(item) => item.nombre}
                getKey={(item) => item.id}
                placeholder="Buscar por nombre o turno..."
                label="Curso"
              // disabled={isLoading.cursos}
              />
            </div>

            {cursoSeleccionado && (
              <div className="flex items-center pt-[25px]">
                <Button 
                  size="sm" 
                  onClick={handleAgregarCurso} 
                  disabled={!cursoSeleccionado || isLoading.asignacion}
                //  loading={isLoading.asignacion}
                >
                  + Agregar
                </Button>
              </div>
            )}
          </div>

          {/* <CursoGestionTable
            data={cursosPorGestion}
            //loading={isLoading.cursos}
            onDeleted={triggerRefresh}
          /> */}
        </ComponentCardModified>
        <ComponentCardModified title={`Cursos ${cardTitle}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
            {cursosPorGestion.map((cursoMateria) => 
              <MateriaCursoCard key={cursoMateria.id} 
              materiaCurso={{
                id:cursoMateria.id,
                nombre:cursoMateria.curso.nombre,
                estado:cursoMateria.estado,
                imageUrl:cursoMateria.url_image
              }}  
              activeOptionsId={activeOptionsId}
              setActiveOptionsId={setActiveOptionsId}
              onNavigate={(id) => navigate(`/curso-gestion/${id}`)}
              onDelete={(id) => confirmarEliminacion(id)}
              ></MateriaCursoCard>
            
            )}
          </div>
        </ComponentCardModified>

      </div>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => !isLoading.asignacion && setShowConfirmModal(false)}
        className="max-w-[500px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Confirmar Asignación
          </h2>
          <p className="text-gray-700 dark:text-gray-200">
            ¿Estás seguro de asignar el curso <strong>{cursoSeleccionado?.nombre}</strong> a 
            la gestión <strong>{gestionActual?.nombre}</strong>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmModal(false)}
              disabled={isLoading.asignacion}
            >
              Cancelar
            </Button>
            <Button 
              onClick={confirmarAsignacion}
              //loading={isLoading.asignacion}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
