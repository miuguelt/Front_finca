import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useFoodTypes } from "@/hooks/foodTypes/useFoodTypes";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const FoodTypeList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { foodTypes, loading, error } = useFoodTypes();
  const { role } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  const filteredFoodTypes = foodTypes.filter((foodType) =>
    foodType.food_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (foodType: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/foodTypeCreate",
      Instructor: "/instructor/foodTypeCreate",
      Aprendiz: "/apprentice/foodTypeCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          foodType,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/foodTypeCreate",
      Instructor: "/instructor/foodTypeCreate",
      Aprendiz: "/apprentice/foodTypeCreate",
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
          <h1 className="text-2xl font-bold">Lista de Tipos de Alimento</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
              Agregar tipo de alimento
            </Button>
            <Input
              className="w-72"
              placeholder="Buscar por tipo de alimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <GenericTable
          headers={[
            "Tipo de alimento",
            "Fecha de siembra",
            "Fecha de cosecha",
            "Area",
            "Manejos",
            "Aforo",
          ]}
          data={filteredFoodTypes}
          columns={[
            "food_type",
            "sowing_date",
            "harvest_date",
            "area",
            "handlings",
            "gauges",
          ]}
          keyValue="id"
          onEdit={handleEdit}
        >

        </GenericTable>
      </div>
    </div>
  );
};

export default FoodTypeList;
