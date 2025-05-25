import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useDiseases } from "@/hooks/diseases/useDisease";
import { useUsers } from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";
const DiseaseAnimalForm = () => {
    const { animals } = useAnimals();
    const { diseases } = useDiseases();
    const { addAnimalDiseases, editAnimalDisease } = useAnimalDiseases();
    const { users } = useUsers();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        animal_id: 0,
        disease_id: 0,
        diagnosis_date: "",
        instructor_id: 0,
        status: false,
    });
    useEffect(() => {
        if (state?.isEdit && state?.animalDisease) {
            setFormData(state.animalDisease);
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
                editAnimalDisease(formData.id, {
                    animal_id: formData.animal_id,
                    disease_id: formData.disease_id,
                    diagnosis_date: formData.diagnosis_date,
                    instructor_id: formData.instructor_id,
                    status: formData.status,
                });
            }
        }
        else {
            addAnimalDiseases(formData);
        }
        if (role == "Administrador") {
            navigate("/admin/animalDiseaseList");
        }
        else if (role == "Instructor") {
            navigate("/instructor/animalDiseaseList");
        }
        else if (role == "Aprendiz") {
            navigate("/apprentice/animalDiseaseList");
        }
    };
    const filteredInstructors = users.filter((user) => user.role === "Instructor");
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? "Editar Animal Enfermo" : "Agregar Animal Enfermo" }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-5", children: [_jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Animal", labelPlacement: "outside", defaultItems: animals, placeholder: "Selecciona el animal", className: "max-w-2xl font-medium", selectedKey: formData.animal_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.record }, item.idAnimal ? item.idAnimal.toString() : "")) }) }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Enfermedad", labelPlacement: "outside", defaultItems: diseases, placeholder: "Selecciona la enfermedad", className: "max-w-2xl font-medium", selectedKey: formData.disease_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    disease_id: selectedId,
                                                }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.name }, item.id ? item.id.toString() : "")) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "diagnosis_date", className: "text-sm font-medium", children: "Fecha de Diagn\u00F3stico" }), _jsx(Input, { type: "date", id: "diagnosis_date", name: "diagnosis_date", value: formData.diagnosis_date, onChange: handleChange, required: true, className: "w-full" })] }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Instructor a cargo", labelPlacement: "outside", defaultItems: filteredInstructors, placeholder: "Selecciona el instructor", className: "max-w-2xl font-medium", selectedKey: formData.instructor_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    instructor_id: selectedId,
                                                }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.fullname }, item.id ? item.id.toString() : "")) }) }), state?.isEdit && (_jsx("div", { className: "space-y-2 md:col-span-2", children: _jsx(Checkbox, { isSelected: formData.status, onValueChange: (isSelected) => setFormData((prev) => ({ ...prev, status: isSelected })), children: "Estado" }) }))] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? "Guardar Cambios" : "Agregar" }) })] })] }) }));
};
export default DiseaseAnimalForm;
