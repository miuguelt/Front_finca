import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

//Types
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useTreatment } from "@/hooks/treatment/useTreatment";
import { Treatments } from "@/types/treatmentsTypes";
import { useAuth } from "@/hooks/auth/useAuth";

const TreatmentForm: React.FC = () => {

  const location = useLocation();
  const { state } = location;
  const { animals } = useAnimals();
  const { addTreatment, editTreatment } = useTreatment();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [formData, setFormData] = useState<Treatments>({
    start_date: "",
    end_date: "",
    description: "",
    frequency: "",
    observations: "",
    dosis: "",
    animal_id: 0,
  });


  useEffect(() => {
    if (state?.isEdit && state?.treatment) {
      setFormData(state.treatment);
    }
  }, [state]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editTreatment(formData.id, {
          start_date: formData.start_date,
          end_date: formData.end_date,
          description: formData.description,
          frequency: formData.frequency,
          observations: formData.observations,
          dosis: formData.dosis,
          animal_id: formData.animal_id
        });
        console.log(formData);
      }
    } else {
      addTreatment(formData);
    }
    if (role == "Administrador") {
      navigate("/admin/treatmentList");
    } else if (role == "Instructor") {
      navigate("/instructor/treatmentList");
    }

  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Tratamiento" : "Agregar Tratamiento"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="start_date" className="text-sm font-medium">
                  Fecha de Inicio
                </Label>
                <Input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date" className="text-sm font-medium">
                  Fecha de Fin
                </Label>
                <Input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium">
                  Frecuencia en días
                </Label>
                <Input
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: 12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosis" className="text-sm font-medium">
                  Dosis en ml
                </Label>
                <Input
                  id="dosis"
                  name="dosis"
                  value={formData.dosis}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: 5"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Autocomplete
                  variant="flat"
                  label="Animal"
                  labelPlacement="outside"
                  defaultItems={animals}
                  placeholder="Busca el animal"
                  className="max-w-full font-medium"
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
                <Label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripcion del tratamiento..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observations" className="text-sm font-medium">
                  Observaciones
                </Label>
                <Textarea
                  id="observations"
                  name="observations"
                  placeholder="Observaciones del tratamiento..."
                  value={formData.observations}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
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

export default TreatmentForm;
