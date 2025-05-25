import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
//Types
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useTreatment } from "@/hooks/treatment/useTreatment";
import { useAuth } from "@/hooks/auth/useAuth";
const TreatmentForm = () => {
    const location = useLocation();
    const { state } = location;
    const { animals } = useAnimals();
    const { addTreatment, editTreatment } = useTreatment();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        description: "",
        frequency: "",
        observations: "",
        dosis: "",
        animal_id: 0,
    });
    useEffect(() => {
        if (state?.isEdit && state?.treatment) {
            setFormData(state.treatment);
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
                editTreatment(formData.id, {
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                    description: formData.description,
                    frequency: formData.frequency,
                    observations: formData.observations,
                    dosis: formData.dosis,
                    animal_id: formData.animal_id
                });
                console.log(formData);
            }
        }
        else {
            addTreatment(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/treatmentList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/treatmentList");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Tratamiento" : "Agregar Tratamiento" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "start_date", className: "text-sm font-medium", children: "Fecha de Inicio" }), _jsx(Input, { type: "date", id: "start_date", name: "start_date", value: formData.start_date, onChange: handleChange, required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "end_date", className: "text-sm font-medium", children: "Fecha de Fin" }), _jsx(Input, { type: "date", id: "end_date", name: "end_date", value: formData.end_date, onChange: handleChange, required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "frequency", className: "text-sm font-medium", children: "Frecuencia en d\u00EDas" }), _jsx(Input, { id: "frequency", name: "frequency", value: formData.frequency, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: 12" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "dosis", className: "text-sm font-medium", children: "Dosis en ml" }), _jsx(Input, { id: "dosis", name: "dosis", value: formData.dosis, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: 5" })] }), _jsx("div", { className: "space-y-2 md:col-span-2", children: _jsx(Autocomplete, { variant: "flat", label: "Animal", labelPlacement: "outside", defaultItems: animals, placeholder: "Busca el animal", className: "max-w-full font-medium", selectedKey: formData.animal_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.record }, item.idAnimal ? item.idAnimal.toString() : "")) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", name: "description", placeholder: "Descripcion del tratamiento...", value: formData.description, onChange: handleChange, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "observations", className: "text-sm font-medium", children: "Observaciones" }), _jsx(Textarea, { id: "observations", name: "observations", placeholder: "Observaciones del tratamiento...", value: formData.observations, onChange: handleChange, className: "w-full" })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default TreatmentForm;
