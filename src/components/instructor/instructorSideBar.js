import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarItem } from "../dashboard/sideBar";
import { useNavigate } from "react-router-dom";
import { Divider } from "@nextui-org/react";
//Iconos
import { FaArrowAltCircleUp, FaPlusCircle, FaSeedling, FaDisease } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";
import { MdSick, MdVaccines } from "react-icons/md";
import { PiCowFill } from "react-icons/pi";
import { GiField, GiTestTubes, GiIsland, GiMedicines } from "react-icons/gi";
import { BiSolidInjection } from "react-icons/bi";
import { IoNewspaper } from "react-icons/io5";
const InstructorSideBar = () => {
    const navigate = useNavigate();
    return (_jsxs(Sidebar, { heading: "INSTRUCTOR", children: [_jsxs(SidebarItem, { icon: _jsx(PiCowFill, { className: "h-4 w-4" }), title: "Animales", children: [_jsx(SidebarItem, { icon: _jsx(PiCowFill, { className: "h-4 w-4" }), title: "Animales", onClick: () => navigate("/instructor/animalList") }), _jsx(SidebarItem, { icon: _jsx(MdSick, { className: "h-4 w-4" }), title: "Aninales Enfermos", onClick: () => navigate("/instructor/animalDiseaseList") }), _jsx(SidebarItem, { icon: _jsx(FaArrowAltCircleUp, { className: "h-4 w-4" }), title: "Animales Mejorados", onClick: () => navigate("/instructor/improvedAnimalList") }), _jsx(SidebarItem, { icon: _jsx(GiTestTubes, { className: "h-4 w-4" }), title: "Razas y Especies", onClick: () => navigate("/instructor/speciesAndBreedsList") }), _jsx(SidebarItem, { icon: _jsx(IoNewspaper, { className: "h-4 w-4" }), title: "Controles", onClick: () => navigate("/instructor/controlList") })] }), _jsx(Divider, { className: "bg-gray-600" }), _jsxs(SidebarItem, { icon: _jsx(FaPlusCircle, { className: "h-4 w-4" }), title: "Sanidad", children: [_jsx(SidebarItem, { icon: _jsx(FaDisease, { className: "h-4 w-4" }), title: "Enfermedades", onClick: () => navigate("/instructor/diseaseList") }), _jsx(SidebarItem, { icon: _jsx(GiMedicines, { className: "h-4 w-4" }), title: "Medicinas", onClick: () => navigate("/instructor/medicineList") }), _jsx(SidebarItem, { icon: _jsx(BiSolidInjection, { className: "h-4 w-4" }), title: "Vacunas", onClick: () => navigate("/instructor/vaccineList") }), _jsx(SidebarItem, { icon: _jsx(MdVaccines, { className: "h-4 w-4" }), title: "Vacunacion", onClick: () => navigate("/instructor/vaccinationList") }), _jsx(SidebarItem, { icon: _jsx(FaFileWaveform, { className: "h-4 w-4" }), title: "Tratamientos", onClick: () => navigate("/instructor/treatmentList") })] }), _jsx(Divider, { className: "bg-gray-600" }), _jsxs(SidebarItem, { icon: _jsx(GiIsland, { className: "h-4 w-4" }), title: "Terrenos", children: [_jsx(SidebarItem, { icon: _jsx(GiIsland, { className: "h-4 w-4" }), title: "Terrenos", onClick: () => navigate("/instructor/fieldList") }), _jsx(SidebarItem, { icon: _jsx(GiField, { className: "h-4 w-4" }), title: "Pastoreos", onClick: () => navigate("/instructor/animalFieldList") }), _jsx(SidebarItem, { icon: _jsx(FaSeedling, { className: "h-4 w-4" }), title: "Siembras", onClick: () => navigate("/instructor/foodTypeList") })] })] }));
};
export default InstructorSideBar;
