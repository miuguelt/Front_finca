import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import { loginUser } from "@/services/authService";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const LoginForm = () => {
  const [identification, setIdentification] = useState<number | "">("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (identification && password) {
      setLoading(true);
      setError(null);
      try {
        const response = await loginUser({ identification, password });
        if (response?.success) {
          login(response?.data);
        } else {
          setError("Documento o contraseña incorrectos");
        }
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al iniciar sesión");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Por favor, complete todos los campos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <ClimbingBoxLoader color="#10B981" loading={loading} size={15} />
        </div>
      ) : (
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="documento" className="text-green-700">
              Número de Documento
            </Label>
            <div className="relative">
              <span className="absolute text-gray-600 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser />
              </span>
              <Input
                id="documento"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={10}  
                placeholder="Ingrese su documento"
                value={identification}
                onChange={(e) => setIdentification(e.target.value ? Number(e.target.value) : "")}
                onKeyPress={(e) => {
                if (!/\d/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
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
                type="password"
                placeholder="••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Iniciar Sesión
          </Button>
        </form>
        {error && (
          <div className="text-red-600 text-sm text-center">
            {error}
          </div>
        )}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/signUp" className="text-green-600 hover:text-green-700 font-medium">
              Regístrate aquí 
            </Link>
          </p>
        </div>
      </div>
      )}
    </div>
  );
};

export default LoginForm;