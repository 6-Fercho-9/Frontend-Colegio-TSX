import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import Button from "../../ui/button/Button";
import { useEffect, useState } from "react";
// import Dropzone from "react-dropzone";


interface DropzoneComponentProps {
  onUpload: (file: File) => void;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ onUpload }) => {
  const [selectedFile,setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const onDrop = (acceptedFiles: File[]) => {
  //    if (acceptedFiles.length > 0) {
  //     onUpload(acceptedFiles[0]);
  //   }
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    },
  });
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  return (
    <ComponentCard title="Dropzone">
      <div className="transition border border-gray-300 border-dashed dark:hover:border-brand-500 dark:border-gray-700 rounded-xl">
        {!selectedFile ? (
          <form
            {...getRootProps()}
            className={`dropzone rounded-xl p-7 lg:p-10 text-center cursor-pointer ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
            id="demo-upload"
          >
            <input {...getInputProps()} />
            <div className="dz-message flex flex-col items-center">
              <div className="mb-5 flex justify-center">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5 3.9c-.2 0-.4.1-.5.2L8.6 9.5c-.3.3-.3.8 0 1.1s.8.3 1.1 0l4.1-4.1V18.7c0 .4.3.8.8.8s.8-.3.8-.8V6.5l4.1 4.1c.3.3.8.3 1.1 0s.3-.8 0-1.1L15 4.2c-.2-.2-.4-.3-.5-.3zM5.9 18.7c0-.4-.3-.8-.8-.8s-.8.3-.8.8v3.2c0 1.2 1 2.2 2.2 2.2h15.7c1.2 0 2.2-1 2.2-2.2v-3.2c0-.4-.3-.8-.8-.8s-.8.3-.8.8v3.2c0 .4-.3.8-.8.8H6.7c-.4 0-.8-.3-.8-.8v-3.2z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                {isDragActive ? "Suelta la imagen aquí" : "Arrastra o haz clic para subir"}
              </h4>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                PNG, JPG, WebP o SVG
              </span>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 p-5">
            <img
              src={previewUrl ?? ""}
              alt="Preview"
              className="rounded-xl w-auto h-48 object-contain border"
            />
            <div className="flex gap-3">
              <Button
                size="sm"
                onClick={() => {
                  if (selectedFile) {
                    onUpload(selectedFile);
                  }
                }}
              >
                Subir Imagen
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;
