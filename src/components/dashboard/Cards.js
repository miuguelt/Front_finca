import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
const StatisticsCard = ({ title, value, description }) => {
    return (
    // cambiar el color de fondo por prop
    _jsxs(Card, { className: "w-80 bg-slate-900 h-40", shadow: "md", isBlurred: true, children: [_jsxs(CardHeader, { className: "felx flex-col items-start", children: [_jsx("h2", { className: "text-white text-lg font-semibold", children: title }), _jsx("p", { className: "text-gray-500 text-xs text-justify", children: description })] }), _jsx(CardBody, { className: "flex flex-row justify-between items-center px-5", children: _jsx("p", { className: "text-white text-3xl font-bold", children: value }) })] }));
};
export default StatisticsCard;
