import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../services/Gestion_de_Productos/productoService";
import {  ProductoResponseUpdateBackend } from "../../services/interfaces/producto";
import Label from "../../components/form/Label";

import Swal from "sweetalert2";
import { Caracteristica } from "../../services/interfaces/caracteristica";
import SelectModified from "./SelectModified";


const atributosPorCategoria: Record<string, (keyof Caracteristica)[]> = {
  "CELULARES": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "bateria", "camara", "conectividad", "puertos", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "TV": ["pantalla", "resolucion", "puertos", "conectividad", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "SMARTWATCHS": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "bateria", "conectividad", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "AUDIFONOS": ["bateria", "conectividad", "microfono_integrado", "dimension", "peso", "color"],
  "TECLADOS": ["puertos", "conectividad", "dimension", "peso", "color"],
  "LAPTOPS": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "tarjeta_grafica", "bateria", "conectividad", "puertos", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "TABLETS": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "bateria", "conectividad", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "CONSOLAS": ["procesador", "almacenamiento", "tarjeta_grafica", "puertos", "conectividad", "dimension", "peso", "color"],
  "MONITORES": ["pantalla", "resolucion", "puertos", "conectividad", "dimension", "peso", "color"],
  "GABINETES":["dimension","peso","color"],
   "MOUSE PADS":["dimension","peso","color"],
   "MOUSES":["conectividad","dimension","peso","color"],
   "MANDOS":["conectividad","dimension","peso","color"],
   "CAMARAS":["almacenamiento","sistema_operativo","conectividad","puertos","procesador","modelo","dimension","peso","color"]

};

const placeholderPorCaracteristica: Partial<Record<keyof Caracteristica, string>> = {
  pantalla: "Ej. 15.6 pulgadas, AMOLED",
  resolucion: "Ej. 1920x1080",
  procesador: "Ej. Intel Core i7, Snapdragon 888",
  ram: "Ej. 8GB DDR4",
  almacenamiento: "Ej. 512GB SSD o 128GB eMMC",
  bateria: "Ej. 5000mAh",
  camara: "Ej. 12MP + 8MP frontal",
  conectividad: "Ej. Wi-Fi 6, Bluetooth 5.2",
  puertos: "Ej. HDMI, USB-C, Jack 3.5mm",
  tarjeta_grafica: "Ej. NVIDIA RTX 3050",
  dimension: "Ej. 30.4 x 21.2 x 1.6 cm",
  peso: "Ej. 1.5 kg",
  color: "Ej. Negro, Azul, Plateado",
  sistema_operativo: "Ej. Android 13, Windows 11",
  modelo: "Ej. G12345"
};

const EditarProductoPage = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [producto, setProducto] = useState<ProductoResponseUpdateBackend | null>(null);
  const [caracteristica, setCaracteristica] = useState<Partial<Caracteristica>>({});
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [tiempoGarantia, setTiempoGarantia] = useState("");
  const [estado, setEstado] = useState<string>("DISPONIBLE");

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) return;
      try {
        const response = await getProduct(Number(id));
        const productoData = response.producto;

        if (!productoData) {
          console.error("Producto no encontrado en la respuesta");
          return;
        }

        setProducto(productoData??null);
        setCaracteristica(productoData.caracteristica ?? {}); // evitar undefined
        setStock(Number(productoData.stock ?? 0));
        setPrecio(Number(productoData.precio ?? 0));
        setTiempoGarantia(productoData.tiempo_garantia ?? "");
        setEstado(productoData.estado ?? "DISPONIBLE");
      } catch (error) {
        console.error("Error al obtener producto", error);
      }
    };

    fetchProducto();
  }, [id]);


  const handleChange = (key: keyof Caracteristica, value: string | boolean) => {
    setCaracteristica(prev => ({ ...prev, [key]: value }));
  };

 const handleGuardar = async () => {
    if (!producto) return;

    try {
      const payload = {
        modelo_id: producto.modelo.id, // aún si no se cambia
        descripcion: producto.descripcion,
        stock,
        precio,
        tiempo_garantia: tiempoGarantia,
        estado,
        color: caracteristica.color ?? "Negro", // requerido
        // Características planas
        pantalla: caracteristica.pantalla,
        resolucion: caracteristica.resolucion,
        procesador: caracteristica.procesador,
        ram: caracteristica.ram,
        almacenamiento: caracteristica.almacenamiento,
        bateria: caracteristica.bateria,
        camara: caracteristica.camara,
        conectividad: caracteristica.conectividad,
        puertos: caracteristica.puertos,
        tarjeta_grafica: caracteristica.tarjeta_grafica,
        microfono_integrado: caracteristica.microfono_integrado,
        modelo: caracteristica.modelo,
        dimension: caracteristica.dimension,
        peso: caracteristica.peso,
        sistema_operativo: caracteristica.sistema_operativo
      };

      const response = await updateProduct(producto.id, payload);

      if (response.producto) {
        setProducto(response.producto);
        setCaracteristica(response.producto.caracteristica ?? {});
      }
      Swal.fire({title:"Producto actualizado"
        ,text: response.message,
         icon: "success",
        timer:2000,
        showCloseButton:false})
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo actualizar el producto", "error");
    }
  };


  const atributos = producto ? atributosPorCategoria[producto.modelo.categoria.nombre] ?? [] : [];

  if (!producto) return <p className="text-center">Cargando producto...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Editar Producto</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Modelo</Label>
          <input type="text" value={producto.modelo.nombre} disabled className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white" />
        </div>
        <div>
          <Label>Marca</Label>
          <input type="text" value={producto.modelo.marca.nombre} disabled className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white" />
        </div>
        <div>
          <Label>Categoría</Label>
          <input type="text" value={producto.modelo.categoria.nombre} disabled className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white" />
        </div>
         <div>
          <Label>Estado</Label>
          <SelectModified
            value={estado}
            onChange={(value: string) => setEstado(value)}
            options={[
              { value: "DISPONIBLE", label: "DISPONIBLE" },
              { value: "NO DISPONIBLE", label: "NO DISPONIBLE" }
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Stock</Label>
          <input type="number" value={stock === 0 ? "" : stock} onChange={e => setStock(e.target.value === "" ? 0 : Number(e.target.value))} className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white" placeholder="Cantidad disponible" />
        </div>
        <div>
          <Label>Precio</Label>
          <input type="number" value={precio === 0 ? "" : precio} onChange={e => setPrecio(e.target.value === "" ? 0 : Number(e.target.value))} className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white" placeholder="Precio en Bs" />
        </div>
        <div>
          <Label>Garantía</Label>
          <input type="text" value={tiempoGarantia} onChange={e => setTiempoGarantia(e.target.value)} className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white" placeholder="Ej. 1 año" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-white">Características</h3>
        {atributos.map(atributo => (
          <div key={atributo}>
            <Label>{atributo.replace(/_/g, ' ')}</Label>
            {atributo === "microfono_integrado" ? (
              <input type="checkbox" checked={caracteristica[atributo] as boolean || false} onChange={e => handleChange(atributo, e.target.checked)} />
            ) : (
              <input type="text" value={caracteristica[atributo] as string || ""} onChange={e => handleChange(atributo, e.target.value)} className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white" placeholder={placeholderPorCaracteristica[atributo] ?? `Ingresa ${atributo.replace(/_/g, ' ')}`} />
            )}
          </div>
        ))}
      </div>

      <div className="pt-6">
        <button onClick={handleGuardar} className="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md text-sm font-medium">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default EditarProductoPage;
