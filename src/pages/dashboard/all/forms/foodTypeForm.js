import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { useFoodTypes } from "@/hooks/foodTypes/useFoodTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";
const FoodTypeForm = () => {
    const location = useLocation();
    const { state } = location;
    const { addFoodType, editFoodType } = useFoodTypes();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        food_type: "",
        sowing_date: "",
        harvest_date: "",
        area: 0,
        handlings: "",
        gauges: "",
    });
    useEffect(() => {
        if (state?.isEdit && state?.foodType) {
            setFormData(state.foodType);
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
                editFoodType(formData.id, { food_type: formData.food_type, sowing_date: formData.sowing_date, harvest_date: formData.harvest_date, area: formData.area, handlings: formData.handlings, gauges: formData.gauges });
                console.log(formData);
            }
        }
        else {
            addFoodType(formData);
        }
        if (role == "Administrador") {
            navigate('/admin/foodTypeList');
        }
        else if (role == "Instructor") {
            navigate('/instructor/foodTypeList');
        }
        else if (role == "Aprendiz") {
            navigate('/apprentice/foodTypeList');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Tipo de Alimento" : "Agregar Tipo de Alimento" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "food_type", children: "Tipo de Alimento" }), _jsx(Input, { type: "text", id: "food_type", name: "food_type", placeholder: "ej: Maiz", value: formData.food_type, onChange: handleChange, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "area", children: "\u00C1rea (m\u00B2)" }), _jsx(Input, { type: "number", id: "area", name: "area", value: formData.area.toString(), onChange: handleChange, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sowing_date", children: "Fecha de Siembra" }), _jsx(Input, { type: "date", id: "sowing_date", name: "sowing_date", value: formData.sowing_date, onChange: handleChange, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "harvest_date", children: "Fecha de Cosecha" }), _jsx(Input, { type: "date", id: "harvest_date", name: "harvest_date", value: formData.harvest_date, onChange: handleChange })] }), _jsxs("div", { className: "col-span-2 space-y-2", children: [_jsx(Label, { htmlFor: "handlings", children: "Manejos" }), _jsx(Input, { type: "text", id: "handlings", name: "handlings", placeholder: "Ingrese los manejos", value: formData.handlings, onChange: handleChange, required: true })] }), _jsxs("div", { className: "col-span-2 space-y-2", children: [_jsx(Label, { htmlFor: "gauges", children: "Aforos" }), _jsx(Input, { type: "text", id: "gauges", name: "gauges", placeholder: "Ingrese los aforos", value: formData.gauges, onChange: handleChange, required: true })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 mx-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default FoodTypeForm;
