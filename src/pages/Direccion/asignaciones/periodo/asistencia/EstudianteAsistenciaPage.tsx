

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentArrowDownIcon, TableCellsIcon, CodeBracketIcon } from "@heroicons/react/24/solid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import ComponentCardModified from "../../../../shared/ComponentCardModified";
import NavigationTabs from "../../../../shared/NavegationBar";
import PageMetaModified from "../../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../../shared/PageBreadcrumbModified";

import Button from "../../../../../components/ui/button/Button";


import { Asistencia } from "../../../../../services/interfaces/Aula-Estudiantil/IntegranteAsistencia";
import { IISimpleCursoGestionMateriaPeriodo } from "../../../../../services/interfaces/Personal-Escolar/CursoGestionMateriaPeriodo";
import { getAsistencias, guardarCambios } from "../../../../../services/Aula-Estudiantil/AsistenciaService";
import AsistenciaEstudianteTable from "./AsistenciaTable";

import Swal from "sweetalert2";
import SwitchModified from "../../../../shared/SwitchModified";

export default function AsistenciaPage() {
  const { id } = useParams();
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [cgmp, setCgmp] = useState<IISimpleCursoGestionMateriaPeriodo>();
  const [editMode, setEditMode] = useState(false);

  const fetchAsistencias = async () => {
    try {
      
      const data = await getAsistencias(Number(id));
      setAsistencias(data.asistencias);
      setCgmp(data.curso_gestion_materia_periodo);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error al obtener asistencias", error);
    }
  };

  const handleGuardarCambios = async () => {
    try {
      
      const response = await guardarCambios(asistencias);
      setEditMode(false);
        await Swal.fire({
              title: "Datos actualizados",
              text: response.message,
              icon: "success",
              confirmButtonText: "Aceptar",
            });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error al guardar asistencias", error);
      setEditMode(false);
      await Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    if (id) fetchAsistencias();
  }, [id]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Alumno", "CI", "Presente", "Participación"]],
      body: asistencias.map(a => [
        a.id,
        a.alumno.nombre,
        a.alumno.ci,
        a.presente ? "Sí" : "No",
        a.participacion
      ])
    });
    doc.save("asistencias.pdf");
  };

  const exportToExcel = () => {
    const sheetData = asistencias.map(a => ({
      ID: a.id,
      Nombre: a.alumno.nombre,
      CI: a.alumno.ci,
      Presente: a.presente ? "Sí" : "No",
      Participación: a.participacion
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asistencia");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "asistencia.xlsx");
  };

    const exportToHTML = () => {
    const content = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Reporte de Asistencia</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 40px;
            color: #333;
          }
          h1 {
            text-align: center;
            color: #1f2937;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          th, td {
            padding: 12px 15px;
            border: 1px solid #ddd;
            text-align: center;
          }
          th {
            background-color: #4f46e5;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:hover {
            background-color: #eef2ff;
          }
        </style>
      </head>
      <body>
        <h1>Reporte de Asistencia</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Alumno</th>
              <th>CI</th>
              <th>Presente</th>
              <th>Participación</th>
            </tr>
          </thead>
          <tbody>
            ${asistencias.map(a => `
              <tr>
                <td>${a.id}</td>
                <td>${a.alumno.nombre}</td>
                <td>${a.alumno.ci}</td>
                <td>${a.presente ? "Sí" : "No"}</td>
                <td>${a.participacion}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const blob = new Blob([content], { type: "text/html" });
    saveAs(blob, "asistencia.html");
  };


  const resolvedNavItems = useMemo(() => [
    { label: "Periodos", path: `/materia/${cgmp?.curso_gestion_materia.id ?? 0}/periodos` },
    { label: "Informacion", path: `/materia-periodo/${cgmp?.curso_gestion_materia.id ?? 0}/info` },
    { label: "Actividades", path: `/materia-periodo/${cgmp?.id ?? 0}/actividades` },
    { label: "Notas", path: `/materia-periodo/${cgmp?.id ?? 0}/notas` },
    { label: "Asistencia", path: `/materia-periodo/${cgmp?.id ?? 0}/asistencias` },
  ], [cgmp]);

  return (
    <>
      <NavigationTabs
        items={resolvedNavItems}
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
      />

      <PageMetaModified
        title={`Asistencia - ${cgmp?.curso_gestion_materia.materia.nombre ?? "..."}`}
        subtitle={
          cgmp
            ? `${cgmp.curso_gestion_materia.curso_gestion.curso.nombre} (${cgmp.curso_gestion_materia.curso_gestion.gestion.nombre}) - ${cgmp.periodo.nombre}`
            : "Cargando..."
        }
        description="Registro de asistencia y participación de estudiantes"
      />

      <PageBreadcrumbModified
        pageTitle={`Gestión ${cgmp?.curso_gestion_materia.curso_gestion.gestion.nombre ?? "..."} - ${cgmp?.curso_gestion_materia.curso_gestion.curso.nombre ?? "..."}`}
        subtitle={cgmp ? `MATERIA ${cgmp.curso_gestion_materia.materia.nombre}` : "Cargando..."}
      />

      <div className="space-y-6">
        <ComponentCardModified
          title="Registro de Asistencia"
          action={
            <div className="flex gap-2 items-center">
              <SwitchModified
                label="Modo edición"
                checked={editMode} 
                onChange={(checked: boolean) => setEditMode(checked)}
              />
              <Button onClick={handleGuardarCambios} size="sm">
                Guardar Cambios
              </Button>
              <button onClick={exportToPDF} className="flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-all">
                <DocumentArrowDownIcon className="w-5 h-5" />
                PDF
              </button>
              <button onClick={exportToExcel} className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white transition-all">
                <TableCellsIcon className="w-5 h-5" />
                Excel
              </button>
              <button onClick={exportToHTML} className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                <CodeBracketIcon className="w-5 h-5" />
                HTML
              </button>
            </div>
          }
        >
          <AsistenciaEstudianteTable
            asistencias={asistencias}
            setAsistencias={setAsistencias}
            editMode={editMode}
          />
        </ComponentCardModified>
      </div>
    </>
  );
}
