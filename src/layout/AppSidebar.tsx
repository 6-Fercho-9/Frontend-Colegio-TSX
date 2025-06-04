import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  // BoxCubeIcon,
  // CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  // PageIcon,
  // PieChartIcon,
  // PlugInIcon,
  // TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { AuthContext } from "../pages/Context/AuthContext";
// import SidebarWidget from "./SidebarWidget";
//import { checkAuth } from "../services/authService";
//import { Usuario } from "../services/interfaces/usuarios";



// DEFINIMOS UNA INTERFACE
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { icon?: React.ReactNode ,name: string; path: string; pro?: boolean; new?: boolean }[];
  roles?: string[];
};

//ESTE MUESTRA LA PARTE DEL MENU
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
    //roles: ["ADMINISTRADOR"]
  },
    {
      //icono
    icon: <UserCircleIcon />,
    name: "Gestion de Usuario",
    subItems: [
      { 
        name: "Perfil de usuario",
         path: "/profile",
          pro: false },
      { name: "Bitacora de usuario", path: "/bitacora-usuario", pro: false },
      { name: "Roles y Permisos", path: "/roles-permisos", pro: false },
      { name: "Usuarios", path: "/usuarios", pro: false },
    ],
  },
  {
      //icono
    icon: <UserCircleIcon />,
    name: "Personal Academico",
    subItems: [
      { 
        name: "Gestiones",
         path: "/gestiones",
          pro: false },
          { name: "Cursos", path: "/cursos", pro: false },
          { name: "Materias", path: "/materias", pro: false },
      { name: "Periodos", path: "/periodos", pro: false },
      { name: "Asignacion de Cursos", path: "/asignacion-cursos", pro: false },
      
      // { name: "Asignacion de Materias", path: "/asignacion-materias", pro: false },
      // { name: "Asignacion de Docentes", path: "/asignacion-docentes", pro: false },
      { name: "Docentes", path: "/docentes", pro: false },
      
    ],
  },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "Perfil de usuario",
  //   path: "/profile",
  // },

  {
      //icono
    icon: <ListIcon />,
    name: "Gestion de Productos",
    subItems: [
      { 
        name: "Marcas",
         path: "/marcas",
          pro: false },
      { name: "Categorias", path: "/categorias", pro: false },
      { name: "Modelos", path: "/modelos", pro: false },
      { name: "Productos", path: "/productos", pro: false },
    ],
  },
  

  
 
  // {
  //   name: "Formularios",
  //   icon: <ListIcon />,
  //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  // },
  // {
  //   name: "Tables",
  //   icon: <TableIcon />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  //   //roles:["USUARIO"]
  // },
  // {
  //   name: "Pages",
  //   icon: <PageIcon />,
  //   subItems: [
  //     { name: "Blank Page", path: "/blank", pro: false },
  //     { name: "404 Error", path: "/error-404", pro: false },
  //   ],
  // },
];
// este es el que muestra la parte de OTHERS
// const othersItems: NavItem[] = [
//   {
//     icon: <PieChartIcon />,
//     name: "Charts",
//     subItems: [
//       { name: "Line Chart", path: "/line-chart", pro: false },
//       { name: "Bar Chart", path: "/bar-chart", pro: false },
//     ],
//     roles: ["ADMIN"]
//   },
//   {
//     icon: <BoxCubeIcon />,
//     name: "UI Elements",
//     subItems: [
//       { name: "Alerts", path: "/alerts", pro: false },
//       { name: "Avatar", path: "/avatars", pro: false },
//       { name: "Badge", path: "/badge", pro: false },
//       { name: "Buttons", path: "/buttons", pro: false },
//       { name: "Images", path: "/images", pro: false },
//       { name: "Videos", path: "/videos", pro: false },
//     ],
//   },
//   {
//     icon: <PlugInIcon />,
//     name: "Authentication",
//     subItems: [
//       { name: "Sign In", path: "/signin", pro: false },
//       { name: "Sign Up", path: "/signup", pro: false },
//     ],
//   },
// ];
//?funciona


  const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
 
  
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  //const [ usuario, setUsuario ] = useState<Usuario | null>(null);
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("error en el contexto");
  }
  const {user} = context;
  
  const [ filteredNavItems, SetFilteredNavItems ] = useState<NavItem[] | null>(null);



  const fnfilteredNavItems: NavItem[] = navItems.filter(item =>{
    
    return item.roles?.includes(user?.rol?.nombre ?? "USUARIO" )
   });

  useEffect(() => {
    const fetchUser = async () => {
      //const data = await checkAuth();

      //console.log(`user del fetch appsidebar ${data.user.rol?.nombre}`)
      //if(data.user){
        //setUsuario(data.user);
        if(user){
          console.log(`usuario metodo ${user?.rol?.nombre}`)      
          SetFilteredNavItems(fnfilteredNavItems);
        }
      //}
    }
    fetchUser();
  },[user]);

  console.log(`usuario ${user?.rol?.nombre}`)
  console.log(filteredNavItems);
  //console.log(`filtradas ${JSON.stringify(fnfilteredNavItems)}`)
  
  
   
   
      
  

  // useEffect(() => {
  //   let submenuMatched = false;
  //   ["main", "others"].forEach((menuType) => {
  //     //podria cambiarse aqui por los navItems filtrados
  //     const items = menuType === "main" ? navItems : othersItems;
  //     items.forEach((nav, index) => {
  //       if (nav.subItems) {
  //         nav.subItems.forEach((subItem) => {
  //           if (isActive(subItem.path)) {
  //             setOpenSubmenu({
  //               type: menuType as "main" | "others",
  //               index,
  //             });
  //             submenuMatched = true;
  //           }
  //         });
  //       }
  //     });
  //   });

  //   if (!submenuMatched) {
  //     setOpenSubmenu(null);
  //   }
  // }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[] | null, menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items?.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {/* {renderMenuItems(filteredNavItems, "main")} */}
              {renderMenuItems(navItems,"main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {/* {renderMenuItems(othersItems, "others")} */}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
