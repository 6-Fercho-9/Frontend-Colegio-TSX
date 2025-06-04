import { useLocation, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";

interface NavItem {
  label: string;
  path: string;
}

interface NavigationTabsProps {
  items?: NavItem[];
  className?: string;
  activeClassName?: string;
  defaultClassName?: string;
  hoverClassName?: string;
  underlineClassName?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Principal", path: "/asignacion-cursos" },
  { label: "Curso", path: "/curso-gestion/:id" },
  { label: "Materias", path: "/curso-gestion/:id/materias" },
  { label: "Integrantes", path: "/curso-gestion/:id/integrantes" },
  { label: "Inscripcion", path: "/curso-gestion/:id/inscripcion" },
];

export default function NavigationTabs({
  items = defaultNavItems,
  className = "",
  activeClassName = "text-blue-600 dark:text-blue-400",
  defaultClassName = "text-gray-600 dark:text-white/60",
  hoverClassName = "hover:text-blue-500 dark:hover:text-blue-300",
  underlineClassName = "bg-blue-600 dark:bg-blue-400",
}: NavigationTabsProps) {
  const {id} = useParams()
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={clsx("w-full border-b border-gray-200 dark:border-white/10", className)}>
      <div className="flex gap-6 px-4 md:px-8 pt-4">
        {items.map((item) => {
          console.log(`ingrese al renderizado del navigation`)
          const path = item.path.replace(":id", id ?? "0"); // puedes validar mejor aquí
          const isActive = location.pathname === path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(path)}
              className={clsx(
                "pb-2 text-sm font-medium transition-colors duration-300 relative",
                defaultClassName,
                hoverClassName,
                isActive && activeClassName
              )}
            >
              {item.label}
              {isActive && (
                <span 
                  className={clsx(
                    "absolute left-0 -bottom-[2px] h-[2px] w-full rounded",
                    underlineClassName
                  )} 
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}