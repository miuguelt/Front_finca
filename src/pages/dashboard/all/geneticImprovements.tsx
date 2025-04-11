import { useState } from "react";
import { useGeneticImprovements } from "@/hooks/geneticImprovement/useGeneticImprovement";
import GenericTable from "@/components/dashboard/GenericTable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const GeneticList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const {geneticImprovements,loading,error} = useGeneticImprovements();
  const { role } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  const filteredGeneticImprovements = geneticImprovements.filter(
    (geneticImprovement) =>
      geneticImprovement.animals?.record
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleEdit = ( geneticImprovement: any ) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/improvedAnimalCreate",
      Instructor: "/instructor/improvedAnimalCreate",
      Aprendiz: "/apprentice/improvedAnimalCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          geneticImprovement,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/improvedAnimalCreate",
      Instructor: "/instructor/improvedAnimalCreate",
      Aprendiz: "/apprentice/improvedAnimalCreate",
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
        <h1 className="text-2xl font-bold">Lista de Animales Mejorados</h1>
        <div className="flex justify-center items-center gap-6">
          <Button
            variant="ghost"
            className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
            onClick={handleChangeLink}
          >
            Agregar mejora
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
          headers={["Animal", "Fecha", "Detalles", "Resultados", "Tecnica"]}
          data={filteredGeneticImprovements}
          columns={[
            "animals.record",
            "date",
            "details",
            "results",
            "genetic_event_techique",
          ]}
          keyValue="id"
          onEdit={handleEdit}
        />

      </div>
    </div>
  );
};

export default GeneticList;
