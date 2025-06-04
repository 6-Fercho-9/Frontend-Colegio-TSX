import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCodigoConfirmacion } from "../../../services/Gestion_de_usuario/PasswordEmailService";
import { ChevronLeftIcon } from "../../../icons";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState({ email: false });
   const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      if (!email) {
        setInputError({ email: true });
        setErrorMessage("Por favor ingresa tu email.");
        return;
      }
      setLoading(true);
      localStorage.setItem("recuperacion_email", email);
      await getCodigoConfirmacion(email);

      await Swal.fire({
        icon: "success",
        title: "Código enviado",
        text: "Hemos enviado un código a tu correo electrónico.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/verificar-codigo");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo enviar el correo.",
        confirmButtonColor: "#d33",
      });
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Botón de regreso arriba */}
      <div className="w-full max-w-[480px] pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Volver al Inicio
        </Link>
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-[480px] mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            ¿Olvidaste tu Contraseña?
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ingresa tu correo y te enviaremos un código para recuperarla.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label>
              Email <span className="text-error-500">*</span>
            </Label>
            <Input
              placeholder="tuCuenta@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setInputError({ email: false });
                setErrorMessage("");
              }}
              className={inputError.email ? "border-error-500" : ""}
              disabled={loading} 
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-error-500">{errorMessage}</p>
            )}
          </div>

          <div>
            <Button onClick={handleSendCode} className="w-full" size="sm" disabled={loading}
            >
             {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <ArrowPathIcon className="w-4 h-4 border-white" />
                  Enviando...
                </div>
              ) : (
                "Enviar código"
              )}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-body-color dark:text-white/70">
            ¿Recordaste tu contraseña?{" "}
            <Link to="/" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
