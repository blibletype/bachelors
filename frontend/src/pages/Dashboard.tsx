import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
} from 'chart.js';
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from '@nextui-org/react';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend
);

const Dashboard: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [labels, setLabels] = React.useState<string[]>([]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Power Usage (kWh)',
        data: data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Example options for graphs
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Ensuring 'top' is a specific string literal
      },
      title: {
        display: true,
        text: 'Power Usage Over Time',
      },
    },
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <Card className="w-[400px] h-[240px] border-none">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: 'w-36 h-36 drop-shadow-md',
                  value: 'text-2xl font-semibold text-green',
                }}
                valueLabel={`${10} A`}
                value={10}
                color='success'
                strokeWidth={3}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: 'border-1 border-white/30',
                  content: 'text-black/90 text-small font-semibold',
                }}
                variant="bordered"
              >
                Current
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col items-center">
        <Card className="w-[400px] h-[240px] border-none">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'green',
                  track: 'stroke-white/10',
                  value: 'text-2xl font-semibold text-green',
                }}
                valueLabel={`${2.2} kW`}
                value={2200 / 100}
                color='warning'
                strokeWidth={3}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: 'border-1 border-white/30',
                  content: 'text-black/90 text-small font-semibold',
                }}
                variant="bordered"
              >
                Power
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col items-center">
        <Card className="w-[400px] h-[240px] border-none">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: 'w-36 h-36 drop-shadow-md',
                  indicator: 'green',
                  track: 'stroke-white/10',
                  value: 'text-2xl font-semibold text-green',
                }}
                valueLabel={`${2.2} kWh`}
                value={60}
                color='danger'
                strokeWidth={3}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: 'border-1 border-white/30',
                  content: 'text-black/90 text-small font-semibold',
                }}
                variant="bordered"
              >
                Energy Consumption
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Power Usage Over Time
          </h3>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
