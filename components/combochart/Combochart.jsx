import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { getStudentsCountByBranchesandCreatedDatesMonthly } from "../../api/admindashboardApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Combochart = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [maxStudentCount, setMaxStudentCount] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromApi =
          await getStudentsCountByBranchesandCreatedDatesMonthly();
        if (Array.isArray(dataFromApi) && dataFromApi.length > 0) {
          processData(dataFromApi);
        }
      } catch (error) {
        console.log("Veri çekme işlemi sırasında bir hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  const processData = (apiData) => {
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const colors = [
      "#007bff", // Mavi
      "#fd7e14", // Turuncu
      "#ffc107", // Sarı
      "#28a745", // Yeşil
      "#17a2b8", // Açık Mavi
      "#dc3545", // Kırmızı
    ];

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    //Son 6 ayı hesapla
    let labels = [];
    for (let i = 5; i >= 0; i--) {
      let monthIndex = (currentMonth - i + 12) % 12;
      let year = monthIndex > currentMonth ? currentYear - 1 : currentYear;
      labels.push(`${months[monthIndex]} ${year}`);
    }

    //Şubelere göre gruplandırma
    let branchesData = {};
    apiData.forEach((item) => {
      if (!branchesData[item.branchName]) {
        branchesData[item.branchName] = new Array(6).fill(0);
      }
      let monthIndex = parseInt(item.mounth, 10) - 1;
      let year = parseInt(item.year, 10);
      let dataIndex = labels.findIndex(
        (label) => label.startsWith(months[monthIndex]) && label.endsWith(year)
      );

      if (dataIndex !== -1) {
        branchesData[item.branchName][dataIndex] = item.studentCount;
      } else {
        console.log(
          `Eşleşme bulunamadı: Şube: ${item.branchName}, Ay: ${months[monthIndex]}, Yıl: ${year}`
        );
      }
    });

    let totalByLabel = {};
    let maxCount = 0;

    //Toplam öğrenci sayılarını hesapla
    apiData.forEach((item) => {
      let labelIndex = labels.findIndex(
        (label) =>
          label.startsWith(months[parseInt(item.mounth, 10) - 1]) &&
          label.endsWith(item.year)
      );
      if (labelIndex !== -1) {
        totalByLabel[labels[labelIndex]] =
          (totalByLabel[labels[labelIndex]] || 0) + item.studentCount;
      }
    });

    //Maksimum öğrenci sayısını bul
    for (let label in totalByLabel) {
      if (totalByLabel[label] > maxCount) {
        maxCount = totalByLabel[label];
      }
    }

    //Maksimum Değeri Bir Sonraki 10'a yuvarla
    maxCount = Math.ceil(maxCount / 10 + 1) * 10;

    //Grafik verilerini oluştur
    let datasets = Object.keys(branchesData).map((branchName, index) => ({
      label: branchName,
      data: branchesData[branchName],
      backgroundColor: colors[index % colors.length],
      barThickness: 50, // bar genişliği
      stack: "stack",
      datalabels: {
        display: function (context) {
          return (
            context.datasetIndex === context.chart.data.datasets.length - 1
          );
        },
        color: "#000",
        align: "end",
        anchor: "end",
        formatter: (value, context) => {
          return totalByLabel[context.chart.data.labels[context.dataIndex]];
        },
      },
    }));

    setChartData({
      labels,
      datasets,
    });

    setMaxStudentCount(maxCount);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: function (context) {
          return context.dataset.type !== "line";
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: maxStudentCount,
        stepSize: 10,
      },
      x: {
        stacked: true,
      },
      y1: {
        type: "linear",
        display: false,
        position: "right",
        min: 0,
        max: 120,
        stepSize: 10,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default Combochart;
