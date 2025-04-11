import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@nextui-org/react";

//Types
import { useMedications } from "@/hooks/medication/useMedication";
import { Medications } from "@/types/medicationsTypes";
import { useAuth } from "@/hooks/auth/useAuth";

const MedicineForm = () => {

  const location = useLocation();
  const { state } = location;
  const { addMedication, editMedication } = useMedications();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [formData, setFormData] = useState<Medications>({
    name: "",
    description: "",
    indications: "",
    contraindications: "",
    route_administration: "Inyección",
    availability: true,
  });


  useEffect(() => {
    if (state?.isEdit && state?.medication) {
      setFormData(state.medication);
    }
  }, [state]);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "id" ? Number(value) : value,
    }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editMedication(formData.id, {
          name: formData.name,
          description: formData.description,
          indications: formData.indications,
          contraindications: formData.contraindications,
          route_administration: formData.route_administration,
          availability: formData.availability,
        });
        console.log(formData);
      }
    } else {
      addMedication(formData);
    }
    if (role == "Administrador") {
      navigate("/admin/medicineList");
    } else if (role == "Instructor") {
      navigate("/instructor/medicineList");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Medicamento" : "Agregar Medicamento"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nombre del medicamento
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="ej: Vetrimoxin"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="route_administration"
                  className="text-sm font-medium"
                >
                  Ruta de Administración
                </Label>
                <Select
                  name="route_administration"
                  value={formData.route_administration}
                  onValueChange={(value: string) =>
                    setFormData((prev: Medications) => ({
                      ...prev,
                      route_administration:
                        value as Medications["route_administration"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione la ruta de administracion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oral">Oral</SelectItem>
                    <SelectItem value="Inyección">Inyección</SelectItem>
                    <SelectItem value="Intranasal">Intranasal</SelectItem>
                    <SelectItem value="Tópica">Tópica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripcion del medicamento..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="indications" className="text-sm font-medium">
                  Indicaciones
                </Label>
                <Textarea
                  id="indications"
                  name="indications"
                  placeholder="Indicaciones del medicamento..."
                  value={formData.indications}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contraindications"
                  className="text-sm font-medium"
                >
                  Contraindicaciones
                </Label>
                <Textarea
                  id="contraindications"
                  name="contraindications"
                  placeholder="Contraindicaciones del medicamento... "
                  value={formData.contraindications}
                  onChange={handleChange}
                  className="max-w-full md:col-span-2"
                />
              </div>
              {state?.isEdit && (
                <div className="space-y-2 md:col-span-2">
                  <Checkbox
                    isSelected={formData.availability as boolean}
                    onValueChange={(isSelected: boolean) =>
                      setFormData((prev) => ({ ...prev, availability: isSelected }))
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

export default MedicineForm;
