"use client"

import { ChartPage } from "@/components/chart-page"

const bulletChartVariants = [
  {
    id: "basic",
    name: "Bullet Chart – Basic",
    description: "Basic bullet chart showing current value against target and ranges",
    code: `import { BulletChart } from "ft-design-system"

<BulletChart
  title="Sales Performance"
  label="Revenue"
  current={72}
  target={80}
  ranges={[50, 75, 100]}
  height={120}
/>`,
  },
  {
    id: "exceeds-target",
    name: "Bullet Chart – Exceeds Target",
    description: "Bullet chart where current value exceeds the target",
    code: `import { BulletChart } from "ft-design-system"

<BulletChart
  title="Customer Satisfaction"
  label="NPS Score"
  current={92}
  target={80}
  ranges={[50, 70, 100]}
  height={120}
/>`,
  },
  {
    id: "below-target",
    name: "Bullet Chart – Below Target",
    description: "Bullet chart where current value is below target",
    code: `import { BulletChart } from "ft-design-system"

<BulletChart
  title="Project Completion"
  label="Progress"
  current={45}
  target={75}
  ranges={[30, 60, 100]}
  height={120}
/>`,
  },
  {
    id: "high-ranges",
    name: "Bullet Chart – High Performance Ranges",
    description: "Bullet chart with high-value ranges",
    code: `import { BulletChart } from "ft-design-system"

<BulletChart
  title="System Uptime"
  label="Availability"
  current={99.5}
  target={99.9}
  ranges={[95, 99, 100]}
  height={120}
/>`,
  },
  {
    id: "multiple",
    name: "Bullet Chart – Multiple Metrics",
    description: "Multiple bullet charts for comparing different metrics",
    code: `import { BulletChart } from "ft-design-system"

<div className="space-y-4">
  <BulletChart
    label="Revenue"
    current={85}
    target={90}
    ranges={[50, 75, 100]}
    height={100}
  />
  <BulletChart
    label="Profit"
    current={72}
    target={80}
    ranges={[40, 65, 100]}
    height={100}
  />
  <BulletChart
    label="Growth"
    current={55}
    target={70}
    ranges={[30, 55, 100]}
    height={100}
  />
</div>`,
  },
]

export default function BulletChartsPage() {
  return <ChartPage title="Bullet Charts" description="Display performance metrics against targets with qualitative ranges. Bullet charts show the current value, target, and three performance zones (bad, satisfactory, good)." variants={bulletChartVariants} />
}
