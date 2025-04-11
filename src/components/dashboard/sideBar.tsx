import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/hooks/auth/useAuth'
import { Divider } from '@nextui-org/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  children?: React.ReactNode
  href?: string
  onClick?: () => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, children, onClick }) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        className="flex items-center text-md w-full p-2 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
        onClick={() => {
          setIsOpen(!isOpen)
          onClick && onClick()
        }}
        aria-expanded={isOpen}
      >
        {icon}
        <span className="ml-3">{title}</span>
        {children && (
          <span className="ml-auto">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </button>
      {children && isOpen && (
        <div className="ml-6 mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  children?: React.ReactNode
  heading: string
}

export const Sidebar: React.FC<SidebarProps> = ({ children, heading }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleDashboardRole = () => {
    if (role == "Administrador") {
      navigate("/admin/");
    } else if (role == "Instructor") {
      navigate("/instructor/");
    } else if (role == "Aprendiz") {
      navigate("/apprentice/");
    }
  }

  return (
    <>
      {!isSidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir</span>
        </Button>
      )}

      <aside className={`
        fixed top-0 left-0 z-40 w-72 h-screen
        bg-gray-800 text-white p-4
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-center mb-5">
          {/* Mateo corregir para que lo direccione dependiendo el rol */}
          <h2 className="text-xl font-bold hover:cursor-pointer" onClick={handleDashboardRole}>
            {heading}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>

        <Divider className='bg-gray-600' />

        <nav className="space-y-2 mt-2">

          {children}

          <Button
            variant="ghost"
            onClick={() => logout()}
            className="flex items-center w-full p-2 bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white rounded-lg transition-colors"
          >
            {/* Icono de logout a la izquierda */}
            <FaSignOutAlt className="mr-2" />
            LogOut
          </Button>
          {/* Puedes agregar más opciones aquí */}
        </nav>
      </aside>
    </>
  )
}

