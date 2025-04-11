import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface StatisticsCardProps{
    title: string
    description: string
    value: number
}

const StatisticsCard = ({title, value, description}: StatisticsCardProps) => {
    return (
        // cambiar el color de fondo por prop
        <Card className="w-80 bg-slate-900 h-40" shadow="md" isBlurred>
          <CardHeader className="felx flex-col items-start">
            <h2 className="text-white text-lg font-semibold">
              {title}
            </h2>
            <p className="text-gray-500 text-xs text-justify">
              {description}
            </p>
          </CardHeader>
          <CardBody className="flex flex-row justify-between items-center px-5">
            {/* <p className="text-white text-4xl font-bold">{patients.length}</p>
            <HiOutlineUserGroup className="text-gray-500 text-6xl" /> */}
            <p className="text-white text-3xl font-bold">
                {value}
            </p>
          </CardBody>
        </Card>
    );
};

export default StatisticsCard;