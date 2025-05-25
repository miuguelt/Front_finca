import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const FeatureCard = ({ feature }) => (_jsxs(Card, { className: "flex flex-col lg:w-[380px] w-full h-48 m-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-xl", children: [_jsx(feature.icon, { className: "mr-2 h-6 w-6 text-green-600" }), feature.title] }) }), _jsx(CardContent, { className: "flex-grow text-justify", children: _jsx("p", { children: feature.description }) })] }));
export default FeatureCard;
