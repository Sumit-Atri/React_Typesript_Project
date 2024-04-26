import { ResponsiveBar } from '@nivo/bar';
import { Pizza } from '../App'
import {Row} from 'react-table';

interface BarGraphProps {
  data: Row<Pizza>[];
}

interface ToppingsFrequency {
  [topping: string]: number;
}

interface ChartData {
  topping: string,
  frequency: number
}

interface ChartOptions {
  indexBy: string;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: number;
  layout: "horizontal" | "vertical";
  colors: {
    scheme: string;
  };
  axisBottom?: {
    tickRotation: number;
  };
  labelSkipWidth: number;
  labelSkipHeight: number;
  enableGridX: boolean;
  enableGridY: boolean;
  labelTextColor: {
    from: string;
    modifiers: [string[]];
  };
  legends: {
    dataFrom: string;
    anchor: string;
    direction: string;
    justify: boolean;
    translateX: number;
    translateY: number;
    itemsSpacing: number;
    itemWidth: number;
    itemHeight: number;
    itemDirection: string;
    itemOpacity: number;
    symbolSize: number;
    effects: {
      on: string;
      style: {
        itemOpacity: number;
      };
    }[];
  }[];
}



const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const toppingsData: string[] = data.flatMap((row) => row.original.toppings);

  const toppingsFrequency: ToppingsFrequency = {};

  toppingsData.forEach((topping) => {
    toppingsFrequency[topping] = (toppingsFrequency[topping] || 0) + 1;
  });

  // Sorting toppings by frequency
  const sortedToppings: string[] = Object.keys(toppingsFrequency).sort(
    (a, b) => toppingsFrequency[b] - toppingsFrequency[a]
  );

  // Building data for the bar chart
  const chartData: ChartData[] = sortedToppings.map((topping) => ({
    topping: topping,
    frequency: toppingsFrequency[topping],
  }));

  // Nivo Bar chart options
  const chartOptions: ChartOptions = {
    indexBy: "topping",
    margin: { top: 50, right: 130, bottom: 50, left: 60 },
    padding: 0.3,
    layout: "horizontal",
    colors: { scheme: "nivo" },
    axisBottom: {
      tickRotation: -45,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    enableGridX: true,
    enableGridY: false,
    labelTextColor: { from: "color", modifiers: [["darker", 1.6]] },
    legends: [
      {
        dataFrom: "keys",
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={chartData}
        keys={["frequency"]} // Frequency on y-axis
        indexBy= "topping" // Toppings on x-axis
        margin={{ top: 50, right: 50, bottom: 50, left: 130 }}
        padding={0.3}
        layout="vertical"
        colors={{ scheme: "nivo" }}
        axisBottom={{
          tickRotation: -45,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableGridX={true}
        enableGridY={false}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarGraph;