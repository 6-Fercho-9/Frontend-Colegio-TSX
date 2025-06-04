import { Outlet } from "react-router";
import NavBar from "./NavBar";



export default function PublicLayout() {
  return (
    <>
      <NavBar /> {/* Barra de navegación común para páginas no autenticadas */}
        {/* <Outlet /> */}
        
        <Outlet />
      
        {/* para rutas hijas */}
    </>
    
  );
}
