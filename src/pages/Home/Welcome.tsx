import { Link } from "react-router";
import backgroundImage from "../../assets/images/background-escolar.png"

export default function Welcome() {
  return (
        <> 

            <section 
                id="welcome-principal"  
                //  className="h-screen flex items-center justify-center relative overflow-hidden"
                 className="h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Pseudo-elemento para la imagen desenfocada */}
                {/* <div  */}
                    {/* //className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110" */}
                {/* ></div> */}
                {/* Contenido principal */}
                <div className="relative flex flex-col items-center justify-center text-center p-10 rounded-lg">
                    <h1 className="text-5xl font-extrabold text-white mb-6">
                        Bienvenido a tu aplicacion academica
                    </h1>
                    <p className="text-2xl text-white mb-6">
                    
                        Accedé a todas las herramientas y servicios que tu institución tiene preparados para potenciar tu aprendizaje. Gestioná tus clases, consultá calificaciones y mantenete conectado con tu comunidad educativa.
                    </p>
                    <Link 
                        to="/signin" 
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Iniciar sesión
                    </Link>
                </div>
                

            </section>


            <section id="quienes-somos" className="h-screen flex items-center justify-center bg-gray-200">
                <h2 className="text-3xl font-bold">Quiénes Somos</h2>
            </section>

            <section id="nuestros-servicios" className="h-screen flex items-center justify-center bg-gray-300">
                <h2 className="text-3xl font-bold">Nuestros Servicios</h2>
            </section>

            <section id="ubicacion" className="h-screen flex items-center justify-center bg-gray-400">
                <h2 className="text-3xl font-bold">Ubicación</h2>
            </section>
        </>
  );
}
