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
  fontSizeInvested,
  fontSizeValueInvested,
  innerRadius,
  outerRadius,
}: {
  stUserPatrimonyInvested: UserPatrimonyInvestedType<number | string> & {
    hide: boolean;
  };
  fontSizeInvested: string;
  fontSizeValueInvested: string;
  innerRadius: number;
  outerRadius: number;
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
      <PieChart>
        <Pie
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
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
            <CustomLegend
              stUserPatrimonyInvested={stUserPatrimonyInvested}
              fontSizeInvested={fontSizeInvested}
              fontSizeValueInvested={fontSizeValueInvested}
            />
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
  fontSizeInvested,
  fontSizeValueInvested,
}: {
  stUserPatrimonyInvested: UserPatrimonyInvestedType<number | string> & {
    hide: boolean;
  };
  fontSizeInvested: string;
  fontSizeValueInvested: string;
}) => {
  const handleFormatPrice = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span
        className={`text-gray-b8bec4ff ${fontSizeValueInvested} font-medium`}
      >
        {stUserPatrimonyInvested.hide
          ? stUserPatrimonyInvested.invested
          : handleFormatPrice(+stUserPatrimonyInvested.invested)}
      </span>
      <span className={`${fontSizeInvested} text-959ca2ff`}>
        Total invested
      </span>
    </div>
  );
};
