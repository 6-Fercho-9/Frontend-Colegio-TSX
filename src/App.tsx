import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";

import NotFound from "./pages/OtherPage/NotFound";

import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import PublicLayout from "./pages/Home/PublicLayout";
// import Welcome from "./pages/Home/Welcome";
// import { BitacoraUsuario } from "./pages/AuthPages/BitacoraUsuario";
// import { RolPermisoPage } from "./pages/AuthPages/RolPermisoPage";
import { MarcaPage } from "./pages/AuthPages/MarcaPage";
import { CategoriaPage } from "./pages/Direccion/categorias/CategoriaPage";
import { ModeloPage } from "./pages/AuthPages/ModeloPage";
// import { UsuarioPage } from "./pages/AuthPages/UsuariosPage";

// import { PermisoAsignacionPage } from "./pages/AuthPages/PermisoAsignacionPage";
// import UserAdminProfiles from "./pages/AuthPages/UsuarioEditPage";
import RegistrarUsuario from "./pages/AuthPages/RegistroPage";

import Unauthorized from "./pages/OtherPage/Unauthorized";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { ProtectedRoute } from "./pages/guard/ProtectedRoute";
import UserAdminProfiles from "./pages/Admin/usuarios/UsuarioEditPage";
import { BitacoraUsuario } from "./pages/Admin/bitacora/BitacoraUsuario";
import { RolPermisoPage } from "./pages/Admin/rol-permisos/RolPermisoPage";
import { PermisoAsignacionPage } from "./pages/Admin/rol-permisos/asignacion/PermisoAsignacionPage";
import { UsuarioPage } from "./pages/Admin/usuarios/UsuariosPage";
import HomePage from "./pages/Home/HomePage";
import UserProfiles from "./pages/Admin/usuarios/UserProfiles";
import { CursosPage } from "./pages/Direccion/cursos/CursoPage";
import { GestionPage } from "./pages/Direccion/gestion/GestionPage";
import MateriaPage from "./pages/Direccion/materias/MateriaPage";
import AsignacionCursoPage from "./pages/Direccion/asignaciones/cursos/AsigacionCursoPage";
import CursoGestionEditPage from "./pages/Direccion/asignaciones/cursos/CursoGestionEditPage";
import AsignacionMateriasPage from "./pages/Direccion/asignaciones/materias/AsignacionMateriasPage";
import CursoGestionMateriaEditPage from "./pages/Direccion/asignaciones/materias/EditMateriaPage";
import { TestPage } from "./pages/shared/TestPage";
// import ListadoMateriasPage from "./pages/shared/ListadoCursoMateriaPage";
import MateriasPrincipalPage from "./pages/Direccion/asignaciones/materias/MateriasPrincipalPage";

import CursoIntegrantesPage from "./pages/Direccion/asignaciones/cursos/CursoIntegrantesPage";
import CursoInscripcionPage from "./pages/Direccion/asignaciones/cursos/CursoInscripcionPage";
  import {PeriodosPage} from "./pages/Direccion/periodos/PeriodosPage";
import {DocentesPage} from "./pages/Direccion/docentes/DocentesPage";
import RegistrarDocente from "./pages/Direccion/docentes/RegistrarDocentePage";






import ForgotPassword from "./pages/Admin/email/ForgotPassword";
import VerificarCodePage from "./pages/Admin/email/VerificarCode";
import ChangePasswordPage from "./pages/Admin/email/ChangePasswordPage";
//import MateriaPeriodoPage from "./pages/Direccion/asignaciones/periodo/MateriaPeriodoPage";
import MateriaPeriodoInfoPage from "./pages/Direccion/asignaciones/periodo/Informacion/InformacionPage";
// import DocenteMateriaPage from "./pages/Direccion/asignaciones/materias/DocenteMateriaPage";
import MateriaPeriodoPage from "./pages/Direccion/asignaciones/periodo/MateriaPeriodoPage";
import EstudiantePage from "./pages/Direccion/asignaciones/periodo/integrantes/EstudiantePage";
import EstudianteAsistenciaPage from "./pages/Direccion/asignaciones/periodo/asistencia/EstudianteAsistenciaPage";
import ActividadesPage from "./pages/Direccion/asignaciones/periodo/actividades/ActividadesPage";

// import { AuthProvider } from "./context/AuthContext.tsx";


export default function App() {
  return (
    <>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index path="/" element={<HomePage />} />
            </Route>
            {/* Dashboard Layout */}
            {/* <AuthProvider> */}
              <Route element={<AppLayout />}>
              

              {/* <Route path="/usuarios" element={
                      <ProtectedRoute rolesAllowed={["ADMINISTRADOR"]}>
                        <UsuarioPage />
                      </ProtectedRoute>
                    } /> otra manera de hacerlo*/}
                    <Route
                      element={
                        <ProtectedRoute rolesAllowed={["ADMINISTRADOR","ALUMNO"]}>
                          <Outlet />
                        </ProtectedRoute>
                      }
                    >
                      <Route index path="/home" element={<Home />} />
                      <Route path="/profile" element={<UserProfiles />} />

                    </Route>
                    

                    <Route
                      element={
                        <ProtectedRoute rolesAllowed={["ADMINISTRADOR"]}>
                          <Outlet />
                        </ProtectedRoute>
                      }
                    >
                      {/* <Route index path="/home" element={<Home />} /> */}
                      <Route path="/profile/usuario/:id" element={<UserAdminProfiles />} />
                      <Route path="/bitacora-usuario" element={<BitacoraUsuario />} />
                      <Route path="/roles-permisos" element={<RolPermisoPage />} />
                      <Route path="/roles-permisos/rol/:id" element={<PermisoAsignacionPage />} />
                      <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
                      <Route path="/marcas" element={<MarcaPage />} />
                      <Route path="/categorias" element={<CategoriaPage />} />
                      <Route path="/modelos" element={<ModeloPage />} />
                      <Route path="/usuarios" element={<UsuarioPage />} />
                      <Route path="/docentes" element={<DocentesPage/>} />
                      <Route path="/registrar-docente" element={<RegistrarDocente />} />
                      <Route path="/usuarios/usuario/:id" element={<UserAdminProfiles />} />
                      <Route path="/cursos" element={<CursosPage/>}/>
                      <Route path="/gestiones" element={<GestionPage/>}/>
                      <Route path= "/categorias" element={<CategoriaPage/>}/>
                      <Route path="/periodos" element={<PeriodosPage/>}/>
                      {/* <Route path="/periodos" element={<PeriodoPage/>}/> */}
                      <Route path="/materias" element={<MateriaPage/>}/>
                      <Route path="/asignacion-cursos" element={<AsignacionCursoPage/>}/>
                      <Route path="/curso-gestion/:id" element={<CursoGestionEditPage/>}/>
                      <Route path="/asignacion-materias" element={<AsignacionMateriasPage/>}/>
                      <Route path="/materiaPage" element={<CursoGestionMateriaEditPage/>}/>
                      <Route path="/area-personal" element={<TestPage/>}/>
                      <Route path="/curso-gestion/:id/materias" element={<MateriasPrincipalPage/>}/>
                      <Route path="/curso-gestion/:id/materia/:id/data" element={<MateriasPrincipalPage/>}/>
                      <Route path="/curso-gestion/:id/inscripcion" element={<CursoInscripcionPage/>}/>
                      <Route path="/curso-gestion/:id/integrantes" element={<CursoIntegrantesPage/>}/>
                      
                      
                      <Route path="/materia/:id/periodos" element={<MateriaPeriodoPage/>}/>
                      {/* <Route path="/materia/:id/periodos" element={<DocenteMateriaPage/>}/> */}
                      <Route path="/materia-periodo/:id/info" element={<MateriaPeriodoInfoPage/>}/>
                      <Route path="/materia-periodo/:id/notas" element={<EstudiantePage/>}/>
                      <Route path="/materia-periodo/:id/asistencias" element={<EstudianteAsistenciaPage/>}/>
                      <Route path="/materia-periodo/:id/actividades" element={<ActividadesPage/>}/>
                      
                    </Route>

                                        

                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/blank" element={<Blank />} />

                    {/* Forms */}
                    <Route path="/form-elements" element={<FormElements />} />

                    {/* Tables */}
                    <Route path="/basic-tables" element={<BasicTables />} />

                    {/* Ui Elements */}
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/avatars" element={<Avatars />} />
                    <Route path="/badge" element={<Badges />} />
                    <Route path="/buttons" element={<Buttons />} />
                    <Route path="/images" element={<Images />} />
                    <Route path="/videos" element={<Videos />} />

                    {/* Charts */}
                    <Route path="/line-chart" element={<LineChart />} />
                    <Route path="/bar-chart" element={<BarChart />} />
              </Route>
            {/* </AuthProvider> */}

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/verificar-codigo" element={<VerificarCodePage/>} />
            <Route path="/cambiar-password" element={<ChangePasswordPage/>} />
            

            {/* Fallback Route */}
            {/* ruta de errores, se dispara cuando accedemos a una ruta no definida */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Router>
        
    </>
  );
}
