import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useAnimalFields } from "@/hooks/animalFields/useAnimalFields";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const animalFieldList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { animalFields, loading, error } = useAnimalFields();
  const { role } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  // Filtrar animales según el término de búsqueda
  const filteredAnimalFields = animalFields.filter((animalFields) =>
    animalFields.fields?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const transformedAnimalFields = filteredAnimalFields.map((animalFields) => ({
    ...animalFields,
    status: animalFields.status ? "Fuera" : "Dentro",
  }));

  const handleEdit = (animalField: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/animalFieldCreate",
      Instructor: "/instructor/animalFieldCreate",
      Aprendiz: "/apprentice/animalFieldCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit : true,
          animalField,
        }
      });
    }  
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/animalFieldCreate",
      Instructor: "/instructor/animalFieldCreate",
      Aprendiz: "/apprentice/animalFieldCreate",
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
          <h1 className="text-2xl font-bold">Lista de Pastoreos</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
              Agregar pastoreo
            </Button>
            <Input
              className="w-72"
              placeholder="Buscar por terreno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <GenericTable
          headers={[
            "Terreno",
            "Animal",
            "Fecha de inicio",
            "Fecha de fin",
            "Duracion",
            "Estado"
          ]}
          data={transformedAnimalFields}
          columns={[
            "fields.name",
            "animals.record",
            "start_date",
            "end_date",
            "duration",
            "status"
          ]}
          keyValue="id"
          onEdit={handleEdit}
        >

        </GenericTable>

      </div>
    </div>
  );
};

export default animalFieldList;
