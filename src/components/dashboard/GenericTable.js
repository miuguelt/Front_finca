import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
const GenericTable = ({ headers, data, columns, keyValue, onEdit,
// onDelete,
 }) => {
    //Metodo para evaluar si hay un punto en el valor y obtener el valor de un objeto anidado
    const getValue = (obj, path) => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };
    return (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [headers.map((header, index) => (_jsx(TableHead, { children: header }, index))), _jsx(TableHead, { children: "Acciones" })] }) }), _jsx(TableBody, { children: data.map((item) => (_jsxs(TableRow, { children: [columns.map((column, index) => (_jsx(TableCell, { children: getValue(item, column) }, index))), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "center", children: _jsx(DropdownMenuItem, { onClick: () => onEdit(item), className: "hover:cursor-pointer", children: "Editar" }) })] }) })] }, item[keyValue]))) })] }));
};
export default GenericTable;
