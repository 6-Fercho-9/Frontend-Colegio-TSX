import { useState } from "react";
import ComponentCardModified from "../../shared/ComponentCardModified";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import MateriaTable from "./MateriaTable";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Swal from "sweetalert2";
import { createMateria } from "../../../services/Personal-Academico/MateriaService";

export const MateriaPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombreMateria, setNombreMateria] = useState("");
  const [reloadMaterias, setReloadMaterias] = useState(false);

  const handleCrearMateria = async () => {
    try {
      const data = await createMateria(nombreMateria);
      setNombreMateria("");
      setShowCreateModal(false);
      setReloadMaterias((prev) => !prev);

      Swal.fire({
        icon: "success",
        title: "Materia creada con éxito",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      setShowCreateModal(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear la materia.",
        showConfirmButton: true,
      });
      console.error("Error al crear materia:", error);
    }
  };

  return (
    <>
      <PageMeta title="Materias" description="Gestión de Materias escolares activas" />
      <PageBreadcrumb pageTitle="Materias" />

      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Materias"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          <MateriaTable
            reloadTrigger={reloadMaterias}
            onDeleted={() => setReloadMaterias((prev) => !prev)}
          />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Materia */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        className="max-w-[500px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nueva Materia</h2>
          <div className="space-y-4">
            <Label>Nombre de la Materia</Label>
            <Input
              value={nombreMateria}
              onChange={(e) => setNombreMateria(e.target.value)}
              placeholder="Ej. Matemáticas, Historia, Física"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearMateria}>
                Crear Materia
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MateriaPage;
