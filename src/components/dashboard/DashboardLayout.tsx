import InstructorSideBar from "../instructor/instructorSideBar";
import AdminSideBar from "../admin/AdminSideBar";
import ApprenticeSideBar from "../apprentice/ApprenticeSideBar";
import { Outlet } from "react-router-dom"; // Importa Outlet

interface DashboardLayoutProps {
  // Quita 'children: React.ReactNode;' de aquí,
  // ya que <Outlet /> manejará el contenido de las rutas anidadas.
  role: string;
}

// El componente DashboardLayout ya no recibe 'children'
const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      {role === "instructor" && <InstructorSideBar />}
      {role === "administrador" && <AdminSideBar />}
      {role === "aprendiz" && <ApprenticeSideBar />}
      <main className="flex-1 lg:ml-72 overflow-auto bg-gradient-to-b from-gray-300 scrollbar-hide">
        {/* <<<<<<<<<<<<<<<< CAMBIO CLAVE AQUÍ >>>>>>>>>>>>>>>>>> */}
        {/* Aquí se renderizarán los componentes de las rutas anidadas */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;
