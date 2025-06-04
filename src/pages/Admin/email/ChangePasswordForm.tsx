import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { cambiarPassword } from "../../../services/Gestion_de_usuario/PasswordEmailService";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState({ password: false });
  const navigate = useNavigate();


  const email = localStorage.getItem("recuperacion_email") || "";

  const handleChangePassword = async () => {
    try {
      if (!password) {
        return Swal.fire({
          icon: "warning",
          title: "Campo vacío",
          text: "Por favor ingresa una contraseña.",
          confirmButtonColor: "#d33"
        });
      }

      await cambiarPassword(email, password);
      localStorage.removeItem("recuperacion_email");

      await Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
        confirmButtonColor: "#3085d6"
      });

      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Error al cambiar la contraseña.",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-[480px] pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Volver al Inicio
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-[480px] mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Nueva contraseña
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ingresa tu nueva contraseña para completar el proceso de recuperación.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label>
              Nueva Contraseña <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setInputError((prev) => ({ ...prev, password: false }));
                  setErrorMessage("");
                }}
                className={inputError.password ? "border-error-500" : ""}
              />
              <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>

            </div>
            {errorMessage && (
                <p className="mt-2 text-sm text-error-500">{errorMessage}</p>
              )}
          </div>

          <Button className="w-full" onClick={handleChangePassword}>
            Cambiar contraseña
          </Button>
        </div>

      </div>
    </div>
  );
}
