import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/userTypes";
import { useUsers } from "@/hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@nextui-org/react";

const UserForm = () => {
  const { addUser, editUser } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState<User>({
    fullname: "",
    role: "Aprendiz",
    identification: "",
    password: "SENA2024",
    email: "",
    phone: "",
    address: "",
    status: true,
  });

  useEffect(() => {
    if (state?.isEdit && state?.user) {
      setFormData(state.user);
    }
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state?.isEdit) {
      if (formData.id !== undefined) {
        editUser(formData.id, {
          fullname: formData.fullname,
          role: formData.role,
          identification: formData.identification,
          password: formData.password,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          status: formData.status,
        });
        console.log(formData);
      }
    } else {
      addUser(formData);
    }
    navigate("/admin/userList");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center">
            {state?.isEdit ? "Editar Usuario" : "Agregar Usuario"}
          </h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-5">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-sm font-medium">
                  Nombre Completo
                </Label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="ej: Jhon Mauricio Pérez Torres"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Rol
                </Label>
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={(value: string) =>
                    setFormData((prev: User) => ({
                      ...prev,
                      role: value as User["role"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aprendiz">Aprendiz</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="identification" className="text-sm font-medium">
                  Identificación
                </Label>
                <Input
                  type="text"
                  id="identification"
                  name="identification"
                  value={formData.identification.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Permitir solo números
                    if (/^\d*$/.test(value)) {
                      setFormData((prev) => ({
                        ...prev,
                        identification: value,
                      }));
                    }
                  }}
                  maxLength={10}
                  required
                  className="w-full"
                  placeholder="ej: 1087635492"
                  pattern="\d{1,10}"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese el correo electrónico"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Teléfono
                </Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese el teléfono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Dirección
                </Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Ingrese la dirección"
                />
              </div>
              {state?.isEdit && (
                <div className="space-y-2 md:col-span-2">
                  <Checkbox
                    isSelected={formData.status as boolean}
                    onValueChange={(isSelected: boolean) =>
                      setFormData((prev) => ({ ...prev, status: isSelected }))
                    }
                  >
                    Estado
                  </Checkbox>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-48 m-auto">
              {state?.isEdit ? "Guardar Cambios" : "Agregar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;
