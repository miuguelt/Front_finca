import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//Types
import { Vaccines } from "@/types/vaccinesTypes";
import { useVaccines } from "@/hooks/vaccine/useVaccine";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useDiseases } from "@/hooks/diseases/useDisease";
import { useAuth } from "@/hooks/auth/useAuth";

const VaccineForm: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const { diseases } = useDiseases();
  const { addVaccine, editVaccine } = useVaccines();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [formData, setFormData] = useState<Vaccines>({
    name: "",
    dosis: "",
    route_administration: "Oral",
    vaccination_interval: "",
    target_disease_id: 0,
    vaccine_type: "Arn",
    national_plan: "Obligatoria",
  });

  useEffect(() => {
    if (state?.isEdit && state?.vaccine) {
      setFormData(state.vaccine);
    }
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editVaccine(formData.id, {
          name: formData.name,
          dosis: formData.dosis,
          route_administration: formData.route_administration,
          vaccination_interval: formData.vaccination_interval,
          target_disease_id: formData.target_disease_id,
          vaccine_type: formData.vaccine_type,
          national_plan: formData.national_plan,
        });
        console.log(formData);
      }
    } else {
      addVaccine(formData);
    }
    if (role == "Administrador") {
      navigate("/admin/vaccineList");
    } else if (role == "Instructor") {
      navigate("/instructor/vaccineList");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Vacuna" : "Agregar Vacuna"}
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
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vaccine_type" className="text-sm font-medium">
                  Tipo de Vacuna
                </Label>
                <Select
                  name="vaccine_type"
                  value={formData.vaccine_type}
                  onValueChange={(value: string) =>
                    setFormData((prev: Vaccines) => ({
                      ...prev,
                      vaccine_type: value as Vaccines["vaccine_type"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el tipo de vacunas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Atenuada">Atenuada</SelectItem>
                    <SelectItem value="Inactiva">Inactiva</SelectItem>
                    <SelectItem value="Subunidad">Subunidad</SelectItem>
                    <SelectItem value="Toxoide">Toxoide</SelectItem>
                    <SelectItem value="Conjugada">Conjugada</SelectItem>
                    <SelectItem value="Adn">Adn</SelectItem>
                    <SelectItem value="Recombinante">Recombinante</SelectItem>
                    <SelectItem value="Arn">Arn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Enfermedad obejtivo"
                  labelPlacement="outside"
                  defaultItems={diseases}
                  placeholder="Busca la enfermedad"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.target_disease_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({
                      ...prev,
                      target_disease_id: selectedId,
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
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="dosis" className="text-sm font-medium">
                  Dosis en ml
                </Label>
                <Input
                  id="dosis"
                  value={formData.dosis}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: 55"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="route_administration" className="text-sm font-medium">
                  Ruta de Administración
                </Label>
                <Select
                  name="route_administration"
                  value={formData.route_administration}
                  onValueChange={(value: string) =>
                    setFormData((prev: Vaccines) => ({
                      ...prev,
                      route_administration:
                        value as Vaccines["route_administration"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione la ruta de administracion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oral">Oral</SelectItem>
                    <SelectItem value="Intranasal">Intranasal</SelectItem>
                    <SelectItem value="Tópica">Tópica</SelectItem>
                    <SelectItem value="Intramuscular">Intramuscular</SelectItem>
                    <SelectItem value="Intravenosa">Intravenosa</SelectItem>
                    <SelectItem value="Subcutánea">Subcutánea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="vaccination_interval"
                  className="text-sm font-medium"
                >
                  Intervalo de Vacunación en días
                </Label>
                <Input
                  id="vaccination_interval"
                  value={formData.vaccination_interval}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: 3 dias"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="national_plan" className="text-sm font-medium">
                  Plan Nacional
                </Label>
                <Select
                  name="national_plan"
                  value={formData.national_plan}
                  onValueChange={(value: string) =>
                    setFormData((prev: Vaccines) => ({
                      ...prev,
                      national_plan: value as Vaccines["national_plan"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el plan nacional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Obligatoria">Obligatoria</SelectItem>
                    <SelectItem value="No_obligatoria">No Obligatoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-48 m-auto">
              {state?.isEdit ? "Guardar Cambios" : "Crear Vacuna"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default VaccineForm;
