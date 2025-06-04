import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import TableModelo from './TableModelo';
import ComponentCardModified from './ComponentCardModified';
import Button from '../../components/ui/button/Button';
import { Modal } from '../../components/ui/modal';
import Label from '../../components/form/Label';
import SelectModified from './SelectModified';
import Input from '../../components/form/input/InputField';
// import {Categoria} from '../../services/Gestion_de_Productos/categoriaService'
import {Categoria} from '../../services/interfaces/categoria'
import {Marca} from '../../services/interfaces/marca'
import { useEffect, useState } from 'react';
import { getAllMarca } from '../../services/Gestion_de_Productos/marcaService';
import { getAllCategoria } from '../../services/Gestion_de_Productos/categoriaService';
import Swal from 'sweetalert2';
import { createModelo } from '../../services/Gestion_de_Productos/modeloService';

export const ModeloPage = () => {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [nombreModelo, setNombreModelo] = useState("");
    const [marcaId, setMarcaId] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [reloadModelos, setReloadModelos] = useState(false);


    useEffect(() => {
      const fetchDatos = async () => {
        try {
          const [marcasRes, categoriasRes] = await Promise.all([
            getAllMarca(),
            getAllCategoria()
          ]);
          setMarcas(marcasRes);
          setCategorias(categoriasRes);
        } catch (error) {
          console.error("Error al obtener marcas o categorías", error);
        }
      };

      fetchDatos();
    }, []);


    const handleCrearModelo = async () => {
      try {
        const payload = {
          nombre: nombreModelo,
          marca_id: Number(marcaId),
          categoria_id: Number(categoriaId),
        };
        const res = await createModelo(payload);
        Swal.fire({
                title: "Modelo creado con exito",
                text: res.message,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });

        setShowCreateModal(false);
        setNombreModelo("");
        setMarcaId("");
        setCategoriaId("");
        setReloadModelos(prev => !prev);
      } catch (error) {
        Swal.fire("Error", "No se pudo crear el modelo", "error");
        console.error("Error al crear modelo:", error);
      }
    };


  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Categoria"
        description="Esta es la pagina de categoria"
      />
      {/* esto es donde dinde Basic Tables o un header  */}
      <PageBreadcrumb pageTitle="Modelos" />
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
        <ComponentCardModified title="Tabla de Modelos"
            action={
              <Button onClick={() => setShowCreateModal(true)}>
                + Agregar
              </Button>

            }>
          
          {/* crea la tabla ya con todos los datos */}
          
          <TableModelo reloadTrigger={reloadModelos} onDeleted={() => setReloadModelos(prev => !prev)} />

        </ComponentCardModified>
        
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nuevo Modelo</h2>
          <div className="space-y-4">
            <div>
              <Label>Nombre del modelo</Label>
              <Input
                value={nombreModelo}
                onChange={(e) => setNombreModelo(e.target.value)}
                placeholder="Ej: MacBook Air M2"
              />
            </div>
            <div>
              <Label>Marca</Label>
              <SelectModified
                options={marcas.map((marca) => ({
                  value: marca.id.toString(),
                  label: marca.nombre,
                }))}
                value={marcaId}
                onChange={(val) => setMarcaId(val)}
                placeholder="Selecciona una marca"
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <SelectModified
                options={categorias.map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.nombre,
                }))}
                value={categoriaId}
                onChange={(val) => setCategoriaId(val)}
                placeholder="Selecciona una categoría"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" onClick={handleCrearModelo}>
                Crear Modelo
              </Button>
            </div>
          </div>
        </div>
      </Modal>

    </>
  );
}
