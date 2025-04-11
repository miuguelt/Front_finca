import StatisticsCard from "@/components/dashboard/Cards";
import { useAuth } from "@/hooks/auth/useAuth";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";
import { useAnimals } from "@/hooks/animal/useAnimals";
const ApprenticeHome = () => {
  const { name } = useAuth();
  const { animalStatusData } = useAnimals();
  const { animalDiseases } = useAnimalDiseases();
  const totalAnimals = animalDiseases.length;

  const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

  return (
    <>
      <div className="bg-gray-800 p-0 w-full h-16 text-center text-white">
        <div className="flex justify-center items-center h-full text-xl font-bold">
          Bienvenido, {name}
        </div>
      </div>

      <div>
        <Tabs defaultValue="todos" className="m-4 ml-4 mt-8">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="animales">Animales</TabsTrigger>
            <TabsTrigger value="sanidad">Sanidad</TabsTrigger>
            <TabsTrigger value="terrenos">Terrenos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <section className="grid grid-cols-2 p-6 w-full gap-8">
        <div className="flex justify-center items-center">
          <StatisticsCard
            title={"Total de animales enfermos"}
            description={"Animales que se encuentran enfermos"}
            value={totalAnimals}
          />
        </div>

        <div className="justify-center w-full">
          <Card className="text-sm font-semibold">
            <CardHeader>
              <CardTitle className="text-center">
                Estado de los Animales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width={400} height={270}>
                <PieChart>
                  <Pie
                    data={animalStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {animalStatusData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>{" "}
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ApprenticeHome;
