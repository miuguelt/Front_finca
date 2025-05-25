import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useControls } from "@/hooks/control/useControl";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";
const ControlForm = () => {
    const location = useLocation();
    const { state } = location;
    const { animals } = useAnimals();
    const { addControl, editControl } = useControls();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        animal_id: 0,
        checkup_date: "",
        healt_status: "Exelente",
        description: "",
    });
    useEffect(() => {
        if (state?.isEdit && state?.control) {
            // Si es edición, prellenamos el formulario con los datos de la raza
            setFormData(state.control);
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
                editControl(formData.id, { animal_id: formData.animal_id, checkup_date: formData.checkup_date, healt_status: formData.healt_status, description: formData.description });
                console.log(formData);
            }
        }
        else {
            addControl(formData);
        }
        if (role == "Administrador") {
            navigate('/admin/controlList');
        }
        else if (role == "Instructor") {
            navigate('/instructor/controlList');
        }
        else if (role == "Aprendiz") {
            navigate('/apprentice/controlList');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Control" : "Agregar Control" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsx("div", { className: "space-y-2 md:col-span-2", children: _jsx(Autocomplete, { variant: "flat", label: "Animal", labelPlacement: "outside", defaultItems: animals, placeholder: "Selecciona el animal", className: "max-w-2xl font-medium", selectedKey: formData.animal_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.record }, item.idAnimal ? item.idAnimal.toString() : "")) }) }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { htmlFor: "checkup_date", className: "text-sm font-medium", children: "Fecha de Revisi\u00F3n" }), _jsx(Input, { type: "date", id: "checkup_date", name: "checkup_date", value: formData.checkup_date, onChange: handleChange, required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { htmlFor: "healt_status", className: "text-sm font-medium", children: "Estado de salud" }), _jsxs(Select, { name: "healt_status", value: formData.healt_status, onValueChange: (value) => setFormData((prev) => ({ ...prev, healt_status: value })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el estado de salud" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Exelente", children: "Exelente" }), _jsx(SelectItem, { value: "Bueno", children: "Bueno" }), _jsx(SelectItem, { value: "Regular", children: "Regular" }), _jsx(SelectItem, { value: "Malo", children: "Malo" })] })] })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", name: "description", value: formData.description, onChange: handleChange, required: true, className: "w-full", placeholder: "Descripci\u00F3n del control..." })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default ControlForm;
