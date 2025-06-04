import { useState, useEffect } from "react";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import SelectModified from "../../../shared/SelectModified";
import { Modal } from "../../../../components/ui/modal";
import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import DropzoneComponent from "../../../../components/form/form-elements/DropZone";
import { MateriaEditObject } from "../../../../services/interfaces/Personal-Escolar/Curso";
import { DocenteAsignacion } from "../../../../services/interfaces/Personal-Escolar/Docente";
import Server from "../../../../services/API/server";

interface Props {
  data: MateriaEditObject;
  docentes: DocenteAsignacion[];
  onActualizar: () => void;
}

export default function CardMateriaDatos({ data, docentes, onActualizar }: Props) {
  const [form, setForm] = useState({
    cantidad_aprobados: data.cantidad_aprobados.toString(),
    cantidad_reprobados: data.cantidad_reprobados.toString(),
    cantidad_abandono: data.cantidad_abandono.toString(),
    estado: data.estado,
  });

  const [formCopia, setFormCopia] = useState({ ...form });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [docenteSeleccionado, setDocenteSeleccionado] = useState<DocenteAsignacion | null>(data.docente);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);

  const handleActualizar = () => {
    setFormCopia({ ...form });
    setShowEditModal(true);
  };

  const handleConfirmar = () => {
    setForm({ ...formCopia });
    setShowEditModal(false);
    onActualizar(); // A futuro llamar a update
  };

  const handleFormCopiaChange = (field: string, value: string) => {
    setFormCopia({ ...formCopia, [field]: value });
  };

  useEffect(() => {
    const valid = (v: string) => !isNaN(Number(v)) && Number(v) >= 0;
    setFormIsValid(
      valid(formCopia.cantidad_aprobados) &&
      valid(formCopia.cantidad_reprobados) &&
      valid(formCopia.cantidad_abandono)
    );
  }, [formCopia]);

  const handleUploadImage = async (file: File) => {
    const url = URL.createObjectURL(file);
    console.log("Imagen simulada subida:", url);
    setShowImageModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Imagen */}
        <ComponentCardModified>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400 mb-4">ICONO DE MATERIA</h3>
            <img
              src={
                data?.url_image
                  ? `${Server.CLOUDINARY_URL}/${data.url_image}`
                  : "https://via.placeholder.com/200"
              }
              alt="Imagen Curso"
              className="w-64 h-64 object-cover rounded-xl"
            />
            <Button size="sm" className="mt-4" onClick={() => setShowImageModal(true)}>
              Sube tu imagen
            </Button>
          </div>
        </ComponentCardModified>

        {/* Card Datos */}
        <ComponentCardModified title="Datos de la Materia">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input type="number" value={form.cantidad_reprobados} readonly={true} />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input type="number" value={form.cantidad_aprobados} readonly={true} />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input type="number" value={form.cantidad_abandono} readonly={true} />
            </div>
            <div>
              <Label>Estado</Label>
              <SelectModified
                options={[
                  { label: "Habilitado", value: "Habilitado" },
                  { label: "Deshabilitado", value: "Deshabilitado" },
                ]}
                value={form.estado}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleActualizar}>Actualizar</Button>
          </div>
        </ComponentCardModified>
      </div>

      {/* Modal de Edición */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Editar datos de la materia</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input
                type="number"
                value={formCopia.cantidad_reprobados}
                onChange={(e) => handleFormCopiaChange("cantidad_reprobados", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input
                type="number"
                value={formCopia.cantidad_aprobados}
                onChange={(e) => handleFormCopiaChange("cantidad_aprobados", e.target.value)}
              />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input
                type="number"
                value={formCopia.cantidad_abandono}
                onChange={(e) => handleFormCopiaChange("cantidad_abandono", e.target.value)}
              />
            </div>
            <div>
              <Label>Estado</Label>
              <SelectModified
                options={[
                  { label: "Habilitado", value: "Habilitado" },
                  { label: "Deshabilitado", value: "Deshabilitado" },
                ]}
                value={formCopia.estado}
                onChange={(v) => handleFormCopiaChange("estado", v)}
              />
            </div>
            <div>
              <Label>Docente</Label>
              <AutoCompleteCombobox<DocenteAsignacion>
                options={docentes}
                displayValue={(item) => item.nombre}
                getKey={(item) => item.id}
                placeholder="Selecciona un docente"
                onSelect={setDocenteSeleccionado}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowEditModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleConfirmar} disabled={!formIsValid}>Confirmar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Imagen */}
      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Subir nueva imagen</h2>
          <DropzoneComponent onUpload={handleUploadImage} />
        </div>
      </Modal>
    </>
  );
}
