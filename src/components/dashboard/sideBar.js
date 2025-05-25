import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/auth/useAuth';
import { Divider } from '@nextui-org/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
export const SidebarItem = ({ icon, title, children, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { children: [_jsxs("button", { className: "flex items-center text-md w-full p-2 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors", onClick: () => {
                    setIsOpen(!isOpen);
                    onClick && onClick();
                }, "aria-expanded": isOpen, children: [icon, _jsx("span", { className: "ml-3", children: title }), children && (_jsx("span", { className: "ml-auto", children: isOpen ? _jsx(ChevronUp, { className: "h-4 w-4" }) : _jsx(ChevronDown, { className: "h-4 w-4" }) }))] }), children && isOpen && (_jsx("div", { className: "ml-6 mt-2 space-y-2", children: children }))] }));
};
export const Sidebar = ({ children, heading }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout, role } = useAuth();
    const navigate = useNavigate();
    const handleDashboardRole = () => {
        if (role == "Administrador") {
            navigate("/admin/");
        }
        else if (role == "Instructor") {
            navigate("/instructor/");
        }
        else if (role == "Aprendiz") {
            navigate("/apprentice/");
        }
    };
    return (_jsxs(_Fragment, { children: [!isSidebarOpen && (_jsxs(Button, { variant: "ghost", size: "icon", className: "fixed top-4 left-4 z-50 lg:hidden", onClick: () => setIsSidebarOpen(true), children: [_jsx(Menu, { className: "h-6 w-6" }), _jsx("span", { className: "sr-only", children: "Abrir" })] })), _jsxs("aside", { className: `
        fixed top-0 left-0 z-40 w-72 h-screen
        bg-gray-800 text-white p-4
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `, children: [_jsxs("div", { className: "flex items-center justify-center mb-5", children: [_jsx("h2", { className: "text-xl font-bold hover:cursor-pointer", onClick: handleDashboardRole, children: heading }), _jsxs(Button, { variant: "ghost", size: "icon", className: "lg:hidden", onClick: () => setIsSidebarOpen(false), children: [_jsx(X, { className: "h-6 w-6" }), _jsx("span", { className: "sr-only", children: "Cerrar" })] })] }), _jsx(Divider, { className: 'bg-gray-600' }), _jsxs("nav", { className: "space-y-2 mt-2", children: [children, _jsxs(Button, { variant: "ghost", onClick: () => logout(), className: "flex items-center w-full p-2 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white rounded-lg transition-colors", children: [_jsx(FaSignOutAlt, { className: "mr-2" }), "LogOut"] })] })] })] }));
};
