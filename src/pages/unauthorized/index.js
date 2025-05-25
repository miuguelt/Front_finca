import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
const UnauthorizedPage = () => {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center", children: [_jsx(XCircle, { className: "mx-auto h-16 w-16 text-red-500 mb-6" }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Acceso no autorizado" }), _jsx("p", { className: "text-gray-600 mb-8 text-justify", children: "Lo sentimos, no tienes permiso para acceder a esta p\u00E1gina. Si crees que esto es un error, por favor contacta al administrador del sistema." }), _jsxs("div", { className: "space-y-4", children: [_jsx(Button, { asChild: true, className: "w-full bg-green-800 hover:bg-green-700", children: _jsx(Link, { to: "/", children: "Volver a la p\u00E1gina principal" }) }), _jsx(Button, { asChild: true, className: "w-full", children: _jsx(Link, { to: "", children: "Contactar con soporte" }) })] })] }) }));
};
export default UnauthorizedPage;
