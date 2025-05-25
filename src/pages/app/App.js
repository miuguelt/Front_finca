import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        { path: "/", element: _jsx(LandingPage, {}) },
        { path: "/login", element: _jsx(LoginForm, {}) },
        { path: "/signUp", element: _jsx(SignUpForm, {}) },
        { path: "/unauthorized", element: _jsx(UnauthorizedPage, {}) },
        { path: "/*", element: _jsx(NotFoundPage, {}) },
    ]);
    return routes;
};
const AdminRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: _jsx(AdminHome, {}) },
        { path: "userCreate", element: _jsx(UserForm, {}) },
        { path: "userList", element: _jsx(UserList, {}) },
        { path: "animalCreate", element: _jsx(AnimalForm, {}) },
        { path: "animalList", element: _jsx(AnimalList, {}) },
        { path: "improvedAnimalCreate", element: _jsx(ImprovedAnimalForm, {}) },
        { path: "improvedAnimalList", element: _jsx(GeneticList, {}) },
        { path: "animalDiseaseCreate", element: _jsx(DiseaseAnimalForm, {}) },
        { path: "animalDiseaseList", element: _jsx(DiseaseAnimalList, {}) },
        { path: "breedCreate", element: _jsx(BreedForm, {}) },
        { path: "specieCreate", element: _jsx(SpecieForm, {}) },
        { path: "speciesAndBreedsList", element: _jsx(SpeciesAndBreedsList, {}) },
        { path: "controlCreate", element: _jsx(ControlForm, {}) },
        { path: "controlList", element: _jsx(ControlList, {}) },
        { path: "diseaseCreate", element: _jsx(DiseaseForm, {}) },
        { path: "diseaseList", element: _jsx(DiseaseList, {}) },
        { path: "medicineCreate", element: _jsx(MedicineForm, {}) },
        { path: "medicineList", element: _jsx(MedicationList, {}) },
        { path: "vaccineCreate", element: _jsx(VaccineForm, {}) },
        { path: "vaccineList", element: _jsx(VaccinesList, {}) },
        { path: "vaccinationCreate", element: _jsx(VaccinationForm, {}) },
        { path: "vaccinationList", element: _jsx(VaccinationList, {}) },
        { path: "treatmentCreate", element: _jsx(TreatmentForm, {}) },
        { path: "treatmentList", element: _jsx(TreatmentsList, {}) },
        { path: "animalFieldCreate", element: _jsx(AnimalFieldForm, {}) },
        { path: "animalFieldList", element: _jsx(AnimalFieldList, {}) },
        { path: "fieldCreate", element: _jsx(FieldForm, {}) },
        { path: "fieldList", element: _jsx(FieldList, {}) },
        { path: "foodTypeCreate", element: _jsx(FoodTypeForm, {}) },
        { path: "foodTypeList", element: _jsx(FoodTypeList, {}) },
        { path: "/*", element: _jsx(NotFoundPage, {}) },
    ]);
    return routes;
};
const InstructorRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: _jsx(InstructorHome, {}) },
        { path: "/*", element: _jsx(NotFoundPage, {}) },
        { path: "animalCreate", element: _jsx(AnimalForm, {}) },
        { path: "animalList", element: _jsx(AnimalList, {}) },
        { path: "improvedAnimalCreate", element: _jsx(ImprovedAnimalForm, {}) },
        { path: "improvedAnimalList", element: _jsx(GeneticList, {}) },
        { path: "animalDiseaseCreate", element: _jsx(DiseaseAnimalForm, {}) },
        { path: "animalDiseaseList", element: _jsx(DiseaseAnimalList, {}) },
        { path: "breedCreate", element: _jsx(BreedForm, {}) },
        { path: "specieCreate", element: _jsx(SpecieForm, {}) },
        { path: "speciesAndBreedsList", element: _jsx(SpeciesAndBreedsList, {}) },
        { path: "controlCreate", element: _jsx(ControlForm, {}) },
        { path: "controlList", element: _jsx(ControlList, {}) },
        { path: "diseaseCreate", element: _jsx(DiseaseForm, {}) },
        { path: "diseaseList", element: _jsx(DiseaseList, {}) },
        { path: "medicineCreate", element: _jsx(MedicineForm, {}) },
        { path: "medicineList", element: _jsx(MedicationList, {}) },
        { path: "vaccineCreate", element: _jsx(VaccineForm, {}) },
        { path: "vaccineList", element: _jsx(VaccinesList, {}) },
        { path: "vaccinationCreate", element: _jsx(VaccinationForm, {}) },
        { path: "vaccinationList", element: _jsx(VaccinationList, {}) },
        { path: "treatmentCreate", element: _jsx(TreatmentForm, {}) },
        { path: "treatmentList", element: _jsx(TreatmentsList, {}) },
        { path: "animalFieldCreate", element: _jsx(AnimalFieldForm, {}) },
        { path: "animalFieldList", element: _jsx(AnimalFieldList, {}) },
        { path: "fieldCreate", element: _jsx(FieldForm, {}) },
        { path: "fieldList", element: _jsx(FieldList, {}) },
        { path: "foodTypeCreate", element: _jsx(FoodTypeForm, {}) },
        { path: "foodTypeList", element: _jsx(FoodTypeList, {}) },
    ]);
    return routes;
};
const ApprenticeRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: _jsx(ApprenticeHome, {}) },
        { path: "animalCreate", element: _jsx(AnimalForm, {}) },
        { path: "animalList", element: _jsx(AnimalList, {}) },
        { path: "animalDiseaseCreate", element: _jsx(DiseaseAnimalForm, {}) },
        { path: "animalDiseaseList", element: _jsx(DiseaseAnimalList, {}) },
        { path: "breedCreate", element: _jsx(BreedForm, {}) },
        { path: "specieCreate", element: _jsx(SpecieForm, {}) },
        { path: "speciesAndBreedsList", element: _jsx(SpeciesAndBreedsList, {}) },
        { path: "controlCreate", element: _jsx(ControlForm, {}) },
        { path: "controlList", element: _jsx(ControlList, {}) },
        { path: "animalFieldCreate", element: _jsx(AnimalFieldForm, {}) },
        { path: "animalFieldList", element: _jsx(AnimalFieldList, {}) },
        { path: "improvedAnimalCreate", element: _jsx(ImprovedAnimalForm, {}) },
        { path: "improvedAnimalList", element: _jsx(GeneticList, {}) },
        { path: "fieldCreate", element: _jsx(FieldForm, {}) },
        { path: "fieldList", element: _jsx(FieldList, {}) },
        { path: "foodTypeCreate", element: _jsx(FoodTypeForm, {}) },
        { path: "foodTypeList", element: _jsx(FoodTypeList, {}) },
        { path: "/*", element: _jsx(NotFoundPage, {}) },
    ]);
    return routes;
};
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/*", element: _jsx(Layout, { children: _jsx(MainRoutes, {}) }) }), _jsx(Route, { path: "/admin/*", element: _jsx(ProtectedRoute, { allowedRoles: ["Administrador"], children: _jsx(DashboardLayout, { role: "administrador", children: _jsx(AdminRoutes, {}) }) }) }), _jsx(Route, { path: "/instructor/*", element: _jsx(ProtectedRoute, { allowedRoles: ["Instructor"], children: _jsx(DashboardLayout, { role: "instructor", children: _jsx(InstructorRoutes, {}) }) }) }), _jsx(Route, { path: "/apprentice/*", element: _jsx(ProtectedRoute, { allowedRoles: ["Aprendiz"], children: _jsx(DashboardLayout, { role: "aprendiz", children: _jsx(ApprenticeRoutes, {}) }) }) })] }) }) }));
}
export default App;
