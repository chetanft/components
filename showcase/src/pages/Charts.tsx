import {
  LineChart,
  BarChart,
  PieChart,
  DoughnutChart,
  RadarChart,
  PolarAreaChart,
  ScatterChart,
  BubbleChart,
} from 'ft-design-system';

export default function Charts() {
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
  };

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
  };

  // Sample data for Pie Chart
  const pieData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [45, 35, 20],
      },
    ],
  };

  // Sample data for Doughnut Chart
  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [60, 25, 15],
      },
    ],
  };

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
  };

  // Sample data for Polar Area Chart
  const polarAreaData = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
      },
    ],
  };

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
  };

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
  };

  return (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: '2rem 1.5rem 4rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Hero Section */}
      <section style={{ 
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Chart Components
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Beautiful chart components built with Chart.js and styled with FT Design System.
          All charts use our teal, indigo, blue, pink, and gold color palette.
        </p>
      </section>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Line Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <LineChart
            title="Sales Trend"
            data={lineData}
            height={300}
            fill={true}
          />
        </div>

        {/* Bar Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <BarChart
            title="Quarterly Comparison"
            data={barData}
            height={300}
          />
        </div>

        {/* Pie Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <PieChart
            title="Device Usage"
            data={pieData}
            height={300}
          />
        </div>

        {/* Doughnut Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <DoughnutChart
            title="Task Status"
            data={doughnutData}
            height={300}
          />
        </div>

        {/* Radar Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          gridColumn: '1 / -1'
        }}>
          <RadarChart
            title="Product Comparison"
            data={radarData}
            height={400}
          />
        </div>

        {/* Polar Area Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <PolarAreaChart
            title="Category Distribution"
            data={polarAreaData}
            height={300}
          />
        </div>

        {/* Scatter Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <ScatterChart
            title="Correlation Analysis"
            data={scatterData}
            height={300}
          />
        </div>

        {/* Bubble Chart */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <BubbleChart
            title="Multi-dimensional Data"
            data={bubbleData}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

