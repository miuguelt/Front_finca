import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useVaccines } from "@/hooks/vaccine/useVaccine";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useDiseases } from "@/hooks/diseases/useDisease";
import { useAuth } from "@/hooks/auth/useAuth";
const VaccineForm = () => {
    const location = useLocation();
    const { state } = location;
    const { diseases } = useDiseases();
    const { addVaccine, editVaccine } = useVaccines();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        dosis: "",
        route_administration: "Oral",
        vaccination_interval: "",
        target_disease_id: 0,
        vaccine_type: "Arn",
        national_plan: "Obligatoria",
    });
    useEffect(() => {
        if (state?.isEdit && state?.vaccine) {
            setFormData(state.vaccine);
        }
    }, [state]);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.id !== undefined) {
                editVaccine(formData.id, {
                    name: formData.name,
                    dosis: formData.dosis,
                    route_administration: formData.route_administration,
                    vaccination_interval: formData.vaccination_interval,
                    target_disease_id: formData.target_disease_id,
                    vaccine_type: formData.vaccine_type,
                    national_plan: formData.national_plan,
                });
                console.log(formData);
            }
        }
        else {
            addVaccine(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/vaccineList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/vaccineList");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Vacuna" : "Agregar Vacuna" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Nombre" }), _jsx(Input, { id: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese el nombre" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "vaccine_type", className: "text-sm font-medium", children: "Tipo de Vacuna" }), _jsxs(Select, { name: "vaccine_type", value: formData.vaccine_type, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    vaccine_type: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el tipo de vacunas" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Atenuada", children: "Atenuada" }), _jsx(SelectItem, { value: "Inactiva", children: "Inactiva" }), _jsx(SelectItem, { value: "Subunidad", children: "Subunidad" }), _jsx(SelectItem, { value: "Toxoide", children: "Toxoide" }), _jsx(SelectItem, { value: "Conjugada", children: "Conjugada" }), _jsx(SelectItem, { value: "Adn", children: "Adn" }), _jsx(SelectItem, { value: "Recombinante", children: "Recombinante" }), _jsx(SelectItem, { value: "Arn", children: "Arn" })] })] })] }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Enfermedad obejtivo", labelPlacement: "outside", defaultItems: diseases, placeholder: "Busca la enfermedad", className: "max-w-2xl font-medium", selectedKey: formData.target_disease_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    target_disease_id: selectedId,
                                                }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.name }, item.id ? item.id.toString() : "")) }) }), _jsxs("div", { className: "space-y-2 flex flex-col", children: [_jsx(Label, { htmlFor: "dosis", className: "text-sm font-medium", children: "Dosis en ml" }), _jsx(Input, { id: "dosis", value: formData.dosis, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: 55" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "route_administration", className: "text-sm font-medium", children: "Ruta de Administraci\u00F3n" }), _jsxs(Select, { name: "route_administration", value: formData.route_administration, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    route_administration: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione la ruta de administracion" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Oral", children: "Oral" }), _jsx(SelectItem, { value: "Intranasal", children: "Intranasal" }), _jsx(SelectItem, { value: "T\u00F3pica", children: "T\u00F3pica" }), _jsx(SelectItem, { value: "Intramuscular", children: "Intramuscular" }), _jsx(SelectItem, { value: "Intravenosa", children: "Intravenosa" }), _jsx(SelectItem, { value: "Subcut\u00E1nea", children: "Subcut\u00E1nea" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "vaccination_interval", className: "text-sm font-medium", children: "Intervalo de Vacunaci\u00F3n en d\u00EDas" }), _jsx(Input, { id: "vaccination_interval", value: formData.vaccination_interval, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: 3 dias" })] }), _jsxs("div", { className: "space-y-2 col-span-2", children: [_jsx(Label, { htmlFor: "national_plan", className: "text-sm font-medium", children: "Plan Nacional" }), _jsxs(Select, { name: "national_plan", value: formData.national_plan, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    national_plan: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el plan nacional" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Obligatoria", children: "Obligatoria" }), _jsx(SelectItem, { value: "No_obligatoria", children: "No Obligatoria" })] })] })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Crear Vacuna" }) })] })] }) }));
};
export default VaccineForm;
