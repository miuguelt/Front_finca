import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

//Types
import { useDiseases } from "@/hooks/diseases/useDisease";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const DiseaseList = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { diseases, loading, error } = useDiseases();
  const { role } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }

  if (error) return <p>{error}</p>;


  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleEdit = (disease: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/diseaseCreate",
      Instructor: "/instructor/diseaseCreate",
      Aprendiz: "/apprentice/diseaseCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          disease,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/diseaseCreate",
      Instructor: "/instructor/diseaseCreate",
      Aprendiz: "/apprentice/diseaseCreate",
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
        <h1 className="text-2xl font-bold">Lista de Enfermedades</h1>
        <div className="flex justify-center items-center gap-6">
          <Button
            variant="ghost"
            className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
            onClick={handleChangeLink}
          >
            Agregar enfermedad
          </Button>
          <Input
            className="w-72"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
        <GenericTable
          headers={["Nombre", "Sintomas", "Detalles"]}
          data={filteredDiseases}
          columns={["name", "syntoptoms", "details"]}
          keyValue="id"
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default DiseaseList;
