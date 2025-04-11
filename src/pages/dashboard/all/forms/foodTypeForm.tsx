import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { FoodTypes } from "@/types/foodTypes";
import { useFoodTypes } from "@/hooks/foodTypes/useFoodTypes";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";

const FoodTypeForm = () => {
  const location = useLocation();
  const { state } = location;
  const { addFoodType, editFoodType } = useFoodTypes();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [formData, setFormData] = useState<FoodTypes>({
    food_type: "",
    sowing_date: "",
    harvest_date: "",
    area: 0,
    handlings: "",
    gauges: "",
  });


  useEffect(() => {
    if (state?.isEdit && state?.foodType) {
      setFormData(state.foodType);
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
        editFoodType(formData.id, { food_type: formData.food_type, sowing_date: formData.sowing_date, harvest_date: formData.harvest_date, area: formData.area, handlings: formData.handlings, gauges: formData.gauges });
        console.log(formData);
      }
    } else {
      addFoodType(formData);
    }
    if (role == "Administrador") {
      navigate('/admin/foodTypeList');
    } else if (role == "Instructor") {
      navigate('/instructor/foodTypeList')
    } else if (role == "Aprendiz") {
      navigate('/apprentice/foodTypeList')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Tipo de Alimento" : "Agregar Tipo de Alimento"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <CardContent className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="food_type">Tipo de Alimento</Label>
                <Input
                  type="text"
                  id="food_type"
                  name="food_type"
                  placeholder="ej: Maiz"
                  value={formData.food_type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area.toString()}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sowing_date">Fecha de Siembra</Label>
                <Input
                  type="date"
                  id="sowing_date"
                  name="sowing_date"
                  value={formData.sowing_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="harvest_date">Fecha de Cosecha</Label>
                <Input
                  type="date"
                  id="harvest_date"
                  name="harvest_date"
                  value={formData.harvest_date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="handlings">Manejos</Label>
                <Input
                  type="text"
                  id="handlings"
                  name="handlings"
                  placeholder="Ingrese los manejos"
                  value={formData.handlings}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="gauges">Aforos</Label>
                <Input
                  type="text"
                  id="gauges"
                  name="gauges"
                  placeholder="Ingrese los aforos"
                  value={formData.gauges}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-48 mx-auto">
              {state?.isEdit ? "Guardar Cambios" : "Agregar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default FoodTypeForm;
