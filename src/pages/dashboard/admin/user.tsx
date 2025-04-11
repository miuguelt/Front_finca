import { useState } from "react";
import { useUsers } from "@/hooks/user/useUser";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.identification)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: any) => {
    navigate("/admin/userCreate", {
      state: {
        isEdit: true,
        user,
      },
    });
  };

  // Transformar los datos para mostrar "Activo" o "Inactivo"
  const transformedUsers = filteredUsers.map((user) => ({
    ...user,
    status: user.status ? "Activo" : "Inactivo",
  }));

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between items-center mb-11">
        <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
        <div className="flex justify-center items-center gap-6">
          <Button
            variant="ghost"
            className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
          >
            <Link
              to="/admin/userCreate"
              className="text-white hover:text-white"
            >
              Agregar Usuario
            </Link>
          </Button>
          <Input
            className="w-72"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transformedUsers.map((user) => (
          <Card key={user.fullname}>
            <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-4">
              <CardTitle className="text-sm font-medium">
                {user.fullname}
              </CardTitle>
              <div className="flex gap-3">
                <Badge variant="secondary">{user.role}</Badge>
                <Badge
                  variant={
                    user.status === "Activo"
                      ? "vivo"
                      : user.status === "Inactivo"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {user.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">
                    Identificacion:{" "}
                  </span>
                  {user.identification}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Nombre completo:{" "}
                  </span>
                  {user.fullname}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Correo Electronico:{" "}
                  </span>
                  {user.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Numero de Telefono:{" "}
                  </span>
                  {user.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Direccion:{" "}
                  </span>
                  {user.address}
                </p>
              </div>
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
                      onClick={() => handleEdit(user)}
                      className="hover:cursor-pointer"
                    >
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;
