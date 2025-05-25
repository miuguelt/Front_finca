import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useVaccinations } from '@/hooks/vaccination/useVaccination';
import { useUsers } from '@/hooks/user/useUser';
import { useVaccines } from '@/hooks/vaccine/useVaccine';
import { useAnimals } from '@/hooks/animal/useAnimals';
import { useAuth } from '@/hooks/auth/useAuth';
const VaccinationForm = () => {
    const { addVaccination, editVaccination } = useVaccinations();
    const { vaccines } = useVaccines();
    const { animals } = useAnimals();
    const { users } = useUsers();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { role } = useAuth();
    const [formData, setFormData] = useState({
        animal_id: 0,
        vaccine_id: 0,
        application_date: "",
        apprentice_id: 0,
        instructor_id: 0,
    });
    useEffect(() => {
        if (state?.isEdit && state?.vaccination) {
            setFormData(state.vaccination);
        }
    }, [state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state?.isEdit) {
            if (formData.id !== undefined) {
                editVaccination(formData.id, {
                    animal_id: formData.animal_id,
                    vaccine_id: formData.vaccine_id,
                    application_date: formData.application_date,
                    apprentice_id: formData.apprentice_id,
                    instructor_id: formData.instructor_id,
                });
            }
        }
        else {
            addVaccination(formData);
        }
        if (role == "Administrador") {
            navigate('/admin/vaccinationList');
        }
        else if (role == "Instructor") {
            navigate('/instructor/vaccinationList');
        }
    };
    const filteredInstructors = users.filter(user => user.role === 'Instructor');
    const filteredApprentices = users.filter(user => user.role === 'Aprendiz');
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs(Card, { className: "w-full max-w-2xl", children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-3xl font-bold text-center", children: state?.isEdit ? 'Editar Vacunación' : 'Agregar Vacunación' }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(CardContent, { className: "mt-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5", children: [_jsx("div", { className: "space-y-2 col-span-2", children: _jsx(Autocomplete, { variant: "flat", label: "Animal", labelPlacement: "outside", defaultItems: animals, placeholder: "Busca el animal", className: "max-w-2xl font-medium", selectedKey: formData.animal_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.record }, item.idAnimal ? item.idAnimal.toString() : "")) }) }), _jsx("div", { className: "space-y-2", children: _jsx(Autocomplete, { variant: "flat", label: "Vacuna", labelPlacement: "outside", defaultItems: vaccines, placeholder: "Busca la vacuna", className: "max-w-2xl font-medium", selectedKey: formData.vaccine_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, vaccine_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.name }, item.id ? item.id.toString() : "")) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "application_date", className: "text-sm font-medium", children: "Fecha de Aplicaci\u00F3n" }), _jsx(Input, { id: "application_date", name: "application_date", type: "date", value: formData.application_date, onChange: handleChange, required: true, className: "w-full" })] }), _jsx("div", { className: "space-y-2 col-span-2", children: _jsx(Autocomplete, { variant: "flat", name: "apprentice_id", label: "Aprendiz a cargo", labelPlacement: "outside", defaultItems: filteredApprentices, placeholder: "Busca el aprendiz", className: "max-w-2xl font-medium", selectedKey: formData.apprentice_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, apprentice_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.fullname }, item.id ? item.id.toString() : "")) }) }), _jsx("div", { className: "space-y-2 col-span-2", children: _jsx(Autocomplete, { variant: "flat", name: "instructor_id", label: "Instructor a cargo", labelPlacement: "outside", defaultItems: filteredInstructors, placeholder: "Busca el instructor", className: "max-w-2xl font-medium", selectedKey: formData.instructor_id.toString(), onSelectionChange: (key) => {
                                                const selectedId = key ? parseInt(key) : 0;
                                                setFormData((prev) => ({ ...prev, instructor_id: selectedId }));
                                            }, children: (item) => (_jsx(AutocompleteItem, { children: item.fullname }, item.id ? item.id.toString() : "")) }) })] }) }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-48 m-auto", children: state?.isEdit ? 'Guardar cambios' : 'Agregar' }) })] })] }) }));
};
export default VaccinationForm;
