// import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
// import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
// import { Modal } from "../../components/ui/modal";
import ComponentCardModified from "./ComponentCardModified";
import TableProducto from "./ProductosTable";
// import Label from "../../components/form/Label";

export const ProductosMainPage = () => {

  const navigate = useNavigate()
  const handleCrearProducto = () => {
    navigate('/crear-producto')
  }

  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Productos"
        description="Esta es la pagina de productos para el administrador"
      />
    <PageBreadcrumb pageTitle="Productos" />
      {/* esto es donde dinde Basic Tables o un header  */}
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
          <ComponentCardModified
            title="Tabla de Productos"
            action={
              <Button onClick={handleCrearProducto}>
                + Agregar
              </Button>
            }
            >
            <TableProducto/>

          </ComponentCardModified>
      
      </div>


       
    </>
  );
}
