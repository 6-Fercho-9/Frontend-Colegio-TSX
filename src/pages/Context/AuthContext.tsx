import { createContext, useState, useEffect, ReactNode } from "react";
import { checkAuth, getStoredToken, logout, revokeToken} from "../../services/authService";
import { Usuario } from "../../services/interfaces/usuarios";



// Definir la estructura del usuario (ajústala según tu backend)

// Definir la estructura del contexto
interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<Usuario | null>>,
  logoutSession: () => void; // <-- Agrega esto
}

// Crear el contexto con valores iniciales
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definir los props del proveedor
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUser = async () => {
       const token = getStoredToken(); // o sessionStorage
        if (!token) {
          console.log('NO existe token asociado')
          setLoading(false);
          return;
        }
      try {
        const userData = await checkAuth(); // Petición a `/me`
        console.log(`useEffect del AuthProvider ${userData.user}`);
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logoutSession = async () => {
    await logout()
    revokeToken()
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logoutSession }}>
      {children}
    </AuthContext.Provider>
  );
};
