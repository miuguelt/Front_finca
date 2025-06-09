import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

//Types
import { Control } from "@/types/controlTypes"; // Asegúrate de que esta ruta es correcta
// <<<<<<<<<<<<<<<< CORRECCIÓN AQUÍ: Importar desde 'useControls' (plural) >>>>>>>>>>>>>>>>>>
import { useControls } from "@/hooks/control/useControl"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const ControlForm = () => {

  const location = useLocation();
  const { state } = location;
  const { animals } = useAnimals();
  const { addControl, editControl } = useControls(); 
  const navigate = useNavigate();
  const { role } = useAuth();


  const [formData, setFormData] = useState<Control>({
    animal_id: 0,
    checkup_date: "",
    healt_status: "Exelente", 
    description: "",
  });

  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);


  useEffect(() => {
    if (state?.isEdit && state?.control) {
      setFormData(state.control);
    }
  }, [state]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormMessage(null); 
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, healt_status: value as Control['healt_status'] }));
    setFormMessage(null);
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null); 

    let result: { success: boolean; message?: string; data?: Control | null } | undefined;

    if (state?.isEdit) {
      if (formData.id !== undefined) {
        result = await editControl(formData.id, formData); 
      } else {
        setFormMessage({ type: 'error', text: "Error: ID de control no definido para la edición." });
        return;
      }
    } else {
      result = await addControl(formData); 
    }

    if (result?.success) {
      setFormMessage({ type: 'success', text: state?.isEdit ? "Control actualizado exitosamente." : "Control agregado exitosamente." });
      console.log("Operación exitosa. Resultado:", result.data);

      setTimeout(() => {
        const rolePaths: { [key: string]: string } = {
          Administrador: "/admin/controlList",
          Instructor: "/instructor/controlList",
          Aprendiz: "/apprentice/controlList",
        };
        const path = role ? rolePaths[role] : null;
        if (path) {
          navigate(path);
        } else {
          navigate("/"); 
        }
      }, 1000); 
      
    } else {
      setFormMessage({ type: 'error', text: result?.message || "Ocurrió un error en la operación." });
      console.error("Fallo en la operación. Mensaje:", result?.message);
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
                  selectedKey={formData.animal_id ? formData.animal_id.toString() : ""} 
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.idAnimal ? item.idAnimal.toString() : ""}
                      value={item.idAnimal ? item.idAnimal.toString() : ""} 
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
                  onValueChange={handleSelectChange}> 
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
            {formMessage && (
              <p className={`mt-4 text-center text-sm ${formMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {formMessage.text}
              </p>
            )}
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
