import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaPhone, FaCity } from "react-icons/fa";
import { useUsers } from "@/hooks/user/useUser";
import { User } from "@/types/userTypes";
import { useNavigate } from "react-router-dom";


const SignUpForm = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formData, setFormData] = useState<User>({
    identification: "",
    fullname: "",
    email: "",
    password: "",
    role: "Aprendiz",
    phone: "",
    address: "",
    status: true,
  });
  const { addUser } = useUsers();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }
    try {
      addUser(formData);
      console.log("Usuario registrado correctamente", formData);
      navigate("/login");
    } catch (error) {
      console.error("Error en la solicitud de registro", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Registro de Usuario
        </h2>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 sm:col-span-2 lg:col-span-2">
              <Label htmlFor="identification" className="text-green-700">
                Número de Documento
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard />
                </span>
                <Input
                  id="identification"
                  name="identification"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={10}
                  placeholder="Ingrese su documento"
                  value={formData.identification}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (!/\d/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="fullname" className="text-green-700">
                Nombre Completo
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser />
                </span>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="email" className="text-green-700">
                Correo Electrónico
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope />
                </span>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="">
              <Label htmlFor="phone" className="text-green-700">
                Teléfono
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone />
                </span>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Ingrese su teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-green-700">
                Dirección
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCity />
                </span>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Ingrese su dirección"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-700">
                Contraseña
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock />
                </span>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-green-700">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock />
                </span>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-4 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
