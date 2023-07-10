import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class AnimatedChart extends Component {
    state = {
      chartData: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Data',
            data: [10, 20, 30],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        scales: {
            x: {
              type: 'category', // Set the scale type to "category" for the x-axis
              labels: ['Label 1', 'Label 2', 'Label 3'],
            },
            y: {
              beginAtZero: true, // Optional: Set the y-axis minimum value to zero
            },
          },
        animation: {
          duration: 2000, // Animation duration in milliseconds
          easing: 'easeInOutQuart', // Easing function for the animation
        },
      },
    };
  
    render() {
      return (
        <div>
          <h1>Animated Chart</h1>
          <Bar data={this.state.chartData} options={this.state.chartOptions} />
        </div>
      );
    }
  }
  
export default AnimatedChart;
  
