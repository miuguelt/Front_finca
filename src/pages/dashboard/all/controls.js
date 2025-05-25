import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GenericTable from "@/components/dashboard/GenericTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//Types
import { useControls } from "@/hooks/control/useControl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
const ControlList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { controls, loading, error } = useControls();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    const filteredControls = controls.filter((control) => control.animals?.record.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleEdit = (control) => {
        const rolePaths = {
            Administrador: "/admin/controlCreate",
            Instructor: "/instructor/controlCreate",
            Aprendiz: "/apprentice/controlCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    control,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/controlCreate",
            Instructor: "/instructor/controlCreate",
            Aprendiz: "/apprentice/controlCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsx("div", { className: "flex justify-center min-h-screen p-10", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Controles" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar control" }), _jsx(Input, { className: "w-72", placeholder: "Buscar por animal...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(GenericTable, { headers: ["Animal", "Fecha de diagnostico", "Estado de salud", "Descripcion"], data: filteredControls, columns: ["animals.record", "checkup_date", "healt_status", "description"], keyValue: "id", onEdit: handleEdit })] }) }));
};
export default ControlList;
