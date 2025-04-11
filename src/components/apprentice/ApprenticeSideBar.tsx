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

    return (
        <Sidebar heading="APRENDIZ">

            <SidebarItem icon={<PiCowFill className="h-4 w-4" />} title="Animales">
                <SidebarItem icon={<PiCowFill className="h-4 w-4" />} title="Animales" onClick={() => navigate("/apprentice/animalList")} />

                <SidebarItem icon={<MdSick className="h-4 w-4" />} title="Aninales Enfermos" onClick={() => navigate("/apprentice/animalDiseaseList")} />

                <SidebarItem icon={<FaArrowAltCircleUp className="h-4 w-4" />} title="Animales Mejorados" onClick={() => navigate("/apprentice/improvedAnimalList")} />

                <SidebarItem icon={<GiTestTubes className="h-4 w-4" />} title="Razas y Especies" onClick={() => navigate("/apprentice/speciesAndBreedsList")} />

                <SidebarItem icon={<IoNewspaper className="h-4 w-4" />} title="Controles" onClick={() => navigate("/apprentice/controlList")} />
            </SidebarItem>

            <Divider className="bg-gray-600" />

            <SidebarItem icon={<GiIsland className="h-4 w-4" />} title="Terrenos">

                <SidebarItem icon={<GiIsland className="h-4 w-4" />} title="Terrenos" onClick={() => navigate("/apprentice/fieldList")} />

                <SidebarItem icon={<GiField className="h-4 w-4" />} title="Pastoreos" onClick={() => navigate("/apprentice/animalFieldList")} />

                <SidebarItem icon={<FaSeedling className="h-4 w-4" />} title="Siembras" onClick={() => navigate("/apprentice/foodTypeList")} />
            </SidebarItem>

        </Sidebar>
    );
};

export default ApprenticeSideBar;