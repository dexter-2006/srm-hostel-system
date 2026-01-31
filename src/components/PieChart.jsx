import React, { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title)

const PieChart = ({ data, title = "Issues by Category" }) => {
  const chartRef = useRef(null)

  // Chart configuration
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#EF4444', // Red for Cleanliness
          '#F59E0B', // Yellow for Plumbing  
          '#10B981', // Green for Electrical
          '#06B6D4', // Cyan for Internet/WiFi
          '#8B5CF6', // Purple for AC/Fan
        ],
        borderColor: [
          '#DC2626',
          '#D97706', 
          '#059669',
          '#0891B2',
          '#7C3AED',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#F87171',
          '#FBBF24',
          '#34D399', 
          '#22D3EE',
          '#A78BFA',
        ],
        hoverBorderWidth: 3,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll use custom legend
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.label}: ${context.parsed} (${percentage}%)`
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: false,
      duration: 800,
      easing: 'easeInOutQuart'
    },
    elements: {
      arc: {
        borderRadius: 4,
      }
    }
  }

  // Update chart when data changes
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      chart.data = chartData
      chart.update('active') // Smooth update animation
    }
  }, [data])

  return (
    <div className="w-full h-full">
      <div className="h-64 relative">
        <Pie ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default PieChart