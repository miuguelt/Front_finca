import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import { loginUser } from "@/services/authService";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
const LoginForm = () => {
    const [identification, setIdentification] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (identification && password) {
            setLoading(true);
            setError(null);
            try {
                const response = await loginUser({ identification, password });
                if (response?.success) {
                    login(response?.data);
                }
                else {
                    setError("Documento o contraseña incorrectos");
                }
            }
            catch (error) {
                console.error(error);
                setError("Ocurrió un error al iniciar sesión");
            }
            finally {
                setLoading(false);
            }
        }
        else {
            setError("Por favor, complete todos los campos");
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100", children: loading ? (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50", children: _jsx(ClimbingBoxLoader, { color: "#10B981", loading: loading, size: 15 }) })) : (_jsxs("div", { className: "w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl", children: [_jsx("h2", { className: "text-3xl font-bold text-center text-green-700", children: "Iniciar Sesi\u00F3n" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "documento", className: "text-green-700", children: "N\u00FAmero de Documento" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaUser, {}) }), _jsx(Input, { id: "documento", type: "text", inputMode: "numeric", pattern: "\\d*", maxLength: 10, placeholder: "Ingrese su documento", value: identification, onChange: (e) => setIdentification(e.target.value ? Number(e.target.value) : ""), onKeyPress: (e) => {
                                                if (!/\d/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }, className: "w-full px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-green-700", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FaLock, {}) }), _jsx(Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500", required: true })] })] }), _jsx(Button, { type: "submit", className: "w-full py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg", children: "Iniciar Sesi\u00F3n" })] }), error && (_jsx("div", { className: "text-red-600 text-sm text-center", children: error })), _jsx("div", { className: "text-center mt-4", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["\u00BFNo tienes una cuenta?", " ", _jsx(Link, { to: "/signUp", className: "text-green-600 hover:text-green-700 font-medium", children: "Reg\u00EDstrate aqu\u00ED" })] }) })] })) }));
};
export default LoginForm;
