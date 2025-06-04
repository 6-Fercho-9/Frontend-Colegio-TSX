import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../AuthPages/AuthPageLayout";
import SignUpForm from "./forms/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Registro de usuarios"
        description="Esta es la pagina para registro de usuarios"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
