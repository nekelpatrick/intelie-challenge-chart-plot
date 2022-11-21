import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface IChartData {
  data:any,
  minLimit: number,
  maxLimit:number
  
}

export const Chart = ({ data, minLimit, maxLimit }:IChartData) => {
  const timestampFormmater = (item:any) => {
    const diff = item - minLimit;
    const diffString:any = diff.toString()
    const hours = Number(diffString / (60 * 60 * 1000));
    const minutes = Number((diffString % (60 * 60 * 1000)) / 60000);
    return (
      (hours < 10 ? '0' : '') +
      hours.toString() +
      ':' +
      (minutes < 10 ? '0' : '') +
      minutes.toString()
    );
  };

  return (
    <div style={{ width: '100%', marginTop: '10px' }}>
      <ResponsiveContainer width="90%" minHeight={300}>
        <LineChart
          width={900}
          height={300}
          margin={{ top: 15, right: 50, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="timestamp"
            type="number"
            interval={0}
            domain={[minLimit, maxLimit]}
            tickFormatter={timestampFormmater}
            allowDataOverflow={true}
            padding={{ left: 30, right: 30 }}
            tickCount={0}
          />
          <YAxis dataKey="value" hide={true} />
          <Tooltip labelFormatter={timestampFormmater} />

          {data.map((serie:any) => (
            <Line
              dataKey="value"
              data={serie.data}
              name={serie.name}
              key={serie.name}
              stroke={serie.color}
              dot={{ r: 2, stroke: serie.color, strokeWidth: 4 }}
              activeDot={{ r: 4, stroke: serie.color }}
            />
          ))}

          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ right: -75 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
