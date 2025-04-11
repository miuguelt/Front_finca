import { useState, useMemo, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PillBottle, Search, Syringe } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import {
  Button as Bnx,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

//Types
import { useTreatment } from "@/hooks/treatment/useTreatment";
import { useVaccines } from "@/hooks/vaccine/useVaccine";
import { useMedications } from "@/hooks/medication/useMedication";
import { useTreatmentVaccines } from "@/hooks/treatmentVaccines/useTreatmentVaccines";
import { TreatmentVaccines } from "@/types/treatmentVaccinesTypes";
import { TreatmentMedications } from "@/types/treatmentMedicationsTypes";
import { useTreatmentMedications } from "@/hooks/treatmentMedication/useTreatentMedication";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth/useAuth";
import { ClimbingBoxLoader } from "react-spinners";

const TreatmentsList = () => {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [searchAnimal, setSearchAnimal] = useState<string>("");
  const [searchTreatment, setSearchTreatment] = useState<string>("");
  const { treatments, loading, error } = useTreatment();
  const { animals } = useAnimals();
  const { vaccines } = useVaccines();
  const { medications } = useMedications();
  const { role } = useAuth();

  // Crear estados separados para los modales
  const {
    isOpen: isVaccineModalOpen,
    onOpen: openVaccineModal,
    onOpenChange: closeVaccineModal,
  } = useDisclosure();
  const {
    isOpen: isMedicationModalOpen,
    onOpen: openMedicationModal,
    onOpenChange: closeMedicationModal,
  } = useDisclosure();

  const [formDataVaccine, setFormDataVaccine] = useState<TreatmentVaccines>({
    vaccine_id: 0,
    treatment_id: 0,
  });
  const { addTreatmentVaccine } = useTreatmentVaccines();

  const { addTreatmentMedication } = useTreatmentMedications();
  const [formDataMedication, setFormDataMedication] =
    useState<TreatmentMedications>({
      medication_id: 0,
      treatment_id: 0,
    });

  const filteredTreatments = treatments.filter(
    (treatment) =>
      treatment.description
        .toLowerCase()
        .includes(searchTreatment.toLowerCase()) &&
      treatment.animals?.record
        .toLowerCase()
        .includes(selectedAnimal?.record.toLowerCase())
  );

  const filteredAnimals = useMemo(
    () =>
      animals.filter((animal) =>
        animal.record.toLowerCase().includes(searchAnimal.toLowerCase())
      ),
    [animals, searchAnimal]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  const handleEdit = (treatment: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/treatmentCreate",
      Instructor: "/instructor/treatmentCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          treatment,
        },
      });
    }
  };
  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/treatmentCreate",
      Instructor: "/instructor/treatmentCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path);
    }
  };

  const handleAddVaccine = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formDataVaccine);
    addTreatmentVaccine(formDataVaccine);
  };

  const handleAddMedication = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formDataMedication);
    addTreatmentMedication(formDataMedication);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 pr-4 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Lista de Animales</h2>
        <div className="relative mb-4">
          <Search className="absolute w-4 left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-8 w-full"
            placeholder="Buscar animales..."
            value={searchAnimal}
            onChange={(e) => setSearchAnimal(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <ul className="space-y-2">
            {filteredAnimals.map((animal) => (
              <li key={animal.idAnimal}>
                <Button
                  variant={selectedAnimal === animal ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedAnimal(animal)}
                >
                  {animal.record}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div className="w-full md:w-3/4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lista de Tratamientos</h1>
          <Button
            variant="ghost"
            className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
            onClick={handleChangeLink}  
          >
            Agregar Tratamiento
          </Button>
        </div>
        <Input
          className="pl-8 w-full"
          placeholder="Buscar tratamientos..."
          value={searchTreatment}
          onChange={(e) => setSearchTreatment(e.target.value)}
        />
        <div className="flex justify-end mb-4"></div>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTreatments.map((treatment) => (
            <Card key={treatment.id} className="text-sm">
              <CardHeader className="flex flex-row justify-between px-6 py-4">
                <CardTitle className="text-lg">
                  {treatment.animals?.record} - {treatment.description}
                </CardTitle>
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-2 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuItem
                        onClick={() => handleEdit(treatment)}
                        className="hover:cursor-pointer"
                      >
                        Editar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="flex gap-2">
                  <strong>Fecha de inicio: </strong> {treatment.start_date}
                </p>
                <p className="flex gap-2">
                  <strong>Fecha de fin: </strong> {treatment.end_date}
                </p>
                <p className="flex gap-2">
                  <strong>Frecuencia: </strong> {treatment.frequency}
                </p>
                <p className="flex gap-2">
                  <strong>Observaciones: </strong> {treatment.observations}
                </p>
                <p className="flex gap-2">
                  <strong>Dosis: </strong> {treatment.dosis}
                </p>
                <p className="flex gap-2">
                  <strong>Vacunas: </strong>
                  {treatment.vaccines_treatments
                    ?.map((vac) => vac.vaccines?.name)
                    .join(", ") || "Ninguna"}
                </p>
                <p className="flex gap-2">
                  <strong>Medicamentos: </strong>
                  {treatment.medication_treatments
                    ?.map((med) => med.medications?.name)
                    .join(", ") || "Ninguno"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                <Bnx
                  onPress={openVaccineModal}
                  className="h-8 rounded-lg bg-black text-white hover:bg-gray-900 hover:text-white p-4 text-xs"
                  startContent={<Syringe className="h-4" />}
                >
                  Vacunas
                </Bnx>
                <Modal
                  isOpen={isVaccineModalOpen}
                  onOpenChange={closeVaccineModal}
                  backdrop="transparent"
                  motionProps={{
                    initial: { opacity: 0, y: -50 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 },
                    transition: { duration: 0.3 },
                  }}
                >
                  <ModalContent>
                    {(onclose) => (
                      <>
                        <ModalHeader>
                          <h2 className="text-xl font-bold">Agregar Vacuna</h2>
                        </ModalHeader>
                        <form onSubmit={handleAddVaccine}>
                          <ModalBody>
                            <Autocomplete
                              variant="bordered"
                              label="Vacunas"
                              name="vaccine_id"
                              labelPlacement="outside"
                              placeholder="Busca la vacuna..."
                              className="max-w-full font-medium md:col-span-2"
                              selectedKey={formDataVaccine.vaccine_id.toString()}
                              onSelectionChange={(key: any | null) => {
                                const selectedId = key ? parseInt(key) : 0;
                                setFormDataVaccine((prev) => ({
                                  ...prev,
                                  vaccine_id: selectedId,
                                }));
                              }}
                            >
                              {vaccines.map((item) => (
                                <AutocompleteItem
                                  key={item.id!.toString()}
                                  value={item.id!.toString()}
                                >
                                  {item.name}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </ModalBody>
                          <ModalFooter className="flex items-center justify-center gap-4">
                            <Button
                              type="submit"
                              onClick={() => {
                                setFormDataVaccine((prev) => ({
                                  ...prev,
                                  treatment_id: treatment.id!,
                                }));
                              }}
                            >
                              Agregar Vacuna
                            </Button>
                            <Bnx
                              color="danger"
                              variant="light"
                              onPress={() => {
                                onclose();
                                setFormDataVaccine({
                                  vaccine_id: 0,
                                  treatment_id: 0,
                                });
                              }}
                            >
                              Cerrar
                            </Bnx>
                          </ModalFooter>
                        </form>
                      </>
                    )}
                  </ModalContent>
                </Modal>

                <Bnx
                  onPress={openMedicationModal}
                  className="h-8 rounded-lg bg-black text-white hover:bg-gray-900 hover:text-white p-4 text-xs"
                  startContent={<PillBottle className="h-4" />}
                >
                  Medicamentos
                </Bnx>
                <Modal
                  isOpen={isMedicationModalOpen}
                  onOpenChange={closeMedicationModal}
                  backdrop="transparent"
                  motionProps={{
                    initial: { opacity: 0, y: -50 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 },
                    transition: { duration: 0.3 },
                  }}
                >
                  <ModalContent>
                    {(onclose) => (
                      <>
                        <ModalHeader>
                          <h2 className="text-xl font-bold">
                            Agregar Medicamento
                          </h2>
                        </ModalHeader>
                        <form onSubmit={handleAddMedication}>
                          <ModalBody>
                            <Autocomplete
                              variant="bordered"
                              label="Medicamentos"
                              name="medication_id"
                              labelPlacement="outside"
                              placeholder="Busca el medicamento..."
                              className="max-w-full font-medium md:col-span-2"
                              selectedKey={formDataMedication.medication_id.toString()}
                              onSelectionChange={(key: any | null) => {
                                const selectedId = key ? parseInt(key) : 0;
                                setFormDataMedication((prev) => ({
                                  ...prev,
                                  medication_id: selectedId,
                                }));
                              }}
                            >
                              {medications.map((item) => (
                                <AutocompleteItem
                                  key={item.id!.toString()}
                                  value={item.id!.toString()}
                                >
                                  {item.name}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </ModalBody>
                          <ModalFooter className="flex justify-center items-center gap-4" >
                            <Button
                              type="submit"
                              onClick={() => {
                                setFormDataMedication((prev) => ({
                                  ...prev,
                                  treatment_id: treatment.id!,
                                }));
                              }}
                            >
                              Agregar Medicamento
                            </Button>
                            <Bnx
                              color="danger"
                              variant="light"
                              onPress={() => {
                                onclose();
                                setFormDataMedication({
                                  medication_id: 0,
                                  treatment_id: 0,
                                });
                              }}
                            >
                              Close
                            </Bnx>
                          </ModalFooter>
                        </form>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentsList;
