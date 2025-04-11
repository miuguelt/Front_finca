import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@nextui-org/react'
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useLocation, useNavigate } from 'react-router-dom'

//Types
import { Species } from '@/types/speciesTypes'
import { useSpecies } from '@/hooks/species/useSpecies'
import { useAuth } from '@/hooks/auth/useAuth'

const SpecieForm = () => {

  const location = useLocation();
  const { state } = location;
  const { addSpecies, editSpecie } = useSpecies();
  const navigate = useNavigate();
  const {role} = useAuth();

  const [formData, setFormData] = useState<Species>({
    name: ""
  });


  useEffect(() => {
    if (state?.isEdit && state?.specie) {
      setFormData(state.specie)
    }
  }, [state]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editSpecie(formData.id, { name: formData.name })
        console.log(formData);
      }
    } else {
      addSpecies(formData);
    }
    if (role == "Administrador") {
      navigate('/admin/speciesAndBreedsList');
    }else if(role == "Instructor"){
      navigate('/instructor/speciesAndBreedsList')
    }else if(role == "Aprendiz"){
      navigate('/apprentice/speciesAndBreedsList')
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Especie" : "Agregar Especie"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nombre de la Especie</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
                placeholder="Ingrese el nombre de la especie"
              />
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

export default SpecieForm;