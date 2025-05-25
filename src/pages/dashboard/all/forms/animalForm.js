import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
//Types
import { useBreeds } from "@/hooks/breed/useBreeds";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useAuth } from "@/hooks/auth/useAuth";
const AnimalForm = () => {
    const location = useLocation();
    const { state } = location;
    const { breeds } = useBreeds();
    const { animals, addAnimal, editAnimal } = useAnimals();
    const navigate = useNavigate();
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        birth_date: "",
        sex: "",
        weight: 0,
        record: "",
        idFather: null,
        idMother: null,
        breeds_id: 0,
        status: "Vivo",
    });
    useEffect(() => {
        if (state?.isEdit && state?.animal) {
            setFormData({
                idAnimal: state.animal.idAnimal || undefined,
                birth_date: state.animal.birth_date || "",
                sex: state.animal.sex || "",
                weight: state.animal.weight || 0,
                record: state.animal.record || "",
                idFather: state.animal.idFather || null,
                idMother: state.animal.idMother || null,
                breeds_id: state.animal.breed?.id || null,
                status: state.animal.status || "",
            });
        }
        console.log("formData", formData);
    }, [state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "weight" && !/^\d*$/.test(value)) {
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.idAnimal !== undefined) {
                editAnimal(formData.idAnimal, {
                    birth_date: formData.birth_date,
                    sex: formData.sex,
                    weight: formData.weight,
                    record: formData.record,
                    idFather: formData.idFather ? formData.idFather : null,
                    idMother: formData.idMother ? formData.idMother : null,
                    breeds_id: formData.breeds_id ? formData.breeds_id : 0,
                    status: formData.status,
                });
                console.log(formData.weight);
            }
        }
        else {
            addAnimal(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/animalList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/animalList");
        }
        else if (role == "Aprendiz") {
            navigate("/apprentice/animalList");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Animal" : "Agregar Animal" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "birth_date", className: "text-sm font-medium", children: "Fecha de Nacimiento" }), _jsx(Input, { type: "date", id: "birth_date", name: "birth_date", value: formData.birth_date, onChange: handleChange, required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sex", className: "text-sm font-medium", children: "Sexo" }), _jsxs(Select, { name: "sex", value: formData.sex, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    sex: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el sexo" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Macho", children: "Macho" }), _jsx(SelectItem, { value: "Hembra", children: "Hembra" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "weight", className: "text-sm font-medium", children: "Peso en Kg" }), _jsx(Input, { type: "text", id: "weight", name: "weight", value: formData.weight.toString(), onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese peso" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "record", className: "text-sm font-medium", children: "Registro" }), _jsx(Input, { type: "text", id: "record", name: "record", value: formData.record, onChange: handleChange, required: true, className: "w-full", placeholder: "Ingrese el registro del animal" })] }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", name: "idFather", label: "Padre", labelPlacement: "outside", placeholder: "Busca al padre", className: "max-w-xs font-medium", selectedKey: formData.idFather ? formData.idFather.toString() : "", onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, idFather: selectedId }));
                                            }, children: animals.map((item) => (_jsx(AutocompleteItem, { value: item.idAnimal.toString(), children: item.record }, item.idAnimal.toString()))) }) }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", name: "idMother", label: "Madre", labelPlacement: "outside", placeholder: "Busca la madre", className: "max-w-xs font-medium", selectedKey: formData.idMother ? formData.idMother.toString() : "", onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, idMother: selectedId }));
                                            }, children: animals.map((item) => (_jsx(AutocompleteItem, { value: item.idAnimal.toString(), children: item.record }, item.idAnimal.toString()))) }) }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Raza", name: "breeds_id", labelPlacement: "outside", placeholder: "Busca la raza", className: "max-w-full font-medium md:col-span-2", selectedKey: formData.breeds_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, breeds_id: selectedId }));
                                            }, children: breeds.map((item) => (_jsx(AutocompleteItem, { value: item.id.toString(), children: item.name }, item.id.toString()))) }) }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "status", className: "text-sm font-medium", children: "Estado" }), _jsxs(Select, { name: "status", value: formData.status, onValueChange: (value) => setFormData((prev) => ({
                                                    ...prev,
                                                    status: value,
                                                })), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Seleccione el estado" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Vivo", children: "Vivo" }), _jsx(SelectItem, { value: "Vendido", children: "Vendido" }), _jsx(SelectItem, { value: "Muerto", children: "Muerto" })] })] })] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default AnimalForm;
