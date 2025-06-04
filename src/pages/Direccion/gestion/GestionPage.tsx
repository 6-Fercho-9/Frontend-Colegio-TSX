import { useState } from "react";
import ComponentCardModified from "../../shared/ComponentCardModified";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import GestionTable from "./GestionTable";
import Button from "../../../components/ui/button/Button";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Swal from "sweetalert2";
import { createGestion } from "../../../services/Personal-Academico/GestionService";

export const GestionPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombreGestion, setNombreGestion] = useState("");
  const [reloadGestiones, setReloadGestiones] = useState(false);

  const handleCrearGestion = async () => {
    try {
      const data = await createGestion(nombreGestion);
      setNombreGestion("");
      setShowCreateModal(false);
      setReloadGestiones((prev) => !prev);

      Swal.fire({
        icon: "success",
        title: "Gestión creada con éxito",
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
        setShowCreateModal(false);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear la gestión.",
            showConfirmButton: true,
        });
        console.error("Error al crear gestión:", error);
    }
  };

  return (
    <>
      <PageMeta title="Gestiones" description="Gestiones escolares activas e históricas" />
      <PageBreadcrumb pageTitle="Gestiones" />

      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Gestiones"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          
          <GestionTable
            reloadTrigger={reloadGestiones}
            onDeleted={() => setReloadGestiones((prev) => !prev)}
          />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Gestión */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        className="max-w-[500px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nueva Gestión</h2>
          <div className="space-y-4">
            <Label>Nombre de la Gestión</Label>
            <Input
              value={nombreGestion}
              onChange={(e) => setNombreGestion(e.target.value)}
              placeholder="Ej. 2025, 2025-1, 2025.2"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearGestion}>
                Crear Gestión
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
