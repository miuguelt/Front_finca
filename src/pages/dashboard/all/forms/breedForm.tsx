import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import { Label } from "@/components/ui/label";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';

//Types
import { Breeds } from '@/types/breedsTypes';
import { useSpecies } from '@/hooks/species/useSpecies';
import { useBreeds } from '@/hooks/breed/useBreeds';
import { useAuth } from '@/hooks/auth/useAuth';

const BreedForm = () => {

  const location = useLocation();
  const { state } = location; // Aquí recibimos el estado que contiene la raza seleccionada y el indicador de edición
  const { species } = useSpecies();
  const { addBreed, editBreed } = useBreeds();
  const navigate = useNavigate();
  const {role} = useAuth();

  const [formData, setFormData] = useState<Breeds>({
    name: '',
    species_id: 0,
  });


  useEffect(() => {
    if (state?.isEdit && state?.breed) {
      // Si es edición, prellenamos el formulario con los datos de la raza
      setFormData(state.breed);
    }
  }, [state]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      // Editar la raza existente
      if (formData.id !== undefined) {
        editBreed( formData.id, { 
            name: formData.name, 
            species_id: formData.species_id 
          });
        console.log(formData);
      }
    } else {
      addBreed(formData);
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
            {state?.isEdit ? "Editar Raza" : "Agregar Raza"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nombre de la Raza
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese nombre de la raza"
                />
              </div>
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Especie"
                  name="species_id"
                  labelPlacement="outside"
                  placeholder="Seleccione una especie"
                  className="max-w-full font-medium col-span-2"
                  selectedKey={formData.species_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, species_id: selectedId }));
                  }}
                >
                  {species.map((item) => (
                    <AutocompleteItem key={item.id!.toString()} value={item.id!.toString()}>
                      {item.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
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

export default BreedForm;