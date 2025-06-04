import Button from "../../components/ui/button/Button";
import ComponentCardModified from "./ComponentCardModified";



interface ImageCardProps {
  imageUrl?: string;
  onUploadClick: () => void;
}

export default function ImageCard({ imageUrl, onUploadClick }: ImageCardProps) {
  return (
    <ComponentCardModified>
      <div className="flex flex-col items-center gap-4">
        <img
          src={imageUrl || "https://via.placeholder.com/200"}
          alt="Foto del docente"
          className="w-48 h-48 object-cover rounded-xl"
        />
        <Button size="sm" onClick={onUploadClick}>
          Sube tu imagen
        </Button>
      </div>
    </ComponentCardModified>
  );
}
