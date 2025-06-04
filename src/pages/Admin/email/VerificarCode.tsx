import PageMeta from "../../../components/common/PageMeta";
import AuthLayoutModified from "../../shared/AuthLayoutModified";
import VerifyCodeForm from "./VerifyCodeForm";





export default function VerificarCodePage() {
  return (
    <>
      <PageMeta title="Verificar Codigo" description="Recupera tu acceso" />
      <AuthLayoutModified>
        <VerifyCodeForm />
      </AuthLayoutModified>
    </>
  );
}
