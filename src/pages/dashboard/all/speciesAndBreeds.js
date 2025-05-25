import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
//Types
import { useBreeds } from "@/hooks/breed/useBreeds";
import { useSpecies } from "@/hooks/species/useSpecies";
import { ClimbingBoxLoader } from "react-spinners";
const SpeciesAndBreedsList = () => {
    const [searchBreeds, setSearchBreeds] = useState("");
    const [searchSpecies, setSearchSpecies] = useState("");
    const navigate = useNavigate();
    const { breeds, loading, error } = useBreeds();
    const { species } = useSpecies();
    const { role } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    const filteredBreeds = breeds.filter((breed) => breed.name.toLowerCase().includes(searchBreeds.toLowerCase()));
    const filteredSpecies = species.filter((specie) => specie.name.toLowerCase().includes(searchSpecies.toLowerCase()));
    const handleEditSpecies = (specie) => {
        const rolePaths = {
            Administrador: "/admin/specieCreate",
            Instructor: "/instructor/specieCreate",
            Aprendiz: "/apprentice/specieCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    specie,
                },
            });
        }
    };
    const handleChangeLinkSpecies = () => {
        const rolePaths = {
            Administrador: "/admin/specieCreate",
            Instructor: "/instructor/specieCreate",
            Aprendiz: "/apprentice/specieCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    const handleEdit = (breed) => {
        const rolePaths = {
            Administrador: "/admin/breedCreate",
            Instructor: "/instructor/breedCreate",
            Aprendiz: "/apprentice/breedCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    breed,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/breedCreate",
            Instructor: "/instructor/breedCreate",
            Aprendiz: "/apprentice/breedCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-8 text-center", children: "Gesti\u00F3n de Animales" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { children: _jsxs(Card, { className: "h-full", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Razas" }), _jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar raza" })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-8", placeholder: "Buscar razas...", value: searchBreeds, onChange: (e) => setSearchBreeds(e.target.value) })] })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: filteredBreeds.map((breed) => (_jsxs(Card, { className: "bg-secondary", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: breed.name }), _jsx(Badge, { variant: "outline", children: breed.species?.name })] }), _jsx(CardContent, { children: _jsx("div", { className: "flex justify-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-2 w-8 p-0 py-2", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "center", children: _jsx(DropdownMenuItem, { onClick: () => handleEdit(breed), className: "hover:cursor-pointer", children: "Editar" }) })] }) }) })] }, breed.id))) }) })] }) }), _jsx("div", { children: _jsxs(Card, { className: "h-full", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Especies" }), _jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLinkSpecies, children: "Agregar especie" })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-8", placeholder: "Buscar especies...", value: searchSpecies, onChange: (e) => setSearchSpecies(e.target.value) })] })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: filteredSpecies.map((specie) => (_jsxs(Card, { className: "bg-secondary", children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: specie.name }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex justify-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-2 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "center", children: _jsx(DropdownMenuItem, { onClick: () => handleEditSpecies(specie), className: "hover:cursor-pointer", children: "Editar" }) })] }) }) })] }, specie.id))) }) })] }) })] })] }));
};
export default SpeciesAndBreedsList;
