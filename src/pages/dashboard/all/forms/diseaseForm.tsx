import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';

//Types
import { useDiseases } from '@/hooks/diseases/useDisease';
import { Diseases } from '@/types/diseasesTypes';
import { Input, Textarea } from '@nextui-org/react';
import { useAuth } from '@/hooks/auth/useAuth';

const DiseaseForm = () => {

  const location = useLocation();
  const { state } = location;
  const { addDiseases, editDisease } = useDiseases();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [formData, setFormData] = useState<Diseases>({
    name: '',
    syntoptoms: '',
    details: '',
  });


  useEffect(() => {
    if (state?.isEdit && state?.disease) {
      setFormData(state.disease);
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
        editDisease( formData.id, { 
            name: formData.name, 
            syntoptoms: formData.syntoptoms,
            details: formData.details
          });
        console.log(formData);
      }
    } else {
      addDiseases(formData);
    }
    if (role == "Administrador") {
      navigate("/admin/diseaseList");
    } else if (role == "Instructor") {
      navigate("/instructor/diseaseList");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Enfermedad" : "Agregar Enfermedad"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nombre de la Enfermedad
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese nombre de la enfermedad"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="syntoptoms" className="text-sm font-medium">
                  Síntomas
                </Label>
                <Textarea
                  id="syntoptoms"
                  name="syntoptoms"
                  placeholder="Sintomas de la enfermedad..."
                  value={formData.syntoptoms}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details" className="text-sm font-medium">
                  Detalles
                </Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Detalles de la enfermedad..."
                  value={formData.details}
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

export default DiseaseForm;