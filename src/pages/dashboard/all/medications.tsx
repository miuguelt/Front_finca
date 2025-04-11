import GenericTable from "@/components/dashboard/GenericTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

//Types
import { useMedications } from "@/hooks/medication/useMedication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const MedicationList = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { medications, loading, error } = useMedications();
  const { role } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;


  const filteredTreatments = medications.filter((medication) =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const transformedTreatment = filteredTreatments.map((medication) => ({
    ...medication,
    availability: medication.availability ? "Disponible" : "No disponible",
  }));


  const handleEdit = (medication: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/medicineCreate",
      Instructor: "/instructor/medicineCreate",
      Aprendiz: "/apprentice/medicineCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          medication,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/medicineCreate",
      Instructor: "/instructor/medicineCreate",
      Aprendiz: "/apprentice/medicineCreate",
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
          <h1 className="text-2xl font-bold">Lista de Medicamentos</h1>
          <div className="flex justify-center items-center gap-6">
            <Button
              variant="ghost"
              className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
              onClick={handleChangeLink}
            >
            Agregar medicamento
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
            "Descripción",
            "Indicaciones",
            "Contraindicaciones",
            "Vía de Administración",
            "Disponibilidad",
          ]}
          data={transformedTreatment}
          columns={[
            "name",
            "description",
            "indications",
            "contraindications",
            "route_administration",
            "availability",
          ]}
          keyValue="id"
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default MedicationList;
