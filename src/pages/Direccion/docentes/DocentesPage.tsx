import { useNavigate } from "react-router";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import DocenteTable from "./DocenteTable";
import ComponentCardModified from "../../shared/ComponentCardModified";

export const DocentesPage = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/registrar-docente')
  }

	return (
		    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Docentes"
        description="Esta es la pagina de docentes para el administrador"
      />
    <PageBreadcrumb pageTitle="Docentes" />
      {/* esto es donde dinde Basic Tables o un header  */}
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
          <ComponentCardModified
            title="Tabla de Docentes"
            action={
              <Button onClick={handleNavigate}>
                + Agregar
              </Button>
            }
            >
            <DocenteTable/>

          </ComponentCardModified>
      
      </div>
    </>
	);
};