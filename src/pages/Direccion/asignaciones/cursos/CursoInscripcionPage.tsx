
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";


// import { CursoGestionEdit } from "../../../../services/interfaces/Personal-Escolar/Curso";

import { get_curso_gestion_data} from "../../../../services/Personal-Academico/CursoGestionService";

import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";

import NavigationTabs from "../../../shared/NavegationBar";
import GraficoModificado from "../../../../components/ecommerce/GraficoModificado";
import { CursoGestionEdit } from "../../../../services/interfaces/Personal-Escolar/CursoGestion";
import { getMateriasInscritos } from "../../../../services/Personal-Academico/CursoGestionService";


export default function CursoInscripcionPage() {
  const { id } = useParams();
  const [cursoGestion, setCursoGestion] = useState<CursoGestionEdit | null>(null);

  const [form, setForm] = useState({
    cantidad_total_cupos: "0",
    cantidad_total_inscritos: "0",
    fecha_inicio: "",
    fecha_fin: ""
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formCopia, setFormCopia] = useState({
    cantidad_total_cupos: "0",
    cantidad_total_inscritos: "0",
    fecha_inicio: "",
    fecha_fin: ""
  });

  useEffect(() => {
    if (id) {
      fetchMateriasInscritas(parseInt(id));
    }
  }, [id]);

  const fetchMateriasInscritas = async (id: number) => {
    try {
      const data = await getMateriasInscritos(id);
      const nuevoEstado = {
        cantidad_total_cupos: data.cantidad_total_cupos.toString() || "0",
        cantidad_total_inscritos: data.cantidad_total_inscritos.toString() || "0",
        fecha_inicio: data.fecha_inicio.toString() || "0",
        fecha_fin: data.fecha_fin.toString() || "0"
      };
      setForm(nuevoEstado);
      setFormCopia(nuevoEstado);
    } catch (error) {
      console.error("Error al obtener inscritos del curso gestión:", error);
    }
  };

    useEffect(() => {
    if (id) {
      fetchCursoGestionData(parseInt(id));
    }
  }, [id]);

  const fetchCursoGestionData = async (id: number) => {
    try {
      const data = await get_curso_gestion_data(id);
      setCursoGestion(data);
    } catch (error) {
      console.error("Error al obtener datos del curso gestión:", error);
    }
  };

  const porcentaje = (Number(form.cantidad_total_inscritos) / Number(form.cantidad_total_cupos)) * 100;
  const porcentajeRedondeado = parseFloat(porcentaje.toFixed(2));

  return (
    <>
      <NavigationTabs
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      />
      <PageMetaModified
        title="Inscripción Curso"
        subtitle={`INSCRIPCIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`}
        description="Formulario para editar curso por gestión"
      />
      <PageBreadcrumbModified pageTitle="Inscripción Curso" subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <ComponentCardModified>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400 mb-4">DATOS DEL CURSO</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Cantidad total cupos:</Label>
              <Input type="number" value={form.cantidad_total_cupos} readonly={true}/>
              <Label> </Label>
            </div>
            <div>
              <Label>Cantidad inscritos</Label>
              <Input type="number" value={form.cantidad_total_inscritos} readonly={true} />
            </div>
            <div>
              <Label>Fecha inicio</Label>
              <Input type="string" value={form.fecha_inicio} readonly={true}/>
            </div>
            <div>
              <Label>Fecha fin</Label>
              <Input type="string" value={form.fecha_fin} readonly={true}/>
            </div>
          </div>
        </ComponentCardModified>
        <div>
          <GraficoModificado series={new Float32Array([porcentajeRedondeado])} curso={cursoGestion?.curso.nombre} ></GraficoModificado>
        </div>
      </div>

    </>
  );
}
