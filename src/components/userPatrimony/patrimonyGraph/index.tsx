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
  userBalance,
}: {
  userBalance: UserBalanceType;
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
          content={<CustomLegend invested={userBalance.invested} />}
          align="center"
          verticalAlign="middle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

const CustomLegend = ({ invested }: { invested: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-gray-b8bec4ff text-base font-medium">
      {(+invested).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}
    </span>
    <span className="text-[11px] text-gray-b8bec4ff">Total invested</span>
  </div>
);
