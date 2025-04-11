import { useRoutes, BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "@/context/AuthenticationContext";
import ProtectedRoute from "@/components/routes/PrivateRoutes";

//Paginas de rutas
import LandingPage from "../landing";
import LoginForm from "../login";
import Layout from "@/components/landing/Layout";
import NotFoundPage from "../notFound";
import SignUpForm from "../signUp";

//Rutas Admin
import AdminHome from "../dashboard/admin/home";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UnauthorizedPage from "../unauthorized";
import UserForm from "../dashboard/admin/userForm";
import UserList from "../dashboard/admin/user";

//Rutas Instructor
import InstructorHome from "../dashboard/instructor/home";

//Rutas Aprendiz
import ApprenticeHome from "../dashboard/apprentice/home";

//Rutas Admin e Instructor
import AnimalForm from "../dashboard/all/forms/animalForm";
import AnimalList from "../dashboard/all/animals";
import DiseaseAnimalForm from "../dashboard/all/forms/diseaseAnimalForm";
import DiseaseAnimalList from "../dashboard/all/diseaseAnimal";
import BreedForm from "../dashboard/all/forms/breedForm";
import SpecieForm from "../dashboard/all/forms/specieForm";
import SpeciesAndBreedsList from "../dashboard/all/speciesAndBreeds";
import ImprovedAnimalForm from "../dashboard/all/forms/improvedAnimalForm";
import GeneticList from "../dashboard/all/geneticImprovements";
import ControlForm from "../dashboard/all/forms/controlForm";
import ControlList from "../dashboard/all/controls";
import DiseaseForm from "../dashboard/all/forms/diseaseForm";
import DiseaseList from "../dashboard/all/diseases";
import MedicineForm from "../dashboard/all/forms/medicineForm";
import MedicationList from "../dashboard/all/medications";
import TreatmentForm from "../dashboard/all/forms/treatmentForm";
import TreatmentsList from "../dashboard/all/treatments";
import AnimalFieldForm from "../dashboard/all/forms/animalFieldForm";
import AnimalFieldList from "../dashboard/all/animalFields";
import FieldForm from "../dashboard/all/forms/fieldForm";
import FieldList from "../dashboard/all/fields";
import FoodTypeForm from "../dashboard/all/forms/foodTypeForm";
import FoodTypeList from "../dashboard/all/foodTypes";
import VaccineForm from "../dashboard/all/forms/vaccineForm";
import VaccinesList from "../dashboard/all/vaccines";
import VaccinationForm from "../dashboard/all/forms/vaccinationForm";
import VaccinationList from "../dashboard/all/vaccinations";

const MainRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/signUp", element: <SignUpForm /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
    { path: "/*", element: <NotFoundPage /> },
  ]);
  return routes;
};

const AdminRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <AdminHome /> },
    { path: "userCreate", element: <UserForm /> },
    { path: "userList", element: <UserList /> },
    { path: "animalCreate", element: <AnimalForm /> },
    { path: "animalList", element: <AnimalList /> },
    { path: "improvedAnimalCreate", element: <ImprovedAnimalForm /> },
    { path: "improvedAnimalList", element: <GeneticList /> },
    { path: "animalDiseaseCreate", element: <DiseaseAnimalForm /> },
    { path: "animalDiseaseList", element: <DiseaseAnimalList /> },
    { path: "breedCreate", element: <BreedForm /> },
    { path: "specieCreate", element: <SpecieForm /> },
    { path: "speciesAndBreedsList", element: <SpeciesAndBreedsList /> },
    { path: "controlCreate", element: <ControlForm /> },
    { path: "controlList", element: <ControlList /> },
    { path: "diseaseCreate", element: <DiseaseForm /> },
    { path: "diseaseList", element: <DiseaseList /> },
    { path: "medicineCreate", element: <MedicineForm /> },
    { path: "medicineList", element: <MedicationList /> },
    { path: "vaccineCreate", element: <VaccineForm /> },
    { path: "vaccineList", element: <VaccinesList /> },
    { path: "vaccinationCreate", element: <VaccinationForm /> },
    { path: "vaccinationList", element: <VaccinationList /> },
    { path: "treatmentCreate", element: <TreatmentForm /> },
    { path: "treatmentList", element: <TreatmentsList /> },
    { path: "animalFieldCreate", element: <AnimalFieldForm /> },
    { path: "animalFieldList", element: <AnimalFieldList /> },
    { path: "fieldCreate", element: <FieldForm /> },
    { path: "fieldList", element: <FieldList /> },
    { path: "foodTypeCreate", element: <FoodTypeForm /> },
    { path: "foodTypeList", element: <FoodTypeList /> },
    { path: "/*", element: <NotFoundPage /> },
  ]);
  return routes;
};

const InstructorRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <InstructorHome /> },
    { path: "/*", element: <NotFoundPage /> },
    { path: "animalCreate", element: <AnimalForm /> },
    { path: "animalList", element: <AnimalList /> },
    { path: "improvedAnimalCreate", element: <ImprovedAnimalForm /> },
    { path: "improvedAnimalList", element: <GeneticList /> },
    { path: "animalDiseaseCreate", element: <DiseaseAnimalForm /> },
    { path: "animalDiseaseList", element: <DiseaseAnimalList /> },
    { path: "breedCreate", element: <BreedForm /> },
    { path: "specieCreate", element: <SpecieForm /> },
    { path: "speciesAndBreedsList", element: <SpeciesAndBreedsList /> },
    { path: "controlCreate", element: <ControlForm /> },
    { path: "controlList", element: <ControlList /> },
    { path: "diseaseCreate", element: <DiseaseForm /> },
    { path: "diseaseList", element: <DiseaseList /> },
    { path: "medicineCreate", element: <MedicineForm /> },
    { path: "medicineList", element: <MedicationList /> },
    { path: "vaccineCreate", element: <VaccineForm /> },
    { path: "vaccineList", element: <VaccinesList /> },
    { path: "vaccinationCreate", element: <VaccinationForm /> },
    { path: "vaccinationList", element: <VaccinationList /> },
    { path: "treatmentCreate", element: <TreatmentForm /> },
    { path: "treatmentList", element: <TreatmentsList /> },
    { path: "animalFieldCreate", element: <AnimalFieldForm /> },
    { path: "animalFieldList", element: <AnimalFieldList /> },
    { path: "fieldCreate", element: <FieldForm /> },
    { path: "fieldList", element: <FieldList /> },
    { path: "foodTypeCreate", element: <FoodTypeForm /> },
    { path: "foodTypeList", element: <FoodTypeList /> },
  ]);
  return routes;
};

const ApprenticeRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <ApprenticeHome /> },
    { path: "animalCreate", element: <AnimalForm /> },
    { path: "animalList", element: <AnimalList /> },
    { path: "animalDiseaseCreate", element: <DiseaseAnimalForm /> },
    { path: "animalDiseaseList", element: <DiseaseAnimalList /> },
    { path: "breedCreate", element: <BreedForm /> },
    { path: "specieCreate", element: <SpecieForm /> },
    { path: "speciesAndBreedsList", element: <SpeciesAndBreedsList /> },
    { path: "controlCreate", element: <ControlForm /> },
    { path: "controlList", element: <ControlList /> },
    { path: "animalFieldCreate", element: <AnimalFieldForm /> },
    { path: "animalFieldList", element: <AnimalFieldList /> },
    { path: "improvedAnimalCreate", element: <ImprovedAnimalForm /> },
    { path: "improvedAnimalList", element: <GeneticList /> },
    { path: "fieldCreate", element: <FieldForm /> },
    { path: "fieldList", element: <FieldList /> },
    { path: "foodTypeCreate", element: <FoodTypeForm /> },
    { path: "foodTypeList", element: <FoodTypeList /> },
    { path: "/*", element: <NotFoundPage /> },
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <MainRoutes />
              </Layout>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["Administrador"]}>
                <DashboardLayout role="administrador">
                  <AdminRoutes />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/*"
            element={
              <ProtectedRoute allowedRoles={["Instructor"]}>
                <DashboardLayout role="instructor">
                  <InstructorRoutes />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apprentice/*"
            element={
              <ProtectedRoute allowedRoles={["Aprendiz"]}>
                <DashboardLayout role="aprendiz">
                  <ApprenticeRoutes />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/*"
            element={
              <Layout>
                <MainRoutes />
              </Layout>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
