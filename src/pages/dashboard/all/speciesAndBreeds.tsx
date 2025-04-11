import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
//Types
import { useBreeds } from "@/hooks/breed/useBreeds";
import { useSpecies } from "@/hooks/species/useSpecies";
import { ClimbingBoxLoader } from "react-spinners";

const SpeciesAndBreedsList = () => {
  const [searchBreeds, setSearchBreeds] = useState("");
  const [searchSpecies, setSearchSpecies] = useState("");
  const navigate = useNavigate();
  const { breeds, loading, error } = useBreeds();
  const { species } = useSpecies();
  const { role } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClimbingBoxLoader color="#2563EB" size={30} />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchBreeds.toLowerCase())
  );

  const filteredSpecies = species.filter((specie) =>
    specie.name.toLowerCase().includes(searchSpecies.toLowerCase())
  );
  const handleEditSpecies = (specie: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/specieCreate",
      Instructor: "/instructor/specieCreate",
      Aprendiz: "/apprentice/specieCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          specie,
        },
      });
    }
  };

  const handleChangeLinkSpecies = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/specieCreate",
      Instructor: "/instructor/specieCreate",
      Aprendiz: "/apprentice/specieCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path);
    }
  };

  const handleEdit = (breed: any) => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/breedCreate",
      Instructor: "/instructor/breedCreate",
      Aprendiz: "/apprentice/breedCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path, {
        state: {
          isEdit: true,
          breed,
        },
      });
    }
  };

  const handleChangeLink = () => {
    const rolePaths: { [key: string]: string } = {
      Administrador: "/admin/breedCreate",
      Instructor: "/instructor/breedCreate",
      Aprendiz: "/apprentice/breedCreate",
    };
    const path = role ? rolePaths[role] : null;
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gestión de Animales
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Razas</h1>
                <Button
                  variant="ghost"
                  className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
                  onClick={handleChangeLink}
                >
                  Agregar raza
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Buscar razas..."
                  value={searchBreeds}
                  onChange={(e) => setSearchBreeds(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBreeds.map((breed) => (
                  <Card key={breed.id} className="bg-secondary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {breed.name}
                      </CardTitle>
                      <Badge variant="outline">{breed.species?.name}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-2 w-8 p-0 py-2"
                            >
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center">
                            <DropdownMenuItem
                              onClick={() => handleEdit(breed)}
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
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Especies</h1>
                <Button
                  variant="ghost"
                  className="h-8 bg-black text-white hover:bg-gray-900 hover:text-white"
                  onClick={handleChangeLinkSpecies}
                >
                  Agregar especie
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Buscar especies..."
                  value={searchSpecies}
                  onChange={(e) => setSearchSpecies(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSpecies.map((specie) => (
                  <Card key={specie.id} className="bg-secondary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {specie.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                              onClick={() => handleEditSpecies(specie)}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpeciesAndBreedsList;
