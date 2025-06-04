import { useEffect, useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { EyeIcon, EyeCloseIcon } from "../../../icons";
import DropzoneComponent from "../../../components/form/form-elements/DropZone";
import Alert from "../../../components/ui/alert/Alert";
import Swal from "sweetalert2";
import { Usuario } from "../../../services/interfaces/usuarios";
import {
  adminCambiarContrasenia,
  adminCambiarPerfil
} from "../../../services/Gestion_de_usuario/usuarioService";

interface Props {
  user: Usuario | null;
  setUser: (user: Usuario) => void;
  imgVersion?:number;
  setImgVersion: (version: number) => void;
}

export default function UserAdminSecurityCard({ user, setUser,setImgVersion }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alerta, setAlerta] = useState<{
    tipo: "success" | "error";
    titulo: string;
    message: string;
  } | null>(null);
  const [nueva, setNueva] = useState("");

  const handleSubmit = async () => {
    if (!user) return;

    if (nueva.length < 4) {
        setNueva("");
      setIsOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 4 caracteres",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setIsOpen(false);
      const response = await adminCambiarContrasenia(user.id, nueva);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
      });
      setNueva("");
      return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        setNueva("");
      console.error("Error cambiando contraseña:", error);
      setIsOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo cambiar la contraseña",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleUploadPhoto = async (file: File) => {
    if (!user) return;

    try {
      const response = await adminCambiarPerfil(user.id, file);

      
    setUser(response.usuario!);
    setImgVersion(Date.now());//modificar esto pa que actualize la imagen


      Swal.fire({
        icon: "success",
        title: "Imagen actualizada",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
      });

      setIsPhotoModalOpen(false);
      return;
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
        Seguridad del Usuario
      </h4>

      <div className="flex gap-4">
        <Button size="sm" onClick={() => setIsOpen(true)}>
          Cambiar Contraseña
        </Button>

        <Button size="sm" onClick={() => setIsPhotoModalOpen(true)}>
          Cambiar Foto de Perfil
        </Button>
      </div>

      {/* Modal de contraseña */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-[600px] m-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl">
          <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
            Cambiar Contraseña
          </h4>

          <div className="relative mb-5">
            <Label>Nueva Contraseña</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[52%] transform -translate-y-1/2"
            >
              {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Guardar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de imagen */}
      <Modal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} className="max-w-[600px] m-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl">
          <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
            Subir Nueva Foto de Perfil
          </h4>
          <DropzoneComponent onUpload={handleUploadPhoto} />
        </div>
      </Modal>
    </div>
  );
}
