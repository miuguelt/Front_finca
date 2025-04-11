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

    return (
        <Sidebar heading="INSTRUCTOR">

            <SidebarItem icon={<PiCowFill className="h-4 w-4" />} title="Animales">
                <SidebarItem icon={<PiCowFill className="h-4 w-4" />} title="Animales" onClick={() => navigate("/instructor/animalList")} />

                <SidebarItem icon={<MdSick className="h-4 w-4" />} title="Aninales Enfermos" onClick={() => navigate("/instructor/animalDiseaseList")} />

                <SidebarItem icon={<FaArrowAltCircleUp className="h-4 w-4" />} title="Animales Mejorados" onClick={() => navigate("/instructor/improvedAnimalList")} />

                <SidebarItem icon={<GiTestTubes className="h-4 w-4" />} title="Razas y Especies" onClick={() => navigate("/instructor/speciesAndBreedsList")} />

                <SidebarItem icon={<IoNewspaper className="h-4 w-4" />} title="Controles" onClick={() => navigate("/instructor/controlList")} />
            </SidebarItem>

            <Divider className="bg-gray-600" />

            <SidebarItem icon={<FaPlusCircle className="h-4 w-4" />} title="Sanidad">
                <SidebarItem icon={<FaDisease className="h-4 w-4" />} title="Enfermedades" onClick={() => navigate("/instructor/diseaseList")} />

                <SidebarItem icon={<GiMedicines className="h-4 w-4" />} title="Medicinas" onClick={() => navigate("/instructor/medicineList")} />

                <SidebarItem icon={<BiSolidInjection className="h-4 w-4" />} title="Vacunas" onClick={() => navigate("/instructor/vaccineList")} />

                <SidebarItem icon={<MdVaccines className="h-4 w-4" />} title="Vacunacion" onClick={() => navigate("/instructor/vaccinationList")} />

                <SidebarItem icon={<FaFileWaveform className="h-4 w-4" />} title="Tratamientos" onClick={() => navigate("/instructor/treatmentList")} />
            </SidebarItem>

            <Divider className="bg-gray-600" />

            <SidebarItem icon={<GiIsland className="h-4 w-4" />} title="Terrenos">

                <SidebarItem icon={<GiIsland className="h-4 w-4" />} title="Terrenos" onClick={() => navigate("/instructor/fieldList")} />

                <SidebarItem icon={<GiField className="h-4 w-4" />} title="Pastoreos" onClick={() => navigate("/instructor/animalFieldList")} />

                <SidebarItem icon={<FaSeedling className="h-4 w-4" />} title="Siembras" onClick={() => navigate("/instructor/foodTypeList")} />
            </SidebarItem>
        </Sidebar>
    );
};

export default InstructorSideBar;