import { useState,useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useFields } from "@/hooks/field/useField";
import { Fields } from "@/types/fieldsTypes";
import { useNavigate } from "react-router-dom";
import { useFoodTypes } from "@/hooks/foodTypes/useFoodTypes";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";

const FieldForm = () => {
  const location = useLocation();
  const { state } = location;
  const { addField, editField } = useFields();
  const { foodTypes } = useFoodTypes();
  const navigate = useNavigate();
  const {role} = useAuth();
  const [formData, setFormData] = useState<Fields>({
    name: "",
    ubication: "",
    capacity: "",
    state: "Disponible",
    handlings: "",
    guages: "",
    area: "",
    food_type_id: 0
  });

  useEffect(() => {
    if (state?.isEdit && state?.field) {
      setFormData(state.field);
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
        editField(formData.id, { name: formData.name, ubication: formData.ubication, capacity: formData.capacity, state: formData.state, handlings: formData.handlings, guages: formData.guages, area: formData.area, food_type_id: formData.food_type_id });
        console.log(formData);
      }
    } else {
      addField(formData);
    }
    if (role == "Administrador") {
      navigate('/admin/fieldList');
    }else if(role == "Instructor"){
      navigate('/instructor/fieldList')
    }else if(role == "Aprendiz"){
      navigate('/apprentice/fieldList')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Terreno" : "Agregar Terreno"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: Campo 1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ubication" className="text-sm font-medium">
                  Ubicación
                </Label>
                <Input
                  type="text"
                  id="ubication"
                  name="ubication"
                  value={formData.ubication}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: Plano o Coordenadas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-sm font-medium">
                  Capacidad de carga
                </Label>
                <Input
                  type="text"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: 10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  Estado
                </Label>
                <Select
                  name="state"
                  value={formData.state}
                  onValueChange={(value: string) =>
                    setFormData((prev: Fields) => ({
                      ...prev,
                      state: value as Fields["state"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Ocupado">Ocupado</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="Restringido">Restringido</SelectItem>
                    <SelectItem value="Dañado">Dañado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="area" className="text-sm font-medium">
                  Área (m²)
                </Label>
                <Input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: 7"
                />
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Tipo de Alimento"
                  labelPlacement="outside"
                  defaultItems={foodTypes}
                  placeholder="Seleccione el tipo de alimento"
                  className="max-w-xs font-medium"
                  selectedKey={formData.food_type_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({
                      ...prev,
                      food_type_id: selectedId,
                    }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem key={item.id ? item.id.toString() : ""}>
                      {item.food_type}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Label htmlFor="handlings" className="text-sm font-medium">
                  Manejos
                </Label>
                <Input
                  type="text"
                  id="handlings"
                  name="handlings"
                  value={formData.handlings}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese los manejos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guages" className="text-sm font-medium">
                  Aforos
                </Label>
                <Input
                  type="text"
                  id="guages"
                  name="guages"
                  value={formData.guages}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese los aforos"
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

export default FieldForm;
