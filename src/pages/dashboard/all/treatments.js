import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PillBottle, Search, Syringe } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Button as Bnx, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, } from "@nextui-org/react";
//Types
import { useTreatment } from "@/hooks/treatment/useTreatment";
import { useVaccines } from "@/hooks/vaccine/useVaccine";
import { useMedications } from "@/hooks/medication/useMedication";
import { useTreatmentVaccines } from "@/hooks/treatmentVaccines/useTreatmentVaccines";
import { useTreatmentMedications } from "@/hooks/treatmentMedication/useTreatentMedication";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";
const TreatmentsList = () => {
    const navigate = useNavigate();
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [searchAnimal, setSearchAnimal] = useState("");
    const [searchTreatment, setSearchTreatment] = useState("");
    const { treatments, loading, error } = useTreatment();
    const { animals } = useAnimals();
    const { vaccines } = useVaccines();
    const { medications } = useMedications();
    const { role } = useAuth();
    // Crear estados separados para los modales
    const { isOpen: isVaccineModalOpen, onOpen: openVaccineModal, onOpenChange: closeVaccineModal, } = useDisclosure();
    const { isOpen: isMedicationModalOpen, onOpen: openMedicationModal, onOpenChange: closeMedicationModal, } = useDisclosure();
    const [formDataVaccine, setFormDataVaccine] = useState({
        vaccine_id: 0,
        treatment_id: 0,
    });
    const { addTreatmentVaccine } = useTreatmentVaccines();
    const { addTreatmentMedication } = useTreatmentMedications();
    const [formDataMedication, setFormDataMedication] = useState({
        medication_id: 0,
        treatment_id: 0,
    });
    const filteredTreatments = treatments.filter((treatment) => treatment.description
        .toLowerCase()
        .includes(searchTreatment.toLowerCase()) &&
        treatment.animals?.record
            .toLowerCase()
            .includes(selectedAnimal?.record.toLowerCase()));
    const filteredAnimals = useMemo(() => animals.filter((animal) => animal.record.toLowerCase().includes(searchAnimal.toLowerCase())), [animals, searchAnimal]);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center h-full", children: _jsx(ClimbingBoxLoader, { color: "#2563EB", size: 30 }) }));
    }
    if (error)
        return _jsx("p", { children: error });
    const handleEdit = (treatment) => {
        const rolePaths = {
            Administrador: "/admin/treatmentCreate",
            Instructor: "/instructor/treatmentCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path, {
                state: {
                    isEdit: true,
                    treatment,
                },
            });
        }
    };
    const handleChangeLink = () => {
        const rolePaths = {
            Administrador: "/admin/treatmentCreate",
            Instructor: "/instructor/treatmentCreate",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
            navigate(path);
        }
    };
    const handleAddVaccine = (e) => {
        e.preventDefault();
        console.log(formDataVaccine);
        addTreatmentVaccine(formDataVaccine);
    };
    const handleAddMedication = (e) => {
        e.preventDefault();
        console.log(formDataMedication);
        addTreatmentMedication(formDataMedication);
    };
    return (_jsxs("div", { className: "container mx-auto p-4 flex flex-col md:flex-row", children: [_jsxs("div", { className: "w-full md:w-1/4 pr-4 mb-4 md:mb-0", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Lista de Animales" }), _jsxs("div", { className: "relative mb-4", children: [_jsx(Search, { className: "absolute w-4 left-2 top-1/2 transform -translate-y-1/2 text-gray-400" }), _jsx(Input, { className: "pl-8 w-full", placeholder: "Buscar animales...", value: searchAnimal, onChange: (e) => setSearchAnimal(e.target.value) })] }), _jsx(ScrollArea, { className: "h-[calc(100vh-200px)]", children: _jsx("ul", { className: "space-y-2", children: filteredAnimals.map((animal) => (_jsx("li", { children: _jsx(Button, { variant: selectedAnimal === animal ? "default" : "outline", className: "w-full justify-start", onClick: () => setSelectedAnimal(animal), children: animal.record }) }, animal.idAnimal))) }) })] }), _jsxs("div", { className: "w-full md:w-3/4", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lista de Tratamientos" }), _jsx(Button, { variant: "ghost", className: "h-8 bg-black text-white hover:bg-gray-900 hover:text-white", onClick: handleChangeLink, children: "Agregar Tratamiento" })] }), _jsx(Input, { className: "pl-8 w-full", placeholder: "Buscar tratamientos...", value: searchTreatment, onChange: (e) => setSearchTreatment(e.target.value) }), _jsx("div", { className: "flex justify-end mb-4" }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-2 gap-6", children: filteredTreatments.map((treatment) => (_jsxs(Card, { className: "text-sm", children: [_jsxs(CardHeader, { className: "flex flex-row justify-between px-6 py-4", children: [_jsxs(CardTitle, { className: "text-lg", children: [treatment.animals?.record, " - ", treatment.description] }), _jsx("div", { className: "flex justify-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-2 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "center", children: _jsx(DropdownMenuItem, { onClick: () => handleEdit(treatment), className: "hover:cursor-pointer", children: "Editar" }) })] }) })] }), _jsxs(CardContent, { children: [_jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Fecha de inicio: " }), " ", treatment.start_date] }), _jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Fecha de fin: " }), " ", treatment.end_date] }), _jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Frecuencia: " }), " ", treatment.frequency] }), _jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Observaciones: " }), " ", treatment.observations] }), _jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Dosis: " }), " ", treatment.dosis] }), _jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Vacunas: " }), treatment.vaccines_treatments
                                                    ?.map((vac) => vac.vaccines?.name)
                                                    .join(", ") || "Ninguna"] }), _jsxs("p", { className: "flex gap-2", children: [_jsx("strong", { children: "Medicamentos: " }), treatment.medication_treatments
                                                    ?.map((med) => med.medications?.name)
                                                    .join(", ") || "Ninguno"] })] }), _jsxs(CardFooter, { className: "flex justify-center space-x-4", children: [_jsx(Bnx, { onPress: openVaccineModal, className: "h-8 rounded-lg bg-black text-white hover:bg-gray-900 hover:text-white p-4 text-xs", startContent: _jsx(Syringe, { className: "h-4" }), children: "Vacunas" }), _jsx(Modal, { isOpen: isVaccineModalOpen, onOpenChange: closeVaccineModal, backdrop: "transparent", motionProps: {
                                                initial: { opacity: 0, y: -50 },
                                                animate: { opacity: 1, y: 0 },
                                                exit: { opacity: 0, y: 50 },
                                                transition: { duration: 0.3 },
                                            }, children: _jsx(ModalContent, { children: (onclose) => (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { children: _jsx("h2", { className: "text-xl font-bold", children: "Agregar Vacuna" }) }), _jsxs("form", { onSubmit: handleAddVaccine, children: [_jsx(ModalBody, { children: _jsx(Autocomplete, { variant: "bordered", label: "Vacunas", name: "vaccine_id", labelPlacement: "outside", placeholder: "Busca la vacuna...", className: "max-w-full font-medium md:col-span-2", selectedKey: formDataVaccine.vaccine_id.toString(), onSelectionChange: (key) => {
                                                                            const selectedId = key ? parseInt(key) : 0;
                                                                            setFormDataVaccine((prev) => ({
                                                                                ...prev,
                                                                                vaccine_id: selectedId,
                                                                            }));
                                                                        }, children: vaccines.map((item) => (_jsx(AutocompleteItem, { value: item.id.toString(), children: item.name }, item.id.toString()))) }) }), _jsxs(ModalFooter, { className: "flex items-center justify-center gap-4", children: [_jsx(Button, { type: "submit", onClick: () => {
                                                                                setFormDataVaccine((prev) => ({
                                                                                    ...prev,
                                                                                    treatment_id: treatment.id,
                                                                                }));
                                                                            }, children: "Agregar Vacuna" }), _jsx(Bnx, { color: "danger", variant: "light", onPress: () => {
                                                                                onclose();
                                                                                setFormDataVaccine({
                                                                                    vaccine_id: 0,
                                                                                    treatment_id: 0,
                                                                                });
                                                                            }, children: "Cerrar" })] })] })] })) }) }), _jsx(Bnx, { onPress: openMedicationModal, className: "h-8 rounded-lg bg-black text-white hover:bg-gray-900 hover:text-white p-4 text-xs", startContent: _jsx(PillBottle, { className: "h-4" }), children: "Medicamentos" }), _jsx(Modal, { isOpen: isMedicationModalOpen, onOpenChange: closeMedicationModal, backdrop: "transparent", motionProps: {
                                                initial: { opacity: 0, y: -50 },
                                                animate: { opacity: 1, y: 0 },
                                                exit: { opacity: 0, y: 50 },
                                                transition: { duration: 0.3 },
                                            }, children: _jsx(ModalContent, { children: (onclose) => (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { children: _jsx("h2", { className: "text-xl font-bold", children: "Agregar Medicamento" }) }), _jsxs("form", { onSubmit: handleAddMedication, children: [_jsx(ModalBody, { children: _jsx(Autocomplete, { variant: "bordered", label: "Medicamentos", name: "medication_id", labelPlacement: "outside", placeholder: "Busca el medicamento...", className: "max-w-full font-medium md:col-span-2", selectedKey: formDataMedication.medication_id.toString(), onSelectionChange: (key) => {
                                                                            const selectedId = key ? parseInt(key) : 0;
                                                                            setFormDataMedication((prev) => ({
                                                                                ...prev,
                                                                                medication_id: selectedId,
                                                                            }));
                                                                        }, children: medications.map((item) => (_jsx(AutocompleteItem, { value: item.id.toString(), children: item.name }, item.id.toString()))) }) }), _jsxs(ModalFooter, { className: "flex justify-center items-center gap-4", children: [_jsx(Button, { type: "submit", onClick: () => {
                                                                                setFormDataMedication((prev) => ({
                                                                                    ...prev,
                                                                                    treatment_id: treatment.id,
                                                                                }));
                                                                            }, children: "Agregar Medicamento" }), _jsx(Bnx, { color: "danger", variant: "light", onPress: () => {
                                                                                onclose();
                                                                                setFormDataMedication({
                                                                                    medication_id: 0,
                                                                                    treatment_id: 0,
                                                                                });
                                                                            }, children: "Close" })] })] })] })) }) })] })] }, treatment.id))) })] })] }));
};
export default TreatmentsList;
