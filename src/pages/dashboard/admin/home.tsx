import StatisticsCard from "@/components/dashboard/Cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAnimals } from "@/hooks/animal/useAnimals";
import { useUsers } from "@/hooks/user/useUser";
import { useAuth } from "@/hooks/auth/useAuth";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnimalDiseases } from "@/hooks/animalDiseases/useAnimalDiseases";

const AdminHome = () => {
  // Estado para la categoría seleccionada


  const COLORS = ["#0088FE", "#FF8042", "#00C49F"];
  const { animalStatusData } = useAnimals();
  const { userRolesData, usersStatusData } = useUsers();
  const { name } = useAuth();
  const { animalDiseases } = useAnimalDiseases();

  const totalAnimals = animalDiseases.length;


  return (
    <>
      <div className="bg-gray-800 p-0 w-full h-16 text-center text-white">
        <div className="flex justify-center items-center h-full text-xl font-bold">
          Bienvenido, {name}
        </div>
      </div>

      <div>
        <Tabs
          defaultValue="todos"
          className="m-4 ml-4 mt-8"
         
        >
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="animales">Animales</TabsTrigger>
            <TabsTrigger value="sanidad">Sanidad</TabsTrigger>
            <TabsTrigger value="terrenos">Terrenos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 justify-center gap-8 p-4 ">
        <Card className="text-sm font-semibold">
          <CardHeader>
            <CardTitle className="text-center">Usuarios por Rol</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width={400} height={270}>
              <PieChart>
                <Pie
                  data={userRolesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="role"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userRolesData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="text-sm font-semibold">
          <CardHeader>
            <CardTitle className="text-center">Usuarios por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width={400} height={270}>
              <BarChart
                data={usersStatusData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <section className="grid grid-cols-2 p-4 w-full gap-8">
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

export default AdminHome;
