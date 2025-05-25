import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import { Label } from "@/components/ui/label";
import { Textarea } from '@nextui-org/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocation } from 'react-router-dom';
import { useGeneticImprovements } from '@/hooks/geneticImprovement/useGeneticImprovement';
import { useAnimals } from '@/hooks/animal/useAnimals';
import { useAuth } from '@/hooks/auth/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const ImprovedAnimalForm = () => {
    const { addGeneticImprovement, editGeneticImprovement } = useGeneticImprovements();
    const { animals } = useAnimals();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        animal_id: 0,
        details: '',
        results: '',
        date: '',
        genetic_event_techique: '',
    });
    useEffect(() => {
        if (state?.isEdit && state?.geneticImprovement) {
            setFormData(state.geneticImprovement);
        }
    }, [state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.id !== undefined) {
                editGeneticImprovement(formData.id, {
                    animal_id: formData.animal_id,
                    details: formData.details,
                    results: formData.results,
                    date: formData.date,
                    genetic_event_techique: formData.genetic_event_techique,
                });
                console.log(formData);
            }
        }
        else {
            addGeneticImprovement(formData);
        }
        if (role == "Administrador") {
            navigate('/admin/improvedAnimalList');
        }
        else if (role == "Instructor") {
            navigate('/instructor/improvedAnimalList');
        }
        else if (role == "Aprendiz") {
            navigate('/apprentice/improvedAnimalList');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? 'Editar Mejoramiento Genético' : 'Agregar Mejoramiento Genético' }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsx("div", { className: "space-y-2 col-span-2", children: _jsx(Autocomplete, { variant: "flat", label: "Animal", labelPlacement: "outside", defaultItems: animals, placeholder: "Busca el animal", className: "max-w-2xl font-medium", selectedKey: formData.animal_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.record }, item.idAnimal ? item.idAnimal.toString() : "")) }) }), _jsxs("div", { className: 'space-y-2 col-span-2', children: [_jsx(Label, { htmlFor: "genetic_event_techique", className: "text-sm font-medium", children: "Tecnica del evento genetico" }), _jsxs(Select, { value: formData.genetic_event_techique, onValueChange: (value) => setFormData((prev) => ({ ...prev, genetic_event_techique: value })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione la tecnica" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Inseminacion", children: "Inseminacion" }), _jsx(SelectItem, { value: "Lavado_de_embriones", children: "Lavado de embriones" })] })] })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { htmlFor: "date", className: "text-sm font-medium", children: "Fecha" }), _jsx(Input, { type: "date", id: "date", name: "date", value: formData.date, onChange: handleChange, required: true, className: "max-w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "details", className: "text-sm font-medium", children: "Detalles" }), _jsx(Textarea, { id: "details", name: "details", value: formData.details, onChange: handleChange, required: true, className: "w-full h-24", placeholder: "Detalles del mejoramiento gen\u00E9tico..." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "results", className: "text-sm font-medium", children: "Resultados" }), _jsx(Textarea, { id: "results", name: "results", value: formData.results, onChange: handleChange, required: true, className: "w-full h-24", placeholder: "Resultados del mejoramiento gen\u00E9tico..." })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? 'Guardar cambios' : 'Agregar' }) })] })] }) }));
};
export default ImprovedAnimalForm;
