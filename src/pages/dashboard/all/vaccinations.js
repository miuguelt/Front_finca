import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { Input } from "@nextui-org/react";
//Types
import { useNavigate } from "react-router-dom";
import { useVaccinations } from "@/hooks/vaccination/useVaccination";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
const VaccinationList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { vaccinations, loading, error } = useVaccinations();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    const filteredVaccinations = vaccinations.filter((vaccination) => vaccination.animals?.record.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleEdit = (vaccination) => {
        const rolePaths = {
            Administrador: "/admin/vaccinationCreate",
            Instructor: "/instructor/vaccinationCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    vaccination,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/vaccinationCreate",
            Instructor: "/instructor/vaccinationCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsx("div", { className: "flex justify-center min-h-screen p-10 bg-gray-200", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Vacunaciones" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar vacunacion" }), _jsx(Input, { className: "w-72", placeholder: "Buscar por animal...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(GenericTable, { headers: [
                        "Animal",
                        "Vacuna",
                        "Fecha de Aplicación",
                        "Aprendiz",
                        "Instructor",
                    ], data: filteredVaccinations, columns: [
                        "animals.record",
                        "vaccines.name",
                        "application_date",
                        "apprentice.fullname",
                        "instructor.fullname",
                    ], keyValue: "id", onEdit: handleEdit })] }) }));
};
export default VaccinationList;
