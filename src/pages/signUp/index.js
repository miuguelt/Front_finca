import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaPhone, FaCity } from "react-icons/fa";
import { useUsers } from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
        identification: "",
        fullname: "",
        email: "",
        password: "",
        role: "Aprendiz",
        phone: "",
        address: "",
        status: true,
    });
    const { addUser } = useUsers();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            console.error("Las contraseñas no coinciden");
            return;
        }
        try {
            addUser(formData);
            console.log("Usuario registrado correctamente", formData);
            navigate("/login");
        }
        catch (error) {
            console.error("Error en la solicitud de registro", error);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100", children: _jsxs("div", { className: "w-full max-w-xl p-8 space-y-8 bg-white rounded-xl shadow-2xl", children: [_jsx("h2", { className: "text-3xl font-bold text-center text-green-700", children: "Registro de Usuario" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-12", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2 sm:col-span-2 lg:col-span-2", children: [_jsx(Label, { htmlFor: "identification", className: "text-green-700", children: "N\u00FAmero de Documento" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaIdCard, {}) }), _jsx(Input, { id: "identification", name: "identification", type: "text", inputMode: "numeric", pattern: "\\d*", maxLength: 10, placeholder: "Ingrese su documento", value: formData.identification, onChange: handleChange, onKeyPress: (e) => {
                                                        if (!/\d/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }, className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { className: "space-y-2 sm:col-span-2 lg:col-span-1", children: [_jsx(Label, { htmlFor: "fullname", className: "text-green-700", children: "Nombre Completo" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaUser, {}) }), _jsx(Input, { id: "fullname", name: "fullname", type: "text", placeholder: "Ingrese su nombre completo", value: formData.fullname, onChange: handleChange, className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { className: "space-y-2 sm:col-span-2 lg:col-span-1", children: [_jsx(Label, { htmlFor: "email", className: "text-green-700", children: "Correo Electr\u00F3nico" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaEnvelope, {}) }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "Ingrese su correo electr\u00F3nico", value: formData.email, onChange: handleChange, className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { className: "", children: [_jsx(Label, { htmlFor: "phone", className: "text-green-700", children: "Tel\u00E9fono" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaPhone, {}) }), _jsx(Input, { id: "phone", name: "phone", type: "text", placeholder: "Ingrese su tel\u00E9fono", value: formData.phone, onChange: handleChange, className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "address", className: "text-green-700", children: "Direcci\u00F3n" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaCity, {}) }), _jsx(Input, { id: "address", name: "address", type: "text", placeholder: "Ingrese su direcci\u00F3n", value: formData.address, onChange: handleChange, className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-green-700", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, {}) }), _jsx(Input, { id: "password", name: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: formData.password, onChange: handleChange, className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-green-700", children: "Confirmar Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, {}) }), _jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] })] }), _jsx(Button, { type: "submit", className: "w-full py-4 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg", children: "Registrarse" })] })] }) }));
};
export default SignUpForm;
