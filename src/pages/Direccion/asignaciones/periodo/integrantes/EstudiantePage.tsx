
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { DocumentArrowDownIcon, TableCellsIcon, CodeBracketIcon } from "@heroicons/react/24/solid";
import ComponentCardModified from "../../../../shared/ComponentCardModified";
import EstudianteTable from "./EstudianteTable";
import PageMetaModified from "../../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../../shared/PageBreadcrumbModified";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ReactApexChart from "react-apexcharts";
// import Swal from "sweetalert2";
import { getIntegrantesPorCursoGestionMateriaPeriodo } from "../../../../../services/Aula-Estudiantil/IntegranteService";
import { AlumnoAutoEvaluacion} from "../../../../../services/interfaces/Aula-Estudiantil/IntegranteCGMP";
import { IISimpleCursoGestionMateriaPeriodo } from "../../../../../services/interfaces/Personal-Escolar/CursoGestionMateriaPeriodo";
import NavigationTabs from "../../../../shared/NavegationBar";

export default function EstudiantePage() {
  const { id } = useParams();
  const [estudiantes, setEstudiantes] = useState<AlumnoAutoEvaluacion[]>([]);
  const [cgmp, setCgmp] = useState<IISimpleCursoGestionMateriaPeriodo>();

  const fetchEstudiantes = async () => {
    try {
      const data = await getIntegrantesPorCursoGestionMateriaPeriodo(Number(id));
      setEstudiantes(data.integrantes);
      setCgmp(data.curso_gestion_materia_periodo);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error:any) {
      console.log("vacio xd")
    }
  };

  useEffect(() => {
    if (id) fetchEstudiantes();
  }, [id]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Alumno", "CI", "Nota", "Ser", "Decidir"]],
      body: estudiantes.map(est => [
        est.id,
        est.nombre,
        est.ci,
        est.nota ?? "-",
        est.ser ?? "-",
        est.decidir ?? "-"
      ])
    });
    doc.save("reporte_estudiantes.pdf");
  };

  const exportToExcel = () => {
    const sheetData = estudiantes.map(est => ({
      ID: est.id,
      Nombre: est.nombre,
      CI: est.ci,
      Nota: est.nota ?? "-",
      Ser: est.ser ?? "-",
      Decidir: est.decidir ?? "-"
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "reporte_estudiantes.xlsx");
  };

  const exportToHTML = () => {
    const content = `
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Reporte de Estudiantes</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
          th { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>Reporte de Estudiantes</h1>
        <table>
          <thead>
            <tr><th>ID</th><th>Alumno</th><th>CI</th><th>Nota</th><th>Ser</th><th>Decidir</th></tr>
          </thead>
          <tbody>
            ${estudiantes.map(est => `
              <tr>
                <td>${est.id}</td>
                <td>${est.nombre}</td>
                <td>${est.ci}</td>
                <td>${est.nota ?? "-"}</td>
                <td>${est.ser ?? "-"}</td>
                <td>${est.decidir ?? "-"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const blob = new Blob([content], { type: "text/html" });
    saveAs(blob, "reporte_estudiantes.html");
  };

  const chartOptions = useMemo(() => ({
    chart: { id: "notas-chart" },
    xaxis: { categories: estudiantes.map(est => est.nombre) },
    colors: ["#2563eb"]
  }), [estudiantes]);

  const chartSeries = useMemo(() => ([{
    name: "Nota Final",
    data: estudiantes.map(est => est.nota ?? 0)
  }]), [estudiantes]);

   const resolvedNavItems = useMemo(() => [
    // { label: "Principal", path: "/asignacion-cursos" },
    // { label: "Curso", path: `/curso-gestion/${cgmp?.curso_gestion_materia.curso_gestion.id ?? 0}` },
    // { label: "Materias", path: `/curso-gestion/${cgmp?.curso_gestion_materia.curso_gestion.id ?? 0}/materias` },
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
        title={`Estudiantes - ${cgmp?.curso_gestion_materia.materia.nombre ?? "..."}`}
        subtitle={
          cgmp
            ? `${cgmp.curso_gestion_materia.curso_gestion.curso.nombre} (${cgmp.curso_gestion_materia.curso_gestion.gestion.nombre}) - ${cgmp.periodo.nombre}`
            : "Cargando..."
        }
        description="Listado de estudiantes para la materia en el periodo actual."
      />

      <PageBreadcrumbModified
        pageTitle={`Gestión ${cgmp?.curso_gestion_materia.curso_gestion.gestion.nombre ?? "..."} - ${cgmp?.curso_gestion_materia.curso_gestion.curso.nombre ?? "..."}`}
        subtitle={cgmp ? `MATERIA ${cgmp.curso_gestion_materia.materia.nombre}` : "Cargando..."}
      />
      <div className="space-y-6">
        <ComponentCardModified
          title="Lista de Estudiantes"
          action={

            <div className="flex gap-2">
              <button onClick={exportToPDF} className="flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-all">
                <DocumentArrowDownIcon className="w-5 h-5" /> PDF
              </button>
              <button onClick={exportToExcel} className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white transition-all">
                <TableCellsIcon className="w-5 h-5" /> Excel
              </button>
              <button onClick={exportToHTML} className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                <CodeBracketIcon className="w-5 h-5" /> HTML
              </button>
            </div>
          }
        >
          <EstudianteTable estudiantes={estudiantes} onActualizarEstudiantes={fetchEstudiantes} />
        </ComponentCardModified>

        <ComponentCardModified title="Gráfico de Notas Finales">
          <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
        </ComponentCardModified>
      </div>
    </>
  );
}
