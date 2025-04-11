import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for menu items
interface MenuItem {
  id: string;
  label: string;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { id: "inicio", label: "Inicio" },
    { id: "caracteristicas", label: "Caracteísticas" },
    { id: "galeria", label: "Galería" },
    { id: "informacion", label: "Información" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) =>
        document.getElementById(item.id)
      );
      const currentSection = sections.find((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuItems]);

  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      className="bg-green-800"
    >
      <NavbarContent className="text-white">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src="/assets/logoSenaOrange.svg"
            width={35}
            height={35}
            alt="Logo Sena"
          />
          <Link href="/#inicio" className="font-bold text-inherit text-white ml-4">Finca Villa Luz</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.id}>
            <Link
              className={`text-white hover:text-green-400 ${
                activeSection === item.id
                  ? "font-bold border-b border-green-500"
                  : ""
              }`}
              href={`/#${item.id}`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="bg-green-600 text-white font-semibold"
            onClick={ () => navigate("/login")}
            variant="flat"
          >
            Ingresar
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className={`w-full text-green-900 ${
                activeSection === item.id ? "font-bold text-green-700" : ""
              }`}
              href={`/#${item.id}`}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}