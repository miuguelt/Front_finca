import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useFields } from "@/hooks/field/useField";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
const FieldList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { fields, loading, error } = useFields();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    // Filtrar usuarios según el término de búsqueda
    const filteredFields = fields.filter((field) => field.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleEdit = (field) => {
        const rolePaths = {
            Administrador: "/admin/fieldCreate",
            Instructor: "/instructor/fieldCreate",
            Aprendiz: "/apprentice/fieldCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    field,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/fieldCreate",
            Instructor: "/instructor/fieldCreate",
            Aprendiz: "/apprentice/fieldCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsx("div", { className: "flex justify-center min-h-screen p-10 bg-gray-200", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Terrenos" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar terreno" }), _jsx(Input, { className: "w-72", placeholder: "Buscar por nombre...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(GenericTable, { headers: [
                        "Nombre",
                        "Ubicaion",
                        "Capacidad",
                        "Estado",
                        "Manejos",
                        "Aforos",
                        "Area",
                        "Tipo de comida",
                        "Estado"
                    ], data: filteredFields, columns: [
                        "name",
                        "ubication",
                        "capacity",
                        "state",
                        "handlings",
                        "guages",
                        "area",
                        "food_types.food_type",
                        "state"
                    ], keyValue: "id", onEdit: handleEdit })] }) }));
};
export default FieldList;
