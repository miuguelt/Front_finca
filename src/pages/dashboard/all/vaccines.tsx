import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useNavigate } from "react-router-dom";
import { useVaccines } from "@/hooks/vaccine/useVaccine";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const VaccinesList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { vaccines, loading, error } = useVaccines();
  const navigate = useNavigate();
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
  const filteredVaccines = vaccines.filter((vaccines) =>
    vaccines.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vaccine: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/vaccineCreate",
      Instructor: "/instructor/vaccineCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          vaccine,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/vaccineCreate",
      Instructor: "/instructor/vaccineCreate",
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
          <h1 className="text-2xl font-bold">Lista de Vacunas</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
              Agregar vacuna
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
          headers={[
            "Nombre",
            "Dosis",
            "Ruta de administracion",
            "Intervalos de vacuncion",
            "Enfermedad",
            "Tipo de vacuna",
            "Plan Nacional",
          ]}
          data={filteredVaccines}
          columns={[
            "name",
            "dosis",
            "route_administration",
            "vaccination_interval",
            "diseases.name",
            "vaccine_type",
            "national_plan",
          ]}
          keyValue="id"
          onEdit={handleEdit}
          >

          </GenericTable>
      </div>
    </div>
  );
};

export default VaccinesList;
