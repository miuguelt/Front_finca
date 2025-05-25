import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarItem } from "../dashboard/sideBar";
import { useNavigate } from "react-router-dom";
import { Divider } from "@nextui-org/react";
//Iconos
import { FaUsers, FaArrowAltCircleUp, FaPlusCircle, FaSeedling, FaDisease } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";
import { MdSick, MdVaccines } from "react-icons/md";
import { PiCowFill } from "react-icons/pi";
import { GiField, GiTestTubes, GiIsland, GiMedicines } from "react-icons/gi";
import { BiSolidInjection } from "react-icons/bi";
import { IoNewspaper } from "react-icons/io5";
const AdminSideBar = () => {
    const navigate = useNavigate();
    return (_jsxs(Sidebar, { heading: "ADMINISTRADOR", children: [_jsx(SidebarItem, { icon: _jsx(FaUsers, { className: "h-4 w-4" }), title: "Usuarios", onClick: () => navigate("/admin/userList") }), _jsx(Divider, { className: "bg-gray-600" }), _jsxs(SidebarItem, { icon: _jsx(PiCowFill, { className: "h-4 w-4" }), title: "Animales", children: [_jsx(SidebarItem, { icon: _jsx(PiCowFill, { className: "h-4 w-4" }), title: "Animales", onClick: () => navigate("/admin/animalList") }), _jsx(SidebarItem, { icon: _jsx(MdSick, { className: "h-4 w-4" }), title: "Aninales Enfermos", onClick: () => navigate("/admin/animalDiseaseList") }), _jsx(SidebarItem, { icon: _jsx(FaArrowAltCircleUp, { className: "h-4 w-4" }), title: "Animales Mejorados", onClick: () => navigate("/admin/improvedAnimalList") }), _jsx(SidebarItem, { icon: _jsx(GiTestTubes, { className: "h-4 w-4" }), title: "Razas y Especies", onClick: () => navigate("/admin/speciesAndBreedsList") }), _jsx(SidebarItem, { icon: _jsx(IoNewspaper, { className: "h-4 w-4" }), title: "Controles", onClick: () => navigate("/admin/controlList") })] }), _jsx(Divider, { className: "bg-gray-600" }), _jsxs(SidebarItem, { icon: _jsx(FaPlusCircle, { className: "h-4 w-4" }), title: "Sanidad", children: [_jsx(SidebarItem, { icon: _jsx(FaDisease, { className: "h-4 w-4" }), title: "Enfermedades", onClick: () => navigate("/admin/diseaseList") }), _jsx(SidebarItem, { icon: _jsx(GiMedicines, { className: "h-4 w-4" }), title: "Medicamentos", onClick: () => navigate("/admin/medicineList") }), _jsx(SidebarItem, { icon: _jsx(BiSolidInjection, { className: "h-4 w-4" }), title: "Vacunas", onClick: () => navigate("/admin/vaccineList") }), _jsx(SidebarItem, { icon: _jsx(MdVaccines, { className: "h-4 w-4" }), title: "Vacunacion", onClick: () => navigate("/admin/vaccinationList") }), _jsx(SidebarItem, { icon: _jsx(FaFileWaveform, { className: "h-4 w-4" }), title: "Tratamientos", onClick: () => navigate("/admin/treatmentList") })] }), _jsx(Divider, { className: "bg-gray-600" }), _jsxs(SidebarItem, { icon: _jsx(GiIsland, { className: "h-4 w-4" }), title: "Terrenos", children: [_jsx(SidebarItem, { icon: _jsx(GiIsland, { className: "h-4 w-4" }), title: "Terrenos", onClick: () => navigate("/admin/fieldList") }), _jsx(SidebarItem, { icon: _jsx(GiField, { className: "h-4 w-4" }), title: "Pastoreo", onClick: () => navigate("/admin/animalFieldList") }), _jsx(SidebarItem, { icon: _jsx(FaSeedling, { className: "h-4 w-4" }), title: "Siembras", onClick: () => navigate("/admin/foodTypeList") })] })] }));
};
export default AdminSideBar;
