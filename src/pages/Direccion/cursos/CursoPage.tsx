
import { useState } from "react";

import Swal from "sweetalert2";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import ComponentCardModified from "../../shared/ComponentCardModified";
import CursoTable from "./CursoTable";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";


import { createCurso } from "../../../services/Personal-Academico/CursoService";
// import SelectModified from "../../AuthPages/SelectModified";

export const CursosPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombreCurso, setNombreCurso] = useState("");
  const [turnoCurso, setTurnoCurso] = useState("");
  const [gradoCurso, setGradoCurso] = useState("");
//   const [estadoCurso, setEstadoCurso] = useState("");

  const [reloadCursos, setReloadCursos] = useState(false);

  const handleCrearCurso = async () => {
    try {
      const data = await createCurso(nombreCurso, turnoCurso,+gradoCurso);
      setNombreCurso("");
      setTurnoCurso("");
      setGradoCurso("");
    //   setEstadoCurso("");
      setShowCreateModal(false);
      setReloadCursos(prev => !prev);

      Swal.fire({
        icon: "success",
        title: "Curso creado con éxito",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      setShowCreateModal(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el curso.",
      });
      console.error("Error al crear curso:", error);
    }
  };


  // const handleGradoCursoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setGradoCurso(e.target.value); // Permitir valores vacíos
  // };
  const handleGradoCursoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("disparado")
    if (/^\d*$/.test(value)) { // Validar que solo contenga números
      setGradoCurso(value);
    }
  };

  return (
    <>
      <PageMeta title="Cursos" description="Esta es la página de Cursos" />
      <PageBreadcrumb pageTitle="Cursos" />

      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Cursos"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          <CursoTable reloadTrigger={reloadCursos} onDeleted={() => setReloadCursos(prev => !prev)} />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Curso */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nuevo Curso</h2>
          <div className="space-y-4">
            <Label>Nombre del Curso</Label>
            <Input
              value={nombreCurso}
              onChange={(e) => setNombreCurso(e.target.value)}
              placeholder="Ej. Primero A"
            />
            <Label>Turno</Label>
            <Input
              value={turnoCurso}
              onChange={(e) => setTurnoCurso(e.target.value)}
              placeholder="Ej. Mañana, Tarde"
            />
            <Label>Grado</Label>
            <Input
             type="number"
              value={gradoCurso}
               onChange={handleGradoCursoChange}
              placeholder="Ej. Grado 1, Grado 2, etc."
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearCurso}>
                Crear Curso
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
