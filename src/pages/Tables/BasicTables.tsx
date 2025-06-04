import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";


export default function BasicTables() {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/* esto es donde dinde Basic Tables o un header  */}
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
        <ComponentCard title="Basic Table 1">
          
          {/* crea la tabla ya con todos los datos */}
          <BasicTableOne />
          {/* <TableThree/> */}
        </ComponentCard>
      </div>
    </>
  );
}
