import { XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Acceso no autorizado</h1>
        <p className="text-gray-600 mb-8 text-justify">
          Lo sentimos, no tienes permiso para acceder a esta página. Si crees que esto es un error, por favor contacta al administrador del sistema.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full bg-green-800 hover:bg-green-700">
            <Link to="/">
              Volver a la página principal
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="">
              Contactar con soporte
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage;