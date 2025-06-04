import { useState } from "react";
import ComponentCardModified from './ComponentCardModified';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import TableMarca from './TableMarca';
import Button from '../../components/ui/button/Button';
import { Modal } from "../../components/ui/modal";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Swal from "sweetalert2";
import { createMarca } from "../../services/Gestion_de_Productos/marcaService"; // Asegúrate de tener esto

export const MarcaPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombreMarca, setNombreMarca] = useState("");
  const [reloadMarcas, setReloadMarcas] = useState(false);

  const handleCrearMarca = async () => {
    try {
      const data = await createMarca(nombreMarca);
      setNombreMarca("");
      setShowCreateModal(false);
      setReloadMarcas(prev => !prev);

      Swal.fire({
        icon: 'success',
        title: 'Marca creada con exito',
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la marca.',
      });
      console.error("Error al crear marca:", error);
    }
  };

  return (
    <>
      <PageMeta
        title="Marca"
        description="Esta es la página de Marcas"
      />
      <PageBreadcrumb pageTitle="Marcas" />
      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Marcas"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          <TableMarca reloadTrigger={reloadMarcas} onDeleted={() => setReloadMarcas(prev => !prev)} />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Marca */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nueva Marca</h2>
          <div className="space-y-4">
            <Label>Nombre de la Marca</Label>
            <Input
              value={nombreMarca}
              onChange={(e) => setNombreMarca(e.target.value)}
              placeholder="Ej. Apple, Samsung..."
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearMarca}>
                Crear Marca
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
