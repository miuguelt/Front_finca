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

    return (
        <Sidebar heading="ADMINISTRADOR">

            <SidebarItem icon={<FaUsers className="h-4 w-4" />} title="Usuarios" onClick={() => navigate("/admin/userList")} />

            <Divider className="bg-gray-600" />

            <SidebarItem icon={<PiCowFill className="h-4 w-4" />} title="Animales">
                <SidebarItem icon={<PiCowFill className="h-4 w-4" />} title="Animales" onClick={() => navigate("/admin/animalList")} />

                <SidebarItem icon={<MdSick className="h-4 w-4" />} title="Aninales Enfermos" onClick={() => navigate("/admin/animalDiseaseList")} />

                <SidebarItem icon={<FaArrowAltCircleUp className="h-4 w-4" />} title="Animales Mejorados" onClick={() => navigate("/admin/improvedAnimalList")} />

                <SidebarItem icon={<GiTestTubes className="h-4 w-4" />} title="Razas y Especies" onClick={() => navigate("/admin/speciesAndBreedsList")} />

                <SidebarItem icon={<IoNewspaper className="h-4 w-4" />} title="Controles" onClick={() => navigate("/admin/controlList")} />
            </SidebarItem>

            <Divider className="bg-gray-600" />

            <SidebarItem icon={<FaPlusCircle className="h-4 w-4" />} title="Sanidad">
                <SidebarItem icon={<FaDisease className="h-4 w-4" />} title="Enfermedades" onClick={() => navigate("/admin/diseaseList")} />

                <SidebarItem icon={<GiMedicines className="h-4 w-4" />} title="Medicamentos" onClick={() => navigate("/admin/medicineList")} />

                <SidebarItem icon={<BiSolidInjection className="h-4 w-4" />} title="Vacunas" onClick={() => navigate("/admin/vaccineList")} />

                <SidebarItem icon={<MdVaccines className="h-4 w-4" />} title="Vacunacion" onClick={() => navigate("/admin/vaccinationList")} />

                <SidebarItem icon={<FaFileWaveform className="h-4 w-4" />} title="Tratamientos" onClick={() => navigate("/admin/treatmentList")} />
            </SidebarItem>

            <Divider className="bg-gray-600" />

            <SidebarItem icon={<GiIsland className="h-4 w-4" />} title="Terrenos">

                <SidebarItem icon={<GiIsland className="h-4 w-4" />} title="Terrenos" onClick={() => navigate("/admin/fieldList")} />

                <SidebarItem icon={<GiField className="h-4 w-4" />} title="Pastoreo" onClick={() => navigate("/admin/animalFieldList")} />

                <SidebarItem icon={<FaSeedling className="h-4 w-4" />} title="Siembras" onClick={() => navigate("/admin/foodTypeList")} />
            </SidebarItem>
        </Sidebar>
    );
};

export default AdminSideBar;