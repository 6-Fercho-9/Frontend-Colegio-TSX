import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

import Swal from "sweetalert2";
import { createDocente } from "../../../services/Personal-Academico/DocenteService";

export default function RegistrarUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    ci: "",
    edad: 0,
    sexo: "M"
  });

  const navigate = useNavigate() 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const validarFormulario = () => {
    const { nombre, email, password, ci, edad, sexo } = form;

    if (!nombre.trim()) return "El nombre es obligatorio.";
    if (!email.trim() || !email.includes("@")) return "Email inválido.";
    if (password.length < 4) return "La contraseña debe tener al menos 4 caracteres.";
    if (!ci.trim()) return "El CI es obligatorio.";
    if (ci.length < 5) return "El CI debe tener al menos 5 caracteres.";
    if (edad <= 0) return "La edad debe ser un número positivo.";
    if (!sexo) return "El sexo es obligatorio.";
    return null;
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
     const error = validarFormulario();
    if (error) {
        return Swal.fire({
        icon: "error",
        title: "Validación",
        text: error,
        });
    }
  
    try {
      const {nombre,email,password,ci, edad, sexo} =form
      const data = await createDocente(nombre,email,password, ci, edad, sexo)
       Swal.fire({
        icon: "success",
        title: "Registrado correctamente",
        text: data?.message ?? "Usuario creado exitosamente.",
        timer: 2000,
        showConfirmButton: false,
        });
      navigate('/docentes')
      console.log(`data creada: ${data}`)
    } catch (error) {
      console.log(`ocurrio un error inesperado: `,error)
       Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario.",
       });
    }
  }
  return (

     <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        
            <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
                
            <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                <Link
                to="/docentes"
                className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                <ChevronLeftIcon className="size-5" />
                Volver a docentes
                </Link>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                <div className="mb-5 sm:mb-8">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                    Registro de docentes
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ingresa los datos del docente!
                    </p>
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                   
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        
                        {/* <!-- First Name --> */}
                        
                            <Label>
                            Nombre<span className="text-error-500">*</span>
                            </Label>
                            <Input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa tu nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            />
                                                <div>
                        <Label>
                            CI<span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="ci"
                            name="ci"
                            placeholder="Ingresa tu CI"
                            value={form.ci}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <Label>
                            Email<span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <Label>
                            Edad<span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="number"
                            id="edad"
                            name="edad"
                            placeholder="Ingresa tu email"
                            value={form.edad}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <Label>
                            Genero<span className="text-error-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="sexo"
                            name="sexo"
                            placeholder="M masculino, F femenino"
                            value={form.sexo}
                            onChange={handleChange}
                        />
                        </div>
                        {/* <!-- Password --> */}
                        <div>
                        <Label>
                            Contraseña<span className="text-error-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                            placeholder="Ingresa tu Contraseña"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            name="password"
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
                        </div>
                        {/* <!-- Checkbox --> */}
                       
                        {/* <!-- Button --> */}
                        <div>
                        <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600" type="submit">
                            Registrar
                        </button>
                        </div>
                    </div>
                    </form>

                   
                </div>
                </div>
            </div>
            </div>

        
     </div>
  );
}
