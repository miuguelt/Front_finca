import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

//Types
import { Control } from "@/types/controlTypes";
import { useControls } from "@/hooks/control/useControl";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";

const ControlForm = () => {

  const location = useLocation();
  const { state } = location;
  const { animals } = useAnimals();
  const { addControl, editControl } = useControls();
  const navigate = useNavigate();
  const {role} = useAuth();


  const [formData, setFormData] = useState<Control>({
    animal_id: 0,
    checkup_date: "",
    healt_status: "Exelente",
    description: "",
  });


  useEffect(() => {
    if (state?.isEdit && state?.control) {
      // Si es edición, prellenamos el formulario con los datos de la raza
      setFormData(state.control);
    }
  }, [state])


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editControl(formData.id, { animal_id: formData.animal_id, checkup_date: formData.checkup_date, healt_status: formData.healt_status, description: formData.description });
        console.log(formData);
      }
    } else {
      addControl(formData);
    }
    if (role == "Administrador") {
      navigate('/admin/controlList');
    }else if(role == "Instructor"){
      navigate('/instructor/controlList')
    }else if(role == "Aprendiz"){
      navigate('/apprentice/controlList')
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Control" : "Agregar Control"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2 md:col-span-2">
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
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="checkup_date" className="text-sm font-medium">
                  Fecha de Revisión
                </Label>
                <Input
                  type="date"
                  id="checkup_date"
                  name="checkup_date"
                  value={formData.checkup_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="healt_status" className="text-sm font-medium">Estado de salud</Label>
                <Select
                  name="healt_status"
                  value={formData.healt_status}
                  onValueChange={(value: string) => setFormData((prev: Control) => ({ ...prev, healt_status: value as Control['healt_status'] }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el estado de salud" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exelente">Exelente</SelectItem>
                    <SelectItem value="Bueno">Bueno</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Malo">Malo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Descripción del control..."
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

export default ControlForm;
