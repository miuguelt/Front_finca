import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@nextui-org/react";
//Types
import { useMedications } from "@/hooks/medication/useMedication";
import { useAuth } from "@/hooks/auth/useAuth";
const MedicineForm = () => {
    const location = useLocation();
    const { state } = location;
    const { addMedication, editMedication } = useMedications();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        indications: "",
        contraindications: "",
        route_administration: "Inyección",
        availability: true,
    });
    useEffect(() => {
        if (state?.isEdit && state?.medication) {
            setFormData(state.medication);
        }
    }, [state]);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "id" ? Number(value) : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.id !== undefined) {
                editMedication(formData.id, {
                    name: formData.name,
                    description: formData.description,
                    indications: formData.indications,
                    contraindications: formData.contraindications,
                    route_administration: formData.route_administration,
                    availability: formData.availability,
                });
                console.log(formData);
            }
        }
        else {
            addMedication(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/medicineList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/medicineList");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Medicamento" : "Agregar Medicamento" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Nombre del medicamento" }), _jsx(Input, { id: "name", name: "name", placeholder: "ej: Vetrimoxin", value: formData.name, onChange: handleChange, required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "route_administration", className: "text-sm font-medium", children: "Ruta de Administraci\u00F3n" }), _jsxs(Select, { name: "route_administration", value: formData.route_administration, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    route_administration: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione la ruta de administracion" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Oral", children: "Oral" }), _jsx(SelectItem, { value: "Inyecci\u00F3n", children: "Inyecci\u00F3n" }), _jsx(SelectItem, { value: "Intranasal", children: "Intranasal" }), _jsx(SelectItem, { value: "T\u00F3pica", children: "T\u00F3pica" })] })] })] }), _jsxs("div", { className: "space-y-2 col-span-2", children: [_jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", name: "description", placeholder: "Descripcion del medicamento...", value: formData.description, onChange: handleChange, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "indications", className: "text-sm font-medium", children: "Indicaciones" }), _jsx(Textarea, { id: "indications", name: "indications", placeholder: "Indicaciones del medicamento...", value: formData.indications, onChange: handleChange, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "contraindications", className: "text-sm font-medium", children: "Contraindicaciones" }), _jsx(Textarea, { id: "contraindications", name: "contraindications", placeholder: "Contraindicaciones del medicamento... ", value: formData.contraindications, onChange: handleChange, className: "max-w-full md:col-span-2" })] }), state?.isEdit && (_jsx("div", { className: "space-y-2 md:col-span-2", children: _jsx(Checkbox, { isSelected: formData.availability, onValueChange: (isSelected) => setFormData((prev) => ({ ...prev, availability: isSelected })), children: "Estado" }) }))] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default MedicineForm;
