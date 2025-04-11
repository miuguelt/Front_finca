import GenericTable from "@/components/dashboard/GenericTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Types
import { useControls } from "@/hooks/control/useControl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const ControlList = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { controls, loading, error } = useControls();
  const { role } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }

  if (error) return <p>{error}</p>;


  const filteredControls = controls.filter((control) =>
    control.animals?.record.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleEdit = (control: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/controlCreate",
      Instructor: "/instructor/controlCreate",
      Aprendiz: "/apprentice/controlCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          control,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/controlCreate",
      Instructor: "/instructor/controlCreate",
      Aprendiz: "/apprentice/controlCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path);
    }
  };


  return (
    <div className="flex justify-center min-h-screen p-10">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-11">
          <h1 className="text-2xl font-bold">Lista de Controles</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
              Agregar control
            </Button>
            <Input
              className="w-72"
              placeholder="Buscar por animal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <GenericTable
          headers={["Animal", "Fecha de diagnostico", "Estado de salud", "Descripcion"]}
          data={filteredControls}
          columns={["animals.record", "checkup_date", "healt_status", "description"]}
          keyValue="id"
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default ControlList;
