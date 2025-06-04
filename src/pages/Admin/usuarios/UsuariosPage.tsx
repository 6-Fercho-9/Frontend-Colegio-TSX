// import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
// import Input from "../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
// import { Modal } from "../../components/ui/modal";

import UsuarioTable from "./UsuarioTable";
import ComponentCardModified from "../../shared/ComponentCardModified";
// import Label from "../../components/form/Label";

export const UsuarioPage = () => {

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/registrar-usuario')
  }

  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Usuarios"
        description="Esta es la pagina de usuarios para el administrador"
      />
    <PageBreadcrumb pageTitle="Usuarios" />
      {/* esto es donde dinde Basic Tables o un header  */}
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
          <ComponentCardModified
            title="Tabla de Usuarios"
            action={
              <Button onClick={handleNavigate}>
                + Agregar
              </Button>
            }
            >
            <UsuarioTable/>

          </ComponentCardModified>
      
      </div>


       
    </>
  );
}
