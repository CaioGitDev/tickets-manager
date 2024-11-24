'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OverviewPropsSchema = z.object({
  key: z.string(),
  value: z.number(),
})

type OverviewProps = z.infer<typeof OverviewPropsSchema>

export function Overview({ data }: { data: OverviewProps[] }) {
  return (
    <ChartContainer
      config={
        {
          /* your config here */
        }
      }
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="key"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="value"
            barSize={48}
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-secondary hover:fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
