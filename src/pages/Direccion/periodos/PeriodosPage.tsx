import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import ComponentCardModified from "../../AuthPages/ComponentCardModified";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Swal from "sweetalert2";
import { getListPeriodos } from "../../../services/Personal-Academico/PeriodoService";
import PeriodosTable from "../periodos/PeriodosTable";

export const PeriodosPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombrePeriodoss, setNombrePeriodoss] = useState("");
  const [reloadPeriodoss, setReloadPeriodoss] = useState(false);

  const handleCrearGestion = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await getListPeriodos();
      setNombrePeriodoss("");
      setShowCreateModal(false);
      setReloadPeriodoss((prev) => !prev);

      Swal.fire({
        icon: "success",
        title: "Gestión creada con éxito",
        // text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
        setShowCreateModal(false);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear la Periodos.",
            showConfirmButton: true,
        });
        console.error("Error al crear Periodos:", error);
    }
  };

  return (
    <>
      <PageMeta title="Periodoss" description="Periodoss de materias" />
      <PageBreadcrumb pageTitle="Periodoss" />

      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Periodoss"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          
          <PeriodosTable
            reloadTrigger={reloadPeriodoss}
            onDeleted={() => setReloadPeriodoss((prev) => !prev)}
          />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Periodos */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        className="max-w-[500px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nuevo periodo</h2>
          <div className="space-y-4">
            <Label>Nombre del periodo</Label>
            <Input
              value={nombrePeriodoss}
              onChange={(e) => setNombrePeriodoss(e.target.value)}
              placeholder="Ej. CIENTIFICA, TECNOLOGICA, ARTISTICA"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearGestion}>
                Crear Periodo
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
