/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import { UserPatrimonyInvestedType } from '@/app/home/page';
import formatPrice from '@/services/formatPrice';

interface DataType {
  name: string;
  value: number;
  fill: string;
  opacity: number;
  hover: boolean;
  symbol?: string;
  cryptoValue?: number;
}

interface CellInfoType {
  symbol: string;
  cryptoValue: number;
  value: number;
  fill: string;
  hover: boolean;
}

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
  const [cellIInfo, setCellInfo] = useState<CellInfoType[]>([]);
  const [stData, setStData] = useState<DataType[]>([]);

  useEffect(() => {
    let data: DataType[] = stUserPatrimonyInvested.invested.active.map(val => ({
      name: val.name,
      symbol: val.symbol,
      cryptoValue: val.cryptoValue,
      value: val.valueInvested + val.profit,
      fill: val.fill,
      opacity: 1,
      hover: true,
    }));
    if (!data.length) {
      data = [
        {
          name: 'invested',
          value: 100,
          fill: '#272a2eff',
          hover: false,
          opacity: 1,
        },
      ];
    }
    setStData(data);
  }, [stUserPatrimonyInvested]);

  const handlePieMouseEnter = (cellData: { payload: CellInfoType }) => {
    if (!cellData.payload.hover) return;
    setCellInfo([
      {
        cryptoValue: cellData.payload.cryptoValue,
        symbol: cellData.payload.symbol,
        value: cellData.payload.value,
        fill: cellData.payload.fill,
        hover: cellData.payload.hover,
      },
    ]);
    const newStData = stData.map(val =>
      val.symbol !== cellData.payload.symbol ? { ...val, opacity: 0.5 } : val
    );
    setStData(newStData);
  };

  const handlePieMouseLeave = (cellData: { payload: CellInfoType }) => {
    if (!cellData.payload.hover) return;
    setStData(state => state.map(val => ({ ...val, opacity: 1 })));
    setCellInfo([]);
  };

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={stData}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#272a2eff"
          stroke="#272a2eff"
          dataKey="value"
          onMouseEnter={cellData => {
            handlePieMouseEnter(cellData);
          }}
          onMouseLeave={cellData => {
            handlePieMouseLeave(cellData);
          }}
        >
          {stData.map((val, index) => (
            <Cell
              key={index.toString()}
              fill={val.fill}
              style={{ opacity: val.opacity }}
            />
          ))}
        </Pie>
        {/* {+stUserPatrimonyInvested.invested.value && (
          <Tooltip content={<CustomTooltip />} />
        )} */}
        <Legend
          content={
            <CustomLegend
              stUserPatrimonyInvested={stUserPatrimonyInvested}
              fontSizeInvested={fontSizeInvested}
              fontSizeValueInvested={fontSizeValueInvested}
              cellIInfo={cellIInfo}
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
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-495057 text-xs text-primary font-normal flex items-center justify-center rounded px-2 py-1">
        {formatPrice(payload[0].value)}
      </div>
    );
  }
};

const CustomLegend = ({
  stUserPatrimonyInvested,
  fontSizeInvested,
  fontSizeValueInvested,
  cellIInfo,
}: {
  stUserPatrimonyInvested: UserPatrimonyInvestedType<number | string> & {
    hide: boolean;
  };
  fontSizeInvested: string;
  fontSizeValueInvested: string;
  cellIInfo: CellInfoType[];
}) => {
  if (cellIInfo.length)
    return cellIInfo.map(val => (
      <div
        className="flex flex-col items-center gap-[6px]"
        key={val.cryptoValue.toString()}
      >
        <span
          className={` font-normal leading-none ${fontSizeValueInvested}`}
          style={{ color: val.fill }}
        >
          {val.symbol}
        </span>
        <span
          className={`text-gray-b8bec4ff font-medium leading-none ${fontSizeValueInvested}`}
        >
          {formatPrice(val.value)}
        </span>
        <span
          className={`${fontSizeInvested} font-normal leading-none text-959ca2ff`}
        >
          {val.cryptoValue}
        </span>
      </div>
    ));

  return (
    <div className="flex flex-col items-center">
      <span
        className={`text-gray-b8bec4ff ${fontSizeValueInvested} font-medium`}
      >
        {stUserPatrimonyInvested.hide
          ? stUserPatrimonyInvested.invested.value
          : formatPrice(+stUserPatrimonyInvested.invested.value)}
      </span>
      <span className={`${fontSizeInvested} text-959ca2ff`}>
        Total invested
      </span>
    </div>
  );
};
