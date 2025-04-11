import { useState } from "react";
import GenericTable from "@/components/dashboard/GenericTable";
import { useFields } from "@/hooks/field/useField";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/useAuth"; 
import { ClimbingBoxLoader } from "react-spinners";

const FieldList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { fields, loading, error } = useFields();
  const { role } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  // Filtrar usuarios según el término de búsqueda
  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (field: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/fieldCreate",
      Instructor: "/instructor/fieldCreate",
      Aprendiz: "/apprentice/fieldCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          field,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/fieldCreate",
      Instructor: "/instructor/fieldCreate",
      Aprendiz: "/apprentice/fieldCreate",
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
          <h1 className="text-2xl font-bold">Lista de Terrenos</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
              Agregar terreno
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
            "Ubicaion",
            "Capacidad",
            "Estado",
            "Manejos",
            "Aforos",
            "Area",
            "Tipo de comida",
            "Estado"
          ]}
          data={filteredFields}
          columns={[
            "name",
            "ubication",
            "capacity",
            "state",
            "handlings",
            "guages",
            "area",
            "food_types.food_type",
            "state"
          ]}
          keyValue="id"
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default FieldList;
