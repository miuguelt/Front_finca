// src/pages/login/index.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthenticationContext";
import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const LoginForm = () => {
  const [identification, setIdentification] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Manejar parámetro de sesión expirada
  useEffect(() => {
    if (searchParams.get('session') === 'expired') {
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!identification || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (identification.length < 8) {
      setError("El documento debe tener al menos 8 dígitos.");
      return;
    }

    try {
      await login({ identification, password });
      
      // Redirigir a la página previa o al dashboard
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      let errorMessage = 'Credenciales incorrectas. Por favor intente nuevamente.';
      
      // Mensajes de error más específicos
      if (err.message.includes("Token has expired")) {
        errorMessage = 'Sesión expirada. Por favor inicia sesión nuevamente.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Documento o contraseña incorrectos.';
      }
      
      setError(errorMessage);
    }
  };

  const handleIdentificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setIdentification(value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Spinner de carga global */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <ClimbingBoxLoader color="#10B981" loading={isLoading} size={15} />
        </div>
      )}

      {/* Formulario de login */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de documento */}
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
                onChange={handleIdentificationChange}
                onKeyDown={(e) => {
                  if (!/\d/.test(e.key) && 
                      e.key !== 'Backspace' && 
                      e.key !== 'Delete' && 
                      e.key !== 'ArrowLeft' && 
                      e.key !== 'ArrowRight') {
                    e.preventDefault();
                  }
                }}
                className="w-full px-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Campo de contraseña */}
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
                minLength={8}
              />
            </div>
          </div>

          {/* Botón de submit */}
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* Mensajes de error */}
        {error && (
          <div className="p-3 text-sm text-center text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        {/* Enlace a registro */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link 
              to="/signUp" 
              className="text-green-600 hover:text-green-700 font-medium underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;