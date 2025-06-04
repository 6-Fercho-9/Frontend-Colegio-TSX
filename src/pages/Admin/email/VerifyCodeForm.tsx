// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { compararCodigoConfirmacion } from "../../../services/Gestion_de_usuario/PasswordEmailService";
// import Swal from "sweetalert2";

// export default function VerifyCodePage() {
//   const [codigo, setCodigo] = useState("");
//   const navigate = useNavigate();
//   const email = localStorage.getItem("recuperacion_email") || "";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await compararCodigoConfirmacion(email, codigo);
//       Swal.fire({
//         icon: "success",
//         title: "Código verificado",
//         text: "Puedes cambiar tu contraseña.",
//         confirmButtonColor: "#3085d6"
//       });
//       navigate("/cambiar-password");
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Código incorrecto",
//         text: err.message || "Intenta nuevamente.",
//         confirmButtonColor: "#d33"
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded bg-white">
//       <h2 className="text-xl font-semibold mb-4">Verifica tu código</h2>
//       <form onSubmit={handleSubmit}>
//         <label className="block mb-2 text-sm font-medium">Código de confirmación</label>
//         <input
//           type="text"
//           value={codigo}
//           maxLength={8}
//           onChange={e => setCodigo(e.target.value.toUpperCase())}
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Verificar Código
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { compararCodigoConfirmacion } from "../../../services/Gestion_de_usuario/PasswordEmailService";
import Swal from "sweetalert2";
import Label from "../../../components/form/Label";
import Button from "../../../components/ui/button/Button";
import { ChevronLeftIcon } from "../../../icons";

export default function VerifyCodeForm() {
  const [codigo, setCodigo] = useState(Array(8).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("recuperacion_email") || "";
  const isCodigoCompleto = codigo.every((char) => char !== "");



  const handleChange = (value: string, index: number) => {
    if (!/^[A-Za-z0-9]?$/.test(value)) return;
    const newCode = [...codigo];
    newCode[index] = value.toUpperCase();
    setCodigo(newCode);

    if (value && index < 7) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      const newCode = [...codigo];
      newCode[index - 1] = "";
      setCodigo(newCode);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = codigo.join("");
    try {
      await compararCodigoConfirmacion(email, joinedCode);
      Swal.fire({
        icon: "success",
        title: "Código verificado",
        text: "Puedes cambiar tu contraseña.",
        confirmButtonColor: "#3085d6",
      });
      navigate("/cambiar-password");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Código incorrecto",
        text: err.message || "Intenta nuevamente.",
        confirmButtonColor: "#d33",
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
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Verifica tu código
          </h2>
          <p className="text-sm text-gray-500 dark:text-white/70 mt-2">
            Introduce el código de 8 caracteres que enviamos a tu correo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Label>Código de Confirmación</Label>
          <div className="grid grid-cols-8 gap-2 mt-4 mb-6">
            {codigo.map((char, index) => (
              <input
                key={index}
                type="text"
                inputMode="text"
                maxLength={1}
                className="text-center text-lg font-semibold border rounded-md py-2 dark:bg-gray-800 dark:text-white dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                value={char}
                ref={(el) => {(inputsRef.current[index] = el)}}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <Button className="w-full" disabled={!isCodigoCompleto} >Verificar Código</Button>
        </form>
      </div>
    </div>
  );
}
