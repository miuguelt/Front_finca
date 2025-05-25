import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useFields } from "@/hooks/field/useField";
import { useNavigate } from "react-router-dom";
import { useFoodTypes } from "@/hooks/foodTypes/useFoodTypes";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
const FieldForm = () => {
    const location = useLocation();
    const { state } = location;
    const { addField, editField } = useFields();
    const { foodTypes } = useFoodTypes();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        ubication: "",
        capacity: "",
        state: "Disponible",
        handlings: "",
        guages: "",
        area: "",
        food_type_id: 0
    });
    useEffect(() => {
        if (state?.isEdit && state?.field) {
            setFormData(state.field);
        }
    }, [state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.id !== undefined) {
                editField(formData.id, { name: formData.name, ubication: formData.ubication, capacity: formData.capacity, state: formData.state, handlings: formData.handlings, guages: formData.guages, area: formData.area, food_type_id: formData.food_type_id });
                console.log(formData);
            }
        }
        else {
            addField(formData);
        }
        if (role == "Administrador") {
            navigate('/admin/fieldList');
        }
        else if (role == "Instructor") {
            navigate('/instructor/fieldList');
        }
        else if (role == "Aprendiz") {
            navigate('/apprentice/fieldList');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Terreno" : "Agregar Terreno" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Nombre" }), _jsx(Input, { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: Campo 1" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "ubication", className: "text-sm font-medium", children: "Ubicaci\u00F3n" }), _jsx(Input, { type: "text", id: "ubication", name: "ubication", value: formData.ubication, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: Plano o Coordenadas" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "capacity", className: "text-sm font-medium", children: "Capacidad de carga" }), _jsx(Input, { type: "text", id: "capacity", name: "capacity", value: formData.capacity, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: 10" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "state", className: "text-sm font-medium", children: "Estado" }), _jsxs(Select, { name: "state", value: formData.state, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    state: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el estado" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Disponible", children: "Disponible" }), _jsx(SelectItem, { value: "Ocupado", children: "Ocupado" }), _jsx(SelectItem, { value: "Mantenimiento", children: "Mantenimiento" }), _jsx(SelectItem, { value: "Restringido", children: "Restringido" }), _jsx(SelectItem, { value: "Da\u00F1ado", children: "Da\u00F1ado" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "area", className: "text-sm font-medium", children: "\u00C1rea (m\u00B2)" }), _jsx(Input, { type: "number", id: "area", name: "area", value: formData.area, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: 7" })] }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Tipo de Alimento", labelPlacement: "outside", defaultItems: foodTypes, placeholder: "Seleccione el tipo de alimento", className: "max-w-xs font-medium", selectedKey: formData.food_type_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    food_type_id: selectedId,
                                                }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.food_type }, item.id ? item.id.toString() : "")) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "handlings", className: "text-sm font-medium", children: "Manejos" }), _jsx(Input, { type: "text", id: "handlings", name: "handlings", value: formData.handlings, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese los manejos" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "guages", className: "text-sm font-medium", children: "Aforos" }), _jsx(Input, { type: "text", id: "guages", name: "guages", value: formData.guages, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese los aforos" })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default FieldForm;
