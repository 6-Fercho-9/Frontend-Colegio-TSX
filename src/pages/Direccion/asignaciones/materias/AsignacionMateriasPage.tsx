
import { useEffect, useState } from "react";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import SelectModified from "../../../shared/SelectModified";
import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import Swal from "sweetalert2";

import {
  getCompleteList as getGestiones,
} from "../../../../services/Personal-Academico/GestionService";
import {
  listMateriasToTable,
  listMaterias
} from "../../../../services/Personal-Academico/MateriaService";
import { GestionAsignacion } from "../../../../services/interfaces/Personal-Escolar/Gestion";
import {
  CursoAsignacion,
  SimpleCursoGestionMateria
} from "../../../../services/interfaces/Personal-Escolar/Curso";
import { MateriaAsignacion } from "../../../../services/interfaces/Personal-Escolar/Materia";
import { getCompleteList } from "../../../../services/Personal-Academico/CursoService";
import MateriaAsignadaTable from "./AsignacionMateriaTable";
import { Modal } from "../../../../components/ui/modal";

export default function AsignacionMateriasPage() {
  const [gestiones, setGestiones] = useState<GestionAsignacion[]>([]);
  const [cursos, setCursos] = useState<CursoAsignacion[]>([]);
  const [materias, setMaterias] = useState<MateriaAsignacion[]>([]);

  const [gestionSeleccionada, setGestionSeleccionada] = useState<GestionAsignacion | null>(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoAsignacion | null>(null);
  const [materiasSeleccionado, setMateriasSeleccionado] = useState<MateriaAsignacion | null>(null);
  const [cursoGestionMateria, setCursoGestionMateria] = useState<SimpleCursoGestionMateria[]>([]);

  const [showConfirmModal,setShowConfirmModal] =useState<boolean>(false);

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  // Cargar todas las gestiones, cursos y materias una sola vez
  const fetchInitialData = async () => {
    const gestionesData = await getGestiones();
    setGestiones(gestionesData);
    if (gestionesData.length > 0) {
      setGestionSeleccionada(gestionesData[gestionesData.length - 1]);
    }

    const cursosData = await getCompleteList(); // Suponiendo que lista todos los cursos
    setCursos(cursosData);
    if (cursosData.length > 0) {
      setCursoSeleccionado(cursosData[0]);
    }

    const materiasData = await listMaterias();

    setMaterias(materiasData);

   
  };
  useEffect(() => {
    try {
      fetchInitialData()   
    } catch (error) {
      console.error(`ocurrio un error al cargar los datos iniciales ${error}`)
    }
     fetchInitialData();
  }, []);

  // Obtener materias específicas solo si gestion y curso están seleccionados
  useEffect(() => {
    if (gestionSeleccionada !== null && cursoSeleccionado !== null) {
      const fetchMaterias = async () => {
        const data = await listMateriasToTable(
          gestionSeleccionada.id,
          cursoSeleccionado.id
        );
        setCursoGestionMateria(data);
      };
      fetchMaterias();
    } else {
      setCursoGestionMateria([]);
    }
  }, [cursoSeleccionado, gestionSeleccionada,refresh]);

  const handleAgregarMateria = () => {
      if (materiasSeleccionado) {
        setShowConfirmModal(true);
      }
    };

    const confirmarAsignacion = () => {
      if (materiasSeleccionado) {
        Swal.fire(
          "Materia asignada",
          `Materia ${materiasSeleccionado.nombre} asignada con éxito`,
          "success"
        );
        setMateriasSeleccionado(null);
        setShowConfirmModal(false);
        triggerRefresh()
    }
  };
  return (
    <>
      <PageMetaModified
        title="Asignar Materias a Curso"
        subtitle="Selecciona una gestión y curso para ver las materias"
        description="Asignar materias a un curso por gestión"
      />
      <PageBreadcrumbModified pageTitle="Asignación de Materias a Curso" 
      subtitle={`Gestion [${gestionSeleccionada?.nombre ?? ''}] - ${cursoSeleccionado?.nombre ?? ''}`} />

      <ComponentCardModified title="Asignación de Materias">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <Label>Gestión</Label>
            <SelectModified
              options={
                gestiones.map((g) => 
                  ({ label: g.nombre, value: g.id.toString() }))}
              value={gestionSeleccionada?.id.toString() || ""}
              onChange={(v) => {
                const gestion = gestiones.find(g => g.id.toString() === v);
                if (gestion) setGestionSeleccionada(gestion);
              }}
            />
          </div>

          <div className="md:col-span-2">
            <AutoCompleteCombobox<CursoAsignacion>
              options={cursos}
              defaultValue={cursos[0]}
              onSelect={setCursoSeleccionado}
              displayValue={(item) => item.nombre}
              getKey={(item) => item.id}
              placeholder="Buscar curso por nombre o turno"
              label="Curso"
            />
          </div>

          <div className="md:col-span-2">
            <AutoCompleteCombobox<MateriaAsignacion>
              options={materias}
              onSelect={setMateriasSeleccionado}
              displayValue={(item) => item.nombre}
              getKey={(item) => item.id}
              placeholder="Buscar materia"
              label="Materia"
            />
          </div>
        </div>

        {materiasSeleccionado && (
          <div className="flex justify-end pt-4">
            <Button onClick={handleAgregarMateria}>+ Agregar</Button>
          </div>
        )}



        <MateriaAsignadaTable
          data={cursoGestionMateria}
          onDeleted={triggerRefresh}
        
        />

      </ComponentCardModified>
      {/* <div className="mt-6">
      </div> */}
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
            ¿Estás seguro de asignar la materia <strong>{materiasSeleccionado?.nombre}</strong> al curso <strong>{cursoSeleccionado?.nombre}</strong> en la gestión <strong>{gestionSeleccionada?.nombre}</strong>?
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
