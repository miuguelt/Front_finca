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
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

//Types
import { useBreeds } from "@/hooks/breed/useBreeds";
import { Animals } from "@/types/animalsTypes";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/auth/useAuth";

const AnimalForm = () => {
  const location = useLocation();
  const { state } = location;
  const { breeds } = useBreeds();
  const { animals, addAnimal, editAnimal } = useAnimals();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [formData, setFormData] = useState<Animals>({
    birth_date: "",
    sex: "",
    weight: 0,
    record: "",
    idFather: null,
    idMother: null,
    breeds_id: 0,
    status: "Vivo",
  });

  useEffect(() => {
    if (state?.isEdit && state?.animal) {
      setFormData({
        idAnimal: state.animal.idAnimal || undefined,
        birth_date: state.animal.birth_date || "",
        sex: state.animal.sex || "",
        weight: state.animal.weight || 0,
        record: state.animal.record || "",
        idFather: state.animal.idFather || null,
        idMother: state.animal.idMother || null,
        breeds_id: state.animal.breed?.id || null,
        status: state.animal.status || "",
      });
    }
    console.log("formData", formData);
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "weight" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.idAnimal !== undefined) {
        editAnimal(formData.idAnimal, {
          birth_date: formData.birth_date,
          sex: formData.sex,
          weight: formData.weight,
          record: formData.record,
          idFather: formData.idFather ? formData.idFather : null,
          idMother: formData.idMother ? formData.idMother : null,
          breeds_id: formData.breeds_id ? formData.breeds_id : 0,
          status: formData.status,
        });
        console.log(formData.weight);
      }
    } else {
      addAnimal(formData);
    }

    if (role == "Administrador") {
      navigate("/admin/animalList");
    }else if(role == "Instructor"){
      navigate("/instructor/animalList")
    }else if(role == "Aprendiz"){
      navigate("/apprentice/animalList")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Animal" : "Agregar Animal"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="birth_date" className="text-sm font-medium">
                  Fecha de Nacimiento
                </Label>
                <Input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex" className="text-sm font-medium">
                  Sexo
                </Label>
                <Select
                  name="sex"
                  value={formData.sex}
                  onValueChange={(value: string) =>
                    setFormData((prev: Animals) => ({
                      ...prev,
                      sex: value as Animals["sex"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Macho">Macho</SelectItem>
                    <SelectItem value="Hembra">Hembra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Peso en Kg
                </Label>
                {/* Mateo, lo del 0 en el peso */}
                <Input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight.toString()}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese peso"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="record" className="text-sm font-medium">
                  Registro
                </Label>
                <Input
                  type="text"
                  id="record"
                  name="record"
                  value={formData.record}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese el registro del animal"
                />
              </div>
              {/* Mateo, verificar los valores (no deja crear) */}
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  name="idFather"
                  label="Padre"
                  labelPlacement="outside"
                  placeholder="Busca al padre"
                  className="max-w-xs font-medium"
                  selectedKey={
                    formData.idFather ? formData.idFather.toString() : ""
                  }
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, idFather: selectedId }));
                  }}
                >
                  {animals.map((item) => (
                    <AutocompleteItem
                      key={item.idAnimal!.toString()}
                      value={item.idAnimal!.toString()}
                    >
                      {item.record}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  name="idMother"
                  label="Madre"
                  labelPlacement="outside"
                  placeholder="Busca la madre"
                  className="max-w-xs font-medium"
                  selectedKey={
                    formData.idMother ? formData.idMother.toString() : ""
                  }
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, idMother: selectedId }));
                  }}
                >
                  {animals.map((item) => (
                    <AutocompleteItem
                      key={item.idAnimal!.toString()}
                      value={item.idAnimal!.toString()}
                    >
                      {item.record}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Raza"
                  name="breeds_id"
                  labelPlacement="outside"
                  placeholder="Busca la raza"
                  className="max-w-full font-medium md:col-span-2"
                  selectedKey={formData.breeds_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, breeds_id: selectedId }));
                  }}
                >
                  {breeds.map((item) => (
                    <AutocompleteItem
                      key={item.id!.toString()}
                      value={item.id!.toString()}
                    >
                      {item.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="space-y-1">
                <Label htmlFor="status" className="text-sm font-medium">
                  Estado
                </Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value: string) =>
                    setFormData((prev: Animals) => ({
                      ...prev,
                      status: value as Animals["status"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vivo">Vivo</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                    <SelectItem value="Muerto">Muerto</SelectItem>
                  </SelectContent>
                </Select>
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

export default AnimalForm;
