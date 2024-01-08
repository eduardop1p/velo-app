/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import { UserPatrimonyInvestedType } from '@/app/home/page';

export default function PatrimonyGraph({
  stUserPatrimonyInvested,
}: {
  stUserPatrimonyInvested: UserPatrimonyInvestedType<number | string> & {
    hide: boolean;
  };
}) {
  const data = [
    {
      name: 'patrimony',
      value: !+stUserPatrimonyInvested.patrimony
        ? 100
        : +stUserPatrimonyInvested.patrimony,
      fill: '#272a2eff',
    },
    {
      name: 'invested',
      value: +stUserPatrimonyInvested.invested,
      fill: '#549cffff',
    },
  ];

  return (
    <ResponsiveContainer>
      <PieChart
        style={{
          scale: '1.15',
        }}
      >
        <Pie
          data={data}
          innerRadius={68}
          outerRadius={80}
          fill="#272a2eff"
          stroke="#272a2eff"
          dataKey="value"
        >
          {data.map((val, index) => (
            <Cell key={index.toString()} fill={val.fill} />
          ))}
        </Pie>
        {+stUserPatrimonyInvested.patrimony && (
          <Tooltip content={<CustomTooltip />} />
        )}
        <Legend
          content={
            <CustomLegend stUserPatrimonyInvested={stUserPatrimonyInvested} />
          }
          align="center"
          verticalAlign="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = (props: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  const handleFormatPrice = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-495057 text-xs text-primary font-normal flex items-center justify-center rounded px-2 py-1">
        {handleFormatPrice(payload[0].value)}
      </div>
    );
  }
};

const CustomLegend = ({
  stUserPatrimonyInvested,
}: {
  stUserPatrimonyInvested: UserPatrimonyInvestedType<number | string> & {
    hide: boolean;
  };
}) => {
  const handleFormatPrice = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-b8bec4ff text-base font-medium">
        {stUserPatrimonyInvested.hide
          ? stUserPatrimonyInvested.invested
          : handleFormatPrice(+stUserPatrimonyInvested.invested)}
      </span>
      <span className="text-[11px] text-gray-b8bec4ff">Total invested</span>
    </div>
  );
};
