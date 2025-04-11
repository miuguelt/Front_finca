import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@nextui-org/react'
import { Label } from "@/components/ui/label"
import { Textarea } from '@nextui-org/react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocation } from 'react-router-dom'

//Types
import { GeneticImprovements } from '@/types/geneticImprovementsTypes'
import { useGeneticImprovements } from '@/hooks/geneticImprovement/useGeneticImprovement'
import { useAnimals } from '@/hooks/animal/useAnimals'
import { useAuth } from '@/hooks/auth/useAuth'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
const ImprovedAnimalForm = () => {

  const { addGeneticImprovement, editGeneticImprovement } = useGeneticImprovements();
  const { animals } = useAnimals();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { role } = useAuth();

  const [formData, setFormData] = useState<GeneticImprovements>({
    animal_id: 0,
    details: '',
    results: '',
    date: '',
    genetic_event_techique: '',
  });

  useEffect(() => {
    if (state?.isEdit && state?.geneticImprovement) {
      setFormData(state.geneticImprovement);
    }
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editGeneticImprovement(formData.id, {
          animal_id: formData.animal_id,
          details: formData.details,
          results: formData.results,
          date: formData.date,
          genetic_event_techique: formData.genetic_event_techique,
        });
        console.log(formData);
      }
    } else {
      addGeneticImprovement(formData);
    }
    if (role == "Administrador") {
      navigate('/admin/improvedAnimalList');
    } else if (role == "Instructor") {
      navigate('/instructor/improvedAnimalList')
    } else if (role == "Aprendiz") {
      navigate('/apprentice/improvedAnimalList')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? 'Editar Mejoramiento Genético' : 'Agregar Mejoramiento Genético'}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}> 
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2 col-span-2">
                <Autocomplete
                  variant="flat"
                  label="Animal"
                  labelPlacement="outside"
                  defaultItems={animals}
                  placeholder="Busca el animal"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.animal_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, animal_id: selectedId }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.idAnimal ? item.idAnimal.toString() : ""}
                    >
                      {item.record}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className='space-y-2 col-span-2'>
                <Label htmlFor="genetic_event_techique" className="text-sm font-medium">Tecnica del evento genetico</Label>
                <Select
                  value={formData.genetic_event_techique}
                  onValueChange={(value: string) => setFormData((prev: GeneticImprovements) => ({ ...prev, genetic_event_techique: value as GeneticImprovements['genetic_event_techique'] }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione la tecnica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inseminacion">Inseminacion</SelectItem>
                    <SelectItem value="Lavado_de_embriones">Lavado de embriones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="date" className="text-sm font-medium">Fecha</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="max-w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details" className="text-sm font-medium">Detalles</Label>
                <Textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="w-full h-24"
                  placeholder="Detalles del mejoramiento genético..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="results" className="text-sm font-medium">Resultados</Label>
                <Textarea
                  id="results"
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  required
                  className="w-full h-24"
                  placeholder="Resultados del mejoramiento genético..."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-48 m-auto">
              {state?.isEdit ? 'Guardar cambios' : 'Agregar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ImprovedAnimalForm;