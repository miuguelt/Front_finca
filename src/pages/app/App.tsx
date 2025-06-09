import { Route, Routes, Outlet } from "react-router-dom"; // Quita BrowserRouter de aquí

import "./App.css";
import { AuthProvider } from "@/context/AuthenticationContext";
import ProtectedRoute from "@/components/routes/PrivateRoutes";

// Páginas generales
import LandingPage from "../landing";
import LoginForm from "../login";
import Layout from "@/components/landing/Layout";
import NotFoundPage from "../notFound";
import SignUpForm from "../signUp";
import UnauthorizedPage from "../unauthorized";

// Componentes de Dashboard
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Rutas específicas
import AdminHome from "../dashboard/admin/home";
import UserForm from "../dashboard/admin/userForm";
import UserList from "../dashboard/admin/user";

import InstructorHome from "../dashboard/instructor/home";
import ApprenticeHome from "../dashboard/apprentice/home";

// Compartidas entre admin e instructor
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

function App() {
  return (
    // <BrowserRouter> // ELIMINA BrowserRouter de aquí, ya debe estar en main.tsx
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginForm />
            </Layout>
          }
        />
        <Route
          path="/signUp"
          element={
            <Layout>
              <SignUpForm />
            </Layout>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <Layout>
              <UnauthorizedPage />
            </Layout>
          }
        />
        {/* La ruta catch-all para public se queda aquí */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />

        {/* Rutas protegidas: Administrador */}
        {/* El elemento padre es ProtectedRoute envolviendo DashboardLayout.
            Las rutas anidadas se renderizarán dentro de <Outlet /> en DashboardLayout. */}
        <Route
          path="/admin" // Ruta base para el rol de Administrador
          element={
            <ProtectedRoute allowedRoles={["Administrador"]}>
              <DashboardLayout role="administrador">
                {/* <Outlet /> se renderizará aquí para las sub-rutas */}
                <Outlet /> 
              </DashboardLayout>
            </ProtectedRoute>
          }
        >
          {/* Rutas anidadas para Administrador. 
              El index renderiza el home del admin cuando la ruta es exactamente /admin */}
          <Route index element={<AdminHome />} />
          <Route path="userCreate" element={<UserForm />} />
          <Route path="userList" element={<UserList />} />
          <Route path="animalCreate" element={<AnimalForm />} />
          <Route path="animalList" element={<AnimalList />} />
          <Route path="improvedAnimalCreate" element={<ImprovedAnimalForm />} />
          <Route path="improvedAnimalList" element={<GeneticList />} />
          <Route path="animalDiseaseCreate" element={<DiseaseAnimalForm />} />
          <Route path="animalDiseaseList" element={<DiseaseAnimalList />} />
          <Route path="breedCreate" element={<BreedForm />} />
          <Route path="specieCreate" element={<SpecieForm />} />
          <Route path="speciesAndBreedsList" element={<SpeciesAndBreedsList />} />
          <Route path="controlCreate" element={<ControlForm />} />
          <Route path="controlList" element={<ControlList />} />
          <Route path="diseaseCreate" element={<DiseaseForm />} />
          <Route path="diseaseList" element={<DiseaseList />} />
          <Route path="medicineCreate" element={<MedicineForm />} />
          <Route path="medicineList" element={<MedicationList />} />
          <Route path="vaccineCreate" element={<VaccineForm />} />
          <Route path="vaccineList" element={<VaccinesList />} />
          <Route path="vaccinationCreate" element={<VaccinationForm />} />
          <Route path="vaccinationList" element={<VaccinationList />} />
          <Route path="treatmentCreate" element={<TreatmentForm />} />
          <Route path="treatmentList" element={<TreatmentsList />} />
          <Route path="animalFieldCreate" element={<AnimalFieldForm />} />
          <Route path="animalFieldList" element={<AnimalFieldList />} />
          <Route path="fieldCreate" element={<FieldForm />} />
          <Route path="fieldList" element={<FieldList />} />
          <Route path="foodTypeCreate" element={<FoodTypeForm />} />
          <Route path="foodTypeList" element={<FoodTypeList />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all para /admin/* */}
        </Route>

        {/* Rutas protegidas: Instructor */}
        <Route
          path="/instructor" // Ruta base para el rol de Instructor
          element={
            <ProtectedRoute allowedRoles={["Instructor"]}>
              <DashboardLayout role="instructor">
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }
        >
          {/* Rutas anidadas para Instructor */}
          <Route index element={<InstructorHome />} />
          <Route path="animalCreate" element={<AnimalForm />} />
          <Route path="animalList" element={<AnimalList />} />
          <Route path="improvedAnimalCreate" element={<ImprovedAnimalForm />} />
          <Route path="improvedAnimalList" element={<GeneticList />} />
          <Route path="animalDiseaseCreate" element={<DiseaseAnimalForm />} />
          <Route path="animalDiseaseList" element={<DiseaseAnimalList />} />
          <Route path="breedCreate" element={<BreedForm />} />
          <Route path="specieCreate" element={<SpecieForm />} />
          <Route path="speciesAndBreedsList" element={<SpeciesAndBreedsList />} />
          <Route path="controlCreate" element={<ControlForm />} />
          <Route path="controlList" element={<ControlList />} />
          <Route path="diseaseCreate" element={<DiseaseForm />} />
          <Route path="diseaseList" element={<DiseaseList />} />
          <Route path="medicineCreate" element={<MedicineForm />} />
          <Route path="medicineList" element={<MedicationList />} />
          <Route path="vaccineCreate" element={<VaccineForm />} />
          <Route path="vaccineList" element={<VaccinesList />} />
          <Route path="vaccinationCreate" element={<VaccinationForm />} />
          <Route path="vaccinationList" element={<VaccinationList />} />
          <Route path="treatmentCreate" element={<TreatmentForm />} />
          <Route path="treatmentList" element={<TreatmentsList />} />
          <Route path="animalFieldCreate" element={<AnimalFieldForm />} />
          <Route path="animalFieldList" element={<AnimalFieldList />} />
          <Route path="fieldCreate" element={<FieldForm />} />
          <Route path="fieldList" element={<FieldList />} />
          <Route path="foodTypeCreate" element={<FoodTypeForm />} />
          <Route path="foodTypeList" element={<FoodTypeList />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all para /instructor/* */}
        </Route>

        {/* Rutas protegidas: Aprendiz */}
        <Route
          path="/apprentice" // Ruta base para el rol de Aprendiz
          element={
            <ProtectedRoute allowedRoles={["Aprendiz"]}>
              <DashboardLayout role="aprendiz">
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }
        >
          {/* Rutas anidadas para Aprendiz */}
          <Route index element={<ApprenticeHome />} />
          <Route path="animalCreate" element={<AnimalForm />} />
          <Route path="animalList" element={<AnimalList />} />
          <Route path="animalDiseaseCreate" element={<DiseaseAnimalForm />} />
          <Route path="animalDiseaseList" element={<DiseaseAnimalList />} />
          <Route path="breedCreate" element={<BreedForm />} />
          <Route path="specieCreate" element={<SpecieForm />} />
          <Route path="speciesAndBreedsList" element={<SpeciesAndBreedsList />} />
          <Route path="controlCreate" element={<ControlForm />} />
          <Route path="controlList" element={<ControlList />} />
          <Route path="animalFieldCreate" element={<AnimalFieldForm />} />
          <Route path="animalFieldList" element={<AnimalFieldList />} />
          <Route path="improvedAnimalCreate" element={<ImprovedAnimalForm />} />
          <Route path="improvedAnimalList" element={<GeneticList />} />
          <Route path="fieldCreate" element={<FieldForm />} />
          <Route path="fieldList" element={<FieldList />} />
          <Route path="foodTypeCreate" element={<FoodTypeForm />} />
          <Route path="foodTypeList" element={<FoodTypeList />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all para /apprentice/* */}
        </Route>
      </Routes>
    </AuthProvider>
    // </BrowserRouter> // ELIMINA BrowserRouter de aquí
  );
}

export default App;