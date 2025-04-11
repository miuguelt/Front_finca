import InstructorSideBar from "../instructor/instructorSideBar";
import AdminSideBar from "../admin/AdminSideBar";
import ApprenticeSideBar from "../apprentice/ApprenticeSideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      {role === "instructor" && <InstructorSideBar />}
      {role === "administrador" && <AdminSideBar />}
      {role === "aprendiz" && <ApprenticeSideBar />}
      <main className="flex-1 lg:ml-72 overflow-auto bg-gradient-to-b from-gray-300 scrollbar-hide">
         {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
