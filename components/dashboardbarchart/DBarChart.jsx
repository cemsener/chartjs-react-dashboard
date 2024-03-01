import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllActiveStudentCountGroupedByEducation } from "../../api/admindashboardApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DBarChart = () => {
  //Grafik için verilerin tutulduğu state
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
        borderColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
        borderWidth: 1,
      },
    ],
  });

  const [fullNames, setFullNames] = useState([]); //Eğitim programlarının isimlerinin tutulduğu state
  const [maxYAxisValue, setMaxYAxisValue] = useState(10); //Y ekseninin maksimum değerinin tutulduğu state

  //Eğitim programlarının isimlerini kısaltma fonksiyonu
  const abbreviateName = (name) => {
    return name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase();
  };

  //api den verilerin çekilmesi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllActiveStudentCountGroupedByEducation();
        setFullNames(data.map((item) => item.educationName));
        const studentCounts = data.map((item) => item.studentCount);
        setChartData({
          ...chartData,
          labels: data.map((item) => abbreviateName(item.educationName)),
          datasets: [
            {
              ...chartData.datasets[0],
              data: studentCounts,
              barThickness: 40,
            },
          ],
        });
        const maxCount = Math.max(...studentCounts);
        const roundedMax = Math.ceil(maxCount / 10) * 10;
        setMaxYAxisValue(roundedMax > 10 ? roundedMax : 10);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: maxYAxisValue,
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return fullNames[context[0].dataIndex];
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DBarChart;
