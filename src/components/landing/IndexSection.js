import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const IndexSection = () => {
    const navigate = useNavigate();
    return (_jsxs("section", { id: "inicio", className: "relative h-[620px] flex items-center justify-center text-white", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-70 z-10" }), _jsx("div", { className: "absolute inset-0 bg-[url('assets/landing-background.webp?height=500&width=1000&text=Finca+Villa+Luz')] bg-cover bg-center" }), _jsxs("div", { className: "relative z-10 text-center px-4", children: [_jsx("h2", { className: "text-4xl font-bold mb-4", children: "Sistema de Gesti\u00F3n Finca Villa Luz" }), _jsx("p", { className: "text-xl mb-8", children: "Optimizando la administraci\u00F3n y producci\u00F3n agr\u00EDcola" }), _jsxs(Button, { className: "bg-green-600 text-lg hover:bg-green-700", onClick: () => navigate("/login"), children: ["Ingresar al Sistema ", _jsx(ChevronRight, { className: "ml-2" })] })] })] }));
};
export default IndexSection;
