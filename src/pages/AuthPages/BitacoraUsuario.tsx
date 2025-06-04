import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BitacoraTable from "./TableBitacora";

export const BitacoraUsuario = () => {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Bitacora de Usuario"
        description="Esta es la pagina de bitacora de usuario"
      />
      {/* esto es donde dinde Basic Tables o un header  */}
      <PageBreadcrumb pageTitle="Bitacora" />
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
        <ComponentCard title="Tabla de Sesiones">
          
          {/* crea la tabla ya con todos los datos */}
          
          <BitacoraTable/>
        </ComponentCard>
        
      </div>
    </>
  );
}