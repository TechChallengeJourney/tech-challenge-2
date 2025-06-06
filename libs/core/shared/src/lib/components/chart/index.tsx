'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BytebankChartProps {
  series: number[];
  labels?: string[];
}

export function BytebankChart({ series, labels }: BytebankChartProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels,
    colors: ['#2567F9', '#8F3CFF', '#FF3C82', '#F1823D'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="pie" width="100%" />;
}
