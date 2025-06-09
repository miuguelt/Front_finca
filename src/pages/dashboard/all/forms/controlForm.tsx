import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "@/types/controlTypes";
import { useControls } from "@/hooks/control/useControl";
import { useLocation, useNavigate } from "react-router-dom";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAuth } from "@/hooks/auth/useAuth";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";


const ControlForm = () => {
  const location = useLocation();
  const { state } = location;
  const { animals } = useAnimals();
  const { addControl, editControl } = useControls();
  const navigate = useNavigate();
  const { role } = useAuth();

  // Definir rutas de redirección según el rol
  const rolePaths: { [key: string]: string } = {
    Administrador: "/admin/controlList",
    Instructor: "/instructor/controlList",
    Aprendiz: "/apprentice/controlList",
  };

  // Inicializa el formulario correctamente para edición o inserción
  const [formData, setFormData] = useState<Control>(() => {
    if (state?.isEdit && state?.control) {
      // Si es edición, toma los datos del control recibido
      return {
        ...state.control,
        animal_id: state.control.animal_id || 0,
        checkup_date: state.control.checkup_date || "",
        healt_status: state.control.healt_status || "Exelente",
        description: state.control.description || "",
      };
    }
    // Si es inserción, valores por defecto
    return {
      animal_id: 0,
      checkup_date: "",
      healt_status: "Exelente",
      description: "",
    };
  });

  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Actualiza el formulario si cambia el estado de edición/control
  useEffect(() => {
    if (state?.isEdit && state?.control) {
      setFormData({
        ...state.control,
        animal_id: state.control.animal_id || 0,
        checkup_date: state.control.checkup_date || "",
        healt_status: state.control.healt_status || "Exelente",
        description: state.control.description || "",
      });
    } else {
      setFormData({
        animal_id: 0,
        checkup_date: "",
        healt_status: "Exelente",
        description: "",
      });
    }
  }, [state]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormMessage(null);
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      healt_status: value as Control["healt_status"],
    }));
    setFormMessage(null);
  };

  const handleAnimalChange = (key: string | number | null) => {
    const selectedId = key ? parseInt(key.toString()) : 0;
    setFormData((prev) => ({
      ...prev,
      animal_id: selectedId,
    }));
    setFormMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);

    try {
      let result;
      if (state?.isEdit && formData.id) {
        result = await editControl(formData.id, formData);
      } else {
        result = await addControl(formData);
      }

      if (result.success) {
        setFormMessage({
          type: "success",
          text: state?.isEdit
            ? "Control actualizado exitosamente."
            : "Control creado exitosamente.",
        });

        // ✅ Redirigimos según el rol después de 1 segundo
        setTimeout(() => {
          if (role && rolePaths[role]) {
            navigate(rolePaths[role]);
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        throw new Error(result.message || "Ocurrió un error al guardar");
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      setFormMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado",
      });
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
                  selectedKey={
                    formData.animal_id ? formData.animal_id.toString() : ""
                  }
                  onSelectionChange={handleAnimalChange}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.idAnimal?.toString() || ""}
                      value={item.idAnimal?.toString() || ""}
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
                <Label htmlFor="healt_status" className="text-sm font-medium">
                  Estado de salud
                </Label>
                <Select
                  name="healt_status"
                  value={formData.healt_status}
                  onValueChange={handleSelectChange}
                >
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
              <p
                className={`mt-4 text-center text-sm ${
                  formMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
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
