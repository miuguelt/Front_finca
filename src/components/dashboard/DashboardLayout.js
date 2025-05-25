import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import InstructorSideBar from "../instructor/instructorSideBar";
import AdminSideBar from "../admin/AdminSideBar";
import ApprenticeSideBar from "../apprentice/ApprenticeSideBar";
const DashboardLayout = ({ children, role }) => {
    return (_jsxs("div", { className: "flex h-screen", children: [role === "instructor" && _jsx(InstructorSideBar, {}), role === "administrador" && _jsx(AdminSideBar, {}), role === "aprendiz" && _jsx(ApprenticeSideBar, {}), _jsx("main", { className: "flex-1 lg:ml-72 overflow-auto bg-gradient-to-b from-gray-300 scrollbar-hide", children: children })] }));
};
export default DashboardLayout;
