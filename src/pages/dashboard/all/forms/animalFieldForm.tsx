import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";

//Types
import { AnimalFields } from "@/types/animalFieldsTypes";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useAnimalFields } from "@/hooks/animalFields/useAnimalFields";
import { useFields } from "@/hooks/field/useField";
import { Checkbox } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";

const AnimalFieldForm = () => {
  const location = useLocation();
  const { state } = location;
  const { animals } = useAnimals();
  const { fields } = useFields();
  const { addAnimalFields, editAnimalFields } = useAnimalFields();
  const navigate = useNavigate();
  const { role } = useAuth();


  // Inicializar el estado con tipado
  const [formData, setFormData] = useState<AnimalFields>({
    start_date: "",
    end_date: "",
    duration: "",
    animal_id: 0,
    field_id: 0,
    status: true,
  });

  useEffect(() => {
    if (state?.isEdit && state?.animalField) {
      setFormData(state.animalField);
    }
  }, [state]);

  // Función para manejar cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Función para manejar el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editAnimalFields(formData.id, {
          start_date: formData.start_date,
          end_date: formData.end_date,
          duration: formData.duration,
          animal_id: formData.animal_id,
          field_id: formData.field_id,
          status: formData.status,
        });
        console.log(formData);
      }
    } else {
      addAnimalFields(formData);
    }
    if (role == "Administrador") {
      navigate("/admin/animalFieldList");
    }else if(role == "Instructor"){
      navigate("/instructor/animalFieldList")
    }else if(role == "Aprendiz"){
      navigate("/apprentice/animalFieldList")
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Pastoreo" : "Agregar Pastoreo"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Animal"
                  labelPlacement="outside"
                  defaultItems={animals}
                  placeholder="Busca el animal"
                  className="max-w-xs font-medium"
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
                  label="Potrero"
                  labelPlacement="outside"
                  defaultItems={fields}
                  placeholder="Busca el potrero"
                  className="max-w-full font-medium md:col-span-2"
                  selectedKey={formData.field_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, field_id: selectedId }));
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
                <Label htmlFor="start_date">Fecha de Inicio</Label>
                <Input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Fecha de Fin</Label>
                <Input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="duration">Duración en días</Label>
                <Input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="ej: 30"
                  required
                />
              </div>
              {state?.isEdit && (
                <div className="space-y-2 md:col-span-2">
                  <Checkbox
                    isSelected={formData.status as boolean}
                    onValueChange={(isSelected: boolean) =>
                      setFormData((prev) => ({ ...prev, status: isSelected }))
                    }
                  >
                    Pastoreando
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

export default AnimalFieldForm;
