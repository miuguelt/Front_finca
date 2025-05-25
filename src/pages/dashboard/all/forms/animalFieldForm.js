import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useAnimalFields } from "@/hooks/animalFields/useAnimalFields";
import { useFields } from "@/hooks/field/useField";
import { Checkbox } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";
const AnimalFieldForm = () => {
    const location = useLocation();
    const { state } = location;
    const { animals } = useAnimals();
    const { fields } = useFields();
    const { addAnimalFields, editAnimalFields } = useAnimalFields();
    const navigate = useNavigate();
    const { role } = useAuth();
    // Inicializar el estado con tipado
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        duration: "",
        animal_id: 0,
        field_id: 0,
        status: true,
    });
    useEffect(() => {
        if (state?.isEdit && state?.animalField) {
            setFormData(state.animalField);
        }
    }, [state]);
    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.id !== undefined) {
                editAnimalFields(formData.id, {
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                    duration: formData.duration,
                    animal_id: formData.animal_id,
                    field_id: formData.field_id,
                    status: formData.status,
                });
                console.log(formData);
            }
        }
        else {
            addAnimalFields(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/animalFieldList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/animalFieldList");
        }
        else if (role == "Aprendiz") {
            navigate("/apprentice/animalFieldList");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Pastoreo" : "Agregar Pastoreo" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Animal", labelPlacement: "outside", defaultItems: animals, placeholder: "Busca el animal", className: "max-w-xs font-medium", selectedKey: formData.animal_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.record }, item.idAnimal ? item.idAnimal.toString() : "")) }) }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Potrero", labelPlacement: "outside", defaultItems: fields, placeholder: "Busca el potrero", className: "max-w-full font-medium md:col-span-2", selectedKey: formData.field_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, field_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.name }, item.id ? item.id.toString() : "")) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "start_date", children: "Fecha de Inicio" }), _jsx(Input, { type: "date", id: "start_date", name: "start_date", value: formData.start_date, onChange: handleChange, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "end_date", children: "Fecha de Fin" }), _jsx(Input, { type: "date", id: "end_date", name: "end_date", value: formData.end_date, onChange: handleChange })] }), _jsxs("div", { className: "col-span-2 space-y-2", children: [_jsx(Label, { htmlFor: "duration", children: "Duraci\u00F3n en d\u00EDas" }), _jsx(Input, { type: "text", id: "duration", name: "duration", value: formData.duration, onChange: handleChange, placeholder: "ej: 30", required: true })] }), state?.isEdit && (_jsx("div", { className: "space-y-2 md:col-span-2", children: _jsx(Checkbox, { isSelected: formData.status, onValueChange: (isSelected) => setFormData((prev) => ({ ...prev, status: isSelected })), children: "Pastoreando" }) }))] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default AnimalFieldForm;
