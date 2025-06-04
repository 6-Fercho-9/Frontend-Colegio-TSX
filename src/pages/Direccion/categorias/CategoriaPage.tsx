import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import ComponentCardModified from "../../AuthPages/ComponentCardModified";
import { Modal } from "../../../components/ui/modal";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Swal from "sweetalert2";
import { getListCategoria } from "../../../services/Personal-Academico/CategoriaService";
import CategoriaTable from "../categorias/CategoriaTable";

export const CategoriaPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombreCategorias, setNombreCategorias] = useState("");
  const [reloadCategorias, setReloadCategorias] = useState(false);

  const handleCrearGestion = async () => {
    try {
      const data = await getListCategoria();
      setNombreCategorias("");
      setShowCreateModal(false);
      setReloadCategorias((prev) => !prev);

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
            text: "Hubo un problema al crear la categoria.",
            showConfirmButton: true,
        });
        console.error("Error al crear categoria:", error);
    }
  };

  return (
    <>
      <PageMeta title="Categorias" description="Categorias de materias" />
      <PageBreadcrumb pageTitle="Categorias" />

      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Categorias"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          
          <CategoriaTable
            reloadTrigger={reloadCategorias}
            onDeleted={() => setReloadCategorias((prev) => !prev)}
          />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Categoria */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        className="max-w-[500px] m-4"
      >
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nueva Gestión</h2>
          <div className="space-y-4">
            <Label>Nombre de la Categoria</Label>
            <Input
              value={nombreCategorias}
              onChange={(e) => setNombreCategorias(e.target.value)}
              placeholder="Ej. CIENTIFICA, TECNOLOGICA, ARTISTICA, ETC"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearGestion}>
                Crear Categoria
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
