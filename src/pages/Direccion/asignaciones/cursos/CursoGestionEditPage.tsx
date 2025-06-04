
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import DropzoneComponent from "../../../../components/form/form-elements/DropZone";
import Swal from "sweetalert2";

import { CursoGestionEdit } from "../../../../services/interfaces/Personal-Escolar/CursoGestion";
import { get_curso_gestion_data, updateCursoGestion, uploadIconCurso, UploadIconoDTO } from "../../../../services/Personal-Academico/CursoGestionService";
import SelectModified from "../../../shared/SelectModified";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";
import Server from "../../../../services/API/server";
import NavigationTabs from "../../../shared/NavegationBar";

import defaultImage from "../../../../assets/images/default_image.png";
export default function CursoGestionEditPage() {
  const { id } = useParams();
  const [cursoGestion, setCursoGestion] = useState<CursoGestionEdit | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const [showConfirmEditModal, setShowConfirmEditModal] = useState<boolean>(false);

  const [form, setForm] = useState({
    cantidad_aprobados: "0",
    cantidad_reprobados: "0",
    cantidad_abandono: "0",
    estado: "Habilitado"
  });

  const [formCopia, setFormCopia] = useState({
    cantidad_aprobados: "0",
    cantidad_reprobados: "0",
    cantidad_abandono: "0",
    estado: "Habilitado"
  });

  useEffect(() => {
    if (id) {
      fetchCursoGestionData(parseInt(id));
    }
  }, [id]);

  const fetchCursoGestionData = async (id: number) => {
    try {
      const data = await get_curso_gestion_data(id);
      setCursoGestion(data);
      const nuevoEstado = {
        cantidad_aprobados: data.total_aprobados.toString() || "0",
        cantidad_reprobados: data.total_reprobados.toString() || "0",
        cantidad_abandono: data.total_abandono.toString() || "0",
        estado: data.estado
      };
      setForm(nuevoEstado);
      setFormCopia(nuevoEstado);
    } catch (error) {
      console.error("Error al obtener datos del curso gestión:", error);
    }
  };

  const handleActualizar = () => {
    //con los datos originales del form
    setFormCopia({ ...form });
    setShowConfirmEditModal(true);
  };

  const handleConfirmarActualizar = async () => {
    if (!id) return;
    try {
      const response = await updateCursoGestion(parseInt(id), {
        total_aprobados: parseInt(formCopia.cantidad_aprobados) || 0,
        total_reprobados: parseInt(formCopia.cantidad_reprobados) || 0,
        total_abandono: parseInt(formCopia.cantidad_abandono) || 0,
        estado: formCopia.estado
      });
      await fetchCursoGestionData(parseInt(id));
      setShowConfirmEditModal(false);
      Swal.fire("Actualizado", response.message, "success");
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      Swal.fire("Error", "Hubo un problema al actualizar el curso", "error");
    }
  };

  const handleUploadImage = async (file: File) => {
    if (!id) return;
    try {
      const dto: UploadIconoDTO = { id: parseInt(id), file };
      const response = await uploadIconCurso(dto);
      setShowImageModal(false);
      await fetchCursoGestionData(parseInt(id));
      await Swal.fire("Éxito", response.message, "success");
    } catch (error) {
      console.error("Error al subir imagen:", error);
      await Swal.fire("Error", "No se pudo subir la imagen", "error");
    }
  };

  useEffect(() => {
    const { cantidad_aprobados, cantidad_reprobados, cantidad_abandono } = formCopia;

    const isValidNumber = (value: string) => {
      const num = Number(value);
      return value.trim() !== "" && !isNaN(num) && Number.isInteger(num) && num >= 0;
    };

    const valid =
      isValidNumber(cantidad_aprobados) &&
      isValidNumber(cantidad_reprobados) &&
      isValidNumber(cantidad_abandono);

    setFormIsValid(valid);
  }, [formCopia]);

  const handleFormCopiaChange = (field: string, value: string) => {
    setFormCopia({ ...formCopia, [field]: value });
  };



  //items por defecto del nav bar
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
      <PageMetaModified
        title="Editar Curso"
        subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`}
        description="Formulario para editar curso por gestión"
      />
      <PageBreadcrumbModified pageTitle="Editar Curso" subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComponentCardModified>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400 mb-4">ICONO DE CURSO</h3>
            <img
              src={
                cursoGestion?.url_image
                  ? `${Server.CLOUDINARY_URL}/${cursoGestion.url_image}`
                  : defaultImage
              }
              alt="Imagen Curso"
              className="w-64 h-64 object-cover rounded-xl"
            />
            <Button size="sm" className="mt-4" onClick={() => setShowImageModal(true)}>
              Sube tu imagen
            </Button>
          </div>
        </ComponentCardModified>

        <ComponentCardModified>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400 mb-4">DATOS DEL CURSO</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input type="number" value={form.cantidad_reprobados} readonly={true}/>
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input type="number" value={form.cantidad_aprobados} readonly={true} />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input type="number" value={form.cantidad_abandono} readonly={true}/>
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

      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Subir nueva imagen</h2>
          <DropzoneComponent onUpload={handleUploadImage} />
        </div>
      </Modal>

      <Modal isOpen={showConfirmEditModal} onClose={() => setShowConfirmEditModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Editar datos del curso</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input type="number" value={formCopia.cantidad_reprobados} onChange={(e) => handleFormCopiaChange("cantidad_reprobados", e.target.value)} />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input type="number" value={formCopia.cantidad_aprobados} onChange={(e) => handleFormCopiaChange("cantidad_aprobados", e.target.value)} />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input type="number" value={formCopia.cantidad_abandono} onChange={(e) => handleFormCopiaChange("cantidad_abandono", e.target.value)} />
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
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" variant="outline" onClick={() => setShowConfirmEditModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleConfirmarActualizar} disabled={!formIsValid}>Confirmar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
