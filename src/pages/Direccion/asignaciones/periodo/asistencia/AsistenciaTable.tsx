


import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import Button from "../../../../../components/ui/button/Button";
import Checkbox from "../../../../../components/form/input/Checkbox";
import { Asistencia } from "../../../../../services/interfaces/Aula-Estudiantil/IntegranteAsistencia";
import Server from "../../../../../services/API/server";
import default_image from "../../../../../assets/images/default_profile_2.png";

interface Props {
  asistencias: Asistencia[];
  setAsistencias: (asistencias: Asistencia[]) => void;
  editMode: boolean;
}

export default function AsistenciaEstudianteTable({ asistencias, setAsistencias, editMode }: Props) {
  const handleToggleAsistencia = (id: number) => {
    if (!editMode) return;
    const actualizados = asistencias.map((a) =>
      a.id === id ? { ...a, presente: !a.presente } : a
    );
    setAsistencias(actualizados);
  };

  const handleParticipacion = (id: number, delta: number) => {
    if (!editMode) return;
    const actualizados = asistencias.map((a) => {
      if (a.id === id) {
        const nuevaParticipacion = Math.max(0, a.participacion + delta);
        return { ...a, participacion: nuevaParticipacion };
      }
      return a;
    });
    setAsistencias(actualizados);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">ID</TableCell>
              <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Alumno</TableCell>
              <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">CI</TableCell>
              <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Asistencia</TableCell>
              <TableCell isHeader className="px-4 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">Participación</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {asistencias.map((a) => (
              <TableRow key={a.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <TableCell className="text-center text-sm text-gray-800 dark:text-white/90">{a.id}</TableCell>

                <TableCell className="text-sm text-gray-800 dark:text-white flex items-center justify-center gap-4 py-3">
                  <img
                     src={a.alumno.url_profile ? `${Server.CLOUDINARY_URL}/${a.alumno.url_profile}` : default_image}
                      alt={`Foto de ${a.alumno.nombre}`}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span>{a.alumno.nombre}</span>
                </TableCell>

                <TableCell className="text-center text-sm text-gray-700 dark:text-white/80">{a.alumno.ci}</TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={a.presente}
                      onChange={() => handleToggleAsistencia(a.id)}
                      disabled={!editMode}
                      className={
                        !editMode
                          ? "bg-gray-100 border-gray-300 text-gray-400 dark:bg-indigo-100 dark:border-indigo-400 dark:text-indigo-600"
                          : ""
                      }
                    />
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  {editMode ? (
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleParticipacion(a.id, -1)}
                        className="rounded-md px-2 py-1"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                      <span className="text-center text-sm text-gray-800 dark:text-white/90">{a.participacion}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleParticipacion(a.id, 1)}
                        className="rounded-md px-2 py-1"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700 dark:text-white/80">{a.participacion}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
