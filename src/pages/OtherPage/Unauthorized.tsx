import GridShape from "../../components/common/GridShape";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="Unauthorized Access"
        description="No tienes permisos para acceder a esta pagina"
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />

        <div className="mx-auto w-full text-center max-w-[472px]">
          <h1 className="text-[96px] sm:text-[120px] font-extrabold text-brand-500 leading-none mb-4">
            403
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            UNAUTHORIZED
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6">
            No tienes permisos para acceder a esta página.
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Volver A Inicio
          </button>
        </div>

        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - TailAdmin
        </p>
      </div>
    </>
  );
}
