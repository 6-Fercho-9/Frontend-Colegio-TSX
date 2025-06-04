import PageMeta from "../../../components/common/PageMeta";
import AuthLayoutModified from "../../shared/AuthLayoutModified";
import ChangePasswordForm from "./ChangePasswordForm";




export default function ChangePasswordPage() {
  return (
    <>
      <PageMeta title="Olvidé mi contraseña" description="Recupera tu acceso" />
      <AuthLayoutModified>
        <ChangePasswordForm/>
      </AuthLayoutModified>
    </>
  );
}
