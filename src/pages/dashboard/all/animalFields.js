import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useAnimalFields } from "@/hooks/animalFields/useAnimalFields";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
const animalFieldList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { animalFields, loading, error } = useAnimalFields();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    // Filtrar animales según el término de búsqueda
    const filteredAnimalFields = animalFields.filter((animalFields) => animalFields.fields?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const transformedAnimalFields = filteredAnimalFields.map((animalFields) => ({
        ...animalFields,
        status: animalFields.status ? "Fuera" : "Dentro",
    }));
    const handleEdit = (animalField) => {
        const rolePaths = {
            Administrador: "/admin/animalFieldCreate",
            Instructor: "/instructor/animalFieldCreate",
            Aprendiz: "/apprentice/animalFieldCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    animalField,
                }
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/animalFieldCreate",
            Instructor: "/instructor/animalFieldCreate",
            Aprendiz: "/apprentice/animalFieldCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsx("div", { className: "flex justify-center min-h-screen p-10 bg-gray-200", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Pastoreos" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar pastoreo" }), _jsx(Input, { className: "w-72", placeholder: "Buscar por terreno...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(GenericTable, { headers: [
                        "Terreno",
                        "Animal",
                        "Fecha de inicio",
                        "Fecha de fin",
                        "Duracion",
                        "Estado"
                    ], data: transformedAnimalFields, columns: [
                        "fields.name",
                        "animals.record",
                        "start_date",
                        "end_date",
                        "duration",
                        "status"
                    ], keyValue: "id", onEdit: handleEdit })] }) }));
};
export default animalFieldList;
