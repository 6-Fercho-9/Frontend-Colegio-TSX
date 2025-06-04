
import WelcomeCard from "./WelcomeCard";

import backgroundImage from "../../assets/images/background-escolar.png"
import LoginCard from "./LoginCard";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";


export default function HomePage() {
  return (
    <>
      
      
      {/* <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      > */}
       <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 pt-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        > 
        {/* <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl gap-10"> */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-10">

          {/* Columna izquierda */}
          <WelcomeCard />

          
          {/* <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-800"> */}
          <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md p-8 md:p-10 
          rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-white/10">
            <LoginCard />
          </div>
          {/* boton flotante */}
          <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
                <ThemeTogglerTwo />
            </div>
        
        </div>
    
      </div>
    </>
  );
}
