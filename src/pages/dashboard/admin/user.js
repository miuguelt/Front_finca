import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useUsers } from "@/hooks/user/useUser";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";
const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { users, loading, error } = useUsers();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    const filteredUsers = users.filter((user) => user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(user.identification)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
    const handleEdit = (user) => {
        navigate("/admin/userCreate", {
            state: {
                isEdit: true,
                user,
            },
        });
    };
    // Transformar los datos para mostrar "Activo" o "Inactivo"
    const transformedUsers = filteredUsers.map((user) => ({
        ...user,
        status: user.status ? "Activo" : "Inactivo",
    }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Usuarios" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", children: _jsx(Link, { to: "/admin/userCreate", className: "text-white hover:text-white", children: "Agregar Usuario" }) }), _jsx(Input, { className: "w-72", placeholder: "Buscar por nombre...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: transformedUsers.map((user) => (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-2 pb-4", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: user.fullname }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Badge, { variant: "secondary", children: user.role }), _jsx(Badge, { variant: user.status === "Activo"
                                                ? "vivo"
                                                : user.status === "Inactivo"
                                                    ? "destructive"
                                                    : "secondary", children: user.status })] })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-xs text-muted-foreground space-y-2", children: [_jsxs("p", { children: [_jsxs("span", { className: "font-semibold text-gray-700", children: ["Identificacion:", " "] }), user.identification] }), _jsxs("p", { children: [_jsxs("span", { className: "font-semibold text-gray-700", children: ["Nombre completo:", " "] }), user.fullname] }), _jsxs("p", { children: [_jsxs("span", { className: "font-semibold text-gray-700", children: ["Correo Electronico:", " "] }), user.email] }), _jsxs("p", { children: [_jsxs("span", { className: "font-semibold text-gray-700", children: ["Numero de Telefono:", " "] }), user.phone] }), _jsxs("p", { children: [_jsxs("span", { className: "font-semibold text-gray-700", children: ["Direccion:", " "] }), user.address] })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-2 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "center", children: _jsx(DropdownMenuItem, { onClick: () => handleEdit(user), className: "hover:cursor-pointer", children: "Editar" }) })] }) })] })] }, user.fullname))) })] }));
};
export default UserList;
