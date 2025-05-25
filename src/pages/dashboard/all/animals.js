import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, QrCode, Printer, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
import { QRCodeScanner } from "./QRCodeScanner";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { useAnimals } from "@/hooks/animal/useAnimals";
const AnimalList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
    const [isQRGeneratorOpen, setIsQRGeneratorOpen] = useState(false);
    const navigate = useNavigate();
    const { animals, loading, error } = useAnimals();
    const { role } = useAuth();
    const [filteredAnimals, setFilteredAnimals] = useState(animals);
    const filterAnimals = useCallback(() => {
        if (searchTerm) {
            const filtered = animals.filter((animal) => animal.record.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredAnimals(filtered);
        }
        else {
            setFilteredAnimals(animals);
        }
    }, [searchTerm, animals]);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            filterAnimals();
        }, 500); // Espera medio segundo antes de aplicar el filtro
        return () => clearTimeout(timeoutId); // Limpia el timeout en caso de cambios rápidos
    }, [searchTerm, filterAnimals]);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error) {
        return _jsx("p", { className: "text-center text-red-500", children: error });
    }
    if (filteredAnimals.length === 0) {
        return _jsx("p", { className: "text-center text-gray-500", children: "No se encontraron animales." });
    }
    const handleEdit = (animal) => {
        const rolePaths = {
            Administrador: "/admin/animalCreate",
            Instructor: "/instructor/animalCreate",
            Aprendiz: "/apprentice/animalCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    animal,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/animalCreate",
            Instructor: "/instructor/animalCreate",
            Aprendiz: "/apprentice/animalCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    const handleQRCodeScanned = (data) => {
        setSearchTerm(data);
        setIsQRScannerOpen(false);
    };
    const clearSearch = () => {
        setSearchTerm("");
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (_jsxs("div", { className: "container mx-auto p-6 ", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-11", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Animales" }), _jsxs("div", { className: "flex justify-center items-center gap-6", children: [_jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar animal" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Input, { className: "w-72 pr-8", placeholder: "Buscar por registro...", value: searchTerm, onChange: handleSearchChange }), searchTerm && (_jsx("button", { className: "absolute right-2 top-1/2 transform -translate-y-1/2", onClick: clearSearch, children: _jsx(X, { className: "h-4 w-4 text-gray-500" }) }))] }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setIsQRScannerOpen(true), children: _jsx(QrCode, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setIsQRGeneratorOpen(true), children: _jsx(Printer, { className: "h-4 w-4" }) })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredAnimals.map((animal) => (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-2 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: animal.record }), _jsx(Badge, { variant: animal.status === "Vivo"
                                        ? "vivo"
                                        : animal.status === "Muerto"
                                            ? "destructive"
                                            : "secondary", children: animal.status })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-xs text-muted-foreground space-y-2", children: [_jsxs("p", { children: [_jsxs("span", { className: "font-semibold text-gray-700", children: ["Nacimiento:", " "] }), animal.birth_date] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-gray-700", children: "Sexo: " }), animal.sex] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-gray-700", children: "Peso: " }), animal.weight] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-gray-700", children: "Padre: " }), animal.father?.record || "N/A"] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-gray-700", children: "Madre: " }), animal.mother?.record || "N/A"] }), _jsxs("p", { children: [_jsx("span", { className: "font-semibold text-gray-700", children: "Raza: " }), animal.breed?.name] })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-2 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "center", children: _jsx(DropdownMenuItem, { onClick: () => handleEdit(animal), className: "hover:cursor-pointer", children: "Editar" }) })] }) })] })] }, animal.record))) }), _jsx(QRCodeScanner, { isOpen: isQRScannerOpen, onClose: () => setIsQRScannerOpen(false), onScan: handleQRCodeScanned }), _jsx(QRCodeGenerator, { isOpen: isQRGeneratorOpen, onClose: () => setIsQRGeneratorOpen(false), animals: animals })] }));
};
export default AnimalList;
