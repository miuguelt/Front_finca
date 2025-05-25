import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useUsers } from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";
const UserForm = () => {
    const { addUser, editUser } = useUsers();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [formData, setFormData] = useState({
        fullname: "",
        role: "Aprendiz",
        identification: "",
        password: "SENA2024",
        email: "",
        phone: "",
        address: "",
        status: true,
    });
    useEffect(() => {
        if (state?.isEdit && state?.user) {
            setFormData(state.user);
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
                editUser(formData.id, {
                    fullname: formData.fullname,
                    role: formData.role,
                    identification: formData.identification,
                    password: formData.password,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    status: formData.status,
                });
                console.log(formData);
            }
        }
        else {
            addUser(formData);
        }
        navigate("/admin/userList");
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-200", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Usuario" : "Agregar Usuario" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "fullname", className: "text-sm font-medium", children: "Nombre Completo" }), _jsx(Input, { type: "text", id: "fullname", name: "fullname", value: formData.fullname, onChange: handleChange, required: true, className: "w-full", placeholder: "ej: Jhon Mauricio P\u00E9rez Torres" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "role", className: "text-sm font-medium", children: "Rol" }), _jsxs(Select, { name: "role", value: formData.role, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    role: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el rol" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Aprendiz", children: "Aprendiz" }), _jsx(SelectItem, { value: "Instructor", children: "Instructor" }), _jsx(SelectItem, { value: "Administrador", children: "Administrador" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "identification", className: "text-sm font-medium", children: "Identificaci\u00F3n" }), _jsx(Input, { type: "text", id: "identification", name: "identification", value: formData.identification.toString(), onChange: (e) => {
                                                    const value = e.target.value;
                                                    // Permitir solo números
                                                    if (/^\d*$/.test(value)) {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            identification: value,
                                                        }));
                                                    }
                                                }, maxLength: 10, required: true, className: "w-full", placeholder: "ej: 1087635492", pattern: "\\d{1,10}" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Correo Electr\u00F3nico" }), _jsx(Input, { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese el correo electr\u00F3nico" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", className: "text-sm font-medium", children: "Tel\u00E9fono" }), _jsx(Input, { type: "text", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese el tel\u00E9fono" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "address", className: "text-sm font-medium", children: "Direcci\u00F3n" }), _jsx(Input, { type: "text", id: "address", name: "address", value: formData.address, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese la direcci\u00F3n" })] }), state?.isEdit && (_jsx("div", { className: "space-y-2 md:col-span-2", children: _jsx(Checkbox, { isSelected: formData.status, onValueChange: (isSelected) => setFormData((prev) => ({ ...prev, status: isSelected })), children: "Estado" }) }))] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default UserForm;
