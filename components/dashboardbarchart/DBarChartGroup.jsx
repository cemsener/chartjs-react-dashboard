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
import { getAllActiveClassroomCountGroupedByEducation } from "../../api/admindashboardApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DBarChartGroup = () => {
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
        const data = await getAllActiveClassroomCountGroupedByEducation();
        setFullNames(data.map((item) => item.educationName));
        const classroomCounts = data.map((item) => item.classroomCount);
        setChartData({
          ...chartData,
          labels: data.map((item) => abbreviateName(item.educationName)),
          datasets: [
            {
              ...chartData.datasets[0],
              data: classroomCounts,
              barThickness: 40, //bar kalınlıkları
            },
          ],
        });
        //Y ekseni adımlarının yazılması
        const maxCount = Math.max(...classroomCounts);
        const roundedMax = Math.ceil(maxCount / 10) * 10;
        setMaxYAxisValue(roundedMax > 10 ? roundedMax : 10); //Y ekseninin maksimum değerinin belirlenmesi
      } catch (error) {
        console.error("Bar Chart verileri çekilirken hata oluştu: ", error);
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
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: true,
        },
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return fullNames[context[0].dataIndex]; //grafik üzerine gelince tam isim gösterme
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

export default DBarChartGroup;
