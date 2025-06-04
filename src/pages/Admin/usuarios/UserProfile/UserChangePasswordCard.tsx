import {  useContext, useEffect, useState } from "react";

import { cambiarContrasenia, cambiarFotoDePerfil } from "../../../../services/Gestion_de_usuario/usuarioService";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import Alert from "../../../../components/ui/alert/Alert";
import DropzoneComponent from "../../../../components/form/form-elements/DropZone";
import { EyeIcon,EyeCloseIcon } from "../../../../icons";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";



// import { AuthContext } from "../../context/AuthContext";


export default function ChangePasswordCard() {
   const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");

  const { setUser } = context;
  const [isOpen, setIsOpen] = useState(false); // Lo puedes reemplazar con useModal si lo deseas
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [alerta, setAlerta] = useState<{
    tipo: "success" | "error";
    titulo: string;
    message: string;
  } | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    actual: "",
    nueva: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // <--- evita que recargue la página
    if (form.actual.length < 4 || form.nueva.length < 1 ) {
      setIsOpen(false);
      Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'la contrasenia debe tener al menos 4 caracteres',
                    timer: 2000,
                    showConfirmButton: false,
                  });
                  setForm({ actual: "", nueva: "" }); // limpiar
      return
    }
    try {
      const data = await cambiarContrasenia(form.actual, form.nueva);
      setForm({ actual: "", nueva: "" }); // limpiar
      setIsOpen(false);
      
      Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: data.message,
                    timer: 2000,
                    showConfirmButton: false,
                  });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
       console.error(error.message)
       setIsOpen(false);
       setForm({ actual: "", nueva: "" }); // limpiar
      Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    timer: 2000,
                    showConfirmButton: false,
                  });
    }
  };

//para subir la foto 
  const handleUploadPhoto = async (file: File) => {
      try {
        const response = await cambiarFotoDePerfil(file); // este endpoint ya lo tenés

        // Actualizar el contexto del usuario con el nuevo public_id
        
        Swal.fire({
          icon: "success",
          title: "Imagen actualizada",
          text: response.message,
          timer: 2000,
          showConfirmButton: false,
        });
        //para que no haya lios y renderizo los cambios solo en la url_profile
        if (response.user?.url_profile) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUser((prev: any) => ({
            ...prev!,
            url_profile: response.user.url_profile,
          }));
        }

        setIsPhotoModalOpen(false);

      } catch (error) {
        console.error("Error al subir la imagen:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo subir la imagen. Intenta de nuevo.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };

// para ocultar las alertas
  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => setAlerta(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">

        {alerta && (
        <div className="mb-4">
          <Alert
            variant={alerta.tipo}
            title={alerta.titulo}
            message={alerta.message}
            showLink={false}
          />
        </div>
      )}
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Edicion de Perfil y Contraseña
      </h4>

      <div className="flex gap-4">
        <Button size="sm" onClick={() => setIsOpen(true)} className="w-auto">
          Cambiar Contraseña
        </Button>

        <Button size="sm" onClick={() => setIsPhotoModalOpen(true)} className="w-auto">
          Cambiar Foto de Perfil
        </Button>
      </div>



      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-[600px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cambiar tu contraseña
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Por favor, introduce tu contraseña actual y una nueva.
            </p>
          </div>

          <form
            className="flex flex-col"
          >
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-y-5">
                <div>
                  <Label>Contraseña Actual</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña actual"
                      name="actual"
                      value={form.actual}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Nueva Contraseña</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu nueva contraseña"
                      name="nueva"
                      value={form.nueva}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSubmit}>
                Cambiar Contraseña
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} className="max-w-[600px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90">Subir Nueva Foto de Perfil</h4>
          <DropzoneComponent onUpload={handleUploadPhoto} />
        </div>
      </Modal>

    </div>
  );
}

