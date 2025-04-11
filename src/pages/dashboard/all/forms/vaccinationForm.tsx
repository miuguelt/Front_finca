import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@nextui-org/react'
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useNavigate, useLocation } from 'react-router-dom'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

// Types
import { Vaccinations } from '@/types/vaccinationsTypes'
import { useVaccinations } from '@/hooks/vaccination/useVaccination'
import { useUsers } from '@/hooks/user/useUser'
import { useVaccines } from '@/hooks/vaccine/useVaccine'
import { useAnimals } from '@/hooks/animal/useAnimals'
import { useAuth } from '@/hooks/auth/useAuth';

const VaccinationForm = () => {
  const { addVaccination, editVaccination } = useVaccinations();
  const { vaccines } = useVaccines();
  const { animals } = useAnimals();
  const { users } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { role } = useAuth();
  const [formData, setFormData] = useState<Vaccinations>({
    animal_id: 0,
    vaccine_id: 0,
    application_date: "",
    apprentice_id: 0,
    instructor_id: 0,
  });

  useEffect(() => {
    if (state?.isEdit && state?.vaccination) {
      setFormData(state.vaccination);
    }
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editVaccination(formData.id, {
          animal_id: formData.animal_id,
          vaccine_id: formData.vaccine_id,
          application_date: formData.application_date,
          apprentice_id: formData.apprentice_id,
          instructor_id: formData.instructor_id,
        });
      }
    } else {
      addVaccination(formData);
    }
    if (role == "Administrador") {
      navigate('/admin/vaccinationList');
    }else if(role == "Instructor"){
      navigate('/instructor/vaccinationList')
    }
  };

  const filteredInstructors = users.filter(user => user.role === 'Instructor');
  const filteredApprentices = users.filter(user => user.role === 'Aprendiz');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? 'Editar Vacunación' : 'Agregar Vacunación'}
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
              <div className="space-y-2">
                <Autocomplete
                  variant="flat"
                  label="Vacuna"
                  labelPlacement="outside"
                  defaultItems={vaccines}
                  placeholder="Busca la vacuna"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.vaccine_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, vaccine_id: selectedId }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id ? item.id.toString() : ""}
                    >
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="space-y-2">
                <Label htmlFor="application_date" className="text-sm font-medium">Fecha de Aplicación</Label>
                <Input
                  id="application_date"
                  name="application_date"
                  type="date"
                  value={formData.application_date}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Autocomplete
                  variant="flat"
                  name="apprentice_id"
                  label="Aprendiz a cargo"
                  labelPlacement="outside"
                  defaultItems={filteredApprentices}
                  placeholder="Busca el aprendiz"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.apprentice_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, apprentice_id: selectedId }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id ? item.id.toString() : ""}
                    >
                      {item.fullname}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="space-y-2 col-span-2">
                <Autocomplete
                  variant="flat"
                  name="instructor_id"
                  label="Instructor a cargo"
                  labelPlacement="outside"
                  defaultItems={filteredInstructors}
                  placeholder="Busca el instructor"
                  className="max-w-2xl font-medium"
                  selectedKey={formData.instructor_id.toString()}
                  onSelectionChange={(key: any | null) => {
                    const selectedId = key ? parseInt(key) : 0;
                    setFormData((prev) => ({ ...prev, instructor_id: selectedId }));
                  }}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.id ? item.id.toString() : ""}
                    >
                      {item.fullname}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
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

export default VaccinationForm;