import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
const DiseaseAnimalList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { animalDiseases, loading, error } = useAnimalDiseases();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    // Filtrar animales enfermos según el término de búsqueda
    const filteredAnimalDiseases = animalDiseases.filter((animalDisease) => animalDisease.animals?.record
        .toLowerCase()
        .includes(searchTerm.toLowerCase()));
    const transformedAnimalDiseases = filteredAnimalDiseases.map((animalDisease) => ({
        ...animalDisease,
        status: animalDisease.status ? "Recuperado" : "Enfermo",
    }));
    const handleEdit = (animalDisease) => {
        const rolePaths = {
            Administrador: "/admin/animalDiseaseCreate",
            Instructor: "/instructor/animalDiseaseCreate",
            Aprendiz: "/apprentice/animalDiseaseCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    animalDisease,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/animalDiseaseCreate",
            Instructor: "/instructor/animalDiseaseCreate",
            Aprendiz: "/apprentice/animalDiseaseCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsx("div", { className: "flex justify-center min-h-screen p-10 bg-gray-200", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Animales Enfermos" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar animal enfermo" }), _jsx(Input, { className: "w-72", placeholder: "Buscar por registro...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(GenericTable, { headers: ["Animal", "Enfermedad", "Instructor", "Fecha diagnostico", "Estado"], data: transformedAnimalDiseases, columns: [
                        "animals.record",
                        "diseases.name",
                        "instructors.fullname",
                        "diagnosis_date",
                        "status"
                    ], keyValue: "id", onEdit: handleEdit })] }) }));
};
export default DiseaseAnimalList;
