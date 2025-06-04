import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../AuthPages/AuthPageLayout";
import SignInForm from "./forms/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Login"
        description="Esta es nuestra aplicacion"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
