import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export const Navbar = () => {
  // TODO: Obtener datos del usuario desde /api/profile
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  // TODO: Después del logout exitoso, redireccionar a /login
  // TODO: Manejar errores apropiadamente
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
       await fetch("http://localhost:3000/api/logout",{
        method:"POST",
        credentials:"include"
       }) 

    navigate("/login")
    } catch (error) {
      console.log("Error al hacer el logout")
    }
   
  }
  const userN2ame = "Usuario"; // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile
 const [userName, setUserName] = useState(null);
  
  const User = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile",{
        credentials:"include"
      })
      console.log(res)
      if(res.ok){
        const data = await res.json();
        setUserName(data.user)
      }else {
        console.log("Error al cargar el perfil")
      }
    } catch (error) {
      console.log("Error al hacer la peticion",error)
    }
      
    }
    
  useEffect(() => {
    User();
  },[])
  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName?.name || "usuario"}</span>
          </span>

          <button
            onClick={() => {
              // TODO: Implementar handleLogout aquí
              handleLogout();
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
