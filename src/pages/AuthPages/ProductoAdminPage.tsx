import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoCompleteCombobox from "./AutoCompleteCombobox";
import { Caracteristica } from "../../services/interfaces/caracteristica";
import { ModeloProducto } from "../../services/interfaces/modelo";
import { listModelos } from "../../services/Gestion_de_Productos/modeloService";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Swal from "sweetalert2";
import { createProduct } from "../../services/Gestion_de_Productos/productoService";
import { Producto } from "../../services/interfaces/producto";

export const atributosPorCategoria: Record<string, (keyof Caracteristica)[]> = {
  "CELULARES": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "bateria", "camara", "conectividad", "puertos", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "TV": ["pantalla", "resolucion", "puertos", "conectividad", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "SMARTWATCHS": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "bateria", "conectividad", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "AUDIFONOS": ["bateria", "conectividad", "microfono_integrado", "dimension", "peso", "color"],
  "TECLADOS": ["puertos", "conectividad", "dimension", "peso", "color"],
  "LAPTOPS": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "tarjeta_grafica", "bateria", "conectividad", "puertos", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "TABLETS": ["pantalla", "resolucion", "procesador", "ram", "almacenamiento", "bateria", "conectividad", "camara", "microfono_integrado", "dimension", "peso", "color", "sistema_operativo"],
  "CONSOLAS": ["procesador", "almacenamiento", "tarjeta_grafica", "puertos", "conectividad", "dimension", "peso", "color"],
  "MONITORES": ["pantalla", "resolucion", "puertos", "conectividad", "dimension", "peso", "color"]
};

export const ProductoAdminPage = () => {
  const [modelos, setModelos] = useState<ModeloProducto[]>([]);
  const [modeloSeleccionado, setModeloSeleccionado] = useState<ModeloProducto | null>(null);
  const [valoresCaracteristicas, setValoresCaracteristicas] = useState<Partial<Caracteristica>>({ color: "" });
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [tiempoGarantia, setTiempoGarantia] = useState<string>("");
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
    modelo: "Ej. G12345",
    };


  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelos = async () => {
      const data = await listModelos();
      setModelos(data);
    };
    fetchModelos();
  }, []);

  const handleModeloSeleccionado = (modelo: ModeloProducto | null) => {
    setModeloSeleccionado(modelo);
    setValoresCaracteristicas({ color: "" });
    setDescripcion(modelo?.descripcion ?? ""); // aquí seteas la descripción inicial
  };

  const handleChange = (key: keyof Caracteristica, value: string | boolean) => {
    setValoresCaracteristicas(prev => ({ ...prev, [key]: value }));
  };

  const handleGuardar = async () => {
    try {
        if (!modeloSeleccionado) return;
        console.log("Guardando producto con:", {
            modelo: { ...modeloSeleccionado, descripcion },
            caracteristicas: valoresCaracteristicas,
        });
        
          // Validación explícita
        if (!valoresCaracteristicas.color && stock>0 && precio > 0) {
            Swal.fire({title:"Error",
                 text:"Algunos campos no cumplen con las condiciones suficientes",
                 icon:"error",
                 timer:3000
                });
            return;
        }


        const payload:Producto = {
            modelo_id: modeloSeleccionado.id,
            descripcion,
            stock,
            precio,
            tiempo_garantia: tiempoGarantia,
               // acá estamos seguros que color existe
            color: valoresCaracteristicas.color ?? "Negro",
            ...valoresCaracteristicas
        };

        const data = await createProduct(payload)

        setModeloSeleccionado(null);
        setDescripcion("");
        setValoresCaracteristicas({ color: "" });
        setStock(0);
        setPrecio(0);
        setTiempoGarantia("");

        Swal.fire({
            title: "Producto creado",
            text: data.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        Swal.fire("Error", error.message || "No se pudo actualizar la categoría", "error");
        
    }

    // Aquí iría la lógica de envío al backend
  };

  const atributos = modeloSeleccionado
  ? atributosPorCategoria[modeloSeleccionado.categoria.nombre] ?? []
  : [];


  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Crear Producto</h2>

      <AutoCompleteCombobox<ModeloProducto>
        options={modelos}
        onSelect={handleModeloSeleccionado}
        placeholder="Buscar modelo..."
        label="Modelo"
        displayValue={(item) => item.nombre}
        getKey={(item) => item.id}
      />

      {modeloSeleccionado && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Marca</label>
            <input
              type="text"
              value={modeloSeleccionado.marca.nombre}
              disabled
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Categoría</label>
            <input
              type="text"
              value={modeloSeleccionado.categoria.nombre}
              disabled
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        
      )}
      {/* para la descripcion */}
      {modeloSeleccionado && (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label>Stock</Label>
                    <input
                    type="number"
                    value={stock === 0 ? "" : stock}
                    onChange={(e) => {
                        const value = e.target.value;
                        setStock(value === "" ? 0 : Number(value));
                    }}
                    className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                    placeholder="Cantidad disponible"
                    />
                </div>

                <div>
                    <Label>Precio</Label>
                    <input
                    type="number"
                    value={precio === 0 ? "" : precio}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPrecio(value === "" ? 0 : Number(value));
                    }}
                    className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                    placeholder="Precio en Bs"
                    />
                </div>

            <div>
                <Label>Garantía</Label>
                <input
                type="text"
                value={tiempoGarantia}
                onChange={(e) => setTiempoGarantia(e.target.value)}
                className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                placeholder="Ej. 1 año"
                />
            </div>
            </div>
            <div className="space-y-2">
                <Label>Descripción del modelo</Label>
                <TextArea
                value={descripcion}
                onChange={(value) => setDescripcion(value)}
                rows={6}
                className="cursor-not-allowed opacity-80"
                placeholder="Describe brevemente el producto.."
                />
            </div>
        </>
        )}

      {modeloSeleccionado && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-white">Características</h3>
          {atributos.map((atributo) => (
            <div key={atributo}>
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300 capitalize">{atributo.replace(/_/g, ' ')}</label>
              {atributo === "microfono_integrado" ? (
                <input
                  type="checkbox"
                  checked={valoresCaracteristicas[atributo] as boolean || false}
                  onChange={(e) => handleChange(atributo, e.target.checked)}
                />
              ) : (
                <input
                  type="text"
                  value={valoresCaracteristicas[atributo] as string || ""}
                  onChange={(e) => handleChange(atributo, e.target.value)}
                  className="w-full p-2 rounded-md border dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                //   placeholder={`Ingresa ${atributo}`}
                placeholder={placeholderPorCaracteristica[atributo] ?? `Ingresa ${atributo.replace(/_/g, " ")}`}

                />
              )}
            </div>
          ))}
        </div>
      )}

      

      {!modeloSeleccionado && (
        <div className="text-sm text-blue-600 dark:text-blue-400">
          ¿No encuentras el modelo?{' '}
          <button
            onClick={() => navigate('/modelos')}
            className="underline hover:text-blue-800 dark:hover:text-blue-200"
          >
            Crea uno nuevo
          </button>
        </div>
      )}

      {modeloSeleccionado && (
        <div className="pt-6">
          <button
            onClick={handleGuardar}
            className="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md text-sm font-medium"
          >
            Guardar Producto
          </button>
        </div>
      )}
    </div>
  );
};
