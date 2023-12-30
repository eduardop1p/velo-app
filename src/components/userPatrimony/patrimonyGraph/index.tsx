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

import { UserBalanceType } from '@/app/home/page';

export default function PatrimonyGraph({
  stUserBalance,
}: {
  stUserBalance: UserBalanceType & { hide: boolean };
}) {
  const data = [{ name: 'patrimony', value: 100 }];

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          innerRadius={68}
          outerRadius={80}
          fill="#272a2eff"
          stroke="#272a2eff"
          dataKey="value"
        >
          <Cell fill="#272a2eff" />
        </Pie>
        <Tooltip />
        <Legend
          content={<CustomLegend stUserBalance={stUserBalance} />}
          align="center"
          verticalAlign="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

const CustomLegend = ({
  stUserBalance,
}: {
  stUserBalance: UserBalanceType & { hide: boolean };
}) => {
  const handleFormatPrice = (value: string) => {
    return (+value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-b8bec4ff text-base font-medium">
        {stUserBalance.hide
          ? stUserBalance.invested
          : handleFormatPrice(stUserBalance.invested)}
      </span>
      <span className="text-[11px] text-gray-b8bec4ff">Total invested</span>
    </div>
  );
};
