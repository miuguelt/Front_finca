import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const DiseaseAnimalList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { animalDiseases, loading, error } = useAnimalDiseases();
  const { role } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  // Filtrar animales enfermos según el término de búsqueda
  const filteredAnimalDiseases = animalDiseases.filter((animalDisease) =>
    animalDisease.animals?.record
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const transformedAnimalDiseases = filteredAnimalDiseases.map((animalDisease) => ({
    ...animalDisease,
    status: animalDisease.status ? "Recuperado" : "Enfermo",
  }));


  const handleEdit = (animalDisease: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/animalDiseaseCreate",
      Instructor: "/instructor/animalDiseaseCreate",
      Aprendiz: "/apprentice/animalDiseaseCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          animalDisease,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/animalDiseaseCreate",
      Instructor: "/instructor/animalDiseaseCreate",
      Aprendiz: "/apprentice/animalDiseaseCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-10 bg-gray-200">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center mb-11">
          <h1 className="text-2xl font-bold">Lista de Animales Enfermos</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
              Agregar animal enfermo
            </Button>
            <Input
              className="w-72"
              placeholder="Buscar por registro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <GenericTable
          headers={["Animal", "Enfermedad", "Instructor", "Fecha diagnostico", "Estado"]}
          data={transformedAnimalDiseases}
          columns={[
            "animals.record",
            "diseases.name",
            "instructors.fullname",
            "diagnosis_date",
            "status"
          ]}
          keyValue="id"
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default DiseaseAnimalList;
