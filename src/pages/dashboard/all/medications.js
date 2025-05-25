import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GenericTable from "@/components/dashboard/GenericTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
//Types
import { useMedications } from "@/hooks/medication/useMedication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const MedicationList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { medications, loading, error } = useMedications();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    const filteredTreatments = medications.filter((medication) => medication.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const transformedTreatment = filteredTreatments.map((medication) => ({
        ...medication,
        availability: medication.availability ? "Disponible" : "No disponible",
    }));
    const handleEdit = (medication) => {
        const rolePaths = {
            Administrador: "/admin/medicineCreate",
            Instructor: "/instructor/medicineCreate",
            Aprendiz: "/apprentice/medicineCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    medication,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/medicineCreate",
            Instructor: "/instructor/medicineCreate",
            Aprendiz: "/apprentice/medicineCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsx("div", { className: "flex justify-center min-h-screen p-10 bg-gray-200", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Medicamentos" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar medicamento" }), _jsx(Input, { className: "w-72", placeholder: "Buscar por nombre...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(GenericTable, { headers: [
                        "Nombre",
                        "Descripción",
                        "Indicaciones",
                        "Contraindicaciones",
                        "Vía de Administración",
                        "Disponibilidad",
                    ], data: transformedTreatment, columns: [
                        "name",
                        "description",
                        "indications",
                        "contraindications",
                        "route_administration",
                        "availability",
                    ], keyValue: "id", onEdit: handleEdit })] }) }));
};
export default MedicationList;
