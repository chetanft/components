"use client"

import { SiteHeader } from "@/components/site-header"
import { ChartsSidebar } from "@/components/charts-sidebar"
import {
  LineChart,
  BarChart,
  PieChart,
  DoughnutChart,
  RadarChart,
  PolarAreaChart,
  ScatterChart,
  BubbleChart,
} from "../../../../src"

export default function ChartsPage() {
  // Sample data for Line Chart
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 15, 25, 22, 30],
      },
      {
        label: 'Revenue',
        data: [8, 15, 12, 20, 18, 25],
      },
    ],
  }

  // Sample data for Bar Chart
  const barData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: '2023',
        data: [65, 78, 90, 81],
      },
      {
        label: '2024',
        data: [75, 88, 95, 91],
      },
    ],
  }

  // Sample data for Pie Chart
  const pieData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [45, 35, 20],
      },
    ],
  }

  // Sample data for Doughnut Chart
  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [60, 25, 15],
      },
    ],
  }

  // Sample data for Radar Chart
  const radarData = {
    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
    datasets: [
      {
        label: 'Product A',
        data: [85, 90, 75, 95, 80, 70],
      },
      {
        label: 'Product B',
        data: [70, 85, 80, 88, 75, 85],
      },
    ],
  }

  // Sample data for Polar Area Chart - using FT Design System colors
  const polarAreaData = {
    labels: ['Teal', 'Indigo', 'Blue', 'Pink', 'Gold'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
      },
    ],
  }

  // Sample data for Scatter Chart
  const scatterData = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 10 },
          { x: 25, y: 30 },
          { x: 30, y: 25 },
          { x: 40, y: 35 },
        ],
      },
      {
        label: 'Dataset 2',
        data: [
          { x: 12, y: 25 },
          { x: 18, y: 15 },
          { x: 28, y: 35 },
          { x: 35, y: 30 },
          { x: 45, y: 40 },
        ],
      },
    ],
  }

  // Sample data for Bubble Chart
  const bubbleData = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 30, y: 20, r: 20 },
          { x: 50, y: 40, r: 25 },
        ],
      },
      {
        label: 'Dataset 2',
        data: [
          { x: 25, y: 35, r: 12 },
          { x: 45, y: 15, r: 18 },
          { x: 35, y: 25, r: 15 },
          { x: 55, y: 45, r: 22 },
        ],
      },
    ],
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="flex-1">
        <div className="container max-w-screen-2xl mx-auto">
          <div className="flex gap-8 py-8">
            {/* Sidebar */}
            <aside className="sticky top-20 h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto border-r pr-8">
              <ChartsSidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 max-w-4xl">
              {/* Hero Section */}
              <div className="mb-12">
                <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                  Chart Components
                </h1>
                <p className="text-lg text-muted-foreground">
                  Beautiful chart components built with Chart.js and styled with FT Design System.
                  All charts use our teal, indigo, blue, pink, and gold color palette.
                </p>
              </div>

              {/* Charts Grid */}
              <div className="space-y-12">
                {/* Line Chart */}
                <div id="line-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <LineChart
                      title="Sales Trend"
                      data={lineData}
                      height={300}
                      fill={true}
                    />
                  </div>
                </div>

                {/* Bar Chart */}
                <div id="bar-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <BarChart
                      title="Quarterly Comparison"
                      data={barData}
                      height={300}
                    />
                  </div>
                </div>

                {/* Pie Chart */}
                <div id="pie-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <PieChart
                      title="Device Usage"
                      data={pieData}
                      height={300}
                    />
                  </div>
                </div>

                {/* Doughnut Chart */}
                <div id="doughnut-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <DoughnutChart
                      title="Task Status"
                      data={doughnutData}
                      height={300}
                    />
                  </div>
                </div>

                {/* Radar Chart */}
                <div id="radar-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <RadarChart
                      title="Product Comparison"
                      data={radarData}
                      height={400}
                    />
                  </div>
                </div>

                {/* Polar Area Chart */}
                <div id="polar-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <PolarAreaChart
                      title="Category Distribution"
                      data={polarAreaData}
                      height={300}
                    />
                  </div>
                </div>

                {/* Scatter Chart */}
                <div id="scatter-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <ScatterChart
                      title="Correlation Analysis"
                      data={scatterData}
                      height={300}
                    />
                  </div>
                </div>

                {/* Bubble Chart */}
                <div id="bubble-chart" className="scroll-mt-20">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <BubbleChart
                      title="Multi-dimensional Data"
                      data={bubbleData}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

