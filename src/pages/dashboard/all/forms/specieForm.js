import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpecies } from '@/hooks/species/useSpecies';
import { useAuth } from '@/hooks/auth/useAuth';
const SpecieForm = () => {
    const location = useLocation();
    const { state } = location;
    const { addSpecies, editSpecie } = useSpecies();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        name: ""
    });
    useEffect(() => {
        if (state?.isEdit && state?.specie) {
            setFormData(state.specie);
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
                editSpecie(formData.id, { name: formData.name });
                console.log(formData);
            }
        }
        else {
            addSpecies(formData);
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
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Especie" : "Agregar Especie" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Nombre de la Especie" }), _jsx(Input, { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese el nombre de la especie" })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default SpecieForm;
