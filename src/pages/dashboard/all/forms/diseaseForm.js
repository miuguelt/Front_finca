import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
//Types
import { useDiseases } from '@/hooks/diseases/useDisease';
import { Input, Textarea } from '@nextui-org/react';
import { useAuth } from '@/hooks/auth/useAuth';
const DiseaseForm = () => {
    const location = useLocation();
    const { state } = location;
    const { addDiseases, editDisease } = useDiseases();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        syntoptoms: '',
        details: '',
    });
    useEffect(() => {
        if (state?.isEdit && state?.disease) {
            setFormData(state.disease);
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
                editDisease(formData.id, {
                    name: formData.name,
                    syntoptoms: formData.syntoptoms,
                    details: formData.details
                });
                console.log(formData);
            }
        }
        else {
            addDiseases(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/diseaseList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/diseaseList");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Enfermedad" : "Agregar Enfermedad" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Nombre de la Enfermedad" }), _jsx(Input, { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese nombre de la enfermedad" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "syntoptoms", className: "text-sm font-medium", children: "S\u00EDntomas" }), _jsx(Textarea, { id: "syntoptoms", name: "syntoptoms", placeholder: "Sintomas de la enfermedad...", value: formData.syntoptoms, onChange: handleChange, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "details", className: "text-sm font-medium", children: "Detalles" }), _jsx(Textarea, { id: "details", name: "details", placeholder: "Detalles de la enfermedad...", value: formData.details, onChange: handleChange, className: "w-full" })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default DiseaseForm;
