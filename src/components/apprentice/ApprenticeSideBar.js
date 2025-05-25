import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarItem } from "../dashboard/sideBar";
import { useNavigate } from "react-router-dom";
import { Divider } from "@nextui-org/react";
//Iconos
import { FaArrowAltCircleUp, FaSeedling } from "react-icons/fa";
import { MdSick } from "react-icons/md";
import { PiCowFill } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";
import { GiField, GiIsland, GiTestTubes } from "react-icons/gi";
const ApprenticeSideBar = () => {
    const navigate = useNavigate();
    return (_jsxs(Sidebar, { heading: "APRENDIZ", children: [_jsxs(SidebarItem, { icon: _jsx(PiCowFill, { className: "h-4 w-4" }), title: "Animales", children: [_jsx(SidebarItem, { icon: _jsx(PiCowFill, { className: "h-4 w-4" }), title: "Animales", onClick: () => navigate("/apprentice/animalList") }), _jsx(SidebarItem, { icon: _jsx(MdSick, { className: "h-4 w-4" }), title: "Aninales Enfermos", onClick: () => navigate("/apprentice/animalDiseaseList") }), _jsx(SidebarItem, { icon: _jsx(FaArrowAltCircleUp, { className: "h-4 w-4" }), title: "Animales Mejorados", onClick: () => navigate("/apprentice/improvedAnimalList") }), _jsx(SidebarItem, { icon: _jsx(GiTestTubes, { className: "h-4 w-4" }), title: "Razas y Especies", onClick: () => navigate("/apprentice/speciesAndBreedsList") }), _jsx(SidebarItem, { icon: _jsx(IoNewspaper, { className: "h-4 w-4" }), title: "Controles", onClick: () => navigate("/apprentice/controlList") })] }), _jsx(Divider, { className: "bg-gray-600" }), _jsxs(SidebarItem, { icon: _jsx(GiIsland, { className: "h-4 w-4" }), title: "Terrenos", children: [_jsx(SidebarItem, { icon: _jsx(GiIsland, { className: "h-4 w-4" }), title: "Terrenos", onClick: () => navigate("/apprentice/fieldList") }), _jsx(SidebarItem, { icon: _jsx(GiField, { className: "h-4 w-4" }), title: "Pastoreos", onClick: () => navigate("/apprentice/animalFieldList") }), _jsx(SidebarItem, { icon: _jsx(FaSeedling, { className: "h-4 w-4" }), title: "Siembras", onClick: () => navigate("/apprentice/foodTypeList") })] })] }));
};
export default ApprenticeSideBar;
