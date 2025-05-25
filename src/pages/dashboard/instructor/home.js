import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import StatisticsCard from "@/components/dashboard/Cards";
import { useAuth } from "@/hooks/auth/useAuth";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";
import { useAnimals } from "@/hooks/animal/useAnimals";
const InstructorHome = () => {
    const { name } = useAuth();
    const { animalStatusData } = useAnimals();
    const { animalDiseases } = useAnimalDiseases();
    const totalAnimals = animalDiseases.length;
    const COLORS = ["#0088FE", "#FF8042", "#00C49F"];
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-gray-800 p-0 w-full h-16 text-center text-white", children: _jsxs("div", { className: "flex justify-center items-center h-full text-xl font-bold", children: ["Bienvenido, ", name] }) }), _jsx("div", { children: _jsx(Tabs, { defaultValue: "todos", className: "m-4 ml-4 mt-8", children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "todos", children: "Todos" }), _jsx(TabsTrigger, { value: "usuarios", children: "Usuarios" }), _jsx(TabsTrigger, { value: "animales", children: "Animales" }), _jsx(TabsTrigger, { value: "sanidad", children: "Sanidad" }), _jsx(TabsTrigger, { value: "terrenos", children: "Terrenos" })] }) }) }), _jsxs("section", { className: "grid grid-cols-2 p-6 w-full gap-8", children: [_jsx("div", { className: "flex justify-center items-center", children: _jsx(StatisticsCard, { title: "Total de animales enfermos", description: "Animales que se encuentran enfermos", value: totalAnimals }) }), _jsx("div", { className: "justify-center w-full", children: _jsxs(Card, { className: "text-sm font-semibold", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center", children: "Estado de los Animales" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: 400, height: 270, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: animalStatusData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "count", nameKey: "status", label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, children: animalStatusData.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), " ", _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) })] }) })] })] }));
};
export default InstructorHome;
