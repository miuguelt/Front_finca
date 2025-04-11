import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GenericTableProps<T> {
  headers: string[];
  data: T[];
  columns: string[];
  keyValue: string;
  onEdit: (item: T) => void;
  // onDelete: (item: T) => void;
}

const GenericTable = <T,>({
  headers,
  data,
  columns,
  keyValue,
  onEdit,
  // onDelete,
}: GenericTableProps<T>) => {
  //Metodo para evaluar si hay un punto en el valor y obtener el valor de un objeto anidado
  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item[keyValue]}>
            {columns.map((column, index) => (
              <TableCell key={index}>{getValue(item, column)}</TableCell>
            ))}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem
                    onClick={() => onEdit(item)}
                    className="hover:cursor-pointer"
                  >
                    Editar
                  </DropdownMenuItem>
                  {/* <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete(item)}
                    className="text-red-600 hover:cursor-pointer"
                  >
                    Eliminar
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
