import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClimbingBoxLoader } from "react-spinners";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("session") === "expired") {
      setError("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identification || !password) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      const result: { success: boolean; message?: string; role?: string } = await login({ identification, password });
      if (result.success) {
        // Redirigir según origen o rol
        const from = (location.state as any)?.from?.pathname;
        if (from) {
          navigate(from, { replace: true });
        } else {
          if (result.role === "Administrador") navigate("/admin");
          else if (result.role === "Instructor") navigate("/instructor");
          else if (result.role === "Aprendiz") navigate("/apprentice");
          else navigate("/unauthorized");
        }
      } else {
        setError(result.message || "Credenciales incorrectas.");
      }
    } catch {
      setError("Error inesperado.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <ClimbingBoxLoader color="#10B981" loading={isLoading} size={15} />
        </div>
      )}

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <Label htmlFor="documento">Documento</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-gray-500">
                <FaUser />
              </span>
              <Input
                id="documento"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                required
                className="pl-8"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-gray-500">
                <FaLock />
              </span>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-8"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Iniciar Sesión
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿No tienes una cuenta?{" "}
          <Link to="/signUp" className="text-green-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
