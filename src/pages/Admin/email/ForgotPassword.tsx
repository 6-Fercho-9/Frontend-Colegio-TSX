import PageMeta from "../../../components/common/PageMeta";
import AuthLayoutModified from "../../shared/AuthLayoutModified";

import ForgotPasswordForm from "./ForgotPasswordForm";



export default function ForgotPassword() {
  return (
    <>
      <PageMeta title="Olvidé mi contraseña" description="Recupera tu acceso" />
      <AuthLayoutModified>
        <ForgotPasswordForm />
      </AuthLayoutModified>
    </>
  );
}
