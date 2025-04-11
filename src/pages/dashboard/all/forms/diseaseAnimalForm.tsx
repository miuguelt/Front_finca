import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AnimalDiseases } from "@/types/animalDiseasesTypes";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useDiseases } from "@/hooks/diseases/useDisease";
import { useUsers } from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";

const DiseaseAnimalForm = () => {
  const { animals } = useAnimals();
  const { diseases } = useDiseases();
  const { addAnimalDiseases, editAnimalDisease } = useAnimalDiseases();
  const { users } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { role } = useAuth();
  const [formData, setFormData] = useState<AnimalDiseases>({
    animal_id: 0,
    disease_id: 0,
    diagnosis_date: "",
    instructor_id: 0,
    status: false,
  });

  useEffect(() => {
    if (state?.isEdit && state?.animalDisease) {
      setFormData(state.animalDisease);
    }
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editAnimalDisease(formData.id, {
          animal_id: formData.animal_id,
          disease_id: formData.disease_id,
          diagnosis_date: formData.diagnosis_date,
          instructor_id: formData.instructor_id,
          status: formData.status,
        });
      }
    } else {
      addAnimalDiseases(formData);
    }
    if (role == "Administrador") {
      navigate("/admin/animalDiseaseList");
    } else if (role == "Instructor") {
      navigate("/instructor/animalDiseaseList")
    } else if (role == "Aprendiz") {
      navigate("/apprentice/animalDiseaseList")
    }
  };

  const filteredInstructors = users.filter(
    (user) => user.role === "Instructor"
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Animal Enfermo" : "Agregar Animal Enfermo"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Animal"
                  labelPlacement="outside"
                  defaultItems={animals}
                  placeholder="Selecciona el animal"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.animal_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.idAnimal ? item.idAnimal.toString() : ""}
                    >
                      {item.record}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Enfermedad"
                  labelPlacement="outside"
                  defaultItems={diseases}
                  placeholder="Selecciona la enfermedad"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.disease_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({
                      ...prev,
                      disease_id: selectedId,
                    }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.id ? item.id.toString() : ""}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis_date" className="text-sm font-medium">
                  Fecha de Diagnóstico
                </Label>
                <Input
                  type="date"
                  id="diagnosis_date"
                  name="diagnosis_date"
                  value={formData.diagnosis_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Instructor a cargo"
                  labelPlacement="outside"
                  defaultItems={filteredInstructors}
                  placeholder="Selecciona el instructor"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.instructor_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({
                      ...prev,
                      instructor_id: selectedId,
                    }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.id ? item.id.toString() : ""}>
                      {item.fullname}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              {state?.isEdit && (
                <div className="space-y-2 md:col-span-2">
                  <Checkbox
                    isSelected={formData.status as boolean}
                    onValueChange={(isSelected: boolean) =>
                      setFormData((prev) => ({ ...prev, status: isSelected }))
                    }
                  >
                    Estado
                  </Checkbox>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-48 m-auto">
              {state?.isEdit ? "Guardar Cambios" : "Agregar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DiseaseAnimalForm;
