import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image, } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const navigate = useNavigate();
    const menuItems = [
        { id: "inicio", label: "Inicio" },
        { id: "caracteristicas", label: "Caracteísticas" },
        { id: "galeria", label: "Galería" },
        { id: "informacion", label: "Información" },
    ];
    useEffect(() => {
        const handleScroll = () => {
            const sections = menuItems.map((item) => document.getElementById(item.id));
            const currentSection = sections.find((section) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    return (rect.top <= window.innerHeight / 2 &&
                        rect.bottom >= window.innerHeight / 2);
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
    return (_jsxs(Navbar, { isBordered: true, onMenuOpenChange: setIsMenuOpen, isBlurred: false, className: "bg-green-800", children: [_jsxs(NavbarContent, { className: "text-white", children: [_jsx(NavbarMenuToggle, { "aria-label": isMenuOpen ? "Close menu" : "Open menu", className: "sm:hidden" }), _jsxs(NavbarBrand, { children: [_jsx(Image, { src: "/assets/logoSenaOrange.svg", width: 35, height: 35, alt: "Logo Sena" }), _jsx(Link, { href: "/#inicio", className: "font-bold text-inherit text-white ml-4", children: "Finca Villa Luz" })] })] }), _jsx(NavbarContent, { className: "hidden sm:flex gap-4", justify: "center", children: menuItems.map((item) => (_jsx(NavbarItem, { children: _jsx(Link, { className: `text-white hover:text-green-400 ${activeSection === item.id
                            ? "font-bold border-b border-green-500"
                            : ""}`, href: `/#${item.id}`, children: item.label }) }, item.id))) }), _jsx(NavbarContent, { justify: "end", children: _jsx(NavbarItem, { children: _jsx(Button, { className: "bg-green-600 text-white font-semibold", onClick: () => navigate("/login"), variant: "flat", children: "Ingresar" }) }) }), _jsx(NavbarMenu, { children: menuItems.map((item, index) => (_jsx(NavbarMenuItem, { children: _jsx(Link, { className: `w-full text-green-900 ${activeSection === item.id ? "font-bold text-green-700" : ""}`, href: `/#${item.id}`, size: "lg", children: item.label }) }, `${item.label}-${index}`))) })] }));
}
