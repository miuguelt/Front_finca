import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import IndexSection from "@/components/landing/IndexSection";
import FeatureCard from "@/components/landing/FeatureCard";
import Gallery from "@/components/landing/Gallery";
import AboutSection from "@/components/landing/AboutSection";
import { features, images } from "@/data";
const LandingPage = () => {
    return (_jsx("div", { className: "flex flex-col min-h-screen", children: _jsx("main", { className: "flex-grow", children: _jsxs(_Fragment, { children: [_jsx(IndexSection, {}), _jsx("section", { id: "caracteristicas", className: "py-16 flex h-auto bg-gray-100", children: _jsxs("div", { className: "container m-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Caracter\u00EDsticas del Sistema" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4", children: features.map((feature, index) => (_jsx(FeatureCard, { feature: feature }, index))) })] }) }), _jsx(Gallery, { images: images }), _jsx(AboutSection, {})] }) }) }));
};
export default LandingPage;
