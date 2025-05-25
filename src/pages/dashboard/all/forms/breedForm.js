import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import { Label } from "@/components/ui/label";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSpecies } from '@/hooks/species/useSpecies';
import { useBreeds } from '@/hooks/breed/useBreeds';
import { useAuth } from '@/hooks/auth/useAuth';
const BreedForm = () => {
    const location = useLocation();
    const { state } = location; // Aquí recibimos el estado que contiene la raza seleccionada y el indicador de edición
    const { species } = useSpecies();
    const { addBreed, editBreed } = useBreeds();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        species_id: 0,
    });
    useEffect(() => {
        if (state?.isEdit && state?.breed) {
            // Si es edición, prellenamos el formulario con los datos de la raza
            setFormData(state.breed);
        }
    }, [state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            // Editar la raza existente
            if (formData.id !== undefined) {
                editBreed(formData.id, {
                    name: formData.name,
                    species_id: formData.species_id
                });
                console.log(formData);
            }
        }
        else {
            addBreed(formData);
        }
        if (role == "Administrador") {
            navigate('/admin/speciesAndBreedsList');
        }
        else if (role == "Instructor") {
            navigate('/instructor/speciesAndBreedsList');
        }
        else if (role == "Aprendiz") {
            navigate('/apprentice/speciesAndBreedsList');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Raza" : "Agregar Raza" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Nombre de la Raza" }), _jsx(Input, { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese nombre de la raza" })] }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Especie", name: "species_id", labelPlacement: "outside", placeholder: "Seleccione una especie", className: "max-w-full font-medium col-span-2", selectedKey: formData.species_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, species_id: selectedId }));
                                            }, children: species.map((item) => (_jsx(AutocompleteItem, { value: item.id.toString(), children: item.name }, item.id.toString()))) }) })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default BreedForm;
